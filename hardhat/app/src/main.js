import { ethers } from 'ethers'
import { createApp } from 'vue'

import App from '@/App'
import { installEthers } from '@/plugin'

const main = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  createApp(App, { provider: provider })
    .use(installEthers, provider)
    .mount('#daaplace')
}

main()
