// // File: app/api/athena-proxy/route.js (Next.js 13+ App Router)

// import { NextResponse } from 'next/server';

// const BASE_URL = 'https://api.athenahealth.com';

// export async function POST(req) {
//   try {
//     const { path, method = 'GET', query = {}, body = null, contentType = 'application/json' } = await req.json();

//     // Build full URL with query params
//     const url = new URL(`${process.env.NEXT_PUBLIC_ATHENA_API}/${path}`);
//     Object.keys(query).forEach((key) => {
//       if (query[key] !== undefined) {
//         url.searchParams.append(key, query[key]);
//       }
//     });

//     const headers = {
//       Authorization: `Bearer ${process.env.ATHENA_API_TOKEN}`,
//     };

//     if (contentType !== 'multipart/form-data') {
//       headers['Content-Type'] = contentType;
//     }

//     const response = await fetch(url, {
//       method,
//       headers,
//       body: contentType === 'application/json' && body ? JSON.stringify(body) : body,
//     });

//     const contentTypeResponse = response.headers.get('content-type') || '';

//     if (contentTypeResponse.includes('application/json')) {
//       const data = await response.json();
//       return NextResponse.json(data, { status: response.status });
//     } else {
//       const blob = await response.blob();
//       return new NextResponse(blob, {
//         status: response.status,
//         headers: { 'Content-Type': contentTypeResponse },
//       });
//     }
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ error: 'Proxy Error', details: error.message }, { status: 500 });
//   }
// }



// new 

// app/api/athena-proxy/route.js

import { NextResponse } from 'next/server';


let cachedToken = null;
let tokenExpiry = null;

async function getAthenaToken() {
  // If token exists and not expired
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
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
  tokenExpiry = Date.now() + data.expires_in * 1000 - 5000; // Subtract 5s buffer

  return cachedToken;
}

export async function POST(req) {
  try {
    const { path, method = 'GET', query = {}, body = null, contentType = 'application/json' } = await req.json();
    const token = await getAthenaToken();

    // Construct full URL
    const url = new URL(`${process.env.NEXT_PUBLIC_ATHENA_API}${path}`);
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        url.searchParams.append(key, query[key]);
      }
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: contentType === 'application/json' && body ? JSON.stringify(body) : body,
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
    return NextResponse.json({ error: 'Proxy Error', details: error.message }, { status: 500 });
  }
}
