import React from "react";
import Link from "@docusaurus/Link";
import cx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";

const DocCatalogFeckData = [
  {
    catalogue: "eSpace",
    items: [
      {
        url: "/docs/espace/UserGuide",
        text: (
          <Translate id="home.catalog.eSpace.userGuide.title">
            User Guide
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.userGuide.preview">
            Guiding user connect Metamask to eSpace
          </Translate>
        ),
      },
      {
        url: "/docs/espace/UserGuide",
        text: (
          <Translate id="home.catalog.eSpace.spaceBridgeGuide.title">
            Space Bridge Guide
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.spaceBridgeGuide.preview">
            Guiding user bridge CFX between eSpace and Core Space
          </Translate>
        ),
      },
      {
        url: "/docs/espace/DeveloperQuickstart",
        text: (
          <Translate id="home.catalog.eSpace.quickstart.title">
            Developer Quickstart
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.quickstart.preview">
            Quickstart for Ethereum developers
          </Translate>
        ),
      },
      {
        url: "/docs/category/tutorials-1",
        text: (
          <Translate id="home.catalog.eSpace.tutorials.title">
            Tutorials
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.tutorials.preview">
            Developer tutorials
          </Translate>
        ),
      },
      {
        url: "/docs/espace/network-endpoints",
        text: (
          <Translate id="home.catalog.eSpace.endpoints.title">
            Network RPC Endpoints
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.endpoints.preview">
            RPC endpoint, block explorer url, chainId etc
          </Translate>
        ),
      },
      {
        url: "/docs/espace/build/evm-compatibility",
        text: (
          <Translate id="home.catalog.eSpace.evmCompatibility.title">
            EVM Compatibility
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.eSpace.evmCompatibility.preview">
            Learn about compatibility with EVM
          </Translate>
        ),
      },
      {
        url: "/docs/espace/FAQs",
        text: <Translate id="home.catalog.eSpace.faq.title">FAQs</Translate>,
        preview: (
          <Translate id="home.catalog.eSpace.faq.preview">
            Frequently question & answers
          </Translate>
        ),
      },
    ],
  },
  {
    catalogue: "Core Space",
    items: [
      {
        url: "/docs/core/getting-started/",
        text: (
          <Translate id="home.catalog.cSpace.gettingStarted.title">
            Getting Started
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.gettingStarted.preview">
            Getting started using Fluent Wallet
          </Translate>
        ),
      },
      {
        url: "/docs/category/core-space-basics",
        text: (
          <Translate id="home.catalog.cSpace.basics.title">
            Core Space Basics
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.basics.preview">
            Learn about the Conflux Core Space
          </Translate>
        ),
      },
      {
        url: "/docs/core/core-space-basics/transactions/overview",
        text: (
          <Translate id="home.catalog.cSpace.transaction.title">
            Transaction Explain
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.transaction.preview">
            Core Space Transaction Details
          </Translate>
        ),
      },
      {
        url: "/docs/core/core-space-basics/sponsor-mechanism",
        text: (
          <Translate id="home.catalog.cSpace.sponsor.title">
            Sponsorship Mechanism
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.sponsor.preview">
            Intro of Core Space Sponsorship Mechanism
          </Translate>
        ),
      },
      {
        url: "/docs/category/tutorials",
        text: (
          <Translate id="home.catalog.cSpace.tutorials.title">
            Developer Tutorials
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.tutorials.preview">
            Tutorials for build on Conflux Core Space
          </Translate>
        ),
      },
      {
        url: "/docs/core/conflux_rpcs",
        text: (
          <Translate id="home.catalog.cSpace.rpcEndpoints.title">
            Core Space RPC Endpoints
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.cSpace.rpcEndpoints.preview">
            RPC endpoint, block explorer url, chainId etc
          </Translate>
        ),
      },
      {
        url: "/docs/category/build",
        text: <Translate id="home.catalog.cSpace.build.title">Build</Translate>,
        preview: (
          <Translate id="home.catalog.cSpace.build.preview">
            Learn how to build on Core Space
          </Translate>
        ),
      },
    ],
  },
  {
    catalogue: <Translate id="home.catalog.general">General</Translate>,
    items: [
      {
        url: "docs/general/conflux-basics",
        text: (
          <Translate id="home.catalog.general.base.title">
            Conflux Basics
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.general.base.preview">
            Learn about the Conflux basics
          </Translate>
        ),
      },
      {
        url: "/docs/general/run-a-node/Overview",
        text: (
          <Translate id="home.catalog.general.node.title">Run a Node</Translate>
        ),
        preview: (
          <Translate id="home.catalog.general.node.preview">
            Docs about how to run a node
          </Translate>
        ),
      },
      {
        url: "docs/category/mining--staking",
        text: (
          <Translate id="home.catalog.mining&staking.title">
            Mining & Staking
          </Translate>
        ),
        preview: (
          <Translate id="home.catalog.mining&staking.preview">
            Learn about the Conflux mining & staking
          </Translate>
        ),
      },
      {
        url: "docs/general/build",
        text: (
          <Translate id="home.catalog.general.build.title">Build</Translate>
        ),
        preview: (
          <Translate id="home.catalog.general.build.preview">
            Learn how to build on Conflux
          </Translate>
        ),
      },
      {
        url: "docs/general/faq",
        text: <Translate id="home.catalog.general.faq.title">FAQ</Translate>,
        preview: (
          <Translate id="home.catalog.general.faq.preview">
            Common questions and answers about Conflux
          </Translate>
        ),
      },
    ],
  },
];

const CatalogueItem = ({ url, text, preview }) => {
  return (
    <div>
      <Link to={url} className="text-[#4C7BEF] text-base font-medium underline">
        {text}
      </Link>
      <p className="text-base font-normal mb-4 dark:text-[#CACED8]">
        {preview}
      </p>
    </div>
  );
};

const Catalogue = ({ catalogue, items }) => {
  return (
    <div key={catalogue} className="mt-[40px]">
      <div className="text-[28px] font-medium mb-3 md:mb-6">{catalogue}</div>
      <div>
        {items.map((item) => {
          return (
            <CatalogueItem
              key={item.text}
              url={item.url}
              text={item.text}
              preview={item.preview}
            />
          );
        })}
      </div>
    </div>
  );
};

const DocCatalog = ({ className }) => {
  return (
    <div className={cx(className, "grid  grid-cols-1 md:grid-cols-3 md:gap-8")}>
      {DocCatalogFeckData.map((catalogue) => {
        return (
          <Catalogue
            key={catalogue.catalogue}
            catalogue={catalogue.catalogue}
            items={catalogue.items}
          />
        );
      })}
    </div>
  );
};

export default DocCatalog;
