import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Verify from "./pages/Verify";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Dashboard from "./components/dashboard/Dashboard";
import GoalDetails from "./pages/GoalDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CommunityPage from "./components/community/CommunityPage";
import NotFound from "./components/layout/NotFound";

// Wrapper for page transitions
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* <div className="w-full max-w-7xl"> */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />
            <Route
              path="/verify"
              element={
                <PageTransition>
                  <Verify />
                </PageTransition>
              }
            />
            <Route
              path="/community"
              element={
                <PageTransition>
                  <CommunityPage />
                </PageTransition>
              }
            />
            <Route
              path="/payment"
              element={
                <PageTransition>
                  <PaymentPage />
                </PageTransition>
              }
            />
            <Route
              path="/payment-success"
              element={
                <PageTransition>
                  <PaymentSuccess />
                </PageTransition>
              }
            />
            <Route
              path="/payment-cancel"
              element={
                <PageTransition>
                  <PaymentCancel />
                </PageTransition>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <Dashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals/:goalId"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <GoalDetails />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
