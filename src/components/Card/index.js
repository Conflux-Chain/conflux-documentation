import React from 'react';
import cx from 'clsx';
import styles from './styles.module.css';

const Card = ({ Image, title, description, className }) => {
  return (
    <div className={cx("flex flex-col items-center rounded-[58px] bg-white dark:bg-[#152748] overflow-hidden drop-shadow-[0px_4px_12px_rgba(202,206,216,0.24)]", className)}>
      <div className="w-full">
        {Image()}
      </div>
      <div className="px-8 pb-8 pt-4">
        <h3>{title}</h3>
        <p className='text-[#737A88] text-sm'>{description}</p>
      </div>
    </div>
  );
}

export default Card;
