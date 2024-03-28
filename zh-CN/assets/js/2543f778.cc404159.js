"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9380],{83929:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var t=r(85893),a=r(11151),o=r(73992),s=r(18679);const l={sidebar_position:1,title:"\u4f55\u4e3a Conflux\uff1f",displayed_sidebar:"generalSidebar"},c=void 0,u={id:"general/conflux-basics/what-is-conflux",title:"\u4f55\u4e3a Conflux\uff1f",description:"Conflux\u662f\u4e00\u6761\u5177\u6709\u5353\u8d8a\u6027\u80fd\u3001\u72ec\u7279\u5171\u8bc6\u673a\u5236\u548c\u521b\u65b0\u53cc\u7a7a\u95f4\u8bbe\u8ba1\u7684\u516c\u94fe\u3002 \u8fd9\u4e9b\u7279\u70b9\u4f7f\u5f97 Conflux \u80fd\u591f\u63d0\u4f9b\u4e00\u4e2a\u5feb\u901f\u3001\u5b89\u5168\u3001\u53bb\u4e2d\u5fc3\u5316\u7684\u5e73\u53f0\uff0c\u975e\u5e38\u9002\u5408\u4e8e\u5404\u79cd\u5e94\u7528\uff0c\u5305\u62ec\u53bb\u4e2d\u5fc3\u5316\u91d1\u878d\u548c\u6e38\u620f\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/conflux-basics/what-is-conflux.md",sourceDirName:"general/conflux-basics",slug:"/general/conflux-basics/what-is-conflux",permalink:"/zh-CN/docs/general/conflux-basics/what-is-conflux",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"\u4f55\u4e3a Conflux\uff1f",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Conflux Basics",permalink:"/zh-CN/docs/general/conflux-basics/"},next:{title:"\u5171\u8bc6",permalink:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/"}},i={},d=[];function f(e){const n={a:"a",admonition:"admonition",p:"p",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Conflux\u662f\u4e00\u6761\u5177\u6709\u5353\u8d8a\u6027\u80fd\u3001\u72ec\u7279\u5171\u8bc6\u673a\u5236\u548c\u521b\u65b0\u53cc\u7a7a\u95f4\u8bbe\u8ba1\u7684\u516c\u94fe\u3002 \u8fd9\u4e9b\u7279\u70b9\u4f7f\u5f97 Conflux \u80fd\u591f\u63d0\u4f9b\u4e00\u4e2a\u5feb\u901f\u3001\u5b89\u5168\u3001\u53bb\u4e2d\u5fc3\u5316\u7684\u5e73\u53f0\uff0c\u975e\u5e38\u9002\u5408\u4e8e\u5404\u79cd\u5e94\u7528\uff0c\u5305\u62ec\u53bb\u4e2d\u5fc3\u5316\u91d1\u878d\u548c\u6e38\u620f\u3002"}),"\n",(0,t.jsxs)(n.p,{children:["Conflux\u4f7f\u7528\u4e86\u4e00\u79cd\u5de5\u4f5c\u91cf\u8bc1\u660e\uff08PoW\uff09- \u6743\u76ca\u8bc1\u660e\uff08PoS\uff09\u6df7\u5408",(0,t.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/",children:"\u5171\u8bc6"}),"\uff0c\u8fd9\u79cd\u8bbe\u8ba1\u4e3aConflux\u7f51\u7edc\u63d0\u4f9b\u4e86\u9ad8\u5b89\u5168\u6027\u3001\u9ad8\u541e\u5410\u91cf\u5e76\u4fdd\u8bc1\u4e86\u7f51\u7edc\u7684\u53bb\u4e2d\u5fc3\u5316\u7a0b\u5ea6\u3002 Conflux\u91c7\u7528\u4e86",(0,t.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/tree-graph",children:"Tree-Graph\u8d26\u672c\u7ed3\u6784"}),"\u548c",(0,t.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/ghast",children:"GHAST\u7b97\u6cd5"}),"\uff0c\u5b9e\u73b0\u4e86PoW\u5171\u8bc6\u673a\u5236\u3002\u8fd9\u4e9b\u7279\u70b9\u4f7f\u5f97Conflux\u5177\u6709\u9ad8\u8fbe3,000TPS\u7684\u9ad8\u4ea4\u6613\u541e\u5410\u91cf\u548c1\u5206\u949f\u4ee5\u5185\u7684\u786e\u8ba4\u5ef6\u8fdf\uff0c\u540c\u65f6\u4fdd\u6301\u4e0e\u6bd4\u7279\u5e01\u548c\u4ee5\u592a\u574a\u76f8\u540c\u7684\u53bb\u4e2d\u5fc3\u5316\u7a0b\u5ea6\u3002 Conflux\u7684PoS\u5171\u8bc6\u63d0\u4f9b\u7f51\u7edc\u6700\u7ec8\u6027\uff0c\u51cf\u8f7b\u4e86",(0,t.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/why_pos",children:"51%\u653b\u51fb\u7684\u98ce\u9669"}),"\u3002 \u56e0\u6b64\uff0cConflux \u6709\u80fd\u529b\u9ad8\u6548\u5904\u7406\u5927\u91cf\u7684\u4ea4\u6613\uff0c\u4f7f\u5176\u6210\u4e3a\u5e7f\u6cdb\u5e94\u7528\u7684\u5f3a\u5927\u53ef\u9760\u7684\u5e73\u53f0\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:["Conflux\u7f51\u7edc\u5305\u542b\u4e24\u4e2a\u4e0d\u540c\u7684",(0,t.jsx)(n.a,{href:"/zh-CN/docs/general/conflux-basics/spaces",children:"\u7a7a\u95f4"}),": Conflux ",(0,t.jsx)(n.a,{href:"/zh-CN/docs/core/Overview",children:"Core Space"}),"\u548cConflux ",(0,t.jsx)(n.a,{href:"/zh-CN/docs/espace/build/cip90",children:"eSpace"}),"\u3002 Core Space \u662f\u91c7\u7528\u6df7\u5408\u5171\u8bc6\u673a\u5236\u7684\u9996\u8981\u7684\u533a\u5757\u94fe\u7f51\u7edc\uff0c\u5177\u6709",(0,t.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/internal-contracts/sponsor-whitelist-control",children:"\u5408\u7ea6\u4ee3\u4ed8\u673a\u5236"}),"\u3002 \u4ee3\u4ed8\u673a\u5236\u4f7f\u9879\u76ee\u7528\u6237\u5728\u6ca1\u6709\u4f59\u989d\u7684\u60c5\u51b5\u4e0b\u4e0e\u667a\u80fd\u5408\u7ea6\u4ea4\u4e92\uff0c\u964d\u4f4e\u4e86\u533a\u5757\u94fe\u4f7f\u7528\u95e8\u69db\u5e76\u6269\u5927\u4e86\u7528\u6237\u7fa4\u4f53\u3002 eSpace \u5b8c\u5168\u517c\u5bb9\u4ee5\u592a\u574a\u865a\u62df\u673a (EVM) \u7684\u533a\u5757\u94fe\u7a7a\u95f4\uff0c\u4f7f\u5f00\u53d1\u4eba\u5458\u53ef\u4ee5\u8f7b\u677e\u5730\u5c06\u5176\u73b0\u6709\u7684\u4ee5\u592a\u574a\u667a\u80fd\u5408\u7ea6\u8fc1\u79fb\u5230 Conflux eSpace\uff0c\u5e76\u4ece\u5176\u9ad8\u6027\u80fd\u548c\u53ef\u6269\u5c55\u6027\u4e2d\u83b7\u76ca\u3002 Conflux\u7684 Core Space \u548c eSpace \u53ef\u4ee5\u901a\u8fc7",(0,t.jsx)(n.a,{href:"/zh-CN/docs/core/core-space-basics/internal-contracts/crossSpaceCall",children:"CrossSpaceCall"}),"\u5408\u7ea6\u76f8\u4e92\u901a\u4fe1\uff0c\u901a\u8fc7\u8be5\u5408\u7ea6\u53ef\u4ee5\u5b9e\u73b0\u4e24\u4e2a\u7a7a\u95f4\u4e4b\u95f4\u7684\u8d44\u91d1\u539f\u5b50\u8f6c\u79fb\u548c\u667a\u80fd\u5408\u7ea6\u8c03\u7528\u7684\u539f\u5b50\u6267\u884c\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"If you want to learn more about Conflux, check out this video covering its unique Tree-Graph Algorithm, GHAST, Spaces, and the Hybrid PoW + PoS Consensus Mechanism:"}),"\n","\n","\n",(0,t.jsx)(o.Z,{children:(0,t.jsx)(s.Z,{value:"youtube",label:"What is Conflux?",children:(0,t.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/5JwUO3v2sW0?si=lNvkMZqhHKnzBNIm",title:"YouTube \u89c6\u9891\u64ad\u653e\u5668",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"\u6b22\u8fce\u60a8\u8bbf\u95ee Conflux \u6587\u6863\u7ad9\u70b9\uff0c\u8fd9\u5c06\u662f\u60a8\u4e86\u89e3 Conflux \u57fa\u672c\u6982\u5ff5\u548c\u5f00\u53d1\u7684\u8d77\u70b9\u3002 \u795d\u60a8\u63a2\u7d22\u6109\u5feb\uff01"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(f,{...e})}):f(e)}},18679:(e,n,r)=>{r.d(n,{Z:()=>s});r(67294);var t=r(36905);const a={tabItem:"tabItem_Ymn6"};var o=r(85893);function s(e){let{children:n,hidden:r,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,t.Z)(a.tabItem,s),hidden:r,children:n})}},73992:(e,n,r)=>{r.d(n,{Z:()=>y});var t=r(67294),a=r(36905),o=r(72957),s=r(16550),l=r(81270),c=r(75238),u=r(33609),i=r(92560);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function f(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:a}}=e;return{value:n,label:r,attributes:t,default:a}}))}(r);return function(e){const n=(0,u.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function h(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:r}=e;const a=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,c._X)(o),(0,t.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(a.location.search);n.set(o,e),a.replace({...a.location,search:n.toString()})}),[o,a])]}function b(e){const{defaultValue:n,queryString:r=!1,groupId:a}=e,o=f(e),[s,c]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:o}))),[u,d]=p({queryString:r,groupId:a}),[b,m]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,o]=(0,i.Nk)(r);return[a,(0,t.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:a}),x=(()=>{const e=u??b;return h({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{x&&c(x)}),[x]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);c(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=r(51048);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=r(85893);function C(e){let{className:n,block:r,selectedValue:t,selectValue:s,tabValues:l}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),i=e=>{const n=e.currentTarget,r=c.indexOf(n),a=l[r].value;a!==t&&(u(n),s(a))},d=e=>{let n=null;switch(e.key){case"Enter":i(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;n=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;n=c[r]??c[c.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},n),children:l.map((e=>{let{value:n,label:r,attributes:o}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>c.push(e),onKeyDown:d,onClick:i,...o,className:(0,a.Z)("tabs__item",x.tabItem,o?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function g(e){let{lazy:n,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function w(e){const n=b(e);return(0,v.jsxs)("div",{className:(0,a.Z)("tabs-container",x.tabList),children:[(0,v.jsx)(C,{...e,...n}),(0,v.jsx)(g,{...e,...n})]})}function y(e){const n=(0,m.Z)();return(0,v.jsx)(w,{...e,children:d(e.children)},String(n))}},11151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>s});var t=r(67294);const a={},o=t.createContext(a);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);