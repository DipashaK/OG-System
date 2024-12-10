import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MatchingPage = () => {
  const [donors, setDonors] = useState([]);
  const [receivers, setReceivers] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/donor')
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching donors:', error);
      });

    axios.get('http://localhost:5000/api/receivers')
      .then((response) => {
        setReceivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching receivers:', error);
      });
  }, []);

  const matchDonorsAndReceivers = () => {
    const matches = [];
    
    donors.forEach((donor) => {
      receivers.forEach((receiver) => {
        if (donor.organ === receiver.organ && donor.bloodGroup == receiver.bloodGroup) {
          matches.push({ donor, receiver });
        }
      });
    });

    return matches;
  };

  // Handle confirming a match
  const handleMatchConfirm = async (donorId, receiverId) => {
    try {
      // Update donor and receiver in the backend to reflect the match
      await axios.put(`http://localhost:5000/api/donor/match/${donorId}`, { receiverId });
      await axios.put(`http://localhost:5000/api/receiver/match/${receiverId}`, { donorId });

      toast.success("Match confirmed!");
      
      // Optionally update the state to reflect the changes locally
      setDonors(donors.filter((donor) => donor._id !== donorId));
      setReceivers(receivers.filter((receiver) => receiver._id !== receiverId));

    } catch (error) {
      console.error("Error confirming match:", error);
      toast.error("Failed to confirm match.");
    }
  };

  const matchedPairs = matchDonorsAndReceivers();

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="mt-8 shadow-lg rounded-lg overflow-hidden mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Matched Donors and Receivers</h2>
          
          {/* Display matched pairs */}
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 font-semibold">Donor Name</th>
                <th className="py-3 px-6 font-semibold">Receiver Name</th>
                <th className="py-3 px-6 font-semibold">Organ</th>
                <th className="py-3 px-6 font-semibold">Blood Group</th>
                <th className="py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchedPairs.map((match, index) => (
                <tr key={index} className="border-b cursor-pointer text-white hover:bg-gray-700">
                  <td className="py-3 px-6">{match.donor.donorName}</td>
                  <td className="py-3 px-6">{match.receiver.receiverName}</td>
                  <td className="py-3 px-6">{match.donor.organ}</td>
                  <td className="py-3 px-6">{match.donor.bloodGroup}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    {/* Action buttons (e.g., confirm match, etc.) */}
                    <button
                      className="text-green-500 hover:text-green-600 focus:outline-none"
                      onClick={() => handleMatchConfirm(match.donor._id, match.receiver._id)}
                    >
                      Confirm Match
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MatchingPage;