import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    }
  }, [params, navigate]);

  return <p>Signing you in...</p>;
};

export default AuthSuccess;
