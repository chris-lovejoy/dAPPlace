const Jimp = require('jimp')
const { ethers } = require("ethers")
const ABI = require('../artifacts/contracts/Canvas.sol/Canvas.json')

// const process = require('process')
// const minimist = require('minimist')
// const { Web3Storage, getFilesFromPath } = require('web3.storage')


const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// to change to contract address deployment


const TABLE = ['#dddddd', '#ff0000', '#ffA500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ffa500', '#ffffff', '#808080', '#000000']


async function main() {

  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545') //'https://localhost:8545')
  // const provider =  new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/cx7UBVYb9gv8JUNChwO8ERbDzANrorsy');


  // 1. TODO: listen to an event (ie. the 10,000 index)
  // listen to minting triggered


  // 2. LOAD IMAGE
  // TODO: potentially use Tatum / Graph for this?)

  const CanvasContract = new ethers.Contract(
    address,
    ABI.abi,
    provider
  )

  const pixel_array = await CanvasContract.pixels()

  destArray = []
  tempArray = []

  pixel_array.forEach((item, i) => {
    if (i === 0) {
      tempArray.push(TABLE[item.val]);
      
    } else if (i % 10 === 0) {
      destArray.push(tempArray);
      tempArray = [];
      tempArray.push(TABLE[item.val]);
    } else {
    tempArray.push(TABLE[item.val]);
    }
    
    if (i === pixel_array.length - 1) {
      destArray.push(tempArray);
    }
  })

  console.log(destArray);

  // TODO: add css to hex 
  // Jimp.cssColorToHex(cssColor); // e.g. converts #FF00FF to 0xFF00FFFF

  

  // 3. generate a png

    
//   let image = new Jimp(10, 10, function (err, image) {
//     if (err) throw err;
  
//     imageData.forEach((row, y) => {
//       row.forEach((color, x) => {
//         image.setPixelColor(color, x, y);
//       });
//     });
  
//     image.write('images/test.png', (err) => {
//       if (err) throw err;
//     });
//   });


  // 4. send to IPFS
  // (to do via the tatum request)



  // 5. mint the NFT



  // 6. settle auction

}

main()


 // TEMPLATE CODE FOR IPFS PUSH TO WEB3 STORAGE 
    
  //   async function main () {
  //     const args = minimist(process.argv.slice(2))
  //     const token = args.token
    
  //     if (!token) {
  //       return console.error('A token is needed. You can create one on https://web3.storage')
  //     }
    
  //     if (args._.length < 1) {
  //       return console.error('Please supply the path to a file or directory')
  //     }
    
  //     const storage = new Web3Storage({ token })
  //     const files = []
    
  //     for (const path of args._) {
  //       const pathFiles = await getFilesFromPath(path)
  //       files.push(...pathFiles)
  //     }
    
  //     console.log(`Uploading ${files.length} files`)
  //     const cid = await storage.put(files)
  //     console.log('Content added with CID:', cid)
  //   }
    
  //   main() 