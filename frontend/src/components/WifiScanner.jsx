import React from 'react';
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function WiFiScanner() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  const fetchNetworks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/wifi/scan");
      let nets = res.data.networks || [];
      nets.sort((a, b) => (b.signal_level || 0) - (a.signal_level || 0));
      setNetworks(nets);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Logging out.");
        logout();
        navigate("/login");
      } else {
        setError(err.response?.data?.msg || err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user) return;
    fetchNetworks();
    const interval = setInterval(fetchNetworks, 10000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Wi‑Fi Scanner</h2>
        <button
          onClick={fetchNetworks}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-600">Scanning networks…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && networks.length === 0 && !error && (
        <p className="text-gray-600">No networks found or adapter unavailable.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {networks.map((net) => (
          <div
            key={net.bssid || net.mac || net.ssid}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-lg">{net.ssid || "<Hidden SSID>"}</div>
              <p className="text-sm text-gray-600">
                Security: {net.security || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                Signal: {net.signal_level ?? net.quality ?? "N/A"} dBm
              </p>
            </div>
            <div className="mt-2">
              <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, 100 + (net.signal_level || -100)))}%`,
                  }}
                />
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              BSSID: {net.bssid || net.mac || "N/A"} • Frequency:{" "}
              {net.frequency ?? "N/A"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
