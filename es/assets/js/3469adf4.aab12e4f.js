"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[5649],{74472:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var o=t(85893),i=t(11151);const s={sidebar_position:4,title:"Downloading the Conflux Client",displayed_sidebar:"generalSidebar"},a=void 0,r={id:"general/run-a-node/advanced-topics/downloading-conflux-client",title:"Downloading the Conflux Client",description:"Conflux-rust is a high-performance implementation of the Conflux protocol developed by the foundation with the Rust language. Conflux-rust is a Conflux node that connects to other nodes on the Conflux network and provides an RPC interface that you can use to query and interact with the blockchain. It is also a command-line tool that manages local accounts and conducts RPC interaction with nodes. You can download the released package through any of the ways listed:",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/run-a-node/advanced-topics/downloading-conflux-client.md",sourceDirName:"general/run-a-node/advanced-topics",slug:"/general/run-a-node/advanced-topics/downloading-conflux-client",permalink:"/es/docs/general/run-a-node/advanced-topics/downloading-conflux-client",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Downloading the Conflux Client",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Advanced",permalink:"/es/docs/category/advanced"},next:{title:"Compiling the Conflux Client",permalink:"/es/docs/general/run-a-node/advanced-topics/compiling-conflux-client"}},l={},c=[{value:"Download pre-built binaries",id:"download-pre-built-binaries",level:2},{value:"Docker",id:"docker",level:2},{value:"FAQs",id:"faqs",level:2},{value:"illegal instruction",id:"illegal-instruction",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://github.com/conflux-chain/conflux-rust",children:"Conflux-rust"})," is a high-performance implementation of the Conflux protocol developed by the foundation with the Rust language. Conflux-rust is a Conflux node that connects to other nodes on the Conflux network and provides an RPC interface that you can use to query and interact with the blockchain. It is also a command-line tool that manages local accounts and conducts RPC interaction with nodes. You can download the released package through any of the ways listed:"]}),"\n",(0,o.jsx)(n.h2,{id:"download-pre-built-binaries",children:"Download pre-built binaries"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.a,{href:"https://github.com/Conflux-Chain/conflux-rust/releases",children:(0,o.jsx)(n.strong,{children:"release page on the conflux-rust GitHub repository"})})," providers pre-built binaries that you can download and run directly. There are two versions for the ",(0,o.jsx)(n.strong,{children:"mainnet"})," and the ",(0,o.jsx)(n.strong,{children:"testnet"}),": the mainnet version is Conflux ",(0,o.jsx)(n.code,{children:"vx.x.x"}),", while the version for testnet is ",(0,o.jsx)(n.code,{children:"Conflux vx.x.x-testnet"})," (which has a suffix of ",(0,o.jsx)(n.code,{children:"testnet"}),"). Each program will be provided for Linux, Windows10, and macOS."]}),"\n",(0,o.jsxs)(n.p,{children:["On the Release page, each version will have a version update description and ",(0,o.jsx)(n.code,{children:"Assets"})," that you can download. After selecting the corresponding platform, you can click the link to download the zip package. For example, when unzipping the ",(0,o.jsx)(n.code,{children:"conflux_linux_v2.0.3.zip"})," file, a ",(0,o.jsx)(n.code,{children:"run"})," folder that contains node programs, configuration files, and startup scripts will appear. The specific documents include:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:".\n\u2514\u2500\u2500 run\n    \u251c\u2500\u2500 clear_state.bat\n    \u251c\u2500\u2500 clear_state.sh\n    \u251c\u2500\u2500 conflux\n    \u251c\u2500\u2500 hydra.toml\n    \u251c\u2500\u2500 log.yaml\n    \u251c\u2500\u2500 pos_config\n    \u2502\xa0\xa0 \u251c\u2500\u2500 genesis_file\n    \u2502\xa0\xa0 \u251c\u2500\u2500 initial_nodes.json\n    \u2502\xa0\xa0 \u2514\u2500\u2500 pos_config.yaml\n    \u251c\u2500\u2500 start.bat\n    \u251c\u2500\u2500 start.sh\n    \u2514\u2500\u2500 throttling.toml\n\n2 directories, 11 files\n\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"conflux"})," Node program - This is the executable file for the Conflux node. You will use this to run the Conflux network node on your machine."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"hydra.toml"})," - This file serves as the main configuration for the Conflux network. If you're setting up a node for the testnet instead of the mainnet, you would use a file named ",(0,o.jsx)(n.code,{children:"testnet.toml"}),". This file contains various settings that determine how your node interacts with the Conflux network."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"log.yaml"})," - This is the log configuration file. It defines how logging is handled by the node program, including log levels and log output locations. This is important for troubleshooting and monitoring the node's operation."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"throttling.toml"})," - The internet speed flow limit configuration file. This file is particularly useful during development and testing phases. It allows you to set limits on the node's use of internet bandwidth, which can be helpful for simulating different network conditions or for ensuring that the node does not exceed certain usage limits."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"start.sh"})," - The startup script for Linux systems. You would use this script to start the node program on a Linux machine. It simplifies the process of launching the node, setting up environment variables, and applying any necessary runtime configurations."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"start.bat"})," - Similar to ",(0,o.jsx)(n.code,{children:"start.sh"}),", this is the startup script for Windows systems. It serves the same purpose but is designed to work in the Windows command line environment."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"pos_config"})," - This directory contains configuration files related to the Proof of Stake (PoS) consensus mechanism. Inside, you will find the ",(0,o.jsx)(n.code,{children:"genesis_file"}),", which defines the initial state of the blockchain; ",(0,o.jsx)(n.code,{children:"initial_nodes.json"}),", which lists the initial nodes participating in the network; and ",(0,o.jsx)(n.code,{children:"pos_config.yaml"}),", which contains various settings for the PoS mechanism. Normally, you won't need to edit these files unless you are setting up a new network or making specific adjustments to the PoS mechanism."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Make sure you only run binaries downloaded from the official Conflux-Chain/conflux-rust GitHub repository."})}),"\n",(0,o.jsx)(n.p,{children:"Then you can use the startup script to start the node. For example, on Linux, you can run the following command to start the node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./start.sh\n"})}),"\n",(0,o.jsx)(n.p,{children:"Or you can run the following command to start the node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"./conflux --config hydra.toml\n"})}),"\n",(0,o.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,o.jsxs)(n.p,{children:["Conflux provides an official ",(0,o.jsx)(n.a,{href:"https://hub.docker.com/r/confluxchain/conflux-rust",children:"Docker image of conflux-rust"}),". You can use it to quickly start a node. You can start a node within two steps:  Download image and  Run container."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"$ docker pull confluxchain/conflux-rust\n$ docker run -p 12537:12537 --rm --name cfx-node confluxchain/conflux-rust\n"})}),"\n",(0,o.jsx)(n.p,{children:"So far, there are three tag lines in the officially released image:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"x.x.x"}),"\n",(0,o.jsx)(n.li,{children:"x.x.x-mainnet"}),"\n",(0,o.jsx)(n.li,{children:"x.x.x-testnet"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The first type of image will run a ",(0,o.jsx)(n.strong,{children:"private chain node"})," in ",(0,o.jsx)(n.strong,{children:"dev mode"})," by default. The chainId and miner account will be randomly generated. At the same time, 10 genesis accounts will be created (the defult password is ",(0,o.jsx)(n.code,{children:"123456"}),"), and 1000 CFX will be distributed to each account for developing and testing."]}),"\n",(0,o.jsx)(n.p,{children:"The image with mainnet/testnet suffix tag will activate the nodes of the main network/test network by default. The nodes will start to synchronize data from Epoch 0 through the network. (The process of sychronizing might take a long time, and the transaction sending request won't be processed.)"}),"\n",(0,o.jsxs)(n.p,{children:["They all support the use of custom configuration files and data directories through mounting directories. You can check the tutorial at: ",(0,o.jsx)(n.a,{href:"https://github.com/conflux-chain/conflux-docker",children:"Conflux-rust docker file on Github"})]}),"\n",(0,o.jsx)(n.h2,{id:"faqs",children:"FAQs"}),"\n",(0,o.jsx)(n.h3,{id:"illegal-instruction",children:"illegal instruction"}),"\n",(0,o.jsxs)(n.p,{children:["If you encounter this error when running the node, you can try to download the ",(0,o.jsx)(n.strong,{children:"compatible"})," version binary from the release page for example ",(0,o.jsx)(n.code,{children:"conflux_linux_glibc2.27_x64_v2.3.3-compatible.zip"})," , or compile the source code yourself."]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>a});var o=t(67294);const i={},s=o.createContext(i);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);