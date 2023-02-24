---
sidebar_position: 1
title: SDKs
---

Conflux 有用于主流编程语言的 SDK，包括 `JavaScript`, `Golang`, `Java` 和 `Python`。 本文为对SDK的简短介绍，详细的使用说明请查看SDK各自的文档。

## 官方SDK

### [js-conflux-sdk](https://confluxnetwork.gitbook.io/js-conflux-sdk/)

If you are familiar with JavaScript or Node.js, or if you want to build a web site to interact with your contract, `js-conflux-sdk` is right for you. It has a lot of useful features.

```js
const {Conflux} = require('js-conflux-sdk');

async function main() {
  let conflux = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1,
  });

  let balance = await conflux.cfx.getBalance("cfxtest:aakkfzezns4h8ymx1cgmcnd4x3aev6e2he38nnu8sv");
  console.log("balance: ", balance);
}

main().catch(console.log);
```

### [go-conflux-sdk](https://github.com/conflux-chain/go-conflux-sdk)

Golang is a great language: fast, easy to use, and stable. In blockchain world a lot projects are developing with Go. If you want to develop a backend service which needs to communicate with Conflux network, `go-conflux-sdk` suits for you.

```go
package main

import (
    "fmt"

    conflux "github.com/Conflux-Chain/go-conflux-sdk"
)

func main() {
    client, err := conflux.NewClient("https://test.confluxrpc.com")
    if err != nil {
        fmt.Println("failed to create client:", err)
        return
    }
    defer client.Close()

    epoch, err := client.GetEpochNumber()
    if err != nil {
        fmt.Println("failed to get epoch number:", err)
        return
    }

    fmt.Println("Current epoch number:", epoch)
}

```

### [java-conflux-sdk](https://github.com/conflux-chain/java-conflux-sdk)

Java is really a long live programming language. `java-conflux-sdk` can be used to talk to a Conflux node. It is evolved from the [web3j](https://docs.web3j.io/) library. Some of web3j's utility functions also work on the Conflux network.

```java
package conflux.sdk.examples;
import java.math.BigInteger;
import conflux.web3j.Cfx;

public class App {
  public static void main(String[] args) throws Exception {
    int retry = 3;
    int intervalMills = 1000;  // interval(milliseconds) between retry
    Cfx cfx = Cfx.create("https://test.confluxrpc.com", retry, intervalMills);
    BigInteger epoch = cfx.getEpochNumber().sendAndGet();
    System.out.println("Current epoch: " + epoch);
  }
}
```

### [python-conflux-sdk](https://github.com/conflux-chain/python-conflux-sdk)

Python is the first choice for a lot of developers, we also have `python-conflux-sdk` for you.

```python
from conflux import (
    Conflux,
    HTTPProvider,
)
provider = HTTPProvider('https://test.confluxrpc.com')
c = Conflux(provider)

# get RPC's clientVersion
print(c.clientVersion)

test_address = 'cfxtest:aak7fsws4u4yf38fk870218p1h3gxut3ku00u1k1da'
balance = c.cfx.getBalance(test_address)
print(balance)
```

## Solidity SDKs

### [Conflux-contracts](https://github.com/conflux-fans/conflux-contracts)

This is a Solidity package including common useful contracts in Conflux DAPP developments. Which is kindly like OpenZeppelin. Currenlty most used is `Conflux InternalContracts`.

### [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)

This is the famous library for secure smart contract development. Build on a solid foundation of community-vetted code.

* Implementations of standards like ERC20 and ERC721.
* Flexible role-based permissioning scheme.
* Reusable Solidity components to build custom contracts and complex decentralized systems.

## Community developed SDKs

### [cpp-conflux-sdk](https://csyangbinbin.github.io/cpp-conflux-sdk/)

The Conflux C++ API allows any C++ client to interact with a local or remote Conflux node based on JSON-RPC 2.0 protocol. With Conflux C++ API, user can easily manage accounts, send transactions, deploy smart contracts and query blockchain information.


<!---
![](/img/CPP-SDK-shot.png)
-->

### [.NET SDK](https://github.com/Nconflux/Conflux.net.SDK)

Nconflux is the .Net integration library for Conflux, simplifying the access and smart contract interaction with Conflux nodes.

Nconflux is developed targeting netcore 3.1 and .net 5, hence it is compatible with all the operating systems (Windows, Linux, MacOS, Android and OSX) and has been tested on cloud, mobile, desktop, Xbox, hololens and windows IoT.

### [Swift SDK](https://github.com/Conflux-Chain/swift-conflux-wallet-sdk)