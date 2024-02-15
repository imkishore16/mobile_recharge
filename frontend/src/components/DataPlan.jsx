import React from 'react';

const DataPlan = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[20%]">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 uppercase tracking-wide text-sm rounded-t-lg">
        NEWLY LAUNCHED
      </div>
      <div className="text-4xl font-bold text-black py-8 px-4 text-center">
        ₹899
      </div>
      <div className="flex justify-center items-center space-x-4 py-4">
        <div className="bg-blue-100 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <div className="bg-blue-100 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20h4a2 2 0 002-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="text-gray-500 text-sm font-medium">
          +2 more
        </div>
      </div>
      <div className="flex justify-between items-center px-4 border-t border-gray-200">
        <div className="text-gray-500 text-sm font-medium">
          VALIDITY
          <br />
          <span className="text-black font-bold">90 Days</span>
        </div>
        <div className="text-gray-500 text-sm font-medium">
          DATA
          <br />
          <span className="text-black font-bold">2.5 GB/Day</span>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 px-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Recharge
        </button>
        <button className="text-blue-500 font-bold py-2 px-4 rounded">
          View details
        </button>
      </div>
    </div>
  );
};

export default DataPlan;
