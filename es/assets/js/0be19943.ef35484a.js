"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[4194],{97354:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=s(85893),l=s(11151);const i={mainnet:"v2.3.4",testnet:"v2.3.4-testnet"},o={sidebar_position:5,title:"Compiling the Conflux Client",displayed_sidebar:"generalSidebar"},r=void 0,a={id:"general/run-a-node/advanced-topics/compiling-conflux-client",title:"Compiling the Conflux Client",description:"Here is a step by step guide on how to build Conflux from the source code and get a node running.",source:"@site/i18n/es/docusaurus-plugin-content-docs/current/general/run-a-node/advanced-topics/compiling-conflux-client.md",sourceDirName:"general/run-a-node/advanced-topics",slug:"/general/run-a-node/advanced-topics/compiling-conflux-client",permalink:"/es/docs/general/run-a-node/advanced-topics/compiling-conflux-client",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/es",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Compiling the Conflux Client",displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Downloading the Conflux Client",permalink:"/es/docs/general/run-a-node/advanced-topics/downloading-conflux-client"},next:{title:"Node Configuration",permalink:"/es/docs/general/run-a-node/advanced-topics/node-configuration"}},d={},c=[{value:"Install Build Dependencies",id:"install-build-dependencies",level:2},{value:"Linux",id:"linux",level:3},{value:"OSX",id:"osx",level:3},{value:"Windows",id:"windows",level:3},{value:"Build from Source Code",id:"build-from-source-code",level:2},{value:"FAQs",id:"faqs",level:2},{value:"Why the build process failed?",id:"why-the-build-process-failed",level:3},{value:"Is mainnet and testnet client compatible?",id:"is-mainnet-and-testnet-client-compatible",level:3},{value:"How to build the testnet client?",id:"how-to-build-the-testnet-client",level:3},{value:"Where to find the latest release version?",id:"where-to-find-the-latest-release-version",level:3}];function u(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Here is a step by step guide on how to build Conflux from the source code and get a node running."}),"\n",(0,t.jsx)(n.h2,{id:"install-build-dependencies",children:"Install Build Dependencies"}),"\n",(0,t.jsxs)(n.p,{children:["Conflux requires ",(0,t.jsx)(n.strong,{children:"Rust 1.62.0"}),", ",(0,t.jsx)(n.code,{children:"clang"}),", and ",(0,t.jsx)(n.code,{children:"sqlite"})," to build."]}),"\n",(0,t.jsxs)(n.p,{children:["We recommend installing Rust through ",(0,t.jsx)(n.a,{href:"https://rustup.rs/",children:"rustup"}),". If you don't already have ",(0,t.jsx)(n.code,{children:"rustup"})," or ",(0,t.jsx)(n.code,{children:"clang"}),", you can install them like this:"]}),"\n",(0,t.jsx)(n.h3,{id:"linux",children:"Linux"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\n# you might need to run \n# source \"$HOME/.cargo/env\"\n# to configure your shell\nrustup install 1.62.0\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Other dependencies including ",(0,t.jsx)(n.code,{children:"clang"}),", ",(0,t.jsx)(n.code,{children:"cmake (version >= 3.12)"})," and ",(0,t.jsx)(n.code,{children:"sqlite (version >= 3.8.3)"})," can be installed with:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Ubuntu 18.04:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# The latest cmake version on Ubuntu 18.04 is 3.10, so you'll need to install it from the Kitware repository.\nwget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null\necho 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ bionic main' | sudo tee /etc/apt/sources.list.d/kitware.list >/dev/null\nsudo apt-get update\n\nsudo apt-get install clang libsqlite3-dev pkg-config libssl-dev cmake\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"CentOS 7 / RHEL:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo yum install epel-release\nsudo yum install clang gcc gcc-c++ openssl-devel cmake3 wget\n\n# This may fail if you have installed cmake with version 2.8.\n# You can choose to uninstall cmake first.\nsudo ln -s /usr/bin/cmake3 /usr/bin/cmake\n\n# The official sqlite version on CentOS 7 is 3.7.17, so we need to install the latest version from the source code.\n# The source code have be downloaded from https://www.sqlite.org/download.html\nwget https://www.sqlite.org/2020/sqlite-autoconf-3320100.tar.gz\ntar xfvz sqlite-autoconf-3320100.tar.gz\ncd sqlite-autoconf-3320100\n./configure\nmake\nsudo make install\n"})}),"\n",(0,t.jsx)(n.h3,{id:"osx",children:"OSX"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'curl https://sh.rustup.rs -sSf | sh\n# you might need to run \n# source "$HOME/.cargo/env"\n# to configure your shell\nrustup install 1.62.0\n'})}),"\n",(0,t.jsxs)(n.p,{children:["You might need to install ",(0,t.jsx)(n.code,{children:"brew"})," if you need to use it to install ",(0,t.jsx)(n.code,{children:"clang"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"\n'})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"clang"})," comes with Xcode command line tools, and can also be installed with homebrew:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"brew install llvm\n"})}),"\n",(0,t.jsx)(n.p,{children:"You also need to install other dependencies with homebrew and set up the environment variables as described after the installation:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"brew install openssl pkg-config cmake\n"})}),"\n",(0,t.jsx)(n.h3,{id:"windows",children:"Windows"}),"\n",(0,t.jsxs)(n.p,{children:["Make sure you have Visual Studio 2015 with C++ support installed. Next, download and run the ",(0,t.jsx)(n.code,{children:"rustup"})," installer from ",(0,t.jsx)(n.a,{href:"https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe",children:"this link"}),", start ",(0,t.jsx)(n.code,{children:"VS2015 x64 Native Tools Command Prompt"}),", and use the following command to install and set up the ",(0,t.jsx)(n.code,{children:"msvc"})," toolchain:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"rustup default stable-x86_64-pc-windows-msvc\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"clang"})," can be installed with LLVM. Pre-built binaries can be downloaded from ",(0,t.jsx)(n.a,{href:"https://releases.llvm.org/download.html#8.0.0",children:"Download LLVM"}),". Make sure to add LLVM to the system PATH as instructed."]}),"\n",(0,t.jsxs)(n.p,{children:["Make sure that these binaries are in your ",(0,t.jsx)(n.code,{children:"PATH"})," (the instruction will be shown after installing ",(0,t.jsx)(n.code,{children:"rustup"}),"). After that, you should be able to build Conflux from source."]}),"\n",(0,t.jsx)(n.h2,{id:"build-from-source-code",children:"Build from Source Code"}),"\n",(0,t.jsxs)(n.p,{children:["After installing the dependencies mentioned above, now you can clone our repository and start building the executable binary. The latest mainnet node version is ",(0,t.jsx)(n.strong,{children:i.mainnet}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# download Conflux code\ngit clone https://github.com/Conflux-Chain/conflux-rust\ncd conflux-rust\ngit checkout <latest-released-mainnet-version> # checkout to the latest release version\n\n# build in release mode\ncargo build --release\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This produces an executable called ",(0,t.jsx)(n.strong,{children:"conflux"})," in the ",(0,t.jsx)(n.strong,{children:"./target/release"})," subdirectory. The ",(0,t.jsx)(n.strong,{children:"conflux"})," binary it a client software that we can use to run a node."]}),"\n",(0,t.jsx)(n.p,{children:"Note, when compiling a crate and you receive errors, it's in most cases your outdated version of Rust, or some of your crates have to be recompiled. Cleaning the repository will most likely solve the issue if you are on the latest stable version of Rust, try:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cargo clean && cargo update\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To start running a Conflux full node, you can follow the instructions at ",(0,t.jsx)(n.a,{href:"/es/docs/general/run-a-node/advanced-topics/running-full-node",children:"Running Conflux Full Node"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"faqs",children:"FAQs"}),"\n",(0,t.jsx)(n.h3,{id:"why-the-build-process-failed",children:"Why the build process failed?"}),"\n",(0,t.jsxs)(n.p,{children:["Please make sure you install all the dependencies, and your network is good to download rust crates. If you are in China, you can try to use ",(0,t.jsx)(n.a,{href:"https://rustup.rs/",children:"rustup"})," to install rust and set the mirror to ",(0,t.jsx)(n.a,{href:"https://mirrors.tuna.tsinghua.edu.cn/help/rustup/",children:"Rust China"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"is-mainnet-and-testnet-client-compatible",children:"Is mainnet and testnet client compatible?"}),"\n",(0,t.jsx)(n.p,{children:"No, the mainnet and testnet client are not same."}),"\n",(0,t.jsx)(n.h3,{id:"how-to-build-the-testnet-client",children:"How to build the testnet client?"}),"\n",(0,t.jsxs)(n.p,{children:["Checkout to the latest testnet tag and build the source code. The latest version of testnet is ",(0,t.jsx)(n.strong,{children:i.testnet}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git checkout <latest-released-testnet-version>  # checkout to the latest testnet release version\ncargo build --release\n"})}),"\n",(0,t.jsx)(n.h3,{id:"where-to-find-the-latest-release-version",children:"Where to find the latest release version?"}),"\n",(0,t.jsxs)(n.p,{children:["You can find the latest release version at ",(0,t.jsx)(n.a,{href:"https://github.com/Conflux-Chain/conflux-rust/releases",children:"Releases"})]})]})}function h(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>o});var t=s(67294);const l={},i=t.createContext(l);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);