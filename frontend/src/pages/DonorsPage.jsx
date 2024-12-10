import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CheckCircle, Clock, UserPlus, DollarSign, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

const DonorsPage = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem("auth_token"); 
  
        if (!token) {
          console.error("No token found.");
          return;
        }
  
        const response = await axios.get("http://localhost:5000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(response.data); 
  
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchDonors();
  }, []);
  
  const totalDonors = donors.length;
  const pendingDonations = donors.filter(donor => donor.organ === "Pending").length;
  const completedDonations = donors.filter(donor => donor.organ !== "Pending").length;
  const totalFundsRaised = donors.reduce((acc, donor) => acc + (donor.fundRaised || 0), 0);

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Donor Report", 14, 20);

    const tableColumn = [
      "Donor Name",
      "Phone",
      "Email",
      "Organ",
      "Blood Group",
      "Gender",
      "Actions",
    ];
    const tableRows = donors.map((donor) => [
      donor.donorName,
      donor.phone,
      donor.email,
      donor.organ,
      donor.bloodGroup,
      donor.gender,
      "Edit | Delete", // Placeholder for actions
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    doc.save("donors_report.pdf");
  };

  const handleDelete = (id) => {
    const deleteDonor = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/donor/${id}`);
        setDonors(donors.filter((donor) => donor._id !== id)); // Update the state
        toast.success("Donor deleted successfully!"); // Success toast
      } catch (error) {
        console.error("Error deleting donor:", error);
        toast.error("Failed to delete donor."); // Error toast
      }
    };

    deleteDonor();
  };

  const handleEdit = (id) => {
    console.log("Edit donor", id);
    toast.info("Edit functionality is not implemented yet."); // Edit info toast
  };

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Donors"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Donors"
            icon={UserPlus}
            value={totalDonors.toString()}
            color="#6366F1"
          />
          <StatCard
            name="Pending Donations"
            icon={Clock}
            value={pendingDonations.toString()}
            color="#F59E0B"
          />
          <StatCard
            name="Completed Donations"
            icon={CheckCircle}
            value={completedDonations.toString()}
            color="#10B981"
          />
          {/* <StatCard
            name="Total Funds Raised"
            icon={DollarSign}
            value={`$${totalFundsRaised}`}
            color="#EF4444"
          /> */}
        </motion.div>

        <div className="mt-8 shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-end mb-4">
            <button
              onClick={downloadReport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Download Report
            </button>
          </div>

          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 font-semibold">Donor Name</th>
                <th className="py-3 px-6 font-semibold">Phone</th>
                <th className="py-3 px-6 font-semibold">Email</th>
                <th className="py-3 px-6 font-semibold">Organ</th>
                <th className="py-3 px-6 font-semibold">Blood Group</th>
                <th className="py-3 px-6 font-semibold">Gender</th>
                <th className="py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={index} className="border-b cursor-pointer text-white hover:bg-gray-700">
                  <td className="py-3 px-6">{donor.donorName}</td>
                  <td className="py-3 px-6">{donor.phone}</td>
                  <td className="py-3 px-6">{donor.email}</td>
                  <td className="py-3 px-6">{donor.organ}</td>
                  <td className="py-3 px-6">{donor.bloodGroup}</td>
                  <td className="py-3 px-6">{donor.gender}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => handleEdit(donor._id)}
                      className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(donor._id)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default DonorsPage;