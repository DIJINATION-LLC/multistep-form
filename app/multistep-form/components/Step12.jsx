"use client";
import React, { useEffect, useState } from "react";
import StepHeader from "./StepHeader";
import AlertPopup from "./AlertPopup";
import helper from "@/app/utils/helper";
import { useStep } from "@/app/multistep-form/context/Context";
import { getQuestionnaire } from "@/app/services/questionnaireService";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import toast from "react-hot-toast";

export default function Step12() {
  const { patientData } = usePatient();
  const { setCurrentStep } = useStep();
  const [questions, setQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [answers, setAnswers] = useState({});

  const encounterId = 40941; // hardcoded for now
  const patientId = patientData.patientid;
  const departmentId = patientData?.departmentid;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionnaire({ encounterId, patientId, departmentId });
        const firstTemplate = response?.questionnairescreeners?.[0]?.sections?.[0]?.questionlist;

        if (!firstTemplate?.length) {
          toast.error("Wellness questionnaire not found");
          return;
        }
        
        const filteredQuestions = firstTemplate.filter((q) => [1, 2].includes(q.questionid));
        setQuestions(filteredQuestions);
        toast.success("Wellness questions loaded successfully");
      } catch (error) {
        console.error("Fetch Questionnaire Error:", error);
        toast.error("Failed to load wellness questions");
      }
    };

    fetchQuestions();
  }, []);


  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 justify-center items-center px-4 sm:px-10">
      <StepHeader />

      {showPopup && (
        <AlertPopup
          mainHeading={helper.heading}
          message={helper.successMessage}
          buttonText={helper.successText}
          buttonColor={helper.success}
          img="/success.png"
          onClose={() => setCurrentStep((prev) => prev + 1)}
        />
      )}

      <div className="py-4 w-full text-left">
        <h1 className="text-2xl font-bold text-[#0E0C69]">Wellness Questionnaire</h1>
        <p className="text-sm text-gray-500 mt-1">
          Over the last two weeks, how often have you been bothered by any of the following problems?
        </p>
      </div>

      <div className="w-full max-w-xl flex-1 pt-4 pb-6 space-y-6">
        {questions.map((q) => (
          <div key={q.questionid}>
            <p className="text-sm font-medium text-[#0E0C69] mb-2">
              {q.question} <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {q.possibleanswers.map((opt, i) => {
                const inputId = `question-${q.questionid}-option-${i}`;
                const selected = answers[q.questionid] === opt;

                return (
                  <label
                    key={inputId}
                    htmlFor={inputId}
                    className={`border text-center py-2 px-3 rounded-md cursor-pointer transition
                      ${selected ? "bg-[#0E0C69] text-white" : "border-[#0E0C69] text-[#0E0C69] hover:bg-[#0E0C69] hover:text-white"}
                    `}
                  >
                    <input
                      type="radio"
                      id={inputId}
                      name={`question-${q.questionid}`}
                      value={opt}
                      checked={selected}
                      onChange={() => handleSelectAnswer(q.questionid, opt)}
                      className="hidden"
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <p className="text-xs text-red-500 mt-2">*Required</p>

        <div className="bg-white w-full py-4">
          <button
            onClick={handleNext}
            className="w-full bg-[#0E0C69] text-white py-3 rounded-md text-center font-medium hover:opacity-90 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
