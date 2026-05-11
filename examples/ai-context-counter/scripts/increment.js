const hre = require("hardhat");

async function main() {
  const counterAddress = process.env.COUNTER_ADDRESS;

  if (!counterAddress) {
    throw new Error("Missing COUNTER_ADDRESS. Set it in .env or pass it in the shell.");
  }

  const counter = await hre.ethers.getContractAt("Counter", counterAddress);

  const before = await counter.number();
  console.log(`Counter before increment: ${before.toString()}`);

  const tx = await counter.increment();
  const receipt = await tx.wait();

  const after = await counter.number();
  console.log(`Increment transaction hash: ${receipt.hash}`);
  console.log(`Counter after increment: ${after.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
