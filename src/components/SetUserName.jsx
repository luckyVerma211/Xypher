import { useState } from 'react';
import { useNavigate } from 'react-router';

const SetUserName = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    const cryptex = JSON.parse(localStorage.getItem('cryptex')) || {};
    localStorage.setItem('cryptex', JSON.stringify({ ...cryptex, userName }));
    localStorage.setItem('userName', userName); // Optional fallback

    navigate('/wallet');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-center mb-1">Choose a Username</h2>
          <p className="text-center text-sm text-gray-400">This will personalize your wallet experience.</p>
        </div>

        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-600 bg-gray-900 rounded-lg focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SetUserName;
