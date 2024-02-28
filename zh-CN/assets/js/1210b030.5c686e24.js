"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[7322],{18776:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var t=o(85893),s=o(11151);const i={sidebar_position:6,title:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",displayed_sidebar:"generalSidebar"},r=void 0,a={id:"general/mine-stake/stake/faqs",title:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",description:"Is Conflux PoS node and PoW node use the same client?",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/mine-stake/stake/faqs.md",sourceDirName:"general/mine-stake/stake",slug:"/general/mine-stake/stake/faqs",permalink:"/zh-CN/docs/general/mine-stake/stake/faqs",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"\u5e38\u89c1\u95ee\u9898\u89e3\u7b54",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Run a PoS Node on AWS",permalink:"/zh-CN/docs/general/mine-stake/stake/run-pos-node-on-aws"},next:{title:"\u786c\u5206\u53c9",permalink:"/zh-CN/docs/general/hardforks/"}},d={},l=[{value:"Is Conflux PoS node and PoW node use the same client?",id:"is-conflux-pos-node-and-pow-node-use-the-same-client",level:2},{value:"\u4ec0\u4e48\u662f\u201c\u5f3a\u5236\u9000\u4f11\u201d\uff1f",id:"\u4ec0\u4e48\u662f\u5f3a\u5236\u9000\u4f11",level:2},{value:"Why my node is force retired?",id:"why-my-node-is-force-retired",level:2},{value:"\u6211\u53ef\u4ee5\u5982\u4f55\u5b89\u5168\u5730\u91cd\u65b0\u542f\u52a8 PoS \u8282\u70b9\uff1f",id:"\u6211\u53ef\u4ee5\u5982\u4f55\u5b89\u5168\u5730\u91cd\u65b0\u542f\u52a8-pos-\u8282\u70b9",level:2},{value:"On which chain are PoS rewards distributed?",id:"on-which-chain-are-pos-rewards-distributed",level:2}];function c(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"is-conflux-pos-node-and-pow-node-use-the-same-client",children:"Is Conflux PoS node and PoW node use the same client?"}),"\n",(0,t.jsx)(n.p,{children:"Yes, the PoS node and PoW node use the same client. A conflux node works as a PoS node and a PoW node at the same time. And the snapshot data of the PoS and PoW also share the same data."}),"\n",(0,t.jsx)(n.h2,{id:"\u4ec0\u4e48\u662f\u5f3a\u5236\u9000\u4f11",children:"\u4ec0\u4e48\u662f\u201c\u5f3a\u5236\u9000\u4f11\u201d\uff1f"}),"\n",(0,t.jsx)(n.p,{children:"\u5982\u679c\u4e00\u4e2a\u5019\u9009\u4eba\u88ab\u9009\u5165\u59d4\u5458\u4f1a\u4f46\u5728\u4e24\u6b21\u9009\u4e3e\u4e4b\u95f4\u6ca1\u6709\u53c2\u4e0e\u7b7e\u540d\uff0c\u6240\u6709\u9501\u5b9a\u7684\u6295\u7968\u5c06\u81ea\u52a8\u89e3\u9501\u3002 \u8fd9\u53ef\u80fd\u53d1\u751f\u5728\u60a8\u7684PoS\u8282\u70b9\u7531\u4e8e\u67d0\u79cd\u539f\u56e0\u5904\u4e8e\u79bb\u7ebf\u72b6\u6001\u65f6\u3002 In this case, the node's PoS account will be unable to acquire voting power for the following 1-14 days. \u8fd9\u4e2a\u673a\u5236\u901a\u5e38\u88ab\u79f0\u4e3a*\u201d\u5f3a\u5236\u9000\u4f11\u201c*"}),"\n",(0,t.jsx)(n.h2,{id:"why-my-node-is-force-retired",children:"Why my node is force retired?"}),"\n",(0,t.jsx)(n.p,{children:"If a PoS node is elected to the PoS committee but fails to actively participate in voting for PoS blocks and other election-related activities, it will be forcibly retired. The following situations may lead to the forced retirement of a node:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"PoS node downtime or lag in data synchronization."}),"\n",(0,t.jsxs)(n.li,{children:["Mismatch between the ",(0,t.jsx)(n.code,{children:"pos_config/pos_key"})," file and the ",(0,t.jsx)(n.code,{children:"pos_db/secure_storage.json"})," file, resulting in abnormal voting."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The second scenario may occur if the ",(0,t.jsx)(n.code,{children:"pos_config/pos_key"})," file of an existing node is deleted without removing the corresponding ",(0,t.jsx)(n.code,{children:"pos_db/secure_storage.json"})," file. If you need to regenerate the PoS account private key, both of these files need to be deleted together."]}),"\n",(0,t.jsx)(n.h2,{id:"\u6211\u53ef\u4ee5\u5982\u4f55\u5b89\u5168\u5730\u91cd\u65b0\u542f\u52a8-pos-\u8282\u70b9",children:"\u6211\u53ef\u4ee5\u5982\u4f55\u5b89\u5168\u5730\u91cd\u65b0\u542f\u52a8 PoS \u8282\u70b9\uff1f"}),"\n",(0,t.jsx)(n.p,{children:"\u4e3a\u4e86\u9632\u6b62\u5728\u91cd\u65b0\u542f\u52a8PoS\u8282\u70b9\u65f6\u53d1\u751f\u5f3a\u5236\u9000\u4f11\uff0c\u5efa\u8bae\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\u64cd\u4f5c\uff1a"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\u5728PoS\u8282\u70b9\u4e0a\u8fd0\u884c",(0,t.jsx)(n.code,{children:"./conflux RPC local pos stop_election"}),"\u547d\u4ee4\u3002 \u8282\u70b9\u5c06\u8fd4\u56de",(0,t.jsx)(n.code,{children:"NULL"}),"\u6216\u672a\u6765\u7684PoS\u533a\u5757\u53f7\u3002 After running this command, the node will not apply to join the PoS committee in the next term."]}),"\n",(0,t.jsxs)(n.li,{children:["If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return ",(0,t.jsx)(n.code,{children:"NULL"}),". The node will no longer receive PoS rewards after this block."]}),"\n",(0,t.jsxs)(n.li,{children:["Once the command returns ",(0,t.jsx)(n.code,{children:"NULL"}),", the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards)."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"on-which-chain-are-pos-rewards-distributed",children:"On which chain are PoS rewards distributed?"}),"\n",(0,t.jsx)(n.p,{children:"PoW chain."})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>r});var t=o(67294);const s={},i=t.createContext(s);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);