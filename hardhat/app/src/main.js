import { ethers } from 'ethers'
import { createApp } from 'vue'

import App from '@/App'
import { installEthers } from '@/plugin'

const main = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])

  createApp(App)
    .use(installEthers, provider)
    .mount('#app')
}

main()
