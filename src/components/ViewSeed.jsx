import { useEffect, useState } from 'react';
import { main } from '../utils/seedGenerate';
import { useNavigate } from 'react-router';

const ViewSeed = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateWallet = async () => {
      const result = await main();

      let cryptex = JSON.parse(localStorage.getItem('cryptex')) || {};
      cryptex.wallet = result;
      localStorage.setItem('cryptex', JSON.stringify(cryptex));

      setMnemonic(result.mnemonic);
    };

    generateWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
        <h2 className="text-xl font-bold text-center">Your Secret Recovery Phrase</h2>
        <p className="text-sm text-gray-400 text-center">Save this 12-word phrase securely. It’s the only way to recover your wallet.</p>

        <div className="grid grid-cols-3 gap-3 bg-gray-900 p-4 rounded-lg">
          {mnemonic.length > 0 ? (
            mnemonic.split(' ').map((word, index) => (
              <div key={index} className="text-sm bg-gray-700 px-3 py-2 rounded font-medium text-white text-center">
                {index + 1}. {word}
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400">Generating 12-word seed phrase...</p>
          )}
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm text-gray-300">I have saved my recovery seed phrase</span>
        </label>

        <button
          onClick={() => {
            localStorage.setItem('seedSaved', JSON.stringify(true));
            navigate('/set-user-name');
          }}
          disabled={!confirmed}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            confirmed ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ViewSeed;
