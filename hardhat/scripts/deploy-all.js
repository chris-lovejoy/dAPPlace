const hre = require("hardhat");

async function main() {

    // We get the contract to deploy
  const CanvasContract = await hre.ethers.getContractFactory("Canvas");
  const Canvas = await CanvasContract.deploy();

  await Canvas.deployed();

  console.log("Canvas deployed to:", Canvas.address);


// We get the contract to deploy
  const AuctionContract = await hre.ethers.getContractFactory("dAPPplaceHouse");
  const Auction = await AuctionContract.deploy(ethers.utils.parseEther("0.5"), 5);

  await Auction.deployed();

  console.log("Auction House deployed to:", Auction.address);


  let auctionContract= Auction.address
// We get the contract to deploy
  const dAPPNftContract = await hre.ethers.getContractFactory("DapplaceNFT");
  const dAPPNft = await dAPPNftContract.deploy(auctionContract);

  await dAPPNft.deployed();

  console.log("dAPPNft deployed to:", dAPPNft.address);
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
