const hre = require("hardhat");

async function main() {

let auctionContract= "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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
