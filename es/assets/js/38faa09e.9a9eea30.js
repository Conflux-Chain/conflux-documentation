"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[2019],{57042:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=n(85893),o=n(11151),s=n(17661);const i={sidebar_position:4,title:"Build",displayed_sidebar:"generalSidebar"},c=void 0,l={id:"general/build/build",title:"Build",description:"This section provides documentation related to general Conflux development topics.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/build/build.md",sourceDirName:"general/build",slug:"/general/build/",permalink:"/es/docs/general/build/",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Build",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"v2.3",permalink:"/es/docs/general/hardforks/v2.3"},next:{title:"Smart Contracts",permalink:"/es/docs/category/smart-contracts"}},a={},u=[];function d(e){const t={p:"p",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"This section provides documentation related to general Conflux development topics."}),"\n","\n",(0,r.jsx)(s.Z,{})]})}function m(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},17661:(e,t,n)=>{n.d(t,{Z:()=>b});n(67294);var r=n(36905),o=n(78259),s=n(34791),i=n(23777),c=n(2735),l=n(97325),a=n(13899);const u={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=n(85893);function m(e){let{href:t,children:n}=e;return(0,d.jsx)(s.Z,{href:t,className:(0,r.Z)("card padding--lg",u.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:o,description:s}=e;return(0,d.jsxs)(m,{href:t,children:[(0,d.jsxs)(a.Z,{as:"h2",className:(0,r.Z)("text--truncate",u.cardTitle),title:o,children:[n," ",o]}),s&&(0,d.jsx)("p",{className:(0,r.Z)("text--truncate",u.cardDescription),title:s,children:s})]})}function f(e){let{item:t}=e;const n=(0,o.LM)(t),r=function(){const{selectMessage:e}=(0,i.c)();return t=>e(t,(0,l.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,d.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function h(e){let{item:t}=e;const n=(0,c.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,o.xz)(t.docId??void 0);return(0,d.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return(0,d.jsx)(h,{item:t});case"category":return(0,d.jsx)(f,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,o.jA)();return(0,d.jsx)(b,{items:n.items,className:t})}function b(e){const{items:t,className:n}=e;if(!t)return(0,d.jsx)(x,{...e});const s=(0,o.MN)(t);return(0,d.jsx)("section",{className:(0,r.Z)("row",n),children:s.map(((e,t)=>(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(g,{item:e})},t)))})}},23777:(e,t,n)=>{n.d(t,{c:()=>a});var r=n(67294),o=n(39962);const s=["zero","one","two","few","many","other"];function i(e){return s.filter((t=>e.includes(t)))}const c={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function l(){const{i18n:{currentLocale:e}}=(0,o.Z)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:i(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),c}}),[e])}function a(){const e=l();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const o=n.select(t),s=n.pluralForms.indexOf(o);return r[Math.min(s,r.length-1)]}(n,t,e)}}},11151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>i});var r=n(67294);const o={},s=r.createContext(o);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);