"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2489],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),h=l(n),u=r,g=h["".concat(c,".").concat(u)]||h[u]||p[u]||o;return n?a.createElement(g,i(i({ref:t},d),{},{components:n})):a.createElement(g,i({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[h]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9947:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_position:2,title:"Why Transaction is Pending?",keywords:["transaction"],displayed_sidebar:"generalSidebar"},i=void 0,s={unversionedId:"general/faq/core-space-transactions/why-transaction-is-pending",id:"general/faq/core-space-transactions/why-transaction-is-pending",title:"Why Transaction is Pending?",description:"Because today\u2019s blockchain systems may have problems such as low throughput and high entry barriers, it is inevitable that some transactions will not be packaged when sent through the blockchain. Take Conflux as an example, the Conflux network normally produces two blocks per second. After a transaction is successfully sent, it should be packaged and executed within 20 seconds depending on the network congestion level. If the transaction is not packaged for a long time, it\u2019s very likely that something went wrong, and requires the sender to manually intervene.",source:"@site/docs/general/faq/core-space-transactions/why-transaction-is-pending.md",sourceDirName:"general/faq/core-space-transactions",slug:"/general/faq/core-space-transactions/why-transaction-is-pending",permalink:"/docs/general/faq/core-space-transactions/why-transaction-is-pending",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/faq/core-space-transactions/why-transaction-is-pending.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Why Transaction is Pending?",keywords:["transaction"],displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"FAQs of Core Space Transactions",permalink:"/docs/general/faq/core-space-transactions/core-transaction-faqs"},next:{title:"Common RPC errors",permalink:"/docs/general/faq/Errors/common_rpc_error"}},c={},l=[{value:"How to find out the reason for a pending transaction",id:"how-to-find-out-the-reason-for-a-pending-transaction",level:2},{value:"Wrong Nonce",id:"wrong-nonce",level:3},{value:"Stale Epoch Height",id:"stale-epoch-height",level:3},{value:"Internal Error",id:"internal-error",level:3},{value:"Ready to Pack",id:"ready-to-pack",level:3},{value:"How to set gasPrice correctly",id:"how-to-set-gasprice-correctly",level:2}],d={toc:l},h="wrapper";function p(e){let{components:t,...o}=e;return(0,r.kt)(h,(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Because today\u2019s blockchain systems may have problems such as low throughput and high entry barriers, it is inevitable that some transactions will not be packaged when sent through the blockchain. Take Conflux as an example, the Conflux network normally produces two blocks per second. After a transaction ",(0,r.kt)("inlineCode",{parentName:"p"},"is successfully sent"),", it should be packaged and executed within ",(0,r.kt)("inlineCode",{parentName:"p"},"20 seconds")," depending on the network congestion level. If the transaction is not packaged for a long time, it\u2019s very likely that something went wrong, and requires the sender to manually intervene."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Tx Pending",src:n(92834).Z,width:"350",height:"402"})),(0,r.kt)("h2",{id:"how-to-find-out-the-reason-for-a-pending-transaction"},"How to find out the reason for a pending transaction"),(0,r.kt)("p",null,"If the pending transaction is successfully inserted into the transaction pool of the node used by ",(0,r.kt)("a",{parentName:"p",href:"https://www.confluxscan.io/"},"Scan"),", the transaction can be searched by hash on Scan, and the status of the transaction can be seen as ",(0,r.kt)("inlineCode",{parentName:"p"},"Pending")," on the transaction details page. "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Tx Pending",src:n(86477).Z,width:"2786",height:"1408"})),(0,r.kt)("p",null," At this time, we can go to the ",(0,r.kt)("inlineCode",{parentName:"p"},"account details page")," of the transaction sender, and view the pending transactions of the user through the ",(0,r.kt)("inlineCode",{parentName:"p"},"View Pending Txns")," tab on the account page."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Tx Pending",src:n(42893).Z,width:"2812",height:"1468"}),"/"),(0,r.kt)("p",null,"In this tab, you can see the total number of pending transactions of this user and the earliest pending transactions (up to 10). The most important thing is that you can also see the pending reasons for the first pending transaction. There are three possible reasons:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Wrong nonce"),(0,r.kt)("li",{parentName:"ul"},"Stale epoch height"),(0,r.kt)("li",{parentName:"ul"},"Internal error"),(0,r.kt)("li",{parentName:"ul"},"Ready to pack")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Tx Pending",src:n(14607).Z,width:"2826",height:"1286"})),(0,r.kt)("p",null,"This page uses the RPC method ",(0,r.kt)("a",{parentName:"p",href:"/docs/core/build/json-rpc/cfx-namespace#cfx_getaccountpendingtransactions"},(0,r.kt)("inlineCode",{parentName:"a"},"cfx_getAccountPendingTransactions"))," to obtain the current pending transaction information of an account."),(0,r.kt)("h3",{id:"wrong-nonce"},"Wrong Nonce"),(0,r.kt)("p",null,"This kind of error means that the sent transaction used the wrong nonce. Normally, the transaction needs to be executed one by one in the order of nonce. If there are transactions with a smaller nonce pending in the queue, this transaction will wait until all previous transactions are successfully executed."),(0,r.kt)("p",null,"In this case, we need to resend the transaction with the correct nonce. It should be noted that the pending transaction will be automatically executed after all previous transactions are executed (and the balance is sufficient)."),(0,r.kt)("h3",{id:"stale-epoch-height"},"Stale Epoch Height"),(0,r.kt)("p",null,"The error message tells that ",(0,r.kt)("inlineCode",{parentName:"p"},"The epoch height of the first tx is too old to be packed. The sender needs to submit a new transaction to update the tx pool."),". Update the corresponding transaction with a correct ",(0,r.kt)("inlineCode",{parentName:"p"},"epochHeight")," parameter(e.g. use ",(0,r.kt)("inlineCode",{parentName:"p"},"cfx_epochNumber"),") will solve the issue."),(0,r.kt)("h3",{id:"internal-error"},"Internal Error"),(0,r.kt)("p",null,"The error message tells that ",(0,r.kt)("inlineCode",{parentName:"p"},"The full node internal error. The sender needs to submit a new transaction to update the tx pool."),". This is typically triggered by certain complex balance setting. Make sure your account has enough balance, then submit a new transaction will solve the issue."),(0,r.kt)("h3",{id:"ready-to-pack"},"Ready to Pack"),(0,r.kt)("p",null,"This situation means that the transaction itself has reached the conditions that can be packaged, but because the entire network is relatively congested or for other reasons, it has not been packaged."),(0,r.kt)("p",null,"If the transaction is in this state for a long time, the gasPrice of the transaction can be increased appropriately to resend the transaction, which can improve the speed to package and execute a transaction."),(0,r.kt)("h2",{id:"how-to-set-gasprice-correctly"},"How to set gasPrice correctly"),(0,r.kt)("p",null,"The speed to package and execute a transaction is mainly affected by the gasPrice of the transaction. The higher the gasPrice, the faster it is packaged by miners, so it is very important to set the gasPrice correctly."),(0,r.kt)("p",null,"You can use the ",(0,r.kt)("inlineCode",{parentName:"p"},"cfx_gasPrice")," RPC method of fullnode to get a suggested gasPrice value. This method will give a recommended value based on the gas usage of a certain number of the latest blocks and the gasPrice of the transactions in it."))}p.isMDXComponent=!0},86477:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/scan-pending-detail-02-2e688fd1d0d2ab438274b226aefc545b.png"},42893:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/scan-pending-entry-03-e49e27948df9341d61ad8a37d684b048.png"},14607:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/scan-pending-tx-list-04-44522efa4034f309163b830b27a9e345.png"},92834:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/tx-pending-01-b1f2e9964d8aa9c0d65c697a7db0f236.png"}}]);