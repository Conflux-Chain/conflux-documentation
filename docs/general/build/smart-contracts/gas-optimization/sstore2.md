---
displayed_sidebar: generalSidebar
---

# Advanced Gas Optimization in Ethereum Smart Contracts: SSTORE2

The cost of executing transactions on the Ethereum network can be significantly high, especially when interacting with smart contract storage using the SSTORE opcode. To mitigate these costs, developers can leverage alternative methods like SSTORE2 for more efficient data handling.

## Understanding SSTORE

The `SSTORE` opcode is used to store data in Ethereum's contract storage. It writes data to a specific location identified by a key. Both the key and value are 32 bytes. However, this operation is costly in terms of gas:

- **Writing**: 22,100 gas for 32 bytes, approximately 690 gas per byte.
- **Reading**: The `SLOAD` opcode is similarly expensive.

## Exploring SSTORE2

SSTORE2 optimizes data storage by leveraging the immutability of contract bytecode. Instead of using standard storage, it stores data as part of a contract's bytecode.

**Key Features of SSTORE2:**

- **Single Write**: Data is written once using the `CREATE` opcode instead of `SSTORE`.
- **Reading**: Uses the `EXTCODECOPY` opcode to extract data from the bytecode.

**Demo Code**

**Writing Data Example:**

The following example demonstrates how to store data using SSTORE2.

1. Modify the contract creation bytecode to include the size of the data.
2. Deploy the contract, which stores the data as bytecode.

```solidity
// Solidity pseudo-code to demonstrate SSTORE2 usage
function deployDataStorageContract(bytes memory data) public returns (address) {
    uint256 dataSize = data.length;
    // Replace placeholder with data size
    bytes memory bytecode = hex"61000080600a3d393df300";
    bytecode[2] = byte(uint8(dataSize));
    bytecode[3] = byte(uint8(dataSize >> 8));

    address deployedAddress;
    assembly {
        deployedAddress := create(0, add(bytecode, 32), mload(bytecode))
    }
    // Data is prefixed with STOP to prevent execution
    return deployedAddress;
}
```

**Reading Data Example:**

To read the stored data, determine the deployed address and extract the bytecode.

```solidity
function readStoredData(address dataAddress) public view returns (bytes memory) {
    uint256 codeSize;
    assembly {
        codeSize := extcodesize(dataAddress)
    }
    bytes memory data = new bytes(codeSize - 1);
    assembly {
        extcodecopy(dataAddress, add(data, 32), 1, sub(codeSize, 1))
    }
    return data;
}
```

## Conclusion

Using SSTORE2 reduce the gas costs associated with storing and retrieving large data sets in Ethereum smart contracts. These methods leverage the immutability and execution efficiency of Ethereum's contract mechanics, providing developers with powerful tools to optimize their applications.
