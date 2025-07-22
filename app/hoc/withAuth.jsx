// withAuth.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Loader1} from "../multistep-form/components/LoaderOverlay";

const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // wait until auth check
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("userToken");
      console.log("Token:", token);
      setIsAuthenticated(!!token);
      setLoading(false); // stop loading after token check
    }, []);

    if (loading) {
      return <div  >
        <Loader1 />
      </div>; // show loader until token is verified
    }

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
