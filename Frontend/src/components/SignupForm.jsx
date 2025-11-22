import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const initialValues = {
  fullName: "",
  email: "",
  mobile: "",
  country: "",
  password: "",
  confirmPassword: ""
};

export default function SignupForm() {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          country: formData.country
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage("Account created! Redirecting to login...");
      setFormData(initialValues);
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 text-white space-y-4 sm:space-y-6 shadow-2xl"
    >
      {error && (
        <p className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-500/40 rounded-lg py-2 px-4">
          {error}
        </p>
      )}
      {message && (
        <p className="text-green-300 text-xs sm:text-sm bg-green-400/10 border border-green-300/40 rounded-lg py-2 px-4">
          {message}
        </p>
      )}

      {/* Full Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Full Name</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 sm:py-3">
            <FiUser className="text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-transparent py-1 sm:py-0 outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Email Address</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 sm:py-3">
            <FiMail className="text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full bg-transparent py-1 sm:py-0 outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>
      </div>

      {/* Mobile + Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Mobile Number</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 sm:py-3">
            <FiPhone className="text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile no."
              className="w-full bg-transparent py-1 sm:py-0 outline-none text-xs sm:text-base text-white placeholder-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-white/10 rounded-xl px-4 py-2 sm:py-3 text-xs sm:text-base text-white outline-none"
          >
            <option value="">Select your country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Password</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 sm:py-3">
            <FiLock className="text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-transparent py-1 sm:py-0 outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm text-left w-full block mb-2">Confirm Password</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 sm:py-3">
            <FiLock className="text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full bg-transparent py-1 sm:py-0 outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
      >
        {isSubmitting ? "Processing..." : "SIGNUP"}
      </button>
    </form>
  );
}
