import axios from "axios";
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const collegeRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signup() {
        setLoading(true);
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const college = collegeRef.current?.value;
        const location = locationRef.current?.value;
        const skills = skillsRef.current?.value;
        
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                email,
                password,
                college,
                location,
                skills
            });

            if (response.data.token) {
                localStorage.setItem("token", `Bearer ${response.data.token}`);
                localStorage.setItem("username", username || "User");
                navigate("/home");
            } else {
                alert("Signup failed! No token received.");
            }
        } catch (error) {
          console.log(error)
            alert("Error signing up!");
        } finally {
            setLoading(false);
        }
    }

  return (
        <div className="">
           <div className="bg-white shadow-lg py-4 text-lg font-semibold text-start pl-4 text-blue-600">
        SkillConnect
      </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Create Your Account</h2>
        <p className="text-gray-500 text-center mb-4">Join SkillConnect today</p>
        
        <form className="space-y-4">
          <div className="flex space-x-2">
            <input
             ref={usernameRef} 
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
              />
          </div>
          <input
           ref={emailRef} 
            type="email"
            placeholder="Email ID"
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
          <input
           ref={passwordRef} 
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
               <input
                ref={collegeRef} 
            type=""
            placeholder="college name"
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
               <input
                ref={usernameRef} 
            type=""
            placeholder="location"
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
               <input
                ref={skillsRef} 
            type=""
            placeholder="skills"
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
            />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            onClick={signup}
            >
            Sign Up
          </button>
        </form>
        
        <div className="text-center my-4 text-gray-500">Or continue with</div>
        
        <button className="w-full flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100">
          <span className="mr-2"></span> Sign up with Google
        </button>
    
      </div>
    </div>
              </div>
  );
};

export default Signup;
