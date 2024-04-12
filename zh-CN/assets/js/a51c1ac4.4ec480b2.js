"use strict";(self.webpackChunkconflux_docs=self.webpackChunkconflux_docs||[]).push([[8521],{90653:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var o=t(85893),r=t(11151);const i={displayed_sidebar:"generalSidebar"},a="Block Synchronization Process",s={id:"general/build/node-development/sync",title:"Block Synchronization Process",description:"Synchronization Graph",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/general/build/node-development/sync.md",sourceDirName:"general/build/node-development",slug:"/general/build/node-development/sync",permalink:"/zh-CN/docs/general/build/node-development/sync",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/conflux/zh-CN",tags:[],version:"current",frontMatter:{displayed_sidebar:"generalSidebar"},sidebar:"generalSidebar",previous:{title:"Stratum Protocol in Conflux-Rust",permalink:"/zh-CN/docs/general/build/node-development/stratum"},next:{title:"\u6d4b\u8bd5\u6846\u67b6",permalink:"/zh-CN/docs/general/build/node-development/test-framework"}},h={},c=[{value:"Synchronization Graph",id:"synchronization-graph",level:2},{value:"Graph Structure Maintenance",id:"graph-structure-maintenance",level:3},{value:"Garbage Collect Dangling Blocks",id:"garbage-collect-dangling-blocks",level:3}];function l(e){const n={code:"code",del:"del",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"block-synchronization-process",children:"Block Synchronization Process"}),"\n",(0,o.jsx)(n.h2,{id:"synchronization-graph",children:"Synchronization Graph"}),"\n",(0,o.jsx)(n.p,{children:"Synchronization graph is designed to organize newly arrived blocks (received from the peers, loaded from local storage, or self-mined) even when their past blocks haven\u2019t been completely collected. Once all the past blocks of a block have been collected in synchronization graph, it will be dispatched to consensus graph for further processing."}),"\n",(0,o.jsx)(n.p,{children:"The block header and block body enter the synchronization graph in separate processes, because, typically, the block header and body are transferred separately in peer-to-peer layer. The graph structure in the synchronization graph is constructed by block header arrival. Each block is represented as a node in the graph structure, and the nodes are linked through the parent/child and referrer/referee relations between blocks."}),"\n",(0,o.jsx)(n.p,{children:"Synchronization graph checks the validity of arriving blocks. The blocks that do not pass the validity checks are invalid and will not be dispatched to consensus graph further. The following validity checks are conducted:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Check whether the parent or referees of a block are invalid. If one of them is invalid, the block is invalid too."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the nonce in the block header is correctly set based on the difficulty in the block header, i.e., the miner of the block correctly solved the POW puzzle."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the number of referees in the block header is larger than a threshold (200). If so, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check whether there are duplicated hashes in the parent and referees of a block. If so, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the length (in byte) of the custom field in the block header is beyond a threshold (64). If so, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the height of a block is larger than the height of its parent block by 1. If NOT, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the timestamp of a block is larger than or equal to the timestamp of its parent block. If NOT, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check the block gas limit is correctly set."}),"\n",(0,o.jsx)(n.li,{children:"Check the block difficulty is correctly set."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the block header contains the correct transaction root according to the transactions in the block body."}),"\n",(0,o.jsx)(n.li,{children:"Check whether every transaction in the block body has valid signature structure."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the total size of the transactions in the block body is larger than the block size limit (800KB). If so, the block is invalid."}),"\n",(0,o.jsx)(n.li,{children:"Check whether the total gas limit of transactions in the block body is larger than the block gas limit. If so, the block is invalid."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The validity checks 1",(0,o.jsx)(n.del,{children:"9 only use information in block header. The validity checks 10"}),"13 use the information in block body. The checks 6~9 require graph structure information like parent information and are conducted on a block when the headers of all its past blocks have entered the synchronization graph. To speed up the block relay process, when both the header and body of a block have entered the synchronization graph and the headers of all its past blocks have also entered, the block can be relayed to the peers. It is not needed to wait for the bodies of all the past blocks of a block to be received in order to relay the block. This may lead to relaying invalid blocks, but since all the relayed blocks already have valid difficulty and POW settings, the attackers who make this case also pay the corresponding cost of computation power."]}),"\n",(0,o.jsx)(n.h3,{id:"graph-structure-maintenance",children:"Graph Structure Maintenance"}),"\n",(0,o.jsx)(n.p,{children:"The node structure of synchronization graph is defined as follows:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-c",children:"pub struct SynchronizationGraphNode {\n    pub block_header: Arc<BlockHeader>,\n    // The status of graph connectivity in the current block view.\n    pub graph_status: u8,\n    // Whether the block body is ready.\n    pub block_ready: bool,\n    // Whether parent is in old era and already reclaimed\n    pub parent_reclaimed: bool,\n    // The index of the parent of the block.\n    pub parent: usize,\n    // The indices of the children of the block.\n    pub children: Vec<usize>,\n    // The indices of the blocks referenced by the block.\n    pub referees: Vec<usize>,\n    // The number of blocks referenced by the block but\n    // haven't been inserted in synchronization graph.\n    pub pending_referee_count: usize,\n    // The indices of the blocks referencing the block.\n    pub referrers: Vec<usize>,\n    // the timestamp in seconds when graph_status updated\n    pub last_update_timestamp: u64,\n}\n\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The graph structure is maintained by the fields ",(0,o.jsx)(n.code,{children:"parent"}),", ",(0,o.jsx)(n.code,{children:"children"}),", ",(0,o.jsx)(n.code,{children:"referees"}),", and ",(0,o.jsx)(n.code,{children:"referrers"}),". Each node has a ",(0,o.jsx)(n.code,{children:"graph_status"})," field representing its status changing during the period from the time when the header arrives to the time when the block is ready to be dispatched to consensus graph."]}),"\n",(0,o.jsxs)(n.p,{children:["When a block header enters synchronization graph, it is first checked whether this block is already processed by synchronization graph.\nIf not, it will be added into the graph and the graph structure will be updated accordingly.\nFirst, the ",(0,o.jsx)(n.em,{children:"parent/children"})," edge will be established.\nIf the parent of this newly arrived block hasn\u2019t come into synchronization graph, the graph uses a collection ",(0,o.jsx)(n.code,{children:"children_by_hash"})," to handle this.\nThis is a map from block hash to a set of graph nodes.\nIn this case, the graph node representing this newly arrived block header will be added into the graph node set mapped from the parent block hash of this block.\nThis functions as a bookkeeping to remember the relation between the parent block hash and this newly arrived block.\nOnce this parent block comes into the synchronization graph in the future, the corresponding edge between the parent and child nodes can be established and the hash of the parent block will be removed from the ",(0,o.jsx)(n.code,{children:"children_by_hash"})," map.\nSecondly, the ",(0,o.jsx)(n.em,{children:"referees/referrers"})," edges will also be established.\nSimilarly, the synchronization graph uses a map ",(0,o.jsx)(n.code,{children:"referrers_by_hash"})," to remember the relation between the unarrived referee block and the newly arrived referrer block.\nThe graph node also maintains a ",(0,o.jsx)(n.code,{children:"pending_referee_count"})," field to remember how many referees of the block haven\u2019t come into the synchronization graph."]}),"\n",(0,o.jsx)(n.p,{children:"A graph node may be in the following 5 status:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-c",children:"// This block is an invalid block.\nconst BLOCK_INVALID: u8 = 0;\n// Just get the header of the block.\nconst BLOCK_HEADER_ONLY: u8 = 1;\n// The headers of all the blocks in the past set of this block have already entered\n// synchronization graph. \nconst BLOCK_HEADER_GRAPH_READY: u8 = 2;\n// Both the headers and bodies of all the blocks in the past set of this block have\n// entered synchronization graph.\nconst BLOCK_GRAPH_READY: u8 = 3;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["When a block header just enters the synchronization graph and triggers a new graph node being created and added in the graph, the initial status of the node is ",(0,o.jsx)(n.code,{children:"BLOCK_HEADER_ONLY"}),".\nAnd according to this graph structure update, the status of other nodes in the graph may also change.\nThe effects of these changes are fulfilled by conducting a BFS traversal from the node to all its descendants.\nDuring this traversal process, for each node,"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"if it is invalid, all its descendants are invalid;"}),"\n",(0,o.jsxs)(n.li,{children:["if it is new to be ",(0,o.jsx)(n.code,{children:"BLOCK_HEADER_GRAPH_READY"}),", some graph-related validity checks (6~9) are applied on it.\nIf it passes these checks, it is then checked whether its block body has already entered synchronization graph (by checking the ",(0,o.jsx)(n.code,{children:"block_ready"})," field of the graph node).\nIf so, this block is ready to be relayed. And this block may make some of its descendants become ",(0,o.jsx)(n.code,{children:"BLOCK_HEADER_GRAPH_READY"}),".\nNote that this cannot make its descendants become ",(0,o.jsx)(n.code,{children:"BLOCK_GRAPH_READY"})," since the original node (at the starting point of the BFS process) for the newly arrived block header can only be ",(0,o.jsx)(n.code,{children:"BLOCK_HEADER_GRAPH_READY"}),";"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["When a block body just enters the synchronization graph, the corresponding graph node should already exist in synchronization graph, otherwise, the block will be ignored (this may happen if it is garbage collected).\nThe ",(0,o.jsx)(n.code,{children:"block_ready"})," field of this node will be set as true now.\nThe block then goes through the corresponding validity checks (10~13).\nAnd similarly, this newly arrived block body will change the status of some of its descendants.\nThis is also done by conducting a BFS traversal from this node.\nDuring this traversal process, for each node,"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"if it is invalid, all its descendants are invalid;"}),"\n",(0,o.jsxs)(n.li,{children:["if it is new to be ",(0,o.jsx)(n.code,{children:"BLOCK_GRAPH_READY"}),", it is dispatched to consensus graph.\nIt may make some of its descendants become ",(0,o.jsx)(n.code,{children:"BLOCK_GRAPH_READY"}),".\nIf the block with the newly arrived body is at least ",(0,o.jsx)(n.code,{children:"BLOCK_HEADER_GRAPH_READY"}),", it becomes ready to be relayed."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"garbage-collect-dangling-blocks",children:"Garbage Collect Dangling Blocks"}),"\n",(0,o.jsxs)(n.p,{children:["Some (adversarial) nodes may send to a full node some blocks that cannot be in status of ",(0,o.jsx)(n.code,{children:"BLOCK_GRAPH_READY"})," forever, e.g., to conduct DDOS attack or to be in the case of serious message delay so that the block does not belong to the current checkpoint era anymore.\nThese blocks will be held in synchronization graph but should be garbage-collected eventually to avoid wasting memory resources.\nIn order to do this, the synchronization graph maintains a set of blocks representing the frontier of these graph-unready blocks.\nA block should be a frontier block if"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["the block is not in status of ",(0,o.jsx)(n.code,{children:"BLOCK_GRAPH_READY"})," but its parent block is; or"]}),"\n",(0,o.jsx)(n.li,{children:"its parent block has not come into the synchronization graph."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"To garbage collect these graph-unready blocks, it starts from the frontier of these blocks, and removes them and all their descendants that can be reached through BFS traversal by following children and referrers edges.\nThe reason that we must remove all the descendants of the frontier blocks from the synchronization graph is related to the design of block synchronization process.\nDuring the block synchronization, it follows the parent and referees edges of a newly arrived block and tries to fetch the missing ancestors.\nWhen it encounters such an ancestor block that already exists in synchronization graph, the process stops following its parent and referees edges further.\nTherefore, if the ancestor block is the descendant block of some frontier graph-unready block that has already been garbage collected, this removed unready block will never get chance to be fetched from peer again.\nHowever, this removed frontier block may be graph-unready merely because a temporary bad network situation which may recover later."}),"\n",(0,o.jsxs)(n.p,{children:["This garbage collection process is triggered periodically, and in each of this process, it only tries to remove frontier blocks and their descendants which have already been in unready status for a long time.\nIn order to get the timing information, each graph node has a field ",(0,o.jsx)(n.code,{children:"last_update_timestamp"})," to remember the timestamp of the last update of the node status."]}),"\n",(0,o.jsx)(n.p,{children:"One optimization in the synchronization process is that it does not always fetch from peers the parent and referees of newly arrived block that are missing in memory.\nIt checks whether the height of the block is far less than the height of the local best epoch block.\nIf so, it is highly probable that the ancestors of this block exist in local database, so it deserves the effort of trying to get these blocks from local database first.\nIt is also an effective way to avoid unnecessary backward tree-graph traversing merely according to the peer information, which we also cover a bit more detail in Recovery Process section."})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>a});var o=t(67294);const r={},i=o.createContext(r);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);