"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9813],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),u=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=u(t),m=a,f=d["".concat(p,".").concat(m)]||d[m]||s[m]||l;return t?r.createElement(f,o(o({ref:n},c),{},{components:t})):r.createElement(f,o({ref:n},c))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=m;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var u=2;u<l;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},86273:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var r=t(87462),a=(t(67294),t(3905));const l={sidebar_position:11,title:"\u8fd0\u884c\u5168\u8282\u70b9",displayed_sidebar:"generalSidebar"},o=void 0,i={unversionedId:"general/run-a-node/advanced-topics/running-full-node",id:"general/run-a-node/advanced-topics/running-full-node",title:"\u8fd0\u884c\u5168\u8282\u70b9",description:"Requirements",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/run-a-node/advanced-topics/running-full-node.md",sourceDirName:"general/run-a-node/advanced-topics",slug:"/general/run-a-node/advanced-topics/running-full-node",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-full-node",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:11,frontMatter:{sidebar_position:11,title:"\u8fd0\u884c\u5168\u8282\u70b9",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u8fd0\u884c\u8f7b\u8282\u70b9",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-light-node"},next:{title:"\u8fd0\u884c\u5f52\u6863\u8282\u70b9",permalink:"/zh-CN/docs/general/run-a-node/advanced-topics/running-archive-node"}},p={},u=[{value:"Requirements",id:"requirements",level:3},{value:"\u914d\u7f6e Conflux \u5168\u8282\u70b9",id:"\u914d\u7f6e-conflux-\u5168\u8282\u70b9",level:2},{value:"\u8fd0\u884c\u6d4b\u8bd5",id:"\u8fd0\u884c\u6d4b\u8bd5",level:2}],c={toc:u},d="wrapper";function s(e){let{components:n,...t}=e;return(0,a.kt)(d,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"requirements"},"Requirements"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"At least 16GB of RAM.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"A minimum of 1TB free disk space (SSD is recommended).")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"A stable internet connection."))),(0,a.kt)("h2",{id:"\u914d\u7f6e-conflux-\u5168\u8282\u70b9"},"\u914d\u7f6e Conflux \u5168\u8282\u70b9"),(0,a.kt)("p",null,"Conflux \u53ef\u4ee5\u4f7f\u7528 CLI \u9009\u9879\u6216\u914d\u7f6e\u6587\u4ef6\u8fdb\u884c\u914d\u7f6e\u3002 \u5982\u679c CLI \u6807\u5fd7\u548c\u914d\u7f6e\u6587\u4ef6\u5728\u8bbe\u7f6e\u4e0a\u6709\u5206\u6b67\uff0cCLI \u4f18\u5148\u3002"),(0,a.kt)("p",null,"\u914d\u7f6e\u6587\u4ef6\u9075\u5faa ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/toml-lang/toml"},"TOML "),"\u683c\u5f0f\u3002 \u914d\u7f6e\u6587\u4ef6\u7684\u8def\u5f84\u53ef\u4ee5\u4f7f\u7528 CLI \u9009\u9879",(0,a.kt)("inlineCode",{parentName:"p"},"--config path/to/conflux.toml"),"\u8bbe\u7f6e\u3002 \u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"run")," \u76ee\u5f55\u4e2d\u63d0\u4f9b\u4e86\u4e00\u4e2a\u9ed8\u8ba4\u7684\u914d\u7f6e\u6587\u4ef6",(0,a.kt)("inlineCode",{parentName:"p"}," hydra.toml"),"\uff0c\u5e76\u5bf9\u6bcf\u4e2a\u914d\u7f6e\u8fdb\u884c\u4e86\u89e3\u91ca\uff0c\u60a8\u53ef\u4ee5\u4ece\u90a3\u91cc\u5f00\u59cb\u5b9a\u5236\u60a8\u7684\u914d\u7f6e\u3002"),(0,a.kt)("p",null,"\u60a8\u53ef\u4ee5\u901a\u8fc7\u8fd0\u884c",(0,a.kt)("inlineCode",{parentName:"p"},"$ ./conflux --help"),"\u5217\u51fa\u6240\u6709 CLI \u9009\u9879\u3002 \u7edd\u5927\u591a\u6570 CLI \u9009\u9879\u90fd\u6620\u5c04\u5230 TOML \u6587\u4ef6\u4e2d\u7684\u8bbe\u7f6e\uff0c\u4f8b\u5982\u53ef\u4ee5\u901a\u8fc7\u521b\u5efa\u914d\u7f6e\u6587\u4ef6\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"--public-address 127.0.0.1:32323\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'public_address="127.0.0.1:32323"\n')),(0,a.kt)("p",null,"\u5982\u679c\u60a8\u6253\u7b97\u8bbe\u7f6e\u4e00\u4e2a\u8282\u70b9\u5e76\u8ba9\u5b83\u52a0\u5165 Conflux \u4e3b\u7f51\uff08\u6d4b\u8bd5\u7f51\uff09\uff0c\u60a8\u9700\u8981\u9002\u5f53\u5730\u8bbe\u7f6e",(0,a.kt)("inlineCode",{parentName:"p"}," public_address"),"\u3002 \u5b83\u5e94\u8be5\u8bbe\u7f6e\u4e3a\u60a8\u7684\u8282\u70b9\u7684 IP \u5730\u5740\uff0c\u53ef\u4ee5\u4ece\u4e92\u8054\u7f51\u516c\u5f00\u8bbf\u95ee\u3002 \u5982\u679c\u60a8\u7684\u8282\u70b9\u4f4d\u4e8e\u516c\u5171\u7f51\u5173\u4e0b\uff0c\u60a8\u53ef\u4ee5\u901a\u8fc7\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://www.google.com"},"Google "),'\u4e2d\u641c\u7d22 "ip" \u83b7\u53d6\u5176\u516c\u5171\u5730\u5740\u3002'),(0,a.kt)("p",null,"\u5982\u679c\u60a8\u60f3\u8ba9\u60a8\u7684\u8282\u70b9\u53c2\u4e0e\u6316\u77ff\u8fc7\u7a0b\uff0c\u60a8\u9700\u8981\u901a\u8fc7\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"start_mining"),' \u4e3a "true" \u4ee5\u53ca',(0,a.kt)("inlineCode",{parentName:"p"}," mining_author")," \u4e3a\u63a5\u6536\u6316\u77ff\u5956\u52b1\u7684\u5e10\u6237\u5730\u5740\u6765\u542f\u7528\u5b83\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u60a8\u60f3\u6253\u5f00 http \u6216 websocket RPC\uff0c\u60a8\u9700\u8981\u901a\u8fc7\u8bbe\u7f6e",(0,a.kt)("inlineCode",{parentName:"p"},"jsonrpc_http_port"),"\u6216",(0,a.kt)("inlineCode",{parentName:"p"}," jsonrpc_ws_port")," \u6765\u542f\u7528\u5b83\u3002 ",(0,a.kt)("strong",{parentName:"p"},"\u8bf7\u6ce8\u610f\uff0c\u4e3a\u4e86\u63d0\u4f9b\u4e0e\u4ea4\u6613\u76f8\u5173\u7684 RPC\uff0c",(0,a.kt)("inlineCode",{parentName:"strong"},"persist_tx_index")," \u4e5f\u5e94\u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"strong"},"true"),"\uff0c\u5426\u5219\u8282\u70b9\u53ea\u80fd\u5904\u7406\u975e\u5e38\u8fd1\u671f\u7684\u4ea4\u6613\u3002")),(0,a.kt)("h2",{id:"\u8fd0\u884c\u6d4b\u8bd5"},"\u8fd0\u884c\u6d4b\u8bd5"),(0,a.kt)("p",null,"\u6211\u4eec\u6709\u7528 Rust \u7f16\u5199\u7684\u5355\u5143\u6d4b\u8bd5\u548c\u7528 Python \u7f16\u5199\u7684\u96c6\u6210\u6d4b\u8bd5\u3002 \u5728\u5bf9\u4ee3\u7801\u8fdb\u884c\u4e00\u4e9b\u4fee\u6539\u540e\uff0c\u60a8\u53ef\u4ee5\u8fd0\u884c\u8fd9\u4e9b\u6d4b\u8bd5\uff0c\u770b\u770b\u7cfb\u7edf\u662f\u5426\u4ecd\u7136\u6b63\u5e38\u8fd0\u884c\u3002"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u60a8\u9700\u8981\u6309\u7167\u5b89\u88c5\u6d4b\u8bd5\u4f9d\u8d56\u9879\u4e2d\u7684\u8bf4\u660e",(0,a.kt)("a",{parentName:"p",href:"/zh-CN/docs/general/run-a-node/advanced-topics/compiling-conflux-client#install-test-dependencies"},"\u5b89\u88c5\u4f9d\u8d56\u9879"),"\u3002"),(0,a.kt)("p",null,"\u7136\u540e\uff0c\u60a8\u53ef\u4ee5\u6309\u4ee5\u4e0b\u65b9\u5f0f\u8fd0\u884c\u6d4b\u8bd5"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Linux"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"  $ ./dev-support/test.sh\n")),(0,a.kt)("p",{parentName:"li"},"  \u8fd9\u5c06\u81ea\u52a8\u8fd0\u884c\u6211\u4eec Rust \u4ee3\u7801\u4e2d\u7684\u5355\u5143\u6d4b\u8bd5\u548c python \u6d4b\u8bd5\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5176\u4ed6"),(0,a.kt)("p",{parentName:"li"},"  \u8fd0\u884c Rust \u4e2d\u7684\u5355\u5143\u6d4b\u8bd5\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"  $ cargo test --release --all\n")),(0,a.kt)("p",{parentName:"li"},"  \u8fd0\u884c python \u96c6\u6210\u6d4b\u8bd5\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"  $ ./tests/test_all.py\n")))))}s.isMDXComponent=!0}}]);