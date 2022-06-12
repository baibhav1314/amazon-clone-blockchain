# Amazon Clone Blockchain

A decentralised e-commerce website that let users buy NFT's in exchange for Amazon Coin Token, a erc20 token which can be brought by paying ethers. It also provides a transaction history page that shows user their purchases.

## Tech Stack

**Client:** Next.js, Context API, TailwindCSS, Ethers.js, Web3UiKit

**Server:** Moralis

**Smart Contract:** Solidity, Hardhat

## Screenshots

### Home Page

![amazon1](https://user-images.githubusercontent.com/60654743/173203179-bfc1c0b1-2ca6-4533-a14e-3532e6c90ef5.png)

![amazon2](https://user-images.githubusercontent.com/60654743/173203228-8fb6e7cc-5c3b-4d09-88fa-ec2d73dced87.png)

## Transaction History

![amazon3](https://user-images.githubusercontent.com/60654743/173203233-9f8dc2a3-77f0-4915-991f-89e93de314d6.png)

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
