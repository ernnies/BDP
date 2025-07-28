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

    event BlockUpdated(uint256 indexed blockNumber, bytes32 blockHash, bytes32 witnessRoot);

    // Initialize the first block number
    function initializeBlockNumber(uint256 _blockNumber) external onlySystem {
        require(blockNumber == 0, "Already initialized");
        blockNumber = _blockNumber;
    }

    // Update block info with hash and witness root
    function setBlockInfo(bytes32 _blockHash, bytes32 _witnessRoot) external onlySystem {
        blockHashes[blockNumber] = _blockHash;
        witnessRoots[_blockHash] = _witnessRoot;
        emit BlockUpdated(blockNumber, _blockHash, _witnessRoot);
        blockNumber++;
    }

    // Verify transaction inclusion with Merkle proof
    function verifyInclusion(
        uint256 _blockNumber,
        bytes32 _txId,
        bytes32[] calldata _merkleProof,
        uint256 _index
    ) external view returns (bool) {
        bytes32 blockHash = blockHashes[_blockNumber];
        require(blockHash != 0x0, "Block not found");

        bytes32 computedHash = _txId;
        for (uint256 i = 0; i < _merkleProof.length; i++) {
            bytes32 proofElement = _merkleProof[i];
            if (_index & 1 == 1) {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            } else {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            }
            _index >>= 1;
        }
        return computedHash == witnessRoots[blockHash];
    }
}