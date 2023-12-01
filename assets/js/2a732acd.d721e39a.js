"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[684],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=i(n),m=o,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(f,l(l({ref:t},s),{},{components:n})):r.createElement(f,l({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:o,l[1]=p;for(var i=2;i<a;i++)l[i]=n[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6819:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>i});var r=n(87462),o=(n(67294),n(3905));const a={id:"txpool_rpc",sidebar_position:2,title:"txpool Namespace",keywords:["conflux","txpool-rpc","sdk"],displayed_sidebar:"coreSidebar"},l=void 0,p={unversionedId:"core/build/json-rpc/txpool_rpc",id:"core/build/json-rpc/txpool_rpc",title:"txpool Namespace",description:"txpool related RPCs which can enable developer get more info about transaction pool. Which was introduced from conflux-rust v1.1.6.",source:"@site/docs/core/build/json-rpc/txpool-namespace.md",sourceDirName:"core/build/json-rpc",slug:"/core/build/json-rpc/txpool_rpc",permalink:"/docs/core/build/json-rpc/txpool_rpc",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/core/build/json-rpc/txpool-namespace.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"txpool_rpc",sidebar_position:2,title:"txpool Namespace",keywords:["conflux","txpool-rpc","sdk"],displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"cfx Namespace",permalink:"/docs/core/build/json-rpc/cfx-namespace"},next:{title:"pos Namespace",permalink:"/docs/core/build/json-rpc/pos_rpc"}},c={},i=[{value:"RPCs",id:"rpcs",level:2},{value:"txpool_nextNonce",id:"txpool_nextnonce",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Example",id:"example",level:4}],s={toc:i},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"txpool")," related RPCs which can enable developer get more info about transaction pool. Which was introduced from ",(0,o.kt)("inlineCode",{parentName:"p"},"conflux-rust v1.1.6"),"."),(0,o.kt)("p",null,"These RPC methods require node's ",(0,o.kt)("inlineCode",{parentName:"p"},"public_rpc_apis")," config set to ",(0,o.kt)("inlineCode",{parentName:"p"},"safe")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"all"),", or the namespace include ",(0,o.kt)("inlineCode",{parentName:"p"},"txpool")),(0,o.kt)("h2",{id:"rpcs"},"RPCs"),(0,o.kt)("h3",{id:"txpool_nextnonce"},"txpool_nextNonce"),(0,o.kt)("p",null,"Return one address's next usable nonce in transaction pool."),(0,o.kt)("h4",{id:"parameters"},"Parameters"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"ADDRESS"),": CIP-37 address")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'params: [\n  "cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91"\n]\n')),(0,o.kt)("h4",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"QUANTITY")," - Account's next usable nonce"),(0,o.kt)("h4",{id:"example"},"Example"),(0,o.kt)("p",null,"Request"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'curl --location --request POST \'http://localhost:12537\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "id": 1,\n    "jsonrpc": "2.0",\n    "method": "txpool_nextNonce",\n    "params": ["cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91"]\n}\'\n')),(0,o.kt)("p",null,"Response"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "jsonrpc": "2.0",\n    "id": "15922956697249514502",\n    "result": "0x278"\n}\n')))}d.isMDXComponent=!0}}]);