"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[1969],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=l(n),k=i,u=p["".concat(s,".").concat(k)]||p[k]||m[k]||r;return n?a.createElement(u,o(o({ref:t},d),{},{components:n})):a.createElement(u,o({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=k;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:i,o[1]=c;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},70778:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var a=n(87462),i=(n(67294),n(3905));const r={sidebar_position:2,title:"Deploying an ERC-20 Token using Remix IDE",description:"Deploying an ERC-20 Token using Remix IDE",displayed_sidebar:"eSpaceSidebar"},o=void 0,c={unversionedId:"espace/tutorials/deployContract/remix",id:"espace/tutorials/deployContract/remix",title:"Deploying an ERC-20 Token using Remix IDE",description:"Deploying an ERC-20 Token using Remix IDE",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/espace/tutorials/deployContract/remix.md",sourceDirName:"espace/tutorials/deployContract",slug:"/espace/tutorials/deployContract/remix",permalink:"/zh-CN/docs/espace/tutorials/deployContract/remix",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Deploying an ERC-20 Token using Remix IDE",description:"Deploying an ERC-20 Token using Remix IDE",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"Deploying contract using hardhat and foundry",permalink:"/zh-CN/docs/espace/tutorials/deployContract/hardhatAndFoundry"},next:{title:"Deploying contract using thirdweb",permalink:"/zh-CN/docs/espace/tutorials/deployContract/thirdweb"}},s={},l=[{value:"\u6dfb\u52a0ERC-20\u4ee3\u5e01\u5230MetaMask",id:"\u6dfb\u52a0erc-20\u4ee3\u5e01\u5230metamask",level:2},{value:"\u4f7f\u7528 MetaMask \u8f6c\u79fb ERC-20 \u4ee3\u5e01",id:"\u4f7f\u7528-metamask-\u8f6c\u79fb-erc-20-\u4ee3\u5e01",level:2}],d={toc:l},p="wrapper";function m(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u5728\u4e00\u4e2a\u65b0\u6807\u7b7e\u9875\u4e2d\u6253\u5f00 Remix IDE\uff0c\u7f51\u5740\u662f",(0,i.kt)("a",{parentName:"p",href:"https://remix.ethereum.org"},"remix.ethereum.org"),"\u3002 \u5b83\u53ef\u80fd\u9700\u8981\u4e00\u5206\u949f\u624d\u80fd\u52a0\u8f7d\uff0c\u4f46\u4e00\u65e6\u52a0\u8f7d\u5b8c\u6210\uff0c\u8bf7\u5728\u5de6\u4fa7\u7684\u5de5\u4f5c\u533a\u9762\u677f\u4e2d\u521b\u5efa\u4e00\u4e2a\u540d\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"ERC20Token.sol")," \u7684\u65b0\u6587\u4ef6\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-new-file",src:n(30729).Z,width:"678",height:"364"})),(0,i.kt)("p",null,"\u5c06\u4ee5\u4e0b\u4ee3\u7801\u590d\u5236\u5e76\u7c98\u8d34\u5230\u4e2d\u592e\u7684\u7f16\u8f91\u5668\u9762\u677f\u4e2d\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},'// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\nimport "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";\n\ncontract MyToken is ERC20 {\n    constructor (string memory name, string memory symbol) ERC20(name, symbol) {\n        // Mint 10000 tokens to msg.sender\n        // Similar to how 1 dollar = 100 cents\n        // 1 token = 1 * (10 ** decimals)\n        _mint(msg.sender, 10000 * 10 ** uint(decimals()));\n    }\n}\n')),(0,i.kt)("p",null,"\u70b9\u51fb\u5de6\u4fa7\u9762\u677f\u6700\u5de6\u4fa7\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"Solidity Compile"),"\u6309\u94ae(\u7b2c\u4e8c\u4e2a\u5411\u4e0b\u7684\u56fe\u6807)\uff1b \u786e\u4fdd\u60a8\u9009\u62e9\u7684Solidity\u7f16\u8bd1\u5668\u7248\u672c\u4e3a0.8(0.8\u5185\u7684\u6b21\u8981\u7248\u672c\uff0c\u4f8b\u59820.8.4\u4e5f\u53ef\u4ee5)\uff0c\u7136\u540e\u70b9\u51fb",(0,i.kt)("inlineCode",{parentName:"p"},"Compile ERC20Token.sol"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-solidity-compile",src:n(7283).Z,width:"1228",height:"548"})),(0,i.kt)("p",null,"\u4e00\u65e6\u5408\u7ea6\u7f16\u8bd1\u5b8c\u6210\uff0c\u70b9\u51fb\u6700\u5de6\u4fa7\u9762\u677f\u4e0a\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"Deploy & run transactions"),"\u6309\u94ae(Solidity\u7f16\u8bd1\u5668\u4e0b\u9762\u7684\u56fe\u6807)\u3002 \u5728\u5de6\u4fa7\u9762\u677f\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT"),"\u4e0b\u62c9\u83dc\u5355\u4e2d\uff0c\u9009\u62e9 ",(0,i.kt)("inlineCode",{parentName:"p"},"Injected Web3"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-inject-web3",src:n(59972).Z,width:"367",height:"455"})),(0,i.kt)("p",null,"\u4f60\u5c06\u4f1a\u770b\u5230\u4e00\u4e2a MetaMask \u5f39\u7a97\uff0c\u8bf7\u6c42\u4f60\u5141\u8bb8 Remix IDE \u8bbf\u95ee\u5b83\u3002 \u70b9\u51fb ",(0,i.kt)("inlineCode",{parentName:"p"},"Next")," \u7136\u540e ",(0,i.kt)("inlineCode",{parentName:"p"},"Connect")," \u4ee5\u6388\u4e88\u8bbf\u95ee\u6743\u9650\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-connect-metamask",src:n(21665).Z,width:"735",height:"574"})),(0,i.kt)("p",null,"\u5728Remix\u754c\u9762\u4e2d\uff0c\u70b9\u51fb\u5de6\u4fa7\u9762\u677f\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"DEPLOY"),"\u90e8\u5206\u65c1\u8fb9\u7684\u7bad\u5934\u3002 \u586b\u5199\u4ee3\u5e01\u8be6\u60c5\uff0c\u53ef\u6839\u636e\u81ea\u5df1\u7684\u559c\u597d\u586b\u5199(\u5728\u793a\u4f8b\u4e2d\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"GoldenToken"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"GLD"),")\uff0c\u7136\u540e\u70b9\u51fb",(0,i.kt)("inlineCode",{parentName:"p"},"transact"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-deploy-contract",src:n(41324).Z,width:"360",height:"566"})),(0,i.kt)("p",null,"\u53e6\u4e00\u4e2a MetaMask \u5f39\u51fa\u7a97\u53e3\u5c06\u4f1a\u8981\u6c42\u60a8\u786e\u8ba4\u4ea4\u6613\u3002 \u70b9\u51fb ",(0,i.kt)("inlineCode",{parentName:"p"},"\u786e\u8ba4"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-deploy-contract-metamask-confirm",src:n(61581).Z,width:"340",height:"579"})),(0,i.kt)("p",null,"\u51e0\u5206\u949f\u540e\uff0c\u4ea4\u6613\u5c06\u7531\u7f51\u7edc\u786e\u8ba4\u3002 \u4f60\u5c06\u5728\u5e95\u90e8\u9762\u677f\u770b\u5230\u4e00\u4e2a\u6210\u529f\u7684\u6d88\u606f\uff0c\u4ee5\u53ca\u5de6\u8fb9\u9762\u677f\u4e0b\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"Deployed Contracts"),"\u5217\u8868\u4e0b\u770b\u5230\u8be5\u5408\u7ea6\u3002 \u70b9\u51fb\u590d\u5236\u6309\u94ae\u590d\u5236\u65b0\u90e8\u7f72\u5408\u7ea6\u7684\u5730\u5740\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Remix-deploy-contract-confirmed",src:n(28313).Z,width:"1817",height:"254"})),(0,i.kt)("p",null,"\u73b0\u5728\uff0c\u5408\u7ea6\u5df2\u7ecf\u90e8\u7f72\u5230\u4e86Conflux eSpace\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7MetaMask\u4e0e\u5176\u8fdb\u884c\u4ea4\u4e92\u3002"),(0,i.kt)("h2",{id:"\u6dfb\u52a0erc-20\u4ee3\u5e01\u5230metamask"},"\u6dfb\u52a0ERC-20\u4ee3\u5e01\u5230MetaMask"),(0,i.kt)("p",null,"\u5728 MetaMask \u754c\u9762\u4e2d(\u786e\u4fdd\u9009\u62e9\u7684\u662f Conflux EVM Testnet \u7f51\u7edc)\uff0c\u70b9\u51fb",(0,i.kt)("inlineCode",{parentName:"p"},"Add Token"),"\u6309\u94ae\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-add-token-button",src:n(40915).Z,width:"1938",height:"1034"})),(0,i.kt)("p",null,"\u5c06\u4ece\u4e0a\u4e00\u6b65\u4e2d\u4eceRemix\u4e2d\u590d\u5236\u7684\u4ee3\u5e01\u5730\u5740\u7c98\u8d34\u5230\u6b64\u5904\u3002 \u5269\u4f59\u7684\u4ee3\u5e01\u8be6\u7ec6\u4fe1\u606f\u4f1a\u81ea\u52a8\u586b\u5145\uff0c\u56e0\u4e3a MetaMask \u5728\u94fe\u4e0a\u627e\u5230\u4e86\u8be5\u5408\u7ea6\u3002 \u70b9\u51fb ",(0,i.kt)("inlineCode",{parentName:"p"},"Next"),":"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-add-token",src:n(91460).Z,width:"340",height:"532"})),(0,i.kt)("p",null,"\u5728\u4e0b\u4e00\u4e2a\u754c\u9762\u4e0a\uff0c\u60a8\u5c06\u770b\u5230\u4f59\u989d(100\u4e2a\u4ee3\u5e01)\uff0c\u8fd9\u662f\u5728\u6211\u4eec\u7684\u5408\u7ea6\u6784\u9020\u51fd\u6570\u4e2d\u521b\u5efa\u7684\u3002 \u70b9\u51fb",(0,i.kt)("inlineCode",{parentName:"p"},"Add Tokens"),"\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-add-token-confirm",src:n(50598).Z,width:"340",height:"545"})),(0,i.kt)("p",null,"\u4ee3\u5e01\u5df2\u7ecf\u6210\u529f\u6dfb\u52a0\u5230\u4e86 MetaMask \u4e2d\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 MetaMask \u754c\u9762\u67e5\u770b\u4ee3\u5e01\u4f59\u989d\uff0c\u5e76\u5c06\u4ee3\u5e01\u8f6c\u79fb\u5230\u5176\u4ed6\u8d26\u6237\u4e2d\u3002"),(0,i.kt)("h2",{id:"\u4f7f\u7528-metamask-\u8f6c\u79fb-erc-20-\u4ee3\u5e01"},"\u4f7f\u7528 MetaMask \u8f6c\u79fb ERC-20 \u4ee3\u5e01"),(0,i.kt)("p",null,"\u63a5\u7740\u4e0a\u4e00\u6b65\uff0c\u70b9\u51fbMetaMask\u754c\u9762\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"Send"),"\u6309\u94ae\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-my-token",src:n(802).Z,width:"1938",height:"1362"})),(0,i.kt)("p",null,"\u9009\u62e9\u4e00\u4e2a\u63a5\u6536\u8005(\u5982\u679c\u4f60\u5728 MetaMask \u4e2d\u6709\u591a\u4e2a\u8d26\u6237\uff0c\u53ef\u4ee5\u9009\u62e9\u53e6\u4e00\u4e2a\u8d26\u6237)\uff0c\u7136\u540e\u9009\u62e9\u8981\u53d1\u9001\u7684\u4ee3\u5e01\u6570\u91cf\u3002 \u70b9\u51fb ",(0,i.kt)("inlineCode",{parentName:"p"},"Next"),":"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-send-my-token",src:n(74390).Z,width:"340",height:"539"})),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"\u540c\u6837\u5730\uff0c\u71c3\u6c14\u4ef7\u683c\u5e94\u8be5\u8bbe\u7f6e\u4e3a\u96f6\uff0c\u4f46\u662f\u8fd9\u5c06\u4f1a\u968f\u7740\u65f6\u95f4\u7684\u63a8\u79fb\u800c\u6539\u53d8\u3002")),(0,i.kt)("p",null,"\u70b9\u51fb ",(0,i.kt)("inlineCode",{parentName:"p"},"Confirm")," \u53d1\u9001\u4ea4\u6613\u5230\u7f51\u7edc\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-send-my-token-confirm",src:n(15157).Z,width:"340",height:"544"})),(0,i.kt)("p",null,"\u51e0\u5206\u949f\u540e\uff0c\u4ea4\u6613\u5c06\u7531\u7f51\u7edc\u786e\u8ba4\u3002 \u60a8\u53ef\u4ee5\u5728 MetaMask \u754c\u9762\u4e2d\u770b\u5230\u60a8\u7684\u8d26\u6237\u6240\u6301\u6709\u7684\u66f4\u65b0\u540e\u7684\u4f59\u989d\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-my-token-sent-account1",src:n(91260).Z,width:"1926",height:"1372"})),(0,i.kt)("p",null,"\u5982\u679c\u60a8\u5c06\u4ee3\u5e01\u8f6c\u79fb\u5230\u60a8\u62e5\u6709\u7684\u53e6\u4e00\u4e2a MetaMask \u8d26\u6237\uff0c\u5219\u53ef\u4ee5\u6309\u7167\u524d\u9762\u63d0\u5230\u7684\u5c06\u4ee3\u5e01\u6dfb\u52a0\u5230 MetaMask \u4e0a\u7684\u6b65\u9aa4\uff0c\u5728\u5176\u4ed6\u8d26\u6237\u4e0a\u67e5\u770b\u5b83\u7684\u4f59\u989d\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MetaMask-add-token-account2",src:n(17842).Z,width:"1912",height:"784"})))}m.isMDXComponent=!0},40915:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/metam-import-token-b2a756a7a4ed3ac17f1a75fca77bf738-b2a756a7a4ed3ac17f1a75fca77bf738.png"},91460:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/mm-import-token-short-1-71f005c4fdb996d2a4b5651ceb6bc7bd-71f005c4fdb996d2a4b5651ceb6bc7bd.png"},50598:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/mm-import-token-short-2-675291201c0f55a6a0603edad9544335.png"},17842:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/mm-token-balance-changed-c59c6e2434009c0dcb6e03ef79ba5e60-c59c6e2434009c0dcb6e03ef79ba5e60.png"},21665:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_connect_with_metamask-9d8214740f372d3b41e489cbe23c5884-9d8214740f372d3b41e489cbe23c5884-9d8214740f372d3b41e489cbe23c5884.png"},41324:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_deploy_contract-6423d60330003a7ffc0dc28ee5cd8178-6423d60330003a7ffc0dc28ee5cd8178-6423d60330003a7ffc0dc28ee5cd8178.png"},28313:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_deploy_contract_confirmed-59390e985747c30736f46356a88b4ff1-59390e985747c30736f46356a88b4ff1-59390e985747c30736f46356a88b4ff1.png"},61581:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_deploy_contract_metamask_confirm-6b4f8c2a751ec4a4b6ad9df96584c623-6b4f8c2a751ec4a4b6ad9df96584c623-6b4f8c2a751ec4a4b6ad9df96584c623.png"},59972:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_injected_web3-dbb0d671a1703239451d7d4e133f68ba-dbb0d671a1703239451d7d4e133f68ba-dbb0d671a1703239451d7d4e133f68ba.png"},30729:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_new_file-1-15cadba3e578d16df451448175231e8b.png"},7283:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/remix_solidity_compile-1f459820c9caef73c47d3af1c87e71a6-1f459820c9caef73c47d3af1c87e71a6-1f459820c9caef73c47d3af1c87e71a6.png"},74390:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/send-gld-1-da8b6feee94ca0dfe89afc5118267c89-da8b6feee94ca0dfe89afc5118267c89.jpeg"},15157:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/send-gld-confirm-7789e263d3d53e45e2e4bebbf1d057cb-7789e263d3d53e45e2e4bebbf1d057cb.jpeg"},802:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/start-send-gld-b56abfa83bb02864b94c3a5adcbcc0d0-b56abfa83bb02864b94c3a5adcbcc0d0.jpeg"},91260:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/token-transfer-balance-changed-24a5b4588118295da68d10d9a3cea0cf-24a5b4588118295da68d10d9a3cea0cf.jpeg"}}]);