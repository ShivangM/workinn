import { ethers } from 'ethers';
import { abi } from '../artifacts/contracts/Order.sol/OrderContract.json';
import dotenv from 'dotenv';

enum MilestoneState {
  INCOMPLETE,
  IN_PROGRESS,
  COMPLETED,
  CANCELED,
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  files: string[];
  state: MilestoneState;
  completedAt: string;
  paidAt: string;
}

dotenv.config();

const privateKey = process.env.SELLER_PRIVATE_KEY || '';
const contractAddress = process.env.ORDER_CONTRACT!;
const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY!
);

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

async function createMilestone(orderId: string, milestone: Milestone) {
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
const milestone: Milestone = {
  id: 3,
  title: 'Milestone Title',
  description: 'Milestone Description',
  amount: 1,
  deadline: '2024-11-30',
  files: ['file1', 'file2'],
  state: MilestoneState.IN_PROGRESS,
  completedAt: '',
  paidAt: '',
};

createMilestone('ORDER_ID', milestone);
