"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[4570],{17406:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var t=a(85893),r=a(11151),s=a(73992),o=a(18679);const i={sidebar_position:1,title:"What is Conflux?",displayed_sidebar:"generalSidebar"},l=void 0,c={id:"general/conflux-basics/what-is-conflux",title:"What is Conflux?",description:"Conflux stands out as a public blockchain with superior performance, a unique consensus mechanism, and an innovative dual-space design. These features enable Conflux to deliver a fast, secure, and decentralized platform that is well-suited for various applications, including decentralized finance and gaming.",source:"@site/docs/general/conflux-basics/what-is-conflux.md",sourceDirName:"general/conflux-basics",slug:"/general/conflux-basics/what-is-conflux",permalink:"/docs/general/conflux-basics/what-is-conflux",draft:!1,unlisted:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/conflux-basics/what-is-conflux.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"What is Conflux?",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Conflux Basics",permalink:"/docs/general/conflux-basics/"},next:{title:"Consensus",permalink:"/docs/general/conflux-basics/consensus-mechanisms/"}},u={},d=[];function h(e){const n={a:"a",admonition:"admonition",p:"p",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Conflux stands out as a public blockchain with superior performance, a unique consensus mechanism, and an innovative dual-space design. These features enable Conflux to deliver a fast, secure, and decentralized platform that is well-suited for various applications, including decentralized finance and gaming."}),"\n",(0,t.jsxs)(n.p,{children:["Conflux employs a hybrid ",(0,t.jsx)(n.a,{href:"/docs/general/conflux-basics/consensus-mechanisms/",children:"consensus mechanism"}),", combining Proof of Work (PoW) and Proof of Stake (PoS), ensuring high security, throughput, and decentralization. Conflux's PoW consensus leverages the ",(0,t.jsx)(n.a,{href:"/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/tree-graph",children:"Tree-Graph ledger structure"})," and ",(0,t.jsx)(n.a,{href:"/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/ghast",children:"GHAST algorithm"}),", delivering a high transaction throughput of up to 3,000 TPS and confirmation latency within 1 minute, while maintaining the same level of decentralization as Bitcoin and Ethereum. Conflux's PoS consensus offers the network finality, mitigating ",(0,t.jsx)(n.a,{href:"/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/why_pos",children:"the risk of 51% attack"}),". Consequently, Conflux has the capability to efficiently handle a large number of transactions, making it a robust and reliable platform for a wide range of applications."]}),"\n",(0,t.jsxs)(n.p,{children:["The Conflux network comprises two distinct ",(0,t.jsx)(n.a,{href:"/docs/general/conflux-basics/spaces",children:"spaces"}),": Conflux ",(0,t.jsx)(n.a,{href:"/docs/core/Overview",children:"Core Space"})," and Conflux ",(0,t.jsx)(n.a,{href:"/docs/espace/build/cip90",children:"eSpace"}),". The Core Space is the primary blockchain network that utilizes the hybrid consensus mechanism and features a ",(0,t.jsx)(n.a,{href:"/docs/core/core-space-basics/internal-contracts/sponsor-whitelist-control",children:"contract sponsorship mechanism"}),". The sponsorship mechanism allows project users to interact with contracts without a balance, lowering the threshold for blockchain usage and expanding the user base. The eSpace is fully compatible with the Ethereum Virtual Machine (EVM), enabling developers to easily migrate their existing Ethereum smart contracts to Conflux eSpace and benefit from its high performance and scalability. Conflux Core Space and eSpace can communicate with each other via the ",(0,t.jsx)(n.a,{href:"/docs/core/core-space-basics/internal-contracts/crossSpaceCall",children:"CrossSpaceCall"})," contract, which facilitates atomic transfer of funds and atomic execution of smart contract calls between the two spaces."]}),"\n",(0,t.jsx)(n.p,{children:"If you want to learn more about Conflux, check out this video covering its unique Tree-Graph Algorithm, GHAST, Spaces, and the Hybrid PoW + PoS Consensus Mechanism:"}),"\n","\n","\n",(0,t.jsx)(s.Z,{children:(0,t.jsx)(o.Z,{value:"youtube",label:"What is Conflux?",children:(0,t.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/5JwUO3v2sW0?si=lNvkMZqhHKnzBNIm",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"We warmly welcome you to the Conflux documentation site, your starting point for learning about Conflux's basic concepts and development. Happy exploring!"})})]})}function f(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},18679:(e,n,a)=>{a.d(n,{Z:()=>o});a(67294);var t=a(36905);const r={tabItem:"tabItem_Ymn6"};var s=a(85893);function o(e){let{children:n,hidden:a,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,t.Z)(r.tabItem,o),hidden:a,children:n})}},73992:(e,n,a)=>{a.d(n,{Z:()=>C});var t=a(67294),r=a(36905),s=a(72957),o=a(16550),i=a(81270),l=a(75238),c=a(33609),u=a(92560);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:a}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:a,attributes:t,default:r}}=e;return{value:n,label:a,attributes:t,default:r}}))}(a);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,a])}function f(e){let{value:n,tabValues:a}=e;return a.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:a}=e;const r=(0,o.k6)(),s=function(e){let{queryString:n=!1,groupId:a}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:n,groupId:a});return[(0,l._X)(s),(0,t.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(r.location.search);n.set(s,e),r.replace({...r.location,search:n.toString()})}),[s,r])]}function m(e){const{defaultValue:n,queryString:a=!1,groupId:r}=e,s=h(e),[o,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!f({value:n,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=a.find((e=>e.default))??a[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:s}))),[c,d]=p({queryString:a,groupId:r}),[m,b]=function(e){let{groupId:n}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,s]=(0,u.Nk)(a);return[r,(0,t.useCallback)((e=>{a&&s.set(e)}),[a,s])]}({groupId:r}),g=(()=>{const e=c??m;return f({value:e,tabValues:s})?e:null})();(0,i.Z)((()=>{g&&l(g)}),[g]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!f({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=a(51048);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=a(85893);function v(e){let{className:n,block:a,selectedValue:t,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.o5)(),u=e=>{const n=e.currentTarget,a=l.indexOf(n),r=i[a].value;r!==t&&(c(n),o(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const a=l.indexOf(e.currentTarget)+1;n=l[a]??l[0];break}case"ArrowLeft":{const a=l.indexOf(e.currentTarget)-1;n=l[a]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":a},n),children:i.map((e=>{let{value:n,label:a,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...s,className:(0,r.Z)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":t===n}),children:a??n},n)}))})}function w(e){let{lazy:n,children:a,selectedValue:r}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=m(e);return(0,x.jsxs)("div",{className:(0,r.Z)("tabs-container",g.tabList),children:[(0,x.jsx)(v,{...e,...n}),(0,x.jsx)(w,{...e,...n})]})}function C(e){const n=(0,b.Z)();return(0,x.jsx)(y,{...e,children:d(e.children)},String(n))}},11151:(e,n,a)=>{a.d(n,{Z:()=>i,a:()=>o});var t=a(67294);const r={},s=t.createContext(r);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);