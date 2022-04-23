const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Canvas', () => {
  it('Should set value at coordinate', async () => {
    const Canvas = await ethers.getContractFactory('Canvas')
    const canvas = await Canvas.deploy()
    await canvas.deployed()

    const get1 = await canvas.get(1, 1)
    expect(get1.val).to.equal(0)

    await canvas.set(1, 1, 2)
    const get2 = await canvas.get(1, 1)
    expect(get2.val).to.equal(2)
  })

  it('Should emit Pixel', async () => {
    const Canvas = await ethers.getContractFactory('Canvas')
    const canvas = await Canvas.deploy()
    await canvas.deployed()

    const set = await canvas.set(1, 1, 2)
    await expect(set).to.emit(canvas, 'Pixel')
  })

  it('Should emit Image', async () => {
    const Canvas = await ethers.getContractFactory('Canvas')
    const canvas = await Canvas.deploy()
    await canvas.deployed()

    const all = []
    for (let i = 0; i < 99; i++) {
      const y = Math.floor(1 / 10)
      const x = i % 10
      const one = canvas.set(x, y, 2)
      all.push(one)
    }
    await Promise.all(all)

    const res1 = canvas.set(9, 9, 3)
    await expect(res1).to.emit(canvas, 'Image')

    const res2 = canvas.set(9, 9, 3)
    await expect(res2).to.not.emit(canvas, 'Image')
  })
})
