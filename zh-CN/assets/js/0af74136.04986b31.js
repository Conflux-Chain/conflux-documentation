"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[8029],{39770:(e,c,n)=>{n.r(c),n.d(c,{assets:()=>o,contentTitle:()=>t,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var s=n(85893),a=n(11151);const r={sidebar_position:7,title:"\u8fd0\u884c eSpace \u8282\u70b9",displayed_sidebar:"eSpaceSidebar"},t=void 0,i={id:"espace/build/run-a-node",title:"\u8fd0\u884c eSpace \u8282\u70b9",description:"eSpace \u548c Core Space \u5171\u7528\u4e00\u4e2a\u8282\u70b9\u7a0b\u5e8f\uff0c\u8bf7\u53c2\u8003 Core Space \u8282\u70b9\u64cd\u4f5c\u6307\u5357 \u6765\u8fd0\u884c\u8282\u70b9\u3002 \u4ee5\u4e0b\u662f\u4e00\u4e9b\u7279\u5b9a\u4e8e eSpace \u7684\u914d\u7f6e\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/espace/build/run-a-node.md",sourceDirName:"espace/build",slug:"/espace/build/run-a-node",permalink:"/zh-CN/docs/espace/build/run-a-node",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,title:"\u8fd0\u884c eSpace \u8282\u70b9",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"CrossSpaceCall \u5408\u7ea6",permalink:"/zh-CN/docs/espace/build/cross-space-bridge"},next:{title:"\u5df2\u90e8\u7f72\u5408\u7ea6",permalink:"/zh-CN/docs/espace/build/deployed-contracts"}},o={},p=[{value:"eSpace RPC \u914d\u7f6e",id:"espace-rpc-\u914d\u7f6e",level:2},{value:"\u5168\u72b6\u6001",id:"\u5168\u72b6\u6001",level:2},{value:"eSpace \u7684\u94fe ID",id:"espace-\u7684\u94fe-id",level:2},{value:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",level:2},{value:"eth_getTransactionCount \u65b9\u6cd5\u4e0d\u5b58\u5728\u6216\u4e0d\u53ef\u7528",id:"eth_gettransactioncount-\u65b9\u6cd5\u4e0d\u5b58\u5728\u6216\u4e0d\u53ef\u7528",level:3},{value:"eSpace \u662f\u5426\u4e0e Core Space \u4f7f\u7528\u76f8\u540c\u7684\u8282\u70b9\uff1f",id:"espace-\u662f\u5426\u4e0e-core-space-\u4f7f\u7528\u76f8\u540c\u7684\u8282\u70b9",level:3},{value:"eSpace \u8282\u70b9\u662f\u5426\u6709\u533a\u5757\u94fe\u6570\u636e\u5feb\u7167\uff1f",id:"espace-\u8282\u70b9\u662f\u5426\u6709\u533a\u5757\u94fe\u6570\u636e\u5feb\u7167",level:3}];function d(e){const c={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(c.p,{children:["eSpace \u548c Core Space \u5171\u7528\u4e00\u4e2a\u8282\u70b9\u7a0b\u5e8f\uff0c\u8bf7\u53c2\u8003 ",(0,s.jsx)(c.a,{href:"/docs/category/run-a-node",children:"Core Space \u8282\u70b9\u64cd\u4f5c\u6307\u5357"})," \u6765\u8fd0\u884c\u8282\u70b9\u3002 \u4ee5\u4e0b\u662f\u4e00\u4e9b\u7279\u5b9a\u4e8e eSpace \u7684\u914d\u7f6e\u3002"]}),"\n",(0,s.jsx)(c.h2,{id:"espace-rpc-\u914d\u7f6e",children:"eSpace RPC \u914d\u7f6e"}),"\n",(0,s.jsx)(c.p,{children:"\u8981\u8bbe\u7f6e\u4e00\u4e2a eSpace RPC \u8282\u70b9\uff0c\u60a8\u9700\u8981\u6253\u5f00\u4ee5\u4e0b\u914d\u7f6e\u9879\uff1a"}),"\n",(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:"language-toml",children:'jsonrpc_http_eth_port=8545\njsonrpc_ws_eth_port=8546\npublic_evm_rpc_apis = "evm"\n'})}),"\n",(0,s.jsxs)(c.p,{children:["eSpace \u7684 RPC \u7aef\u70b9\u7aef\u53e3\u4e0e Core Space \u4e0d\u540c\uff0c\u60a8",(0,s.jsx)(c.strong,{children:"\u4e0d\u80fd"}),"\u5728 ",(0,s.jsx)(c.strong,{children:"Core Space \u7684 RPC \u7aef\u53e3"}),"\u8bbf\u95ee eth RPC \u63a5\u53e3\u3002"]}),"\n",(0,s.jsx)(c.h2,{id:"\u5168\u72b6\u6001",children:"\u5168\u72b6\u6001"}),"\n",(0,s.jsxs)(c.p,{children:["\u4e3a\u4e86\u542f\u7528\u5b8c\u6574\u7684 eSpace\uff0c\u60a8\u9700\u8981\u5c06 ",(0,s.jsx)(c.code,{children:"single_mpt_space"})," \u53c2\u6570\u8bbe\u7f6e\u4e3a ",(0,s.jsx)(c.code,{children:"evm"})," \u5e76\u8fd0\u884c\u4e00\u4e2a\u5f52\u6863\u8282\u70b9\u3002"]}),"\n",(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:"language-toml",children:'sinle_mpt_space = "evm"\n'})}),"\n",(0,s.jsxs)(c.p,{children:["\u542f\u7528\u5168\u72b6\u6001\u540e\uff0c\u60a8\u53ef\u4ee5\u67e5\u8be2\u5408\u7ea6\u6216\u8d26\u6237",(0,s.jsx)(c.strong,{children:"\u5728\u4efb\u4f55\u533a\u5757\u9ad8\u5ea6"}),"\u7684\u72b6\u6001\u3002"]}),"\n",(0,s.jsx)(c.h2,{id:"espace-\u7684\u94fe-id",children:"eSpace \u7684\u94fe ID"}),"\n",(0,s.jsx)(c.p,{children:"eSpace \u4e3b\u7f51\u7684\u94fe ID \u662f 1030\uff0c\u6d4b\u8bd5\u7f51\u662f 71\u3002 \u901a\u5e38\u60c5\u51b5\u4e0b\uff0c\u60a8\u4e0d\u9700\u8981\u66f4\u6539\u8fd9\u4e2a\u8bbe\u7f6e\u3002"}),"\n",(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:"language-toml",children:"evm_chain_id = 1030\n"})}),"\n",(0,s.jsx)(c.h2,{id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",children:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"}),"\n",(0,s.jsx)(c.h3,{id:"eth_gettransactioncount-\u65b9\u6cd5\u4e0d\u5b58\u5728\u6216\u4e0d\u53ef\u7528",children:"eth_getTransactionCount \u65b9\u6cd5\u4e0d\u5b58\u5728\u6216\u4e0d\u53ef\u7528"}),"\n",(0,s.jsx)(c.p,{children:"\u8bf7\u68c0\u67e5 RPC \u7aef\u53e3\u662f\u5426\u6b63\u786e\u3002 eSpace \u7684\u9ed8\u8ba4\u7684 RPC \u7aef\u53e3\u662f 8545\uff0c\u4e0e Core Space \u7684 RPC \u7aef\u53e3\u4e0d\u540c\u3002"}),"\n",(0,s.jsx)(c.h3,{id:"espace-\u662f\u5426\u4e0e-core-space-\u4f7f\u7528\u76f8\u540c\u7684\u8282\u70b9",children:"eSpace \u662f\u5426\u4e0e Core Space \u4f7f\u7528\u76f8\u540c\u7684\u8282\u70b9\uff1f"}),"\n",(0,s.jsx)(c.p,{children:"\u662f\u7684"}),"\n",(0,s.jsx)(c.h3,{id:"espace-\u8282\u70b9\u662f\u5426\u6709\u533a\u5757\u94fe\u6570\u636e\u5feb\u7167",children:"eSpace \u8282\u70b9\u662f\u5426\u6709\u533a\u5757\u94fe\u6570\u636e\u5feb\u7167\uff1f"}),"\n",(0,s.jsx)(c.p,{children:"\u662f\u7684\uff0c\u4e0e Core Space \u76f8\u540c\u3002"})]})}function l(e={}){const{wrapper:c}={...(0,a.a)(),...e.components};return c?(0,s.jsx)(c,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,c,n)=>{n.d(c,{Z:()=>i,a:()=>t});var s=n(67294);const a={},r=s.createContext(a);function t(e){const c=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(c):{...c,...e}}),[c,e])}function i(e){let c;return c=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:t(e.components),s.createElement(r.Provider,{value:c},e.children)}}}]);