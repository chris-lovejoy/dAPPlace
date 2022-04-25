<script setup>
import { onMounted, ref, computed } from 'vue'

import { useIntervalFn } from '@vueuse/core'
import { Canvas, contractId } from '@/contracts'
import PCanvas from '@/comps/PCanvas'
import PPicker from '@/comps/PPicker'
import { colorMapper, formatToShortAddress } from '@/helpers'

// ref variables
const color = ref('green')
const count = ref('..')
const address = ref('')

const hasMetamask = !!window.ethereum

// color
const value = computed(() => colorMapper[color.value])

// count
const nextMintCount = async () => (count.value = await Canvas.remaining())
onMounted(nextMintCount)
useIntervalFn(nextMintCount, 1000)

// address
const getAddress = async (_method) => {
  const accounts = await window.ethereum.request({ method: _method })

  if (accounts.length > 0) {
    address.value = formatToShortAddress(accounts[0])
    onMounted(address)
  }
}

if (hasMetamask) {
  getAddress('eth_accounts')
} else {
  console.log('Metamask not supported')
}

// connect to metamask
const connectToWallet = () => {
  getAddress('eth_requestAccounts')
}

</script>

<template>
  <div>
    <header>
      <div class="wallet">
        <p v-if="address" class="address">{{address}}</p>
        <button v-else @click="connectToWallet()" class="connect-wallet-btn">Connect Wallet</button>
      </div>

      <a title="Bidding offline" class="bidding-holder bidding-holder--offline">
        <div>Current bid:<br/> 0.075 ETH</div>
        <button disabled class="bid-button">Increase bid</button>
      </a>
    </header>

    <div class="next-mint-countdown">{{count}} changes until next NFT mint</div>

    <div class="artboard">
      <div :class="{[color]: true}">
        <PCanvas :value="value" />
        <PPicker v-model="color" />
      </div>
    </div>

    <div class="contract">
      Contract address:
      <a target="_blank" :href="`https://mumbai.polygonscan.com/address/${contractId}`">
        {{contractId}}
      </a>
    </div>
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: monospace;
    background-color: #fff;
  }

  header {
    display:flex;
    justify-content:space-between;
  }

  header .wallet .address,
  header .bidding-holder,
  header .connect-wallet-btn {
    margin-left: 15px;
    background: #ddd;
    padding: 10px;
    border-radius: 10px;
  }

  header .connect-wallet-btn {
    border: none;
    margin-top: 1em;
    cursor: pointer;
    font-family: monospace;
  }

  header .bidding-holder {
    margin-top: 1em;
    margin-right: 1em;
  }

  header .bidding-holder--offline {
    color: rgba(0,0,0,0.5);
  }

  header .bidding-holder--offline button:disabled {
    color: rgba(0,0,0,0.5);
    cursor: default;
  }

  .next-mint-countdown {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    margin-top: 12px;
    padding-top: 10px;
    z-index: -1;
  }

  .contract {
    text-align: center;
    margin-top: 12px;
    position: absolute;
    bottom: 16px;
    width: 100%;
  }

  .artboard {
    width: 200px;
    height: 250px;

    position: absolute;
    top: 50%;
    left:50%;
    margin: -125px 0 0 -100px;
  }

  .bid-button {
    color: black;
    border: none;
    border-radius: 5px;
    padding: 6px 8px;
    cursor: pointer;
    top: 10px;
    right: 10px;
    background: #ccc;
    font-family: monospace;
    border-radius: 0;
    margin-top: 10px;
  }

  .bid-button:hover {

  }

  .selected-color {
    margin-top: 20px;
    text-align: center;
  }

  .color, .color-picker {cursor: pointer;}
  .red .color-picker:hover { background-color: red; opacity:1;}
  .orange .color-picker:hover { background-color: orange; opacity:1;}
  .yellow .color-picker:hover { background-color: yellow; opacity:1;}
  .green .color-picker:hover { background-color: green; opacity:1;}
  .blue .color-picker:hover { background-color: blue; opacity:1;}
  .indigo .color-picker:hover { background-color: indigo; opacity:1;}
  .violet .color-picker:hover { background-color: violet; opacity:1;}
  .white .color-picker:hover { background-color: white; opacity:1;}
  .grey .color-picker:hover { background-color: grey; opacity:1;}
  .black .color-picker:hover { background-color: black; opacity:1;}
</style>
