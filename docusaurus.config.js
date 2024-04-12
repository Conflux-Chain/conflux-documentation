// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Conflux Docs',
  tagline: 'Developer resources for building on Conflux. By developers, for developers.',
  url: 'https://doc.confluxnetwork.org/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Conflux', // Usually your GitHub org/user name.
  projectName: 'conflux-documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','zh-CN','es'],
    localeConfigs: {
      "zh-CN": {
        path: "zh"
      }
    }
  },

  scripts: [
    {
      src: '/js/clarity.js',
      async: false,
    }
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 100,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            // link zh documentation to Crowdin
            if (locale !== 'en') {
              return `https://crowdin.com/project/conflux/${locale}`;
            }
            //  link en documentation to GitHub
            return `https://github.com/Conflux-Chain/conflux-documentation/edit/main/docs/${docPath}`;
          },  
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'templates/*.{md,mdx}',
          ]
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Conflux Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
        },
        items: [
          {
            position: 'left',
            label: 'Overview',
            to: '/docs/overview',
          },
          {
            position: 'left',
            label: 'eSpace',
            to: '/docs/espace/Overview',
          },
          {
            position: 'left',
            label: 'Core Space',
            to: '/docs/core/Overview',
          },
          {
            position: 'left',
            label: 'General',
            to: '/docs/general',
          },
          {
            type: 'html',
            position: 'left',
            value: '｜',
          },
          {
            position: 'left',
            label: 'Concepts',
            // to: '/docs/core',
            sidebarId: "concepts",
            type: "docSidebar"
          },
          {
            position: "left",
            label: "References",
            sidebarId: "references",
            type: "docSidebar"
          },
          // {
          //   position: 'left',
          //   label: 'Tutorials',
          //   // to: '/docs/core',
          //   sidebarId: "tutorials",
          //   type: "docSidebar",
          // },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Conflux-Chain/conflux-documentation',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://forms.office.com/r/pKVBywZwLY',
            position: 'right',
            className: 'header-feedback-link',
            'aria-label': 'Feedback',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
            {
                title: 'Quick Links',
                items: [
                  {
                    label: 'eSpace RPC Endpoints',
                    to: '/docs/espace/network-endpoints',
                  },
                  {
                    label: 'Core Space RPC Endpoints',
                    to: '/docs/core/conflux_rpcs',
                  },
                ],
              },
          {
            title: 'Resources',
            items: [
              {
                label: 'Conflux Website',
                to: 'https://confluxnetwork.org',
              },
              {
                label: 'Conflux Forum',
                to: 'https://forum.conflux.fun',
              },
              {
                label: 'Github',
                to: 'https://github.com/Conflux-Chain',
              },
              {
                label: 'Fluent Docs',
                to: 'https://docs.fluentwallet.com/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                to: 'https://discord.gg/confluxnetwork',
              },
              {
                label: 'Telegram',
                to: 'https://t.me/Conflux_English',
              },
            ],
          },
          {
            title: 'Developers',
            items: [
              {
                label: 'ConfluxDevs Twitter',
                to: 'https://twitter.com/ConfluxDevs',
              },
              {
                label: 'ConfluxDevs Telegram',
                to: 'https://t.me/ConfluxDevs',
              },
              {
                label: 'Open Technical Grants',
                href: 'https://forum.conflux.fun/t/open-technical-grants/14399',
              },
              {
                label: 'Contribute (Github)',
                href: 'https://github.com/Conflux-Chain/conflux-documentation',
              },
            ],
          },
        ],
        logo:{
          alt: 'Conflux Copyright Logo',
          src:'img/footer_logo.svg',
          width:32,
          height:16,
        },
        copyright: `Copyright © ${new Date().getFullYear()} ConfluxNetwork, Org.`,
      },
      prism: {
        theme: lightCodeTheme, 
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity'],
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'EA5TTCRZGT',
        
      //   // Public API key: it is safe to commit it
      //   apiKey: '459281c476ae57d1d2a275ea535cdf1c',
        
      //   indexName: 'confluxnetwork',
      //   /*
      //   // Optional: see doc section below
      //   contextualSearch: true,
        
      //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //   externalUrlRegex: 'external\\.com|domain\\.com',
        
      //   // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //   replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/docs/',
      //   },
      //   */
      //   // Optional: Algolia search parameters
      //   searchParameters: {},
        
      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: 'search',
        
      //   //... other Algolia params
      //   },
        
    }),
};

module.exports = config;
