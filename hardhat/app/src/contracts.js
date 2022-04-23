import { ethers } from 'ethers'

import CanvasABI from '../../artifacts/contracts/Canvas.sol/Canvas.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const Canvas = new ethers.Contract(
  '0xAAc0a62E090145330fce78771d699999Fa64654D',
  CanvasABI.abi,
  provider
)
