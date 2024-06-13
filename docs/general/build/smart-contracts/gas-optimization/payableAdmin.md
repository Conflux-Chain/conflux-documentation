---
displayed_sidebar: generalSidebar
---

# Payable Admin Functions

Admin functions can be payable to save gas. Making admin-specific functions payable reduces gas costs because the compiler won't check the callvalue of the function. This approach also makes the contract smaller and cheaper to deploy as there will be fewer opcodes in the creation and runtime code.

Below is an example demonstrating how to implement payable admin functions:

```solidity
contract Admin {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // gas: 23348
    function adminFunction() external onlyAdmin {
        // Admin specific logic here
    }

    function withdraw() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}

contract AdminPayable {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // gas: 23324
    function adminFunction() external payable onlyAdmin {
        // Admin specific logic here
    }

    function withdraw() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}

```

In this example, the `adminFunction` is payable, which can help save gas costs.

Recommendations for gas optimization:

🌟 Consider making admin functions payable to reduce gas costs associated with value checks by the compiler.
proper access controls are in place to restrict payable functions to authorized addresses only.
