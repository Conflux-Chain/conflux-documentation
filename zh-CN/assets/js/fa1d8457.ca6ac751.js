"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3588],{27988:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var l=t(85893),a=t(11151),n=t(73992),i=t(18679);const s={sidebar_position:2,title:"Solidity Basics",displayed_sidebar:"generalSidebar"},o=void 0,c={id:"general/build/smart-contracts/solidity-basics",title:"Solidity Basics",description:"\u4ecb\u7ecd",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/build/smart-contracts/solidity-basics.md",sourceDirName:"general/build/smart-contracts",slug:"/general/build/smart-contracts/solidity-basics",permalink:"/zh-CN/docs/general/build/smart-contracts/solidity-basics",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Solidity Basics",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Smart Contracts Development",permalink:"/zh-CN/docs/general/build/smart-contracts/introduction-to-smart-contracts"},next:{title:"Token \u6807\u51c6",permalink:"/zh-CN/docs/general/build/smart-contracts/token-standards"}},u={},d=[{value:"\u4ecb\u7ecd",id:"\u4ecb\u7ecd",level:2},{value:"\u5176\u4ed6\u8d44\u6e90",id:"\u5176\u4ed6\u8d44\u6e90",level:2},{value:"Libraries",id:"libraries",level:2}];function p(e){const r={a:"a",em:"em",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.h2,{id:"\u4ecb\u7ecd",children:"\u4ecb\u7ecd"}),"\n",(0,l.jsx)(r.p,{children:"Solidity \u662f\u4e3a\u5728\u4ee5\u592a\u574a\u548c Conflux \u7b49\u533a\u5757\u94fe\u5e73\u53f0\u4e0a\u7f16\u5199\u667a\u80fd\u5408\u7ea6\u800c\u8bbe\u8ba1\u7684\u9ad8\u7ea7\u7f16\u7a0b\u8bed\u8a00\u3002 \u5b83\u662f\u9759\u6001\u7c7b\u578b\u7684\uff0c\u652f\u6301\u7ee7\u627f\u3001\u5e93\u4ee5\u53ca\u590d\u6742\u7684\u7528\u6237\u5b9a\u4e49\u7c7b\u578b\uff0c\u8fd9\u4e9b\u7279\u6027\u4f7f\u5176\u6210\u4e3a\u521b\u5efa\u590d\u6742\u5408\u7ea6\u7684\u6709\u529b\u5de5\u5177\u3002"}),"\n",(0,l.jsxs)(r.ul,{children:["\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"\u8bed\u8a00\u7ed3\u6784"}),"\uff1aSolidity \u7684\u8bed\u6cd5\u7c7b\u4f3c\u4e8e JavaScript\uff0c\u4f7f\u5176\u5bf9\u65b0\u5f00\u53d1\u8005\u76f8\u5bf9\u5bb9\u6613\u4e0a\u624b\u3002 \u5b83\u5305\u62ec\u53d8\u91cf\u3001\u51fd\u6570\u548c\u63a7\u5236\u7ed3\u6784\uff08\u5982 if-else\u3001\u5faa\u73af\uff09\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"Solidity \u4e2d\u7684\u667a\u80fd\u5408\u7ea6"}),"\uff1aSolidity \u4e2d\u7684\u5408\u7ea6\u662f\u4e00\u7ec4\u4ee3\u7801\u548c\u6570\u636e\u7684\u96c6\u5408\uff0c\u4f4d\u4e8e\u533a\u5757\u94fe\u4e0a\u7684\u7279\u5b9a\u5730\u5740\u3002 \u5b83\u4eec\u53ef\u4ee5\u5b9a\u4e49\u89c4\u5219\u3001\u5b58\u50a8\u6570\u636e\uff0c\u5e76\u5728\u6ee1\u8db3\u6761\u4ef6\u65f6\u81ea\u52a8\u6267\u884c\u51fd\u6570\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"\u53d8\u91cf\u548c\u7c7b\u578b"}),"\uff1aSolidity \u652f\u6301\u5305\u62ec\u6574\u6570\u3001\u5e03\u5c14\u503c\u548c\u5b57\u7b26\u4e32\u5728\u5185\u7684\u5404\u79cd\u6570\u636e\u7c7b\u578b\u3002 \u5b83\u8fd8\u652f\u6301\u6570\u7ec4\u548c\u7ed3\u6784\u4f53\u7b49\u590d\u6742\u7c7b\u578b\uff0c\u4f7f\u5f97\u5bf9\u6570\u636e\u7684\u7ba1\u7406\u66f4\u52a0\u7075\u6d3b\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"\u51fd\u6570\u548c\u4fee\u9970\u7b26"}),"\uff1a\u51fd\u6570\u662f\u667a\u80fd\u5408\u7ea6\u4e2d\u7684\u53ef\u6267\u884c\u5355\u5143\u3002 \u4fee\u9970\u7b26\u53ef\u4ee5\u7528\u6765\u6539\u53d8\u51fd\u6570\u7684\u884c\u4e3a\uff0c\u901a\u5e38\u7528\u4e8e\u8bbf\u95ee\u63a7\u5236\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"\u7ee7\u627f\u548c\u5e93"}),"\uff1aSolidity \u652f\u6301\u7ee7\u627f\uff0c\u5141\u8bb8\u5408\u7ea6\u4ece\u5176\u4ed6\u5408\u7ea6\u7ee7\u627f\u5c5e\u6027\u3002 \u5e93\u63d0\u4f9b\u4e86\u53ef\u4ee5\u72ec\u7acb\u90e8\u7f72\u7684\u53ef\u91cd\u7528\u4ee3\u7801\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"Gas \u548c\u4f18\u5316"}),"\uff1a\u7406\u89e3 gas\uff08\u6267\u884c\u64cd\u4f5c\u7684\u8d39\u7528\uff09\u5728 Solidity \u4e2d\u81f3\u5173\u91cd\u8981\u3002 \u7f16\u5199\u9ad8\u6548\u7684\u4ee3\u7801\u6709\u52a9\u4e8e\u964d\u4f4e\u4ea4\u6613\u6210\u672c\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(r.li,{children:["\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"\u90e8\u7f72\u548c\u4ea4\u4e92"}),"\uff1a\u5728\u8fdb\u884c\u7f16\u5199\u548c\u6d4b\u8bd5\u4e4b\u540e\uff0c\u5408\u7ea6\u4f1a\u88ab\u90e8\u7f72\u5230\u533a\u5757\u94fe\u4e0a\u3002 \u5b83\u4eec\u53ef\u4ee5\u4e0e\u5176\u4ed6\u5408\u7ea6\u4ea4\u4e92\uff0c\u4e5f\u53ef\u4ee5\u88ab\u5916\u90e8\u7528\u6237\u8c03\u7528\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(r.p,{children:"\u4e3a\u4e86\u66f4\u6df1\u5165\u5730\u7406\u89e3 Solidity\uff0c\u6211\u4eec\u9080\u8bf7\u60a8\u89c2\u770b\u4ee5\u4e0b\u4e00\u7cfb\u5217\u89c6\u9891\u3002 \u8fd9\u4e9b\u6307\u5bfc\u5c06\u5e26\u60a8\u6df1\u5165\u4e86\u89e3 Solidity \u7684\u57fa\u7840\u77e5\u8bc6\uff0c\u63d0\u4f9b\u6e05\u6670\u7684\u793a\u4f8b\u548c\u8be6\u7ec6\u7684\u89e3\u91ca\uff0c\u4ee5\u589e\u5f3a\u60a8\u7684\u5b66\u4e60\u4f53\u9a8c\u3002"}),"\n","\n",(0,l.jsxs)(n.Z,{children:[(0,l.jsx)(i.Z,{value:"variables",label:"Variables",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/M_uUHR9Ezfk?si=sYHGnbHhncQOZF-x",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"conditionals",label:"Conditional Statements",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/rvoBU77d1p4?si=VKGT4L6fenbscPTk",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"loops",label:"Loops",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/6OZYrJSsrl0?si=gHdyazGoWRbdb4GS",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"arrays",label:"Arrays",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/6RLn4_osP8Q?si=iNOcLaiSVEii2-80",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"mappings",label:"Mappings",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/7ojW9iJNxL0?si=gaT5TaTFV9baiaVo",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"functions",label:"Functions",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/7ZszJrfnV24?si=YuewLUg440wWKJxE",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})]}),"\n",(0,l.jsxs)(n.Z,{children:[(0,l.jsx)(i.Z,{value:"enums",label:"Enums & Structs",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/LqH-SSp_J24?si=qaxcQOeIUElF-gUZ",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"constructors",label:"Constructors",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/ALQXL9BVc_I?si=G_vCwwmasfP_6cz9",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"inheritance",label:"Inheritance",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/1hPMpxIWEvo?si=0u-CH7fkbIv8JvXY",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"libraries",label:"Libraries",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/U5CXH01dD_4?si=Wxn1t5xWohy-9ky8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,l.jsx)(i.Z,{value:"events",label:"Events",children:(0,l.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/dbRDYul2Qv4?si=FnNXHYVyfutX1qk3",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})]}),"\n",(0,l.jsx)(r.h2,{id:"\u5176\u4ed6\u8d44\u6e90",children:"\u5176\u4ed6\u8d44\u6e90"}),"\n",(0,l.jsxs)(r.ul,{children:["\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://docs.soliditylang.org/",children:"Solidity documentation"})}),"\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://solidity-by-example.org/",children:"Solidity by example"})}),"\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://ethereum.org/developers/docs/smart-contracts",children:"Ethereum's Smart Contract Documentation"})}),"\n"]}),"\n",(0,l.jsx)(r.h2,{id:"libraries",children:"Libraries"}),"\n",(0,l.jsxs)(r.p,{children:[(0,l.jsx)(r.strong,{children:"OpenZeppelin Contracts -"})," ",(0,l.jsx)(r.strong,{children:(0,l.jsx)(r.em,{children:"\u7528\u4e8e\u667a\u80fd\u5408\u7ea6\u5b89\u5168\u5f00\u53d1\u7684\u5e93\u3002"})})]}),"\n",(0,l.jsxs)(r.ul,{children:["\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://openzeppelin.com/contracts/",children:"openzeppelin.com/contracts/"})}),"\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://github.com/OpenZeppelin/openzeppelin-contracts",children:"GitHub"})}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,a.a)(),...e.components};return r?(0,l.jsx)(r,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},18679:(e,r,t)=>{t.d(r,{Z:()=>i});t(67294);var l=t(36905);const a={tabItem:"tabItem_Ymn6"};var n=t(85893);function i(e){let{children:r,hidden:t,className:i}=e;return(0,n.jsx)("div",{role:"tabpanel",className:(0,l.Z)(a.tabItem,i),hidden:t,children:r})}},73992:(e,r,t)=>{t.d(r,{Z:()=>j});var l=t(67294),a=t(36905),n=t(72957),i=t(16550),s=t(81270),o=t(75238),c=t(33609),u=t(92560);function d(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:r,children:t}=e;return(0,l.useMemo)((()=>{const e=r??function(e){return d(e).map((e=>{let{props:{value:r,label:t,attributes:l,default:a}}=e;return{value:r,label:t,attributes:l,default:a}}))}(t);return function(e){const r=(0,c.l)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,t])}function h(e){let{value:r,tabValues:t}=e;return t.some((e=>e.value===r))}function b(e){let{queryString:r=!1,groupId:t}=e;const a=(0,i.k6)(),n=function(e){let{queryString:r=!1,groupId:t}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:r,groupId:t});return[(0,o._X)(n),(0,l.useCallback)((e=>{if(!n)return;const r=new URLSearchParams(a.location.search);r.set(n,e),a.replace({...a.location,search:r.toString()})}),[n,a])]}function m(e){const{defaultValue:r,queryString:t=!1,groupId:a}=e,n=p(e),[i,o]=(0,l.useState)((()=>function(e){let{defaultValue:r,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!h({value:r,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const l=t.find((e=>e.default))??t[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:r,tabValues:n}))),[c,d]=b({queryString:t,groupId:a}),[m,f]=function(e){let{groupId:r}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(r),[a,n]=(0,u.Nk)(t);return[a,(0,l.useCallback)((e=>{t&&n.set(e)}),[t,n])]}({groupId:a}),w=(()=>{const e=c??m;return h({value:e,tabValues:n})?e:null})();(0,s.Z)((()=>{w&&o(w)}),[w]);return{selectedValue:i,selectValue:(0,l.useCallback)((e=>{if(!h({value:e,tabValues:n}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),f(e)}),[d,f,n]),tabValues:n}}var f=t(51048);const w={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=t(85893);function x(e){let{className:r,block:t,selectedValue:l,selectValue:i,tabValues:s}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,n.o5)(),u=e=>{const r=e.currentTarget,t=o.indexOf(r),a=s[t].value;a!==l&&(c(r),i(a))},d=e=>{let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;r=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;r=o[t]??o[o.length-1];break}}r?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":t},r),children:s.map((e=>{let{value:r,label:t,attributes:n}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:l===r?0:-1,"aria-selected":l===r,ref:e=>o.push(e),onKeyDown:d,onClick:u,...n,className:(0,a.Z)("tabs__item",w.tabItem,n?.className,{"tabs__item--active":l===r}),children:t??r},r)}))})}function g(e){let{lazy:r,children:t,selectedValue:a}=e;const n=(Array.isArray(t)?t:[t]).filter(Boolean);if(r){const e=n.find((e=>e.props.value===a));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:n.map(((e,r)=>(0,l.cloneElement)(e,{key:r,hidden:e.props.value!==a})))})}function v(e){const r=m(e);return(0,y.jsxs)("div",{className:(0,a.Z)("tabs-container",w.tabList),children:[(0,y.jsx)(x,{...e,...r}),(0,y.jsx)(g,{...e,...r})]})}function j(e){const r=(0,f.Z)();return(0,y.jsx)(v,{...e,children:d(e.children)},String(r))}},11151:(e,r,t)=>{t.d(r,{Z:()=>s,a:()=>i});var l=t(67294);const a={},n=l.createContext(a);function i(e){const r=l.useContext(n);return l.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),l.createElement(n.Provider,{value:r},e.children)}}}]);