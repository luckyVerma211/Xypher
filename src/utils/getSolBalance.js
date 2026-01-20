import axios from "axios";

const url = "https://go.getblock.us/5392ac99c92841d0a12aa48c2c3194fc";
const headers = { "Content-Type": "application/json" };



export const fetchSolBalance = async (pubAddr) => {
    const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [
            pubAddr,
            null
        ]
    };
    try {
        const response = await axios.post(url, payload, { headers });

        if (response.status === 200) {
            const balanceInfo = response.data.result;
            // console.log("Account Balance:", balanceInfo?.value || "No balance data available");
            const lmp= balanceInfo?.value;
            const ans = lmp/1e9;
            return `${ans.toFixed(6)} SOL`;
        } else {
            console.error("Unexpected status:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
};