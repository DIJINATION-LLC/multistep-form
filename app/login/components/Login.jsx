'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/style';
import { searchPatient } from '@/app/services/patientService';
import { usePatient } from '@/app/multistep-form/context/PatientContext';

export default function Login() {
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setPatientData } = usePatient();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.dob) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const data = await searchPatient(form.firstName, form.lastName, form.dob);

      if (data?.patients?.length > 0) {
        const patient = data.patients[0];
        setPatientData(patient);
        localStorage.setItem('currentUser', JSON.stringify(patient));
        //for token access to api params
        localStorage.setItem('userToken', 'checkedInUser');
        document.cookie = 'checked_in=true; path=/;';
        router.push('/multistep-form');
      } else {
        setError('No patient found. Please check your details.');
      }
    } catch (err) {
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
      <div className="flex justify-center mb-4">
        <Image src="/logo.png" alt="Allen Arthritis Logo" height={120} width={120} />
      </div>
      <hr className="text-[#D4D4D4] mx-auto" width="80%" />
      <h2 className={`${styles.heading2} text-center py-2 text-[#353535]`}>PATIENT CHECK-IN</h2>
      <hr className="text-[#D4D4D4] mx-auto pt-2" width="80%" />

      <form className="space-y-4" onSubmit={handleSubmit}>
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

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="w-full bg-primary text-black py-2 rounded-md">
          Check-In
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">Powered by Dijination</p>
    </div>
  );
}
