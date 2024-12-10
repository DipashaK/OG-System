import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/common/Header'

const OrganDonorManager = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({
    organ: '',
    donorName: '',
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

    fetchDonors(storedEmail); // Fetch donors for this email
  }, []);

  const fetchDonors = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Authentication token not found.');
        return;
      }
  
      const response = await axios.get('http://localhost:5000/api/donor', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setDonors(response.data); // Assuming the API returns an array of donors
      console.log('Donors fetched successfully:', response.data);
    } catch (error) {
      toast.error('Error fetching donors.');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const addOrUpdateDonor = async () => {
    const { donorName, phone, email, gender, organ, bloodGroup } = newDonor;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (email !== localEmail) {
      toast.error('You are only allowed to add donors with your email.');
      return;
    }

    if (!donorName || !phone || !gender || !organ || !bloodGroup) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (newDonor.id) {
        await axios.put(`http://localhost:5000/api/donor/${newDonor.id}`, newDonor);
        toast.success('Donor updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/donor', newDonor , {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Donor added successfully!');
      }
      fetchDonors(localEmail); // Fetch donors for this email after adding/updating
      resetForm();
    } catch (error) {
      toast.error('Error saving donor.');
      console.error(error);
    }

    setIsModalOpen(false);
  };

  const editDonor = (donor) => {
    setNewDonor(donor);
    setIsModalOpen(true);
    setEmailError('');
  };

  const deleteDonor = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
      await axios.delete(`http://localhost:5000/api/donor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonors(donors.filter((donor) => donor._id !== id));
      toast.success('Donor deleted successfully!');
    } catch (error) {
      toast.error('Error deleting donor.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewDonor({
      organ: '',
      donorName: '',
      phone: '',
      email: '',
      gender: '',
      bloodGroup: '',
      id: null, // Reset ID for new donors
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
    <Header title='Organ Donation' />

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
            Add Donor
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
                  <th className="border-b border-gray-600 px-2 py-2">Donor Name</th>
                  <th className="border-b border-gray-600 px-2 py-2">Phone</th>
                  <th className="border-b border-gray-600 px-2 py-2">Email</th>
                  <th className="border-b border-gray-600 px-2 py-2">Organ</th>
                  <th className="border-b border-gray-600 px-2 py-2">Blood Group</th>
                  <th className="border-b border-gray-600 px-2 py-2">Gender</th>
                  <th className="border-b border-gray-600 px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr
                    key={donor._id}
                    className="hover:bg-gray-700 transition-colors duration-300 animate-slide-in"
                  >
                    <td className="border-b border-gray-600 px-2 py-2">{index + 1}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.donorName}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.phone}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.email}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.organ}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.bloodGroup}</td>
                    <td className="border-b border-gray-600 px-2 py-2">{donor.gender}</td>
                    <td className="border-b border-gray-600 px-2 py-2">
                      <button
                        onClick={() => editDonor(donor)}
                        className="text-blue-500 hover:text-blue-400 mx-2 transition-transform transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDonor(donor._id)}
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

      {/* Modal for Add/Edit Donor */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg overflow-y-auto animate-fade-in">
            <h2 className="text-white text-2xl font-semibold mb-4">
              {newDonor.id ? 'Edit Donor' : 'Add Donor'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-white font-semibold" htmlFor="donorName">
                  Donor Name
                </label>
                <input
                  id="donorName"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.donorName}
                  onChange={(e) => setNewDonor({ ...newDonor, donorName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="organ">
                  Organ
                </label>
                <input
                  id="organ"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.organ}
                  onChange={(e) => setNewDonor({ ...newDonor, organ: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <input
                  id="bloodGroup"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.bloodGroup}
                  onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="gender">
                  Gender
                </label>
                <input
                  id="gender"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={newDonor.gender}
                  onChange={(e) => setNewDonor({ ...newDonor, gender: e.target.value })}
                />
              </div>
            </form>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addOrUpdateDonor}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {newDonor.id ? 'Update Donor' : 'Add Donor'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default OrganDonorManager;