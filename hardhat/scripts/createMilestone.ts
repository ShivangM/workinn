import { ethers } from 'ethers';
import { abi } from '../artifacts/contracts/Order.sol/OrderContract.json';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY || '';
const contractAddress = process.env.ORDER_CONTRACT!;
const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY!
);

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

async function createMilestone(orderId: string, milestone) {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.addMilestone(orderId, milestone);
    await tx.wait();
    console.log('Milestone added successfully!');
  } catch (error) {
    console.error('Error creating milestone:', error);
  }
}

// Define your milestone parameters here
const milestone = {
  id: 1, // Replace with a suitable milestone ID
  title: 'Milestone Title',
  description: 'Milestone Description',
  amount: 500, // Replace with the desired milestone amount
  deadline: '2023-11-30', // Replace with the desired deadline
  files: ['file1', 'file2'], // Replace with the milestone files
  state: 0, // Replace with the appropriate state value
  completedAt: '',
  paidAt: '',
};

// Replace 'ORDER_ID' with the actual order ID
createMilestone('ORDER_ID', milestone);
