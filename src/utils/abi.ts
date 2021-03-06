export const abi: any = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_elementsMatrix",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_signerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_verifySignatureAddress",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_provenanceHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint24",
        "name": "_winner",
        "type": "uint24"
      }
    ],
    "name": "Winner",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_random",
        "type": "uint128"
      }
    ],
    "name": "addRandomness",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_fighterIdentifier",
        "type": "uint16"
      }
    ],
    "name": "bracketWithOnlyFighterAlive",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "emergencyWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "evaluateWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_isSimulated",
        "type": "bool"
      },
      {
        "internalType": "uint32",
        "name": "_fighterOne",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_fighterTwo",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "_random",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_blockNumber",
        "type": "uint256"
      }
    ],
    "name": "fight",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBet",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      },
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
      },
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBracketStatus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint80",
        "name": "_equity",
        "type": "uint80"
      },
      {
        "internalType": "uint8",
        "name": "_lastRoundUpdated",
        "type": "uint8"
      }
    ],
    "name": "getEquityForBet",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_fighterIdentifier",
        "type": "uint16"
      }
    ],
    "name": "getFighterTotalPot",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
      },
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRandomness",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalPot",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserRandomness",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_fighterIdentifier",
        "type": "uint16"
      }
    ],
    "name": "isFighterAlive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_fighterIdentifier",
        "type": "uint16"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "redeemFighterBounty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "redeemPot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fighterTrancheOne",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fighterTrancheTwo",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fighterTrancheThree",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fighterTrancheFour",
        "type": "uint256"
      }
    ],
    "name": "setBracketStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_bettingIsOpen",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "_currentRound",
        "type": "uint8"
      }
    ],
    "name": "setConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_isError",
        "type": "bool"
      }
    ],
    "name": "setConfigError",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
