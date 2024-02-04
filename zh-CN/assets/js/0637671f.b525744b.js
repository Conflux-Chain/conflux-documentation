"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9166],{11568:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>h});var o=t(85893),a=t(11151);const s={title:"\u793e\u533a\u5e38\u89c1\u95ee\u9898",sidebar_position:2,displayed_sidebar:"generalSidebar"},i="\u793e\u533a\u5e38\u89c1\u95ee\u9898",r={id:"general/faq/community-faqs",title:"\u793e\u533a\u5e38\u89c1\u95ee\u9898",description:"Do we need to pay attention to the storageLimit and epochHeight fields in regular transactions?",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/faq/community-faqs.md",sourceDirName:"general/faq",slug:"/general/faq/community-faqs",permalink:"/zh-CN/docs/general/faq/community-faqs",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"\u793e\u533a\u5e38\u89c1\u95ee\u9898",sidebar_position:2,displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u5e38\u89c1\u95ee\u9898",permalink:"/zh-CN/docs/general/faq/"},next:{title:"\u53c2\u4e0e\u8d21\u732e",permalink:"/zh-CN/docs/general/CONTRIBUTING"}},c={},h=[{value:"<strong>Do we need to pay attention to the <code>storageLimit</code> and <code>epochHeight</code> fields in regular transactions?</strong>",id:"do-we-need-to-pay-attention-to-the-storagelimit-and-epochheight-fields-in-regular-transactions",level:3},{value:"<strong>I want to send multiple transactions at once, but there&#39;s no method to set nonce. How can I solve this?</strong>",id:"i-want-to-send-multiple-transactions-at-once-but-theres-no-method-to-set-nonce-how-can-i-solve-this",level:3},{value:"<strong>What does the error &quot;ExceedStorageLimit&quot; mean when sending a transaction?</strong>",id:"what-does-the-error-exceedstoragelimit-mean-when-sending-a-transaction",level:3},{value:"<strong>How do I convert a private key into keystore format?</strong>",id:"how-do-i-convert-a-private-key-into-keystore-format",level:3},{value:"<strong>Why do nodes need to re-sync data after changing configurations?</strong>",id:"why-do-nodes-need-to-re-sync-data-after-changing-configurations",level:3},{value:"<strong>Can the sponsor payment function be tested normally on the test chain?</strong>",id:"can-the-sponsor-payment-function-be-tested-normally-on-the-test-chain",level:3},{value:"<strong>Is CFX an ERC777 contract?</strong>",id:"is-cfx-an-erc777-contract",level:3},{value:"<strong>Does Conflux support the Ethereum library OpenZeppelin?</strong>",id:"does-conflux-support-the-ethereum-library-openzeppelin",level:3},{value:"<strong>Where is the testnet faucet?</strong>",id:"where-is-the-testnet-faucet",level:3},{value:"<strong>Why does the value sometimes appear smaller when I use <code>latest_confirmed</code> to get the epoch?</strong>",id:"why-does-the-value-sometimes-appear-smaller-when-i-use-latest_confirmed-to-get-the-epoch",level:3},{value:"<strong>What settings do developers need to make when starting a node?</strong>",id:"what-settings-do-developers-need-to-make-when-starting-a-node",level:3},{value:"<strong>Does CFX have an API to query computing power?</strong>",id:"does-cfx-have-an-api-to-query-computing-power",level:3},{value:"<strong>What is a pivot chain switch?</strong>",id:"what-is-a-pivot-chain-switch",level:3},{value:"<strong>How to determine if a pivot chain switch has occurred?</strong>",id:"how-to-determine-if-a-pivot-chain-switch-has-occurred",level:3},{value:"What is storage collateral, and how is it calculated? For example, how many drips are required for 1kb storage?",id:"what-is-storage-collateral-and-how-is-it-calculated-for-example-how-many-drips-are-required-for-1kb-storage",level:3},{value:"What fees are included in the GasFee returned by cfx_getTransactionReceipt? Does it include storage collateral fees?",id:"what-fees-are-included-in-the-gasfee-returned-by-cfx_gettransactionreceipt-does-it-include-storage-collateral-fees",level:3},{value:"In a block, if a transaction has both blockHash and status as null, does it mean it has been processed in another block?",id:"in-a-block-if-a-transaction-has-both-blockhash-and-status-as-null-does-it-mean-it-has-been-processed-in-another-block",level:3},{value:"Can an epoch have no blocks?",id:"can-an-epoch-have-no-blocks",level:3},{value:"How does js-conflux-sdk decode function data?",id:"how-does-js-conflux-sdk-decode-function-data",level:3},{value:"Can an already deployed contract be replaced? Without creating a new contract?",id:"can-an-already-deployed-contract-be-replaced-without-creating-a-new-contract",level:3},{value:"Is there any SDKs for Android?",id:"is-there-any-sdks-for-android",level:3},{value:"What versions of the conflux sdk are available?",id:"what-versions-of-the-conflux-sdk-are-available",level:3},{value:"Is the nonce in a block the same as the nonce in a transaction?",id:"is-the-nonce-in-a-block-the-same-as-the-nonce-in-a-transaction",level:3},{value:"What are the chainIds for the mainnet and testnet? How to query?",id:"what-are-the-chainids-for-the-mainnet-and-testnet-how-to-query",level:3},{value:"How to view the bootnode data of the node I&#39;m running?",id:"how-to-view-the-bootnode-data-of-the-node-im-running",level:3},{value:"What are the reasons for a transaction not being packaged?",id:"what-are-the-reasons-for-a-transaction-not-being-packaged",level:3},{value:"How to view the actual fee deducted for each transaction?",id:"how-to-view-the-actual-fee-deducted-for-each-transaction",level:3},{value:"Is the epochHeight in Transaction the same as the epochNumber in TransactionReceipt?",id:"is-the-epochheight-in-transaction-the-same-as-the-epochnumber-in-transactionreceipt",level:3},{value:"How to determine if a block was mined by a specific miner? Is the first transaction in a Conflux block also a coinbase transaction, like in Bitcoin?",id:"how-to-determine-if-a-block-was-mined-by-a-specific-miner-is-the-first-transaction-in-a-conflux-block-also-a-coinbase-transaction-like-in-bitcoin",level:3},{value:"<strong>What is the transaction <code>0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228</code> on the mainnet showing as contract creation, but the returned field <code>contractCreated</code> is null? How do you get the address of this contract at this time?</strong>",id:"what-is-the-transaction-0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228-on-the-mainnet-showing-as-contract-creation-but-the-returned-field-contractcreated-is-null-how-do-you-get-the-address-of-this-contract-at-this-time",level:3},{value:"<strong>What&#39;s the difference between a full node and an archive node?</strong>",id:"whats-the-difference-between-a-full-node-and-an-archive-node",level:3},{value:"<strong>How to check the reason for transaction failure?</strong>",id:"how-to-check-the-reason-for-transaction-failure",level:3},{value:"<strong>What are the situations for tx revert?</strong>",id:"what-are-the-situations-for-tx-revert",level:3},{value:"<strong>What does this error mean? <code>Failed imported to deferred pool: Tx with same nonce already inserted. To replace it, you need to specify a gas price &gt; 20000000000</code></strong>",id:"what-does-this-error-mean-failed-imported-to-deferred-pool-tx-with-same-nonce-already-inserted-to-replace-it-you-need-to-specify-a-gas-price--20000000000",level:3},{value:"<strong>Is there a method in js-conflux-sdk to parse the data in tx?</strong>",id:"is-there-a-method-in-js-conflux-sdk-to-parse-the-data-in-tx",level:3},{value:"<strong>Can the logger of the Conflux class in js-conflux-sdk use something other than console?</strong>",id:"can-the-logger-of-the-conflux-class-in-js-conflux-sdk-use-something-other-than-console",level:3},{value:"<strong>If you use a sponsorship contract, does it mean that all users operate the contract, regardless of which method of the contract is called, are they all paid according to a unified standard?</strong>",id:"if-you-use-a-sponsorship-contract-does-it-mean-that-all-users-operate-the-contract-regardless-of-which-method-of-the-contract-is-called-are-they-all-paid-according-to-a-unified-standard",level:3},{value:"<strong>Is there any information on the conflux sponsorship mode?</strong>",id:"is-there-any-information-on-the-conflux-sponsorship-mode",level:3},{value:"<strong>Are ERC20/ERC777 still called this way in the Conflux network?</strong>",id:"are-erc20erc777-still-called-this-way-in-the-conflux-network",level:3},{value:"<strong>What are the websocket service ports of the official nodes of the mainnet and testnet?</strong>",id:"what-are-the-websocket-service-ports-of-the-official-nodes-of-the-mainnet-and-testnet",level:3},{value:"<strong>When <code>docker pull confluxchain/conflux-rust</code> prompts &quot;no such file&quot;, how to solve it?</strong>",id:"when-docker-pull-confluxchainconflux-rust-prompts-no-such-file-how-to-solve-it",level:3},{value:"<strong>What is block height?</strong>",id:"what-is-block-height",level:3},{value:"<strong>What is transaction signing?</strong>",id:"what-is-transaction-signing",level:3},{value:"<strong>What are the measurement units in the conflux system and their conversion relationships?</strong>",id:"what-are-the-measurement-units-in-the-conflux-system-and-their-conversion-relationships",level:3},{value:"<strong>What does the error <code>estimateGasAndColletral</code> mean? &quot;Cannot estimate: transaction execution failed, all gas will be charged&quot;</strong>",id:"what-does-the-error-estimategasandcolletral-mean-cannot-estimate-transaction-execution-failed-all-gas-will-be-charged",level:3},{value:"<strong>How do developers start a node?</strong>",id:"how-do-developers-start-a-node",level:3},{value:"<strong>What is the Transactions Lifecycle?</strong>",id:"what-is-the-transactions-lifecycle",level:3}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"\u793e\u533a\u5e38\u89c1\u95ee\u9898",children:"\u793e\u533a\u5e38\u89c1\u95ee\u9898"}),"\n",(0,o.jsx)(n.h3,{id:"do-we-need-to-pay-attention-to-the-storagelimit-and-epochheight-fields-in-regular-transactions",children:(0,o.jsxs)(n.strong,{children:["Do we need to pay attention to the ",(0,o.jsx)(n.code,{children:"storageLimit"})," and ",(0,o.jsx)(n.code,{children:"epochHeight"})," fields in regular transactions?"]})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["When calling a contract, the SDK will automatically set ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"storageLimit"})})," based on ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"cfx_estmastGasAndCollateral"})})," and ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"epochHeight"})})," based on ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"cfx_getEpochNumber"})}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["When transferring CFX, ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"storageLimit"})})," is automatically set to 0, and ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"epochHeight"})})," is set to the current epoch number."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"i-want-to-send-multiple-transactions-at-once-but-theres-no-method-to-set-nonce-how-can-i-solve-this",children:(0,o.jsx)(n.strong,{children:"I want to send multiple transactions at once, but there's no method to set nonce. How can I solve this?"})}),"\n",(0,o.jsx)(n.p,{children:"You need to maintain the nonce yourself, adding one for each transaction."}),"\n",(0,o.jsx)(n.h3,{id:"what-does-the-error-exceedstoragelimit-mean-when-sending-a-transaction",children:(0,o.jsx)(n.strong,{children:'What does the error "ExceedStorageLimit" mean when sending a transaction?'})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"storagelimit"})})," value is set lower than the actual required value."]}),"\n",(0,o.jsx)(n.h3,{id:"how-do-i-convert-a-private-key-into-keystore-format",children:(0,o.jsx)(n.strong,{children:"How do I convert a private key into keystore format?"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["In ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"go-conflux-sdk"})}),", use ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"AccountManager.ImportKey"})})," to import a private key into a keystore file."]}),"\n",(0,o.jsxs)(n.li,{children:["In ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"js-conflux-sdk"})}),", use ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"sign.encrypt"})})," to generate a keystore object based on the private key."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"why-do-nodes-need-to-re-sync-data-after-changing-configurations",children:(0,o.jsx)(n.strong,{children:"Why do nodes need to re-sync data after changing configurations?"})}),"\n",(0,o.jsx)(n.p,{children:"Restarting the node program doesn't start syncing data from scratch. Instead, it restores data from the database and starts syncing from the last checkpoint. This is because the data of the last checkpoint is stored in memory, and when the program is closed, the data in memory is lost, making it seem like data is being re-synced."}),"\n",(0,o.jsx)(n.h3,{id:"can-the-sponsor-payment-function-be-tested-normally-on-the-test-chain",children:(0,o.jsx)(n.strong,{children:"Can the sponsor payment function be tested normally on the test chain?"})}),"\n",(0,o.jsx)(n.p,{children:"Yes, it can."}),"\n",(0,o.jsx)(n.h3,{id:"is-cfx-an-erc777-contract",children:(0,o.jsx)(n.strong,{children:"Is CFX an ERC777 contract?"})}),"\n",(0,o.jsx)(n.p,{children:"No, CFX is not a contract token. CFX is equivalent to Ethereum's ETH."}),"\n",(0,o.jsx)(n.h3,{id:"does-conflux-support-the-ethereum-library-openzeppelin",children:(0,o.jsx)(n.strong,{children:"Does Conflux support the Ethereum library OpenZeppelin?"})}),"\n",(0,o.jsx)(n.p,{children:"Yes, it's supported. You can directly reference it. However, note that the ERC1820 contract address on the Conflux chain is different from Ethereum. On Conflux, the ERC1820 contract address is: 0x88887ed889e776bcbe2f0f9932ecfabcdfcd1820."}),"\n",(0,o.jsx)(n.h3,{id:"where-is-the-testnet-faucet",children:(0,o.jsx)(n.strong,{children:"Where is the testnet faucet?"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["To receive CFX test tokens, you can get them directly from the faucet portals.","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Core Space Testnet Faucet: ",(0,o.jsx)(n.a,{href:"https://faucet.confluxnetwork.org/",children:"https://faucet.confluxnetwork.org/"})]}),"\n",(0,o.jsxs)(n.li,{children:["eSpace Testnet Faucet: ",(0,o.jsx)(n.a,{href:"https://efaucet.confluxnetwork.org/",children:"https://efaucet.confluxnetwork.org/"})]}),"\n",(0,o.jsxs)(n.li,{children:["Mainnet Faucets: ",(0,o.jsx)(n.a,{href:"https://conflux-faucets.com/",children:"https://conflux-faucets.com/"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"why-does-the-value-sometimes-appear-smaller-when-i-use-latest_confirmed-to-get-the-epoch",children:(0,o.jsxs)(n.strong,{children:["Why does the value sometimes appear smaller when I use ",(0,o.jsx)(n.code,{children:"latest_confirmed"})," to get the epoch?"]})}),"\n",(0,o.jsx)(n.p,{children:"This can happen in cases of poor network connectivity, primarily due to high block synchronization delays."}),"\n",(0,o.jsx)(n.h3,{id:"what-settings-do-developers-need-to-make-when-starting-a-node",children:(0,o.jsx)(n.strong,{children:"What settings do developers need to make when starting a node?"})}),"\n",(0,o.jsxs)(n.p,{children:["You can find all node related documentation on ",(0,o.jsx)(n.a,{href:"../run-a-node/",children:"THIS"})," section."]}),"\n",(0,o.jsx)(n.h3,{id:"does-cfx-have-an-api-to-query-computing-power",children:(0,o.jsx)(n.strong,{children:"Does CFX have an API to query computing power?"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://www.confluxscan.io/v1/plot?interval=514&limit=10",children:"https://www.confluxscan.io/v1/plot?interval=514&limit=10"})}),"\n",(0,o.jsx)(n.h3,{id:"what-is-a-pivot-chain-switch",children:(0,o.jsx)(n.strong,{children:"What is a pivot chain switch?"})}),"\n",(0,o.jsx)(n.p,{children:"A pivot chain refers to a chain formed by connecting pivot blocks based on block hashes. When a non-pivot block B in a certain epoch has a subtree heavier than the previous pivot block A, B becomes the pivot block for that epoch. This is a pivot chain switch."}),"\n",(0,o.jsx)(n.h3,{id:"how-to-determine-if-a-pivot-chain-switch-has-occurred",children:(0,o.jsx)(n.strong,{children:"How to determine if a pivot chain switch has occurred?"})}),"\n",(0,o.jsx)(n.p,{children:"When the old pivot chain switches to the new pivot chain, the latest mined epoch number will be a value not greater than the last obtained latest mined epoch number."}),"\n",(0,o.jsx)(n.p,{children:"As shown below, the latest epoch at the previous moment was 10, and the latest epoch at this moment is 9, indicating that the pivot block for epoch 9 has changed from 9A to 9B, and a pivot chain switch has occurred."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-css",children:"cssCopy code\n[1]\xb7\xb7\xb7[8]---[9A]---[10A] old pivot chain\n        \\\n          \\\n            [9B] new pivot chain\n\n"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"How can developers monitor?"})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Start a full node (archive node) and enable the websocket RPC service."}),"\n",(0,o.jsxs)(n.li,{children:["Subscribe to the ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"latest mined epoch"})})," event using ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"rpc_subscribeEpoch"})}),"."]}),"\n",(0,o.jsx)(n.li,{children:"Wait for the latest mined epoch B and compare it with the previously obtained latest mined epoch A."}),"\n",(0,o.jsxs)(n.li,{children:["If ",(0,o.jsx)(n.code,{children:"B <= A"}),", a pivot chain switch has occurred."]}),"\n",(0,o.jsx)(n.li,{children:"Go to step 3."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"How can developers synchronize block and transaction status?"})}),"\n",(0,o.jsxs)(n.p,{children:["If local data needs to be kept up-to-date and accurate for blocks and transactions, then when a pivot chain switch occurs (assuming the latest mined epoch number changes from A to B, and ",(0,o.jsx)(n.code,{children:"B <= A"}),"):"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Assume the latest state epoch number obtained when the latest mined epoch number was A is A'."}),"\n",(0,o.jsx)(n.li,{children:"Assume the latest state epoch number obtained when the latest mined epoch number was B is B'."}),"\n"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"If B > A', update (A', B'] (i.e., this situation will not affect the executed blocks and transactions, process normally)."}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-css",children:"\n-----A'------A\n--------B'-B\n\n"})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["If ",(0,o.jsx)(n.code,{children:"B <= A'"}),", delete the data between [B, A']."]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-css",children:"\n-----A'------A\n----B\n\n"})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Update [B', B]."}),"\n",(0,o.jsx)(n.li,{children:"Go to step 1."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"I hope this translation helps you understand the content better! If you have any further questions or need clarification on any points, please let me know."}),"\n",(0,o.jsx)(n.h3,{id:"what-is-storage-collateral-and-how-is-it-calculated-for-example-how-many-drips-are-required-for-1kb-storage",children:"What is storage collateral, and how is it calculated? For example, how many drips are required for 1kb storage?"}),"\n",(0,o.jsx)(n.p,{children:"Storage collateral refers to the need to collateralize a corresponding amount of cfx when adding new storage usage in a contract. For each storage entry, the last account that writes to this entry is called the owner of this storage entry. The storage collateral fee will be returned to the owner after the storage is released. Every 1kb of storage requires a collateral of 1cfx."}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["For more details, please refer to ",(0,o.jsx)(n.a,{href:"../../core/core-space-basics/storage",children:"THIS"})," section."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"what-fees-are-included-in-the-gasfee-returned-by-cfx_gettransactionreceipt-does-it-include-storage-collateral-fees",children:"What fees are included in the GasFee returned by cfx_getTransactionReceipt? Does it include storage collateral fees?"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Gasfee does not include storage fees. Gasfee = gasUsed * gasPrice, and the gasfee is spent after the transaction is executed."}),"\n",(0,o.jsx)(n.li,{children:"storageCollateralized represents the actual storage collateral fee used. The storage collateral fee will be returned when the storage is released."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"in-a-block-if-a-transaction-has-both-blockhash-and-status-as-null-does-it-mean-it-has-been-processed-in-another-block",children:"In a block, if a transaction has both blockHash and status as null, does it mean it has been processed in another block?"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Generally, yes. This is because the tx was not executed in this block. If a tx is packaged repeatedly, the tx will be executed in the block of the earliest epoch."}),"\n",(0,o.jsx)(n.li,{children:"Another situation is that the block containing the transaction has been packaged but not yet executed. Every block is executed 5 seconds after being packaged."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"can-an-epoch-have-no-blocks",children:"Can an epoch have no blocks?"}),"\n",(0,o.jsx)(n.p,{children:"No, there will be at least one."}),"\n",(0,o.jsx)(n.h3,{id:"how-does-js-conflux-sdk-decode-function-data",children:"How does js-conflux-sdk decode function data?"}),"\n",(0,o.jsxs)(n.p,{children:["Refer to the API documentation: ",(0,o.jsx)(n.a,{href:"https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/api.md",children:"link"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-csharp",children:"transaction = await conflux.getTransactionByHash('0x2055f3287f1a6ce77d91f5dfdf7517a531b3a560fee1265f27dc1ff92314530b');\ncontract.abi.decodeData(transaction.data)\n\n"})}),"\n",(0,o.jsx)(n.h3,{id:"can-an-already-deployed-contract-be-replaced-without-creating-a-new-contract",children:"Can an already deployed contract be replaced? Without creating a new contract?"}),"\n",(0,o.jsx)(n.p,{children:"Contracts cannot be replaced or upgraded; you can only deploy a new one."}),"\n",(0,o.jsx)(n.h3,{id:"is-there-any-sdks-for-android",children:"Is there any SDKs for Android?"}),"\n",(0,o.jsx)(n.p,{children:"Android can use java-conflux-sdk."}),"\n",(0,o.jsx)(n.h3,{id:"what-versions-of-the-conflux-sdk-are-available",children:"What versions of the conflux sdk are available?"}),"\n",(0,o.jsxs)(n.p,{children:["You can find all the Conflux SDKs in ",(0,o.jsx)(n.a,{href:"../../core/build/sdks-and-tools/sdks",children:"THIS"})," section"]}),"\n",(0,o.jsx)(n.h3,{id:"is-the-nonce-in-a-block-the-same-as-the-nonce-in-a-transaction",children:"Is the nonce in a block the same as the nonce in a transaction?"}),"\n",(0,o.jsx)(n.p,{children:"The nonce of a transaction indicates the number of transactions from a specific address, while the nonce of a block refers to the random number used in PoW calculations."}),"\n",(0,o.jsx)(n.h3,{id:"what-are-the-chainids-for-the-mainnet-and-testnet-how-to-query",children:"What are the chainIds for the mainnet and testnet? How to query?"}),"\n",(0,o.jsx)(n.p,{children:'The mainnet is 1029, and the testnet is 1. You can obtain them using the rpc "cfx_getStatus" or the SDK\'s getStatus method.'}),"\n",(0,o.jsx)(n.h3,{id:"how-to-view-the-bootnode-data-of-the-node-im-running",children:"How to view the bootnode data of the node I'm running?"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"If it's a testnet or mainnet node, the bootnode list is the bootnodes configuration in the toml configuration file."}),"\n",(0,o.jsx)(n.li,{children:"For a local node, it itself is the bootnode (or it doesn't have a bootnode)."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"what-are-the-reasons-for-a-transaction-not-being-packaged",children:"What are the reasons for a transaction not being packaged?"}),"\n",(0,o.jsx)(n.p,{children:"The following conditions can lead to a transaction not being packaged:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"The balance must satisfy: balance >= value + gas * gasprice + storagelimit/1024"}),"\n",(0,o.jsx)(n.li,{children:"The nonce must be consecutive. Only when a transaction with a lower nonce is packaged will a transaction with a higher nonce be packaged."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"how-to-view-the-actual-fee-deducted-for-each-transaction",children:"How to view the actual fee deducted for each transaction?"}),"\n",(0,o.jsx)(n.p,{children:"Check the gasFee in the transaction receipt."}),"\n",(0,o.jsx)(n.h3,{id:"is-the-epochheight-in-transaction-the-same-as-the-epochnumber-in-transactionreceipt",children:"Is the epochHeight in Transaction the same as the epochNumber in TransactionReceipt?"}),"\n",(0,o.jsx)(n.p,{children:"The epochHeight in a Transaction is used to specify the epoch range for tx execution as (epochHeight, epochHeight + 10000). The epochNumber in TransactionReceipt indicates the epoch number at which the transaction was executed."}),"\n",(0,o.jsx)(n.h3,{id:"how-to-determine-if-a-block-was-mined-by-a-specific-miner-is-the-first-transaction-in-a-conflux-block-also-a-coinbase-transaction-like-in-bitcoin",children:"How to determine if a block was mined by a specific miner? Is the first transaction in a Conflux block also a coinbase transaction, like in Bitcoin?"}),"\n",(0,o.jsx)(n.p,{children:"Conflux doesn't have a coinbase transaction. You can determine the miner using block.miner."}),"\n",(0,o.jsx)(n.h3,{id:"what-is-the-transaction-0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228-on-the-mainnet-showing-as-contract-creation-but-the-returned-field-contractcreated-is-null-how-do-you-get-the-address-of-this-contract-at-this-time",children:(0,o.jsxs)(n.strong,{children:["What is the transaction ",(0,o.jsx)(n.code,{children:"0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228"})," on the mainnet showing as contract creation, but the returned field ",(0,o.jsx)(n.code,{children:"contractCreated"})," is null? How do you get the address of this contract at this time?"]})}),"\n",(0,o.jsxs)(n.p,{children:["This is a transaction from the genesis block. The transaction here is quite special. In the future, as long as it is a contract creation, ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"contractCreated"})})," will have the contract's address."]}),"\n",(0,o.jsx)(n.h3,{id:"whats-the-difference-between-a-full-node-and-an-archive-node",children:(0,o.jsx)(n.strong,{children:"What's the difference between a full node and an archive node?"})}),"\n",(0,o.jsx)(n.p,{children:"A full node only saves all block headers and transactions from the most recent era. An archive node will save all block headers and transactions."}),"\n",(0,o.jsx)(n.h3,{id:"how-to-check-the-reason-for-transaction-failure",children:(0,o.jsx)(n.strong,{children:"How to check the reason for transaction failure?"})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"txExecErrorMsg"})})," in the transaction receipt provides the error information for the transaction."]}),"\n",(0,o.jsx)(n.h3,{id:"what-are-the-situations-for-tx-revert",children:(0,o.jsx)(n.strong,{children:"What are the situations for tx revert?"})}),"\n",(0,o.jsxs)(n.p,{children:["Tx revert means the contract execution failed. Contract developers should use ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"require"})})," with an error message where an exception might occur. This way, the contract execution error will be seen in the ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"txExecErrorMsg"})})," of the transaction receipt."]}),"\n",(0,o.jsx)(n.h3,{id:"what-does-this-error-mean-failed-imported-to-deferred-pool-tx-with-same-nonce-already-inserted-to-replace-it-you-need-to-specify-a-gas-price--20000000000",children:(0,o.jsxs)(n.strong,{children:["What does this error mean? ",(0,o.jsx)(n.code,{children:"Failed imported to deferred pool: Tx with same nonce already inserted. To replace it, you need to specify a gas price > 20000000000"})]})}),"\n",(0,o.jsx)(n.p,{children:"There is already a transaction with the same nonce. Either wait for it to be packaged or send a new one with the same nonce, but you need to raise the gasPrice."}),"\n",(0,o.jsx)(n.h3,{id:"is-there-a-method-in-js-conflux-sdk-to-parse-the-data-in-tx",children:(0,o.jsx)(n.strong,{children:"Is there a method in js-conflux-sdk to parse the data in tx?"})}),"\n",(0,o.jsxs)(n.p,{children:["First, initialize the contract using abi, then use ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"contract.abi.decodeData()"})}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"can-the-logger-of-the-conflux-class-in-js-conflux-sdk-use-something-other-than-console",children:(0,o.jsx)(n.strong,{children:"Can the logger of the Conflux class in js-conflux-sdk use something other than console?"})}),"\n",(0,o.jsx)(n.p,{children:"Any object that has implemented the methods error, info, and log can be used."}),"\n",(0,o.jsx)(n.h3,{id:"if-you-use-a-sponsorship-contract-does-it-mean-that-all-users-operate-the-contract-regardless-of-which-method-of-the-contract-is-called-are-they-all-paid-according-to-a-unified-standard",children:(0,o.jsx)(n.strong,{children:"If you use a sponsorship contract, does it mean that all users operate the contract, regardless of which method of the contract is called, are they all paid according to a unified standard?"})}),"\n",(0,o.jsx)(n.p,{children:"Yes."}),"\n",(0,o.jsx)(n.h3,{id:"is-there-any-information-on-the-conflux-sponsorship-mode",children:(0,o.jsx)(n.strong,{children:"Is there any information on the conflux sponsorship mode?"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"../../core/core-space-basics/sponsor-mechanism",children:"Here's the link"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"are-erc20erc777-still-called-this-way-in-the-conflux-network",children:(0,o.jsx)(n.strong,{children:"Are ERC20/ERC777 still called this way in the Conflux network?"})}),"\n",(0,o.jsx)(n.p,{children:"Both can be used. They are still referred to as ERC20/ERC777, but in some contexts you can find them reffered as CRC20/CRC777."}),"\n",(0,o.jsx)(n.h3,{id:"what-are-the-websocket-service-ports-of-the-official-nodes-of-the-mainnet-and-testnet",children:(0,o.jsx)(n.strong,{children:"What are the websocket service ports of the official nodes of the mainnet and testnet?"})}),"\n",(0,o.jsx)(n.p,{children:"You can find all the Network Endpoints in the following pages:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"../../core/conflux_rpcs",children:"Core Space Network Endpoints"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"/zh-CN/docs/espace/network-endpoints",children:"eSpace Network Endpoints"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"when-docker-pull-confluxchainconflux-rust-prompts-no-such-file-how-to-solve-it",children:(0,o.jsxs)(n.strong,{children:["When ",(0,o.jsx)(n.code,{children:"docker pull confluxchain/conflux-rust"}),' prompts "no such file", how to solve it?']})}),"\n",(0,o.jsx)(n.p,{children:"It might be a network issue. You can try setting a registry for docker:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'\n{\n  "registry-mirrors": [\n    "https://at8ak49f.mirror.aliyuncs.com"\n  ],\n  "experimental": false,\n  "debug": true}\n\n'})}),"\n",(0,o.jsx)(n.h3,{id:"what-is-block-height",children:(0,o.jsx)(n.strong,{children:"What is block height?"})}),"\n",(0,o.jsx)(n.p,{children:"A blockchain is a block followed by another block, continuously growing. Block height refers to the distance from this block to the genesis block."}),"\n",(0,o.jsx)(n.h3,{id:"what-is-transaction-signing",children:(0,o.jsx)(n.strong,{children:"What is transaction signing?"})}),"\n",(0,o.jsx)(n.p,{children:"Transaction signing refers to a signature obtained from a transaction through a signing algorithm using a private key. The verifier can obtain the address corresponding to the private key through this signature and transaction information, thereby proving that the transaction was indeed initiated by this account address."}),"\n",(0,o.jsx)(n.h3,{id:"what-are-the-measurement-units-in-the-conflux-system-and-their-conversion-relationships",children:(0,o.jsx)(n.strong,{children:"What are the measurement units in the conflux system and their conversion relationships?"})}),"\n",(0,o.jsx)(n.p,{children:"The smallest unit in conflux is drip."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"1cfx = 10^18 drip"}),"\n",(0,o.jsx)(n.li,{children:"1gdrip = 10^9 drip"}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"what-does-the-error-estimategasandcolletral-mean-cannot-estimate-transaction-execution-failed-all-gas-will-be-charged",children:(0,o.jsxs)(n.strong,{children:["What does the error ",(0,o.jsx)(n.code,{children:"estimateGasAndColletral"}),' mean? "Cannot estimate: transaction execution failed, all gas will be charged"']})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Cannot estimate: transaction execution failed, all gas will be charged (execution error: VmError(BadInstruction { instruction: 169 }))\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Reason: The constructor was invalid when deploying the contract; it is usually caused by forgetting to write the ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"to"})})," address when calling the contract."]}),"\n",(0,o.jsx)(n.h3,{id:"how-do-developers-start-a-node",children:(0,o.jsx)(n.strong,{children:"How do developers start a node?"})}),"\n",(0,o.jsxs)(n.p,{children:["You can find all node related documentation on ",(0,o.jsx)(n.a,{href:"../run-a-node/",children:"THIS"})," section."]}),"\n",(0,o.jsx)(n.h3,{id:"what-is-the-transactions-lifecycle",children:(0,o.jsx)(n.strong,{children:"What is the Transactions Lifecycle?"})}),"\n",(0,o.jsxs)(n.p,{children:["You can find allthe details on the Transaction Lifecycle in ",(0,o.jsx)(n.a,{href:"../../general/conflux-basics/transactions/#transaction-lifecycle",children:"THIS"})," section."]})]})}function d(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var o=t(67294);const a={},s=o.createContext(a);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);