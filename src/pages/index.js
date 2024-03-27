import React from 'react';
import cx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DocCatalog from '@site/src/modules/docCatalog';
import FeatureCards from '@site/src/modules/featureCards';
import CFX from '@site/static/img/conflux.svg';
import styles from './index.module.css';


const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  return (

    <Layout
      title={`${siteConfig.title}`}
      description=""
    >

      <main className='bg-[#F6F9FF] dark:bg-[#0C1831] flex flex-col items-center justify-center pb-24' >
        <div className={cx('w-full flex justify-center', styles.gradientBg)}>
          <div className='max-w-[1920px] w-full px-[76px] flex flex-col lg:flex-row lg:justify-between items-center z-10'>
            <div className='flex flex-col lg:w-[37.5%] order-2 lg:order-1 font-bold'>
              <h1 className="text-[68px]">Conflux</h1>
              <h1 className="text-[68px]">Developer</h1>
              <h1 className="text-[68px]">Portal</h1>
              <p className="hero__subtitle text-[#737A88] text-[24px] dark:text-[#A2A8B6] font-normal mt-6">{siteConfig.tagline}</p>
              <a href='/docs/overview'>
                <button className={cx('text-[18px]', styles.startBuildingBtn)}>Start Building</button>
              </a>
            </div>
            <CFX role='img' className='w-10/12 lg:w-[43.3%] h-auto order-1 lg:order-2' />
          </div>
        </div>
        
        <FeatureCards wrapperClassName='mt-20 lg:mt-0 xl:-translate-y-14 xl:-translate-y-12 z-10' />
        
        <div className='px-9 md:px-[78px] w-full max-w-[1920px]'>
          <div className='text-[32px] font-semibold'>Explore the documentation</div>
          <DocCatalog />
        </div>
      </main>
    </Layout>

  );
}

export default Home;
