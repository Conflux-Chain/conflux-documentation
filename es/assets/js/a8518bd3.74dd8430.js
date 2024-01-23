"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9762],{67598:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var t=o(85893),s=o(11151);const i={sidebar_position:6,title:"FAQs",displayed_sidebar:"generalSidebar"},r=void 0,a={id:"general/mine-stake/stake/faqs",title:"FAQs",description:"Is Conflux PoS node and PoW node use the same client?",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/mine-stake/stake/faqs.md",sourceDirName:"general/mine-stake/stake",slug:"/general/mine-stake/stake/faqs",permalink:"/es/docs/general/mine-stake/stake/faqs",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"FAQs",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Run a PoS Node on AWS",permalink:"/es/docs/general/mine-stake/stake/run-pos-node-on-aws"},next:{title:"Hard Forks",permalink:"/es/docs/general/hardforks/"}},d={},l=[{value:"Is Conflux PoS node and PoW node use the same client?",id:"is-conflux-pos-node-and-pow-node-use-the-same-client",level:2},{value:"What is forced retirement?",id:"what-is-forced-retirement",level:2},{value:"Why my node is force retired?",id:"why-my-node-is-force-retired",level:2},{value:"How can I safely restart my PoS node?",id:"how-can-i-safely-restart-my-pos-node",level:2}];function c(e){const n={code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"is-conflux-pos-node-and-pow-node-use-the-same-client",children:"Is Conflux PoS node and PoW node use the same client?"}),"\n",(0,t.jsx)(n.p,{children:"Yes, the PoS node and PoW node use the same client. A conflux node works as a PoS node and a PoW node at the same time."}),"\n",(0,t.jsx)(n.h2,{id:"what-is-forced-retirement",children:"What is forced retirement?"}),"\n",(0,t.jsxs)(n.p,{children:["If a candidate is elected to join the committee but does not participate in signing between two elections, all the locked votes will unlock automatically. This can happen if your PoS node is offline for some reason. In this case, the node's PoS account will be unable to acquire voting power for the following 1-14 days. This mechanism is often referred to as ",(0,t.jsx)(n.em,{children:"forced retirement"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"why-my-node-is-force-retired",children:"Why my node is force retired?"}),"\n",(0,t.jsx)(n.p,{children:"If a PoS node is elected to the PoS committee but fails to actively participate in voting for PoS blocks and other election-related activities, it will be forcibly retired. The following situations may lead to the forced retirement of a node:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"PoS node downtime or lag in data synchronization."}),"\n",(0,t.jsxs)(n.li,{children:["Mismatch between the ",(0,t.jsx)(n.code,{children:"pos_config/pos_key"})," file and the ",(0,t.jsx)(n.code,{children:"pos_db/secure_storage.json"})," file, resulting in abnormal voting."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The second scenario may occur if the ",(0,t.jsx)(n.code,{children:"pos_config/pos_key"})," file of an existing node is deleted without removing the corresponding ",(0,t.jsx)(n.code,{children:"pos_db/secure_storage.json"})," file. If you need to regenerate the PoS account private key, both of these files need to be deleted together."]}),"\n",(0,t.jsx)(n.h2,{id:"how-can-i-safely-restart-my-pos-node",children:"How can I safely restart my PoS node?"}),"\n",(0,t.jsx)(n.p,{children:"To prevent forced retirement while restarting your PoS node, it is recommended to follow the these steps:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Run ",(0,t.jsx)(n.code,{children:"./conflux RPC local pos stop_election"})," on the PoS node. The node will return either ",(0,t.jsx)(n.code,{children:"NULL"})," or a future PoS block number. After running this command, the node will not apply to join the PoS committee in the next term."]}),"\n",(0,t.jsxs)(n.li,{children:["If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return ",(0,t.jsx)(n.code,{children:"NULL"}),". The node will no longer receive PoS rewards after this block."]}),"\n",(0,t.jsxs)(n.li,{children:["Once the command returns ",(0,t.jsx)(n.code,{children:"NULL"}),", the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards)."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>r});var t=o(67294);const s={},i=t.createContext(s);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);