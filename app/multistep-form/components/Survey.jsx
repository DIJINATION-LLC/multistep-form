// components/Survey.jsx
"use client";
import styles from "@/app/styles/style";
import { useState } from "react";
import { FaFrown, FaMeh, FaSmile, FaGrin } from "react-icons/fa";

export default function Survey() {
  const [form, setForm] = useState({
    ipadExperience: "",
    digitalCheckin: "",
    feedback: ""
  });

  const handleRadio = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleChange = (e) => {
    setForm({ ...form, feedback: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Submitted:", form);
    // You can trigger your popup here
  };

  return (
    <div className="w-full h-full mx-auto p-10 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Survey</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Q1 */}
        <div>
          <p className="font-medium mb-2">
            How satisfied or dissatisfied are you with the staff’s explanation of how to use the iPad?
          </p>
          <div className="flex justify-between gap-2">
            {["Very Dissatisfied", "Dissatisfied", "Satisfied", "Very Satisfied"].map((val, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRadio("ipadExperience", val)}
                className={`flex-1 px-3 py-6 border rounded-md flex flex-col items-center gap-1 ${
                  form.ipadExperience === val ? "bg-blue-100 border-blue-500" : "bg-white"
                }`}
              >
                {[<FaFrown size={40} />, <FaMeh size={40} />, <FaSmile size={40} />, <FaGrin size={40} />][idx]}
                <span className={styles.heading2}>{val}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <p className="font-medium mb-2">
            How satisfied or dissatisfied are you with the digital check-in?
          </p>
          <div className="flex justify-between gap-2">
            {["Very Dissatisfied", "Dissatisfied", "Satisfied", "Very Satisfied"].map((val, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRadio("digitalCheckin", val)}
                className={`flex-1 p-10 border rounded-md flex flex-col items-center gap-1 ${
                  form.digitalCheckin === val ? "bg-blue-100 border-blue-500" : "bg-white"
                }`}
              >
                {[<FaFrown size={40} />, <FaMeh size={40} />, <FaSmile size={40} />, <FaGrin size={40} />][idx]}
                <span className={styles.heading2}>{val}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <p className="font-medium mb-2">Any other feedback for us?</p>
          <textarea
            value={form.feedback}
            onChange={handleChange}
            className="w-full border rounded-md p-3 h-24"
            placeholder="Write here..."
          />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">
          Submit
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">Powered by <strong>DIJINATION</strong></p>
    </div>
  );
}
