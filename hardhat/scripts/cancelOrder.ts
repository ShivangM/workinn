import { ethers } from 'ethers';
import { abi } from '../artifacts/contracts/Order.sol/OrderContract.json';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.BUYER_PRIVATE_KEY || '';
const contractAddress = process.env.ORDER_CONTRACT!;
const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY!
);

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

async function cancelOrder(orderId: string) {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.cancelOrder(orderId);
    await tx.wait();
    console.log('Order canceled successfully!');
  } catch (error) {
    console.error('Error canceling order:', error);
  }
}

// Replace 'ORDER_ID' with the actual order ID
cancelOrder('ORDER_ID');
