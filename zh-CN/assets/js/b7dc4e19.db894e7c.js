"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[9934],{49363:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>d,contentTitle:()=>t,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var s=n(85893),c=n(11151);const r={sidebar_position:5,title:"CrossSpaceCall Contract",description:"Detail explain of CrossSpaceCall contract",displayed_sidebar:"eSpaceSidebar"},t=void 0,o={id:"espace/build/cross-space-bridge",title:"CrossSpaceCall Contract",description:"Detail explain of CrossSpaceCall contract",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/espace/build/cross-space-bridge.md",sourceDirName:"espace/build",slug:"/espace/build/cross-space-bridge",permalink:"/zh-CN/docs/espace/build/cross-space-bridge",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"CrossSpaceCall Contract",description:"Detail explain of CrossSpaceCall contract",displayed_sidebar:"eSpaceSidebar"},sidebar:"eSpaceSidebar",previous:{title:"eSpace Mapped Addresses(Cross Space)",permalink:"/zh-CN/docs/espace/build/accounts"},next:{title:"Run an eSpace Node",permalink:"/zh-CN/docs/espace/build/run-a-node"}},d={},l=[{value:"CrossSpaceCall \u63a5\u53e3",id:"crossspacecall-\u63a5\u53e3",level:2},{value:"Transfer CFX between eSpace and Core Space",id:"transfer-cfx-between-espace-and-core-space",level:2},{value:"From Core Space to eSpace",id:"from-core-space-to-espace",level:3},{value:"JS Example",id:"js-example",level:4},{value:"From eSpace to Core Space",id:"from-espace-to-core-space",level:3},{value:"\u8de8\u7a7a\u95f4\u64cd\u4f5c\u4e2d\u7684\u6620\u5c04\u5730\u5740",id:"\u8de8\u7a7a\u95f4\u64cd\u4f5c\u4e2d\u7684\u6620\u5c04\u5730\u5740",level:4},{value:"Transfer Steps",id:"transfer-steps",level:4},{value:"JS Example",id:"js-example-1",level:4},{value:"Call eSpace Contract from Core Space",id:"call-espace-contract-from-core-space",level:2},{value:"Resources",id:"resources",level:2}];function i(e){const a={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(a.p,{children:["Conflux eSpace and Core space are two separate space, you can not send CFX from base32 address to hex address directly. You can only use ",(0,s.jsx)(a.a,{href:"https://confluxhub.io/espace-bridge/cross-space",children:"Confluxhub Space Bridge"})," to cross CFX between eSpace and Core Space."]}),"\n",(0,s.jsxs)(a.p,{children:["Under the hood there is a internal contract named ",(0,s.jsx)(a.code,{children:"CrossSpaceCall"})," in Core Space, which is used to transfer CFX between eSpace and Core Space. \u901a\u8fc7CrossSpaceCall\uff0c\u5728Core Space\u5185\u76f4\u63a5\u4e0eeSpace\u5408\u7ea6\u8fdb\u884c\u4e92\u52a8\u6210\u4e3a\u53ef\u80fd\u3002 This contract is introduced by ",(0,s.jsx)(a.a,{href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md",children:"CIP-90"}),"."]}),"\n",(0,s.jsx)(a.h2,{id:"crossspacecall-\u63a5\u53e3",children:"CrossSpaceCall \u63a5\u53e3"}),"\n",(0,s.jsx)(a.p,{children:"This contract is available on Core Space under the address:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["base32 address: ",(0,s.jsx)(a.a,{href:"https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv",children:(0,s.jsx)(a.code,{children:"cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv"})})]}),"\n",(0,s.jsxs)(a.li,{children:["hex address(use in solidity): ",(0,s.jsx)(a.code,{children:"0x0888000000000000000000000000000000000006"})]}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"Below is the interface of this contract:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"interface CrossSpaceCall {\n    /**\n     * @dev Deploy a contract in eSpace\n     * @param init bytes -  The contract init bytecode\n     * @return bytes20 - The hex address of the deployed contract\n     */\n    function createEVM(bytes calldata init) external payable returns (bytes20);\n    /* methods for cross-space CFX transfers */\n\n    /**\n     * @dev Transfer CFX from Core space to eSpace specify address. Transfer amount is specified by transaction value.\n     * @param to bytes20 - The hex address of the receiver address in eSpace\n     * @return output bytes\n     */\n    function transferEVM(bytes20 to) external payable returns (bytes memory output);\n    \n    /**\n     * @dev Widthdraw CFX from eSpace mapped account's balance\n     * @param value uint256 - The amount of CFX to be withdrawn\n     */ \n    function withdrawFromMapped(uint256 value) external;\n\n    /**\n     * @dev Query eSpace mapped account's CFX balance\n     * @param addr address - The core address to query\n     * @return uint256 - Balance\n     */\n    function mappedBalance(address addr) external view returns (uint256);\n\n\n    /**\n     * @dev Query eSpace mapped account's nonce\n     * @param addr address - The core address to query\n     * @return uint256 - Balance\n     * */ \n    function mappedNonce(address addr) external view returns (uint256);\n    \n    /* methods for other cross-space operations */\n\n    /**\n     * @dev Call eSpace contract method from Core space\n     * @param to bytes20 - The hex address of the contract in eSpace\n     * @param data bytes - The contract method call data\n     * @return output bytes - Method call result\n     */ \n    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);\n\n    /**\n     * @dev Static call eSpace contract method from Core space\n     * @param to bytes20 - The hex address of the contract in eSpace\n     * @param data bytes - The contract method call data\n     * @return output bytes - Method call result\n     */ \n    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);\n}\n"})}),"\n",(0,s.jsx)(a.h2,{id:"transfer-cfx-between-espace-and-core-space",children:"Transfer CFX between eSpace and Core Space"}),"\n",(0,s.jsxs)(a.p,{children:["Cross CFX between eSpace and Core Space can be achieved through call ",(0,s.jsx)(a.code,{children:"CrossSpaceCall"})," internal contract's related methods."]}),"\n",(0,s.jsxs)(a.p,{children:["Note that ",(0,s.jsx)(a.code,{children:"CrossSpaceCall"})," (like other internal contracts) can only be accessed in the Conflux Core space."]}),"\n",(0,s.jsx)(a.h3,{id:"from-core-space-to-espace",children:"From Core Space to eSpace"}),"\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Core to eSpace"}),": To transfer CFX from Conflux Core to Conflux eSpace, the ",(0,s.jsx)(a.code,{children:"transferEVM(bytes20 to)"})," method of this contract needs to be called. The destination address of this transfer is specified by the method parameter ",(0,s.jsx)(a.code,{children:"to"}),". \u8de8\u7a7a\u95f4\u8f6c\u79fb\u5c06\u5728\u4e00\u4e2a\u5355\u4e00\u7684\u539f\u5b50\u6b65\u9aa4\u4e2d\u6267\u884c\u3002"]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"function transferEVM(bytes20 to) external payable returns (bytes memory output);\n"})}),"\n",(0,s.jsx)(a.h4,{id:"js-example",children:"JS Example"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"const { Conflux, Drip } = require('js-conflux-sdk');\n\nconst conflux = new Conflux({\n  url: 'https://main.confluxrpc.com',\n  chainId: 1029,\n});\n\nconst account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);\n\nconst crossSpaceCall = conflux.InternalContract('CrossSpaceCall');\n\nasync function main() {\n    const eSpaceAddress = '0x3D69D968e3673e188B2D2d42b6a385686186258f';\n\n    const receipt = await crossSpaceCall.transferEVM(eSpaceAddress)\n        .sendTransaction({\n            from: account,\n            value: Drip.fromCFX(1),  // transfer 1 CFX, the amount is specify by value\n        }).executed();\n\n    console.log(`Transfer to ${eSpaceAddress} ${receipt.outcomeStatus === 0 ? 'succeed' : 'failed'}`);\n}\n\nmain()\n"})}),"\n",(0,s.jsx)(a.h3,{id:"from-espace-to-core-space",children:"From eSpace to Core Space"}),"\n",(0,s.jsx)(a.h4,{id:"\u8de8\u7a7a\u95f4\u64cd\u4f5c\u4e2d\u7684\u6620\u5c04\u5730\u5740",children:"\u8de8\u7a7a\u95f4\u64cd\u4f5c\u4e2d\u7684\u6620\u5c04\u5730\u5740"}),"\n",(0,s.jsxs)(a.p,{children:["To cross CFX from eSpace to Core Space, a mapped address is required. Each account in Core Space has a ",(0,s.jsx)(a.strong,{children:"mapped account"})," (hex40) in eSpace. Only the Core space account can withdraw CFX from it's mapped account."]}),"\n",(0,s.jsxs)(a.p,{children:["For details about the mapped address, see ",(0,s.jsx)(a.a,{href:"/zh-CN/docs/espace/build/accounts#mapped-addresses-in-cross-space-operations",children:"Mapped Addresses"}),"."]}),"\n",(0,s.jsx)(a.h4,{id:"transfer-steps",children:"Transfer Steps"}),"\n",(0,s.jsx)(a.p,{children:"\u8981\u5c06 CFX \u4ece Conflux eSpace \u8f6c\u79fb\u5230 Conflux Core\uff0c\u9700\u8981\u4e24\u4e2a\u6b65\u9aa4\u3002"}),"\n",(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsx)(a.li,{children:"Transfer CFX to the eSpace mapped account that belongs to the Core destination account. \u8fd9\u4e2a\u64cd\u4f5c\u9700\u8981\u4e00\u4e2a eSpace \u4ea4\u6613\u3002"}),"\n",(0,s.jsxs)(a.li,{children:["Call the ",(0,s.jsx)(a.code,{children:"withdrawFromMapped(uint256 value)"})," method of the ",(0,s.jsx)(a.code,{children:"CrossSpaceCall"})," internal contract. \u8fd9\u4e2a\u8c03\u7528\u5c06\u628a CFX \u4ece\u6620\u5c04\u8d26\u6237\u8f6c\u56de\u5230\u76f8\u5e94\u7684\u76ee\u6807\u5730\u5740\u3002 Another method ",(0,s.jsx)(a.code,{children:"mappedBalance"})," can be used to query the balance of one core address's mapped address."]}),"\n"]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"function withdrawFromMapped(uint256 value) external;\n\n// parameter addr is a core account address\nfunction mappedBalance(address addr) external view returns (uint256);\n"})}),"\n",(0,s.jsx)(a.h4,{id:"js-example-1",children:"JS Example"}),"\n",(0,s.jsx)(a.p,{children:"Step1: use js-conflux-sdk's address utility method to get the mapped address of the Core Space destination account."}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"const { address } = require('js-conflux-sdk');\n\nconst base32Address = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';\n\nconst mappedAddress = address.cfxMappedEVMSpaceAddress(base32Address);\n\n// 0x12Bf6283CcF8Ad6ffA63f7Da63EDc217228d839A\n"})}),"\n",(0,s.jsx)(a.p,{children:"Step2: transfer CFX to the mapped address in eSpace through wallet or ethers.js"}),"\n",(0,s.jsxs)(a.p,{children:["Step3: invoke the ",(0,s.jsx)(a.code,{children:"withdrawFromMapped"})," method of ",(0,s.jsx)(a.code,{children:"CrossSpaceCall"})," internal contract in Core Space to withdraw CFX from the mapped address."]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"const { Conflux, Drip, address } = require('js-conflux-sdk');\n\nconst conflux = new Conflux({\n  url: 'https://main.confluxrpc.com',\n  chainId: 1029,\n});\n\nconst account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);\n\nconst crossSpaceCall = conflux.InternalContract('CrossSpaceCall');\n\nasync function main() {\n    const receipt = await crossSpaceCall.withdrawFromMapped(Drip.fromCFX(1))\n        .sendTransaction({\n            from: account,\n        }).executed();\n\n    console.log(`Withdraw from eSpace ${receipt.outcomeStatus === 0 ? 'succeed' : 'failed'}`);\n}\n\nmain()\n"})}),"\n",(0,s.jsx)(a.h2,{id:"call-espace-contract-from-core-space",children:"Call eSpace Contract from Core Space"}),"\n",(0,s.jsx)(a.p,{children:"Through CrossSpaceCall contract, it is possible the read or write eSpace contract's state from Core Space. We will give a simple example to show how to call eSpace contract from Core Space."}),"\n",(0,s.jsxs)(a.p,{children:["Below is a contract deployed in eSpace at address ",(0,s.jsx)(a.code,{children:"0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b"}),":"]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"contract SimpleStore {\n    uint256 public value;\n\n    function setValue(uint256 _value) public {\n        value = _value;\n    }\n}\n"})}),"\n",(0,s.jsx)(a.p,{children:"And below is a contract deployed in Core Space:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:'\ncontract CrossCallExample {\n\n    CrossSpace public crossSpaceCall = CrossSpace(0x0888000000000000000000000000000000000006);\n\n    function readValue() public returns (uint256) {\n        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);\n        bytes memory num = crossSpaceCall.staticCallEVM(to, abi.encodeWithSignature("value()"));\n        return abi.decode(num, (uint256))\n    }\n\n    function setValue(uint256 _value) public {\n        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);\n        bytes memory data = abi.encodeWithSignature("setValue(uint256)", 100);\n        crossSpaceCall.callEVM(to, data);\n    }\n}\n\n'})}),"\n",(0,s.jsx)(a.h2,{id:"resources",children:"Resources"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md",children:"CIP-90"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"/zh-CN/docs/espace/build/accounts#mapped-addresses-in-cross-space-operations",children:"Mapped Addresses"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"/zh-CN/docs/core/core-space-basics/internal-contracts/crossSpaceCall",children:"CrossSpaceCall"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"/zh-CN/docs/espace/build/evm-compatibility#phantom-transactions",children:"eSpace Phantom Transactions"})}),"\n"]})]})}function p(e={}){const{wrapper:a}={...(0,c.a)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(i,{...e})}):i(e)}},11151:(e,a,n)=>{n.d(a,{Z:()=>o,a:()=>t});var s=n(67294);const c={},r=s.createContext(c);function t(e){const a=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:t(e.components),s.createElement(r.Provider,{value:a},e.children)}}}]);