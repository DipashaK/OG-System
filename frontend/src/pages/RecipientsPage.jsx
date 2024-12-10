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

const RecipientsPage = () => {
  const [recipients, setRecipients] = useState([]);
  const [editingRecipient, setEditingRecipient] = useState(null); // state to track the recipient being edited
  const [formData, setFormData] = useState({
    receiverName: "",
    phone: "",
    email: "",
    organ: "",
    bloodGroup: "",
    gender: "",
  });

  // Fetch recipient data from the backend
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/r", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipients(response.data);
      } catch (error) {
        console.error("Error fetching recipients:", error.response ? error.response.data : error.message);
      }
    };

    fetchRecipients();
  }, []);

  // Handle Delete recipient
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No token found.");
        toast.error("Authorization token missing. Please log in again.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/admin/api/reciever/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipients((prevRecipients) => prevRecipients.filter((recipient) => recipient._id !== id));
      toast.success("Recipient deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipient:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete recipient.");
    }
  };

  // Handle Edit recipient
  const handleEdit = (recipient) => {
    setEditingRecipient(recipient);
    setFormData({
      receiverName: recipient.receiverName,
      phone: recipient.phone,
      email: recipient.email,
      organ: recipient.organ,
      bloodGroup: recipient.bloodGroup,
      gender: recipient.gender,
    });
  };

  // Handle form data change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit edited recipient data
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No token found.");
        toast.error("Authorization token missing. Please log in again.");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/admin/api/reciever/${editingRecipient._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the recipient list after successful edit
      setRecipients((prevRecipients) =>
        prevRecipients.map((recipient) =>
          recipient._id === editingRecipient._id ? { ...recipient, ...formData } : recipient
        )
      );
      toast.success("Recipient updated successfully!");
      setEditingRecipient(null); // Close the edit form
    } catch (error) {
      console.error("Error editing recipient:", error.response ? error.response.data : error.message);
      toast.error("Failed to update recipient.");
    }
  };

  // Download report as PDF
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recipient Report", 14, 20);

    const tableColumn = [
      "Recipient Name",
      "Phone",
      "Email",
      "Required Organ",
      "Blood Group",
      "Gender",
      "Actions",
    ];
    const tableRows = recipients.map((recipient) => [
      recipient.receiverName,
      recipient.phone,
      recipient.email,
      recipient.organ,
      recipient.bloodGroup,
      recipient.gender,
      "Edit | Delete",
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    doc.save("recipients_report.pdf");
  };

  const totalRecipients = recipients.length;
  const pendingRequests = recipients.filter((recipient) => recipient.status === "Pending").length;
  const fulfilledRequests = recipients.filter((recipient) => recipient.status === "Fulfilled").length;

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Recipients"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Recipient Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Recipients"
            icon={UserPlus}
            value={totalRecipients.toString()}
            color="#6366F1"
          />
          <StatCard
            name="Pending Requests"
            icon={Clock}
            value={pendingRequests.toString()}
            color="#F59E0B"
          />
          <StatCard
            name="Fulfilled Requests"
            icon={CheckCircle}
            value={fulfilledRequests.toString()}
            color="#10B981"
          />
        </motion.div>

        {/* Edit Modal */}
        {editingRecipient && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
            <div className="bg-white p-8 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Edit Recipient</h3>
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Required Organ</label>
                  <input
                    type="text"
                    name="organ"
                    value={formData.organ}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingRecipient(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recipients Table */}
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
                <th className="py-3 px-6 font-semibold">Recipient Name</th>
                <th className="py-3 px-6 font-semibold">Phone</th>
                <th className="py-3 px-6 font-semibold">Email</th>
                <th className="py-3 px-6 font-semibold">Required Organ</th>
                <th className="py-3 px-6 font-semibold">Blood Group</th>
                <th className="py-3 px-6 font-semibold">Gender</th>
                <th className="py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient, index) => (
                <tr key={index} className="border-b cursor-pointer text-white hover:bg-gray-700">
                  <td className="py-3 px-6">{recipient.receiverName}</td>
                  <td className="py-3 px-6">{recipient.phone}</td>
                  <td className="py-3 px-6">{recipient.email}</td>
                  <td className="py-3 px-6">{recipient.organ}</td>
                  <td className="py-3 px-6">{recipient.bloodGroup}</td>
                  <td className="py-3 px-6">{recipient.gender}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => handleEdit(recipient)}
                      className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(recipient._id)}
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

export default RecipientsPage;
