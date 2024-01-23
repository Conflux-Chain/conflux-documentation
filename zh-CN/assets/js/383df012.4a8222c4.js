"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2666],{54438:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>c,default:()=>l,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var i=n(85893),o=n(11151);const a={sidebar_position:6,title:"Transaction Receipt",displayed_sidebar:"coreSidebar",keywords:["transaction"]},c=void 0,s={id:"core/core-space-basics/transactions/receipt",title:"Transaction Receipt",description:"Transaction receipt is the data structure that contains information about the transaction execution result.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/core/core-space-basics/transactions/receipt.md",sourceDirName:"core/core-space-basics/transactions",slug:"/core/core-space-basics/transactions/receipt",permalink:"/zh-CN/docs/core/core-space-basics/transactions/receipt",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"Transaction Receipt",displayed_sidebar:"coreSidebar",keywords:["transaction"]},sidebar:"coreSidebar",previous:{title:"\u4ea4\u6613\u751f\u547d\u5468\u671f",permalink:"/zh-CN/docs/core/core-space-basics/transactions/lifecycle"},next:{title:"Send Transaction Errors",permalink:"/zh-CN/docs/core/core-space-basics/transactions/send-tx-error"}},r={},d=[{value:"Transaction Receipt",id:"transaction-receipt",level:2},{value:"Receipt Fields",id:"receipt-fields",level:2},{value:"logs",id:"logs",level:3},{value:"Execution Failure",id:"execution-failure",level:2},{value:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",level:2},{value:"What is a transaction receipt, and what information does it contain?",id:"what-is-a-transaction-receipt-and-what-information-does-it-contain",level:3},{value:"Why can&#39;t I retrieve the receipt for a transaction?",id:"why-cant-i-retrieve-the-receipt-for-a-transaction",level:3},{value:"Can the receipt information for a transaction change?",id:"can-the-receipt-information-for-a-transaction-change",level:3},{value:"How do I know that a transaction has been successfully executed?",id:"how-do-i-know-that-a-transaction-has-been-successfully-executed",level:3},{value:"Why would a transaction execution fail?",id:"why-would-a-transaction-execution-fail",level:3},{value:"How to know whether a transaction is safe and confirmed?",id:"how-to-know-whether-a-transaction-is-safe-and-confirmed",level:3},{value:"How does the status of the transaction change?",id:"how-does-the-status-of-the-transaction-change",level:3},{value:"Why does a transaction keep on waiting to be packaged?",id:"why-does-a-transaction-keep-on-waiting-to-be-packaged",level:3}];function h(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Transaction receipt is the data structure that contains information about the transaction execution result."}),"\n",(0,i.jsx)(t.h2,{id:"transaction-receipt",children:"Transaction Receipt"}),"\n",(0,i.jsxs)(t.p,{children:["The receipt can be obtained through the RPC method ",(0,i.jsx)(t.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt",children:(0,i.jsx)(t.code,{children:"cfx_getTransactionReceipt"})}),". This method takes the transaction hash as a parameter and returns ",(0,i.jsx)(t.code,{children:"null"})," if the transaction has not been executed, or a Receipt object after execution is completed."]}),"\n",(0,i.jsx)(t.h2,{id:"receipt-fields",children:"Receipt Fields"}),"\n",(0,i.jsx)(t.p,{children:"The Receipt contains the following types of information:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Basic transaction information: ",(0,i.jsx)(t.code,{children:"transactionHash"}),", ",(0,i.jsx)(t.code,{children:"from"}),", ",(0,i.jsx)(t.code,{children:"to"})]}),"\n",(0,i.jsxs)(t.li,{children:["On-chain transaction information: ",(0,i.jsx)(t.code,{children:"blockHash"}),", ",(0,i.jsx)(t.code,{children:"epochNumber"}),", ",(0,i.jsx)(t.code,{children:"index"})]}),"\n",(0,i.jsxs)(t.li,{children:["Transaction execution result: ",(0,i.jsx)(t.code,{children:"outcomeStatus"})," (",(0,i.jsx)(t.code,{children:"0"})," for success, ",(0,i.jsx)(t.code,{children:"1"})," for failure)"]}),"\n",(0,i.jsxs)(t.li,{children:["Gas & storage fee information: ",(0,i.jsx)(t.code,{children:"gasUsed"}),", ",(0,i.jsx)(t.code,{children:"gasFee"}),", ",(0,i.jsx)(t.code,{children:"storageCollateralized"}),", ",(0,i.jsx)(t.code,{children:"gasCoveredBySponsor"}),", ",(0,i.jsx)(t.code,{children:"storageCoveredBySponsor"}),", ",(0,i.jsx)(t.code,{children:"storageReleased"})]}),"\n",(0,i.jsxs)(t.li,{children:["Deployed contract address: ",(0,i.jsx)(t.code,{children:"contractCreated"})," (if it is a contract deployment transaction)"]}),"\n",(0,i.jsxs)(t.li,{children:["Contract execution logs: ",(0,i.jsx)(t.code,{children:"logs"})]}),"\n",(0,i.jsxs)(t.li,{children:["Execution error information: ",(0,i.jsx)(t.code,{children:"txExecErrorMsg"})," (if the transaction execution fails)"]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["For detailed information about each field, you can refer to the API documentation for ",(0,i.jsx)(t.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt",children:(0,i.jsx)(t.code,{children:"cfx_getTransactionReceipt"})}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"logs",children:"logs"}),"\n",(0,i.jsxs)(t.p,{children:["The logs field in the Receipt is an array containing all the logs generated during the transaction execution process. When interacting with a contract, the contract can produce logs or events using emit statements. After the transaction is executed, these logs are recorded in the transaction receipt. In Solidity, ",(0,i.jsx)(t.a,{href:"https://docs.soliditylang.org/en/v0.8.23/contracts.html#events",children:"Events"})," are designed to log information about the execution of contract methods, providing detailed information about contract execution through events."]}),"\n",(0,i.jsxs)(t.p,{children:["You can retrieve logs using the ",(0,i.jsx)(t.a,{href:"/docs/core/build/json-rpc/cfx-namespace#cfx_getlogs",children:"cfx_getLogs"})," method and decode the log data using the ",(0,i.jsx)(t.a,{href:"https://docs.soliditylang.org/en/v0.8.23/contracts.html#events",children:"abi.decode"})," method. Conflux SDKs also provide methods to help decoding the logs, for example, ",(0,i.jsx)(t.a,{href:"https://docs.confluxnetwork.org/js-conflux-sdk/docs/interact_with_contract#how-to-decode-log",children:"javascript"})," and ",(0,i.jsx)(t.a,{href:"https://python-conflux-sdk.readthedocs.io/en/latest/examples/05-interact_with_contracts_and_process_logs.html#process-logs",children:"python"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"execution-failure",children:"Execution Failure"}),"\n",(0,i.jsxs)(t.p,{children:["Execution failures can be due to errors that occurred during the contract execution process or errors returned when estimating gas cost through the estimate interface. To find the specific reason for the transaction failure, check the ",(0,i.jsx)(t.code,{children:"txExecErrorMsg"})," under the receipt:"]}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"VmError(OutOfGas)"}),": The transaction specified ",(0,i.jsx)(t.code,{children:"gas"})," is used out during transactioin execution."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"VmError(ExceedStorageLimit)"}),": The transaction specified ",(0,i.jsx)(t.code,{children:"storageLimit"}),"(upper-limit storage can be used) is not enough."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"NotEnoughCash"}),": Insufficient user balance to cover transaction cost."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Vm reverted, Reason provided by the contract: xxxx"}),": The contract execution failed with details provided."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"VmError(BadInstruction xxxx)"}),": Contract deployment failed."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Vm reverted, xxxx"}),": The contract execution failed with no details provided."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Solution:"})," Depending on the specific error message, you may need to increase ",(0,i.jsx)(t.code,{children:"gas"}),", increase ",(0,i.jsx)(t.code,{children:"storageLimit"}),", ensure sufficient balance, or debug the contract code to identify and fix the issues causing the failure."]}),"\n",(0,i.jsx)(t.p,{children:"Remember that when handling transaction errors, it's essential to identify the root cause of the error and apply the appropriate solution. In most cases, modifying transaction parameters, waiting for node synchronization, or debugging the contract code can help resolve the issues."}),"\n",(0,i.jsx)(t.h2,{id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",children:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"}),"\n",(0,i.jsx)(t.h3,{id:"what-is-a-transaction-receipt-and-what-information-does-it-contain",children:"What is a transaction receipt, and what information does it contain?"}),"\n",(0,i.jsx)(t.p,{children:"A receipt is the receipt information of a transaction. Through a receipt, you can know some results of the transaction execution, such as whether the transaction is successful, whether a contract is created, gas fee usage, eventLog generated by a transaction execution, etc."}),"\n",(0,i.jsx)(t.h3,{id:"why-cant-i-retrieve-the-receipt-for-a-transaction",children:"Why can't I retrieve the receipt for a transaction?"}),"\n",(0,i.jsxs)(t.p,{children:["The receipt information for a transaction can only be obtained after the transaction has been successfully executed. If the transaction has not been completed, the receipt will be ",(0,i.jsx)(t.code,{children:"null"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"can-the-receipt-information-for-a-transaction-change",children:"Can the receipt information for a transaction change?"}),"\n",(0,i.jsx)(t.p,{children:"The receipt information may change immediately after a transaction is executed and included in a block. However, once the transaction is finalized, the receipt information will not change."}),"\n",(0,i.jsx)(t.h3,{id:"how-do-i-know-that-a-transaction-has-been-successfully-executed",children:"How do I know that a transaction has been successfully executed?"}),"\n",(0,i.jsxs)(t.p,{children:["Check the ",(0,i.jsx)(t.code,{children:"status"})," field of the transaction or the ",(0,i.jsx)(t.code,{children:"outcomeStatus"})," field of the receipt to determine whether the transaction is successful, 0 means success and 1 means failure."]}),"\n",(0,i.jsx)(t.h3,{id:"why-would-a-transaction-execution-fail",children:"Why would a transaction execution fail?"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"/zh-CN/docs/core/core-space-basics/transactions/receipt#execution-failure",children:"Execution Failure"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"how-to-know-whether-a-transaction-is-safe-and-confirmed",children:"How to know whether a transaction is safe and confirmed?"}),"\n",(0,i.jsxs)(t.p,{children:["If the epochNumber of the epoch that the transaction belongs to is less than the currently confirmed epochNumber, it is considered safe.\nYou can also get the confirmationRisk of the block that the transaction belongs to through the ",(0,i.jsx)(t.a,{href:"/docs/core/build/json-rpc/cfx-namespace/#cfx_getconfirmationriskbyhash",children:(0,i.jsx)(t.code,{children:"cfx_getConfirmationRiskByHash"})})," RPC.\nIf the obtained value is less than 1e-8, it is considered safe."]}),"\n",(0,i.jsx)(t.h3,{id:"how-does-the-status-of-the-transaction-change",children:"How does the status of the transaction change?"}),"\n",(0,i.jsx)(t.p,{children:"After the transaction is submitted through RPC, it will go through several states: Waiting for packaging -> packaging -> execution -> confirmation."}),"\n",(0,i.jsx)(t.h3,{id:"why-does-a-transaction-keep-on-waiting-to-be-packaged",children:"Why does a transaction keep on waiting to be packaged?"}),"\n",(0,i.jsx)(t.p,{children:"If a transaction has not been packaged for a long time, it\u2019s likely that either the nonce is set incorrectly or the balance is not sufficient."})]})}function l(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>c});var i=n(67294);const o={},a=i.createContext(o);function c(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);