'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    document.cookie = "logged_in=true; path=/;" 
    router.push('/multistep-form')
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
      <div className="flex justify-center mb-4">
        <img src="../public/logo.png" alt="Allen Arthritis" className="h-10" />
      </div>
      <h2 className="text-center text-2xl font-bold mb-6 text-blue-500">PATIENT CHECK-IN</h2>
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
      </form>
      <p className="text-center mt-4 text-sm text-gray-500">Powered by Dijination</p>
    </div>
  );
}
