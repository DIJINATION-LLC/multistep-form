"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/style";
import { useState } from "react";
import { FaFrown, FaMeh, FaSmile, FaGrin } from "react-icons/fa";
import Image from "next/image";
import { submitSurvey } from "@/app/services/surveyService";
import { usePatient } from "../context/PatientContext";
import AlertPopup from "./AlertPopup";
import helper from "@/app/utils/helper";



const scoreMap = {
  "Very Dissatisfied": 10,
  "Dissatisfied": 30,
  "Satisfied": 70,
  "Very Satisfied": 100
};


export default function Survey() {
   const { patientData } = usePatient()
  const [form, setForm] = useState({
    ipadExperience: "",
    digitalCheckin: "",
    feedback: ""
  });
  const router = useRouter()

  const [showPopup, setShowPopup] = useState(false);
  

   const handleNext = () => {
    router.push("./login")
  };
  

  const handleRadio = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleChange = (e) => {
    setForm({ ...form, feedback: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const avgScore = (
      (scoreMap[form.ipadExperience] || 0) +
      (scoreMap[form.digitalCheckin] || 0)
    ) / 2;

    const payload = {
      startdate: new Date().toLocaleDateString(),
      enddate: new Date().toLocaleDateString(),
      averagescore: avgScore.toFixed(0),
      
      providerdata: [
        {
          providerid: patientData?.primaryproviderid || "N/A",  
          departmentid: "1",  
          score: avgScore.toFixed(0),
          datapointcount: "1"
        }
      ]
    };

    try {
      await submitSurvey(payload);
      console.log("Survey Submitted Successfully", payload);
     
    } catch (error) {
      console.error("Survey Submission Failed", error);
    }
  };

  return (
    <div className="w-full h-auto mx-auto p-10 bg-white shadow-md rounded-lg mt-6">
      <hr className="text-[#D4D4D4] mx-auto" width="80%" />
      <h2 className={`${styles.heading} my-6 text-center`}>Survey</h2>
      <hr className="text-[#D4D4D4] mx-auto" width="80%" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Q1 */}
        <div>
          <p className={`${styles.heading2} my-6`}>
            How satisfied or dissatisfied are you with the staff’s explanation of how to use the iPad?
          </p>
          <div className="flex justify-between gap-2">
            {["Very Dissatisfied", "Dissatisfied", "Satisfied", "Very Satisfied"].map((val, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRadio("ipadExperience", val)}
                className={`flex-1 px-3 py-6 border rounded-md flex flex-col items-center gap-1 ${form.ipadExperience === val ? "bg-blue-100 border-blue-500" : "bg-white"}`}
              >
                {[<FaFrown size={40} />, <FaMeh size={40} />, <FaSmile size={40} />, <FaGrin size={40} />][idx]}
                <span className={styles.heading2}>{val}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <p className={`${styles.heading2} my-6`}>
            How satisfied or dissatisfied are you with the digital check-in?
          </p>
          <div className="flex justify-between gap-2">
            {["Very Dissatisfied", "Dissatisfied", "Satisfied", "Very Satisfied"].map((val, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRadio("digitalCheckin", val)}
                className={`flex-1 px-3 py-6 border rounded-md flex flex-col items-center gap-1 ${form.digitalCheckin === val ? "bg-blue-100 border-blue-500" : "bg-white"}`}
              >
                {[<FaFrown size={40} />, <FaMeh size={40} />, <FaSmile size={40} />, <FaGrin size={40} />][idx]}
                <span className={styles.heading2}>{val}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <p className={`${styles.heading2} my-6`}>Any other feedback for us?</p>
          <textarea
            value={form.feedback}
            onChange={handleChange}
            className="w-full border rounded-md p-3 h-64"
            placeholder="Write here..."
          />
        </div>

        {/* Submit */}
        <button type="submit" className={`w-full bg-[#012175] text-white py-5 rounded ${styles.heading2}` } onClick={()=>{setShowPopup(true)}}>
          Submit
        </button>
      </form>

      <div className="text-center m-auto w-full flex flex-col items-center">
        <p className="text-3xl text-gray-400 mt-30">Powered by</p>
        <Image src="/diji-logo.png" width={500} height={500} alt="Powered By" />
      </div>
          {showPopup && (
        <AlertPopup
          mainHeading={helper.heading}
          message={helper.successMessage}
          buttonText={helper.successText}
          buttonColor={helper.success}
          img="/success.png"
          onClose={handleNext}
        />
      )}
    </div>

 
  );
}
