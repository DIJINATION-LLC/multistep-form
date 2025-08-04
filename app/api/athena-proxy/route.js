import { NextResponse } from 'next/server';

let cachedToken = null;
let tokenExpiry = null;

async function getAthenaToken() {
  try {

    if (cachedToken !== null && cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      console.log("Existing token")
      return cachedToken;
    }


    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString('base64');

    const response = await fetch(`${process.env.NEXT_PUBLIC_ATHENA_API}/oauth2/v1/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'athena/service/Athenanet.MDP.*',
      }).toString(),
    });

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000 - 5000;
    return cachedToken;
  } catch (error) {
    console.log("Error on getAuthToken: ", error)
    throw error
  }
}


async function generateToken() {
  try {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString('base64');
    console.log("Generating token")
    const response = await fetch(`${process.env.NEXT_PUBLIC_ATHENA_API}/oauth2/v1/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'athena/service/Athenanet.MDP.*',
      }).toString(),
    });

    const data = await response.json();
    console.log("data:", data)
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000 - 5000;

    return cachedToken;
  } catch (error) {
    console.log("generate token error: ",error);
    throw error
  }

}

export async function POST(req) {
  const contentType = req.headers.get('content-type') || '';

  try {
    let token = await getAthenaToken();

    if (!token) {
      token = await generateToken()
    }
    if(!token){
      throw new Error("Token not found.")
    }
    console.log("token: ",token)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      const path = formData.get('path');
      const method = formData.get('method') || 'POST';
      const departmentId = formData.get('departmentid');
      let fileBlob = formData.get('image');
      let signature = false;
      if(!fileBlob){
        fileBlob = formData.get('attachmentcontents');
        signature = true;
      }

      // Convert blob to base64 string
      const buffer = Buffer.from(await fileBlob.arrayBuffer());
      const mimeType = fileBlob.type || 'image/jpeg';
      console.log(mimeType)
      const base64Image = `${buffer.toString('base64')}`;
      const url = new URL(`${process.env.NEXT_PUBLIC_ATHENA_API}${path}`);
      const athenFormData = new FormData()
      
      if(signature){
        console.log("Signature")
        athenFormData.append('documentSubclass', 'ADMIN_CONSENT');
        athenFormData.append('attachmentcontents', base64Image);
      }else{
        athenFormData.append('image', base64Image);
      }
      athenFormData.append('departmentid', departmentId);
      const athenaRes = await fetch(url.toString(), {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: athenFormData,
      });

      const result = await athenaRes.json();
      return NextResponse.json(result, { status: athenaRes.status });
    }

    // If JSON body:
    const { path, method = 'GET', query = {}, body = null } = await req.json();

    const url = new URL(`${process.env.NEXT_PUBLIC_ATHENA_API}${path}`);
    Object.entries(query).forEach(([key, val]) => {
      if (val !== undefined) url.searchParams.append(key, val);
    });

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    const contentTypeResponse = response.headers.get('content-type') || '';
    if (contentTypeResponse.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: { 'Content-Type': contentTypeResponse },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Proxy Error', details: error.message }, { status: 500 });
  }
}