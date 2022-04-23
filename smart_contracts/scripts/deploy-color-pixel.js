const hre = require("hardhat");

async function main() {


// We get the contract to deploy
  const ColorPixelContract = await hre.ethers.getContractFactory("ColorPixel");
  const ColorPixel = await ColorPixelContract.deploy();

  await ColorPixel.deployed();

  console.log("ColorPixel deployed to:", ColorPixel.address);
}


const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};


runMain();
