const Jimp = require('jimp')
const process = require('process')
const minimist = require('minimist')
const { Web3Storage, getFilesFromPath } = require('web3.storage')


// TODO: Load our actual image data
let imageData = [
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xBB1234BB, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xBB1234BB, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xBB1234BB, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xBB1234BB, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
    [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
  ];    
  

// TODO: ensure appropriate type of image
  let image = new Jimp(10, 10, function (err, image) {
    if (err) throw err;
  
    imageData.forEach((row, y) => {
      row.forEach((color, x) => {
        image.setPixelColor(color, x, y);
      });
    });
  
    image.write('images/test.png', (err) => {
      if (err) throw err;
    });
  });

 
  
// TODO: add image-to-ipfs functionality to push to IPFS from within this script

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