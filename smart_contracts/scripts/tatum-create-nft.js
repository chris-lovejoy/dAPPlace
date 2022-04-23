const http = require("https");

const options = {
  "method": "POST",
  "hostname": "api-eu1.tatum.io",
  "port": null,
  "path": "/v3/nft/deploy",
  "headers": {
    "content-type": "application/json",
    "x-testnet-type": "SOME_STRING_VALUE",
    "x-api-key": "REPLACE_KEY_VALUE"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({
  chain: 'MATIC',
  name: 'dAPPplace',
  symbol: 'ERC_SYMBOL',
  fromPrivateKey: process.env.PRIVATE_KEY ,
  provenance: false,
  cashback: false,
  publicMint: true,
  nonce: 0,
  fee: {gasLimit: '40000', gasPrice: '20'}
}));
req.end();