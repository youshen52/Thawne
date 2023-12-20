import React from 'react';

function verifyChatModal({ password, setPassword, handlePasswordSubmit, closeVerifyChatModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Enter Password</h2>
        <label className="text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4"
        />
        <div className="flex justify-between">
          <button onClick={handlePasswordSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
          <button onClick={closeVerifyChatModal} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default verifyChatModal;