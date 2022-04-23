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


const canvas_address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// to update to contract address deployment (based on node)

const TABLE = ['#dddddd', '#ff0000', '#ffA500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ffa500', '#ffffff', '#808080', '#000000']


async function main() {

  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545') //'https://localhost:8545')
  // const provider =  new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/cx7UBVYb9gv8JUNChwO8ERbDzANrorsy');


  // 1. TODO: listen to an event (ie. the 10,000 index)
  // listen to minting triggered
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
  const connectedPixelContract = new ethers.Contract(canvas_address,     
        CANVAS_ABI.abi, signer);

  connectedPixelContract.on("Image", () => {

  // 2. LOAD IMAGE
  // TODO: potentially use Tatum / Graph for this?)

  const CanvasContract = new ethers.Contract(
    canvas_address,
    ABI.abi,
    provider
  )

  const pixel_array = await CanvasContract.pixels()

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


    

  // 5. mint the NFT



  // 6. settle auction
  })
}


main()
