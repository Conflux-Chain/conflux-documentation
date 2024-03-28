"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[6322],{5693:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>c,toc:()=>d});var s=o(85893),r=o(11151);const t={sidebar_position:2,title:"SponsorWhitelistControl",displayed_sidebar:"coreSidebar"},a=void 0,c={id:"core/core-space-basics/internal-contracts/sponsor-whitelist-control",title:"SponsorWhitelistControl",description:"Conflux implements a sponsorship mechanism to subsidize the usage of smart contracts. This allows a new account with a zero balance to call smart contracts, provided the execution is sponsored (usually by the operator of Dapps). The internal SponsorWhitelistControl contract records the sponsorship information for smart contracts.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/core/core-space-basics/internal-contracts/sponsor-whitelist-control.md",sourceDirName:"core/core-space-basics/internal-contracts",slug:"/core/core-space-basics/internal-contracts/sponsor-whitelist-control",permalink:"/es/docs/core/core-space-basics/internal-contracts/sponsor-whitelist-control",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"SponsorWhitelistControl",displayed_sidebar:"coreSidebar"},sidebar:"coreSidebar",previous:{title:"AdminControl",permalink:"/es/docs/core/core-space-basics/internal-contracts/admin"},next:{title:"Staking",permalink:"/es/docs/core/core-space-basics/internal-contracts/staking"}},i={},d=[{value:"Interface",id:"interface",level:2},{value:"How to Sponsor a Contract",id:"how-to-sponsor-a-contract",level:2},{value:"Example",id:"example",level:3},{value:"Specification",id:"specification",level:2},{value:"Storage Points",id:"storage-points",level:3},{value:"<code>setSponsorForGas</code> and <code>setSponsorForCollateral</code> behavior",id:"setsponsorforgas-and-setsponsorforcollateral-behavior",level:3},{value:"Add Sponsor Balance",id:"add-sponsor-balance",level:4},{value:"Sponsorship Replacement",id:"sponsorship-replacement",level:4},{value:"Gas Sponsor Replacement",id:"gas-sponsor-replacement",level:5},{value:"Collateral Sponsor Replacement",id:"collateral-sponsor-replacement",level:5},{value:"Whitelist maintenance",id:"whitelist-maintenance",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Conflux implements a sponsorship mechanism to subsidize the usage of smart contracts. This allows a new account with a zero balance to call smart contracts, provided the execution is sponsored (usually by the operator of Dapps). The internal ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," contract records the sponsorship information for smart contracts."]}),"\n",(0,s.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,s.jsxs)(n.p,{children:["SponsorWhitelistControl's hex40 address is ",(0,s.jsx)(n.code,{children:"0x0888000000000000000000000000000000000001"}),", with interface:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"pragma solidity >=0.4.15;\n\ncontract SponsorWhitelistControl {\n    /*** Query Functions ***/\n    /**\n     * @dev get gas sponsor address of specific contract\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getSponsorForGas(address contractAddr) public view returns (address) {}\n\n    /**\n     * @dev get current Sponsored Balance for gas\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getSponsoredBalanceForGas(address contractAddr) public view returns (uint256) {}\n\n    /**\n     * @dev get current Sponsored Gas fee upper bound\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getSponsoredGasFeeUpperBound(address contractAddr) public view returns (uint256) {}\n\n    /**\n     * @dev get collateral sponsor address\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getSponsorForCollateral(address contractAddr) public view returns (address) {}\n\n    /**\n     * @dev get current Sponsored Balance for collateral\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getSponsoredBalanceForCollateral(address contractAddr) public view returns (uint256) {}\n\n    /**\n     * @dev check if a user is in a contract's whitelist\n     * @param contractAddr The address of the sponsored contract\n     * @param user The address of contract user\n     */\n    function isWhitelisted(address contractAddr, address user) public view returns (bool) {}\n\n    /**\n     * @dev check if all users are in a contract's whitelist\n     * @param contractAddr The address of the sponsored contract\n     */\n    function isAllWhitelisted(address contractAddr) public view returns (bool) {}\n\n    /*** for contract admin only **/\n    /**\n     * @dev contract admin add user to whitelist\n     * @param contractAddr The address of the sponsored contract\n     * @param addresses The user address array\n     */\n    function addPrivilegeByAdmin(address contractAddr, address[] memory addresses) public {}\n\n    /**\n     * @dev contract admin remove user from whitelist\n     * @param contractAddr The address of the sponsored contract\n     * @param addresses The user address array\n     */\n    function removePrivilegeByAdmin(address contractAddr, address[] memory addresses) public {}\n\n    // ------------------------------------------------------------------------\n    // Someone will sponsor the gas cost for contract `contractAddr` with an\n    // `upper_bound` for a single transaction.\n    // ------------------------------------------------------------------------\n    function setSponsorForGas(address contractAddr, uint upperBound) public payable {}\n\n    // ------------------------------------------------------------------------\n    // Someone will sponsor the storage collateral for contract `contractAddr`.\n    // ------------------------------------------------------------------------\n    function setSponsorForCollateral(address contractAddr) public payable {}\n\n    // ------------------------------------------------------------------------\n    // Add commission privilege for address `user` to some contract.\n    // ------------------------------------------------------------------------\n    function addPrivilege(address[] memory) public {}\n\n    // ------------------------------------------------------------------------\n    // Remove commission privilege for address `user` from some contract.\n    // ------------------------------------------------------------------------\n    function removePrivilege(address[] memory) public {}\n\n    /**\n     * @dev get current available storage points for collateral (activated after CIP-118)\n     * @param contractAddr The address of the sponsored contract\n     */\n    function getAvailableStoragePoints(address contractAddr) public view returns (uint256) {}\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"how-to-sponsor-a-contract",children:"How to Sponsor a Contract"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," maintains a whitelist for each user-established contract containing accounts eligible for the subsidy. First and foremost, eligible accounts should be added into the whitelist using ",(0,s.jsx)(n.code,{children:"addPrivilege(address[] memory)"})," or ",(0,s.jsx)(n.code,{children:"addPrivilegeByAdmin(address contractAddr, address[] memory addresses)"}),". Specially, if a ",(0,s.jsx)(n.strong,{children:"zero address"})," is added to the whitelist, any account will become eligible for subsidy."]}),"\n",(0,s.jsxs)(n.p,{children:["There are two resources that can be sponsored: gas consumption and storage collateral. The two resources can be sponsored separately through ",(0,s.jsx)(n.code,{children:"payable"})," interfaces ",(0,s.jsx)(n.code,{children:"setSponsorForGas(address contractAddr, uint upperBound)"})," and ",(0,s.jsx)(n.code,{children:"setSponsorForCollateral(address contractAddr)"}),".The paid CFX will be used for future gas or storage collateral sponsorship."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"upperBound"})," (unit: Drip) sets the sponsor upper bound of each transaction. And the value sent by transaction should be no less than 1000 * ",(0,s.jsx)(n.code,{children:"upperBound"}),"."]})}),"\n",(0,s.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.p,{children:"Suppose you have the provided test contract needs sponsorship:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'pragma solidity >=0.8.0;\n\nimport "https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol";\n\ncontract CommissionPrivilegeTest {\n    mapping(uint => uint) public ss;\n\n    function add(address account) public {\n        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);\n        address[] memory a = new address[](1);\n        a[0] = account;\n        cpc.addPrivilege(a);\n    }\n\n    function remove(address account) public {\n        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);\n        address[] memory a = new address[](1);\n        a[0] = account;\n        cpc.removePrivilege(a);\n    }\n\n    function par_add(uint start, uint end) public {\n        for (uint i = start; i < end; i++) {\n            ss[i] = 1;\n        }\n    }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"The following javascript code shows how to deploy and sponsor the provided test contract."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'"use strict"\nconst { Conflux, Drip } = require("js-conflux-sdk")\n// you need to change the path to the compiled contract\nconst { abi, bytecode } = require("path/to/CommissionPrivilegeTest.json");\n\nasync function main() {\n  // your secret key to deploy contract\n  // testnet token can be claimed at https://faucet.confluxnetwork.org/\n  const PRIVATE_KEY = \'0x......\';\n  const cfx = new Conflux({\n    url: \'https://test.confluxrpc.com\',\n    // logger: console,\n    networkId: 1,\n  });\n  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance\n  const randomAccount = cfx.wallet.addRandom() // a random account with no cfx\n  const testContract = cfx.Contract({\n    abi,\n    bytecode\n  })\n\n  const contract_addr = (await testContract.constructor().sendTransaction({\n    from: account.address\n  }).executed()).contractCreated\n  console.log(`contract deployed at ${contract_addr}`)\n\n  testContract.address = contract_addr\n  await testContract.add(randomAccount.address).sendTransaction({\n    from: account.address\n  }).executed()\n  console.log(`random address ${randomAccount.address} added to whitelist`)\n\n  const sponsor_contract = cfx.InternalContract(\'SponsorWhitelistControl\');\n\n  const upperBound = 10n**15n\n  const upperBoundCfx = Drip(upperBound).toCFX()\n  const gasSponsorVal = 10n**18n\n  const storageSponsorVal = 10n ** 18n\n  if( gasSponsorVal < upperBound * 1000n ) {\n    throw new Error(`gas sponsor value should be greater than 1000 * upperBound`)\n  }\n  await sponsor_contract.setSponsorForGas(contract_addr, upperBound).sendTransaction({\n    from: account,\n    value: gasSponsorVal\n  }).executed();\n  console.log(`Gas is sponsored with upper bound ${upperBound} Drip (${upperBoundCfx} CFX)`)\n  await sponsor_contract.setSponsorForCollateral(contract_addr).sendTransaction({\n    from: account,\n    value: storageSponsorVal\n  }).executed();\n  console.log("Storage collateral is sponsored")\n\n  const receipt = await testContract.par_add(1, 3).sendTransaction({\n    from: randomAccount.address\n  }).executed()\n  console.log(`${receipt.transactionHash} is sent`)\n  console.log(`gas and storage covered by sponsor: ${receipt.gasCoveredBySponsor && receipt.storageCoveredBySponsor}`)\n}\n\nmain().catch(\n  console.error\n)\n'})}),"\n",(0,s.jsx)(n.p,{children:"The example provided illustrates how to deploy and sponsor a test contract. The code is divided into five main sections:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Setting Up Conflux Instance and Accounts"}),"\n",(0,s.jsx)(n.li,{children:"Deploying the Smart Contract"}),"\n",(0,s.jsx)(n.li,{children:"Interacting with the Deployed Contract"}),"\n",(0,s.jsx)(n.li,{children:"Sponsoring Gas and Storage"}),"\n",(0,s.jsx)(n.li,{children:"Sending a Transaction whose Gas and Storage are Sponsored"}),"\n"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Setting Up Conflux Instance and Accounts"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"const PRIVATE_KEY = '0x......';\nconst cfx = new Conflux({\n  url: 'https://test.confluxrpc.com',\n  networkId: 1,\n});\nconst account = cfx.wallet.addPrivateKey(PRIVATE_KEY);\nconst randomAccount = cfx.wallet.addRandom();\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"PRIVATE_KEY"}),": A placeholder for the private key of the user. This is essential for deploying contracts and sending transactions. ",(0,s.jsx)(n.strong,{children:"You need to replace this value with your own private key with enough CFX"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"account"}),": An account instance created using the provided private key. Will be used to deploy contract."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"randomAccount"}),": A new random account instance. This account doesn't have any CFX (Conflux's native currency) by default."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Deploying the Smart Contract"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"const testContract = cfx.Contract({\n  abi,\n  bytecode\n});\nconst contract_addr = (await testContract.constructor().sendTransaction({\n  from: account.address\n}).executed()).contractCreated;\nconsole.log(`contract deployed at ${contract_addr}`);\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"testContract"}),": A new contract instance is created using the ABI and bytecode."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Interacting with the Deployed Contract"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"testContract.address = contract_addr;\nawait testContract.add(randomAccount.address).sendTransaction({\n  from: account.address\n}).executed();\nconsole.log(`random address ${randomAccount.address} added to whitelist`);\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The address of the deployed contract is set to the ",(0,s.jsx)(n.code,{children:"testContract"})," instance."]}),"\n",(0,s.jsx)(n.li,{children:"A transaction is sent to the contract to add the random account's address to a whitelist."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Sponsoring Gas and Storage"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"const sponsor_contract = cfx.InternalContract('SponsorWhitelistControl');\nconst upperBound = 10n**15n;\nconst upperBoundCfx = Drip(upperbound).toCFX();\nconst gasSponsorVal = 10n**18n;\nconst storageSponsorVal = 10n ** 18n;\nif( gasSponsorVal < upperBound * 1000n ) {\n  throw new Error(`gas sponsor value should be greater than 1000 * upperBound`);\n}\nawait sponsor_contract.setSponsorForGas(contract_addr, upperBound).sendTransaction({\n  from: account,\n  value: gasSponsorVal\n}).executed();\nconsole.log(`Gas is sponsored with upper bound ${upperBound} Drip (${upperBoundCfx} CFX)`);\nawait sponsor_contract.setSponsorForCollateral(contract_addr).sendTransaction({\n  from: account,\n  value: storageSponsorVal\n}).executed();\nconsole.log(\"Storage collateral is sponsored\");\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The code sets an upper bound for gas sponsorship and calculates its equivalent in CFX. It makes sure if the gas sponsorship value is at least 1000 times the upper bound. If not, an error is thrown. (This is the requirement of the ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," interface)"]}),"\n",(0,s.jsx)(n.li,{children:"The code then sponsors gas and storage for the deployed contract. This means users interacting with the contract won't have to pay for gas or storage, as it's covered by the sponsor."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Sending a Transaction whose Gas and Storage are Sponsored"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"const receipt = await testContract.par_add(1, 3).sendTransaction({\n  from: randomAccount.address\n}).executed();\nconsole.log(`${receipt.transactionHash} is sent`);\nconsole.log(`gas and storage covered by sponsor: ${receipt.gasCoveredBySponsor && receipt.storageCoveredBySponsor}`);\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["A transaction is sent to the contract, calling the ",(0,s.jsx)(n.code,{children:"par_add"})," function with arguments ",(0,s.jsx)(n.code,{children:"1"})," and ",(0,s.jsx)(n.code,{children:"3"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Log the transaction's hash and whether its gas and storage were covered using the transaction receipt."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"specification",children:"Specification"}),"\n",(0,s.jsx)(n.p,{children:"Conflux keeps the following information for each user-established contract:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"sponsor_for_gas"}),": this is the account that provides the subsidy for gas consumption, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"sponsor_for_collateral"}),": this is the account that provides the subsidy for collateral for storage, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"}),": this is the balance of subsidy available for gas consumption, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"sponsor_balance_for_collateral"}),": ",(0,s.jsx)(n.em,{children:"refundable"})," balance of subsidy available for collateral for storage, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"availableStoragePoints"}),": storage points available for storage collateral, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"usedStoragePoints"}),": storage points available for storage collateral, can be accessed via ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC, can only be accessed via ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"}),": this is the upper bound for the gas fee subsidy paid for every sponsored transaction, and can be accessed via ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," or ",(0,s.jsx)(n.code,{children:"getSponsorInfo"})," RPC;"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"whitelist"}),": this is the list of normal accounts that are eligible for the subsidy, where a special all-zero address refers to all normal accounts. Only the contract itself and the admin have the authority to change this list. The elements of whitelist cannot be accessed directly, instead, ",(0,s.jsx)(n.code,{children:"isWhitelisted"})," interface of ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," can tell if an address is whitelisted."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"There are two resources that can be sponsored: gas consumption and storage collateral."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.em,{children:"For gas consumption"}),": If a transaction calls a contract with non-empty ",(0,s.jsx)(n.code,{children:"sponsor_for_gas"})," and the sender is in the ",(0,s.jsx)(n.code,{children:"whitelist"})," of the contract and the gas fee specified by the transaction is within the ",(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"}),", the gas consumption of the transaction is paid from the ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," of the contract (if it is sufficient) rather than from the sender\u2019s balance. Otherwise, the sender should pay for the gas consumption."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.em,{children:"For storage collateral"}),": If a transaction calls a contract with non-empty ",(0,s.jsx)(n.code,{children:"available_storage_points"})," or ",(0,s.jsx)(n.code,{children:"sponsor_for_collateral"})," and the sender is in the ",(0,s.jsx)(n.code,{children:"whitelist"})," of the contract, the collateral for storage incurred in the execution of the transaction is deducted from ",(0,s.jsx)(n.code,{children:"sponsor_for_collateral"}),"(with priority) or ",(0,s.jsx)(n.code,{children:"available_storage_points"})," of the contract, and the owner of those modified storage entries is set to the contract address accordingly. Otherwise, the sender should pay for the collateral for storage incurred in the execution."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["When a message call occurs, Conflux does not recheck sponsorship. For instance, if normal address ",(0,s.jsx)(n.code,{children:"A"})," calls contract ",(0,s.jsx)(n.code,{children:"B"})," and contract ",(0,s.jsx)(n.code,{children:"B"})," calls contract ",(0,s.jsx)(n.code,{children:"C"}),", Conflux only checks whether address ",(0,s.jsx)(n.code,{children:"A"})," is sponsored by contract ",(0,s.jsx)(n.code,{children:"B"}),". If ",(0,s.jsx)(n.code,{children:"A"})," is sponsored, ",(0,s.jsx)(n.code,{children:"B"})," will afford all the gas and/or collateral during the transaction execution, including the message call from ",(0,s.jsx)(n.code,{children:"B"})," to ",(0,s.jsx)(n.code,{children:"C"}),". In other words, only a transaction sender could be sponsored."]}),"\n",(0,s.jsx)(n.h3,{id:"storage-points",children:"Storage Points"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md",children:"CIP-107"})," introduced the concept of storage points to improve Conflux tokenomics."]}),"\n",(0,s.jsx)(n.p,{children:'When a sponsor adds storage collateral for a contract, a proportion of the CFX tokens will be burned and corresponding amount of "storage point" will be mint. The "storage point" cannot be transferred and will not generate storage interest. But it can pay for storage collateral as CFX tokens.'}),"\n",(0,s.jsx)(n.p,{children:"The storage point system is designed to have a minimal impact on economics. Contract sponsors mainly care about the amount of tokens required to support their business operations, but aren't typically concerned about the refund of storage collaterals."}),"\n",(0,s.jsxs)(n.h3,{id:"setsponsorforgas-and-setsponsorforcollateral-behavior",children:[(0,s.jsx)(n.code,{children:"setSponsorForGas"})," and ",(0,s.jsx)(n.code,{children:"setSponsorForCollateral"})," behavior"]}),"\n",(0,s.jsxs)(n.p,{children:["When a contract is created, its ",(0,s.jsx)(n.code,{children:"sponsor_for_gas"})," and ",(0,s.jsx)(n.code,{children:"sponsor_for_collateral"})," will be initialized by zero address, and the sponsor balance and storage points will be initialized by 0. Both sponsorship for gas and for collateral can be updated by calling ",(0,s.jsx)(n.code,{children:"setSponsorForGas"})," and ",(0,s.jsx)(n.code,{children:"setSponsorForCollateral"})," of the ",(0,s.jsx)(n.code,{children:"SponsorWhitelistControl"})," contract."]}),"\n",(0,s.jsx)(n.p,{children:"However, the behavior of the mentioned interfaces varies in different situation."}),"\n",(0,s.jsx)(n.h4,{id:"add-sponsor-balance",children:"Add Sponsor Balance"}),"\n",(0,s.jsxs)(n.p,{children:["An accounts can provide sponsor balance if the sponsor is never set or the current sponsor is the account itself. In this case, the sponsor should interact with function ",(0,s.jsx)(n.code,{children:"setSponsorForGas(address contractAddr, uint upperBound)"})," or ",(0,s.jsx)(n.code,{children:"setSponsorForCollateral(address contractAddr)"}),"."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["For ",(0,s.jsx)(n.code,{children:"setSponsorForGas(address contractAddr, uint upperBound)"}),", transferred value in drip will be added to ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," if following requirements meet:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The new value for ",(0,s.jsx)(n.code,{children:"upperBound"})," should be no less than the old ",(0,s.jsx)(n.code,{children:"upperBound"})," unless the current ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," cannot afford the old ",(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"}),". Noting, if the sponsor is never set, this rule will be ignored."]}),"\n",(0,s.jsx)(n.li,{children:"Besides, the transferred fund should be no less than 1000 times of the new limit, which means the sponsorship should at least support 1000 calls."}),"\n",(0,s.jsxs)(n.li,{children:["The transferred value in drip will be added to ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["For ",(0,s.jsx)(n.code,{children:"setSponsorForCollateral(address contractAddr)"}),", there is no extra requirement. ",(0,s.jsx)(n.code,{children:"p"})," proportion of the surplus CFX provided (whereas ",(0,s.jsx)(n.code,{children:"p * tx.value"}),") will be burnt and converted into storage_points. The rest (",(0,s.jsx)(n.code,{children:"(1-p) * tx.value"}),") will be added to ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_collateral"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"sponsorship-replacement",children:"Sponsorship Replacement"}),"\n",(0,s.jsx)(n.h5,{id:"gas-sponsor-replacement",children:"Gas Sponsor Replacement"}),"\n",(0,s.jsx)(n.p,{children:"To replace the gas sponsor of a contract, the new sponsor must meet specific conditions\uff1a"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["The transferred fund should more than the current ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," of the contract."]}),"\n",(0,s.jsxs)(n.li,{children:["The new value for ",(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"})," (specified the ",(0,s.jsx)(n.code,{children:"upperBound"})," parameter) should be no less than the old sponsor\u2019s limit unless the old ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," cannot afford the old ",(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["The transferred fund should be >= 1000 times of the new limit, so that it is sufficient to subsidize at least ",(0,s.jsx)(n.code,{children:"1000"})," transactions calling the contract."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If the above conditions are satisfied, the remaining ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," will be refunded to the old ",(0,s.jsx)(n.code,{children:"sponsor_for_gas"}),", and the fund transferred to the internal contract will be added to the ",(0,s.jsx)(n.code,{children:"sponsor_balance_for_gas"})," of the contract. Then the ",(0,s.jsx)(n.code,{children:"sponsor_for_gas"})," and ",(0,s.jsx)(n.code,{children:"sponsor_limit_for_gas_fee"})," will be updated according to the new sponsor\u2019s specification. Otherwise, an exception will be triggered."]}),"\n",(0,s.jsx)(n.h5,{id:"collateral-sponsor-replacement",children:"Collateral Sponsor Replacement"}),"\n",(0,s.jsx)(n.p,{children:"The replacement of collateral sponsorship is similar but more complex due to storage points. As a proportion of CFX is burnt, the new sponsor should transfer a fund more than the refundable CFX provided by the current sponsor for collateral of the contract, whereas,"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"refundable storage collateral = sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024)"})}),"\n",(0,s.jsxs)(n.p,{children:["The origin sponsor will be refunded with the above CFX immediately after the sponsor replacement. The ",(0,s.jsx)(n.code,{children:"collateral_for_storage"})," refers to storage collateral already sponsored, accessible via ",(0,s.jsx)(n.code,{children:"cfx_getAccount"})," RPC with contract's address as parameter."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"p"})," proportion of the surplus CFX provided will be burnt and converted into storage_points, whereas,"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"surplus storage points\n= p * (surplus CFX provided) * 1024\n= p * (tx.value - previous refundable collateral) * 1024\n= p * (tx.value - (sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024))) * 1024\n"})}),"\n",(0,s.jsx)(n.h3,{id:"whitelist-maintenance",children:"Whitelist maintenance"}),"\n",(0,s.jsx)(n.p,{children:"Only the contract itself or contract admin can update the contract whitelist. Sponsors have no rights to change the whitelist."}),"\n",(0,s.jsxs)(n.p,{children:["A contract can call function ",(0,s.jsx)(n.code,{children:"addPrivilege(address[] memory)"})," to any addresses to the whitelist. It means that if the ",(0,s.jsx)(n.code,{children:"sponsor_for_gas"})," is set, the contract will pay the gas fee for the accounts in the whitelist, and if the ",(0,s.jsx)(n.code,{children:"sponsor_for_collateral"})," is set, the contract will pay the CFS (collateral for storage) for the accounts in the whitelist. The zero address is a special address ",(0,s.jsx)(n.code,{children:"0x0000000000000000000000000000000000000000"}),". If this address is added to whitelist, all the transactions calling this contract will be sponsored. A contract can call this function ",(0,s.jsx)(n.code,{children:"removePrivilege(address[] memory)"})," to remove some normal account address from the whitelist. Remove a non-existent address will not cause an error or exception."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Corner cases:"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"A contract address can also be added to the whitelist, but it is meaningless since only the transaction sender could be sponsored."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The admin of a contract can use the interfaces ",(0,s.jsx)(n.code,{children:"addPrivilegeByAdmin(address contractAddr, address[] memory addresses)"})," and ",(0,s.jsx)(n.code,{children:"removePrivilegeByAdmin(address contractAddr, address[] memory addresses)"})," to maintain the whitelist."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>c,a:()=>a});var s=o(67294);const r={},t=s.createContext(r);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);