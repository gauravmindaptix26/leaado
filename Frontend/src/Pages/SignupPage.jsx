import { Link } from "react-router-dom";
import bg from "../assets/background.jpg";
import SignupForm from "../components/SignupForm";
import logo from "../assets/logo.png";

export default function SignupPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8 sm:py-10 md:py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center text-center">

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="w-24 sm:w-32 md:w-40 mb-4 sm:mb-6"
        />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Automate Your Outreach. Close More Deals.
        </h1>

        <p className="text-gray-200 mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base px-2">
          Join hundreds of freelancers and agencies growing faster with
          AI-powered outreach. Submit websites, select your service and let
          <span className="font-semibold"> Leaado.ai </span> find & contact your
          leads automatically.
        </p>

         {/* Tabs */}
        <div className="flex flex-col sm:flex-row mt-8 sm:mt-10 rounded-xl gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/"
            className="flex-1 sm:flex-none sm:w-32 md:w-40 text-center py-2.5 sm:py-3 text-white bg-white/10 border border-white/20 hover:bg-white/20 transition rounded-lg text-sm sm:text-base"
          >
            LOGIN
          </Link>

          <Link
            to="/signup"
            className="flex-1 sm:flex-none sm:w-32 md:w-40 text-center py-2.5 sm:py-3 bg-white text-[#041029] font-semibold rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            SIGNUP
          </Link>
        </div>

        {/* Signup Form Component */}
        <div className="w-full mt-6 sm:mt-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
