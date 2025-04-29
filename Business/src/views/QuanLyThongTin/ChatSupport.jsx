import React from 'react';

const ChatSupport = () => {
  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2"
        style={{ backgroundColor: '#4dc247', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#43b341')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4dc247')}
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            1
          </span>
        </div>
      </button>
    </div>
  );
};

export default ChatSupport;
