"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2185],{52023:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(85893),i=t(11151);const r={sidebar_position:2,title:"Encoding & Signing",displayed_sidebar:"coreSidebar",keywords:["transaction","signing","encoding"]},o=void 0,a={id:"core/core-space-basics/transactions/encoding-signning",title:"Encoding & Signing",description:"After every field of a transaction is prepared, following steps are required before it can be sent to network (don't worry, these steps are already implemented by wallets or SDKs):",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/core/core-space-basics/transactions/encoding-signning.md",sourceDirName:"core/core-space-basics/transactions",slug:"/core/core-space-basics/transactions/encoding-signning",permalink:"/es/docs/core/core-space-basics/transactions/encoding-signning",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Encoding & Signing",displayed_sidebar:"coreSidebar",keywords:["transaction","signing","encoding"]},sidebar:"coreSidebar",previous:{title:"Transaction Fields",permalink:"/es/docs/core/core-space-basics/transactions/tx-fields"},next:{title:"Transaction Fee",permalink:"/es/docs/core/core-space-basics/transactions/transaction-fee"}},c={},d=[{value:"Broadcast to the network",id:"broadcast-to-the-network",level:3},{value:"Referencia",id:"referencia",level:3}];function l(e){const n={a:"a",code:"code",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"After every field of a transaction is prepared, following steps are required before it can be sent to network (don't worry, these steps are already implemented by wallets or SDKs):"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Prepare hash for signing: do ",(0,s.jsx)(n.a,{href:"https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/",children:"RLP encoding"})," in the order of ",(0,s.jsx)(n.code,{children:"[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]"})," and then apply the ",(0,s.jsx)(n.code,{children:"keccak256"})," operation to the encoded result to obtain a hash."]}),"\n",(0,s.jsxs)(n.li,{children:["Signing: sign the hash obtained in the previous step using the ",(0,s.jsx)(n.strong,{children:"private key of the sending account"})," and perform the ecdsaSign signature operation to obtain the values for ",(0,s.jsx)(n.code,{children:"r, s, v"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Transaction Encoding: Do RLP encoding in the order of ",(0,s.jsx)(n.code,{children:"[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]"})," and convert it into a hexadecimal string."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"broadcast-to-the-network",children:"Broadcast to the network"}),"\n",(0,s.jsxs)(n.p,{children:["After completing the above steps, you will obtain a hex-encoded rawTx. You can then use the ",(0,s.jsx)(n.a,{href:"/es/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction",children:(0,s.jsx)(n.code,{children:"cfx_sendRawTransaction"})})," method to send it to the network. Upon a successful invocation of this method, a transaction hash will be returned, which can be used to query the status of the transaction."]}),"\n",(0,s.jsx)(n.h3,{id:"referencia",children:"Referencia"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://fitsaleem.medium.com/ethereums-elliptic-curve-digital-signature-algorithm-ecdsa-88e1659f4879#:~:text=ECDSA%20is%20used%20in%20Ethereum,included%20in%20the%20transaction%20data.",children:"Elliptic Curve Digital Signature Algorithm (ECDSA)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ethereum.org/en/glossary/#keccak-256",children:"keccak256 hashing"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/",children:"Recursive Length Prefix (RLP) serialization"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(67294);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);