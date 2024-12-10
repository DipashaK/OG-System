import React from 'react';
import { Link } from 'react-router-dom'; 
import donorPic from './donor.jpg'; 
import receiverPic from './donor-receiver.jpg'; 

const DonorReceiverPage = () => {
  return (
    <div className="flex h-screen">
      <div className="group flex-1 bg-cover bg-center relative cursor-pointer" style={{ backgroundImage: `url(${donorPic})` }} >
        <div className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300 group-hover:opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${donorPic})` }}
        ></div>

        <div className="relative text-center text-white flex justify-center items-center h-full">
          <div>
            <h2 className="text-3xl mb-4 font-bold group-hover:scale-105 transition-transform duration-300">
              Donor
            </h2>
            <Link to="/add-organ">
              <button className="px-8 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-600 transition duration-300">
                Click Me
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="group flex-1 bg-cover bg-center relative cursor-pointer" style={{ backgroundImage: `url(${receiverPic})` }}>
        <div className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300 group-hover:opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${receiverPic})` }}
        ></div>

        <div className="relative text-center text-white flex justify-center items-center h-full">
          <div>
            <h2 className="text-3xl mb-4 font-bold group-hover:scale-105 transition-transform duration-300">
              Receiver
            </h2>
            <Link to="/add-receiver">
              <button className="px-8 py-3 bg-green-700 text-white rounded-full hover:bg-green-600 transition duration-300">
                Click Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorReceiverPage;
