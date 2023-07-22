require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const POLYGON_ZK_EVM_TESTNET_RPC_ENDPOINT = process.env.POLYGON_ZK_EVM_TESTNET_RPC_ENDPOINT
const POLYGON_MUMBIA_RPC_ENDPOINT = process.env.POLYGON_MUMBIA_RPC_ENDPOINT
const GNOSIS_CHIADO_RPC_ENDPOINT = process.env.GNOSIS_CHIADO_RPC_ENDPOINT
const LINEA_RPC_ENDPOINT = process.env.LINEA_RPC_ENDPOINT
const ZKSYNC_RPC_ENDPOINT = process.env.ZKSYNC_RPC_ENDPOINT
const CELO_RPC_ENDPOINT = process.env.CELO_RPC_ENDPOINT
const MANTLE_RPC_ENDPOINT = process.env.MANTLE_RPC_ENDPOINT
const ZETACHAIN_RPC_ENDPOINT = process.env.ZETACHAIN_RPC_ENDPOINT
const NEONEVM_RPC_ENDPOINT = process.env.NEONEVM_RPC_ENDPOINT

const POLYGON_ZK_EVM_ETHERSCAN_API_KEY = process.env.POLYGON_ZK_EVM_ETHERSCAN_API_KEY
const POLYGON_MUMBIA_ETHERSCAN_API_KEY = process.env.POLYGON_MUMBIA_ETHERSCAN_API_KEY
const GNOSIS_CHIADO_ETHERSCAN_API_KEY = process.env.GNOSIS_CHIADO_ETHERSCAN_API_KEY
const LINEA_ETHERSCAN_API_KEY = process.env.LINEA_ETHERSCAN_API_KEY
const ZKSYNC_ETHERSCAN_API_KEY = process.env.ZKSYNC_ETHERSCAN_API_KEY
const CELO_ETHERSCAN_API_KEY = process.env.CELO_ETHERSCAN_API_KEY
const MANTLE_ETHERSCAN_API_KEY = process.env.MANTLE_ETHERSCAN_API_KEY
const ZETACHAIN_ETHERSCAN_API_KEY = process.env.ZETACHAIN_ETHERSCAN_API_KEY
const NEONEVM_ETHERSCAN_API_KEY = process.env.NEONEVM_ETHERSCAN_API_KEY


const PRIVATE_KEY = process.env.PRIVATE_KEY

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
      url: `${POLYGON_ZK_EVM_TESTNET_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1442,
    },
    polygon_mumbai: { // had a lot of problems with mumbia
      url: `${POLYGON_MUMBIA_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001,
      // gasPrice: 10000000000,
      gasMultiplier: 100,
      // gas: 2000000,
    },
    gnosis_chiado: {
      url: `${GNOSIS_CHIADO_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 10200,
      gasPrice: 100,
    },
    linea: {
      url: `${LINEA_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 59140,
    },
    zksync_testnet: {
      url: `${ZKSYNC_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 280,
    },
    celo_alfajores: {
      url: `${CELO_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 44787,
    },
    mantle_testnet: {
      url: `${MANTLE_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 5001,
    },
    zetachain_athens2: {
      url: `${ZETACHAIN_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 7001,
    },
    neonevm_devnet: {
      url: `${NEONEVM_RPC_ENDPOINT}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 245022926,
    }
  },
  etherscan: {
    apiKey: {
      polygon_zk_evm_testnet: `${POLYGON_ZK_EVM_ETHERSCAN_API_KEY}`,
      polygon_mumbai: `${POLYGON_MUMBIA_ETHERSCAN_API_KEY}`,
      gnosis_chiado: `${GNOSIS_CHIADO_ETHERSCAN_API_KEY}`,
      linea: `${LINEA_ETHERSCAN_API_KEY}`,
      zksync_testnet: `${ZKSYNC_ETHERSCAN_API_KEY}`,
      celo_alfajores: `${CELO_ETHERSCAN_API_KEY}`,
      mantle_testnet: `${MANTLE_ETHERSCAN_API_KEY}`,
      zetachain_athens2: `${ZETACHAIN_ETHERSCAN_API_KEY}`,
      neonevm_devnet: `${NEONEVM_ETHERSCAN_API_KEY}`,
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
        network: "polygon_mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com/"
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
      },
      {
        network: "zksync_testnet",
        chainId: 280,
        urls: {
          apiURL: "https://api.zksync.io/api",
        }
      },
      {
        network: "celo_alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://alfajores-blockscout.celo-testnet.org/api",
        }
      },
      {
        network: "mantle_testnet",
        chainId: 5001,
        urls: {
          apiURL: "https://api.mantleblock.com/api",
        }
      },
      {
        network: "zetachain_athens2",
        chainId: 7001,
        urls: {
          apiURL: "https://api-testnet.zetachain.io/api",
        }
      },
      {
        network: "neonevm_devnet",
        chainId: 245022926,
        urls: {
          apiURL: "https://api.neoscan.io/api",
        }
      },
    ]
  }
};