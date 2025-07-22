"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import styles from "@/app/styles/style";
import { searchPatient } from "@/app/services/patientService";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import helper from "@/app/utils/helper";
import { Loader1 } from "@/app/multistep-form/components/LoaderOverlay";

export default function Login() {
  const [form, setForm] = useState({ firstName: "", lastName: "", dob: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setPatientData } = usePatient();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDateForAthena = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.dob) {
      setError("All fields are required");
      return;
    }

    const formattedDOB = formatDateForAthena(form.dob);

    setLoading(true);
    try {
      const data = await searchPatient(
        form.firstName,
        form.lastName,
        formattedDOB
      );

      if (data?.patients?.length > 0) {
        const patient = data.patients[0];
        setPatientData(patient);
        localStorage.setItem("currentUser", JSON.stringify(patient));
        //for token access to api params
        localStorage.setItem("userToken", "checkedInUser");
        document.cookie = "checked_in=true; path=/;";
        router.push("/multistep-form");
      } else {
        setError(helper.noRecord);
      }
    } catch (err) {
      setError(helper.errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" mx-5  mt-10 bg-white shadow-md p-10 rounded-lg h-auto  ">
          {loading && (
       <Loader1 />
      )}
      <div className="flex justify-center mb-4">
        <Image
          src="/logo.png"
          alt="Allen Arthritis Logo"
          height={320}
          width={320}
        />
      </div>
      <hr className="text-[#D4D4D4] mx-auto" width="80%" />
      <h2 className={`text-[40px] font-bold text-center py-8 grey-heading`}>
        PATIENT CHECK-IN
      </h2>
      <hr className="text-[#D4D4D4] mx-auto pt-2" width="80%" />

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className={`${styles.heading2}`} >
          <span className={`${styles.heading2}  grey-heading `} >First Name*</span>
          <input
          className="mt-5 h-20 "
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={`${styles.heading2}`} >
          <span className={`${styles.heading2}  grey-heading  `} >Last Name*</span>
          <input
          className="mt-5 h-20"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={`${styles.heading2}`}>
            <span className={`${styles.heading2}  grey-heading `} >Date Of Birth*</span>

          <input
          className="mt-5 h-22"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} 
            required
          />
        </div>

        {error && 
        
      <div className="bg-red-100 px-3 py-3 rounded-md border-[#A80608] border-1" ><p className="text-[#A80608]">"{error}"</p></div>  
        
        }

        

        <button
          type="submit"
          className="mt-4 bg-[#0E0C69] text-white px-6 py-6 rounded-xl hover:opacity-90 w-full text-2xl"
          onClick={()=>{setLoading(true)}}
        >
          Check-In
        </button>
      </form>

      <div className="text-center m-auto w-full flex flex-col items-center mt-20">
             <p className="text-3xl text-gray-400 mt-30">Powered by</p>
             <Image src="/diji-logo.png" width={400} height={400} alt="Powered By" />
           </div>
    </div>
  );
}
