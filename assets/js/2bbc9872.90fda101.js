"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9864],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>h});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(a),f=n,h=p["".concat(s,".").concat(f)]||p[f]||d[f]||l;return a?r.createElement(h,o(o({ref:t},u),{},{components:a})):r.createElement(h,o({ref:t},u))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:n,o[1]=i;for(var c=2;c<l;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}f.displayName="MDXCreateElement"},61446:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var r=a(87462),n=(a(67294),a(3905));const l={sidebar_position:8,title:"Wallets",displayed_sidebar:"generalSidebar"},o=void 0,i={unversionedId:"general/conflux-basics/wallets",id:"general/conflux-basics/wallets",title:"Wallets",description:"This guide will help you understand the basics of wallets, their purpose, and their role in the Conflux Network.",source:"@site/docs/general/conflux-basics/wallets.md",sourceDirName:"general/conflux-basics",slug:"/general/conflux-basics/wallets",permalink:"/docs/general/conflux-basics/wallets",draft:!1,editUrl:"https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/general/conflux-basics/wallets.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8,title:"Wallets",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Spaces",permalink:"/docs/general/conflux-basics/spaces"},next:{title:"Contracts",permalink:"/docs/general/conflux-basics/contracts"}},s={},c=[{value:"What is a Wallet?",id:"what-is-a-wallet",level:2},{value:"Wallets on the Conflux Network",id:"wallets-on-the-conflux-network",level:2},{value:"Choosing a Wallet",id:"choosing-a-wallet",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...a}=e;return(0,n.kt)(p,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This guide will help you understand the basics of wallets, their purpose, and their role in the Conflux Network."),(0,n.kt)("h2",{id:"what-is-a-wallet"},"What is a Wallet?"),(0,n.kt)("p",null,"In the context of blockchain and cryptocurrencies, a wallet is a digital tool that allows users to interact with a blockchain network. It's similar to a bank account, providing the ability to send, receive, and manage your digital assets. However, unlike traditional bank accounts, these wallets can be completely controlled by the user."),(0,n.kt)("p",null,"A wallet can be a piece of software (like a desktop or mobile app), a physical device (hardware wallet), or even a piece of paper (paper wallet). Each wallet type has its own advantages and disadvantages in terms of security, accessibility, and convenience."),(0,n.kt)("h2",{id:"wallets-on-the-conflux-network"},"Wallets on the Conflux Network"),(0,n.kt)("p",null,"On the Conflux Network, wallets play a crucial role. They allow users to interact with the Conflux blockchain, enabling them to send and receive Conflux tokens (CFX) and other tokens built on the Conflux Network."),(0,n.kt)("p",null,"Here are some key features of Conflux wallets:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Private and Public Keys:")," Each wallet has a pair of cryptographic keys: a public key, which is like your bank account number, and a private key, which is like your PIN. The public key is used to receive funds, while the private key is used to sign transactions and access your funds. Remember, your private key is sensitive information and should never be shared."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Address:")," Derived from the public key, the address is what you share with others to receive funds. It's a shorter, more manageable version of the public key."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Security:")," Wallets on the Conflux Network are secure. However, the level of security largely depends on how you manage your private keys. It's recommended to use hardware wallets for storing large amounts of CFX, as they provide a higher level of security."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Interacting with DApps:")," Conflux wallets can also be used to interact with decentralized applications (DApps) built on the Conflux Network. This allows users to participate in decentralized finance (DeFi), games, and other applications.")),(0,n.kt)("h2",{id:"choosing-a-wallet"},"Choosing a Wallet"),(0,n.kt)("p",null,"Choosing a wallet depends on your specific needs. If you're a developer, you might want a wallet that integrates easily with your development environment. If you're a regular user, you might prioritize ease of use and security."),(0,n.kt)("p",null,"The Conflux Network supports several wallets, including but not limited to:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/general/tutorials/wallets/fluent"},"Fluent"),": A browser extension wallet for Chrome and Firefox, similar to MetaMask but for the Conflux Network. Supports both Core a eSpace."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/general/tutorials/wallets/ledger"},"Ledger"),": A hardware wallet known for its security features. Supports both Core a eSpace."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/espace/UserGuide"},"MetaMask"),": A popular wallet that can also be configured to work with the Conflux Network eSpace.")),(0,n.kt)("p",null,"You can find more information on supported wallets ",(0,n.kt)("a",{parentName:"p",href:"/docs/general/tutorials/wallets/"},"here"),"."),(0,n.kt)("p",null,"Remember, the safety of your assets is largely dependent on how securely you handle your private keys and your wallet. Always keep your private keys private, use secure internet connections, and regularly update your wallet software to the latest version."))}d.isMDXComponent=!0}}]);