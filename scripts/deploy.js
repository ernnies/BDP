async function main() {
  const BDP = await ethers.getContractFactory("BDP");
  const bdp = await BDP.deploy();
  await bdp.deployed();
  console.log("BDP deployed to:", bdp.address);

  const fs = require("fs");
  fs.writeFileSync(
    "./frontend/src/BDP.json",
    JSON.stringify({ address: bdp.address, abi: BDP.interface.format() }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});