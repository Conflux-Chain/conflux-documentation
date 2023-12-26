"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6722],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>h});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(t),f=i,h=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return t?r.createElement(h,a(a({ref:n},s),{},{components:t})):r.createElement(h,a({ref:n},s))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=f;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[d]="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},37504:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=t(87462),i=(t(67294),t(3905));const o={title:"\u8fd0\u884c\u5f52\u6863\u8282\u70b9",sidebar_position:12,displayed_sidebar:"generalSidebar"},a=void 0,l={unversionedId:"general/run-a-node/advanced-topics/running-archive-node",id:"general/run-a-node/advanced-topics/running-archive-node",title:"\u8fd0\u884c\u5f52\u6863\u8282\u70b9",description:"Conflux archive nodes store the entire history of the Conflux blockchain. This allows them to serve historical data to other nodes and applications.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/run-a-node/advanced-topics/running-archive-node.md",sourceDirName:"general/run-a-node/advanced-topics",slug:"/general/run-a-node/advanced-topics/running-archive-node",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-archive-node",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:12,frontMatter:{title:"\u8fd0\u884c\u5f52\u6863\u8282\u70b9",sidebar_position:12,displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u8fd0\u884c\u5168\u8282\u70b9",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-full-node"},next:{title:"\u8fd0\u884c\u79c1\u6709\u94fe",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-independent-chain"}},c={},u=[{value:"1. Requirements",id:"1-requirements",level:3},{value:"Hardware Requirements for Archive Node",id:"hardware-requirements-for-archive-node",level:4},{value:"File Limit",id:"file-limit",level:4},{value:"2. Configuring the Node",id:"2-configuring-the-node",level:3},{value:"2.1 Using Configuration File",id:"21-using-configuration-file",level:4},{value:"2.2 CLI Options",id:"22-cli-options",level:4},{value:"4. Running the Node",id:"4-running-the-node",level:3}],s={toc:u},d="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Conflux archive nodes store the entire history of the Conflux blockchain. This allows them to serve historical data to other nodes and applications."),(0,i.kt)("h3",{id:"1-requirements"},"1. Requirements"),(0,i.kt)("h4",{id:"hardware-requirements-for-archive-node"},"Hardware Requirements for Archive Node"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"At least 32GB of RAM."),(0,i.kt)("li",{parentName:"ul"},"A minimum of 2TB free disk space (SSD is recommended)."),(0,i.kt)("li",{parentName:"ul"},"A stable internet connection.")),(0,i.kt)("h4",{id:"file-limit"},"File Limit"),(0,i.kt)("p",null,"Open Files Limit: It's recommended to set the maximum number of open files to 10,000. On Linux, the default is 1,024, which may be insufficient. You can configure this using the following command on the Linux terminal"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"ulimit -n 10000 \n")),(0,i.kt)("h3",{id:"2-configuring-the-node"},"2. Configuring the Node"),(0,i.kt)("p",null,"Conflux nodes can be configured using either CLI options or a configuration file. If there's a discrepancy between the CLI flags and the config file, ",(0,i.kt)("strong",{parentName:"p"},"the CLI takes precedence"),"."),(0,i.kt)("h4",{id:"21-using-configuration-file"},"2.1 Using Configuration File"),(0,i.kt)("p",null,"The configuration file follows the TOML format."),(0,i.kt)("p",null,"The path for the configuration file can be set using the CLI option -config path/to/hydra.toml."),(0,i.kt)("p",null,"A default configuration file named ",(0,i.kt)("strong",{parentName:"p"},"hydra.toml")," is provided in the ",(0,i.kt)("strong",{parentName:"p"},"run")," directory, which can be used as a starting point for customization."),(0,i.kt)("p",null,"Set the ",(0,i.kt)("strong",{parentName:"p"},"node_type"),' parameter in the configuration file to "archive":'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-toml"},'node_type = "archive" \n')),(0,i.kt)("h4",{id:"22-cli-options"},"2.2 CLI Options"),(0,i.kt)("p",null,"List all CLI options by running $ ./conflux --help."),(0,i.kt)("p",null,"Most CLI options map to a setting in the TOML file. For instance, -public-address 127.0.0.1:32323 can be set in the config file under public_address."),(0,i.kt)("h3",{id:"4-running-the-node"},"4. Running the Node"),(0,i.kt)("p",null,"Start the node with the custom configuration file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"conflux --config ./run/hydra.toml \n")))}p.isMDXComponent=!0}}]);