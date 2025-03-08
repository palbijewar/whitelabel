import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogo = () => {
    setIsOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-16 bg-gray-900 flex items-center justify-between px-6 text-white relative">
      <div className="text-2xl font-bold cursor-pointer"  onClick={handleLogo}>P</div>
      <div className="relative">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUser className="text-2xl cursor-pointer" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-md shadow-lg overflow-hidden">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleProfile}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;