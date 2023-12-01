"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3747],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),f=r,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||o;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},82663:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_position:1,title:"CIP-90",displayed_sidebar:"eSpaceSidebar"},i=void 0,s={unversionedId:"espace/build/cip90",id:"espace/build/cip90",title:"CIP-90",description:"Conflux has a virtual machine that is similar to the EVM. However, there are still some considerable differences between Conflux and Ethereum. Conflux uses a different transaction format and a different rule for generating addresses from public keys. These differences often make it hard to port EVM compatible dApps to Conflux. Replacing CIP-72 and CIP-80, CIP-90 introduces a transaction execution environment called the Conflux eSpace. eSpace achieves full EVM compatibility without changing the existing accounts and transactions.",source:"@site/docs/espace/build/cip90.md",sourceDirName:"espace/build",slug:"/espace/build/cip90",permalink:"/docs/espace/build/cip90",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/espace/build/cip90.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"CIP-90",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"Advanced",permalink:"/docs/category/advanced"},next:{title:"EVM Compatibility",permalink:"/docs/espace/build/evm-compatibility"}},c={},l=[],p={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Conflux has a virtual machine that is similar to the EVM. However, there are still some considerable differences between Conflux and Ethereum. Conflux uses a different transaction format and a different rule for generating addresses from public keys. These differences often make it hard to port EVM compatible dApps to Conflux. Replacing CIP-72 and CIP-80, ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md"},"CIP-90")," introduces a transaction execution environment called the ",(0,r.kt)("strong",{parentName:"p"},"Conflux eSpace"),". eSpace achieves full EVM compatibility without changing the existing accounts and transactions."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md"},"CIP-90")," introduces a new fully EVM-compatible space. The new space is called ",(0,r.kt)("strong",{parentName:"p"},"Conflux eSpace"),", while the current space is called ",(0,r.kt)("strong",{parentName:"p"},"Conflux Core")," space. Conflux eSpace follows the same rule as Ethereum's EVM and supports RPCs like ",(0,r.kt)("inlineCode",{parentName:"p"},"eth_getBalance"),". As a result, existing tooling from the Ethereum ecosystem (MetaMask, Truffle, Remix, Hardhat, web3.js, ethers.js) can be used on Conflux eSpace directly."),(0,r.kt)("p",null,"Accounts in Conflux Core and Conflux eSpace are ",(0,r.kt)("strong",{parentName:"p"},"separated"),". This means that Conflux transactions can only be sent between core space accounts (using their ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md"},"CIP-37")," base32 addresses), while Ethereum-compatible EIP-155 transactions can only be sent between eSpace accounts (using their ",(0,r.kt)("a",{parentName:"p",href:"https://eips.ethereum.org/EIPS/eip-55"},"EIP-55")," hex addresses). Assets and data can be transferred across the two spaces using the new ",(0,r.kt)("inlineCode",{parentName:"p"},"CrossSpaceCall")," internal contract. Unlike cross-chain operations, ",(0,r.kt)("strong",{parentName:"p"},"cross-space")," operations are ",(0,r.kt)("strong",{parentName:"p"},"atomic")," and they have ",(0,r.kt)("strong",{parentName:"p"},"layer-1 security"),"."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Refer to ",(0,r.kt)("a",{parentName:"p",href:"../../general/tutorials/"},"tutorials")," for cross chain and wallet usage tutorials.")))}d.isMDXComponent=!0}}]);