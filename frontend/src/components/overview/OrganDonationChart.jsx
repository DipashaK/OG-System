import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  donors: "#6366F1",  // Blue
  receivers: "#EC4899",  // Pink
};

const OrganDonationChart = () => {
  const [donorsData, setDonorsData] = useState([]);
  const [receiversData, setReceiversData] = useState([]);
  const [organData, setOrganData] = useState([]);

  // Fetch donors and receivers data
  useEffect(() => {
    const fetchOrganData = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Get token from localStorage
        if (!token) {
          console.error("No token found. Please login.");
          return;
        }
        // Fetch both donors and receivers
        const [donorsResponse, receiversResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/admin", {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token as Bearer token
            },
          }),
          axios.get("http://localhost:5000/api/admin/r", {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token as Bearer token
            },
          }),
        ]);        

        // Process the data to match the chart format
        const processedData = processOrganData(
          donorsResponse.data,
          receiversResponse.data
        );
        setOrganData(processedData);
      } catch (error) {
        console.error("Error fetching organ data:", error);
      }
    };

    fetchOrganData();
  }, []);

  // Process data for chart
  const processOrganData = (donors, receivers) => {
    const organTypes = ["Kidneys", "Liver", "Heart", "Lungs", "Pancreas"];
    const result = organTypes.map((organ) => ({
      name: organ,
      donors: 0,
      receivers: 0,
    }));

    // Add donor data
    donors.forEach((donor) => {
      const organIndex = organTypes.indexOf(donor.organ);
      if (organIndex !== -1) {
        result[organIndex].donors += 1;
      }
    });

    // Add receiver data
    receivers.forEach((receiver) => {
      const organIndex = organTypes.indexOf(receiver.organ);
      if (organIndex !== -1) {
        result[organIndex].receivers += 1;
      }
    });

    return result;
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Donors vs Receivers by Organ Type
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={organData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="donors"
              stroke={COLORS.donors}
              strokeWidth={3}
              dot={{ r: 6, strokeWidth: 2, fill: COLORS.donors }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="receivers"
              stroke={COLORS.receivers}
              strokeWidth={3}
              dot={{ r: 6, strokeWidth: 2, fill: COLORS.receivers }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrganDonationChart;
