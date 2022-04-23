const hre = require("hardhat");

async function main() {


// We get the contract to deploy
  const CanvasContract = await hre.ethers.getContractFactory("Canvas");
  const Canvas = await CanvasContract.deploy();

  await Canvas.deployed();

  console.log("Canvas deployed to:", Canvas.address);
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
