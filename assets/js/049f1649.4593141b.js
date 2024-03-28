"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[4253],{60612:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>h});var o=n(85893),s=n(11151),i=n(17661);const r={sidebar_position:1,title:"Proof of Work",displayed_sidebar:"generalSidebar"},a=void 0,c={id:"general/conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work",title:"Proof of Work",description:"Concept of PoW",source:"@site/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work.mdx",sourceDirName:"general/conflux-basics/consensus-mechanisms/proof-of-work",slug:"/general/conflux-basics/consensus-mechanisms/proof-of-work/",permalink:"/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/",draft:!1,unlisted:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Proof of Work",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Consensus",permalink:"/docs/general/conflux-basics/consensus-mechanisms/"},next:{title:"The Tree-Graph",permalink:"/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/tree-graph"}},l={},h=[{value:"Concept of PoW",id:"concept-of-pow",level:2},{value:"Bitcoin&#39;s PoW Consensus",id:"bitcoins-pow-consensus",level:2},{value:"Conflux&#39;s PoW Consensus",id:"confluxs-pow-consensus",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",h2:"h2",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"concept-of-pow",children:"Concept of PoW"}),"\n",(0,o.jsx)(t.p,{children:"The concept of Proof of Work (PoW)  was first introduced by Cynthia Dwork and Moni Naor in 1993 as a means to prevent spam emails. The concept was simple: require the email sender to solve a computational problem before sending. The computational problem is designed to be time-consuming, requiring certain amount of computational power to solve.  The receiver of the email would then verify that the sender had solved the computational problem before accepting the email. This verification process would ensure that only legitimate emails are accepted and that spammers are unable to flood the receiver's inbox with unsolicited emails."}),"\n",(0,o.jsx)(t.p,{children:'The idea behind this was to make it much more difficult and resource-intensive for spammers to send mass emails, while still allowing legitimate email senders to send their messages but with little inconvenience. While the concept of PoW for email spam prevention was sound, it was not widely adopted due to the inconvenience it posed to legitimate email senders. However, the concept of PoW was later adapted by Satoshi Nakamoto to create the peer-to-peer electronic cash system, or the blockchain "bitcoin".'}),"\n",(0,o.jsx)(t.h2,{id:"bitcoins-pow-consensus",children:"Bitcoin's PoW Consensus"}),"\n",(0,o.jsx)(t.p,{children:"Bitcoin uses PoW mechanism to determine who can mine new blocks on the blockchain. The process of mining a block involves repeatedly hashing the block header with a nonce value to find a hash that meets the current difficulty target set by the network. Miners compete to solve this puzzle, and the first miner to solve it is rewarded with newly minted bitcoins and any transaction fees associated with the transactions in the block."}),"\n",(0,o.jsxs)(t.p,{children:["Besides, the ",(0,o.jsx)(t.strong,{children:"Longest Chain Rule"})," is is introduced to ensure that the network agrees on a single version of the blockchain. If two miners create blocks at the same time, a fork in the blockchain occurs, creating two competing versions of the blockchain. To determine which of the two forks is the valid one, the Longest Chain Rule is applied. This rule states that the valid fork is the one with the longest chain of blocks, i.e., the one with the most proof of work invested in it."]}),"\n",(0,o.jsx)(t.p,{children:"By making it difficult and resource-intensive to create new blocks, PoW ensures that the network is secure and that no single entity can control the system unless it controls over 51% of the computing power. In addition, the reward system incentivizes miners to participate in and maintain the network. The introduction of PoW has revolutionized the way we think about decentralized systems and has paved the way for the development of many other cryptocurrencies and blockchain applications."}),"\n",(0,o.jsx)(t.h2,{id:"confluxs-pow-consensus",children:"Conflux's PoW Consensus"}),"\n",(0,o.jsxs)(t.p,{children:["Conflux also uses the PoW consensus mechanism to secure its network. Combining the ",(0,o.jsx)(t.a,{href:"https://arxiv.org/pdf/1805.03870.pdf",children:"Tree-Graph"})," ledger structure and the ",(0,o.jsx)(t.a,{href:"https://confluxnetwork.medium.com/conflux-research-group-ghast-mechanism-adaptive-weight-ghast-explained-part-1-ffe8224a7282",children:"GHAST"})," chain selection rule,  it can achieve the same level of decentralization and security as Bitcoin and Ethereum but provide more than two orders of magnitude improvement on transaction throughput (TPS) and confirmation latency."]}),"\n","\n","\n",(0,o.jsx)(i.Z,{}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsxs)(t.p,{children:["Refer to the ",(0,o.jsx)(t.a,{href:"https://confluxnetwork.org/files/Conflux_Technical_Presentation_20200309.pdf",children:"Conflux Technical Presentation"})," page 45-47 for the most accurate description of Conflux's throughput."]}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},17661:(e,t,n)=>{n.d(t,{Z:()=>x});n(67294);var o=n(36905),s=n(78259),i=n(34791),r=n(2735),a=n(97325),c=n(13899);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var h=n(85893);function d(e){let{href:t,children:n}=e;return(0,h.jsx)(i.Z,{href:t,className:(0,o.Z)("card padding--lg",l.cardContainer),children:n})}function u(e){let{href:t,icon:n,title:s,description:i}=e;return(0,h.jsxs)(d,{href:t,children:[(0,h.jsxs)(c.Z,{as:"h2",className:(0,o.Z)("text--truncate",l.cardTitle),title:s,children:[n," ",s]}),i&&(0,h.jsx)("p",{className:(0,o.Z)("text--truncate",l.cardDescription),title:i,children:i})]})}function f(e){let{item:t}=e;const n=(0,s.LM)(t);return n?(0,h.jsx)(u,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,a.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function m(e){let{item:t}=e;const n=(0,r.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,s.xz)(t.docId??void 0);return(0,h.jsx)(u,{href:t.href,icon:n,title:t.label,description:t.description??o?.description})}function p(e){let{item:t}=e;switch(t.type){case"link":return(0,h.jsx)(m,{item:t});case"category":return(0,h.jsx)(f,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function w(e){let{className:t}=e;const n=(0,s.jA)();return(0,h.jsx)(x,{items:n.items,className:t})}function x(e){const{items:t,className:n}=e;if(!t)return(0,h.jsx)(w,{...e});const i=(0,s.MN)(t);return(0,h.jsx)("section",{className:(0,o.Z)("row",n),children:i.map(((e,t)=>(0,h.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,h.jsx)(p,{item:e})},t)))})}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>r});var o=n(67294);const s={},i=o.createContext(s);function r(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);