import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.25",
  networks: {
    citrea: {
      url: "https://rpc.testnet.citrea.xyz",
      chainId: 5115,
      accounts: ["PRIVATE_KEY"],
    },
  },
};

export default config;