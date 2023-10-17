import React from 'react';
import cx from 'clsx';
import Card from '@site/src/components/Card';
import CFXBOX from '@site/static/img/cfx_box.jpg';
import CFXSREEN from '@site/static/img/cfx_screen.jpg';
import CFXREACT from '@site/static/img/cfx_react.jpg';

const FeatureList = [
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
    link: '/docs/general/conflux-basics/', // Add link property to each feature
  },
  {
    title: 'Build on Conflux',
    Image: () => <img src={CFXSREEN} alt='' className='w-full pointer-events-none' />,
    description: (
      <>
      Discover the possibilities of building decentralized applications (dApps) 
      on Conflux Network. Find out how to build scalable, 
      high-performance dApps on Conflux Network.
      </>
    ),
    link: '/docs/general/build/',
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
    link: '/docs/general/run-a-node/',
  },
];

const FeatureCards = ({ wrapperClassName }) => {
  return (
    <div className={cx('max-w-[1920px] px-20 grid grid-cols-1 md:grid-cols-3 md:gap-8', wrapperClassName)} >
      {FeatureList.map((feature) => {
        return (
          // Wrap each Card component with a Link component
          <a href={feature.link} key={feature.title} style={{ textDecoration: 'none' }}  >
            <Card {...feature} className='w-10/12 mx-auto lg:mx-0 md:w-full mb-20' />
          </a>
        );
      })}
    </div>
  )
}

export default FeatureCards;




