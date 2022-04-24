import { ethers } from 'ethers'

import CanvasABI from '../../artifacts/contracts/Canvas.sol/Canvas.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const Canvas = new ethers.Contract(
  '0x80F9313b8539D263B24e463Fa51634cbF5B436f4',
  CanvasABI.abi,
  provider
)
