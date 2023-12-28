import React from 'react';
import FileCarousel from './ChatView/FileCarousel';

function ChatDetails({ chatDetails, onClose }) {
    return (
        <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-white shadow-md p-4 overflow-y-auto max-h-full">
    <div className="flex flex-col h-full space-y-4">
        <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Chat Details</h2>
        <div className="overflow-y-auto">
            <p>Chat ID: {chatDetails.chat_id}</p>
            <p>Security Level: {chatDetails.security_level}</p>
            <p>Chat Description: This is the chat description</p>
        </div>
        </div>

        <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Files</h2>
        <FileCarousel />
        </div>

        <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Participants</h2>
        <div className="flex items-center mb-3">
        <img
                    className="object-cover w-12 h-12 rounded-full mr-4"
                    src="/images/default_pfp.png"
                    alt="username"
                />
            <div>
            <p className="font-semibold">User 1</p>
            <p className="text-gray-500 text-sm">ID: 001</p>
            </div>
        </div>

        {/* Participant 2 */}
        <div className="flex items-center mb-3">
        <img
                    className="object-cover w-12 h-12 rounded-full mr-4"
                    src="/images/default_pfp.png"
                    alt="username"
                />
            <div>
            <p className="font-semibold">User 2</p>
            <p className="text-gray-500 text-sm">ID: 002</p>
            </div>
        </div>

        {/* Participant 3 */}
        <div className="flex items-center mb-3">
        <img
                    className="object-cover w-12 h-12 rounded-full mr-4"
                    src="/images/default_pfp.png"
                    alt="username"
                />
            <div>
            <p className="font-semibold">User 3</p>
            <p className="text-gray-500 text-sm">ID: 003</p>
            </div>
        </div>
        </div>

        <div className="flex-grow">
            <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Close
            </button>
        </div>
    </div>
    </div>

    );
}

export default ChatDetails;
