"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[7126],{4137:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),i=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=i(r),f=o,h=d["".concat(p,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(h,s(s({ref:t},l),{},{components:r})):n.createElement(h,s({ref:t},l))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[d]="string"==typeof e?e:o,s[1]=c;for(var i=2;i<a;i++)s[i]=r[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9171:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>i});var n=r(7462),o=(r(7294),r(4137));const a={sidebar_position:15,title:"FAQs",description:"Frequently asked questions about Conflux eSpace"},s=void 0,c={unversionedId:"espace/FAQs",id:"espace/FAQs",title:"FAQs",description:"Frequently asked questions about Conflux eSpace",source:"@site/docs/espace/FAQs.md",sourceDirName:"espace",slug:"/espace/FAQs",permalink:"/zh-CN/docs/espace/FAQs",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15,title:"FAQs",description:"Frequently asked questions about Conflux eSpace"},sidebar:"tutorialSidebar",previous:{title:"Deployed Contracts",permalink:"/zh-CN/docs/espace/build/deployed-contracts"}},p={},i=[{value:"How to run eSpace node?",id:"how-to-run-espace-node",level:2},{value:"Use which SDK(js-conflux-sdk or ethers.js) to develop eSpace DApp?",id:"use-which-sdkjs-conflux-sdk-or-ethersjs-to-develop-espace-dapp",level:2},{value:"How to bridge CFX between eSpace and Core Space?",id:"how-to-bridge-cfx-between-espace-and-core-space",level:2},{value:"Can I use base32 address in eSpace?",id:"can-i-use-base32-address-in-espace",level:2},{value:"What is the eSpace TPS ?",id:"what-is-the-espace-tps-",level:2}],l={toc:i},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"how-to-run-espace-node"},"How to run eSpace node?"),(0,o.kt)("p",null,"eSpace and Core Space share a common node program, so please refer to the ",(0,o.kt)("a",{parentName:"p",href:"/docs/category/run-a-node"},"Core Space Node Operation Guide"),". The eSpace default RPC port is 8545, is not same with Core Space RPC port."),(0,o.kt)("h2",{id:"use-which-sdkjs-conflux-sdk-or-ethersjs-to-develop-espace-dapp"},"Use which SDK(js-conflux-sdk or ethers.js) to develop eSpace DApp?"),(0,o.kt)("p",null,"eSpace is compatible with Ethereum, you can use the same SDK as Ethereum. So ethers.js, web3.js, ",(0,o.kt)("a",{parentName:"p",href:"https://viem.sh/"},"viem"),", web3py, web3j and other SDKs can be used to develop eSpace DApp."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"js-conflux-sdk")," is only used to develop DApp for Conflux Core, and it is not compatible with Ethereum or eSpace."),(0,o.kt)("h2",{id:"how-to-bridge-cfx-between-espace-and-core-space"},"How to bridge CFX between eSpace and Core Space?"),(0,o.kt)("p",null,"You can use ",(0,o.kt)("a",{parentName:"p",href:"https://confluxhub.io/espace-bridge/cross-space"},"Confluxhub Space Bridge")," to bridge CFX between eSpace and Core Space."),(0,o.kt)("h2",{id:"can-i-use-base32-address-in-espace"},"Can I use base32 address in eSpace?"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../core/learn/core-space-basics/addresses.md"},"Base32 address")," is only used in core space, and eSpace is not supported. You can use the hex address in eSpace."),(0,o.kt)("h2",{id:"what-is-the-espace-tps-"},"What is the eSpace TPS ?"),(0,o.kt)("p",null,"It's about 300 TPS."))}u.isMDXComponent=!0}}]);