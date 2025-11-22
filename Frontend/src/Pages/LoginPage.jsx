import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import bg from "../assets/background.jpg";
import logo from "../assets/logo.png";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);

      if (res.data.success) {
        loginUser(res.data.token, res.data.user); // Pass both token and user data
      } else {
        alert("Invalid login credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4 py-8 sm:py-10 md:py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-24 sm:w-32 md:w-40 mb-4 sm:mb-6" />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          Automate Your Outreach. Close More Deals.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-3 sm:mt-4 max-w-xl px-2">
          Join hundreds of freelancers and agencies growing faster with AI-powered outreach. Submit websites, select your service
           and let <span className="font-semibold"> Leaaado.ai </span>
          find & contact your leads automatically.
        </p>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row mt-8 sm:mt-10 rounded-xl gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/"
            className="flex-1 sm:flex-none sm:w-32 md:w-40 text-center py-2.5 sm:py-3 bg-white text-[#041029] font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            LOGIN
          </Link>

          <Link
            to="/signup"
            className="flex-1 sm:flex-none sm:w-32 md:w-40 text-center py-2.5 sm:py-3 text-white bg-white/10 border border-white/20 hover:bg-white/20 transition rounded-lg"
          >
            SIGNUP
          </Link>
        </div>

        {/* Form (wrapped with handleLogin) */}
        <form onSubmit={handleLogin} className="w-full mt-6 sm:mt-8">
          <LoginForm setForm={setForm} />
        </form>
      </div>
    </div>
  );
}
