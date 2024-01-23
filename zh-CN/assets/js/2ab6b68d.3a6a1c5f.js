"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6192],{87451:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>t,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var a=n(85893),i=n(11151);const r={sidebar_position:10,title:"\u71c3\u6c14",displayed_sidebar:"generalSidebar"},c=void 0,l={id:"general/conflux-basics/gas",title:"\u71c3\u6c14",description:"Conflux users(both Core Space and eSpace) usually see fields like gasFee, gas, and gasPrice when they are sending transactions using their wallets (Fluent) or SDK. This article is going to explain in detail about what these concepts mean.",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/conflux-basics/gas.md",sourceDirName:"general/conflux-basics",slug:"/general/conflux-basics/gas",permalink:"/zh-CN/docs/general/conflux-basics/gas",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"\u71c3\u6c14",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"\u8d26\u6237\u548c\u5730\u5740",permalink:"/zh-CN/docs/general/conflux-basics/accounts"},next:{title:"\u6cbb\u7406\u6982\u89c8",permalink:"/zh-CN/docs/general/conflux-basics/conflux-governance/governance-overview"}},t={},d=[{value:"gasFee",id:"gasfee",level:2},{value:"\u4e3a\u4ec0\u4e48\u8981\u652f\u4ed8\u8d39\u7528",id:"\u4e3a\u4ec0\u4e48\u8981\u652f\u4ed8\u8d39\u7528",level:2},{value:"\u4ec0\u4e48\u662fGas",id:"\u4ec0\u4e48\u662fgas",level:2},{value:"Gas Limit",id:"gas-limit",level:2},{value:"gasPrice",id:"gasprice",level:2},{value:"\u5982\u4f55\u8ba1\u7b97gasFee",id:"\u5982\u4f55\u8ba1\u7b97gasfee",level:2},{value:"gasUsed",id:"gasused",level:3},{value:"gasCharged",id:"gascharged",level:3},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",level:3},{value:"\u4e86\u89e3\u66f4\u591a",id:"\u4e86\u89e3\u66f4\u591a",level:2},{value:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",level:2},{value:"1. Conflux\u7f51\u7edc\u4e2d\u6709\u6ca1\u6709\u7b26\u5408EIP-1559\u6807\u51c6\u7684\u4ea4\u6613\uff1f",id:"1-conflux\u7f51\u7edc\u4e2d\u6709\u6ca1\u6709\u7b26\u5408eip-1559\u6807\u51c6\u7684\u4ea4\u6613",level:3}];function o(e){const s={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(s.p,{children:["Conflux users(both Core Space and eSpace) usually see fields like ",(0,a.jsx)(s.code,{children:"gasFee"}),", ",(0,a.jsx)(s.code,{children:"gas"}),", and ",(0,a.jsx)(s.code,{children:"gasPrice"})," when they are sending transactions using their wallets (Fluent) or SDK. This article is going to explain in detail about what these concepts mean."]}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.img,{alt:"Sign Transaction",src:n(75150).Z+"",width:"800",height:"638"})}),"\n",(0,a.jsx)(s.h2,{id:"gasfee",children:"gasFee"}),"\n",(0,a.jsxs)(s.p,{children:["\u5728\u73b0\u5b9e\u751f\u6d3b\u4e2d\uff0c\u5f53\u6211\u4eec\u5728\u94f6\u884c\u5411\u522b\u4eba\u6c47\u6b3e\u65f6\uff0c\u6211\u4eec\u901a\u5e38\u8981\u652f\u4ed8\u4ea4\u6613\u8d39\u7528\u3002 \u5728\u533a\u5757\u94fe\uff08\u6bd4\u7279\u5e01\u3001\u4ee5\u592a\u574a\u3001Conflux\uff09\u4e2d\u53d1\u9001\u4ea4\u6613\u4e5f\u662f\u4e00\u6837\u7684\u3002 ",(0,a.jsx)(s.code,{children:"gasFee"}),"\u662f\u53d1\u9001\u4ea4\u6613\u7684\u8d39\u7528\u3002 \u901a\u5e38\uff0c\u5b83\u9700\u8981\u7528\u94fe\u7684\u539f\u751f\u4ee3\u5e01\u6765\u652f\u4ed8\u3002 \u4ee5Conflux\u4e3a\u4f8b\uff0c\u9700\u8981\u7528CFX\u6765\u652f\u4ed8\u4ea4\u6613\u8d39\u7528\uff08gas\u8d39\u7528\uff09\u3002"]}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.img,{alt:"tx gas charged",src:n(62628).Z+"",width:"1680",height:"899"})}),"\n",(0,a.jsx)(s.h2,{id:"\u4e3a\u4ec0\u4e48\u8981\u652f\u4ed8\u8d39\u7528",children:"\u4e3a\u4ec0\u4e48\u8981\u652f\u4ed8\u8d39\u7528"}),"\n",(0,a.jsx)(s.p,{children:"\u4f17\u6240\u5468\u77e5\uff0c\u533a\u5757\u94fe\u5b9e\u9645\u4e0a\u662f\u4e00\u4e2a\u53bb\u4e2d\u5fc3\u5316\u7684\u8d26\u672c\uff0c\u7531\u77ff\u5de5\u7ef4\u62a4\u3002 \u77ff\u5de5\u5b58\u50a8\u6570\u636e\u548c\u751f\u6210\u533a\u5757\uff08\u8ba1\u7b97\u54c8\u5e0c\uff09\u6709\u4e00\u5b9a\u7684\u6210\u672c\u3002 \u56e0\u6b64\uff0c\u4e3a\u4e86\u6fc0\u52b1\u77ff\u5de5\u79ef\u6781\u53c2\u4e0e\u94fe\u7ef4\u62a4\u548c\u4fdd\u62a4\u7f51\u7edc\u5b89\u5168\uff0c\u533a\u5757\u94fe\u5171\u8bc6\u7cfb\u7edf\u88ab\u8bbe\u8ba1\u4e3a\u5305\u542b\u4e00\u4e2a\u5bf9\u77ff\u5de5\u7684\u5956\u52b1\u673a\u5236\uff0c\u800c\u4ea4\u6613\u8d39\u5c31\u662f\u77ff\u5de5\u7684\u5956\u52b1\u4e4b\u4e00\uff0c\u5b83\u5c06\u652f\u4ed8\u7ed9\u53c2\u4e0e\u751f\u6210\u533a\u5757\u7684\u77ff\u5de5\u3002 \u8fd9\u4e2a\u673a\u5236\u53ef\u4ee5\u4fdd\u8bc1\u6574\u4e2a\u53bb\u4e2d\u5fc3\u5316\u7f51\u7edc\u7684\u53ef\u6301\u7eed\u6027\u3002"}),"\n",(0,a.jsx)(s.p,{children:"\u53e6\u5916\uff0cgas\u8d39\u7528\u673a\u5236\u4e5f\u53ef\u4ee5\u9632\u6b62\u6ee5\u7528\u4ea4\u6613\uff0c\u4ece\u800c\u63d0\u9ad8\u533a\u5757\u94fe\u5229\u7528\u6548\u7387\u3002"}),"\n",(0,a.jsx)(s.h2,{id:"\u4ec0\u4e48\u662fgas",children:"\u4ec0\u4e48\u662fGas"}),"\n",(0,a.jsxs)(s.p,{children:["Gas\u7684\u6982\u5ff5\u501f\u9274\u4e86\u73b0\u5b9e\u4e2d\u7684\u201c\u6c7d\u6cb9\u201d\u3002 \u6c7d\u8f66\u6d88\u8017\u6c7d\u6cb9\u6765\u884c\u9a76\u3002 \u6c7d\u8f66\u884c\u9a76\u5f97\u8d8a\u8fdc\uff0c\u6d88\u8017\u7684\u6c7d\u6cb9\u5c31\u8d8a\u591a\u3002 \u5728EVM\u533a\u5757\u94fe\u4e2d\uff0cgas\u8868\u793a\u6267\u884c\u4e00\u7b14\u4ea4\u6613\u6240\u9700\u7684\u5de5\u4f5c\u603b\u91cf\u3002 Therefore, it is a ",(0,a.jsx)(s.strong,{children:"unit that measures the amount of computation"})," required to perform certain operations."]}),"\n",(0,a.jsxs)(s.p,{children:["\u5177\u4f53\u6765\u8bf4\uff0c\u6240\u6709Conflux\u7684\u4ea4\u6613\u90fd\u662f\u7531EVM\u6267\u884c\u7684\uff0c\u5305\u62ec\u666e\u901a\u7684CFX\u8f6c\u8d26\u548c\u667a\u80fd\u5408\u7ea6\u65b9\u6cd5\u8c03\u7528\u3002 \u5f53\u8fd9\u4e9b\u64cd\u4f5c\u88ab\u6267\u884c\u65f6\uff0c\u5b83\u4eec\u88ab\u7f16\u8bd1\u6210\u5355\u4e2aOPCode\u3002 \u6267\u884c\u6bcf\u4e2aOPCode\u6240\u9700\u7684\u5de5\u4f5c\u91cf\u4e0d\u540c\u3002 \u5173\u4e8eOPCode gas\u8d39\u7528\u7684\u66f4\u591a\u4fe1\u606f\u53ef\u4ee5\u5728",(0,a.jsx)(s.a,{href:"https://ethereum.org/en/developers/docs/evm/opcodes/",children:"\u8fd9\u91cc"}),"\u627e\u5230\u3002"]}),"\n",(0,a.jsxs)(s.p,{children:["\u901a\u5e38\uff0c\u4e00\u7b14\u666e\u901a\u7684CFX\u8f6c\u8d26\u6240\u6d88\u8017\u7684gas\u4e3a",(0,a.jsx)(s.code,{children:"21000"}),"\u3002 \u4e00\u7b14\u667a\u80fd\u5408\u7ea6\u4ea4\u6613\u901a\u5e38\u9700\u8981\u66f4\u591a\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u5408\u7ea6\u6267\u884c\u7684\u590d\u6742\u5ea6\u3002"]}),"\n",(0,a.jsx)(s.h2,{id:"gas-limit",children:"Gas Limit"}),"\n",(0,a.jsxs)(s.p,{children:["\u5728\u6784\u9020\u4e00\u7b14\u4ea4\u6613\u65f6\uff0c",(0,a.jsx)(s.code,{children:"gas"}),"\u5b57\u6bb5\u975e\u5e38\u91cd\u8981\uff0c\u56e0\u4e3a\u8be5\u5b57\u6bb5\u672c\u8eab\u8868\u793a\u4ea4\u6613\u6267\u884c\u6240\u80fd\u6d88\u8017\u7684",(0,a.jsx)(s.code,{children:"gas\u7684\u4e0a\u9650"}),"\u3002"]}),"\n",(0,a.jsx)(s.p,{children:"\u6b63\u786e\u586b\u5199gas\u5b57\u6bb5\u975e\u5e38\u91cd\u8981\u3002 \u5982\u679c\u71c3\u6599\u9650\u5236\u8bbe\u7f6e\u4e3a\u5c0f\u4e8e\u5b9e\u9645\u6240\u9700gas\u91cf\u7684\u503c\uff0c\u4ea4\u6613\u5c06\u5931\u8d25\u3002 \u5982\u679cgas\u9650\u5236\u8bbe\u7f6e\u5f97\u592a\u9ad8\uff0c\u4f60\u53ef\u80fd\u4f1a\u652f\u4ed8\u6bd4\u4f60\u5b9e\u9645\u9700\u8981\u7684\u66f4\u591a\u7684gas\u3002"}),"\n",(0,a.jsx)(s.admonition,{type:"info",children:(0,a.jsxs)(s.p,{children:["It should be mentioned that transaction will typically fail if the gas limit is exactly set to gas consumption due to ",(0,a.jsx)(s.a,{href:"https://eips.ethereum.org/EIPS/eip-150",children:"EIP-150"}),"."]})}),"\n",(0,a.jsx)(s.p,{children:"Conflux\u7f51\u7edc\u4e2d\u5355\u7b14\u4ea4\u6613\u7684\u6700\u5927gas\u9650\u5236\u662f15M\u3002 \u8fd9\u786e\u4fdd\u4e86\u4ea4\u6613\u4e0d\u4f1a\u8fc7\u5ea6\u6d88\u8017EVM\u8d44\u6e90\u3002"}),"\n",(0,a.jsx)(s.h2,{id:"gasprice",children:"gasPrice"}),"\n",(0,a.jsx)(s.p,{children:"\u4ea4\u6613\u7684gasPrice\u7531\u4ea4\u6613\u53d1\u9001\u8005\u6307\u5b9a\uff0c\u8868\u793a\u8be5\u4eba\u613f\u610f\u652f\u4ed8\u7684\u6bcf\u5355\u4f4dgas\u7684\u8d39\u7528\u3002 The unit of gasPrice is GDrip, where 1 GDrip is equal to 0.000000001 CFX (10**-9 CFX)."}),"\n",(0,a.jsx)(s.p,{children:"\u4ea4\u6613\u7684gasPrice\u503c\u5f71\u54cd\u4e86\u4ea4\u6613\u88ab\u77ff\u5de5\u6253\u5305\u7684\u901f\u5ea6\uff0c\u56e0\u4e3a\u77ff\u5de5\u4f1a\u4f18\u5148\u6253\u5305gasPrice\u8f83\u9ad8\u7684\u4ea4\u6613\uff0c\u4ee5\u83b7\u5f97\u66f4\u591a\u7684\u5229\u6da6\u3002 \u5f53\u7f51\u7edc\u4e0d\u62e5\u5835\u65f6\uff0c\u5c06gasPrice\u8bbe\u7f6e\u4e3a1Gdrip\u5c31\u8db3\u4ee5\u6b63\u5e38\u6253\u5305\u3002 \u7136\u800c\uff0c\u5f53\u7f51\u7edc\u62e5\u5835\u65f6\uff0c\u66f4\u591a\u7684\u4ea4\u6613\u5728\u7b49\u5f85\u6253\u5305\u3002 \u8fd9\u65f6\uff0c\u5982\u679cgasPrice\u8bbe\u7f6e\u5f97\u6bd4\u5927\u591a\u6570\u5176\u4ed6\u4ea4\u6613\u4f4e\uff0c\u5b83\u5c06\u4e0d\u4f1a\u88ab\u6253\u5305\uff0c\u800c\u662f\u4e00\u76f4\u7b49\u5f85\u3002"}),"\n",(0,a.jsx)(s.p,{children:"\u56e0\u6b64\uff0c\u5982\u679c\u4f60\u60f3\u8ba9\u4ea4\u6613\u5feb\u901f\u6253\u5305\uff0c\u4f60\u53ef\u4ee5\u5c06gasPrice\u8bbe\u7f6e\u5f97\u9ad8\u4e00\u4e9b\u3002 \u901a\u5e38\u5728Conflux\u4e2d\u5c06\u5176\u8bbe\u7f6e\u4e3a10G-1000G\u5c31\u8db3\u591f\u9ad8\uff0c\u4ee5\u786e\u4fdd\u5b83\u5feb\u901f\u6267\u884c\u3002"}),"\n",(0,a.jsx)(s.p,{children:"\u6ce8\u610f\uff1a\u4e0d\u8981\u5c06gasPrice\u8bbe\u7f6e\u5f97\u592a\u9ad8\u3002 \u5b83\u53ef\u80fd\u5bfc\u81f4\u5929\u4ef7\u7684\u4ea4\u6613\u8d39\u7528\u3002 \u5982\u679cgasPrice\u8bbe\u7f6e\u4e3a1CFX\uff0c\u90a3\u4e48\u4e00\u7b14\u666e\u901a\u8f6c\u8d26\u7684\u8d39\u7528\u662f21000 CFX\uff0c\u8fd9\u5bf9\u4e8e\u4e00\u7b14\u4ea4\u6613\u6765\u8bf4\u662f\u76f8\u5f53\u591a\u7684\u3002"}),"\n",(0,a.jsx)(s.h2,{id:"\u5982\u4f55\u8ba1\u7b97gasfee",children:"\u5982\u4f55\u8ba1\u7b97gasFee"}),"\n",(0,a.jsxs)(s.p,{children:["gasFee\u662f\u4e00\u7b14\u4ea4\u6613\u652f\u4ed8\u7684\u603bgas\u8d39\u7528\u3002 It is calculated as ",(0,a.jsx)(s.code,{children:"gasFee = gasCharged * gasPrice"}),". gasFee\u91c7\u7528CFX\u7684\u6700\u5c0f\u5355\u4f4dDrip\u3002"]}),"\n",(0,a.jsxs)(s.p,{children:["\u5047\u8bbe\u6709\u4e00\u7b141 CFX\u7684\u666e\u901a\u8f6c\u8d26\uff0cgas\u9650\u5236\u53ef\u4ee5\u8bbe\u7f6e\u4e3a21,000\u3002 \u5982\u679cgasPrice\u8bbe\u7f6e\u4e3a1GDrip\uff0c\u90a3\u4e48\u4ea4\u6613\u7684\u603b\u6210\u672c\u662f",(0,a.jsx)(s.code,{children:"1 + 21000 * 0.000000001 = 1.000021 CFX"}),"\uff0c\u5176\u4e2d1 CFX\u8f6c\u5230\u6536\u6b3e\u4eba\u7684\u8d26\u6237\uff0c0.000021 CFX\u662f\u77ff\u5de5\u7684\u5956\u52b1\u3002"]}),"\n",(0,a.jsx)(s.h3,{id:"gasused",children:"gasUsed"}),"\n",(0,a.jsx)(s.p,{children:"The actual gas consumed during transaction execution."}),"\n",(0,a.jsx)(s.h3,{id:"gascharged",children:"gasCharged"}),"\n",(0,a.jsxs)(s.p,{children:["The charged amount of gas. ",(0,a.jsxs)(s.strong,{children:["The ",(0,a.jsx)(s.code,{children:"gasCharged"})," may be greater than ",(0,a.jsx)(s.code,{children:"gasUsed"}),", because not all unused gas will be refunded."]})]}),"\n",(0,a.jsxs)(s.p,{children:["In a Conflux transaction, if the ",(0,a.jsx)(s.code,{children:"gas limit"})," is more than the actual amount of gas consumed (",(0,a.jsx)(s.code,{children:"gasUsed"}),"), the exceeding part will be returned. The returning amount of gas ",(0,a.jsx)(s.strong,{children:"can only be up to"})," a quarter of the ",(0,a.jsx)(s.code,{children:"gas limit"}),"."]}),"\n",(0,a.jsx)(s.h3,{id:"\u793a\u4f8b",children:"\u793a\u4f8b"}),"\n",(0,a.jsxs)(s.p,{children:["\u5047\u8bbe\u4e00\u7b14\u666e\u901aCFX\u8f6c\u8d26\u7684gas\u9650\u5236\u8bbe\u7f6e\u4e3a100k\uff0c\u5b9e\u9645\u6267\u884c\u6d88\u8017\u4e8621,000\uff0c\u7531\u4e8e\u4ea4\u6613\u7684gas\u9650\u5236\u8bbe\u7f6e\u5f97\u592a\u9ad8\uff0c\u6700\u591a\u670925,000\u7684gas\u8d39\u7528\u4f1a\u88ab\u9000\u8fd8\uff08gas limit\u768425%\uff09\u3002 \u8be5\u4ea4\u6613\u4f7f\u7528\u7684gas\u5c06\u662f",(0,a.jsx)(s.code,{children:"0.000075 CFX"}),"\u3002"]}),"\n",(0,a.jsxs)(s.p,{children:["\u5982\u679c\u4ea4\u6613\u7684gas\u9650\u5236\u8bbe\u7f6e\u5f97\u4e0d\u662f\u90a3\u4e48\u9ad8\uff0c\u4ee5\u524d\u9762\u7684\u4f8b\u5b50\u4e3a\u4f8b\uff0c\u4f46\u5c06gas\u9650\u5236\u8bbe\u7f6e\u4e3a25000\uff0c\u6bd4\u5b9e\u9645\u4f7f\u7528\u7684\u591a4000\uff0c\u8d85\u51fa\u90e8\u5206\u4e0d\u8d85\u8fc7gas\u9650\u5236\u7684\u56db\u5206\u4e4b\u4e00\u3002 \u8fd9\u90e8\u5206\u5c06\u88ab\u5b8c\u5168\u9000\u8fd8\uff0c\u6700\u7ec8\u6536\u53d6\u7684\u8d39\u7528\u4ecd\u7136\u662f",(0,a.jsx)(s.code,{children:"0.000021 CFX"}),"\u3002"]}),"\n",(0,a.jsx)(s.h2,{id:"\u4e86\u89e3\u66f4\u591a",children:"\u4e86\u89e3\u66f4\u591a"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"https://ethereum.org/en/developers/docs/gas/",children:"Ethereum Developer Documentation: Gas and Fees"})}),"\n"]}),"\n",(0,a.jsx)(s.h2,{id:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",children:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54"}),"\n",(0,a.jsx)(s.h3,{id:"1-conflux\u7f51\u7edc\u4e2d\u6709\u6ca1\u6709\u7b26\u5408eip-1559\u6807\u51c6\u7684\u4ea4\u6613",children:"1. Conflux\u7f51\u7edc\u4e2d\u6709\u6ca1\u6709\u7b26\u5408EIP-1559\u6807\u51c6\u7684\u4ea4\u6613\uff1f"}),"\n",(0,a.jsx)(s.p,{children:"\u76ee\u524d\uff0c\u5728Conflux\u7f51\u7edc\u4e2d\uff0c\u53ea\u6709\u7b26\u5408EIP-155\u6807\u51c6\u7684\u4ea4\u6613\u3002"})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},75150:(e,s,n)=>{n.d(s,{Z:()=>a});const a=n.p+"assets/images/gas1-7cc4ad4cf93fd42551f35d2edf9566cf.png"},62628:(e,s,n)=>{n.d(s,{Z:()=>a});const a=n.p+"assets/images/tx-gas-charged-631705fab32539aea535cfd7c829ba48.jpeg"},11151:(e,s,n)=>{n.d(s,{Z:()=>l,a:()=>c});var a=n(67294);const i={},r=a.createContext(i);function c(e){const s=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),a.createElement(r.Provider,{value:s},e.children)}}}]);