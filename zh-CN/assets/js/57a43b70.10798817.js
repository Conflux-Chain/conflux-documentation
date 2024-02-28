"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9334],{84482:(t,e,o)=>{o.r(e),o.d(e,{assets:()=>i,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=o(85893),r=o(11151);const a={sidebar_position:2,title:"\u667a\u80fd\u5408\u7ea6",displayed_sidebar:"coreSidebar"},c=void 0,s={id:"core/build/smart-contracts",title:"\u667a\u80fd\u5408\u7ea6",description:'A "smart contract" is simply a program that runs on the Conflux Core blockchain. It\'s a collection of code (its functions) and data (its state) that resides at a specific address on the Conflux Core blockchain. To learn more about smart contracts, see our Introduction to Smart Contracts.',source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/core/build/smart-contracts.md",sourceDirName:"core/build",slug:"/core/build/smart-contracts",permalink:"/zh-CN/docs/core/build/smart-contracts",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"\u667a\u80fd\u5408\u7ea6",displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"Intro to the Stack",permalink:"/zh-CN/docs/core/build/intro-the-stack"},next:{title:"SDKs and Tools",permalink:"/zh-CN/docs/category/sdks-and-tools"}},i={},l=[{value:"Smart contract in Conflux Core",id:"smart-contract-in-conflux-core",level:2},{value:"Compare to Ethereum Smart Contract",id:"compare-to-ethereum-smart-contract",level:2},{value:"Core Space contract dev tools",id:"smart-contract-development-tools",level:2},{value:"Scan contract read write tool",id:"scan-contract-read-write-tool",level:3}];function d(t){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:['A "smart contract" is simply a program that runs on the Conflux Core blockchain. It\'s a collection of code (its functions) and data (its state) that resides at a specific address on the Conflux Core blockchain. To learn more about smart contracts, see our ',(0,n.jsx)(e.a,{href:"/docs/general/conflux-basics/contracts",children:"Introduction to Smart Contracts"}),"."]}),"\n",(0,n.jsx)(e.h2,{id:"smart-contract-in-conflux-core",children:"Smart contract in Conflux Core"}),"\n",(0,n.jsxs)(e.p,{children:["Conflux Core has a built-in virtual machine (VM) that can execute smart contracts. The VM is almost entirely compatible with the Ethereum Virtual Machine (EVM), meaning that the majority of Ethereum smart contracts can be deployed and run directly on Conflux Core. Conflux Core smart contracts are also written in the ",(0,n.jsx)(e.strong,{children:"Solidity language"}),", and mainstream Solidity libraries can be used directly for developing Conflux Core smart contracts."]}),"\n",(0,n.jsxs)(e.p,{children:["To learn more about Solidity language see our ",(0,n.jsx)(e.a,{href:"/docs/general/build/smart-contracts/solidity-basics",children:"Intro to Solidity"})," and it's ",(0,n.jsx)(e.a,{href:"https://docs.soliditylang.org/en/",children:"official documentation"}),"."]}),"\n",(0,n.jsx)(e.h2,{id:"compare-to-ethereum-smart-contract",children:"Compare to Ethereum Smart Contract"}),"\n",(0,n.jsx)(e.p,{children:"Conflux's VM is almost entirely compatible with EVM, meaning that the majority of Ethereum smart contracts can be deployed and run directly on Conflux Core. Conflux Core smart contracts are also written in the Solidity language, and mainstream Solidity libraries can be used directly for developing Conflux Core smart contracts."}),"\n",(0,n.jsx)(e.p,{children:"However, there are two points to note for Ethereum smart contract developers:"}),"\n",(0,n.jsxs)(e.ol,{children:["\n",(0,n.jsx)(e.li,{children:"The calculation rules for Conflux Core contract addresses are different from Ethereum. If there are any instances of address calculations in Solidity code or interaction logic, it is important to check whether modifications are needed."}),"\n",(0,n.jsxs)(e.li,{children:["The 1820 contract address in Conflux Core is different from Ethereum. The Ethereum 1820 contract address is ",(0,n.jsx)(e.code,{children:"0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24"}),", while the Conflux Core 1820 contract address is ",(0,n.jsx)(e.code,{children:"0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(e.p,{children:["Check ",(0,n.jsx)(e.a,{href:"/zh-CN/docs/core/core-space-basics/vm-difference",children:"Differences between Conflux VM and EVM"})," for more details."]}),"\n",(0,n.jsxs)(e.p,{children:["We also provide a Solidity library called ",(0,n.jsx)(e.a,{href:"https://github.com/conflux-fans/conflux-contracts",children:"conflux-contracts"})," which include source code of Conflux's Internal Contracts and address utilities."]}),"\n",(0,n.jsx)(e.h2,{id:"smart-contract-development-tools",children:"Core Space contract dev tools"}),"\n",(0,n.jsx)(e.p,{children:"It's recommended to use the following tools for smart contract development:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["Hardhat + ",(0,n.jsx)(e.a,{href:"https://github.com/conflux-chain/hardhat-conflux",children:"Conflux Network plugin"})," - A popular Ethereum development environment for smart contracts"]}),"\n",(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.a,{href:"https://chainide.com/",children:"ChainIDE"})," - A Remix like web-based IDE for smart contract development"]}),"\n"]}),"\n",(0,n.jsx)(e.h3,{id:"scan-contract-read-write-tool",children:"Scan contract read write tool"}),"\n",(0,n.jsx)(e.p,{children:"Conflux Scan provides a tool to read and write smart contracts. You can use it to interact with smart contracts on the Conflux network."}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{src:o(22811).Z+"",width:"1402",height:"802"})}),"\n",(0,n.jsx)(e.p,{children:"Any contract on the Conflux network that has been verified on Conflux Scan can be interacted with using this tool. You can read the contract's state, call its methods, and send transactions to it."})]})}function h(t={}){const{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(d,{...t})}):d(t)}},22811:(t,e,o)=>{o.d(e,{Z:()=>n});const n=o.p+"assets/images/sponsor-read-methods-0f6c4e56b2af7970a51a637fe19b8e52.png"},11151:(t,e,o)=>{o.d(e,{Z:()=>s,a:()=>c});var n=o(67294);const r={},a=n.createContext(r);function c(t){const e=n.useContext(a);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function s(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:c(t.components),n.createElement(a.Provider,{value:e},t.children)}}}]);