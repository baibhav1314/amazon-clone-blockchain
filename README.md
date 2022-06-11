# Amazon Clone Blockchain

A decentralised e-commerce website that let users buy NFT's in exchange for Amazon Coin Token, a erc20 token which can be brought by paying ethers. It also provides a transaction history page that shows user their purchases.

## Tech Stack

**Client:** Next.js, Context API, TailwindCSS, Ethers.js, Web3UiKit

**Server:** Moralis

**Smart Contract:** Solidity, Hardhat

## Screenshots

![App Screenshot]()

## Run Locally

Clone the project

```bash
  git clone https://github.com/baibhav1314/amazon-clone-blockchain.git
```

Go to the project directory

```bash
  cd amazon-clone-blockchain
```

Install dependencies

```bash
  npm install
```

Go to the smart-contract directory

```bash
  cd smart-contract
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd ..
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_MORALIS_SERVER` = Your Moralis ServerUrl

`NEXT_PUBLIC_MORALIS_APPID` = Your Moralis NEXT_PUBLIC_MORALIS_APPID

Then add a .env file inside the smart-contract folder

```bash
cd smart-contract
```

`SPEEDY_NODE_URL` = Your speedy node url from Moralis Speedy Nodes

`WALLET_PRIVATE_KEY`= Your private key

## Deploying Smart Contract

To deploy the smart contract run

```bash
  cd smart-contract
  npx hardhat run --network <your-network> scripts/deploy.js
```

Note the deployed contract address and update it in the `amazon-clone-blockchain/lib` folder along with the contract `abi`

## Deploying Project

Set up the netlify and then run

```bash
netlify deploy
```
