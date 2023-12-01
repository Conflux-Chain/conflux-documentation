"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[348],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=r.createContext({}),l=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(a.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,a=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=l(n),f=o,d=m["".concat(a,".").concat(f)]||m[f]||p[f]||s;return n?r.createElement(d,c(c({ref:t},u),{},{components:n})):r.createElement(d,c({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,c=new Array(s);c[0]=f;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i[m]="string"==typeof e?e:o,c[1]=i;for(var l=2;l<s;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},17661:(e,t,n)=>{n.d(t,{Z:()=>y});var r=n(67294),o=n(86010),s=n(3734),c=n(83699),i=n(2735),a=n(97325);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function u(e){let{href:t,children:n}=e;return r.createElement(c.Z,{href:t,className:(0,o.Z)("card padding--lg",l.cardContainer)},n)}function m(e){let{href:t,icon:n,title:s,description:c}=e;return r.createElement(u,{href:t},r.createElement("h2",{className:(0,o.Z)("text--truncate",l.cardTitle),title:s},n," ",s),c&&r.createElement("p",{className:(0,o.Z)("text--truncate",l.cardDescription),title:c},c))}function p(e){let{item:t}=e;const n=(0,s.Wl)(t);return n?r.createElement(m,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,a.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,i.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,s.xz)(t.docId??void 0);return r.createElement(m,{href:t.href,icon:n,title:t.label,description:t.description??o?.description})}function d(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(f,{item:t});case"category":return r.createElement(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function h(e){let{className:t}=e;const n=(0,s.jA)();return r.createElement(y,{items:n.items,className:t})}function y(e){const{items:t,className:n}=e;if(!t)return r.createElement(h,e);const c=(0,s.MN)(t);return r.createElement("section",{className:(0,o.Z)("row",n)},c.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(d,{item:e})))))}},37905:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>c,metadata:()=>a,toc:()=>u});var r=n(87462),o=(n(67294),n(3905)),s=n(17661);const c={sidebar_position:2,title:"Consensus",displayed_sidebar:"generalSidebar"},i=void 0,a={unversionedId:"general/conflux-basics/consensus-mechanisms/consensus-mechanisms",id:"general/conflux-basics/consensus-mechanisms/consensus-mechanisms",title:"Consensus",description:"\u5728\u533a\u5757\u94fe\u4e2d\uff0c\u5171\u8bc6\u6307\u7684\u662f\u7f51\u7edc\u4e2d\u6240\u6709\u8282\u70b9\u5bf9\u8d26\u672c\u5f53\u524d\u72b6\u6001\u8fbe\u6210\u4e00\u81f4\u7684\u8fc7\u7a0b\u3002 \u4e3a\u4e86\u5b9e\u73b0\u5171\u8bc6\uff0c\u7f51\u7edc\u4e2d\u7684\u6bcf\u4e2a\u8282\u70b9\u5fc5\u987b\u9a8c\u8bc1\u548c\u786e\u8ba4\u6dfb\u52a0\u5230\u533a\u5757\u94fe\u4e0a\u7684\u65b0\u4ea4\u6613\u662f\u6709\u6548\u7684\uff0c\u5e76\u9075\u5faa\u534f\u8bae\u7684\u89c4\u5219\u3002 This process is typically achieved through a consensus algorithm, such as Proof of Work or Proof of Stake, which incentivizes nodes to maintain the consistency and availability of the blockchain.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/conflux-basics/consensus-mechanisms/consensus-mechanisms.md",sourceDirName:"general/conflux-basics/consensus-mechanisms",slug:"/general/conflux-basics/consensus-mechanisms/",permalink:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Consensus",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"What is Conflux?",permalink:"/zh-CN/docs/general/conflux-basics/what-is-conflux"},next:{title:"\u5de5\u4f5c\u91cf\u8bc1\u660e\uff08PoW\uff09",permalink:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/"}},l={},u=[],m={toc:u},p="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u5728\u533a\u5757\u94fe\u4e2d\uff0c",(0,o.kt)("strong",{parentName:"p"},"\u5171\u8bc6"),"\u6307\u7684\u662f\u7f51\u7edc\u4e2d\u6240\u6709\u8282\u70b9\u5bf9\u8d26\u672c\u5f53\u524d\u72b6\u6001\u8fbe\u6210\u4e00\u81f4\u7684\u8fc7\u7a0b\u3002 \u4e3a\u4e86\u5b9e\u73b0\u5171\u8bc6\uff0c\u7f51\u7edc\u4e2d\u7684\u6bcf\u4e2a\u8282\u70b9\u5fc5\u987b\u9a8c\u8bc1\u548c\u786e\u8ba4\u6dfb\u52a0\u5230\u533a\u5757\u94fe\u4e0a\u7684\u65b0\u4ea4\u6613\u662f\u6709\u6548\u7684\uff0c\u5e76\u9075\u5faa\u534f\u8bae\u7684\u89c4\u5219\u3002 This process is typically achieved through a consensus algorithm, such as Proof of Work or Proof of Stake, which incentivizes nodes to maintain the consistency and availability of the blockchain."),(0,o.kt)("p",null,"Consensus is critical to the security and trustworthiness of the blockchain, as it ensures that all participants in the network have a consistent view of the state of the ledger and that new transactions will be appended to the blockchain."),(0,o.kt)("p",null,"Conflux\u7684\u5171\u8bc6\u662f\u4e00\u79cd\u7ed3\u5408\u4e86PoW\u548cPoS\u7684\u6df7\u5408\u673a\u5236\u3002 PoW\u77ff\u5de5\u4ea7\u751f\u533a\u5757\uff0c\u5e76\u4f7f\u7528\u6811\u56fe\u7b97\u6cd5\u5bf9\u5b83\u4eec\u8fdb\u884c\u6392\u5e8f\uff0c\u5b9e\u73b0\u9ad8\u541e\u5410\u91cf\u548c\u53ef\u6269\u5c55\u6027\u3002 PoS\u8282\u70b9\u5bf9\u4e3b\u94fe\u533a\u5757\u8fdb\u884c\u7b7e\u540d\u4ee5\u786e\u5b9a\u5b83\u4eec\uff0c\u4ece\u800c\u964d\u4f4e\u5206\u53c9\u6982\u7387\u3002 PoS\u8282\u70b9\u662f\u6839\u636e\u5df2\u8d28\u62bc\u7684CFX\u4ee3\u5e01\u6765\u9009\u62e9\u7684\uff0c\u8fd9\u80fd\u6fc0\u52b1PoS\u8282\u70b9\u8bda\u5b9e\u5730\u884c\u4e8b\u3002 PoW/PoS\u5171\u8bc6\u4f7f\u5f97Conflux\u80fd\u591f\u5728\u4e0d\u727a\u7272\u53bb\u4e2d\u5fc3\u5316\u7684\u60c5\u51b5\u4e0b\u5b9e\u73b0\u9ad8\u6027\u80fd\u3002"),(0,o.kt)(s.Z,{mdxType:"DocCardList"}))}f.isMDXComponent=!0}}]);