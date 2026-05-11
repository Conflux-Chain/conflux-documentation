const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  if (!deployer) {
    throw new Error("Missing PRIVATE_KEY. Copy .env.example to .env and add a funded eSpace Testnet private key.");
  }

  console.log(`Deploying Counter from ${deployer.address}`);

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();

  const address = await counter.getAddress();
  const deployTx = counter.deploymentTransaction();

  console.log(`Counter deployed to ${address}`);
  console.log(`Transaction hash: ${deployTx.hash}`);
  console.log(`ConfluxScan: https://evmtestnet.confluxscan.org/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
