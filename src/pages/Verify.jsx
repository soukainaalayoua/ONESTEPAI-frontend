import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Verify = () => {
  const { state } = useLocation();
  const email = state?.email || "";
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { verify } = useContext(AuthContext);
  const navigate = useNavigate();

  const onVerify = async () => {
    if (!code) return setError("Enter code");
    setLoading(true);
    try {
      await verify(email, code);
      navigate("/payment");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Verification Code</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="6-digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={onVerify} disabled={loading}>
        {loading ? "Verifying…" : "Verify & Continue"}
      </button>
    </div>
  );
};

export default Verify;
