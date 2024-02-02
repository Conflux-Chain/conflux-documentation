// import Link from "@docusaurus/Link";
// import img from "@site/static/img/docusaurus.png";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function HomeQuickStartBanner() {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3>General Knowledge of Conflux Network</h3>
        <p>Common concepts and knowledge for both Core Space and eSpace</p>
        {/* <Link to="/quick-start">
          <button type="button" className={styles.ctaBtn}>
            Quick Start
          </button>
        </Link> */}
      </div>
      <div className={styles.imageContainer}>
        {/* <img src={img} alt="Conflux" className={styles.image} /> */}
      </div>
    </div>
  );
}
