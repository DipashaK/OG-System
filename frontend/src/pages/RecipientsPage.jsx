// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { CheckCircle, Clock, UserPlus, DollarSign, Edit, Trash } from 'lucide-react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { toast, ToastContainer } from 'react-toastify'; // Import toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";

// const RecipientsPage = () => {
//   const [receivers, setReceivers] = useState([]);

//   useEffect(() => {
//     // Fetch receiver data from backend
//     const fetchReceivers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/receivers');
//         setReceivers(response.data); // Store the receiver data in state
//       } catch (error) {
//         console.error("Error fetching receivers:", error);
//       }
//     };

//     fetchReceivers();
//   }, []);

//   const downloadReport = () => {
//     const doc = new jsPDF();

//     // Add a title
//     doc.text("Recipients Report", 14, 10);

//     // Add the table using autoTable
//     doc.autoTable({
//       head: [["Receiver Name", "Organ", "Phone", "Email", "Blood Group", "Gender"]],
//       body: receivers.map((receiver) => [
//         receiver.receiverName,
//         receiver.organ,
//         receiver.phone,
//         receiver.email,
//         receiver.bloodGroup,
//         receiver.gender,
//       ]),
//       startY: 20,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [41, 128, 185] },
//     });

//     // Save the PDF
//     doc.save("recipients_report.pdf");
//   };

//   const handleEdit = (receiverId) => {
//     // Handle the edit action, e.g., show an edit form or modal
//     console.log("Edit receiver with ID:", receiverId);
//     // Toastify notification for edit (assuming you're showing an edit modal or some UI update)
//     toast.success('Receiver updated successfully!');
//   };

//   const handleDelete = async (id) => {
//     // Handle the delete action
//     try {
//       await axios.delete(`http://localhost:5000/api/receivers/${id}`);
//       setReceivers(receivers.filter(receiver => receiver._id !== id));
//       toast.success('Receiver deleted successfully!');
//     } catch (error) {
//       console.error("Error deleting receiver:", error);
//       toast.error('Failed to delete receiver.');
//     }
//   };

//   // Calculate stats dynamically based on receivers data
//   const totalRecipients = receivers.length;
//   const pendingTransplants = receivers.filter(receiver => receiver.organ === "Pending").length; // Assuming 'Pending' is used to mark pending transplants
//   const completedTransplants = receivers.filter(receiver => receiver.organ !== "Pending").length; // Assuming non-pending entries are completed
//   const totalFundsRaised = receivers.reduce((acc, receiver) => acc + (receiver.fundRaised || 0), 0); // Assuming there's a `fundRaised` field

//   return (
//     <div className="flex-1 relative z-10 overflow-auto">
//       <Header title={"Recipients"} />

//       <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
//         {/* Recipient Stats */}
//         <motion.div
//           className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <StatCard name="Total Recipients" icon={UserPlus} value={totalRecipients.toString()} color="#6366F1" />
//           <StatCard name="Pending Transplants" icon={Clock} value={pendingTransplants.toString()} color="#F59E0B" />
//           <StatCard
//             name="Completed Transplants"
//             icon={CheckCircle}
//             value={completedTransplants.toString()}
//             color="#10B981"
//           />
//           <StatCard name="Total Funds Raised" icon={DollarSign} value={`$${totalFundsRaised}`} color="#EF4444" />
//         </motion.div>

//         {/* Recipients Table */}
//         <div className="mt-8 shadow-lg rounded-lg overflow-hidden">
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={downloadReport}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Download Report
//             </button>
//           </div>

//           <table className="min-w-full text-sm text-left text-gray-900">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-6 font-semibold">Receiver Name</th>
//                 <th className="py-3 px-6 font-semibold">Organ Received</th>
//                 <th className="py-3 px-6 font-semibold">Phone</th>
//                 <th className="py-3 px-6 font-semibold">Email</th>
//                 <th className="py-3 px-6 font-semibold">Blood Group</th>
//                 <th className="py-3 px-6 font-semibold">Gender</th>
//                 <th className="py-3 px-6 font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {receivers.map((receiver) => (
//                 <tr key={receiver.id} className="border-b cursor-pointer text-white hover:bg-gray-700">
//                   <td className="py-3 px-6">{receiver.receiverName}</td>
//                   <td className="py-3 px-6">{receiver.organ}</td>
//                   <td className="py-3 px-6">{receiver.phone}</td>
//                   <td className="py-3 px-6">{receiver.email}</td>
//                   <td className="py-3 px-6">{receiver.bloodGroup}</td>
//                   <td className="py-3 px-6">{receiver.gender}</td>
//                   <td className="py-3 px-6 flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(receiver.id)}
//                       className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
//                     >
//                       <Edit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(receiver._id)}
//                       className="text-red-500 hover:text-red-600 focus:outline-none"
//                     >
//                       <Trash size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* Toastify Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default RecipientsPage;















import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CheckCircle, Clock, UserPlus, DollarSign, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify styles

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

const RecipientsPage = () => {
  // State to store the list of recipients
  const [recipients, setRecipients] = useState([]);

  // Fetch recipient data from the backend
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Retrieve the token

        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/r", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as Bearer token
          },
        });
        console.log(response.data); // Log the response

        // Update the recipients state with the fetched data
        setRecipients(response.data);
      } catch (error) {
        console.error("Error fetching recipients:", error.response ? error.response.data : error.message);
      }
    };

    fetchRecipients();
  }, []);

  // Calculate recipient stats from the data
  const totalRecipients = recipients.length;
  const pendingRequests = recipients.filter((recipient) => recipient.status === "Pending").length;
  const fulfilledRequests = recipients.filter((recipient) => recipient.status === "Fulfilled").length;

  // Download report as PDF
  const downloadReport = () => {
    const doc = new jsPDF();

    // Set the title
    doc.setFontSize(16);
    doc.text("Recipient Report", 14, 20);

    // Define the table columns and rows
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

    // Add the table
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    // Save the PDF
    doc.save("recipients_report.pdf");
  };

  // Handle Delete recipient
  const handleDelete = (id) => {
    const deleteRecipient = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/recipients/${id}`);
        setRecipients(recipients.filter((recipient) => recipient._id !== id)); // Update the state
        toast.success("Recipient deleted successfully!"); // Success toast
      } catch (error) {
        console.error("Error deleting recipient:", error);
        toast.error("Failed to delete recipient."); // Error toast
      }
    };

    deleteRecipient();
  };

  // Handle Edit recipient (for now, just show a toast)
  const handleEdit = (id) => {
    console.log("Edit recipient", id);
    toast.info("Edit functionality is not implemented yet."); // Edit info toast
  };

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
                      onClick={() => handleEdit(recipient._id)}
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

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RecipientsPage;
