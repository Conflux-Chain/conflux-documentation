---
displayed_sidebar: blockchainSidebar
---

# Denial of Service (DoS) Attack

Denial of Service (DoS) attacks in the Web2 context typically involve overwhelming a server with excessive traffic, rendering it unable to serve legitimate requests. In the Web3 realm, such attacks exploit vulnerabilities to disrupt smart contract operations.

In April 2022, a popular NFT project called Akutar conducted a successful [Dutch auction](https://en.wikipedia.org/wiki/Dutch_auction) to raise funds, amassing 11,539.5 ETH. However, when processing refunds for previous community pass holders, a flaw in their smart contract prevented operations, locking all funds within the contract due to a DoS vulnerability.

you can find more detail information from [EXPLAINED: THE AKUTARS NFT INCIDENT (APRIL 2022)](https://www.halborn.com/blog/post/explained-the-akutars-nft-incident-april-2022)

## Vulnerability Example

Let’s explore a simplified contract, `GameOfFunds`, that demonstrates this type of vulnerability. The contract allows players to deposit ETH at the beginning and intends to refund these deposits once the game concludes.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract GameOfFunds {
    bool public refundsComplete;
    mapping(address => uint256) public deposits;
    address[] public participantList;

    // Players deposit ETH into the contract
    function contribute() external payable {
        require(!refundsComplete, "Game Over");
        require(msg.value > 0, "Please deposit ETH");
        deposits[msg.sender] = msg.value;
        participantList.push(msg.sender);
    }

    // Refund players at the end of the game
    function processRefunds() external {
        require(!refundsComplete, "Game Over");
        for (uint256 i = 0; i < participantList.length; i++) {
            address participant = participantList[i];
            uint256 refundAmount = deposits[participant];
            (bool success, ) = participant.call{value: refundAmount}("");
            require(success, "Refund Failed!");
            deposits[participant] = 0;
        }
        refundsComplete = true;
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }
}
```

This contract is vulnerable because the `processRefunds()` function uses the `call` method, which activates the fallback function of recipient addresses. A malicious contract can disrupt this process.

```solidity
contract Malicious {
    fallback() external payable {
        revert("DoS Attack!");
    }

    function initiateAttack(address gameAddress) external payable {
        GameOfFunds game = GameOfFunds(gameAddress);
        game.contribute{value: msg.value}();
    }
}
```

## Prevention Strategies

Smart contract developers must be vigilant to prevent logical errors that lead to DoS vulnerabilities. Here are crucial considerations:

1. Ensure external contract calls, like `call`, do not halt critical functions, such as allowing refunds to continue even if one fails.
2. Prevent contracts from unintentionally self-destructing.
3. Avoid infinite loops.
4. Correctly set parameters for `require` and `assert`.
5. Allow users to withdraw refunds themselves rather than sending them in batches.
6. Ensure fallback functions do not interfere with contract operations.
7. Maintain contract functionality even if key participants, like `owners`, are permanently absent.

## Conclusion

This lesson has covered the susceptibility of smart contracts to DoS attacks, exemplified by Akutar's significant loss of over 10,000 ETH. Developers must meticulously implement safeguards, such as enabling users to pull their refunds, to avoid such vulnerabilities.
