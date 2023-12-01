"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[8159],{3905:(t,e,n)=>{n.d(e,{Zo:()=>d,kt:()=>s});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),m=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},d=function(t){var e=m(t.components);return a.createElement(o.Provider,{value:e},t.children)},u="mdxType",k={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,o=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),u=m(n),c=r,s=u["".concat(o,".").concat(c)]||u[c]||k[c]||l;return n?a.createElement(s,i(i({ref:e},d),{},{components:n})):a.createElement(s,i({ref:e},d))}));function s(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=c;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p[u]="string"==typeof t?t:r,i[1]=p;for(var m=2;m<l;m++)i[m]=n[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},79191:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>k,frontMatter:()=>l,metadata:()=>p,toc:()=>m});var a=n(87462),r=(n(67294),n(3905));const l={sidebar_position:5,title:"Network RPC Endpoints",description:"Conflux eSpace RPC endpoints",displayed_sidebar:"eSpaceSidebar"},i=void 0,p={unversionedId:"espace/network-endpoints",id:"espace/network-endpoints",title:"Network RPC Endpoints",description:"Conflux eSpace RPC endpoints",source:"@site/docs/espace/network-endpoints.md",sourceDirName:"espace",slug:"/espace/network-endpoints",permalink:"/docs/espace/network-endpoints",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/espace/network-endpoints.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Network RPC Endpoints",description:"Conflux eSpace RPC endpoints",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"Contract Verification",permalink:"/docs/espace/tutorials/VerifyContracts"},next:{title:"Advanced",permalink:"/docs/category/advanced"}},o={},m=[{value:"1. Confura",id:"1-confura",level:2},{value:"Hong Kong",id:"hong-kong",level:3},{value:"US East",id:"us-east",level:3},{value:"Rate Limits",id:"rate-limits",level:3},{value:"2. Unifra",id:"2-unifra",level:2},{value:"Hardfork number",id:"hardfork-number",level:2}],d={toc:m},u="wrapper";function k(t){let{components:e,...n}=t;return(0,r.kt)(u,(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"1-confura"},"1. Confura"),(0,r.kt)("h3",{id:"hong-kong"},"Hong Kong"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"RPC Endpoint URL"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#mainnet"},"Mainnet")),(0,r.kt)("td",{parentName:"tr",align:null},"1030 (0x406)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://evm.confluxrpc.com"},"https://evm.confluxrpc.com"),(0,r.kt)("br",null)," ",(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://evm.confluxrpc.com/ws"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evm.confluxscan.net"},"https://evm.confluxscan.net"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#testnet"},"Testnet")),(0,r.kt)("td",{parentName:"tr",align:null},"71 (0x47)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://evmtestnet.confluxrpc.com"},"https://evmtestnet.confluxrpc.com"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://evmtestnet.confluxrpc.com/ws"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evmtestnet.confluxscan.net"},"https://evmtestnet.confluxscan.net"))))),(0,r.kt)("h3",{id:"us-east"},"US East"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"RPC Endpoint URL"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#mainnet"},"Mainnet")),(0,r.kt)("td",{parentName:"tr",align:null},"1030 (0x406)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://evm.confluxrpc.org"},"https://evm.confluxrpc.org"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://evm.confluxrpc.com/ws"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evm.confluxscan.io"},"https://evm.confluxscan.io"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#testnet"},"Testnet")),(0,r.kt)("td",{parentName:"tr",align:null},"71 (0x47)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evmtestnet.confluxrpc.org"},"https://evmtestnet.confluxrpc.org"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://evmtestnet.confluxrpc.com/ws"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evmtestnet.confluxscan.io"},"https://evmtestnet.confluxscan.io"))))),(0,r.kt)("h3",{id:"rate-limits"},"Rate Limits"),(0,r.kt)("p",null,"Reference for various fee tiers and their rate limits."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Fee Tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Price"),(0,r.kt)("th",{parentName:"tr",align:null},"Rate Limits"),(0,r.kt)("th",{parentName:"tr",align:null},"Buy Links"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Free"),(0,r.kt)("td",{parentName:"tr",align:null},"$0"),(0,r.kt)("td",{parentName:"tr",align:null},"50 calls/second, up to  100,000 calls/day"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Standard"),(0,r.kt)("td",{parentName:"tr",align:null},"$150/mo"),(0,r.kt)("td",{parentName:"tr",align:null},"100 calls/second, up to 1,000,000 calls/day"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D"},"mainnet")," ",(0,r.kt)("br",null)," ",(0,r.kt)("a",{parentName:"td",href:"https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477"},"testnet"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Enterprise"),(0,r.kt)("td",{parentName:"tr",align:null},"please inquire ",(0,r.kt)("a",{parentName:"td",href:"mailto:bd@confluxnetwork.org"},"bd@confluxnetwork.org")),(0,r.kt)("td",{parentName:"tr",align:null},"customize on demand"),(0,r.kt)("td",{parentName:"tr",align:null},"-")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Notes")," "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Maximum result-set size is 10,000 for ",(0,r.kt)("inlineCode",{parentName:"li"},"getLogs")," call;"),(0,r.kt)("li",{parentName:"ul"},"Old archived event logs may be inaccessible due to data prune;"),(0,r.kt)("li",{parentName:"ul"},"Append your api key to the endpoint for privileged access (eg., ",(0,r.kt)("inlineCode",{parentName:"li"},"https://evm.confluxrpc.com/<api-key>"),");"),(0,r.kt)("li",{parentName:"ul"},"Rate limits are also imposed per RPC method, please check the following specification for more details.")),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Rate Limit Specification"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"RPC Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Free tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Standard Tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Comment"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"all"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 50; ",(0,r.kt)("br",null)," daily total < 100k"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 100; ",(0,r.kt)("br",null)," daily total < 1million"),(0,r.kt)("td",{parentName:"tr",align:null},"overall RPC requests")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"eth_getLogs"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"eth_call"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 50"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"eth_getBlockBy*"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"eth_getBlockByHash"),", ",(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"eth_getBlockByNumber"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"eth_getTransaction*"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"eth_getTransactionByHash"),", ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"eth_getTransactionReceipt"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"debug RPC"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"parity_getBlockReceipts")," etc.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"trace RPC"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_block"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_filter"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_transaction"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"filter API"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"supported"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"eth_newFilter"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"eth_getFilterChanges")," etc."))))),(0,r.kt)("h2",{id:"2-unifra"},"2. Unifra"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"RPC Endpoint URL"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#mainnet"},"Mainnet")),(0,r.kt)("td",{parentName:"tr",align:null},"1030 (0x406)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://conflux-espace-public.unifra.io"},"https://conflux-espace-public.unifra.io")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://evm.confluxscan.net"},"https://evm.confluxscan.net"))))),(0,r.kt)("h2",{id:"hardfork-number"},"Hardfork number"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Mainnet: EpochNumber 36935000, BlockNumber 92060600"),(0,r.kt)("li",{parentName:"ul"},"Testnet: EpochNumber 61465000, BlockNumber 77340000")))}k.isMDXComponent=!0}}]);