require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const POLYGON_ZK_EVM_TESTNET_URL = process.env.POLYGON_ZK_EVM_TESTNET_URL
const GNOSIS_CHIADO_URL = process.env.GNOSIS_CHIADO_URL
const LINEA_URL = process.env.LINEA_URL

const POLYGON_ZK_EVM_ETHERSCAN_API_KEY = process.env.POLYGON_ZK_EVM_ETHERSCAN_API_KEY
const GNOSIS_CHIADO_ETHERSCAN_API_KEY = process.env.GNOSIS_CHIADO_ETHERSCAN_API_KEY
const LINEA_ETHERSCAN_API_KEY = process.env.LINEA_ETHERSCAN_API_KEY

const PRIVATE_KEY = process.env.PRIVATE_KEY


// TODO: Add rest of the chains

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: false,
      },
    },
  },
  networks: {
    polygon_zk_evm_testnet: {
      url: `${POLYGON_ZK_EVM_TESTNET_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1442,
    },
    gnosis_chiado: {
      url: `${GNOSIS_CHIADO_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 10200,
      gasPrice: 100,
    },
    linea: {
      url: `${LINEA_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 59140,
    },

  },
  etherscan: {
    apiKey: {
      polygon_zk_evm_testnet: `${POLYGON_ZK_EVM_ETHERSCAN_API_KEY}`,
      gnosis_chiado: `${GNOSIS_CHIADO_ETHERSCAN_API_KEY}`,
      linea: `${LINEA_ETHERSCAN_API_KEY}`,

    },
    customChains: [
      {
        network: "polygon_zk_evm_testnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com"
        }
      },
      {
        network: "gnosis_chiado",
        chainId: 10200,
        urls: {
          apiURL: "https://blockscout.com/gnosis/chiado/api",
        }
      },
      {
        network: "linea",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
        }
      }
    ]
  }
};