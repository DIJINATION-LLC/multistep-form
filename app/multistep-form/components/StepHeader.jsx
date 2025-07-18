"use client"

import styles from '@/app/styles/style'
import React from 'react'
import { usePatient } from '@/app/multistep-form/context/PatientContext'

const StepHeader = () => {

  const {patientData} = usePatient()
    const Data = [{
      
    }]

    // console.log("Patient data",patientData)
  return (
     <div className="mb-4 items-center text-center">
        <h1 className={` text-[#353535] ${styles.heading1}` }>Welcome, {patientData?.firstname || "Patient"}.</h1>
        <p className="text-gray-500 text-sm mt-1">
          You're scheduled to see John Lavery, MD at {patientData?.firstappointment?.split(' ')[1] || "N/A"}.
        </p>
        <hr className="mt-4 border-[#D4D4D4] w-full text-center m-auto" />
      </div>
  )
}

export default StepHeader