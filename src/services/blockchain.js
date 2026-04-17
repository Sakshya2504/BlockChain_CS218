import { ethers } from "ethers";

//  CONFIG (REPLACE LATER)

// Replace when teammate gives contract
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

// Paste ABI here later
const CONTRACT_ABI = [];

//  CONNECT WALLET
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            alert("❌ MetaMask not installed");
            return null;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        return accounts[0]; // return wallet address
    } catch (error) {
        console.error("Wallet connection error:", error);
    }
};

//  GET CURRENT WALLET (NO POPUP)
export const getCurrentWallet = async () => {
    try {
        if (!window.ethereum) return null;

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
        console.error(error);
    }
};

//  GET CONTRACT INSTANCE
const getContract = async () => {
    try {
        if (!window.ethereum) {
            alert("Install MetaMask");
            return null;
        }

        //  Provider (connects to blockchain)
        const provider = new ethers.BrowserProvider(window.ethereum);

        //  Signer (user wallet)
        const signer = await provider.getSigner();

        //  Contract instance
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        return contract;
    } catch (error) {
        console.error("Contract error:", error);
    }
};

//  REGISTER IDENTITY (WRITE)
export const registerIdentity = async (hash) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.registerIdentity(hash);

        console.log("Transaction sent:", tx.hash);

        await tx.wait();

        console.log("Transaction confirmed");

        return tx;
    } catch (error) {
        console.error("Register error:", error);
    }
};

//  CHECK VERIFICATION (READ)
export const isVerified = async (address) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const result = await contract.isVerified(address);

        return result;
    } catch (error) {
        console.error("Check error:", error);
    }
};

//  VERIFY USER (ADMIN)
export const verifyIdentity = async (address) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.verifyIdentity(address);

        await tx.wait();

        return tx;
    } catch (error) {
        console.error("Verify error:", error);
    }
};

//  REVOKE USER (ADMIN)
export const revokeIdentity = async (address) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.revokeIdentity(address);

        await tx.wait();

        return tx;
    } catch (error) {
        console.error("Revoke error:", error);
    }
};