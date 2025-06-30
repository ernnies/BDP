# BDP (Bitcoin Discreet Platform)

**BDP** is a privacy-focused trading platform built on **Citrea’s ZK Rollup**, enabling discreet Bitcoin-native spot and perpetual trading. By leveraging zero-knowledge proofs, BDP obfuscates order details, eliminating front-running and MEV threats. Tailored for high-volume traders and institutions, BDP delivers seamless, secure, and private execution with Bitcoin (cBTC) as its native asset.

> 🛠 This project explores cutting-edge zkEVM capabilities and aims to foster next-gen DeFi on Bitcoin.

---

## 🔍 Table of Contents
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

---

## 🚀 Features
- 🕵️ **Private Order Matching**: Obfuscates orders with zk-commitments to prevent MEV and front-running.
- ₿ **Bitcoin-Native Trading**: Trade cBTC on Citrea’s zkEVM-based Testnet, supporting spot and perpetuals.
- 🧑‍💻 **Modern Interface**: Built with React and Tailwind CSS for a fast, responsive experience.
- 🔐 **Secure Transactions**: On-chain order verification with Schnorr signature support.
- 🏢 **Institutional Focus**: Designed for professional-grade performance and privacy.

---

## 🧰 Technologies Used
- **Frontend**: React, Tailwind CSS, ethers.js, @metamask/detect-provider
- **Smart Contracts**: Solidity (Hardhat)
- **Blockchain**: Citrea Testnet  
  - Chain ID: `5115`  
  - RPC: `https://rpc.testnet.citrea.xyz`
- **Zero-Knowledge**: Placeholder commitments (zk-SNARK integration planned)
- **Tooling**: Node.js, npm, Git

---

## ⚙️ Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MetaMask](https://metamask.io/) with Citrea Testnet configured
- [Git](https://git-scm.com/)
- cBTC from the [Citrea Faucet](https://faucet.citrea.xyz)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ernnies/BDP.git
   cd BDP
````

2. **Install Dependencies**

   * Contracts:

     ```bash
     cd hardhat
     npm install
     ```

   * Frontend:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure Environment**
   Create a `.env` file in `/config/`:

   ```env
   PRIVATE_KEY=your_metamask_private_key
   CITREA_RPC_URL=https://rpc.testnet.citrea.xyz
   CONTRACT_ADDRESS=your_deployed_contract_address
   ```

4. **Compile & Deploy Smart Contracts**

   ```bash
   cd ../hardhat
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network citrea
   ```

   Then update `frontend/src/BDP.json` with your contract ABI and address.

5. **Run the Frontend**

   ```bash
   cd ../frontend
   npm start
   ```

   Open `http://localhost:3000` in your browser.

---

## 🧪 Usage

1. **Connect Wallet**: Use MetaMask to connect to Citrea Testnet.
2. **Place Orders**: Enter order details (type, price, amount) via the Order Form.
3. **Trade Anonymously**: Orders are submitted using placeholder zk-commitments.
4. **View Orders**: Track open and filled orders in the Order List.

---

## 🤔 Challenges & Lessons

* **zk-SNARK Complexity**: Prototyping zk features highlighted the steep learning curve of circom tooling.
* **Citrea Compatibility**: EVM compatibility quirks (Shanghai upgrade) required fine-tuning deployment scripts.
* **UX vs Privacy**: Ensuring privacy without sacrificing UX showed the importance of graceful UI fallback.
* **Key Lesson**: The combination of zk and Bitcoin is powerful, but requires a layered, iterative development strategy.

---

## 📈 Future Plans

* **Wave 2**:

  * Zero-knowledge liquidity pools
  * Private portfolio dashboard
  * Cross-chain atomic swaps (e.g., BTC↔ETH)

* **Wave 3**:

  * zk-Governance (anonymous voting)
  * Compliance + KYC modules
  * L3 appchain for complex derivatives

* **Mainnet Roadmap**:

  * Security audit & bug bounty
  * Institutional onboarding
  * Beta launch on Citrea Mainnet

---

## 🤝 Contributing

Want to help us redefine privacy on Bitcoin?

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to GitHub: `git push origin feature/your-feature-name`
5. Open a Pull Request 🚀

---
