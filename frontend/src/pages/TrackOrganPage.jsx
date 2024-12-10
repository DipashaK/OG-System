// import { CheckCircle, Truck, MapPin } from "lucide-react";
// import { motion } from "framer-motion";

// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";

// // Example driver data
// const drivers = [
//   {
//     name: "Alice Brown",
//     pickupLocation: "New York Hospital",
//     dropOffLocation: "Los Angeles Clinic",
//     location: "40.7128,-74.0060", // Example coordinates for the map
//     photo: "https://randomuser.me/api/portraits/women/68.jpg",
//   },
//   {
//     name: "Bob Martin",
//     pickupLocation: "Boston Medical Center",
//     dropOffLocation: "San Francisco Hospital",
//     location: "42.3601,-71.0589",
//     photo: "https://randomuser.me/api/portraits/men/75.jpg",
//   },
//   {
//     name: "Charlie Davis",
//     pickupLocation: "Chicago Health Center",
//     dropOffLocation: "Seattle General Hospital",
//     location: "41.8781,-87.6298",
//     photo: "https://randomuser.me/api/portraits/men/62.jpg",
//   },
// ];

// const openMap = (location) => {
//   const url = `https://www.google.com/maps?q=${location}`;
//   window.open(url, "_blank");
// };

// const TrackDonorsPage = () => {
//   return (
//     <div className="flex-1 relative z-10 overflow-auto">
//       <Header title={"Track Donors"} />

//       <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
//         {/* Driver Stats */}
//         <motion.div
//           className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <StatCard name="Total Drivers" icon={Truck} value={drivers.length} color="#6366F1" />
//           <StatCard name="Active Deliveries" icon={MapPin} value="3" color="#F59E0B" />
//           <StatCard name="Successful Transports" icon={CheckCircle} value="45" color="#10B981" />
//         </motion.div>

//         {/* Drivers Table */}
//         <div className="mt-8 shadow-lg rounded-lg overflow-hidden">
//           <table className="min-w-full text-sm text-left text-gray-900">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-6 font-semibold">Driver Name</th>
//                 <th className="py-3 px-6 font-semibold">Pickup Location</th>
//                 <th className="py-3 px-6 font-semibold">Drop-Off Location</th>
//                 <th className="py-3 px-6 font-semibold">Driver Photo</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drivers.map((driver, index) => (
//                 <tr
//                   key={index}
//                   className="border-b cursor-pointer text-white hover:bg-gray-700"
//                 >
//                   <td
//                     className="py-3 px-6 text-blue-600 underline cursor-pointer"
//                     onClick={() => openMap(driver.location)}
//                   >
//                     {driver.name}
//                   </td>
//                   <td className="py-3 px-6">{driver.pickupLocation}</td>
//                   <td className="py-3 px-6">{driver.dropOffLocation}</td>
//                   <td className="py-3 px-6">
//                     <img
//                       src={driver.photo}
//                       alt={`${driver.name}'s photo`}
//                       className="w-10 h-10 rounded-full"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TrackDonorsPage;





import { CheckCircle, Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

// Example driver data
const drivers = [
  {
    name: "Alice Brown",
    pickupLocation: "New York Hospital",
    dropOffLocation: "Los Angeles Clinic",
    location: "40.7128,-74.0060", // Example coordinates for the map
    dropLocation: "34.0522,-118.2437",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Bob Martin",
    pickupLocation: "Boston Medical Center",
    dropOffLocation: "San Francisco Hospital",
    location: "42.3601,-71.0589",
    dropLocation: "37.7749,-122.4194",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Charlie Davis",
    pickupLocation: "Chicago Health Center",
    dropOffLocation: "Seattle General Hospital",
    location: "41.8781,-87.6298",
    dropLocation: "47.6062,-122.3321",
    photo: "https://randomuser.me/api/portraits/men/62.jpg",
  },
];

const openMap = (coordinates) => {
  const url = `https://www.google.com/maps?q=${coordinates}`;
  window.open(url, "_blank");
};

const TrackDonorsPage = () => {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Track Donors"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Driver Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Drivers" icon={Truck} value={drivers.length} color="#6366F1" />
          <StatCard name="Active Deliveries" icon={MapPin} value="3" color="#F59E0B" />
          <StatCard name="Successful Transports" icon={CheckCircle} value="45" color="#10B981" />
        </motion.div>

        {/* Drivers Table */}
        <div className="mt-8 shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 font-semibold">Driver Name</th>
                <th className="py-3 px-6 font-semibold">Pickup Location</th>
                <th className="py-3 px-6 font-semibold">Drop-Off Location</th>
                <th className="py-3 px-6 font-semibold">Driver Photo</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index} className="border-b cursor-pointer text-white hover:bg-gray-700">
                  <td className="py-3 px-6">{driver.name}</td>
                  <td
                    className="py-3 px-6 text-blue-600 underline cursor-pointer"
                    onClick={() => openMap(driver.location)}
                  >
                    {driver.pickupLocation}
                  </td>
                  <td
                    className="py-3 px-6 text-blue-600 underline cursor-pointer"
                    onClick={() => openMap(driver.dropLocation)}
                  >
                    {driver.dropOffLocation}
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src={driver.photo}
                      alt={`${driver.name}'s photo`}
                      className="w-10 h-10 rounded-full"
                    />
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

export default TrackDonorsPage;
