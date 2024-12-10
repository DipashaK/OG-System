import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CheckCircle, Clock, UserPlus, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

const DonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // State for modal visibility
  const [selectedDonor, setSelectedDonor] = useState(null);  // State for selected donor data
  const [updatedDonorData, setUpdatedDonorData] = useState({
    donorName: '',
    phone: '',
    email: '',
    organ: '',
    bloodGroup: '',
    gender: ''
  });

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("No token found.");
        toast.error("Authorization token missing. Please log in again.");
        return;
      }
      await axios.delete(`http://localhost:5000/api/admin/api/donor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDonors((prevDonors) => prevDonors.filter((donor) => donor._id !== id));
      toast.success("Donor deleted successfully!");
    } catch (error) {
      console.error("Error deleting donor:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete donor.");
    }
  };

  // Open Edit Modal and set selected donor data
  const handleEdit = (donor) => {
    setSelectedDonor(donor);
    setUpdatedDonorData({
      donorName: donor.donorName,
      phone: donor.phone,
      email: donor.email,
      organ: donor.organ,
      bloodGroup: donor.bloodGroup,
      gender: donor.gender,
    });
    setIsEditModalOpen(true);  // Open modal
  };

  // Handle Edit form submission
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("No token found.");
        toast.error("Authorization token missing. Please log in again.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/admin/api/donor/${selectedDonor._id}`,
        updatedDonorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor._id === selectedDonor._id ? { ...donor, ...updatedDonorData } : donor
        )
      );
      toast.success("Donor updated successfully!");
      setIsEditModalOpen(false);  // Close modal after successful update
    } catch (error) {
      console.error("Error updating donor:", error.response ? error.response.data : error.message);
      toast.error("Failed to update donor.");
    }
  };

  // Handle changes in the edit form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDonorData({
      ...updatedDonorData,
      [name]: value,
    });
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
                      onClick={() => handleEdit(donor)}
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

      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Donor</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">Donor Name</label>
                <input
                  type="text"
                  id="donorName"
                  name="donorName"
                  value={updatedDonorData.donorName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={updatedDonorData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedDonorData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="organ" className="block text-sm font-medium text-gray-700">Organ</label>
                <input
                  type="text"
                  id="organ"
                  name="organ"
                  value={updatedDonorData.organ}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                <input
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  value={updatedDonorData.bloodGroup}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={updatedDonorData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DonorsPage;
