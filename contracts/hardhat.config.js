require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.25",
  networks: {
    citrea: {
      url: "https://rpc.testnet.citrea.xyz",
      chainId: 5115,
      accounts: ["YOUR_PRIVATE_KEY"], // Replace with MetaMask private key
    },
  },
};