import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    const hashed = bcrypt.hashSync(password, 10);
    const oldCryptex = JSON.parse(localStorage.getItem('cryptex')) || {};
    localStorage.setItem('cryptex', JSON.stringify({ ...oldCryptex, psswd: hashed }));
    alert("Password set successfully.");
    navigate('/seed-phrase');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-1">Create a password</h2>
          <p className="text-center text-sm text-gray-400">You will use this to unlock your wallet.</p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 rounded-lg focus:outline-none"
              required
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-purple-400 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm" className="block mb-1 text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 rounded-lg focus:outline-none"
              required
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-sm text-purple-400 hover:underline"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Set Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
