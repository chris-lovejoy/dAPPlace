const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Counter', () => {
  it('Should increment counter', async () => {
    const Counter = await ethers.getContractFactory('Counter')
    const counter = await Counter.deploy()
    await counter.deployed()

    expect(await counter.get()).to.equal(0)

    const add = await counter.add()
    await add.wait()

    expect(await counter.get()).to.equal(1)
  })
})
