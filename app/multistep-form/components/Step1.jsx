import React, { useEffect, useState } from "react";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "../context/PatientContext";
import { getPaymentPlan, getAppointmentDetails } from "@/app/services/paymentService";




export default function Step1() {
  const { setPaymentPlan, setAppointmentDetails , patientData } = usePatient();
  const { setCurrentStep } = useStep();

  const [amountDue, setAmountDue] = useState(0);
  const [copay, setCopay] = useState(0);

  useEffect(() => {
    if (patientData?.patientid && patientData?.departmentid) {
      fetchPaymentDetails();
      fetchAppointmentDetails();
    }
  }, [patientData]);



const fetchPaymentDetails = async () => {
  try {
    const data = await getPaymentPlan(patientData.patientid, patientData.departmentid);
    setPaymentPlan(data);
    setAmountDue(data?.amountdue || "N/A");
  } catch (error) {
    console.error("Payment Plan Error", error);
  }
};

const fetchAppointmentDetails = async () => {
  try {
    const data = await getAppointmentDetails(patientData.departmentid);
    setAppointmentDetails(data);
    setCopay(data?.copay || "N/A");
  } catch (error) {
    console.error("Appointment Details Error", error);
  }
};


  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flex-1 p-6 flex flex-col overflow-auto">
      <StepHeader />
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Insurance</h3>
          <p className="text-sm text-gray-600 mb-2">
            If the insurance information below is incorrect, please alert the Front Desk staff now.
          </p>
          <div className="border rounded p-3 bg-white">
            <p className="text-sm">Primary Insurance</p>
            <p className="text-base font-medium">Self pay</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Payment</h3>
          <p className="text-sm text-gray-600 mb-2">
            We will collect payment before today’s appointment.
          </p>
          <div className="border rounded p-3 bg-white space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today's Copay</span>
              <span>${copay}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Unpaid Charges</span>
              <span>${amountDue}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${parseFloat(copay) + parseFloat(amountDue)}</span>
            </div>
          </div>
        </div>

        <button className="bg-[#0E0C69] text-white py-2 px-6 rounded mt-6 self-start" onClick={goToNextStep}>
          Next Step
        </button>
      </div>
    </div>
  );
}
