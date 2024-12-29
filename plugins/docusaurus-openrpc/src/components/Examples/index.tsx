import React, { useCallback } from "react";
import {
  ContentDescriptorObject,
  ExamplePairingObjectParams,
  MethodObject,
  MethodObjectName,
} from "@open-rpc/meta-schema";
import Tabs from "@theme-original/Tabs";
import TabItem from "@theme-original/TabItem";
import CodeBlock from "@theme-original/CodeBlock";
import "./index.css";
interface Props {
  examples: MethodObject["examples"];
  method: MethodObject;
}

function Examples({ examples, method }: Props) {
  if (typeof examples === "undefined" || examples.length === 0) return null;
  const formatParams = useCallback(
    (params: ExamplePairingObjectParams) => {
      if (method.paramStructure === "by-name") {
        return params.reduce((acc, param) => {
          if ("$ref" in param) return acc;
          acc[param.name] = param.value;
          return acc;
        }, {} as Record<MethodObjectName, string>);
      }
      return params
        .map((param) => {
          if ("$ref" in param) return null;
          return param.value;
        })
        .filter(Boolean);
    },
    [method.paramStructure]
  );
  return (
    <div>
      <h2>{examples.length > 1 ? "Examples" : "Example"}</h2>

      <Tabs>
        {examples.map((example, key) => {
          if ("$ref" in example) return null;
          return (
            <TabItem
              key={key}
              value={key}
              label={<span className="text--normal">{example.name}</span>}
            >
              <div className="card example_card">
                <div className="card__header">
                  <h3>Request</h3>
                </div>
                <div className="card__body">
                  <CodeBlock language="js">{`curl -X POST --data \\
'${JSON.stringify(
                    {
                      jsonrpc: "2.0",
                      id: 1,
                      method: method.name,
                      params: formatParams(example.params),
                    },
                    null,
                    4
                  )}' \\
-H "Content-Type: application/json" \\
localhost:12539`}</CodeBlock>
                </div>
              </div>

              <div className="card example_card">
                <div className="card__header">
                  <h3>Response</h3>
                </div>
                <div className="card__body">
                  <CodeBlock language="js">
                    {example.result &&
                      !("$ref" in example.result) &&
                      JSON.stringify(example.result.value, null, 2)}
                  </CodeBlock>
                </div>
              </div>
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

export default Examples;
