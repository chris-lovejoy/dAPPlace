# dAPPlace

[![build](https://github.com/meyer1994/ipgit/actions/workflows/build.yml/badge.svg)](https://github.com/meyer1994/ipgit/actions/workflows/build.yml)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


## Table of Contents

- [About](#about)
- [Install](#install)
- [Team](#thanks)


## About

dAPPlace.xyz is a decentralised, collaborate, infinite game.

Players place pixels to build a collective masterpiece.

Every 100 edits, an NFT is minted and awarded to the highest bidder.



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


## Team
This project was a collaborative effort between:
- Jaoa Meyer
- Chris Lovejoy
- Ali Rizvi
- Ignacio Pastor
- Dave Brewer

