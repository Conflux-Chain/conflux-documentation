import React from 'react';
import Link from '@docusaurus/Link';
import cx from 'clsx';

const DocCatalogFackData = [
  {
    catalogue: 'eSpace',
    items: [
      { url: '/docs/espace/UserGuide', text: 'User Guide', preview: 'Guiding user connect Metamask to eSpace' },
      { url: '/docs/espace/UserGuide', text: 'Space Bridge Guide', preview: 'Guiding user bridge CFX between eSpace and Core Space' },
      { url: '/docs/espace/DeveloperQuickstart', text: 'Developer Quickstart', preview: 'Quickstart for Ethereum developers' },
      { url: '/docs/category/tutorials-1', text: 'Tutorials', preview: 'Developer tutorials' },
      { url: '/docs/espace/network-endpoints', text: 'Network RPC Endpoints', preview: 'RPC endpoint, block explorer url, chainId etc' },
      { url: '/docs/espace/build/evm-compatibility', text: 'EVM Compatibility', preview: 'Learn about compatibility with EVM' },
      { url: '/docs/espace/FAQs', text: 'FAQs', preview: 'Frequently question & answers' },
    ]
  },
  {
    catalogue: 'Core Space',
    items: [
      { url: '/docs/core/getting-started/', text: 'Getting Started', preview: 'Getting started using Fluent Wallet' },
      { url: '/docs/category/core-space-basics', text: 'Core Space Basics', preview: 'Learn about the Conflux Core Space' },
      { url: '/docs/core/core-space-basics/transactions/overview', text: 'Transaction Explain', preview: 'Core Space Transaction Details' },
      { url: '/docs/core/core-space-basics/sponsor-mechanism', text: 'Sponsorship Mechanism', preview: 'Intro of Core Space Sponsorship Mechanism' },
      { url: '/docs/category/tutorials', text: 'Developer Tutorials', preview: 'Tutorials for build on Conflux Core Space' },
      { url: '/docs/core/conflux_rpcs', text: 'Core Space RPC Endpoints', preview: 'RPC endpoint, block explorer url, chainId etc' },
      { url: '/docs/category/build', text: 'Build', preview: 'Learn how to build on Core Space' },
    ]
  },
  {
    catalogue: 'General',
    items: [
      { url: 'docs/general/conflux-basics', text: 'Conflux Basics', preview: 'Learn about the Conflux basics' },
      { url: '/docs/general/run-a-node/Overview', text: 'Run a Node', preview: 'Docs about how to run a node' },
      { url: 'docs/category/mining--staking', text: 'Mining & Staking', preview: 'Learn about the Conflux mining & staking' },
      { url: 'docs/general/build', text: 'Build', preview: 'Learn how to build on Conflux' },
      { url: 'docs/general/faq', text: 'FAQ', preview: 'Common questions and answers about Conflux'},
    ]
  },
]

const CatalogueItem = ({ url, text, preview }) => {
  return (
    <div>
      <Link to={url} className='text-[#4C7BEF] text-base font-medium underline'>{text}</Link>
      <p className='text-base font-normal mb-4 dark:text-[#CACED8]'>{preview}</p>
    </div>
  )
}

const Catalogue = ({ catalogue, items }) => {
  return (
    <div key={catalogue} className='mt-[40px]'>
      <div className='text-[28px] font-medium mb-3 md:mb-6'>{catalogue}</div>
      <div>
        {items.map(item => { return <CatalogueItem key={item.text} url={item.url} text={item.text} preview={item.preview} /> })}
      </div>
    </div>
  )
}

const DocCatalog = ({ className }) => {
  return (
    <div className={cx(className, 'grid  grid-cols-1 md:grid-cols-3 md:gap-8')}>
      {DocCatalogFackData.map(catalogue => { return <Catalogue key={catalogue.catalogue} catalogue={catalogue.catalogue} items={catalogue.items} /> })}
    </div>
  )
}

export default DocCatalog;

