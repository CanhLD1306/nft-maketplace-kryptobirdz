require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle")


module.exports = {
  defaultNetworkl: 'hardhat',
  network: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      account: []
    }
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
