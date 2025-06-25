'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/style';

export default function Login() {
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = existingUsers.find(
    (user) =>
      user.firstName === form.firstName &&
      user.lastName === form.lastName &&
      user.dob === form.dob
  );

  if (alreadyExists) {
    setError("You are already checked-in!");
    return;
  }

  // Save user data
  const updatedUsers = [...existingUsers, form];
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(form));

  // ✅ Set token so that AuthContext detects it
  localStorage.setItem("userToken", "checkedInUser");

  // ✅ Set cookie for extra safety (optional)
  document.cookie = "checked_in=true; path=/;";

  setTimeout(()=>{
    router.push("/multistep-form")
     e.preventDefault();
  }, 500)
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
      <div className="flex justify-center mb-4">
        <Image 
         src="/logo.png"
         alt='Allen Arthritis Logo'
         height={120}
         width={120}
        
        />
      </div>
      <hr className='text-[#D4D4D4] mx-auto ' width="80%" />
      <h2 className={`${styles.heading2} text-center py-2  text-[#353535] `}>PATIENT CHECK-IN</h2>
            <hr className='text-[#D4D4D4] mx-auto pt-2 ' width="80%" />
      <form className="space-y-4"> 
        <div>
          <label>First Name*</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name*</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth*</label>
          <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button className="w-full bg-primary text-black py-2 rounded-md"
         onClick={handleSubmit} 
        >Check-In</button>
        <button onClick={() => {
  localStorage.removeItem("users");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
  document.cookie = "checked_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
}}>Logout / Reset</button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-500">Powered by Dijination</p>
    </div>
  );
}
