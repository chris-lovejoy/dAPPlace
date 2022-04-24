# dAPPlace

dAPPlace.xyz is a decentralised, collaborate, infinite game in web3.


[![build](https://github.com/meyer1994/ipgit/actions/workflows/build.yml/badge.svg)](https://github.com/meyer1994/ipgit/actions/workflows/build.yml)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


## Table of Contents

- [About](#about)
- [Install](#install)
- [Gameplay](#gameplay)
- [Team](#thanks)


## About

dAPPlace is a canvas for art battles where people can place one colored pixel at a time. An NFT of the current canvas is minted after every 100 changes to the canvas. In parallel, people bid to own the NFT while it’s being created.


## Install

#### Deploy smart contracts

```sh
git clone https://github.com/chris-lovejoy/dAPPlace
cd dAPPlace/hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network <your-network>
```


#### Run backend
```sh
cd server
npm install
node main
```


#### Run front-end

```sh
cd app
npm install
npm run serve
npm run build
npm run lint
```

## About
![](./hardhat/Website-screenshot.png)


## Team
This project was a collaborative effort between:
- Jaoa Meyer
- Chris Lovejoy
- Ali Rizvi
- Ignacio Pastor
- Dave Brewer
