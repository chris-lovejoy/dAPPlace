const Jimp = require('jimp')
const { ethers, Contract } = require("ethers")
const CANVAS_ABI = require('../artifacts/contracts/Canvas.sol/Canvas.json')
const NFT_ABI = require('../artifacts/contracts/DappPlaceNFT.sol/DapplaceNFT.json')
const fs = require('fs');
require('dotenv').config();
// NOTE: .env file must be in hardhat directory

const process = require('process')
const minimist = require('minimist')
const { Web3Storage, getFilesFromPath } = require('web3.storage')


// to update to addresses based on contract deployment
const canvas_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const NFT_contract_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"


const TABLE = ['#dddddd', '#ff0000', '#ffA500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ffa500', '#ffffff', '#808080', '#000000']


async function main() {

  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545') //'https://localhost:8545')
  // const provider =  new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/cx7UBVYb9gv8JUNChwO8ERbDzANrorsy');
  // TODO: move provider link into environmental variable

  // 1. Listen to event (ie. every 100 changes) and trigger all
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
  const connectedCanvas = new ethers.Contract(
    canvas_address,     
    CANVAS_ABI.abi, 
    signer);

  connectedCanvas.on("Image", async () => {

  // 2. LOAD IMAGE
  // TODO: potentially use Tatum / Graph for this?)

  const CanvasContract = new ethers.Contract(
    canvas_address,
    CANVAS_ABI.abi,
    provider
  )

  const pixel_array = await CanvasContract.pixels()

  console.log('pixels loaded')

  destArray = []
  tempArray = []

  pixel_array.forEach((item, i) => {
    if (i === 0) {
      tempArray.push(Jimp.cssColorToHex(TABLE[item.val]));
      
    } else if (i % 10 === 0) {
      destArray.push(tempArray);
      tempArray = [];
      tempArray.push(Jimp.cssColorToHex(TABLE[item.val]));
    } else {
    tempArray.push(Jimp.cssColorToHex(TABLE[item.val]));
    }
    
    if (i === pixel_array.length - 1) {
      destArray.push(tempArray);
    }
  })  

  console.log('generating image')

  // 3. generate a png and save locally
    let image = new Jimp(10, 10)

    destArray.forEach((row, y) => {
      row.forEach((color, x) => {
        image.setPixelColor(color, x, y);
      });
    });

    await image.writeAsync('images/nft.png')


  // 4. Send image to IPFS
  // TODO: consider adding the tatum request

    console.log('sending to IPFS')

    const path = "./images/nft.png"
    const token = process.env.WEB3_STORAGE_API_KEY

    console.log("token is", token)

    const storage = new Web3Storage({ token })
    const files = []  

    pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)

    console.log(`Uploading ${files.length} NFT images`)
    const cid = await storage.put(files)
    console.log('NFT image added with CID:', cid)
    
    // 5. Create JSON metadata for NFT and upload to IPFS
    image_metadata = `{
      "name": "dAPPlace NFT collection (dapplace.xyz)",
      "description": "decentralised collaboration artwork",
      "image": "https://${cid}.ipfs.dweb.link/nft.png"
    }`

    fs.writeFile("./images/NFT_metadata.json", image_metadata, function(err) {
        if (err) {
            console.log(err);
        }
    });

    const json_path = "./images/NFT_metadata.json"
    const json_storage = new Web3Storage({ token })
    const json_file = []  

    json_pathFiles = await getFilesFromPath(json_path)
    json_file.push(...json_pathFiles)

    console.log(`Uploading ${json_file.length} JSON files`)
    const json_cid = await json_storage.put(json_file)
    console.log('JSON metadata added with CID:', json_cid)

    json_URI = `https://${json_cid}.ipfs.dweb.link/NFT_metadata.json`


  // 6. modify NFT image address
  const NFT_Contract = new ethers.Contract(
    NFT_contract_address,     
    NFT_ABI.abi, 
    signer);

    console.log("changing the IPFS URI...")

    // NFT_Contract.setIpfsUri(json_URI, {gasLimit:1000000, gasPrice:100000000000})
    

  })
}


main()
