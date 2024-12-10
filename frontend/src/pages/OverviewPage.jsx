import { Heart, UserPlus, ShieldCheck, Activity } from "lucide-react"; // Updated icons
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import OrganDonationOverviewChart from "../components/overview/OrganDonationOverview"; // Renamed chart
import DonationCategoryChart from "../components/overview/OrganDonationChart"; // Renamed chart
import DonationSourceChart from "../components/overview/OrganDonationBarChart"; // Renamed chart

const OverviewPage = () => {
	const [donors, setDonors] = useState([]);
	const [receivers, setReceivers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
		  try {
			// Retrieve the token from localStorage (or wherever you store it)
			const token = localStorage.getItem("auth_token");  // Ensure the token is stored in localStorage after login
	  
			if (!token) {
			  console.error("No token found.");
			  return;
			}
	  
			const response = await axios.get("http://localhost:5000/api/admin", {
			  headers: {
				Authorization: `Bearer ${token}`,  // Send the token as Bearer token
			  },
			});
			console.log(response.data);  // Log the response
	  
			// Update the donors state with the fetched data
			setDonors(response.data);
		  } catch (error) {
			console.error("Error fetching donors:", error.response ? error.response.data : error.message);
		  }
		};
	  

		// Check admin email
		const email = localStorage.getItem("email"); // Use your email storage logic
		if (email === "dipashak0505@gmail.com") {
			fetchUsers();
		} else {
			setError("Access denied. Admin only.");
			setLoading(false);
		}
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Organ Donation Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Donors' icon={UserPlus} value='8,432' color='#6366F1' />
					<StatCard name='Organs Donated' icon={Heart} value='12,345' color='#8B5CF6' />
					<StatCard name='Successful Transplants' icon={ShieldCheck} value='10,678' color='#10B981' />
					{/* <StatCard name='Success Rate' icon={Activity} value='85.3%' color='#EC4899' /> */}
				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<OrganDonationOverviewChart />
					<DonationCategoryChart />
					<DonationSourceChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;