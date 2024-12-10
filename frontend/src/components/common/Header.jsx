import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email from local storage or API
    const email = localStorage.getItem("userEmail"); // Replace this with appropriate logic
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const toggleLogout = () => {
    setLogoutVisible((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.clear(); // Replace this with appropriate session management logic
    navigate("/"); // Redirect to home page
  };

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white">{title}</h1>

        {/* Profile Section */}
        <div className="relative">
          {/* Profile Icon */}
          <button
            onClick={toggleLogout}
            className="text-white hover:text-gray-400 transition duration-200"
          >
            <FaUserCircle size={28} />
          </button>

          {/* Dropdown Menu */}
          {isLogoutVisible && (
            <div
              className="absolute right-0 mt-2 z-50 bg-white rounded-lg shadow-lg p-2"
              style={{ minWidth: "200px" }}
            >
              {/* User Email */}
              {userEmail && (
                <div className="text-sm text-gray-700 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">Email:</span> {userEmail}
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm font-semibold text-red-600 px-4 py-2 hover:bg-red-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;