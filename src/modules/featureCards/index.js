import React from 'react';
import cx from 'clsx';
import Card from '@site/src/components/Card';
import CFXBOX from '@site/static/img/cfx_box.jpg';
import CFXSREEN from '@site/static/img/cfx_screen.jpg';
import CFXREACT from '@site/static/img/cfx_react.jpg';

const FeatureList = [
  {
    title: 'Build on Conflux eSpace',
    Image: () => <img src={CFXSREEN} alt='' className='w-full pointer-events-none' />,
    description: (
        <>
        Conflux eSpace is a fully EVM-compatible blockchain with much lower gas fee and higher TPS than Ethereum, which can enable developers quick build dApps on it.
        </>
    ),
    link: '/docs/espace/Overview',
  },
  {
    title: 'Build on Conflux Core Space',
    Image: () => <img src={CFXSREEN} alt='' className='w-full pointer-events-none' />,
    description: (
        <>
        Conflux Core Space is a third-generation decentralized blockchain with ultra-high performance, utilizing an original Tree-Graph ledger structure and the Ghast consensus algorithm. It natively integrates a transaction sponsorship mechanism, offering a novel user experience for both users and developers.
        </>
    ),
    link: '/docs/core/Overview',
  },
  {
    title: 'Conflux Basics',
    Image: () => <img src={CFXBOX} alt='' className='w-full pointer-events-none' />,
    description: (
      <>
        Get started with Conflux Network and understand its unique features.
        Learn about the protocol's hybrid consensus mechanism and fast finality, 
        and how it differs from other blockchain platforms.
      </>
    ),
    link: '/docs/general/conflux-basics/',
  },
  {
    title: 'Run a Node',
    Image: () => <img src={CFXREACT} alt='' className='w-full pointer-events-none' />,
    description: (
      <>
        Learn how to run a node on the Conflux Network and become part of the decentralized 
        network. Follow our step-by-step guides to install and configure your node, 
        connect to the network, and start participating in consensus.
      </>
    ),
    link: '/docs/general/run-a-node/Overview',
  },
  {
    title: 'Mining on Conflux',
    Image: () => <img src={CFXBOX} alt='' className='w-full pointer-events-none' />,
    description: (
      <>
        Learn how to mine CFX on the Conflux Network. Follow our step-by-step guides to 
        install and configure your node, connect to the network, and start mining.
      </>
    ),
    link: '/docs/category/mining--staking',
  },
];

const FeatureCards = ({ wrapperClassName }) => {
  return (
    <div className={cx('max-w-[1920px] px-3 md:px-20 grid grid-cols-1 md:grid-cols-3 md:gap-8', wrapperClassName)} >
      {FeatureList.map((feature) => {
        return (
          // Wrap each Card component with a Link component
          <a href={feature.link} key={feature.title} style={{ textDecoration: 'none' }}  >
            <Card {...feature} className='w-10/12 mx-auto lg:mx-0 md:w-full mb-4 md:mb-20' />
          </a>
        );
      })}
    </div>
  )
}

export default FeatureCards;




