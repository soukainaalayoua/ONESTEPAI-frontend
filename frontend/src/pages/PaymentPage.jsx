import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://onestepai-backend-production.up.railway.app/api/payment/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.open(res.data.url, "_blank");

      setTimeout(() => {
        window.location.href = "http://localhost:5173/payment-success";
      }, 10000);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const handleFreePlan = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800 tracking-tight transition duration-300 hover:text-blue-600">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full px-4">
        {/* Free Plan */}
        <div className="group bg-white border-2 border-blue-400 shadow-lg rounded-2xl p-8 flex flex-col items-center transition duration-300 hover:bg-blue-50 hover:scale-105 hover:border-blue-600 hover:shadow-2xl cursor-pointer">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 group-hover:text-blue-700 transition duration-300">
            Free Plan
          </h2>
          <ul className="text-gray-600 mb-6 space-y-2 text-center group-hover:text-gray-800 transition duration-300">
            <li>✅ Up to 5 Goals</li>
            <li>📞 Basic Support</li>
          </ul>
          <div className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-700 transition duration-300">
            $0
          </div>
          <button
            onClick={handleFreePlan}
            className="w-full hover:cursor-pointer shadow-2xl py-3 px-6 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Continue with Free Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="group bg-white border-2 border-green-400 shadow-lg rounded-2xl p-8 flex flex-col items-center transition duration-300 hover:bg-green-50 hover:scale-105 hover:border-green-600 hover:shadow-2xl cursor-pointer">
          <h2 className="text-3xl font-bold text-green-600 mb-4 group-hover:text-green-700 transition duration-300">
            Pro Plan
          </h2>
          <ul className="text-gray-600 mb-6 space-y-2 text-center group-hover:text-gray-800 transition duration-300">
            <li>♾️ Unlimited Goals</li>
            <li>🚀 Priority Support</li>
          </ul>
          <div className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-green-700 transition duration-300">
            $5.00
          </div>
          <button
            onClick={handleUpgrade}
            className="w-full py-3 hover:cursor-pointer shadow-2xl px-6 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition duration-300"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
