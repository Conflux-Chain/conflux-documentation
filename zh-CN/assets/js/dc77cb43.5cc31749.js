"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[8837],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),d=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=d(e.components);return r.createElement(u.Provider,{value:n},e.children)},s="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=d(t),h=i,f=s["".concat(u,".").concat(h)]||s[h]||p[h]||o;return t?r.createElement(f,a(a({ref:n},c),{},{components:t})):r.createElement(f,a({ref:n},c))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=h;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[s]="string"==typeof e?e:i,a[1]=l;for(var d=2;d<o;d++)a[d]=t[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}h.displayName="MDXCreateElement"},37148:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var r=t(87462),i=(t(67294),t(3905));const o={title:"Running an Archive Node",sidebar_position:12,displayed_sidebar:"generalSidebar"},a="Running an Archive Node",l={unversionedId:"general/run-a-node/running-archive-node",id:"general/run-a-node/running-archive-node",title:"Running an Archive Node",description:"Introduction",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/run-a-node/running-archive-node.md",sourceDirName:"general/run-a-node",slug:"/general/run-a-node/running-archive-node",permalink:"/zh-CN/docs/general/run-a-node/running-archive-node",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:12,frontMatter:{title:"Running an Archive Node",sidebar_position:12,displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u8fd0\u884c\u5168\u8282\u70b9",permalink:"/zh-CN/docs/general/run-a-node/running-full-node"},next:{title:"Running an Independent Chain",permalink:"/zh-CN/docs/general/run-a-node/running-independent-chain"}},u={},d=[{value:"Introduction",id:"introduction",level:2},{value:"1. Node Types and Requirements",id:"1-node-types-and-requirements",level:3},{value:"1.1 Archive Node vs Full Node",id:"11-archive-node-vs-full-node",level:4},{value:"1.2 Hardware Requirements for Archive Node",id:"12-hardware-requirements-for-archive-node",level:4},{value:"2. Configuring the Node",id:"2-configuring-the-node",level:3},{value:"2.1 Using Configuration File",id:"21-using-configuration-file",level:4},{value:"2.2 CLI Options",id:"22-cli-options",level:4},{value:"4. Running the Node",id:"4-running-the-node",level:3}],c={toc:d},s="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(s,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"running-an-archive-node"},"Running an Archive Node"),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"There are three types of Conflux nodes: archivenode, fullnode, and lightnode. The distinction between these nodes is based on the amount of data they store, with the archive node storing the most data."),(0,i.kt)("h3",{id:"1-node-types-and-requirements"},"1. Node Types and Requirements"),(0,i.kt)("h4",{id:"11-archive-node-vs-full-node"},"1.1 Archive Node vs Full Node"),(0,i.kt)("p",null,"Archive Node: This node type stores the most data and is essential if you want to use it as an RPC service."),(0,i.kt)("p",null,"Full Node: Suitable for those who want to participate in mining. It stores less data compared to the archive node."),(0,i.kt)("p",null,"Light Node: Primarily used as a wallet and stores the least amount of data."),(0,i.kt)("h4",{id:"12-hardware-requirements-for-archive-node"},"1.2 Hardware Requirements for Archive Node"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A computer with a recent version of Linux or macOS.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"At least 16GB of RAM.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A minimum of 2TB free disk space (SSD is recommended).")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A stable internet connection."))),(0,i.kt)("p",null,"Open Files Limit: It's recommended to set the maximum number of open files to 10,000. On Linux, the default is 1,024, which may be insufficient. You can configure this using the following command on the Linux terminal"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"ulimit -n 10000 \n")),(0,i.kt)("h3",{id:"2-configuring-the-node"},"2. Configuring the Node"),(0,i.kt)("p",null,"Conflux nodes can be configured using either CLI options or a configuration file. If there's a discrepancy between the CLI flags and the config file, the CLI takes precedence."),(0,i.kt)("h4",{id:"21-using-configuration-file"},"2.1 Using Configuration File"),(0,i.kt)("p",null,"The configuration file follows the TOML format."),(0,i.kt)("p",null,"The path for the configuration file can be set using the CLI option -config path/to/hydra.toml."),(0,i.kt)("p",null,"A default configuration file named hydra.toml is provided in the run directory, which can be used as a starting point for customization."),(0,i.kt)("p",null,'Set the mode parameter in the configuration file to "archive":'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'mode = "archive" \n')),(0,i.kt)("h4",{id:"22-cli-options"},"2.2 CLI Options"),(0,i.kt)("p",null,"List all CLI options by running $ ./conflux --help."),(0,i.kt)("p",null,"Most CLI options map to a setting in the TOML file. For instance, -public-address 127.0.0.1:32323 can be set in the config file under public_address."),(0,i.kt)("h3",{id:"4-running-the-node"},"4. Running the Node"),(0,i.kt)("p",null,"Start the node with the custom configuration file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"./target/release/conflux --config ./run/hydra.toml \n")))}p.isMDXComponent=!0}}]);