"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3331],{76046:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>d});var i=s(85893),a=s(11151);const t={sidebar_position:0,title:"\u6982\u89c8",keywords:["transaction"],displayed_sidebar:"coreSidebar"},c=void 0,o={id:"core/core-space-basics/transactions/overview",title:"\u6982\u89c8",description:"Transaction is an important concept in blockchain. If you are not familiar with the concept of transactions and would like to quickly understand it, you can read Transaction Quick Intro.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/core/core-space-basics/transactions/overview.md",sourceDirName:"core/core-space-basics/transactions",slug:"/core/core-space-basics/transactions/overview",permalink:"/zh-CN/docs/core/core-space-basics/transactions/overview",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,title:"\u6982\u89c8",keywords:["transaction"],displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"\u5b58\u50a8\u62b5\u62bc",permalink:"/zh-CN/docs/core/core-space-basics/storage"},next:{title:"\u4ea4\u6613\u5b57\u6bb5",permalink:"/zh-CN/docs/core/core-space-basics/transactions/tx-fields"}},r={},d=[{value:"Transactions Fields",id:"transactions-fields",level:2},{value:"Nonce",id:"nonce",level:2},{value:"Transaction Fees",id:"transaction-fees",level:2},{value:"Encoding and Signing",id:"encoding-and-signing",level:2},{value:"Lifecycle",id:"lifecycle",level:2},{value:"Transaction Receipt",id:"transaction-receipt",level:2},{value:"Transaction Sending Failures",id:"transaction-sending-failures",level:2},{value:"Pending Transactions",id:"pending-transactions",level:2},{value:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",p:"p",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Transaction is an important concept in blockchain. If you are not familiar with the concept of transactions and would like to quickly understand it, you can read ",(0,i.jsx)(n.a,{href:"/docs/general/conflux-basics/transactions.md",children:"Transaction Quick Intro"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Typically, we use ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/wallets",children:"wallets"})," or ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/build/sdks-and-tools/sdks",children:"SDKs"})," to send transactions, and these tools will assist us in completing complex tasks such as constructing transactions, sending them to the network, and ultimately waiting for the transaction be confirmed or finalized, making the process relatively straightforward."]}),"\n",(0,i.jsx)(n.p,{children:"However, if you wish to delve deeper into the principles of transactions or encounter issues while sending transactions, you may need to understand the details of transactions."}),"\n",(0,i.jsx)(n.h2,{id:"transactions-fields",children:"Transactions Fields"}),"\n",(0,i.jsxs)(n.p,{children:["A transaction consists of multiple fields, each with its own meaning and purpose. To understand their meanings and how to correctly set these fields, please refer to ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/tx-fields",children:"Transaction Fields"}),". If a transaction fails to send or gets stuck without being mined, it may be due to incorrect settings of certain transaction fields."]}),"\n",(0,i.jsx)(n.h2,{id:"nonce",children:"Nonce"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"nonce"})," field in a transaction is crucial, as it determines the execution order of transactions. Nonce updates are not real-time, so understanding the ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/nonce",children:"nonce"})," is essential, especially when there is a need to quickly send transactions to the chain. Additional ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/nonce",children:"nonce management guidelines"})," are also provided for such cases."]}),"\n",(0,i.jsx)(n.h2,{id:"transaction-fees",children:"Transaction Fees"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"gas"}),", ",(0,i.jsx)(n.code,{children:"gasPrice"})," as well as ",(0,i.jsx)(n.code,{children:"storageLimit"})," fields in a transaction are also crucial. These fields are used to set the execution cost of the transaction. Setting ",(0,i.jsx)(n.code,{children:"gas"})," too low may result in transaction failure, while setting it too high leads to unnecessary fees. The ",(0,i.jsx)(n.code,{children:"gasPrice"})," field affects the transaction's priority in the block, particularly in congested networks. ",(0,i.jsx)(n.code,{children:"storageLimit"})," is a unique field used to specify ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/storage",children:"storage collateral"})," could be used by a transaction. Understanding the ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/transaction-fee",children:"transaction fee"})," can help you set the fields more effectively."]}),"\n",(0,i.jsx)(n.h2,{id:"encoding-and-signing",children:"Encoding and Signing"}),"\n",(0,i.jsxs)(n.p,{children:["After preparing all transaction fields, the transaction needs to be ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/encoding-signning",children:"encoded and signed"})," according to specific rules before being sent. It is then sent to the network using the RPC method ",(0,i.jsx)(n.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction",children:(0,i.jsx)(n.code,{children:"cfx_sendRawTransaction"})}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"lifecycle",children:"Lifecycle"}),"\n",(0,i.jsxs)(n.p,{children:["Once a transaction is sent to the network, it doesn't immediately get mined and executed. Instead, it undergoes a series of state changes. Understanding the ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/lifecycle",children:"transaction lifecycle"})," can help you better comprehend the status changes of a transaction and troubleshoot issues encountered during the transaction sending process."]}),"\n",(0,i.jsx)(n.h2,{id:"transaction-receipt",children:"Transaction Receipt"}),"\n",(0,i.jsxs)(n.p,{children:["After a transaction is executed, a ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/receipt",children:"transaction receipt"})," is generated. The transaction receipt includes information about the transaction's execution results, whether it was successful, how much fee was paid, and details about the block in which the transaction resides."]}),"\n",(0,i.jsx)(n.h2,{id:"transaction-sending-failures",children:"Transaction Sending Failures"}),"\n",(0,i.jsxs)(n.p,{children:["During the process of sending a transaction, various issues may arise. It could be an error in obtaining values for transaction fields, network problems when calling RPC, or errors when calling the ",(0,i.jsx)(n.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction",children:(0,i.jsx)(n.code,{children:"cfx_sendRawTransaction"})})," method. We have compiled common issues and solutions related to sending transactions, please refer to ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/send-tx-error",children:"Common Transaction Sending Issues"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"pending-transactions",children:"Pending Transactions"}),"\n",(0,i.jsxs)(n.p,{children:["After successfully sending a transaction, it should normally be mined within a few seconds. However, there are cases where a transaction remains pending. This can be due to network congestion and a low ",(0,i.jsx)(n.code,{children:"gasPrice"}),", or an incorrect ",(0,i.jsx)(n.code,{children:"nonce"})," setting (often caused by rapid transaction sending). Please refer to ",(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/why-transaction-is-pending",children:"Reasons for Pending Transactions"})," to avoid or resolve this issue."]}),"\n",(0,i.jsx)(n.h2,{id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",children:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/faqs",children:"Frequently asked questions"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>c});var i=s(67294);const a={},t=i.createContext(a);function c(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:c(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);