# Testing

## TLDR

```
# ./hardhat
docker compose up
npm install
npx hardhat run scripts/deploy.js --network localhost

# ./hardhat/app
npm install
npm run serve
```

The commands above will boot up a docker runnning Ganache, an ethereum node,
and will start a Vue application that interacts with the node. You must
import one of the accounts from the docker container to metamask to test
stuff around.


## nft-gen
node nft-gen/generate image
node nft-gen/image-to-ipfs --token=<web3 storage token> images/test.png

