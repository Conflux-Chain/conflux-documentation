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
      title={`${siteConfig.title}`}
      description=""
    >
      <main className='bg-[#F5F5F5] dark:bg-[#1B2F59] flex flex-col items-center justify-center pb-24' >
        <div className={cx('w-full flex justify-center', styles.gradientBg)}>
          <div className='max-w-[1920px] px-20 grid gird-cols-1 lg:grid-cols-3 lg:gap-12 items-center z-10'>
            <div className='flex flex-col span-cols-1 order-2 lg:order-1'>
              <h1 className="hero__title">Conflux</h1>
              <h1 className="hero__title">Developer</h1>
              <h1 className="hero__title">Portal</h1>
              <p className="hero__subtitle text-[#737A88]">{siteConfig.tagline}</p>
            </div>
            <CFX role='img' className='span-cols-2 w-10/12 h-auto lg:w-[200%] order-1 lg:order-2' />
          </div>
        </div>
        <FeatureCards wrapperClassName='mt-20 lg:mt-0 lg:-translate-y-14 xl:-translate-y-12 z-10' />
        <div className='px-20 w-full max-w-[1920px]'>
          <div className='text-[32px] font-semibold'>Explore the documentation</div>
          <DocCatalog />
        </div>
      </main>
    </Layout>
  );
}

export default Home;
