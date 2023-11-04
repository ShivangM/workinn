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

async function signOrder(orderId: string, amount: number) {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.signOrder(orderId, {
      value: amount,
    });
    await tx.wait();
    console.log('Order signed successfully!');
  } catch (error) {
    console.error('Error signing order:', error);
  }
}

// Replace the value of 'amount' with the appropriate value in wei
signOrder('ORDER_ID', 5);
