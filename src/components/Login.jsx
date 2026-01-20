import React from 'react';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router';

const Login = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const cryptex = JSON.parse(localStorage.getItem('cryptex'));
        const hashedPassword = cryptex.psswd;
        const isMatch = bcrypt.compareSync(password, hashedPassword);

        if(isMatch) {
            console.log("Welcome")
            localStorage.setItem('isLoggedIn',JSON.stringify(true));
            navigate('/wallet')
        }
        else {
            console.log("Mismatch");
        }
    }
    return (
        <>
            <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2">Enter Your Password</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 bottom-2 text-gray-400 hover:text-gray-200 focus:text-gray-200"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            

                            <button
                                type="submit"
                                
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${ password.length > 0
                                        ? 'bg-purple-600 hover:bg-purple-700'
                                        : 'bg-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Unlock
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;