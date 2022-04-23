const hre = require("hardhat");

async function main() {


// We get the contract to deploy
  const dAPPNftContract = await hre.ethers.getContractFactory("DapplaceNFT");
  const dAPPNft = await dAPPNftContract.deploy();

  await dAPPNft.deployed();

  console.log("dAPPNft deployed to:", ColorPixel.address);
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
