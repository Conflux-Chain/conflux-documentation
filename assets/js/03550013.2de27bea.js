"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[7668],{61349:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=n(85893),o=n(11151),a=n(17661);const i={sidebar_position:3,displayed_sidebar:"generalSidebar"},s="Hard Forks",c={id:"general/hardforks/hardforks",title:"Hard Forks",description:"A hard fork represents a significant alteration in a blockchain network's protocol. Such a change is not backward compatible, implying that every network participant must upgrade their software to the latest version to remain an active participant within the network. Upon the execution of the hard forks, all network participants are expected to update their nodes to the newest version. Failure to do so will render them incapable of participating in the validation and verification of new transactions on the blockchain.",source:"@site/docs/general/hardforks/hardforks.md",sourceDirName:"general/hardforks",slug:"/general/hardforks/",permalink:"/docs/general/hardforks/",draft:!1,unlisted:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/hardforks/hardforks.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"FAQs",permalink:"/docs/general/mine-stake/stake/faqs"},next:{title:"v2.0",permalink:"/docs/general/hardforks/v2.0"}},l={},d=[];function h(e){const t={h1:"h1",p:"p",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"hard-forks",children:"Hard Forks"}),"\n",(0,r.jsx)(t.p,{children:"A hard fork represents a significant alteration in a blockchain network's protocol. Such a change is not backward compatible, implying that every network participant must upgrade their software to the latest version to remain an active participant within the network. Upon the execution of the hard forks, all network participants are expected to update their nodes to the newest version. Failure to do so will render them incapable of participating in the validation and verification of new transactions on the blockchain."}),"\n",(0,r.jsx)(t.p,{children:"It's helpful to visualize a hard fork as a split in the blockchain's course. Prior to the hard fork, all participants traveled along the same trajectory. However, following the hard fork, this single path divides into two distinct paths. One continues under the old rules, while the other adheres to the newly implemented rules."}),"\n",(0,r.jsx)(t.p,{children:"However, hard forks are typically preplanned and generally agreed upon by the community in advance, in which case the old blockchain typically ceases to exist. All members upgrade their systems, and the outdated version becomes obsolete."}),"\n",(0,r.jsx)(t.p,{children:"This section itemizes the hard forks of Conflux and provides a description of the associated modifications."}),"\n","\n",(0,r.jsx)(a.Z,{})]})}function u(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},17661:(e,t,n)=>{n.d(t,{Z:()=>x});n(67294);var r=n(36905),o=n(78259),a=n(34791),i=n(23777),s=n(2735),c=n(97325),l=n(13899);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var h=n(85893);function u(e){let{href:t,children:n}=e;return(0,h.jsx)(a.Z,{href:t,className:(0,r.Z)("card padding--lg",d.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:o,description:a}=e;return(0,h.jsxs)(u,{href:t,children:[(0,h.jsxs)(l.Z,{as:"h2",className:(0,r.Z)("text--truncate",d.cardTitle),title:o,children:[n," ",o]}),a&&(0,h.jsx)("p",{className:(0,r.Z)("text--truncate",d.cardDescription),title:a,children:a})]})}function f(e){let{item:t}=e;const n=(0,o.LM)(t),r=function(){const{selectMessage:e}=(0,i.c)();return t=>e(t,(0,c.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,h.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function m(e){let{item:t}=e;const n=(0,s.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,o.xz)(t.docId??void 0);return(0,h.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return(0,h.jsx)(m,{item:t});case"category":return(0,h.jsx)(f,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function k(e){let{className:t}=e;const n=(0,o.jA)();return(0,h.jsx)(x,{items:n.items,className:t})}function x(e){const{items:t,className:n}=e;if(!t)return(0,h.jsx)(k,{...e});const a=(0,o.MN)(t);return(0,h.jsx)("section",{className:(0,r.Z)("row",n),children:a.map(((e,t)=>(0,h.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,h.jsx)(g,{item:e})},t)))})}},23777:(e,t,n)=>{n.d(t,{c:()=>l});var r=n(67294),o=n(39962);const a=["zero","one","two","few","many","other"];function i(e){return a.filter((t=>e.includes(t)))}const s={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function c(){const{i18n:{currentLocale:e}}=(0,o.Z)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:i(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),s}}),[e])}function l(){const e=c();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const o=n.select(t),a=n.pluralForms.indexOf(o);return r[Math.min(a,r.length-1)]}(n,t,e)}}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>i});var r=n(67294);const o={},a=r.createContext(o);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);