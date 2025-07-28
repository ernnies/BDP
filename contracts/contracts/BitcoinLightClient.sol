// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract BitcoinLightClient {
    uint256 public blockNumber;
    mapping(uint256 => bytes32) public blockHashes;
    mapping(bytes32 => bytes32) public witnessRoots;

    modifier onlySystem() {
        require(msg.sender == 0xdeaDDeADDEaDdeaDdEAddEADDEAdDeadDEADDEaD, "Only system caller");
        _;
    }

    function initializeBlockNumber(uint256 _blockNumber) external onlySystem {
        blockNumber = _blockNumber;
    }

    function setBlockInfo(bytes32 _blockHash, bytes32 _witnessRoot) external onlySystem {
        blockHashes[blockNumber] = _blockHash;
        witnessRoots[_blockHash] = _witnessRoot;
        blockNumber++;
    }

    function verifyInclusion(uint256 _blockNumber, bytes32 _wtxId, bytes calldata _proof, uint256 _index) external view returns (bool) {
        bytes32 blockHash = blockHashes[_blockNumber];
        bytes32 witnessRoot = witnessRoots[blockHash];
        // Mock Merkle proof verification (replace with actual logic)
        return _wtxId != 0x0 || _proof.length > 0; // Simplified check
    }
}