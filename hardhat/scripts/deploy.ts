import { ethers } from 'hardhat';

async function main() {
  const OrderContract = await ethers.getContractFactory('OrderContract');

  // Start deployment, returning a promise that resolves to a contract object
  const orderContract = await OrderContract.deploy();

  // Wait for the contract to be deployed
  await orderContract.deployed();

  // Log the address where the contract was deployed
  console.log('OrderContract deployed to:', orderContract.address);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
