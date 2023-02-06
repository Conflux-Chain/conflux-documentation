import React from 'react';
import cx from 'clsx';
import styles from './styles.module.css';

const Card = ({ Image, title, description, className }) => {
  return (
    <div className={cx("flex flex-col items-center rounded-[58px] bg-white dark:bg-[#152748] overflow-hidden drop-shadow-[0px_4px_12px_var(--ifm-color-primary-darker)] w-11/12", className)}>
      <div className="w-full pointer-events-none">
        {Image()}
      </div>
      <div className="px-8 pb-8 pt-4">
        <h3 className='font-medium text-[20px]'>{title}</h3>
        <p className='text-[#737A88] dark:text-[#A2A8B6] text-[14px] mt-1 font-normal'>{description}</p>
      </div>
    </div>
  );
}

export default Card;
