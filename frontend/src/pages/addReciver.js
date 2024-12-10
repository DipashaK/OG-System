import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/common/Header'

const OrganReceiverManager = () => {
  const [receivers, setReceivers] = useState([]);
  const [newReceiver, setNewReceiver] = useState({
    organ: '',
    receiverName: '',
    phone: '',
    email: '',
    gender: '',
    bloodGroup: '',
    id: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setLocalEmail(storedEmail); // Set the email in state
    } else {
      toast.error('No email found in local storage.');
      navigate('/login'); // Redirect to login page if email is not found
    }

    fetchReceivers(storedEmail); // Fetch receivers for this email
  }, []);

  const fetchReceivers = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Authentication token not found.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/receiver', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReceivers(response.data); // Assuming the API returns an array of receivers
      console.log('Receivers fetched successfully:', response.data);
    } catch (error) {
      toast.error('Error fetching receivers.');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const addOrUpdateReceiver = async () => {
    const { receiverName, phone, email, gender, organ, bloodGroup } = newReceiver;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (email !== localEmail) {
      toast.error('You are only allowed to add receivers with your email.');
      return;
    }

    if (!receiverName || !phone || !gender || !organ || !bloodGroup) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (newReceiver.id) {
        await axios.put(`http://localhost:5000/api/receiver/${newReceiver.id}`, newReceiver);
        toast.success('Receiver updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/receiver', newReceiver, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Receiver added successfully!');
      }
      fetchReceivers(localEmail); // Fetch receivers for this email after adding/updating
      resetForm();
    } catch (error) {
      toast.error('Error saving receiver.');
      console.error(error);
    }

    setIsModalOpen(false);
  };

  const editReceiver = (receiver) => {
    setNewReceiver(receiver);
    setIsModalOpen(true);
    setEmailError('');
  };

  const deleteReceiver = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
      await axios.delete(`http://localhost:5000/api/receiver/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReceivers(receivers.filter((receiver) => receiver._id !== id));
      toast.success('Receiver deleted successfully!');
    } catch (error) {
      toast.error('Error deleting receiver.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewReceiver({
      organ: '',
      receiverName: '',
      phone: '',
      email: '',
      gender: '',
      bloodGroup: '',
      id: null, // Reset ID for new receivers
    });
    setIsModalOpen(false);
    setEmailError('');
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data if needed
    localStorage.removeItem('userEmail');
    toast.success('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="bg-gray-900 min-h-screen p-5">
      <Header title='Organ Receiver' />

      <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-16 animate-fade-in">
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="bg-blue-600 text-white rounded px-3 py-1.5 text-sm transition-transform transform hover:scale-105 hover:bg-blue-700"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Add Receiver
          </button>
        </div>

        <div className="overflow-x-auto mb-6">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="loader"></div>
            </div>
          ) : (
            <table className="table-auto w-full text-left bg-gray-800 text-gray-300 animate-fade-in">
              <thead>
                <tr>
                  <th className="border-b border-gray-600 px-2 py-2">#</th>
                  <th className="border-b border-gray-600 px-2 py-2">Receiver Name</th>
                  <th className="border-b border-gray-600 px-2 py-2">Phone</th>
                  <th className="border-b border-gray-600 px-2 py-2">Email</th>
                  <th className="border-b border-gray-600 px-2 py-2">Organ</th>
                  <th className="border-b border-gray-600 px-2 py-2">Blood Group</th>
                  <th className="border-b border-gray-600 px-2 py-2">Gender</th>
                  <th className="border-b border-gray-600 px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receivers.map((receiver, index) => (
                  <tr
                    key={receiver._id}
                    className="hover:bg-gray-700 transition-colors duration-300 animate-slide-in"
                  >
                    <td className="border-b border-gray-600 px-2 py-2">{index + 1}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.receiverName}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.phone}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.email}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.organ}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.bloodGroup}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{receiver.gender}</td>
                    <td className="border-b border-gray-600 px-2 py-2">
                      <button
                        onClick={() => editReceiver(receiver)}
                        className="text-blue-500 hover:text-blue-400 mx-2 transition-transform transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReceiver(receiver._id)}
                        className="text-red-500 hover:text-red-400 mx-2 transition-transform transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Receiver */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg overflow-y-auto animate-fade-in">
            <h2 className="text-white text-2xl font-semibold mb-4">
              {newReceiver.id ? 'Edit Receiver' : 'Add Receiver'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-white font-semibold" htmlFor="receiverName">
                  Receiver Name
                </label>
                <input
                  id="receiverName"
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.receiverName}
                  onChange={(e) => setNewReceiver({ ...newReceiver, receiverName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.phone}
                  onChange={(e) => setNewReceiver({ ...newReceiver, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.email}
                  onChange={(e) => setNewReceiver({ ...newReceiver, email: e.target.value })}
                  required
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="organ">
                  Organ
                </label>
                <input
                  id="organ"
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.organ}
                  onChange={(e) => setNewReceiver({ ...newReceiver, organ: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <input
                  id="bloodGroup"
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.bloodGroup}
                  onChange={(e) => setNewReceiver({ ...newReceiver, bloodGroup: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="gender">
                  Gender
                </label>
                <input
                  id="gender"
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={newReceiver.gender}
                  onChange={(e) => setNewReceiver({ ...newReceiver, gender: e.target.value })}
                  required
                />
              </div>
            </form>

            <div className="flex justify-between mt-6">
              <button
                className="bg-red-600 text-white rounded px-4 py-2 transition-transform transform hover:scale-105"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white rounded px-4 py-2 transition-transform transform hover:scale-105"
                onClick={addOrUpdateReceiver}
              >
                {newReceiver.id ? 'Update Receiver' : 'Add Receiver'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default OrganReceiverManager;
