import { ethers } from 'ethers';
import { abi } from '../artifacts/contracts/Order.sol/OrderContract.json';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.SELLER_PRIVATE_KEY || '';

const contractAddress = process.env.ORDER_CONTRACT!;

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY!
);

const wallet = new ethers.Wallet(privateKey);

const signer = wallet.connect(provider);

async function createOrder() {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Call the createOrder function with the required parameters
    const tx = await contract.createOrder(
      'ORDER_ID',
      'BUYER_ID',
      'SELLER_ID',
      process.env.SELLER_ADDRESS!,
      'SERVICE_ID',
      {
        projectTitle: 'Project Title',
        projectDescription: 'Project Description',
        projectBudget: 5,
        projectDeadline: '2023-12-31',
        projectFiles: ['file1', 'file2', 'file3'],
      },
      'Seller summary'
    );

    // Wait for the transaction to be mined
    await tx.wait();
    console.log('Order created successfully!');
  } catch (error) {
    console.error('Error creating order:', error);
  }
}

createOrder();
