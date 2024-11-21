import React from 'react';
import { FaStar, FaBook, FaPen } from 'react-icons/fa'; 

export default function Cards() {
  return (
    <div className="mt-8 flex space-x-4 ml-10">
      <div className="border rounded-lg p-4 shadow-md w-96 h-32 flex items-center justify-between" style={{ backgroundColor: '#a3cfc3' }}>
        <div className="flex items-center space-x-2">
          <FaStar className="text-4xl text-gray-800" /> 
          <h4 className="text-gray-800 font-semibold text-lg">Reviews</h4>
        </div>
        <p className="text-gray-600 text-4xl text-right">30</p>
      </div>

      <div className="border rounded-lg p-4 shadow-md w-96 h-32 flex items-center justify-between" style={{ backgroundColor: '#a3cfc3' }}>
        <div className="flex items-center space-x-2">
          <FaBook className="text-4xl text-gray-800" /> 
          <h4 className="text-gray-800 font-semibold text-lg">Books</h4>
        </div>
        <p className="text-gray-600 text-4xl text-right">15</p>
      </div>

      <div className="border rounded-lg p-4 shadow-md w-96 h-32 flex items-center justify-between" style={{ backgroundColor: '#a3cfc3' }}>
        <div className="flex items-center space-x-2">
          <FaPen className="text-4xl text-gray-800" />
          <h4 className="text-gray-800 font-semibold text-lg">Users</h4>
        </div>
        <p className="text-gray-600 text-4xl text-right">20</p>
      </div>
    </div>
  );
}
