require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    eSpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      chainId: 71,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
