// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers} = require("hardhat")

async function main() {
  const GameFactory = await hre.ethers.getContractFactory("NumberGuessingGame");
  const answer = 23;
  const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const guessingGame = await GameFactory.deploy(answer, owner, { value: ethers.utils.parseEther("1") });
  await guessingGame.deployed();

  console.log(`Contract deployed to ${guessingGame.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
