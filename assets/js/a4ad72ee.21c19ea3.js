"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3771],{38912:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var a=e(85893),i=e(11151);const s={displayed_sidebar:"generalSidebar",sidebar_position:1},o="Constant vs Immutable",r={id:"general/build/smart-contracts/gas-optimization/constant",title:"Constant vs Immutable",description:"1. constant: Declares a constant that must be initialized at the time of declaration and cannot be altered thereafter.",source:"@site/docs/general/build/smart-contracts/gas-optimization/constant.md",sourceDirName:"general/build/smart-contracts/gas-optimization",slug:"/general/build/smart-contracts/gas-optimization/constant",permalink:"/docs/general/build/smart-contracts/gas-optimization/constant",draft:!1,unlisted:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/build/smart-contracts/gas-optimization/constant.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{displayed_sidebar:"generalSidebar",sidebar_position:1},sidebar:"generalSidebar",previous:{title:"Gas Optimization",permalink:"/docs/general/build/smart-contracts/gas-optimization/"},next:{title:"Memory vs Calldata",permalink:"/docs/general/build/smart-contracts/gas-optimization/memoryAndCalldata"}},c={},l=[];function d(t){const n={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"constant-vs-immutable",children:"Constant vs Immutable"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"constant"}),": Declares a constant that must be initialized at the time of declaration and cannot be altered thereafter."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"immutable"}),": Declares a constant that can be initialized either at the time of declaration or within the constructor, and cannot be altered after deployment."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"variable"}),": Declares a variable that can be assigned and modified at any stage of the contract lifecycle."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"The following examples illustrate three variables defined with different modifiers."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-solidity",children:"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.4;\n\ncontract ConstantExample {\n    uint256 public constant FIXED_VALUE = 100;\n}\n\ncontract ImmutableExample {\n    uint256 public immutable SETUP_VALUE = 100;\n}\n\ncontract VariableExample {\n    uint256 public dynamicValue = 100;\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Recommendations for gas optimization:"}),"\n",(0,a.jsx)(n.p,{children:"\ud83c\udf1f Using variables consumes more gas, so avoid them if you can."}),"\n",(0,a.jsxs)(n.p,{children:["\ud83c\udf1f For constants that do not require modifications after deployment, ",(0,a.jsxs)(n.strong,{children:["defining them as ",(0,a.jsx)(n.code,{children:"immutable"})," is optimal both functionally and in terms of gas efficiency."]})]})]})}function m(t={}){const{wrapper:n}={...(0,i.a)(),...t.components};return n?(0,a.jsx)(n,{...t,children:(0,a.jsx)(d,{...t})}):d(t)}},11151:(t,n,e)=>{e.d(n,{Z:()=>r,a:()=>o});var a=e(67294);const i={},s=a.createContext(i);function o(t){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function r(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:o(t.components),a.createElement(s.Provider,{value:n},t.children)}}}]);