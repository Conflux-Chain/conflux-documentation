"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2112],{22966:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var n=r(85893),a=r(11151),i=r(73992),s=r(18679);const l={sidebar_position:2,title:"Solidity Basics",displayed_sidebar:"generalSidebar"},o=void 0,c={id:"general/build/smart-contracts/solidity-basics",title:"Solidity Basics",description:"Intro",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/build/smart-contracts/solidity-basics.md",sourceDirName:"general/build/smart-contracts",slug:"/general/build/smart-contracts/solidity-basics",permalink:"/es/docs/general/build/smart-contracts/solidity-basics",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Solidity Basics",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Smart Contracts Development",permalink:"/es/docs/general/build/smart-contracts/introduction-to-smart-contracts"},next:{title:"Token Standards",permalink:"/es/docs/general/build/smart-contracts/token-standards"}},u={},d=[{value:"Intro",id:"intro",level:2},{value:"Resources",id:"resources",level:2},{value:"Libraries",id:"libraries",level:2}];function p(e){const t={a:"a",em:"em",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"intro",children:"Intro"}),"\n",(0,n.jsx)(t.p,{children:"Solidity is a high-level programming language designed for implementing smart contracts on blockchain platforms like Ethereum and Conflux Network. It's statically typed, supports inheritance, libraries, and complex user-defined types, making it a powerful tool for creating sophisticated contracts."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Language Structure:"})," Solidity's syntax is similar to JavaScript, making it relatively accessible to new developers. It includes variables, functions, and control structures (like if-else, loops)."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Smart Contracts in Solidity"}),": Contracts in Solidity are collections of code and data that reside at a specific address on the blockchain. They can define rules, store data, and automatically execute functions when conditions are met."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Variables and Types"}),": Solidity supports various data types including integers, booleans, and strings. It also supports complex types like arrays and structs, offering flexibility in data management."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Functions and Modifiers"}),": Functions are the executable units in a contract. Modifiers can be used to change the behavior of functions, often for access control."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Inheritance and Libraries"}),": Solidity supports inheritance, allowing contracts to inherit properties from other contracts. Libraries provide reusable code that can be deployed independently."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Gas and Optimization"}),": Understanding gas (the fee for executing operations) is crucial in Solidity. Writing efficient code can help in minimizing transaction costs."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Deployment and Interactions"}),": After writing and testing, contracts are deployed to the blockchain. They can interact with other contracts and be called by external users."]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"For a deeper understanding, we invite you to watch the following series of informative videos. These guides walk you through the fundamentals of Solidity, offering clear examples and detailed explanations to enhance your learning experience."}),"\n","\n",(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(s.Z,{value:"variables",label:"Variables",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/M_uUHR9Ezfk?si=sYHGnbHhncQOZF-x",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"conditionals",label:"Conditional Statements",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/rvoBU77d1p4?si=VKGT4L6fenbscPTk",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"loops",label:"Loops",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/6OZYrJSsrl0?si=gHdyazGoWRbdb4GS",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"arrays",label:"Arrays",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/6RLn4_osP8Q?si=iNOcLaiSVEii2-80",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"mappings",label:"Mappings",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/7ojW9iJNxL0?si=gaT5TaTFV9baiaVo",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"functions",label:"Functions",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/7ZszJrfnV24?si=YuewLUg440wWKJxE",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})]}),"\n",(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(s.Z,{value:"enums",label:"Enums & Structs",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/LqH-SSp_J24?si=qaxcQOeIUElF-gUZ",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"constructors",label:"Constructors",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/ALQXL9BVc_I?si=G_vCwwmasfP_6cz9",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"inheritance",label:"Inheritance",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/1hPMpxIWEvo?si=0u-CH7fkbIv8JvXY",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"libraries",label:"Libraries",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/U5CXH01dD_4?si=Wxn1t5xWohy-9ky8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})}),(0,n.jsx)(s.Z,{value:"events",label:"Events",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/dbRDYul2Qv4?si=FnNXHYVyfutX1qk3",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0})})]}),"\n",(0,n.jsx)(t.h2,{id:"resources",children:"Resources"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://docs.soliditylang.org/",children:"Solidity documentation"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://solidity-by-example.org/",children:"Solidity by example"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://ethereum.org/developers/docs/smart-contracts",children:"Ethereum's Smart Contract Documentation"})}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"libraries",children:"Libraries"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"OpenZeppelin Contracts -"})," ",(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.em,{children:"Library for secure smart contract development."})})]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://openzeppelin.com/contracts/",children:"openzeppelin.com/contracts/"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/OpenZeppelin/openzeppelin-contracts",children:"GitHub"})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},18679:(e,t,r)=>{r.d(t,{Z:()=>s});r(67294);var n=r(36905);const a={tabItem:"tabItem_Ymn6"};var i=r(85893);function s(e){let{children:t,hidden:r,className:s}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,n.Z)(a.tabItem,s),hidden:r,children:t})}},73992:(e,t,r)=>{r.d(t,{Z:()=>j});var n=r(67294),a=r(36905),i=r(72957),s=r(16550),l=r(81270),o=r(75238),c=r(33609),u=r(92560);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:r}=e;const a=(0,s.k6)(),i=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,o._X)(i),(0,n.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function m(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,i=p(e),[s,o]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:i}))),[c,d]=b({queryString:r,groupId:a}),[m,f]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,u.Nk)(r);return[a,(0,n.useCallback)((e=>{r&&i.set(e)}),[r,i])]}({groupId:a}),y=(()=>{const e=c??m;return h({value:e,tabValues:i})?e:null})();(0,l.Z)((()=>{y&&o(y)}),[y]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),f(e)}),[d,f,i]),tabValues:i}}var f=r(51048);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var w=r(85893);function g(e){let{className:t,block:r,selectedValue:n,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),u=e=>{const t=e.currentTarget,r=o.indexOf(t),a=l[r].value;a!==n&&(c(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=o.indexOf(e.currentTarget)+1;t=o[r]??o[0];break}case"ArrowLeft":{const r=o.indexOf(e.currentTarget)-1;t=o[r]??o[o.length-1];break}}t?.focus()};return(0,w.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},t),children:l.map((e=>{let{value:t,label:r,attributes:i}=e;return(0,w.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>o.push(e),onKeyDown:d,onClick:u,...i,className:(0,a.Z)("tabs__item",y.tabItem,i?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function x(e){let{lazy:t,children:r,selectedValue:a}=e;const i=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,w.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function v(e){const t=m(e);return(0,w.jsxs)("div",{className:(0,a.Z)("tabs-container",y.tabList),children:[(0,w.jsx)(g,{...e,...t}),(0,w.jsx)(x,{...e,...t})]})}function j(e){const t=(0,f.Z)();return(0,w.jsx)(v,{...e,children:d(e.children)},String(t))}},11151:(e,t,r)=>{r.d(t,{Z:()=>l,a:()=>s});var n=r(67294);const a={},i=n.createContext(a);function s(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);