require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const path = require('path');
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, './.env') });

const privateKey = process.env.PRIVATE_KEY;
const GNOSIS_RPC_URL = process.env.GNOSIS_RPC_URL;

module.exports = {
  solidity: "0.8.28",
  networks: {
    gnosis: {
      url: GNOSIS_RPC_URL,
      accounts: [`0x${privateKey}`]
    },
  }
};
