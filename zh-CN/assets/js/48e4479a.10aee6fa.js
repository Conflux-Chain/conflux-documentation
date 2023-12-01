"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[3810],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=d(n),f=o,m=u["".concat(c,".").concat(f)]||u[f]||p[f]||i;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var d=2;d<i;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},85334:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=n(87462),o=(n(67294),n(3905));const i={sidebar_position:5,title:"PoSRegister",displayed_sidebar:"coreSidebar"},a=void 0,s={unversionedId:"core/core-space-basics/internal-contracts/poSRegister",id:"core/core-space-basics/internal-contracts/poSRegister",title:"PoSRegister",description:"This contract is used let user participate in PoS chain. If anyone want to become a PoS node, he need to interact with this contract. This contract provide serveral methods to increase or decrease PoS votes:",source:"@site/docs/core/core-space-basics/internal-contracts/poSRegister.md",sourceDirName:"core/core-space-basics/internal-contracts",slug:"/core/core-space-basics/internal-contracts/poSRegister",permalink:"/zh-CN/docs/core/core-space-basics/internal-contracts/poSRegister",draft:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"PoSRegister",displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"ConfluxContext",permalink:"/zh-CN/docs/core/core-space-basics/internal-contracts/conflux-context"},next:{title:"CrossSpaceCall",permalink:"/zh-CN/docs/core/core-space-basics/internal-contracts/crossSpaceCall"}},c={},d=[{value:"Interface",id:"interface",level:2}],l={toc:d},u="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This contract is used let user participate in PoS chain. If anyone want to become a PoS node, he need to interact with this contract. This contract provide serveral methods to increase or decrease PoS votes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"register")," - Regist in PoS chain to become a PoS node"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"increaseStake")," - Increase PoS stake"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"retire")," - Decrease PoS stake")),(0,o.kt)("p",null,"Also several methods to query one account's PoS info:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"getVotes")," - Query one account's votes info, will return ",(0,o.kt)("inlineCode",{parentName:"li"},"totalStakedVotes")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"totalUnlockedVotes")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"identifierToAddress")," - Query one PoS account's binded PoW address"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"addressToIdentifier")," - Query one PoW account's binded PoS address")),(0,o.kt)("h2",{id:"interface"},"Interface"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PoSRegister"),"'s hex40 contract address is ",(0,o.kt)("inlineCode",{parentName:"p"},"0x0888000000000000000000000000000000000005")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// SPDX-License-Identifier: MIT\npragma solidity >=0.5.0;\n\ninterface PoSRegister {\n    /**\n     * @dev Register PoS account\n     * @param indentifier - PoS account address to register\n     * @param votePower - votes count\n     * @param blsPubKey - BLS public key\n     * @param vrfPubKey - VRF public key\n     * @param blsPubKeyProof - BLS public key\'s proof of legality, used to against some attack, generated by conflux-rust fullnode\n     */\n    function register(\n        bytes32 indentifier,\n        uint64 votePower,\n        bytes calldata blsPubKey,\n        bytes calldata vrfPubKey,\n        bytes[2] calldata blsPubKeyProof\n    ) external;\n\n    /**\n     * @dev Increase specified number votes for msg.sender\n     * @param votePower - count of votes to increase\n     */\n    function increaseStake(uint64 votePower) external;\n\n    /**\n     * @dev Retire specified number votes for msg.sender\n     * @param votePower - count of votes to retire\n     */\n    function retire(uint64 votePower) external;\n\n    /**\n     * @dev Query PoS account\'s lock info. Include "totalStakedVotes" and "totalUnlockedVotes"\n     * @param identifier - PoS address\n     */\n    function getVotes(bytes32 identifier) external view returns (uint256, uint256);\n\n    /**\n     * @dev Query the PoW address binding with specified PoS address\n     * @param identifier - PoS address\n     */\n    function identifierToAddress(bytes32 identifier) external view returns (address);\n\n    /**\n     * @dev Query the PoS address binding with specified PoW address\n     * @param addr - PoW address\n     */\n    function addressToIdentifier(address addr) external view returns (bytes32);\n\n    /**\n     * @dev Emitted when register method executed successfully\n     */\n    event Register(bytes32 indexed identifier, bytes blsPubKey, bytes vrfPubKey);\n\n    /**\n     * @dev Emitted when increaseStake method executed successfully\n     */\n    event IncreaseStake(bytes32 indexed identifier, uint64 votePower);\n\n    /**\n     * @dev Emitted when retire method executed successfully\n     */\n    event Retire(bytes32 indexed identifier, uint64 votePower);\n}\n')))}p.isMDXComponent=!0}}]);