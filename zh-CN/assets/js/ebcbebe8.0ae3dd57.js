"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[8844],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=u(n),h=o,f=c["".concat(s,".").concat(h)]||c[h]||p[h]||a;return n?r.createElement(f,l(l({ref:t},d),{},{components:n})):r.createElement(f,l({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=h;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[c]="string"==typeof e?e:o,l[1]=i;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},11630:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>u});var r=n(87462),o=(n(67294),n(3905));const a={sidebar_position:2,title:"\u8282\u70b9\u7c7b\u578b",description:"Learn about the different types of nodes in the Conflux Network.",displayed_sidebar:"generalSidebar"},l=void 0,i={unversionedId:"general/run-a-node/node-types",id:"general/run-a-node/node-types",title:"\u8282\u70b9\u7c7b\u578b",description:"Learn about the different types of nodes in the Conflux Network.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/run-a-node/node-types.md",sourceDirName:"general/run-a-node",slug:"/general/run-a-node/node-types",permalink:"/zh-CN/docs/general/run-a-node/node-types",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"\u8282\u70b9\u7c7b\u578b",description:"Learn about the different types of nodes in the Conflux Network.",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u8fd0\u884c\u8282\u70b9",permalink:"/zh-CN/docs/general/run-a-node/"},next:{title:"\u8282\u70b9\u5feb\u7167\u5de5\u5177",permalink:"/zh-CN/docs/general/run-a-node/snapshot-tool"}},s={},u=[{value:"Differences Between Node Types",id:"differences-between-node-types",level:2},{value:"Full Node",id:"full-node",level:2},{value:"Requirements",id:"requirements",level:3},{value:"How to Run",id:"how-to-run",level:3},{value:"Archive Node",id:"archive-node",level:2},{value:"Requirements",id:"requirements-1",level:3},{value:"How to Run",id:"how-to-run-1",level:3},{value:"Light Node",id:"light-node",level:2},{value:"Requirements",id:"requirements-2",level:3},{value:"How to Run",id:"how-to-run-2",level:3},{value:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",level:2},{value:"Why the cfx_getTransactionByHash API returns null?",id:"why-the-cfx_gettransactionbyhash-api-returns-null",level:3},{value:"Is fullnode enough for Exchange?",id:"is-fullnode-enough-for-exchange",level:3},{value:"I want to participate in mining or staking, which node type should I run?",id:"i-want-to-participate-in-mining-or-staking-which-node-type-should-i-run",level:3}],d={toc:u},c="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In the Conflux Network, there are different types of nodes that you can run, each serving different purposes and having different requirements. There are 3 types of nodes: ",(0,o.kt)("strong",{parentName:"p"},"Archive Node, Full Node and Light Node"),"."),(0,o.kt)("p",null,"The difference between three types of nodes lies in ",(0,o.kt)("strong",{parentName:"p"},"the amount of data reserved for storage"),". The Archive Node takes the most and the Light Node takes the least. Of course, more data consumes more hardware resources. In general, ",(0,o.kt)("strong",{parentName:"p"},"if you want to participate in mining, a fullnode will suffice")," . you need to run an archive node if you want to use it as RPC service. The lightnode is mainly used as a wallet."),(0,o.kt)("p",null,"Here's a detail on the requirements for running all types of nodes in the Conflux Network, along with the differences between each one."),(0,o.kt)("h2",{id:"differences-between-node-types"},"Differences Between Node Types"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Full Node"),": Stores all block headers and most recent ",(0,o.kt)("strong",{parentName:"li"},"10w Epoch")," block. ",(0,o.kt)("strong",{parentName:"li"},"Suitable for most users and developers"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Archive Node"),": Stores the entire blockchain and all historical data. Requires significant storage and is suitable for data analysis and applications that need access to the full historical data."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Light Node"),": Stores only block headers and a small subset of data. Suitable for low-resource devices and provides a way to interact with the network without storing the entire blockchain.")),(0,o.kt)("h2",{id:"full-node"},"Full Node"),(0,o.kt)("p",null,"A full node stores the entire block headers and most ",(0,o.kt)("strong",{parentName:"p"},"recent 10w Epoch blocks")," of the blockchain."),(0,o.kt)("h3",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"At least 16GB of RAM.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"A minimum of 1TB free disk space (SSD is recommended).")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"A stable internet connection."))),(0,o.kt)("h3",{id:"how-to-run"},"How to Run"),(0,o.kt)("p",null,'Follow the steps in the previous tutorial to install and configure the Conflux node, then set the mode parameter in the configuration file to "full":'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'mode = "full" \n')),(0,o.kt)("p",null,"Start the node with the custom configuration file, using the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"conflux --config ./run/hydra.toml \n")),(0,o.kt)("h2",{id:"archive-node"},"Archive Node"),(0,o.kt)("p",null,"An archive node stores the entire data of the blockchain, including all blocks, transactions. It requires more storage than a full node."),(0,o.kt)("h3",{id:"requirements-1"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"At least 32GB of RAM.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"A minimum of 2TB free disk space (SSD is recommended).")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"A stable internet connection."))),(0,o.kt)("h3",{id:"how-to-run-1"},"How to Run"),(0,o.kt)("p",null,'Set the mode parameter in the configuration file to "archive":'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'mode = "archive" \n')),(0,o.kt)("p",null,"Start the node with the custom configuration file, using the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"conflux --config ./run/hydra.toml \n")),(0,o.kt)("h2",{id:"light-node"},"Light Node"),(0,o.kt)("p",null,"A light node only stores the block headers and a small subset of other data, allowing it to verify the authenticity of the data without storing the entire blockchain."),(0,o.kt)("h3",{id:"requirements-2"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"At least 4GB of RAM."),(0,o.kt)("li",{parentName:"ul"},"A minimum of 300GB free disk space (SSD is recommended)."),(0,o.kt)("li",{parentName:"ul"},"A stable internet connection.")),(0,o.kt)("h3",{id:"how-to-run-2"},"How to Run"),(0,o.kt)("p",null,'Set the mode parameter in the configuration file to "light":'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'mode = "light" \n')),(0,o.kt)("p",null,"Start the node with the custom configuration file, using the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"conflux --config ./run/hydra.toml \n")),(0,o.kt)("h2",{id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"},"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"),(0,o.kt)("h3",{id:"why-the-cfx_gettransactionbyhash-api-returns-null"},"Why the cfx_getTransactionByHash API returns null?"),(0,o.kt)("p",null,"If you want to get the transaction details, you need to run a ",(0,o.kt)("inlineCode",{parentName:"p"},"fullnode")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"archivenode"),", and set the ",(0,o.kt)("inlineCode",{parentName:"p"},"persist_tx_index")," config to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),". The fullnode only store transactions in latest 10w Epoch."),(0,o.kt)("h3",{id:"is-fullnode-enough-for-exchange"},"Is fullnode enough for Exchange?"),(0,o.kt)("p",null,"Yes, fullnode only support querying transactions in latest 10w Epoch"),(0,o.kt)("h3",{id:"i-want-to-participate-in-mining-or-staking-which-node-type-should-i-run"},"I want to participate in mining or staking, which node type should I run?"),(0,o.kt)("p",null,"Fullnode will be enough."))}p.isMDXComponent=!0}}]);