const hre = require('hardhat')

async function main() {
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')
  await greeter.deployed()
  console.log('Greeter deployed to:', greeter.address)

  const Counter = await hre.ethers.getContractFactory('Counter')
  const counter = await Counter.deploy()
  await counter.deployed()
  console.log('Counter deployed to:', counter.address)

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
