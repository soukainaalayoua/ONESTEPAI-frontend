import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowRight,
  Target,
  CheckCircle,
  BarChart4,
  Sparkles,
  Brain,
  Trophy,
} from "lucide-react";
import Feature from "./Feature";
import { motion } from "framer-motion";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const heroLink = isAuthenticated
    ? { text: "Go to Dashboard", to: "/dashboard" }
    : { text: "Get Started", to: "/register" };

  return (
    <div className=" bg-lime-100">
      {/* Hero Section */}
      <section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-gradient-to-r from-purple-950 to-purple-700 text-white py-20 mt-1 rounded-2xl"
        >
          <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                Achieve Your Goals, One Step at a Time
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl mb-8 text-blue-100"
              >
                Let AI break down your big goals into manageable tasks and track
                your progress to success.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to={heroLink.to}
                  className="inline-flex items-center bg-white text-purple-950 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-500 transition-colors"
                >
                  {heroLink.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20 space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {[
                  {
                    icon: Target,
                    color: "bg-green-500/20 text-green-300",
                    text: "Set your ambitious goals",
                  },
                  {
                    icon: CheckCircle,
                    color: "bg-blue-500/20 text-blue-300",
                    text: "AI breaks them into manageable tasks",
                  },
                  {
                    icon: BarChart4,
                    color: "bg-purple-500/20 text-purple-300",
                    text: "Track progress with insightful reports",
                  },
                  {
                    icon: Sparkles,
                    color: "bg-yellow-500/20 text-yellow-300",
                    text: "Stay motivated with daily reminders",
                  },
                  {
                    icon: Brain,
                    color: "bg-indigo-500/20 text-indigo-300",
                    text: "Boost your focus with smart planning",
                  },
                  {
                    icon: Trophy,
                    color: "bg-red-500/20 text-red-300",
                    text: "Celebrate milestones and big wins",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-8  sm:px-6 lg:px-8 flex flex-col md:flex-row items-center py-20 p-6 rounded-lg shadow-lg border border-white/20 space-y-4">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            {
              icon: Target,
              color: "bg-purple-100 text-fuchsia-950 text-2xl ",
              title: "Define Your Goal",
              text: "Start by defining your goal. Be specific about what you want to achieve and when.",
            },
            {
              icon: CheckCircle,
              color: "bg-purple-100 text-cyan-950 text-2xl",
              title: "AI Task Breakdown",
              text: "Our AI analyzes your goal and breaks it down into manageable, actionable tasks.",
            },
            {
              icon: BarChart4,
              color: "bg-purple-100 text-lime-950 text-2xl",
              title: "Track Progress",
              text: "Complete tasks and track your progress with AI-generated reports and insights.",
            },
            {
              icon: Sparkles,
              color: "bg-purple-100 text-yellow-900 text-2xl",
              title: "Stay Inspired",
              text: "Get motivational insights and encouragement to keep moving forward every day.",
            },
            {
              icon: Brain,
              color: "bg-purple-100 text-indigo-900 text-2xl",
              title: "Focus Smarter",
              text: "Our system helps you prioritize what matters most, so you stay on track with less stress.",
            },
            {
              icon: Trophy,
              color: "bg-purple-100 text-rose-900 text-2xl",
              title: "Celebrate Success",
              text: "Earn rewards and celebrate each milestone to stay motivated and proud of your progress.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Feature
                icon={item.icon}
                color={item.color}
                title={item.title}
                text={item.text}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-150 py-16 text-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Achieve Your Goals?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of users who are breaking down their ambitious
              goals into achievable steps.
            </p>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center bg-purple-950 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 hover:text-purple-700 transition-colors text-2xl"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-6 w-6 " />
              </Link>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center bg-purple-950 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 hover:text-purple-700 transition-colors"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center bg-white text-purple-950 font-semibold px-6 py-3 rounded-lg shadow-md border border-blue-200 hover:bg-purple-700 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </motion.section>
      </section>
    </div>
  );
};

export default Home;
