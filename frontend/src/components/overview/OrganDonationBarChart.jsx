import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
} from "recharts";

const DONOR_COLORS = ["#6366F1", "#8B5CF6", "#3B82F6", "#60A5FA", "#BFDBFE"]; // Donor-specific colors
const RECEIVER_COLORS = ["#EC4899", "#F472B6", "#FB7185", "#FCA5A5", "#FECACA"]; // Receiver-specific colors

const OrganDonationBarChart = () => {
    const [organData, setOrganData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

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
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganData();
    }, []);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error fetching the data.</p>;
    }

    return (
        <motion.div
            className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className="text-lg font-medium mb-4 text-gray-100">Organ Donations by Type</h2>
            <div className="h-80">
                <ResponsiveContainer>
                    <BarChart data={organData}>
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
                        <Bar dataKey="donors" fill="#6366F1">
                            {organData.map((entry, index) => (
                                <Cell
                                    key={`donors-${index}`}
                                    fill={DONOR_COLORS[index % DONOR_COLORS.length]}
                                />
                            ))}
                        </Bar>
                        <Bar dataKey="receivers" fill="#EC4899">
                            {organData.map((entry, index) => (
                                <Cell
                                    key={`receivers-${index}`}
                                    fill={RECEIVER_COLORS[index % RECEIVER_COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default OrganDonationBarChart;
