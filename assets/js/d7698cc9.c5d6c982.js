"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[4876],{3905:(t,e,n)=>{n.d(e,{Zo:()=>d,kt:()=>k});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),u=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},d=function(t){var e=u(t.components);return a.createElement(p.Provider,{value:e},t.children)},c="mdxType",s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),c=u(n),m=r,k=c["".concat(p,".").concat(m)]||c[m]||s[m]||l;return n?a.createElement(k,i(i({ref:e},d),{},{components:n})):a.createElement(k,i({ref:e},d))}));function k(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=m;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[c]="string"==typeof t?t:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},44604:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={id:"conflux_rpcs",title:"Network RPC Endpoints",sidebar_position:5,keywords:["endpoints"],displayed_sidebar:"coreSidebar"},i=void 0,o={unversionedId:"core/conflux_rpcs",id:"core/conflux_rpcs",title:"Network RPC Endpoints",description:"Public available Conflux Core Space network RPC endpoints",source:"@site/docs/core/core-endpoints.md",sourceDirName:"core",slug:"/core/conflux_rpcs",permalink:"/docs/core/conflux_rpcs",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/core/core-endpoints.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"conflux_rpcs",title:"Network RPC Endpoints",sidebar_position:5,keywords:["endpoints"],displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"Complete NFT Tutorial",permalink:"/docs/core/tutorials/nft-tutorial"},next:{title:"Build",permalink:"/docs/category/build"}},p={},u=[{value:"1. Confura",id:"1-confura",level:2},{value:"Public Endpoint",id:"public-endpoint",level:3},{value:"Hong Kong",id:"hong-kong",level:4},{value:"US East",id:"us-east",level:4},{value:"Rate Limits",id:"rate-limits",level:3},{value:"2. Unifra",id:"2-unifra",level:2},{value:"Public Endpoint",id:"public-endpoint-1",level:3}],d={toc:u},c="wrapper";function s(t){let{components:e,...n}=t;return(0,r.kt)(c,(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Public available Conflux Core Space network RPC endpoints"),(0,r.kt)("h2",{id:"1-confura"},"1. Confura"),(0,r.kt)("p",null,"Confura is an Ethereum Infura equivalent public JSON-RPC service on Conflux network, which is developed and maintained by Conflux foundation."),(0,r.kt)("p",null,"Our public RPC services are located in different regions globally. By utilizing geographic DNS routing, developers can request the regional RPC services which are physically closest to them."),(0,r.kt)("h3",{id:"public-endpoint"},"Public Endpoint"),(0,r.kt)("h4",{id:"hong-kong"},"Hong Kong"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"),(0,r.kt)("th",{parentName:"tr",align:null},"RPC Endpoint"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Mainnet"),(0,r.kt)("td",{parentName:"tr",align:null},"1029"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://confluxscan.net"},"https://confluxscan.net")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://main.confluxrpc.com"},"https://main.confluxrpc.com"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://main.confluxrpc.com/ws")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Testnet"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://testnet.confluxscan.net"},"https://testnet.confluxscan.net")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://test.confluxrpc.com"},"https://test.confluxrpc.com"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://test.confluxrpc.com/ws")))),(0,r.kt)("h4",{id:"us-east"},"US East"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"),(0,r.kt)("th",{parentName:"tr",align:null},"RPC Endpoint"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Mainnet"),(0,r.kt)("td",{parentName:"tr",align:null},"1029"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://confluxscan.io"},"https://confluxscan.io")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://main.confluxrpc.org"},"https://main.confluxrpc.org"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://main.confluxrpc.org/ws")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Testnet"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://testnet.confluxscan.io"},"https://testnet.confluxscan.io")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"HTTP"),": ",(0,r.kt)("a",{parentName:"td",href:"https://test.confluxrpc.org"},"https://test.confluxrpc.org"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"Websocket"),": wss://test.confluxrpc.org/ws")))),(0,r.kt)("h3",{id:"rate-limits"},"Rate Limits"),(0,r.kt)("p",null,"Reference for various fee tiers and their rate limits."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Fee Tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Price"),(0,r.kt)("th",{parentName:"tr",align:null},"Rate Limits"),(0,r.kt)("th",{parentName:"tr",align:null},"Buy Links"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Free"),(0,r.kt)("td",{parentName:"tr",align:null},"$0"),(0,r.kt)("td",{parentName:"tr",align:null},"50 calls/second, up to  100,000 calls/day"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Standard"),(0,r.kt)("td",{parentName:"tr",align:null},"$150/mo"),(0,r.kt)("td",{parentName:"tr",align:null},"100 calls/second, up to 1,000,000 calls/day"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D"},"mainnet")," ",(0,r.kt)("br",null)," ",(0,r.kt)("a",{parentName:"td",href:"https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477"},"testnet"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Enterprise"),(0,r.kt)("td",{parentName:"tr",align:null},"please inquire ",(0,r.kt)("a",{parentName:"td",href:"mailto:bd@confluxnetwork.org"},"bd@confluxnetwork.org")),(0,r.kt)("td",{parentName:"tr",align:null},"customize on demand"),(0,r.kt)("td",{parentName:"tr",align:null},"-")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Notes")," "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Maximum result-set size is 10,000 for ",(0,r.kt)("inlineCode",{parentName:"li"},"getLogs")," call;"),(0,r.kt)("li",{parentName:"ul"},"Old archived event logs may be inaccessible due to data prune;"),(0,r.kt)("li",{parentName:"ul"},"Append your api key to the endpoint for privileged access (eg., ",(0,r.kt)("inlineCode",{parentName:"li"},"https://main.confluxrpc.com/<api-key>"),");"),(0,r.kt)("li",{parentName:"ul"},"Rate limits are also imposed per RPC method, please check the following specification for more details.")),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Rate Limit Specification"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"RPC Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Free tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Standard Tier"),(0,r.kt)("th",{parentName:"tr",align:null},"Comment"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"all"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 50; ",(0,r.kt)("br",null)," daily total < 100k"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 100; ",(0,r.kt)("br",null)," daily total < 1million"),(0,r.kt)("td",{parentName:"tr",align:null},"overall RPC requests")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cfx_getLogs"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cfx_call"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 50"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cfx_getBlockBy*"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getBlockByHash"),", ",(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getBlockByEpochNumber"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cfx_getTransaction*"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 5"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getTransactionByHash"),", ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getTransactionReceipt"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"debug RPC"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getEpochReceipts")," etc.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"trace RPC"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"QPS < 20"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_block"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_filter"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_transaction"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"filter API"),(0,r.kt)("td",{parentName:"tr",align:null},"not supported"),(0,r.kt)("td",{parentName:"tr",align:null},"supported"),(0,r.kt)("td",{parentName:"tr",align:null},"includes: ",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_newFilter"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"cfx_getFilterChanges")," etc."))))),(0,r.kt)("h2",{id:"2-unifra"},"2. Unifra"),(0,r.kt)("p",null,"Unifra is a Web3 developer platform focused on simplifying blockchain development. It has built a suite of developer tools, enhanced APIs, and a superior node infrastructure to seamlessly build and run blockchain applications. Unifra provide API services for multiple chains including Ethereum, BNB Smart Chain, Polygon and Conflux."),(0,r.kt)("p",null,"Unifra provides:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Open access to free public end-points"),(0,r.kt)("li",{parentName:"ul"},"Real-time webhook alerts via Notify"),(0,r.kt)("li",{parentName:"ul"},"Best-in-class support and reliability / stability"),(0,r.kt)("li",{parentName:"ul"},"Unifra's NFT API"),(0,r.kt)("li",{parentName:"ul"},"Dashboard with Request Explorer")),(0,r.kt)("p",null,"To use Unifra's service, developer need to register an account first and find the RPC endpoint in ",(0,r.kt)("a",{parentName:"p",href:"https://console.unifra.io/"},"Unifra console"),". For detail infomation check ",(0,r.kt)("a",{parentName:"p",href:"https://docs.unifra.io/"},"Unifra's documentation")),(0,r.kt)("h3",{id:"public-endpoint-1"},"Public Endpoint"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Network"),(0,r.kt)("th",{parentName:"tr",align:null},"Chain ID"),(0,r.kt)("th",{parentName:"tr",align:null},"Explorer"),(0,r.kt)("th",{parentName:"tr",align:null},"Endpoint"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Mainnet"),(0,r.kt)("td",{parentName:"tr",align:null},"1029"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://confluxscan.net"},"https://confluxscan.net")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://conflux-core-public.unifra.io"},"https://conflux-core-public.unifra.io"))))))}s.isMDXComponent=!0}}]);