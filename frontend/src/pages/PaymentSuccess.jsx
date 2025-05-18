import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const upgradeUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        await axios.patch(
          "https://handsome-mercury-anorak.glitch.me/api/users/make-pro",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Delay before navigating
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000); // 2.5s for animation
      } catch (error) {
        console.error("Error upgrading user:", error);
      }
    };

    upgradeUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-green-700 text-lg mb-4">
          You've been upgraded to <span className="font-semibold">Pro</span> 🎉
        </p>
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
