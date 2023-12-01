"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[1251],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),d=o,k=u["".concat(s,".").concat(d)]||u[d]||m[d]||r;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},96e3:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(87462),o=(n(67294),n(3905));const r={sidebar_position:2,title:"User Guide",description:"How to connect metamask to eSpace",keywords:["MetaMask","EVMSpace"],displayed_sidebar:"eSpaceSidebar"},i=void 0,l={unversionedId:"espace/UserGuide",id:"espace/UserGuide",title:"User Guide",description:"How to connect metamask to eSpace",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/espace/UserGuide.md",sourceDirName:"espace",slug:"/espace/UserGuide",permalink:"/es/docs/espace/UserGuide",draft:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"User Guide",description:"How to connect metamask to eSpace",keywords:["MetaMask","EVMSpace"],displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"Overview",permalink:"/es/docs/espace/Overview"},next:{title:"Developer Quickstart",permalink:"/es/docs/espace/DeveloperQuickstart"}},s={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Connecting MetaMask to Conflux eSpace",id:"connecting-metamask-to-conflux-espace",level:2},{value:"Add eSpace through Chainlist",id:"add-espace-through-chainlist",level:3},{value:"Add eSpace manually",id:"add-espace-manually",level:3},{value:"Faucet",id:"faucet",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"This guide will help user connect their metamask  wallet to Conflux eSpace.")),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://metamask.io/"},"MetaMask")," is a convenient UI for interacting with Ethereum-compatible blockchains (such as Conflux eSpace). For the purpose of this guide, we will assume you are already familiar with MetaMask and have it installed. If you need help getting started with MetaMask itself, ",(0,o.kt)("a",{parentName:"p",href:"https://metamask.io/faqs.html"},"check out Metamask documentation")," and ",(0,o.kt)("a",{parentName:"p",href:"https://ethereum.org/en/"},"Ethereum documentation"),"."),(0,o.kt)("p",null,"In this tutorial we will walk through connecting MetaMask to the Conflux eSpace Testnet."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Screenshots in this tutorial are taken from the MetaMask browser extension version 10.8.1.")),(0,o.kt)("h2",{id:"connecting-metamask-to-conflux-espace"},"Connecting MetaMask to Conflux eSpace"),(0,o.kt)("h3",{id:"add-espace-through-chainlist"},"Add eSpace through Chainlist"),(0,o.kt)("p",null,"You can add the Conflux eSpace network to your MetaMask wallet by following these steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Open your browser and navigate to ",(0,o.kt)("a",{parentName:"li",href:"https://chainlist.org"},"https://chainlist.org"),"."),(0,o.kt)("li",{parentName:"ol"},'Search for "Conflux eSpace".'),(0,o.kt)("li",{parentName:"ol"},'Click "Connect Wallet" under "Conflux eSpace" to allow this site to send requests to Metamask.'),(0,o.kt)("li",{parentName:"ol"},'Click "Add to Metamask" under "Conflux eSpace".'),(0,o.kt)("li",{parentName:"ol"},'When MetaMask prompts "Allow this site to add a network?", click "Approve".'),(0,o.kt)("li",{parentName:"ol"},'When MetaMask prompts "Allow this site to switch the network?", click "Approve".')),(0,o.kt)("p",null,"Your MetaMask wallet is now connected to Conflux eSpace. You can switch to other networks anytime through the network selection dropdown menu in MetaMask."),(0,o.kt)("h3",{id:"add-espace-manually"},"Add eSpace manually"),(0,o.kt)("p",null,'Alternatively, you can add Conflux eSpace to MetaMask manually by selecting "Add Network" (or "Custom RPC") in the network selection drop-down menu:'),(0,o.kt)("p",null," ",(0,o.kt)("img",{alt:"MetaMask-network-select",src:n(76619).Z,width:"1343",height:"589"})),(0,o.kt)("p",null,"For the eSpace ",(0,o.kt)("strong",{parentName:"p"},"mainnet"),", please use the following configuration values:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Network Name"),": Conflux eSpace"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"New RPC URL"),": ",(0,o.kt)("a",{parentName:"li",href:"https://evm.confluxrpc.com"},"https://evm.confluxrpc.com")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Chain ID"),": 1030"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Currency Symbol"),": CFX"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Block Explorer URL"),": ",(0,o.kt)("a",{parentName:"li",href:"https://evm.confluxscan.io"},"https://evm.confluxscan.io"))),(0,o.kt)("p",null,"For the eSpace ",(0,o.kt)("strong",{parentName:"p"},"testnet"),", please use the following configuration values:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Network Name"),": Conflux eSpace (Testnet)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"New RPC URL"),": ",(0,o.kt)("a",{parentName:"li",href:"https://evmtestnet.confluxrpc.com"},"https://evmtestnet.confluxrpc.com")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Chain ID"),": 71"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Currency Symbol"),": CFX"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Block Explorer URL"),": ",(0,o.kt)("a",{parentName:"li",href:"https://evmtestnet.confluxscan.io"},"https://evmtestnet.confluxscan.io"))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"MetaMask-create-EVM-Space-rpc",src:n(4079).Z,width:"1934",height:"1294"})),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"All the Conflux eSpace RPC endpoint URLs and chain IDs can be found on our Networks page.")),(0,o.kt)("p",null,"Click ",(0,o.kt)("inlineCode",{parentName:"p"},"Save"),", and you should see ",(0,o.kt)("inlineCode",{parentName:"p"},"Conflux eSpace")," is now the network selected in MetaMask. To see MetaMask in action, we will connect it to Remix and perform some transactions. The rest of this guide will assume your MetaMask is connected to ",(0,o.kt)("inlineCode",{parentName:"p"},"Conflux eSpace (Testnet)"),"."),(0,o.kt)("h2",{id:"faucet"},"Faucet"),(0,o.kt)("p",null,"To interact with our testnet, you first need to receive testnet CFX on eSpace Testnet. You can get testnet CFX from our ",(0,o.kt)("a",{parentName:"p",href:"https://efaucet.confluxnetwork.org/"},"faucet"),". Paste your wallet address in the address input box solve the puzzle and click ",(0,o.kt)("inlineCode",{parentName:"p"},"Claim")," to receive testnet CFX."))}m.isMDXComponent=!0},4079:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/metamask_add_network-ce-cec2c8b22ca4e27c6b253415ff8f2244.png"},76619:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/metamask_choose_network-0-0d3034f88dcd7bc92f61df7d1be9bb7c.png"}}]);