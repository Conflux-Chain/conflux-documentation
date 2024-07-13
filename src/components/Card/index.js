import React from "react";
import cx from "clsx";
import Translate from "@docusaurus/Translate";
// import styles from './styles.module.css';

const Card = ({ Image, title, description, className, link }) => {
  return (
    <div
      className={cx(
        "flex flex-col items-center rounded-[20px] bg-white dark:bg-[#152748] overflow-hidden drop-shadow-[0px_4px_12px_var(--ifm-color-primary-darker)] w-11/12",
        className
      )}
    >
      {/* <div className="w-full pointer-events-none">
        {Image()}
      </div> */}
      <div className="px-8 pb-4 pt-6">
        <h3 className="font-medium text-[20px]">{title}</h3>
        <p className="text-[#737A88] dark:text-[#A2A8B6] text-[14px] mt-1 font-normal">
          {description}
        </p>
        <a href={link}>
          <Translate id="home.card.readTheDocs">Read the Docs</Translate>
        </a>
      </div>
    </div>
  );
};

export default Card;
