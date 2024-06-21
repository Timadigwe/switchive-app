'use client';
import { FaSun, FaMoon } from 'react-icons/fa';
import Image from 'next/image';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav
      className={`flex items-center justify-between p-4 ${
        darkMode ? '' : 'bg-white'
      }  shadow-md border-b `}>
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 relative   ">
          <Image
            src="/switchive.jpeg"
            alt="Logo"
            fill={true}
          />
        </div>
        <div
          className={`text-xl font-bold ${
            darkMode ? 'text-gray' : 'text-gray-700'
          } `}>
          Switchive
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded">
        {darkMode ? (
          <FaSun className="w-6 h-6 text-yellow-500" />
        ) : (
          <FaMoon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
