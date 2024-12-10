import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const donationData = [
	{ name: "Jul", donations: 420 },
	{ name: "Aug", donations: 380 },
	{ name: "Sep", donations: 510 },
	{ name: "Oct", donations: 460 },
	{ name: "Nov", donations: 540 },
	{ name: "Dec", donations: 720 },
	{ name: "Jan", donations: 610 },
	{ name: "Feb", donations: 590 },
	{ name: "Mar", donations: 680 },
	{ name: "Apr", donations: 630 },
	{ name: "May", donations: 710 },
	{ name: "Jun", donations: 750 },
];

const OrganDonationOverviewChart = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">Organ Donations Overview</h2>

			<div className="h-80">
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={donationData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="name" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type="monotone"
							dataKey="donations"
							stroke="#10B981"
							strokeWidth={3}
							dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default OrganDonationOverviewChart;