import React from "react";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/auth/register", form);
    navigate("/login");
  };
  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border mb-3" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border mb-3" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-3" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
