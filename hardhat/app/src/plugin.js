
export const installEthers = {
  install (app, ethers) {
    app.provide('ethers', ethers)
    app.config.globalProperties.$ethers = ethers
  }
}
