import React from 'react';
import cx from 'clsx';
import Card from '@site/src/components/Card';
import CFXBOX from '@site/static/img/cfx_box.jpg';
import CFXSREEN from '@site/static/img/cfx_screen.jpg';
import CFXREACT from '@site/static/img/cfx_react.jpg';

const FeatureList = [
  {
    title: 'Easy to Use',
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

const FeatureCards = ({ wrapperClassName }) => {
  return (
    <div className={cx('max-w-[1920px] px-20 grid grid-cols-1 md:grid-cols-3 md:gap-8', wrapperClassName)}>
      {FeatureList.map((feature) => {
        return <Card key={feature.title} {...feature} className='w-10/12 mx-auto lg:mx-0 md:w-full mb-20' />
      })}
    </div>
  )
}

export default FeatureCards;