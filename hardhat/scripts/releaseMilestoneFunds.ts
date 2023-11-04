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

async function releaseMilestoneFunds(orderId: string, milestoneId: number) {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.releaseMilestoneFunds(orderId, milestoneId);
    await tx.wait();
    console.log('Milestone funds released successfully!');
  } catch (error) {
    console.error('Error releasing milestone funds:', error);
  }
}

// Replace 'MILESTONE_ID' with the ID of the milestone to release funds for
releaseMilestoneFunds('ORDER_ID', 1);

// 1986
// 3341