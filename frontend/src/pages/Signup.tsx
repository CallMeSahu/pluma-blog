import { Link, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import { LabeledInput } from "../components/LabeledInput";
import { useState } from "react";
import { SignupSchema } from "@callmesahu/pluma-blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

const Signup = () => {
  const [formInputs, setFormInputs] = useState<SignupSchema>({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const sendRequest = async() => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, formInputs);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Account Created!")
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast.error("Error Signing Up!")
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="h-screen w-1/2 flex justify-center items-center">
        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-500 text-lg mb-5">
            Already have an account? <Link className="underline" to="/signin">Login</Link>
          </p>
          <LabeledInput
            label="Name" placeholder="Enter your name"
            onChange={(e) => { setFormInputs({ ...formInputs, name: e.target.value }) }}
          />
          <LabeledInput
            label="Email" type="email" placeholder="Enter your email"
            onChange={(e) => { setFormInputs({ ...formInputs, email: e.target.value }) }}
          />
          <LabeledInput
            label="Password" type="password" placeholder="Enter your password"
            onChange={(e) => { setFormInputs({ ...formInputs, password: e.target.value }) }}
          />
          <button className="w-full mt-1 p-2 bg-zinc-900 rounded-lg text-lg text-white font-semibold" onClick={sendRequest}>Sign Up</button>
        </div>
      </div>
      <Quote />
    </div>
  )
};

export default Signup;