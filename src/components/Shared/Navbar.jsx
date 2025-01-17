import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center  py-2">
        {/* App Name */}
        <NavLink
          to="/"
          className="text-lg font-bold text-white hover:text-blue-400 transition mr-10"
        >
          BlackRose
        </NavLink>

        {/* Navigation Links */}
        <div className="flex gap-x-6 ml-10">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-gray-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              } transition`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/csv-records"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-gray-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              } transition`
            }
          >
            CSV Records
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
