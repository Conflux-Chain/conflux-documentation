"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3859],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),l=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,m=p["".concat(i,".").concat(f)]||p[f]||d[f]||r;return n?a.createElement(m,c(c({ref:t},u),{},{components:n})):a.createElement(m,c({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,c=new Array(r);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:o,c[1]=s;for(var l=2;l<r;l++)c[l]=n[l];return a.createElement.apply(null,c)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},50684:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var a=n(87462),o=(n(67294),n(3905));const r={sidebar_position:3,title:"Developer Quickstart",displayed_sidebar:"coreSidebar",description:"This tutorial will show you how to send a transaction using the js-conflux-sdk."},c=void 0,s={unversionedId:"core/core-developer-quickstart",id:"core/core-developer-quickstart",title:"Developer Quickstart",description:"This tutorial will show you how to send a transaction using the js-conflux-sdk.",source:"@site/docs/core/core-developer-quickstart.md",sourceDirName:"core",slug:"/core/core-developer-quickstart",permalink:"/es/docs/core/core-developer-quickstart",draft:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Developer Quickstart",displayed_sidebar:"coreSidebar",description:"This tutorial will show you how to send a transaction using the js-conflux-sdk."},sidebar:"coreSidebar",previous:{title:"What to Do Next?",permalink:"/es/docs/core/getting-started/what-to-do-next"},next:{title:"Core Space Basics",permalink:"/es/docs/category/core-space-basics"}},i={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"How to use?",id:"how-to-use",level:2},{value:"Import And Create Conflux Instance",id:"import-and-create-conflux-instance",level:3},{value:"Add Private Key",id:"add-private-key",level:3},{value:"Conflux Address",id:"conflux-address",level:3},{value:"Query Account Balance",id:"query-account-balance",level:3},{value:"Send transaction",id:"send-transaction",level:3},{value:"Common Errors",id:"common-errors",level:2},{value:"Balance not enough",id:"balance-not-enough",level:3},{value:"Resources",id:"resources",level:2}],u={toc:l},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"To send a transaction on Conflux Core Space, you need to use it's own SDKs. This tutorial will show you how to send a transaction using the js-conflux-sdk."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Ethereum SDKs (ethers.js, web3.js, web3,py, web3j) are not compatible with Conflux Core Space. You need to use Conflux Core Space SDKs.")),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/conflux-chain/js-conflux-sdk"},(0,o.kt)("strong",{parentName:"a"},"js-conflux-sdk"))," is a JavaScript SDK for Conflux Core Space. It is a collection of libraries that allow you to interact with a local or remote Conflux node using HTTP, WebSocket. You can use it to send transactions, deploy and interact with smart contracts, and so on."),(0,o.kt)("p",null,"It is the equivalent of web3.js of Ethereum for Conflux Core Space. But APIs are different. "),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Node.js environment to install and use the SDK."),(0,o.kt)("li",{parentName:"ol"},"A Conflux node to connect to. You can use the public testnet rpc endpoint ",(0,o.kt)("inlineCode",{parentName:"li"},"https://test.confluxrpc.com"),"."),(0,o.kt)("li",{parentName:"ol"},"An account private key to sign the transaction. The account should have some testnet CFX to pay for the transaction value and fee. You can get some testnet CFX from ",(0,o.kt)("a",{parentName:"li",href:"https://faucet.confluxnetwork.org/"},"Conflux Core Faucet"),".")),(0,o.kt)("p",null,"Note: The private key can be exported from Fluent Wallet settings page. Do not use your mainnet private key on testnet."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("p",null,"To use it, the Node.js environment is required. You can install it via npm:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"npm install js-conflux-sdk \n")),(0,o.kt)("h2",{id:"how-to-use"},"How to use?"),(0,o.kt)("h3",{id:"import-and-create-conflux-instance"},"Import And Create Conflux Instance"),(0,o.kt)("p",null,"Import class ",(0,o.kt)("inlineCode",{parentName:"p"},"Conflux")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"js-conflux-sdk")," and set a Conflux provider. For the Conflux Core Testnet, you can directly use the public RPC endpoint ",(0,o.kt)("inlineCode",{parentName:"p"},"https://test.confluxrpc.com"),". It can also be changed to any other Conflux node, even your own."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const { Conflux } = require('js-conflux-sdk');\n\nconst cfxClient = new Conflux({\n  url: 'https://test.confluxrpc.com',\n  networkId: 1,\n  //   logger: console, // for debug\n});\n")),(0,o.kt)("h3",{id:"add-private-key"},"Add Private Key"),(0,o.kt)("p",null,"Before sending a transaction, you need to add your private key to the Conflux instance. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const PRIVATE_KEY = 'Your Private Key';\n// const PRIVATE_KEY = '0x5f15f9e52fc5ec6f77115a9f306c120a7e80d83115212d33a843bb6b7989c261';\nconst account = cfxClient.wallet.addPrivateKey(PRIVATE_KEY); // create account instance\nconsole.log(\"Account address: \", account.address);\n")),(0,o.kt)("h3",{id:"conflux-address"},"Conflux Address"),(0,o.kt)("p",null,"The address of Conflux Core Space is different from Ethereum. It is a base32 encoded string introduced by ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md"},"CIP-37"),"."),(0,o.kt)("p",null,"Different network's address prefix is different. For example, the address prefix of Conflux Core Testnet is ",(0,o.kt)("inlineCode",{parentName:"p"},"cfxtest")," and mainnet is ",(0,o.kt)("inlineCode",{parentName:"p"},"cfx"),"."),(0,o.kt)("p",null,"For example: "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Mainnet Address: ",(0,o.kt)("inlineCode",{parentName:"li"},"cfx:aamjy3abae3j0ud8ys0npt38ggnunk5r4ps2pg8vcc")),(0,o.kt)("li",{parentName:"ul"},"Testnet Address: ",(0,o.kt)("inlineCode",{parentName:"li"},"cfxtest:aamjy3abae3j0ud8ys0npt38ggnunk5r4pex9025gj"))),(0,o.kt)("p",null,"You can learn more about Conflux Core address ",(0,o.kt)("a",{parentName:"p",href:"/es/docs/core/core-space-basics/addresses"},"here"),"."),(0,o.kt)("h3",{id:"query-account-balance"},"Query Account Balance"),(0,o.kt)("p",null,"You can query the account balance by using ",(0,o.kt)("inlineCode",{parentName:"p"},"cfxClient.cfx.getBalance"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// Drip is the smallest unit of CFX, can use it to convert to CFX\nconst { Drip } = require('js-conflux-sdk');\n\nasync function main() {\n  const balance = await conflux.cfx.getBalance(account.address);\n  console.log(`Balance of ${account.address} is ${new Drip(balance).toCFX()} CFX`);\n}\n\nmain().catch(e => console.error(e));\n")),(0,o.kt)("p",null,"There are a lot of other APIs under ",(0,o.kt)("inlineCode",{parentName:"p"},"cfx")," namespace to query the blockchain data. You can find them in the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md#conflux"},"SDK API Reference")," and Conflux ",(0,o.kt)("a",{parentName:"p",href:"./build/json-rpc/"},"Core RPC API Reference"),"."),(0,o.kt)("h3",{id:"send-transaction"},"Send transaction"),(0,o.kt)("p",null,"After adding the private key, you can send a transaction by using ",(0,o.kt)("inlineCode",{parentName:"p"},"cfxClient.cfx.sendTransaction"),". The steps are as follows:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Compose the transaction parameters.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';\nlet txParams = {\n  from: account, // from account instance and will by sign by account.privateKey\n  to: receiver, // accept address string or account instance\n  value: Drip.fromCFX(0.125), // use the conversion utility function\n};\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"The detailed explanation of each field can be found ",(0,o.kt)("a",{parentName:"p",href:"/es/docs/core/core-space-basics/transaction_explain"},"here"))),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Send the composed transaction via ",(0,o.kt)("inlineCode",{parentName:"li"},"cfxClient.cfx.sendTransaction")," and get the returned transaction hash. Then you can view the transaction details by using ",(0,o.kt)("inlineCode",{parentName:"li"},"tx.mined()")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"tx.executed()"),", which APIs will return the transaction data or transaction receipt when transaction is mined or executed. Noting these 2 APIs are a simple wrapping layer for ",(0,o.kt)("inlineCode",{parentName:"li"},"cfxClient.cfx.getTransactionByHash")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"cfxClient.cfx.getTransactionReceipt"),". You can also search the sent transaction at ",(0,o.kt)("a",{parentName:"li",href:"https://confluxscan.io/"},"Conflux Scan")," using transaction hash.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"async function main() {\n  const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';\n  let txParams = {\n    from: account, // from account instance and will by sign by account.privateKey\n    to: receiver, // accept address string or account instance\n    value: Drip.fromCFX(0.125), // use the conversion utility function\n  };\n  const txHash = await conflux.cfx.sendTransaction(txParams);\n  console.log('Transaction hash: ', txHash);\n\n  // It need a couple of seconds to mine the transaction\n  const txData = await txHash.mined()\n  console.log('Transaction info: ', txData)\n\n  // Normally tt need less 20 seconds to execute the transaction\n  const txReceipt = await txHash.executed()\n  console.log('Transaction receipt', txReceipt)\n}\n\nmain().catch(e => console.error(e));\n")),(0,o.kt)("h2",{id:"common-errors"},"Common Errors"),(0,o.kt)("h3",{id:"balance-not-enough"},"Balance not enough"),(0,o.kt)("p",null,"If your account does not have enough balance, you will encounter the following error: ",(0,o.kt)("inlineCode",{parentName:"p"},"Insufficient balance")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Balance is not enough to pay transaction")),(0,o.kt)("h2",{id:"resources"},"Resources"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Check ",(0,o.kt)("a",{parentName:"li",href:"https://docs.confluxnetwork.org/js-conflux-sdk/"},"js-conflux-sdk's documentation")," for more details"),(0,o.kt)("li",{parentName:"ol"},"Refer to ",(0,o.kt)("a",{parentName:"li",href:"./build/sdks-and-tools/sdks.md"},"SDKs")," for examples of other SDKs."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://faucet.confluxnetwork.org/"},"Core Space Faucet")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://confluxscan.io/"},"Conflux Core Scan"))))}d.isMDXComponent=!0}}]);