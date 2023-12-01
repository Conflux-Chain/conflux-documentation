"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[7436],{3905:(e,r,t)=>{t.d(r,{Zo:()=>i,kt:()=>b});var n=t(67294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=n.createContext({}),l=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},i=function(e){var r=l(e.components);return n.createElement(p.Provider,{value:r},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),d=l(t),f=a,b=d["".concat(p,".").concat(f)]||d[f]||u[f]||o;return t?n.createElement(b,c(c({ref:r},i),{},{components:t})):n.createElement(b,c({ref:r},i))}));function b(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=f;var s={};for(var p in r)hasOwnProperty.call(r,p)&&(s[p]=r[p]);s.originalType=e,s[d]="string"==typeof e?e:a,c[1]=s;for(var l=2;l<o;l++)c[l]=t[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},19730:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=t(87462),a=(t(67294),t(3905));const o={id:"debug_rpc",sidebar_position:4,title:"debug Namespace",keywords:["debug-rpc"],displayed_sidebar:"coreSidebar"},c=void 0,s={unversionedId:"core/build/json-rpc/debug_rpc",id:"core/build/json-rpc/debug_rpc",title:"debug Namespace",description:"RPCs",source:"@site/docs/core/build/json-rpc/debug-namespace.md",sourceDirName:"core/build/json-rpc",slug:"/core/build/json-rpc/debug_rpc",permalink:"/docs/core/build/json-rpc/debug_rpc",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/core/build/json-rpc/debug-namespace.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"debug_rpc",sidebar_position:4,title:"debug Namespace",keywords:["debug-rpc"],displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"pos Namespace",permalink:"/docs/core/build/json-rpc/pos_rpc"},next:{title:"trace Namespace",permalink:"/docs/core/build/json-rpc/trace_rpc"}},p={},l=[{value:"RPCs",id:"rpcs",level:2},{value:"cfx_getEpochReceipts",id:"cfx_getepochreceipts",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Response",id:"response",level:4},{value:"Example",id:"example",level:4}],i={toc:l},d="wrapper";function u(e){let{components:r,...t}=e;return(0,a.kt)(d,(0,n.Z)({},i,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"rpcs"},"RPCs"),(0,a.kt)("h3",{id:"cfx_getepochreceipts"},"cfx_getEpochReceipts"),(0,a.kt)("p",null,"Get one epoch's all receipts in one RPC call"),(0,a.kt)("h4",{id:"parameters"},"Parameters"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"QUANTITY"),": Epoch number")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'params: [\n  "0x1001"\n]\n')),(0,a.kt)("h4",{id:"response"},"Response"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ARRAY")," - Receipt array"),(0,a.kt)("h4",{id:"example"},"Example"),(0,a.kt)("p",null,"Request"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'curl --location --request POST \'http://localhost:12537\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "id": 1,\n    "jsonrpc": "2.0",\n    "method": "cfx_getEpochReceipts",\n    "params": ["0x1001"]\n}\'\n')),(0,a.kt)("p",null,"Response"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "jsonrpc": "2.0",\n    "id": "15922956697249514502",\n    "result": [{\n    "blockHash": "0xbb1eea3c8a574dc19f7d8311a2096e23a39f12e649a20766544f2df67aac0bed",\n    "contractCreated": null,\n    "epochNumber": "0x87431b",\n    "from": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",\n    "gasCoveredBySponsor": true,\n    "gasFee": "0x108ca",\n    "gasUsed": "0x8465",\n    "index": "0x0",\n    "logs": [{\n      "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",\n      "data": "0x00000000000000000000000019a3224214fe29107d84af9baa02118b614e46d5",\n      "topics": ["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5"]\n    }],\n    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000080000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000",\n    "outcomeStatus": "0x0",\n    "stateRoot": "0x1bc37c63c03d7e7066f9427f69e515988d19ebb26998087d75b50d2235e55ee7",\n    "storageCollateralized": "0x40",\n    "storageCoveredBySponsor": true,\n    "storageReleased": [{\n      "address": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",\n      "collaterals": "0x40"\n    }],\n    "to": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",\n    "transactionHash": "0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514"\n  }]\n}\n')))}u.isMDXComponent=!0}}]);