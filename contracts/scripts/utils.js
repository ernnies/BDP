const { ethers } = require("hardhat");

function generateDummyCommitment() {
  return ethers.utils.randomBytes(32);
}

function generateDummySignature() {
  return ethers.utils.randomBytes(64);
}

module.exports = { generateDummyCommitment, generateDummySignature };