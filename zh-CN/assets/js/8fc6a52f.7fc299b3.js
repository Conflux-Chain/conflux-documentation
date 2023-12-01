"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6751],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>f});var a=o(67294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function n(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,a,r=function(e,t){if(null==e)return{};var o,a,r={},n=Object.keys(e);for(a=0;a<n.length;a++)o=n[a],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)o=n[a],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var o=e.components,r=e.mdxType,n=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),h=c(o),u=r,f=h["".concat(l,".").concat(u)]||h[u]||d[u]||n;return o?a.createElement(f,s(s({ref:t},p),{},{components:o})):a.createElement(f,s({ref:t},p))}));function f(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=o.length,s=new Array(n);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[h]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<n;c++)s[c]=o[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,o)}u.displayName="MDXCreateElement"},33867:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var a=o(87462),r=(o(67294),o(3905));const n={sidebar_position:2,title:"Storage Collateral",keywords:["storage"],displayed_sidebar:"coreSidebar"},s=void 0,i={unversionedId:"core/core-space-basics/storage",id:"core/core-space-basics/storage",title:"Storage Collateral",description:"Conflux Core introduced the Collateral for Storage (CFS) mechanism as a pricing method for using storage. Compared to Ethereum's one-time storage fee, the CFS mechanism is more fair and reasonable. In principle, this mechanism requires locking a certain amount of funds as collateral to occupy storage space. This collateral remains locked until the corresponding storage space is either released or taken over by others. The interest generated by the locked collateral is directly allocated to miners for maintaining the storage space. Thus, the storage cost in Conflux also depends on the duration for which the storage space is occupied. Conflux has detailed this mechanism in chapter 7 of its Conflux Protocol Specification.",source:"@site/docs/core/core-space-basics/storage.md",sourceDirName:"core/core-space-basics",slug:"/core/core-space-basics/storage",permalink:"/zh-CN/docs/core/core-space-basics/storage",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Storage Collateral",keywords:["storage"],displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"Base32 Addresses",permalink:"/zh-CN/docs/core/core-space-basics/addresses"},next:{title:"Sponsorship Mechanism",permalink:"/zh-CN/docs/core/core-space-basics/sponsor-mechanism"}},l={},c=[{value:"Storage Cost Calculation",id:"storage-cost-calculation",level:2},{value:"Storage Ownership",id:"storage-ownership",level:2},{value:"Collateral Refund",id:"collateral-refund",level:2},{value:"Specify Storage Collateral in Transactions",id:"specify-storage-collateral-in-transactions",level:2},{value:"Sponsorship Mechanism and CIP-107",id:"sponsorship-mechanism-and-cip-107",level:2},{value:"FAQs",id:"faqs",level:2},{value:"Does eSpace Have Storage Collateral?",id:"does-espace-have-storage-collateral",level:3}],p={toc:c},h="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(h,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Conflux Core introduced the Collateral for Storage (CFS) mechanism as a ",(0,r.kt)("strong",{parentName:"p"},"pricing method for using storage"),". Compared to Ethereum's one-time storage fee, the CFS mechanism is more fair and reasonable. In principle, this mechanism requires locking a certain amount of funds as collateral to occupy storage space. This collateral remains locked until the corresponding storage space is either released or taken over by others. The interest generated by the locked collateral is directly allocated to miners for maintaining the storage space. Thus, the storage cost in Conflux also depends on the duration for which the storage space is occupied. Conflux has detailed this mechanism in chapter 7 of its ",(0,r.kt)("a",{parentName:"p",href:"https://confluxnetwork.org/files/Conflux_Protocol_Specification.pdf"},"Conflux Protocol Specification"),"."),(0,r.kt)("h2",{id:"storage-cost-calculation"},"Storage Cost Calculation"),(0,r.kt)("p",null,"In the Conflux network, ",(0,r.kt)("strong",{parentName:"p"},"each storage entry occupies 64B (B is Bytes, byte)"),", which is the size of the key/value pair in the world state. It is important to note that the key in the blockchain is generally 256 bits long, and the value is also 256 bits long (each is 32B long, totaling 64B). The deposit required for storage is proportional to the smallest multiple of 64B that can encompass all stored items. In the world state, throughout the entire lifecycle of a storage item, the item's owner must lock a fixed amount of CFX as a storage deposit. Specifically, for each storage entry of 64B, the owner will have 1/16 CFX locked. For ",(0,r.kt)("strong",{parentName:"p"},"occupying ",(0,r.kt)("inlineCode",{parentName:"strong"},"1KB")," of space, you will pay ",(0,r.kt)("inlineCode",{parentName:"strong"},"1CFX"))," as a deposit. The corresponding formula is as follows:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Locale Dropdown",src:o(31036).Z,width:"510",height:"136"})),(0,r.kt)("h2",{id:"storage-ownership"},"Storage Ownership"),(0,r.kt)("p",null,"For each storage entry, the ",(0,r.kt)("strong",{parentName:"p"},"last account")," that writes to the entry is considered the owner of the storage entry. The storage owner is required to pay the storage collateral for the storage entry."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If a storage entry is written in the execution of a contract C with sponsorship for collateral, then C is regarded as the account writing to that entry and hence becomes the owner accordingly (see Section 8.1 in ",(0,r.kt)("a",{parentName:"p",href:"https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf"},"Conflux Protocol Specification")," for more details).")),(0,r.kt)("p",null,"When account \u03b1 becomes the owner of a storage entry (whether through creation or modification), \u03b1 must immediately lock 1/16 CFX for the entry. If \u03b1 has sufficient balance, the required deposit will be automatically locked. However, if \u03b1 does not have enough balance, the operation will fail, and \u03b1 cannot create or modify the entry."),(0,r.kt)("p",null,"If a contract is sponsored, the sponsor will pay the storage collateral for the storage entry, and the sponsor will then become the owner of the storage entry. If the contract's sponsor changes, the new sponsor will pay the storage collateral for the storage entry, becoming the new owner."),(0,r.kt)("h2",{id:"collateral-refund"},"Collateral Refund"),(0,r.kt)("p",null,"When a storage item is ",(0,r.kt)("strong",{parentName:"p"},"deleted from the world state"),", the corresponding 1/16 CFX deposit will be unlocked and ",(0,r.kt)("strong",{parentName:"p"},"returned to the item owner's balance"),"."),(0,r.kt)("p",null,"If the ownership of a storage item changes, the 1/16 CFX deposit of the previous owner is unlocked, and the new owner must simultaneously lock 1/16 CFX as their deposit."),(0,r.kt)("p",null,"It should be noted that the deposit ",(0,r.kt)("strong",{parentName:"p"},'refund is "quietly" added to the balance'),"; there is no transfer transaction available for inquiry."),(0,r.kt)("h2",{id:"specify-storage-collateral-in-transactions"},"Specify Storage Collateral in Transactions"),(0,r.kt)("p",null,"When users ",(0,r.kt)("strong",{parentName:"p"},"send a Conflux Core transaction"),", they must fill in a ",(0,r.kt)("inlineCode",{parentName:"p"},"storageLimit")," field (",(0,r.kt)("strong",{parentName:"p"},"in bytes"),"). The storage limit functions similarly to the gas limit, but for storage. It sets an upper limit, stipulating that the increase in the deposit payer's deposit before and after executing the transaction should not exceed the ",(0,r.kt)("inlineCode",{parentName:"p"},"storage upper limit")," multiplied by 1/1024 CFX. If this value is set too low, the deposit may exceed the upper limit after execution, leading to transaction failure. Therefore, this field generally needs to be set higher than the actual usage, and ",(0,r.kt)("strong",{parentName:"p"},"any excess will not generate a storage mortgage"),". However, setting it excessively high is not recommended, as it might result in an insufficient balance to cover the deposit, causing the transaction to fail. The Fullnode provides the RPC method ",(0,r.kt)("inlineCode",{parentName:"p"},"cfx_estimateGasAndCollateral")," to estimate the storage size a transaction will use."),(0,r.kt)("p",null,"After executing the transaction, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Receipt")," includes several fields related to storage changes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"storageCollateralized"),": This shows the amount of data that is stored and collateralized."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"storageCoveredBySponsor"),": Indicates whether the storage mortgage for this transaction is sponsored."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"storageReleased"),": The amount of storage released by this transaction.")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"cfx_getCollateralForStorage")," method can be used to query the storage size currently mortgaged by an address; the unit is bytes. The mortgaged amount of CFX can be calculated by dividing this value by 1024. Additionally, this information can be obtained through the ",(0,r.kt)("inlineCode",{parentName:"p"},"cfx_getAccount")," method. The returned information includes the ",(0,r.kt)("inlineCode",{parentName:"p"},"collateralForStorage")," field."),(0,r.kt)("h2",{id:"sponsorship-mechanism-and-cip-107"},"Sponsorship Mechanism and CIP-107"),(0,r.kt)("p",null,"Conflux implements a ",(0,r.kt)("a",{parentName:"p",href:"/zh-CN/docs/core/core-space-basics/internal-contracts/sponsor-whitelist-control"},"sponsorship mechanism")," to subsidize the usage of smart contracts. This mechanism allows the sponsor of a contract to pay the collateral for storage occupied by transactions, instead of the transaction sender."),(0,r.kt)("p",null,"Following the ",(0,r.kt)("a",{parentName:"p",href:"../../general/hardforks/v2.3.md"},(0,r.kt)("inlineCode",{parentName:"a"},"v2.3.0")," hardfork"),", ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md"},"CIP-107")," was activated. This introduced storage points as a new type of collateral for storage, where 1 KB of storage space costs 1,024 storage points."),(0,r.kt)("p",null,"Collateral storage points are also refunded when the storage space they cover is freed or when its ownership changes. However, it is important to note that these storage points are non-transferrable and do not generate storage interest."),(0,r.kt)("p",null,"For more detailed information on the sponsorship mechanism and CIP-107, please refer to ",(0,r.kt)("a",{parentName:"p",href:"/zh-CN/docs/core/core-space-basics/internal-contracts/sponsor-whitelist-control"},"Sponsorship Mechanism")," and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md"},"CIP-107 DAO-Adjustable Burn of Storage Collateral"),"."),(0,r.kt)("h2",{id:"faqs"},"FAQs"),(0,r.kt)("h3",{id:"does-espace-have-storage-collateral"},"Does eSpace Have Storage Collateral?"),(0,r.kt)("p",null,"No. The storage collateral mechanism is applicable exclusively to the Conflux Core Space."))}d.isMDXComponent=!0},31036:(e,t,o)=>{o.d(t,{Z:()=>a});const a=o.p+"assets/images/storage-formula-635173b54f6e13ba21a689cc691d4ecd-635173b54f6e13ba21a689cc691d4ecd.png"}}]);