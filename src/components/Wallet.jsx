import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchSolBalance } from '../utils/getSolBalance';
import { fetchEthBalance } from '../utils/getEthBalance';

const Wallet = () => {
    const [userName, setUserName] = useState('');
    const [btcAddr, setBtcAddr] = useState('');
    const [ethAddr, setEthAddr] = useState('');
    const [solAddr, setSolAddr] = useState('');
    const [solBalance, setSolBalance] = useState(null);
    const [ethBalance, setEthBalance] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('userName');
        const cryptex = JSON.parse(localStorage.getItem('cryptex'));

        const btc = cryptex?.wallet?.bitcoin?.pubAddress;
        const eth = cryptex?.wallet?.ethereum?.pubAddress;
        const sol = cryptex?.wallet?.solana?.pubAddress;

        setUserName(username);
        setBtcAddr(btc);
        setEthAddr(eth);
        setSolAddr(sol);

        if (sol) {
            fetchSolBalance(sol).then(balance => {
                // console.log("Sol :",balance);

                setSolBalance(balance);
            });
        }

        const fetchBalance = async () => {
            try {
                const balance = await fetchEthBalance(eth);
                console.log("Ethereum : ",balance);
                setEthBalance(balance);
            } catch (err) {
                console.error("ETH balance fetch failed:", err);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className='p-4 gap-4'>
            <h1 className='m-8 text-xl font-bold'> Welcome To Xypher Wallet {userName}!</h1>
            <div className='flex justify-center items-center gap-4'>


                <Card
                    name="Ethereum"
                    address={ethAddr}
                    imgaddr="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s"
                    balance={ethBalance}
                    pathroute="/sendEth"
                />

                <Card
                    name="Solana"
                    address={solAddr}
                    imgaddr="https://png.pngtree.com/png-vector/20220913/ourmid/pngtree-solana-sol-cryptocurrency-symbol-depicted-on-a-plain-white-backdrop-vector-png-image_39199908.png"
                    balance={solBalance}
                    pathroute="/sendSol"
                />
            </div>
        </div>
    );
};

export default Wallet;
