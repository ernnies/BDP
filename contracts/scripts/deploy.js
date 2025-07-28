const hre = require("hardhat");

async function main() {
  const TradingPrivacy = await hre.ethers.getContractFactory("TradingPrivacy");
  const tradingPrivacy = await TradingPrivacy.deploy();
  await tradingPrivacy.deployed();
  console.log("TradingPrivacy deployed to:", tradingPrivacy.address);

  const BitcoinLightClient = await hre.ethers.getContractFactory("BitcoinLightClient");
  const bitcoinLightClient = await BitcoinLightClient.deploy();
  await bitcoinLightClient.deployed();
  console.log("BitcoinLightClient deployed to:", bitcoinLightClient.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});