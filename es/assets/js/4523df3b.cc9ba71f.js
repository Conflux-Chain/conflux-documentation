"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6302],{28048:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var a=n(85893),i=n(11151);const s={displayed_sidebar:"generalSidebar"},o="Constant vs Immutable",r={id:"general/build/smart-contracts/gas-optimization/constant",title:"Constant vs Immutable",description:"1. constant: Declares a constant that must be initialized at the time of declaration and cannot be altered thereafter.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/build/smart-contracts/gas-optimization/constant.md",sourceDirName:"general/build/smart-contracts/gas-optimization",slug:"/general/build/smart-contracts/gas-optimization/constant",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/constant",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",frontMatter:{displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Memory vs Calldata",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/memoryAndCalldata"},next:{title:"Error",permalink:"/es/docs/general/build/smart-contracts/gas-optimization/error"}},c={},l=[];function d(e){const t={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"constant-vs-immutable",children:"Constant vs Immutable"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"constant"}),": Declares a constant that must be initialized at the time of declaration and cannot be altered thereafter."]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"immutable"}),": Declares a constant that can be initialized either at the time of declaration or within the constructor, and cannot be altered after deployment."]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"variable"}),": Declares a variable that can be assigned and modified at any stage of the contract lifecycle."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"The following examples illustrate three variables defined with different modifiers."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-solidity",children:"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.4;\n\ncontract ConstantExample {\n    uint256 public constant FIXED_VALUE = 100;\n}\n\ncontract ImmutableExample {\n    uint256 public immutable SETUP_VALUE = 100;\n}\n\ncontract VariableExample {\n    uint256 public dynamicValue = 100;\n}\n"})}),"\n",(0,a.jsx)(t.p,{children:"Recommendations for gas optimization:"}),"\n",(0,a.jsx)(t.p,{children:"\ud83c\udf1f Using variables consumes more gas, so avoid them if you can."}),"\n",(0,a.jsxs)(t.p,{children:["\ud83c\udf1f For constants that do not require modifications after deployment, ",(0,a.jsxs)(t.strong,{children:["defining them as ",(0,a.jsx)(t.code,{children:"immutable"})," is optimal both functionally and in terms of gas efficiency."]})]})]})}function m(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>o});var a=n(67294);const i={},s=a.createContext(i);function o(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);