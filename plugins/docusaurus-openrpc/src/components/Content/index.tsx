import {
  ContentDescriptorObject,
  JSONSchema,
  MethodObject,
  MethodObjectParams,
  Servers,
} from "@open-rpc/meta-schema";
import React, { useEffect, useState } from "react";
import Params from "../Params";
import Examples from "../Examples";
import "./index.css";
import { Result } from "../Result";
import Playground from "../Playground";
import { useColorMode } from "@docusaurus/theme-common";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
interface Props {
  method: MethodObject;
  servers: { name: string; url: string }[];
}

const Content = ({ method, servers }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          colorMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <StyleProvider>
        <p>{method.summary}</p>
        <Playground
          method={method}
          servers={servers.filter((serve) => serve.url.startsWith("http"))}
        />
        <Params params={method.params} />
        <Result result={method.result} />
        <Examples examples={method.examples} method={method} />
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Content;
