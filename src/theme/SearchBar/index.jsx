import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { markprompt } from '@markprompt/web';
import SearchBar from '@theme-original/SearchBar';
import React, { useEffect } from 'react';

import '@markprompt/css';

export default function SearchBarWrapper(props) {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const { projectKey, ...config } = siteConfig.themeConfig.markprompt;
    markprompt(projectKey, '#markprompt', config);
  }, [siteConfig.themeConfig.markprompt]);

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div id="markprompt" />
      <SearchBar {...props} />
    </div>
  );
}
