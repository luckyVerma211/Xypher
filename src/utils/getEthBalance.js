import axios from "axios";

const url = 'https://go.getblock.us/722e1457c0574be89eca934495fc0c96';
const headers = { 'Content-Type': 'application/json' };

export async function fetchEthBalance(pubAddr) {
    const data = {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [pubAddr, 'latest'],
        id: 'getblock.io'
    };

    try {
        const response = await axios.post(url, data, { headers });
        const result = response?.data?.result || "0";
        // const eth = ethers.utils.formatEther(result);
        // return eth;
        const wei = BigInt(result);

        // Convert Wei to ETH (as string to preserve precision)
        const eth = Number(wei) / 1e18;

        console.log(eth,"ETH");

        return `${eth.toFixed(6)} ETH`;


    } catch (error) {
        console.error("Error fetching ETH balance:", error.response?.data || error.message);
        return "0";
    }
}
