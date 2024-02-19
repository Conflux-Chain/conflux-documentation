"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6520],{34155:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>l});var s=r(85893),o=r(11151);const t={sidebar_position:7,title:"Send Transaction Errors",displayed_sidebar:"coreSidebar",toc_max_heading_level:4,keywords:["errors"]},a=void 0,i={id:"core/core-space-basics/transactions/send-tx-error",title:"Send Transaction Errors",description:"When using SDK or the Fluent wallet to send transactions, you may encounter some errors. This document outlines some common errors and their solutions.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/core/core-space-basics/transactions/send-tx-error.md",sourceDirName:"core/core-space-basics/transactions",slug:"/core/core-space-basics/transactions/send-tx-error",permalink:"/zh-CN/docs/core/core-space-basics/transactions/send-tx-error",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,title:"Send Transaction Errors",displayed_sidebar:"coreSidebar",toc_max_heading_level:4,keywords:["errors"]},sidebar:"coreSidebar",previous:{title:"Transaction Receipt",permalink:"/zh-CN/docs/core/core-space-basics/transactions/receipt"},next:{title:"Why TX is Pending?",permalink:"/zh-CN/docs/core/core-space-basics/transactions/why-transaction-is-pending"}},c={},l=[{value:"Errors from RPC endpoint",id:"errors-from-rpc-endpoint",level:2},{value:"Errors from Estimation",id:"errors-from-estimation",level:3},{value:"<code>cfx_sendRawTransaction</code> Failure",id:"cfx_sendrawtransaction-failure",level:3},{value:"Balance not Enough",id:"balance-not-enough",level:4},{value:"Nonce Error",id:"nonce-error",level:4},{value:"gasPrice Error",id:"gasprice-error",level:4},{value:"gas Error",id:"gas-error",level:4},{value:"Transaction Pool is Full",id:"transaction-pool-is-full",level:4},{value:"Fluent Wallet Error",id:"fluent-wallet-error",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2},{value:"Reference",id:"reference",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"When using SDK or the Fluent wallet to send transactions, you may encounter some errors. This document outlines some common errors and their solutions."}),"\n",(0,s.jsx)(n.h2,{id:"errors-from-rpc-endpoint",children:"Errors from RPC endpoint"}),"\n",(0,s.jsx)(n.h3,{id:"errors-from-estimation",children:"Errors from Estimation"}),"\n",(0,s.jsxs)(n.p,{children:["During the construction of a transaction, it is necessary to estimate the gas fee using the ",(0,s.jsx)(n.code,{children:"estimateGas"})," method. If it is an interaction with a contract, the ",(0,s.jsx)(n.code,{children:"estimateGas"})," method may fail for various reasons, such as:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Incorrect contract method call parameters, calling a non-existent method"}),"\n",(0,s.jsx)(n.li,{children:"The caller lacks permission"}),"\n",(0,s.jsx)(n.li,{children:"Insufficient balance of the caller"}),"\n",(0,s.jsx)(n.li,{children:"Exceptional errors within the contract method: e.g., division by zero, array out of bounds, overflow, etc."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"estimateGas"})," method fails, it will return an error, for example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n    "code": -32015,\n    "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 18014398509481983999023437515000000, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 18014398509481983999023437500000000 })",\n    "data": "0x0000xxxx"\n}  \n'})}),"\n",(0,s.jsxs)(n.p,{children:["Sometimes, the error message contains obvious information about the error, making it easy to identify the cause. In some cases, it may only show ",(0,s.jsx)(n.code,{children:"Vm reverted"}),". In such cases, you may need to locate the error through repeated code verification and trials, or by using trace data to assist in finding the error."]}),"\n",(0,s.jsxs)(n.h3,{id:"cfx_sendrawtransaction-failure",children:[(0,s.jsx)(n.code,{children:"cfx_sendRawTransaction"})," Failure"]}),"\n",(0,s.jsxs)(n.p,{children:["After assembling the transaction, it needs to be sent using the ",(0,s.jsx)(n.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction",children:(0,s.jsx)(n.code,{children:"cfx_sendRawTransaction"})})," method, which may fail for various reasons."]}),"\n",(0,s.jsx)(n.h4,{id:"balance-not-enough",children:"Balance not Enough"}),"\n",(0,s.jsxs)(n.p,{children:["If the sender's balance is insufficient, an error will be returned (found in the ",(0,s.jsx)(n.code,{children:"error.data"})," field of the RPC response):"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"\\"Transaction 0xtxhashxxxx is discarded due to out of balance, needs 9000000000420000000000000 but account balance is 90095849479680000000000\\""\n'})}),"\n",(0,s.jsx)(n.h4,{id:"nonce-error",children:"Nonce Error"}),"\n",(0,s.jsxs)(n.p,{children:["If the nonce is set too large, too small, or reused, it can also lead to transaction sending failure. Specific failure situations can be seen in ",(0,s.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/nonce",children:"nonce management"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"gasprice-error",children:"gasPrice Error"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"gasPrice"})," cannot be set to 0 or too small; otherwise, you may encounter an error like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"\\"transaction gas price 1 less than the minimum value 20000000000\\""\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Currently, the minimum ",(0,s.jsx)(n.code,{children:"gasPrice"})," in Core Space is 1 Gdrip, equivalent to 0.000000001 CFX. In eSpace, it is 20 Gdrip, equivalent to 0.00000002 CFX."]}),"\n",(0,s.jsx)(n.h4,{id:"gas-error",children:"gas Error"}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"gas"})," is set too low, it may result in an OutOfGas problem, causing the transaction to fail, for example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"VmError(OutOfGas)"\n'})}),"\n",(0,s.jsx)(n.p,{children:"In this case, you can resolve the issue by increasing the gas."}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"gas"})," value cannot be set too high either; the maximum allowed value is 15 million. Exceeding this value will result in an error like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"\\"transaction gas 20000000 exceeds the maximum value 15000000, the half of pivot block gas limit\\""\n'})}),"\n",(0,s.jsx)(n.h4,{id:"transaction-pool-is-full",children:"Transaction Pool is Full"}),"\n",(0,s.jsx)(n.p,{children:"In the case of a full transaction pool, and if the gasPrice of the sent transaction is lower than the lowest gasPrice in the transaction pool, you may encounter errors like:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"Failed imported to deferred pool: Transaction Pool is full"\n'})}),"\n",(0,s.jsx)(n.p,{children:"or"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"txpool is full"\n'})}),"\n",(0,s.jsx)(n.p,{children:"In this situation, you can solve the problem by increasing the gasPrice. You can check the current network gasPrice in the upper right corner of Scan."}),"\n",(0,s.jsx)(n.h2,{id:"fluent-wallet-error",children:"Fluent Wallet Error"}),"\n",(0,s.jsxs)(n.p,{children:["When users use the Fluent wallet to send transactions, essentially, they are also sending transactions by calling the ",(0,s.jsx)(n.a,{href:"/docs/core/build/json-rpc/cfx-namespace/#cfx_sendrawtransaction",children:(0,s.jsx)(n.code,{children:"cfx_sendRawTransaction"})})," method. Therefore, they may encounter the above errors, for example:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Fluent Wallet Error",src:r(76776).Z+"",width:"1294",height:"447"})}),"\n",(0,s.jsx)(n.p,{children:"In such cases, follow the corresponding processing method."}),"\n",(0,s.jsx)(n.p,{children:"Additionally, using an unavailable RPC node in the Fluent wallet can also lead to transaction sending failure, for example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'"failed after 0 retries: timeout"\n'})}),"\n",(0,s.jsx)(n.p,{children:"In this case, you can try switching the RPC node or wait for the RPC node to recover before resending the transaction."}),"\n",(0,s.jsx)(n.h2,{id:"\u603b\u7ed3",children:"\u603b\u7ed3"}),"\n",(0,s.jsx)(n.p,{children:"If there is a network issue, please wait for the network to recover or switch to a different RPC node before resubmitting the transaction. If you encounter a full transaction pool, increase the gasPrice when sending the transaction. For other errors, it is likely that there is an issue with the settings of certain transaction fields. Please follow the methods introduced earlier to correctly set the fields and resend the transaction."}),"\n",(0,s.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/docs/core/build/json-rpc/cfx_sendTransaction-errors",children:"cfx_sendRawTransaction error list"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},76776:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/same-nonce-already-inserted-e6198f21979b179270faff12db83d97d.jpg"},11151:(e,n,r)=>{r.d(n,{Z:()=>i,a:()=>a});var s=r(67294);const o={},t=s.createContext(o);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);