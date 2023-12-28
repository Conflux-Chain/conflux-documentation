---
sidebar_position: 4
title: Nonce Management
displayed_sidebar: coreSidebar
---


And here are some details about the nonce mechanism:

1. The execution of transactions on the blockchain is in the order of nonce from small to large.
2. The initial value of nonce is 0, and the nonce is incremented by 1 for each transaction execution.
3. The nonce cannot be reused.
4. The nonce cannot be skipped: Suppose that the current nonce of an account is n. If the nonce of the transaction is m such that m > n, then the transaction will not be executed until all transactions with nonce < m have been executed.
5. After the transaction is sent via the `cfx_sendRawTransaction` method, it will not be executed immediately. You must wait for the miner to pack it first. Once packed, it will be executed with a delay of 5 epochs. After the transaction is executed, the nonce of the account will be increased by one.

A transaction with incorrect nonce won't be included in blockchain, so correctly setting the nonce is critical to transaction execution. A common issue for developers is that a transaction was sent but its receipt (indicating transaction is executed) is not available, which case is typically due to an accidentally skipped nonce. This results in the transaction being stuck in the transaction pool, waiting for previous transactions to be executed first.

When using an SDK to construct a transaction, value of nonce field do not need to be set manually as the SDK will automatically query it using `cfx_getNextNonce`. However, if multiple transactions are sent at once, the nonce values may be reused because the return value of `cfx_getNextNonce` is not updated immediately after the previous transaction is sent. To avoid this, the developer is advised to manage the nonce manually by recording the transaction hash, incrementing the nonce by 1, and using the updated value to construct subsequent transactions.

3. 如何快速发送交易