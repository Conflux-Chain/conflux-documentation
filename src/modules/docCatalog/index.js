import React from 'react';
import Link from '@docusaurus/Link';
import cx from 'clsx';

const DocCatalogFackData = [
  {
    catalogue: 'General',
    items: [
      { url: 'docs/general/conflux-basics', text: 'Conflux Basics' },
      { url: 'docs/category/run-a-node', text: 'Run a Node',  },
      { url: 'docs/category/mining--staking', text: 'Mining & Staking'},
      { url: 'docs/general/build', text: 'Build'},
      { url: 'docs/general/faq', text: 'FAQ'},
    ]
  },
  {
    catalogue: 'Core',
    items: [
      { url: 'docs/core/learn', text: 'Learn' },
      { url: 'docs/core/build', text: 'Build' },
    ]
  },
  {
    catalogue: 'eSpace',
    items: [
      { url: 'docs/category/learn', text: 'Learn' },
      { url: 'docs/category/build', text: 'Build' },
    ]
  },
]

const CatalogueItem = ({ url, text, preview }) => {
  return (
    <li>
      <Link to={url} className='text-[#4C7BEF] text-sm font-medium underline'>{text}</Link>
      <p className='text-sm font-normal mb-6 dark:text-[#CACED8]'>{preview}</p>
    </li>
  )
}

const Catalogue = ({ catalogue, items }) => {
  return (
    <li key={catalogue} className='mt-[88px]'>
      <div className='text-[20px] font-medium mb-9'>{catalogue}</div>
      <ul>
        {items.map(item => { return <CatalogueItem key={item.text} url={item.url} text={item.text} preview={item.preview} /> })}
      </ul>
    </li>
  )
}

const DocCatalog = ({ className }) => {
  return (
    <ul className={cx(className, 'grid  grid-cols-1 md:grid-cols-3 md:gap-8')}>
      {DocCatalogFackData.map(catalogue => { return <Catalogue key={catalogue.catalogue} catalogue={catalogue.catalogue} items={catalogue.items} /> })}
    </ul>
  )
}

export default DocCatalog;

