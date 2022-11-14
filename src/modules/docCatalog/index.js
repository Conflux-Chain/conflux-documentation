import React from 'react';
import Link from '@docusaurus/Link';
import cx from 'clsx';

const DocCatalogFackData = [
  {
    catalogue: 'Tutorial Intro',
    items: [
      { url: 'docs/intro#getting-started', text: 'Getting Started', preview: 'Getting Started' },
      { url: 'docs/intro#what-youll-need', text: "What You'll Need", preview: "What You'll Need" },
      { url: 'docs/intro#generate-a-new-site', text: "Generate a New Site", preview: "Generate a New Site" },
      { url: 'docs/intro#start-your-site', text: "Start Your Site", preview: "Start Your Site" },
    ]
  },
  {
    catalogue: 'Tutorial Extras',
    items: [
      { url: 'docs/tutorial-extras/manage-docs-versions', text: 'Manage Docs Versions', preview: 'Manage Docs Versions' },
      { url: 'docs/tutorial-extras/translate-your-site', text: 'Translate Your Site', preview: 'Translate Your Site' },
    ]
  },
  {
    catalogue: 'Learn',
    items: [
      { url: 'docs/category/getting-started', text: 'Getting Started', preview: 'Getting Started' },
      { url: 'docs/category/conflux-basics', text: 'Conflux Basics', preview: 'Conflux Basics' },
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

