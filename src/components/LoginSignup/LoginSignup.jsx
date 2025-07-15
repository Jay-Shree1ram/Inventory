import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { email } = login;

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", login);
      const token = response.data.data?.accessToken || response.data.token;
      localStorage.setItem("accessToken", token);
      toast.success(`Logged in as ${email}`);
     
      setTimeout(() => {
        navigate("/");
      }, 1500)
    } catch (error) {
      console.error("Login failed:", error);
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { email } = register;

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", register);
      console.log("Registration response:", response.data);
    
      setIsLogin(true);
      toast.success(`Registered as ${email}`);
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
      toast.error(error.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        navigate("/login");
      }, 1000)
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl p-10 shadow-lg">
        <h2 className="text-center text-4xl font-bold text-[#052535] mb-8">
          {isLogin ? "Login" : "Register"}
        </h2>
        <ToastContainer position="top-right" autoClose={3000} />
        <form
          onSubmit={isLogin ? handleSubmitLogin : handleSubmitRegister}
          className="flex flex-col gap-6"
        >
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={register.username}
                onChange={handleRegisterChange}
                placeholder="Enter your username"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#052535]"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={isLogin ? login.email : register.email}
              onChange={isLogin ? handleLoginChange : handleRegisterChange}
              placeholder="Enter your email"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={isLogin ? login.password : register.password}
              onChange={isLogin ? handleLoginChange : handleRegisterChange}
              placeholder="Enter your password"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-red-600 font-semibold">{message}</p>
        )}

        <p className="mt-6 text-sm text-center">
          {isLogin ? "Not registered?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
