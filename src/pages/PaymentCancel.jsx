import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-800 mb-4">
        Payment Cancelled ❌
      </h1>
      <p className="text-red-700 text-lg mb-6">
        Your payment was not completed. You can try again later.
      </p>
      <button
        onClick={handleBack}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentCancel;
