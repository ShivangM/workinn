import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';
dotenv.config();

const { INFURA_API_KEY, BUYER_PRIVATE_KEY, SELLER_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${SELLER_PRIVATE_KEY}`, `0x${BUYER_PRIVATE_KEY}`],
    },
  },
};

export default config;
