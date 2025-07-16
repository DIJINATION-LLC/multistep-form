import "./styles/globals.css";
import { AuthProvider  } from "@/app/multistep-form/context/AuthContext";
import { PatientProvider   } from "./multistep-form/context/PatientContext";


export const metadata = {
  title: "Allen Arthritus Form",
  description: "Powered by DIJINATION LLC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <AuthProvider>
          <PatientProvider>
        {children}
        </PatientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
