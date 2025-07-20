import React, { useEffect, useState } from "react";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "../context/PatientContext";
import {
  getPaymentPlan,
  getAppointmentDetails,
  getInsuranceDetails,
} from "@/app/services/paymentService";

export default function Step1() {
  const [insuranceName, setInsuranceName] = useState("Self Pay");
  const { setPaymentPlan, setAppointmentDetails, patientData } = usePatient();
  const { setCurrentStep } = useStep();

  const [amountDue, setAmountDue] = useState(null);
  const [copay, setCopay] = useState(null);

  useEffect(() => {
    if (patientData?.patientid && patientData?.departmentid) {
      fetchPaymentDetails();
      fetchAppointmentDetails();
      fetchInsuranceDetails();
    }
  }, [patientData]);

  const fetchInsuranceDetails = async () => {
    try {
      const data = await getInsuranceDetails(patientData.departmentid);
      setInsuranceName(data?.insurances?.[0]?.insuranceplanname || "Self Pay");
    } catch (error) {
      console.error("Insurance Details Error", error);
    }
  };

  const fetchPaymentDetails = async () => {
    try {
      const data = await getPaymentPlan(
        patientData.patientid,
        patientData.departmentid
      );
      setPaymentPlan(data);
      setAmountDue(typeof data[0]?.amountdue == "number" ? data[0]?.amountdue : "N/AA");
    } catch (error) {
      console.error("Payment Plan Error", error);
    }
  };

  const fetchAppointmentDetails = async () => {
    try {
      const data = await getAppointmentDetails(patientData.departmentid);
      setAppointmentDetails(data);

      setCopay(typeof data[0]?.copay == "number" ? data[0]?.copay : "N/AA");
      console.log("Copay Response", data?.copay);
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
            If the insurance information below is incorrect, please alert the
            Front Desk staff now.
          </p>
          <div className="border rounded p-3 bg-white">
            <p className="text-sm">{insuranceName}</p>
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
              <span>{copay}</span>{" "}
            </div>
            <div className="flex justify-between text-sm">
              <span>Unpaid Charges</span>
              <span>{amountDue}</span>{" "}
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                $
                {(
                  (isNaN(parseFloat(copay)) ? 0 : parseFloat(copay)) +
                  (isNaN(parseFloat(amountDue)) ? 0 : parseFloat(amountDue))
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          className="bg-[#0E0C69] text-white py-2 px-6 rounded mt-6 self-start"
          onClick={goToNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
