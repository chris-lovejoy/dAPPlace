const hre = require('hardhat')

async function main() {
  const Canvas = await hre.ethers.getContractFactory('Canvas')
  const canvas = await Canvas.deploy()
  await canvas.deployed()
  console.log('Canvas deployed to:', canvas.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
