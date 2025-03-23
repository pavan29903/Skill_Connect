import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        localStorage.setItem("username", username || "User");
        navigate("/Home")
    }  



  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white p-8">
        {/* <img src="/signin-image.png" alt="People Connecting" className="mb-6 w-3/4" /> */}
        <h2 className="text-3xl font-semibold">Welcome to Skill Connect</h2>
        <p className="text-center mt-2 text-lg">
          Connect, Learn, and Grow with professionals around the globe
        </p>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          <p className="text-gray-500 text-center mb-4">Access your Skill Connect account</p>
          
          <button className="w-full flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100">
            <span className="mr-2"></span> Sign in with Google
          </button>
        
          <div className="text-center my-4 text-gray-500">or</div>
          
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg focus:outline-blue-500"
              />
              <span className="absolute right-3 top-3 cursor-pointer">👁️</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <label>
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          
          <p className="text-center mt-4 text-gray-500">
            Don’t have an account? <a href="#" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
