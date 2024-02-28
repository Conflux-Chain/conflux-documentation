"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[4586],{96405:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>d});var r=n(85893),i=n(11151),s=n(17661);const c={sidebar_position:4,title:"JSON-RPC API",displayed_sidebar:"coreSidebar"},o=void 0,a={id:"core/build/json-rpc/json-rpc",title:"JSON-RPC API",description:"In order for a software application to interact with the Conflux blockchain - either by reading blockchain data or sending transactions to the network - it must connect to an Conflux node.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/core/build/json-rpc/json-rpc.mdx",sourceDirName:"core/build/json-rpc",slug:"/core/build/json-rpc/",permalink:"/zh-CN/docs/core/build/json-rpc/",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"JSON-RPC API",displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"\u57fa\u91d1\u4f1a Gas \u8d5e\u52a9",permalink:"/zh-CN/docs/core/build/gas-sponsorship"},next:{title:"cfx \u547d\u540d\u7a7a\u95f4",permalink:"/zh-CN/docs/core/build/json-rpc/cfx-namespace"}},l={},d=[{value:"CONVENIENCE LIBRARIES",id:"convenience-libraries",level:2},{value:"JSON-RPC endpoints",id:"json-rpc-endpoints",level:2},{value:"Method Namespace",id:"method-namespace",level:2}];function h(e){const t={a:"a",code:"code",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"In order for a software application to interact with the Conflux blockchain - either by reading blockchain data or sending transactions to the network - it must connect to an Conflux node."}),"\n",(0,r.jsxs)(t.p,{children:["For this purpose, every ",(0,r.jsx)(t.a,{href:"https://github.com/conflux-chain/conflux-rust",children:"Conflux client"})," implements a ",(0,r.jsx)(t.a,{href:"https://github.com/Conflux-Chain/jsonrpc-spec",children:"JSON-RPC specification"}),", so there are a uniform set of methods that applications can rely on regardless of the specific node or client implementation."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://www.jsonrpc.org/specification",children:"JSON-RPC"})," is a stateless, light-weight remote procedure call (RPC) protocol. It defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format."]}),"\n",(0,r.jsx)(t.h2,{id:"convenience-libraries",children:"CONVENIENCE LIBRARIES"}),"\n",(0,r.jsxs)(t.p,{children:["While you may choose to interact directly with Conflux clients via the JSON-RPC API, there are often easier options for dapp developers. Many ",(0,r.jsx)(t.a,{href:"https://github.com/conflux-chain/js-conflux-sdk",children:"JavaScript"})," and ",(0,r.jsx)(t.a,{href:"https://github.com/conflux-chain/go-conflux-sdk",children:"backend API"})," libraries exist to provide wrappers on top of the JSON-RPC API. With these libraries, developers can write intuitive, one-line methods in the programming language of their choice to initialize JSON-RPC requests (under the hood) that interact with Conflux."]}),"\n",(0,r.jsx)(t.h2,{id:"json-rpc-endpoints",children:"JSON-RPC endpoints"}),"\n",(0,r.jsxs)(t.p,{children:["Currently, Conflux has a ",(0,r.jsx)(t.a,{href:"https://github.com/Conflux-Chain/conflux-rust",children:"Rust implementation"})," that supports JSON-RPC 2.0 over an HTTP, TPC, or WebSocket connection."]}),"\n",(0,r.jsx)(t.p,{children:"If you are a node operator, you can enable and configure various RPC interfaces through the TOML config file, or directly by passing command line arguments. The main configuration items are listed in the table below. Note that if you want to enable HTTPS or access control, you will need to set up a proxy for your node."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"config parameter"}),(0,r.jsx)(t.th,{children:"cli parameter"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"default port"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"enabled by default"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jsonrpc_ws_port"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"--jsonrpc-ws-port"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"12535"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"no"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jsonrpc_tcp_port"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"--jsonrpc-tcp-port"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"12536"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"no"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jsonrpc_http_port"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"--jsonrpc-http-port"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"12537"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"no"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jsonrpc_local_tcp_port"})}),(0,r.jsx)(t.td,{children:"-"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"12538"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"no"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jsonrpc_local_http_port"})}),(0,r.jsx)(t.td,{children:"-"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"12539"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"yes"})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"method-namespace",children:"Method Namespace"}),"\n",(0,r.jsxs)(t.p,{children:["The JSON-RPC API is organized into namespaces, with each namespace containing a set of methods. All methods name in one namespace have a same prefix, for example all methods in ",(0,r.jsx)(t.code,{children:"cfx namespace"})," have a same prefix ",(0,r.jsx)(t.code,{children:"cfx_"})," eg ",(0,r.jsx)(t.code,{children:"cfx_getBalance"}),", ",(0,r.jsx)(t.code,{children:"cfx_getTransactionByHash"}),". The following namespaces are currently supported:"]}),"\n","\n","\n",(0,r.jsx)(s.Z,{})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},17661:(e,t,n)=>{n.d(t,{Z:()=>m});n(67294);var r=n(36905),i=n(78259),s=n(34791),c=n(2735),o=n(97325),a=n(13899);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=n(85893);function h(e){let{href:t,children:n}=e;return(0,d.jsx)(s.Z,{href:t,className:(0,r.Z)("card padding--lg",l.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:i,description:s}=e;return(0,d.jsxs)(h,{href:t,children:[(0,d.jsxs)(a.Z,{as:"h2",className:(0,r.Z)("text--truncate",l.cardTitle),title:i,children:[n," ",i]}),s&&(0,d.jsx)("p",{className:(0,r.Z)("text--truncate",l.cardDescription),title:s,children:s})]})}function x(e){let{item:t}=e;const n=(0,i.LM)(t);return n?(0,d.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,o.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function u(e){let{item:t}=e;const n=(0,c.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.xz)(t.docId??void 0);return(0,d.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function j(e){let{item:t}=e;switch(t.type){case"link":return(0,d.jsx)(u,{item:t});case"category":return(0,d.jsx)(x,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function f(e){let{className:t}=e;const n=(0,i.jA)();return(0,d.jsx)(m,{items:n.items,className:t})}function m(e){const{items:t,className:n}=e;if(!t)return(0,d.jsx)(f,{...e});const s=(0,i.MN)(t);return(0,d.jsx)("section",{className:(0,r.Z)("row",n),children:s.map(((e,t)=>(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(j,{item:e})},t)))})}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>c});var r=n(67294);const i={},s=r.createContext(i);function c(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);