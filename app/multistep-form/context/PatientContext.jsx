'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
 const [paymentPlan, setPaymentPlan] = useState(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem('currentUser');
    if (storedPatient) {
      setPatientData(JSON.parse(storedPatient));
    }
   
  }, []);

  return (
    <PatientContext.Provider value={{
  patientData, setPatientData,
  paymentPlan, setPaymentPlan,
  appointmentDetails, setAppointmentDetails,
}}>
  {children}
</PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
