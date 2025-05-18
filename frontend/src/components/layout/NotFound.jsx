import Lottie from "lottie-react";
import notFoundAnimation from "./notfound.json";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={notFoundAnimation} loop />
      <h1 className="text-3xl font-bold mt-4"></h1>
    </div>
  );
};
export default NotFoundPage;
