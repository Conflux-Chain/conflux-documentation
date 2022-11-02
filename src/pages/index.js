import React from 'react';
import cx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Card from '@site/src/components/Card';
import sidebars from '../../sidebars';
import CFX from '@site/static/img/Conflux.svg';
import CFXBOX from '@site/static/img/cfx_box.jpg';
import CFXSREEN from '@site/static/img/cfx_screen.jpg';
import CFXREACT from '@site/static/img/cfx_react.jpg';
import styles from './index.module.css';

//TODO: Put FeatureList in another fuitable place
const FeatureList = [
  {
    title: 'Easy to Use',
    // Image: require('@site/static/img/cfx_box.svg').default,
    Image: () => <img src={CFXBOX} alt='CFX box' className='w-full' />,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Image: () => <img src={CFXSREEN} alt='CFX Screen' className='w-full' />,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the docs directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    // Svg: require('@site/static/img/cfx_react.svg').default,
    Image: () => <img src={CFXREACT} alt='CFX React' className='w-full' />,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

const Home = () => {
  const { siteConfig } = useDocusaurusContext();
  console.log('sidebars', JSON.stringify(sidebars));
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className='bg-[#DAE5FA] flex flex-col items-center' >
        <div className=' bg-gradient-to-b from-[#B3C7EE] to-[#DAE5FA] px-20'>
          <div className='max-w-[1920px] grid gird-cols-1 md:grid-cols-3 md:gap-12 items-center'>
            <div className='flex flex-col span-cols-1'>
              <h1 className="hero__title">Conflux</h1>
              <h1 className="hero__title">Developer</h1>
              <h1 className="hero__title">Portal</h1>
              <p className="hero__subtitle text-[#737A88]">{siteConfig.tagline}</p>
            </div>
            <CFX role='img' className='span-cols-2 w-10/12 md:w-[200%]' />
          </div>
        </div>
        <div className='max-w-[1920px] px-20 grid grid-cols-1 md:grid-cols-3 md:gap-8 -translate-y-36'>
          {FeatureList.map((feature) => {
            return <Card key={feature.title} {...feature} className='w-10/12 md:w-full' />
          })}
        </div>
      </main>
    </Layout>
  );
}

export default Home;
