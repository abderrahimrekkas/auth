import React from 'react';

const ComingSoon = ({ setView }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-black via-zinc-900 to-neutral-900 text-white">
      <div className="text-center p-8 sm:p-10 bg-black/70 border border-cyan-300 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-300 text-lg">
          We’re working hard behind the scenes to bring you something amazing.
        </p>
        <button
          onClick={() => setView('login')}
          className="mt-8 px-6 py-3 rounded-full bg-cyan-300 text-black font-medium hover:bg-cyan-400 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
