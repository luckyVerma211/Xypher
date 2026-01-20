
import { useState, useEffect } from 'react';
import { sendTransactionWithProvider } from '../utils/sendEthereum'
import { useNavigate } from 'react-router';

const SendEth = () => {
    const [privateKey, setPrivateKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const cryptex = JSON.parse(localStorage.getItem('cryptex'));
            const pvtkey = cryptex?.wallet?.ethereum?.pvtKey || null;
            setPrivateKey(pvtkey);
        } catch (e) {
            console.log("Something Wrong");
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const receiver = e.target.recipient.value.trim();
        const amt = e.target.amount.value.trim(); // <- important fix

        if (!receiver || isNaN(Number(amt)) || Number(amt) <= 0) {
            alert("Enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const sig = await sendTransactionWithProvider(privateKey, receiver, amt);
            alert(`Transaction successful!\nSignature: ${sig}`);
        } catch (err) {
            console.log(err);
            alert("Transaction failed: " + err.message);
        } finally {
            setLoading(false);
            navigate("/wallet");
        }
    };




    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center">Send Ethereum</h2>

                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium mb-1">
                        Enter Recipient's Ethereum Address
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        name='recipient'
                        required
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 "
                        placeholder="Enter Recipient's Ethereum Address"
                    />
                </div>

                <div>
                    <label htmlFor="recipient2" className="block text-sm font-medium mb-1">
                        Enter Amount
                    </label>
                    <input
                        type="number"
                        step="0.000001"
                        min="0"
                        id="amount"
                        name='amount'
                        required
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 "
                        placeholder="Enter amount in ETH"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg font-semibold transition ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                        </div>
                    ) : (
                        "Send ETH"
                    )}
                </button>

            </form>
        </div>
    )
}

export default SendEth