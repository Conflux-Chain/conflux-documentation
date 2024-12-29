import {
  ContentDescriptorObject,
  JSONSchema,
  MethodObject,
  MethodObjectParams,
  Servers,
} from "@open-rpc/meta-schema";
import React from "react";
import Params from "../Params";
import Examples from "../Examples";
import "./index.css";
import { Result } from "../Result";
import Playground from "../Playground";

import "bootstrap/dist/css/bootstrap.min.css";
interface Props {
  method: MethodObject;
  servers: { name: string; url: string }[];
}

const Content = ({ method, servers }: Props) => {
  return (
    <div>
      <p>{method.summary}</p>
      <Playground
        method={method}
        servers={servers.filter((serve) => serve.url.startsWith("http"))}
      />
      <Params params={method.params} />
      <Result result={method.result} />
      <Examples examples={method.examples} method={method} />
    </div>
  );
};

export default Content;
