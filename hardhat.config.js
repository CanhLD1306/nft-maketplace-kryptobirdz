require("@nomiclabs/hardhat-waffle")

// const projectId = 'b5a89d8b31fc4a0a81bb553b709d81f3'
const fs = require('fs');
const keyData = fs.readFileSync('./p-key.txt', {
  encoding: 'utf8', flag: 'r'
});

module.exports = {
  defaultNetworkl: 'hardhat',
  network: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: `http://localhost:8545`,
      account: [keyData]
    }
    // testnet: {
    //   url: `https://aurora-testnet.infura.io/v3/${projectId}`,
    //   account: [keyData]
    // }
  },


  solidity: {
    version: "0.8.17",
    setting: {
      optimized: {
        enable: true,
        runs: 200
      }
    }
  }
};
