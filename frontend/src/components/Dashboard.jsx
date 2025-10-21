import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axiosInstance.get("/auth/protected").then((res) => setMessage(res.data.msg));
  }, []);
  return (
    <div className="text-center mt-20 text-xl">
      <h2>Welcome, {user?.name}</h2>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}
