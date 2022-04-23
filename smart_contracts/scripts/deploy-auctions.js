const hre = require("hardhat");

async function main() {

// We get the contract to deploy
  const AuctionContract = await hre.ethers.getContractFactory("dAPPplaceHouse");
  const Auction = await AuctionContract.deploy();

  await Auction.deployed();

  console.log("Auction House deployed to:", Auction.address);
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
