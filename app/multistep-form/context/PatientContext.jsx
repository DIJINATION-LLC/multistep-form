'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getAppointmentDetails } from '@/app/services/paymentService';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);

  // Load patient data from localStorage
  useEffect(() => {
    const storedPatient = localStorage.getItem('currentUser');
    if (storedPatient) {
      setPatientData(JSON.parse(storedPatient));
    }
  }, []);

  // Fetch appointment details once patientData is available
  useEffect(() => {

  
    const fetchAppointmentDetails = async () => {
      if (!patientData?.patientid) return;
      try {
        const response = await getAppointmentDetails(patientData?.departmentid);
        setAppointmentDetails(response); 
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [patientData]);

  return (
    <PatientContext.Provider
      value={{
        patientData,
        setPatientData,
        appointmentDetails,
        setAppointmentDetails,
        paymentPlan,
        setPaymentPlan,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
