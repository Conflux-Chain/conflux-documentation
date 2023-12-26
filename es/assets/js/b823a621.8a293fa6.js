"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[1545],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var o=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=o.createContext({}),s=function(e){var n=o.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=s(e.components);return o.createElement(u.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},f=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(t),f=r,m=d["".concat(u,".").concat(f)]||d[f]||p[f]||a;return t?o.createElement(m,i(i({ref:n},c),{},{components:t})):o.createElement(m,i({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=f;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[d]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=t[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}f.displayName="MDXCreateElement"},61136:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var o=t(87462),r=(t(67294),t(3905));const a={title:"Overview",sidebar_position:0,displayed_sidebar:"generalSidebar"},i=void 0,l={unversionedId:"general/run-a-node/Overview",id:"general/run-a-node/Overview",title:"Overview",description:"Conflux is a distributed network of computers (known as nodes) running software that can verify blocks and transaction data. The software must be run on your computer or server to turn it into an Conflux node.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/run-a-node/Overview.md",sourceDirName:"general/run-a-node",slug:"/general/run-a-node/Overview",permalink:"/es/docs/general/run-a-node/Overview",draft:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Overview",sidebar_position:0,displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Run a Node",permalink:"/es/docs/category/run-a-node"},next:{title:"Running a Node",permalink:"/es/docs/general/run-a-node/"}},u={},s=[{value:"Running your own node",id:"running-your-own-node",level:2}],c=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.kt)("div",n)},d=c("Tabs"),p=c("TabItem"),f={toc:s},m="wrapper";function g(e){let{components:n,...t}=e;return(0,r.kt)(m,(0,o.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Conflux is a distributed network of computers (known as nodes) running software that can verify blocks and transaction data. The software must be run on your computer or server to turn it into an Conflux node."),(0,r.kt)("p",null,'A "node" is any instance of Conflux client software that is connected to other computers also running Conflux software, forming a network. A client is an implementation of Conflux that verifies data against the protocol rules and keeps the network secure.'),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/conflux-chain/conflux-rust"},"Conflux-rust")," is a high-performance Conflux protocol client implemented in the Rust language, developed by the Conflux Foundation. It serves as a core component of the Conflux network, responsible for validating block and transaction data."),(0,r.kt)("p",null,"If you want to ",(0,r.kt)("strong",{parentName:"p"},"contribute to the decentralization of the Conflux network"),", participate in ",(0,r.kt)("strong",{parentName:"p"},"PoW mining, PoS staking"),", or set up ",(0,r.kt)("strong",{parentName:"p"},"your own RPC node"),", you need to run a Conflux node."),(0,r.kt)("p",null,"Here is a video about what's a node, why it's important, and how to run a node:"),(0,r.kt)(d,{mdxType:"Tabs"},(0,r.kt)(p,{value:"youtube",label:"Video source: YouTube",mdxType:"TabItem"},(0,r.kt)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/ocsbQRkL9fQ?si=wRmI5Aa6Ewfv-BCx",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}))),(0,r.kt)("h2",{id:"running-your-own-node"},"Running your own node"),(0,r.kt)("p",null,"Follow guide ",(0,r.kt)("a",{parentName:"p",href:"/es/docs/general/run-a-node/"},'"run a node"')," to quickly set up a Conflux node on your computer or server."),(0,r.kt)("p",null,"We also provider detail documentation for every step:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The difference between ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/node-types"},"node types")),(0,r.kt)("li",{parentName:"ul"},"How to ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/downloading-conflux-client"},"download")," or ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/compiling-conflux-client"},"compile the Conflux software")),(0,r.kt)("li",{parentName:"ul"},"We also provide ",(0,r.kt)("a",{parentName:"li",href:"./advanced-topics/downloading-conflux-client#docker"},"docker image")," for Conflux client"),(0,r.kt)("li",{parentName:"ul"},"Use ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/snapshot-tool"},"snapshot")," to accelerate the synchronization process"),(0,r.kt)("li",{parentName:"ul"},"The common ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/node-configuration"},"configuration options")," explained"),(0,r.kt)("li",{parentName:"ul"},"A ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/configuration-files"},"configuration file template")," for mainnet, and ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/official-bootnodes"},"mainnet bootnodes list")),(0,r.kt)("li",{parentName:"ul"},"How to ",(0,r.kt)("a",{parentName:"li",href:"/es/docs/general/run-a-node/advanced-topics/running-independent-chain"},"setup a private chain"))),(0,r.kt)("p",null,"If you have encountered any problem, please check ",(0,r.kt)("a",{parentName:"p",href:"/es/docs/general/run-a-node/nodes-faqs"},"FAQs")," and ",(0,r.kt)("a",{parentName:"p",href:"./TroubleShooting"},"trouble shooting")," page."))}g.isMDXComponent=!0}}]);