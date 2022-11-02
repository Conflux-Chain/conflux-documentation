import React from 'react';
import cx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DocCatalog from '@site/src/modules/docCatalog';
import FeatureCards from '@site/src/modules/featureCards';
import CFX from '@site/static/img/Conflux.svg';

import styles from './index.module.css';


const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className='bg-[#DAE5FA] flex flex-col items-center justify-center pb-24' >
        <div className=' bg-gradient-to-b from-[#B3C7EE] to-[#DAE5FA] w-full flex justify-center'>
          <div className='max-w-[1920px] px-20 grid gird-cols-1 lg:grid-cols-3 lg:gap-12 items-center'>
            <div className='flex flex-col span-cols-1 order-2 lg:order-1'>
              <h1 className="hero__title">Conflux</h1>
              <h1 className="hero__title">Developer</h1>
              <h1 className="hero__title">Portal</h1>
              <p className="hero__subtitle text-[#737A88]">{siteConfig.tagline}</p>
            </div>
            <CFX role='img' className='span-cols-2 w-10/12 h-auto lg:w-[200%] order-1 lg:order-2' />
          </div>
        </div>
        <FeatureCards wrapperClassName='mt-20 lg:mt-0 lg:-translate-y-14 xl:-translate-y-12' />
        <div className='px-20 w-full max-w-[1920px]'>
          <div className='text-[32px] font-semibold'>Explore the documentation</div>
          <DocCatalog />
        </div>
      </main>
    </Layout>
  );
}

export default Home;
