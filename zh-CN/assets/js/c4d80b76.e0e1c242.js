"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2493],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=s(r),f=a,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||l;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},78531:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const l={title:"Reference Articles",displayed_sidebar:"references"},o=void 0,i={unversionedId:"general/article-collection-links/reference-links",id:"general/article-collection-links/reference-links",title:"Reference Articles",description:"This page provides quick entries for Conflux reference documentation.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/article-collection-links/reference-links.md",sourceDirName:"general/article-collection-links",slug:"/general/article-collection-links/reference-links",permalink:"/zh-CN/docs/general/article-collection-links/reference-links",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",frontMatter:{title:"Reference Articles",displayed_sidebar:"references"},sidebar:"references",next:{title:"JSON-RPC",permalink:"/zh-CN/docs/core/build/json-rpc/"}},c={},s=[{value:"RPC",id:"rpc",level:2},{value:"Network Endpoints",id:"network-endpoints",level:2},{value:"SDKs And Tools",id:"sdks-and-tools",level:2},{value:"Contracts",id:"contracts",level:2},{value:"Migration from Ethereum",id:"migration-from-ethereum",level:2},{value:"Others",id:"others",level:2}],p={toc:s},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This page provides quick entries for Conflux reference documentation."),(0,a.kt)("h2",{id:"rpc"},"RPC"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh-CN/docs/core/build/json-rpc/"},"Core Space JSON RPC")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/build/jsonrpc-compatibility"},"eSpace JSON RPC"))),(0,a.kt)("h2",{id:"network-endpoints"},"Network Endpoints"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../core/build/sdks-and-tools/conflux_rpcs"},"Core Space Network Endpoints")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/network-endpoints"},"espace/network-endpoints"))),(0,a.kt)("h2",{id:"sdks-and-tools"},"SDKs And Tools"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../core/build/sdks-and-tools/sdks"},"Core Space SDKs")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../core/build/sdks-and-tools/tools"},"Core Space Tools")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/DeveloperQuickstart"},"eSpace(Ethereum) Tools Tutorial"))),(0,a.kt)("h2",{id:"contracts"},"Contracts"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../core/learn/core-space-basics/internal-contracts/internal-contracts"},"Core Space Internal Contracts")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/build/deployed-contracts"},"eSpace Deployed Contracts"))),(0,a.kt)("h2",{id:"migration-from-ethereum"},"Migration from Ethereum"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/build/jsonrpc-compatibility"},"eSpace JSON RPC Compatibility")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../../espace/build/evm-compatibility"},"eSpace EVM Compatibility"))),(0,a.kt)("h2",{id:"others"},"Others"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh-CN/docs/general/run-a-node/configuration-files"},"Node Configuration Files")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh-CN/docs/general/hardforks/"},"Hard Forks")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh-CN/docs/general/conflux-basics/conflux-governance/cips"},"CIPs")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh-CN/docs/general/conflux-basics/additional-resources/conflux_papers"},"Papers"))))}d.isMDXComponent=!0}}]);