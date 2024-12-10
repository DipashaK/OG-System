import { useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "DIPASHA",
    email: "dipashak0505@gmail.com",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <SettingSection icon={User} title={"Profile"}>
      {isEditing ? (
        <form
          className="bg-gray-800 p-6 rounded-md shadow-md max-w-md"
          onSubmit={handleSave}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Edit Profile
          </h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              className="mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 px-3 py-2"
              type="text"
              value={userInfo.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              className="mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 px-3 py-2"
              type="email"
              value={userInfo.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1MCkcc9N01BCt6q1G12dXL2np82d63podA&s"
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-100">
              {userInfo.name}
            </h3>
            <p className="text-gray-400">{userInfo.email}</p>
          </div>
        </div>
      )}
      {!isEditing && (
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </SettingSection>
  );
};

export default Profile;