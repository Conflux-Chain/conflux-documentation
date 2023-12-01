"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[5749],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},p=Object.keys(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),u=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=u(r),h=n,m=c["".concat(o,".").concat(h)]||c[h]||d[h]||p;return r?a.createElement(m,i(i({ref:t},s),{},{components:r})):a.createElement(m,i({ref:t},s))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,i=new Array(p);i[0]=h;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[c]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<p;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},48635:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>u});var a=r(87462),n=(r(67294),r(3905));const p={sidebar_position:2,title:"Creating Subgraphs",displayed_sidebar:"eSpaceSidebar"},i=void 0,l={unversionedId:"espace/build/resources/graph/create-subgraphs",id:"espace/build/resources/graph/create-subgraphs",title:"Creating Subgraphs",description:"Subgraph\u662f\u4e00\u79cd\u4ece\u533a\u5757\u94fe\u4e2d\u63d0\u53d6\u6570\u636e\uff0c\u5904\u7406\u6570\u636e\u5e76\u5b58\u50a8\u6570\u636e\u7684\u6280\u672f\uff0c\u53ef\u4ee5\u901a\u8fc7GraphQL\u8fdb\u884c\u67e5\u8be2\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/espace/build/resources/graph/create-subgraphs.md",sourceDirName:"espace/build/resources/graph",slug:"/espace/build/resources/graph/create-subgraphs",permalink:"/zh-CN/docs/espace/build/resources/graph/create-subgraphs",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Creating Subgraphs",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"\u8282\u70b9\u914d\u7f6e",permalink:"/zh-CN/docs/espace/build/resources/graph/setup-graph-node"},next:{title:"Infrastructure",permalink:"/zh-CN/docs/espace/build/resources/infrastructure"}},o={},u=[{value:"\u5b89\u88c5Graph CLI",id:"\u5b89\u88c5graph-cli",level:2},{value:"\u4ece\u73b0\u6709\u7684\u5408\u7ea6\u5f00\u59cb",id:"\u4ece\u73b0\u6709\u7684\u5408\u7ea6\u5f00\u59cb",level:2},{value:"\u4ece\u793a\u4f8b Subgraph \u5f00\u59cb",id:"\u4ece\u793a\u4f8b-subgraph-\u5f00\u59cb",level:2},{value:"\u5728\u73b0\u6709\u7684 Subgraph \u4e2d\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u6e90",id:"\u5728\u73b0\u6709\u7684-subgraph-\u4e2d\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u6e90",level:2}],s={toc:u},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Subgraph\u662f\u4e00\u79cd\u4ece\u533a\u5757\u94fe\u4e2d\u63d0\u53d6\u6570\u636e\uff0c\u5904\u7406\u6570\u636e\u5e76\u5b58\u50a8\u6570\u636e\u7684\u6280\u672f\uff0c\u53ef\u4ee5\u901a\u8fc7GraphQL\u8fdb\u884c\u67e5\u8be2\u3002"),(0,n.kt)("p",null,"Subgraph\u7684\u5b9a\u4e49\u5305\u542b\u4e86\u51e0\u4e2a\u6587\u4ef6\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"subgraph.yaml"),"\uff1a\u4e00\u4e2a\u5305\u542bsubgraph\u6e05\u5355\u7684YAML\u6587\u4ef6"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"schema.graphql"),"\uff1a\u4e00\u4e2aGraphQL\u6a21\u5f0f\uff0c\u5b9a\u4e49\u4e86\u4f60\u7684subgraph\u5b58\u50a8\u7684\u6570\u636e\uff0c\u4ee5\u53ca\u5982\u4f55\u901a\u8fc7GraphQL\u67e5\u8be2\u5b83"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"AssemblyScript Mappings"),"\uff1a ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/AssemblyScript/assemblyscript"},"AssemblyScript")," \u4ee3\u7801\uff0c\u5c06\u4e8b\u4ef6\u6570\u636e\u8f6c\u6362\u4e3a\u4f60\u7684\u6a21\u5f0f\u4e2d\u5b9a\u4e49\u7684\u5b9e\u4f53\uff08\u4f8b\u5982\u672c\u6559\u7a0b\u4e2d\u7684",(0,n.kt)("inlineCode",{parentName:"li"}," mapping.ts")," \uff09")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u4e3a\u4e86\u5728The Graph\u7684\u53bb\u4e2d\u5fc3\u5316\u7f51\u7edc\u4e0a\u4f7f\u7528\u4f60\u7684subgraph\uff0c\u4f60\u9700\u8981\u521b\u5efa\u4e00\u4e2aAPI\u5bc6\u94a5\u3002 \u5efa\u8bae\u4f60\u7ed9\u4f60\u7684subgraph\u6dfb\u52a0\u81f3\u5c1110,000 GRT\u7684\u901a\u8bc1\u3002")),(0,n.kt)("p",null,"\u5728\u4f60\u8be6\u7ec6\u4e86\u89e3\u6e05\u5355\u6587\u4ef6\u7684\u5185\u5bb9\u4e4b\u524d\uff0c\u4f60\u9700\u8981\u5b89\u88c5 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/graphprotocol/graph-cli"},"Graph CLI")," \uff0c\u5b83\u662f\u4f60\u6784\u5efa\u548c\u90e8\u7f72subgraph\u6240\u9700\u8981\u7684\u5de5\u5177\u3002"),(0,n.kt)("h2",{id:"\u5b89\u88c5graph-cli"},"\u5b89\u88c5Graph CLI"),(0,n.kt)("p",null,"Graph CLI\u662f\u7528JavaScript\u7f16\u5199\u7684\uff0c\u4f60\u9700\u8981\u5b89\u88c5 ",(0,n.kt)("inlineCode",{parentName:"p"},"yarn"),"\u6216 ",(0,n.kt)("inlineCode",{parentName:"p"},"npm"),"\u6765\u4f7f\u7528\u5b83\uff1b\u5728\u63a5\u4e0b\u6765\u7684\u5185\u5bb9\u4e2d\uff0c\u6211\u4eec\u5047\u8bbe\u4f60\u5df2\u7ecf\u5b89\u88c5\u4e86yarn\u3002"),(0,n.kt)("p",null,"\u4e00\u65e6\u4f60\u5b89\u88c5\u4e86 ",(0,n.kt)("inlineCode",{parentName:"p"},"yarn"),"\uff0c\u5c31\u53ef\u4ee5\u901a\u8fc7\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4\u6765\u5b89\u88c5Graph CLI\uff1a"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"\u4f7f\u7528yarn\u5b89\u88c5\uff1a")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"yarn global add @graphprotocol/graph-cli")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"\u4f7f\u7528npm\u5b89\u88c5\uff1a")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"npm install -g @graphprotocol/graph-cli")),(0,n.kt)("p",null,"\u5b89\u88c5\u5b8c\u6210\u540e\uff0c",(0,n.kt)("inlineCode",{parentName:"p"},"graph init")," \u547d\u4ee4\u53ef\u4ee5\u7528\u6765\u8bbe\u7f6e\u4e00\u4e2a\u65b0\u7684subgraph\u9879\u76ee\uff0c\u53ef\u4ee5\u4ece\u4e00\u4e2a\u73b0\u6709\u7684\u5408\u7ea6\u6216\u4e00\u4e2a\u793a\u4f8bsubgraph\u5f00\u59cb\u3002 \u8fd9\u4e2a\u547d\u4ee4\u53ef\u4ee5\u7528\u6765\u5728Subgraph Studio\u4e0a\u521b\u5efa\u4e00\u4e2asubgraph\uff0c\u53ea\u9700\u4f20\u5165 ",(0,n.kt)("inlineCode",{parentName:"p"},"graph init --product subgraph-studio"),"\u3002 \u5982\u679c\u4f60\u5df2\u7ecf\u5c06\u667a\u80fd\u5408\u7ea6\u90e8\u7f72\u5230\u4f60\u559c\u6b22\u7684\u7f51\u7edc\u4e0a\uff0c\u90a3\u4e48\u4ece\u8be5\u5408\u7ea6\u5f15\u5bfc\u4e00\u4e2a\u65b0\u7684subgraph\u53ef\u4ee5\u662f\u4e00\u4e2a\u5f88\u597d\u7684\u5f00\u59cb\u65b9\u5f0f\u3002"),(0,n.kt)("h2",{id:"\u4ece\u73b0\u6709\u7684\u5408\u7ea6\u5f00\u59cb"},"\u4ece\u73b0\u6709\u7684\u5408\u7ea6\u5f00\u59cb"),(0,n.kt)("p",null,"\u4ee5\u4e0b\u547d\u4ee4\u521b\u5efa\u4e86\u4e00\u4e2a\u5b50\u56fe\uff0c\u7528\u4e8e\u7d22\u5f15\u73b0\u6709\u5408\u7ea6\u7684\u6240\u6709\u4e8b\u4ef6\u3002 \u5b83\u5c1d\u8bd5\u4ece Etherscan \u83b7\u53d6\u5408\u7ea6 ABI\uff0c\u5982\u679c\u5931\u8d25\u5219\u8bf7\u6c42\u672c\u5730\u6587\u4ef6\u8def\u5f84\u3002 \u5982\u679c\u4efb\u4f55\u53ef\u9009\u53c2\u6570\u7f3a\u5931\uff0c\u5219\u4f1a\u5f15\u5bfc\u60a8\u901a\u8fc7\u4ea4\u4e92\u5f0f\u8868\u5355\u8fdb\u884c\u8bbe\u7f6e\u3002"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"graph init \\\n  --product subgraph-studio\n  --from-contract <CONTRACT_ADDRESS> \\\n  [--network <ETHEREUM_NETWORK>] \\\n  [--abi <FILE>] \\\n  <SUBGRAPH_SLUG> [<DIRECTORY>]\n")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"<SUBGRAPH_SLUG>")," \u662f Subgraph Studio \u4e2d\u60a8\u7684\u5b50\u56fe\u7684 ID\uff0c\u5728Subgraph\u8be6\u7ec6\u4fe1\u606f\u9875\u9762\u53ef\u4ee5\u627e\u5230\u3002"),(0,n.kt)("h2",{id:"\u4ece\u793a\u4f8b-subgraph-\u5f00\u59cb"},"\u4ece\u793a\u4f8b Subgraph \u5f00\u59cb"),(0,n.kt)("p",null,"\u7b2c\u4e8c\u79cd\u6a21\u5f0f",(0,n.kt)("inlineCode",{parentName:"p"},"graph init"),"\u652f\u6301\u4ece\u793a\u4f8b subgraph \u521b\u5efa\u65b0\u9879\u76ee\u3002 \u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u6765\u6267\u884c\u6b64\u64cd\u4f5c\uff1a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"graph init --studio <SUBGRAPH_SLUG>\n")),(0,n.kt)("p",null,"\u8be5\u793a\u4f8b\u5b50\u56fe\u57fa\u4e8eDani Grant\u7684Gravity\u5408\u7ea6\uff0c\u8be5\u5408\u7ea6\u7ba1\u7406\u7528\u6237\u5934\u50cf\u5e76\u5728\u521b\u5efa\u6216\u66f4\u65b0\u5934\u50cf\u65f6\u53d1\u51fa ",(0,n.kt)("inlineCode",{parentName:"p"},"NewGravatar")," \u6216 ",(0,n.kt)("inlineCode",{parentName:"p"},"UpdateGravatar")," \u4e8b\u4ef6\u3002 \u8be5\u5b50\u56fe\u901a\u8fc7\u5c06",(0,n.kt)("inlineCode",{parentName:"p"},"Gravatar"),"\u5b9e\u4f53\u5199\u5165\u56fe\u8282\u70b9\u5b58\u50a8\u6765\u5904\u7406\u8fd9\u4e9b\u4e8b\u4ef6\uff0c\u5e76\u6839\u636e\u4e8b\u4ef6\u786e\u4fdd\u8fd9\u4e9b\u5b9e\u4f53\u88ab\u66f4\u65b0\u3002 \u4ee5\u4e0b\u7ae0\u8282\u5c06\u4ecb\u7ecd\u6784\u6210\u6b64\u793a\u4f8b\u5b50\u56fe\u7684\u6587\u4ef6\u3002"),(0,n.kt)("h2",{id:"\u5728\u73b0\u6709\u7684-subgraph-\u4e2d\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u6e90"},"\u5728\u73b0\u6709\u7684 Subgraph \u4e2d\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u6e90"),(0,n.kt)("p",null,"\u81ea\u4ece",(0,n.kt)("inlineCode",{parentName:"p"},"v0.31.0"),"\uff0c",(0,n.kt)("inlineCode",{parentName:"p"},"graph-cli"),"\u652f\u6301\u901a\u8fc7",(0,n.kt)("inlineCode",{parentName:"p"},"graph add"),"\u547d\u4ee4\u5c06\u65b0\u7684\u6570\u636e\u6e90\u6dfb\u52a0\u5230\u73b0\u6709\u7684\u5b50\u56fe\u4e2d\u3002"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'graph add <address> [<subgraph-manifest default: "./subgraph.yaml">]\n\nOptions:\n\n      --abi <path>              Path to the contract ABI (default: download from Etherscan)\n      --contract-name           Name of the contract (default: Contract)\n      --merge-entities          Whether to merge entities with the same name (default: false)\n      --network-file <path>     Networks config file path (default: "./networks.json")\n')),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"add"),"\u547d\u4ee4\u5c06\u4eceEtherscan\u83b7\u53d6ABI\uff08\u9664\u975e\u4f7f\u7528",(0,n.kt)("inlineCode",{parentName:"p"},"--abi"),"\u9009\u9879\u6307\u5b9aABI\u8def\u5f84\uff09\uff0c\u5e76\u4ee5\u4e0e",(0,n.kt)("inlineCode",{parentName:"p"},"graph init"),"\u547d\u4ee4\u521b\u5efa",(0,n.kt)("inlineCode",{parentName:"p"},"dataSource``--from-contract"),"\u76f8\u540c\u7684\u65b9\u5f0f\u521b\u5efa\u65b0\u7684",(0,n.kt)("inlineCode",{parentName:"p"},"dataSource"),"\uff0c\u5e76\u76f8\u5e94\u5730\u66f4\u65b0\u67b6\u6784\u548c\u6620\u5c04\u3002"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"--merge-entities")," \u9009\u9879\u6307\u5b9a\u4e86\u5f00\u53d1\u8005\u5e0c\u671b\u5982\u4f55\u5904\u7406\u5b9e\u4f53\u548c\u4e8b\u4ef6\u540d\u79f0\u51b2\u7a81\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5982\u679c\u8bbe\u7f6e\u4e3a",(0,n.kt)("inlineCode",{parentName:"li"},"true"),"\uff1a\u65b0\u7684",(0,n.kt)("inlineCode",{parentName:"li"},"dataSource"),"\u5e94\u8be5\u4f7f\u7528\u73b0\u6709\u7684",(0,n.kt)("inlineCode",{parentName:"li"},"eventHandlers"),"\u548c",(0,n.kt)("inlineCode",{parentName:"li"},"entities"),"\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u5982\u679c\u8bbe\u7f6e\u4e3a",(0,n.kt)("inlineCode",{parentName:"li"},"false"),"\uff0c\u5c06\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5b9e\u4f53\u548c\u4e8b\u4ef6\u5904\u7406\u7a0b\u5e8f\uff0c\u5176\u540d\u79f0\u5c06\u4e3a",(0,n.kt)("inlineCode",{parentName:"li"},"${dataSourceName}{EventName}"),"\u3002")),(0,n.kt)("p",null,"\u5408\u7ea6\u7684 address \u5c06\u4f1a\u88ab\u5199\u5165\u5230\u76f8\u5e94\u7f51\u7edc\u7684 networks.json \u6587\u4ef6\u4e2d\u3002"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u4f7f\u7528\u4ea4\u4e92\u5f0f\u547d\u4ee4\u884c\u754c\u9762\u65f6\uff0c\u5728\u6210\u529f\u8fd0\u884cgraph init\u4e4b\u540e\uff0c\u60a8\u5c06\u88ab\u63d0\u793a\u6dfb\u52a0\u65b0\u7684\u6570\u636e\u6e90\u3002")))}d.isMDXComponent=!0}}]);