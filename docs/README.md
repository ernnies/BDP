# BDP (Bitcoin Discreet Platform)

Welcome to **BDP**, a privacy-focused trading platform built on Citrea’s ZK Rollup for Bitcoin spot and perpetual markets. Leveraging zero-knowledge technology, BDP hides order books to prevent Miner Extractable Value (MEV) and front-running, offering a secure haven for high-volume traders and institutions. With Bitcoin (cBTC) as the native asset and a sleek, modern interface, BDP redefines discreet trading on the Bitcoin blockchain.

This project aligns with the goal of fostering innovative decentralized applications on Citrea’s zkEVM. Dive in to explore, contribute, or deploy your own instance!

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Challenges & Lessons](#challenges--lessons)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Private Order Matching**: Uses zero-knowledge proofs to conceal order details, thwarting MEV and front-running.
- **Bitcoin-Native Trading**: Supports spot and perpetual markets with cBTC on Citrea Testnet.
- **Sleek Interface**: React-based frontend with Tailwind CSS for a responsive, trader-friendly experience.
- **Secure Transactions**: Smart contract with Schnorr precompile for signature verification.
- **Institutional Focus**: Designed for high-volume traders with fast UX and privacy at its core.

## Technologies Used
- **Frontend**: React, Tailwind CSS, ethers.js, @metamask/detect-provider
- **Smart Contracts**: Solidity, Hardhat
- **Blockchain**: Citrea Testnet (Chain ID: 5115, RPC: https://rpc.testnet.citrea.xyz)
- **Zero-Knowledge**: Placeholder zk-proofs (future integration with circom)
- **Dependencies**: npm, Node.js

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [MetaMask](https://metamask.io/) wallet configured for Citrea Testnet
- [Git](https://git-scm.com/)
- cBTC funds from the Citrea Testnet faucet

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/ernnies/BDP.git
   cd BDP