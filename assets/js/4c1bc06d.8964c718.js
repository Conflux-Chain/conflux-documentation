"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[30],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>f});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(a),m=r,f=c["".concat(s,".").concat(m)]||c[m]||d[m]||l;return a?n.createElement(f,o(o({ref:t},p),{},{components:a})):n.createElement(f,o({ref:t},p))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[c]="string"==typeof e?e:r,o[1]=i;for(var u=2;u<l;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},45e3:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var n=a(87462),r=(a(67294),a(3905));const l={sidebar_position:1,title:"use-wallet",displayed_sidebar:"generalSidebar"},o="use-wallet Library",i={unversionedId:"general/build/tools/use-wallet",id:"general/build/tools/use-wallet",title:"use-wallet",description:"Introduction",source:"@site/docs/general/build/tools/use-wallet.md",sourceDirName:"general/build/tools",slug:"/general/build/tools/use-wallet",permalink:"/docs/general/build/tools/use-wallet",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/build/tools/use-wallet.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"use-wallet",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Tools",permalink:"/docs/category/tools"},next:{title:"Web3 Paywall",permalink:"/docs/general/build/tools/web3paywall"}},s={},u=[{value:"Introduction",id:"introduction",level:2},{value:"Benefits and Features",id:"benefits-and-features",level:2},{value:"Installation",id:"installation",level:2},{value:"Basic Usage",id:"basic-usage",level:2}],p={toc:u},c="wrapper";function d(e){let{components:t,...a}=e;return(0,r.kt)(c,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"use-wallet-library"},"use-wallet Library"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"use-wallet is a front-end-view wallet hooks library designed for lightweight decentralized application (DApp) development. It only encapsulates the wallet injection in the window provider. If you need more complete and powerful support, js-conflux-sdk or web3.js will be more suitable. It serves as a simpler way to 'use' wallet in web development."),(0,r.kt)("h2",{id:"benefits-and-features"},"Benefits and Features"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Supports Multiple Chains, Wallets, and Frameworks:")," The use-wallet library can support any chain, any wallet, and any framework. It currently supports the React and Vue3 frameworks, and the Conflux and Ethereum chains. For wallets, it supports Portal, Fluent, MetaMask, MetaX, and CoinBase."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Easy to Use:")," The library provides high-level encapsulation, meaning you don't need to pay attention to the provider and other specification-oriented concepts. As a front-end developer, you can focus on hooks and functions and simply use them."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Fine-grained Hooks:")," The use-wallet library provides fine-grained hooks to avoid duplicate render, which is a common problem with similar hooks wrappers in the community that often return a lot of data wrapped together, causing unnecessary render."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Lightweight:")," use-wallet communicates with the wallet through the wallet-injected provider and provides some lightweight tooling methods. This means you don't need to import a large and comprehensive library like js-conflux-sdk or web3.js for many DApp development cases. The source code of the library is only 3.7kb (gzip) and 20kb when it includes decimal.js.")),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,"You can install the use-wallet library using yarn. For the React version, use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"yarn add @cfxjs/use-wallet-react\n")),(0,r.kt)("p",null,"And for the Vue3 version, use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"yarn add @cfxjs/use-wallet-vue\n")),(0,r.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,r.kt)("p",null,"Here's an example of how you can use the use-wallet library in a basic React application:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"import React, { memo, useCallback } from 'react';\nimport { useStatus, useAccount, useChainId, useBalance, connect, Unit } from '@cfxjs/use-wallet-react/conflux';\n")),(0,r.kt)("p",null,"And for Ethereum/MetaMask, you can use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"import { useStatus, ... } from '@cfxjs/use-wallet-react/ethereum/MetaMask\n")),(0,r.kt)("p",null,"For more detailed usage and API information, please refer to the official documentation and demo site:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://use-wallet.fluentwallet.dev/#/"},(0,r.kt)("strong",{parentName:"a"},"Website")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://use-wallet.fluentwallet.dev/#/api/react"},(0,r.kt)("strong",{parentName:"a"},"API Documentation")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://use-wallet.fluentwallet.dev/#/demo"},(0,r.kt)("strong",{parentName:"a"},"Demo Page")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/Conflux-Chain/use-wallet"},(0,r.kt)("strong",{parentName:"a"},"Repository"))))))}d.isMDXComponent=!0}}]);