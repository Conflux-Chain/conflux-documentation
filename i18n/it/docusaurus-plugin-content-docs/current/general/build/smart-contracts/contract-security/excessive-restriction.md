---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - excessive-restrictions
  - fund-locking
  - akutars-nft
  - solidity
  - prevention
  - audits
  - escape-hatches
  - flexible-control
tags:
  - Excessive Restrictions
  - Security
  - Smart Contracts
---

# Excessive Function Restrictions

Excessive function restrictions in smart contracts can lead to critical issues such as funds being locked, which can prevent rightful access even in necessary situations. A well-documented example is the Akutars NFT incident, where $34 million in Ethereum was trapped due to overly restrictive contract mechanics intended for security.

For further reading on the details of the accident, you can refer to the detailed [analysis](https://twitter.com/0xInuarashi/status/1517674505975394304)

#### Example of a Problematic Contract

Consider a hypothetical NFT auction contract designed to hold funds until certain conditions are met, such as all refunds being processed. The contract might include a mechanism that prevents any withdrawal until these conditions are fulfilled. Below is a simplified version of such a contract:

```solidity
contract NFTAuction {
    mapping(address => uint256) public refundsDue;
    uint256 public totalRefunds;
    address admin;
    bool public refundCompleted = false;

    constructor() {
        admin = msg.sender;
    }

    // Function to allow withdrawals only after refunds are completed
    function withdrawFunds() public {
        require(msg.sender == admin, "Only admin can withdraw.");
        require(refundCompleted, "Refunds not completed.");
        payable(admin).transfer(address(this).balance);
    }

    // Function to mark refunds as completed
    function completeRefunds() public {
        require(msg.sender == admin, "Only admin can complete refunds.");
        refundCompleted = true;
    }

    // Other necessary functions like handling bids, setting up auctions, etc.
}
```

This example shows a strict condition that could inadvertently lock funds if the `refundCompleted` flag is not set due to a bug or oversight, mimicking the real-life scenario with the Akutars NFT.

#### Prevention Measures

To prevent such issues while maintaining necessary security measures, consider the following strategies:

1. **Flexible Control Mechanisms**: Implement multi-tier control mechanisms where more than one condition or role can influence critical operations, such as fund withdrawal.

2. **Emergency Escape Hatches**: Provide fail-safe options or "escape hatches" that can be activated in exceptional circumstances to recover funds.

3. **Regular Audits and Bug Bounties**: Ensure the contract is regularly audited by third-party security experts and consider running bug bounty programs to detect and resolve vulnerabilities early.

4. **Incremental Implementation**: Roll out contract features incrementally with thorough testing at each stage, particularly for critical features like fund management and withdrawal permissions.
