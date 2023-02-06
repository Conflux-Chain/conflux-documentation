// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Conflux Docs',
  tagline: 'Developer resources for building on Conflux. By developers, for developers.',
  url: 'https://docs.conflux123.xyz/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Conflux', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
        title: 'CONFLUXDOCS',
        logo: {
          alt: 'Conflux Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            position: 'left',
            label: 'Learn',
            to: '/docs/category/learn',
          },
          {
            position: 'left',
            label: 'Mine',
            to: '/docs/category/mine',
          },
          {
            position: 'left',
            label: 'Stake',
            to: '/docs/category/stake',
          },
          {
            position: 'left',
            label: 'Build',
            to: '/docs/category/build',
          },
          {
            href: 'https://github.com/Conflux-Chain/conflux-documentation',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Learn',
                to: '/docs/category/learn',
              },
              {
                label: 'Mine',
                to: '/docs/category/learn',
              },
              {
                label: 'Stake',
                to: '/docs/category/learn',
              },
              {
                label: 'Build',
                to: '/docs/category/learn',
              },

            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                to: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                to: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Contribute',
                to: '/docs/category/contribute',
              },
              {
                label: 'Get Involved',
                to: '/docs/category/get-involved',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/documentation/docusaurus',
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
        copyright: `Copyright © ${new Date().getFullYear()} ConfluxNetwork, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
