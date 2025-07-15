import React, { useState } from "react";
import axios from "axios";

const PingCheck = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePing = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/ping");
      if (response.status === 200) {
        setStatus("✅ Server is running");
      } else {
        setStatus("⚠️ Unexpected response from server");
      }
    } catch (error) {
      setStatus("❌ Server is down or not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Server Ping Check</h1>
      <button
        onClick={handlePing}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Checking..." : "Ping Server"}
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
};

export default PingCheck;
