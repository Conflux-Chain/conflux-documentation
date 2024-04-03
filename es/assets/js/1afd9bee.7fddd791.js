"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[419],{99754:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var a=n(85893),i=n(11151);const r={displayed_sidebar:"generalSidebar"},s="Variable Packing",o={id:"general/build/smart-contracts/gas-optimization/packing",title:"Variable Packing",description:"The Ethereum Virtual Machine (EVM) stores variables in consecutive 32-bytes slots. When we place multiple variables within a single slot, this is referred to as variable packing.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/build/smart-contracts/gas-optimization/packing.md",sourceDirName:"general/build/smart-contracts/gas-optimization",slug:"/general/build/smart-contracts/gas-optimization/packing",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/packing",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",frontMatter:{displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"MethodId Optimization",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/methodId"},next:{title:"Low-Cost Reentrancy Guard",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/reentrancy-guard"}},c={},l=[];function d(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"variable-packing",children:"Variable Packing"}),"\n",(0,a.jsx)(t.p,{children:"The Ethereum Virtual Machine (EVM) stores variables in consecutive 32-bytes slots. When we place multiple variables within a single slot, this is referred to as variable packing."}),"\n",(0,a.jsx)(t.p,{children:"If the variables we try to pack exceed the 32-bytes limit of the current slot, they will be stored in a new slot. It's crucial to determine which variables are best grouped together to minimize wasted space."}),"\n",(0,a.jsx)(t.p,{children:"Although Solidity automatically tries to pack smaller basic types into the same slot, poor struct member ordering can prevent the compiler from doing so."}),"\n",(0,a.jsxs)(t.p,{children:["Learn More: ",(0,a.jsx)(t.a,{href:"https://docs.soliditylang.org/en/v0.8.25/internals/layout_in_storage.html",children:"Layout of State Variables in Storage"})]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"DemoCode"})}),"\n",(0,a.jsx)(t.p,{children:"Below, we demonstrate how to use packing in contracts to compare gas usage."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-solidity",children:"\n// gas: 188616\ncontract Standard {\n    uint64 a = 5;\n    uint256 b = 5;\n    uint64 c = 5;\n}\n\n// gas: 166178\ncontract OptimizedPacking {\n    uint256 b = 5;\n    uint64 a = 5;\n    uint64 c = 5;\n}\n"})}),"\n",(0,a.jsx)(t.p,{children:"Recommendations for gas optimization:"}),"\n",(0,a.jsx)(t.p,{children:"\ud83c\udf1fPay attention to variable packing when choosing data types. If it's possible to pack a variable with others into a single storage slot, opting for a smaller data type can be beneficial."})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>s});var a=n(67294);const i={},r=a.createContext(i);function s(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);