import React from "react";
import DocSidebar from "@theme/DocSidebar";
import CodeBlock from "@theme/CodeBlock";

import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import Layout from "@theme/Layout";
import {
  ExamplePairingObject,
  MethodObject,
  ContentDescriptorObject,
} from "@open-rpc/meta-schema";
import InteractiveMethod from "../../components/InteractiveMethod/InteractiveMethod";
import Method from "../../components/Method/Method";
import { join } from "path";
import "./index.css";
import "../../components/index.css";

const getExamplesFromMethod = (
  method?: MethodObject
): ExamplePairingObject[] => {
  if (!method) {
    return [];
  }
  if (!method.params) {
    return [];
  }
  const examples: ExamplePairingObject[] = [];

  (method.params as ContentDescriptorObject[]).forEach(
    (param, index: number) => {
      if (
        param.schema &&
        typeof param.schema === "object" &&
        "examples" in param.schema
      ) {
        param.schema.examples.forEach((ex: any, i: number) => {
          const example = examples[i];
          if (example === undefined) {
            examples.push({
              name: "generated-example",
              params: [
                {
                  name: param.name,
                  value: ex,
                },
              ],
              result: {
                name: "example-result",
                value: null,
              },
            });
          } else {
            example.params.push({
              name: param.name,
              value: ex,
            });
          }
        });
      }
    }
  );
  const methodResult = method.result as ContentDescriptorObject;

  if (
    methodResult &&
    typeof methodResult.schema === "object" &&
    "examples" in methodResult.schema
  ) {
    methodResult.schema.examples.forEach((ex: any, i: number) => {
      const example = examples[i];
      if (example === undefined) {
        examples.push({
          name: "generated-example",
          params: [],
          result: {
            name: methodResult.name,
            value: ex,
          },
        });
      } else {
        example.result = {
          name: methodResult.name,
          value: ex,
        };
      }
    });
  }
  return examples;
};

export default function OpenRPCDocMethod(props: any) {
  const { versionMetadata } = props;
  let sidebar: PropSidebarItem[] = [
    // {
    //   type: "link" as const,
    //   label: props.propsFile.openrpcDocument.info.title || "JSON-RPC",
    //   href: props.propsFile.path,
    // },
  ].concat(
    props.propsFile.openrpcDocument.methods.map((method: MethodObject) => {
      return {
        type: "link",
        label: method.name,
        href: join(props.propsFile.path, method.name.toLowerCase()),
      };
    })
  );

  if (versionMetadata) {
    sidebar = Object.values(
      versionMetadata.docsSidebars
    )[0] as PropSidebarItem[];
  }

  const method = props.propsFile.openrpcDocument.methods.find(
    (m: MethodObject) => {
      const parts = props.route.path.split("/");

      let name = parts[parts.length - 1];

      // deal with trailingSlash: true
      if (name === "") {
        name = parts[parts.length - 2];
      }

      return m.name.toLowerCase() === name.toLowerCase();
    }
  );

  method.examples = method.examples || getExamplesFromMethod(method);
  const [selectedExamplePairing, setSelectedExamplePairing] = React.useState<
    ExamplePairingObject | undefined
  >(method.examples[0]);
  return (
    <Layout>
      <div
        style={{ display: "flex", width: "100%", flex: "1 0" }}
        className="docusaurus-openrpc"
      >
        <aside
          style={{
            display: "block",
            width: "var(--doc-sidebar-width)",
            marginTop: "calc(-1 * var(--ifm-navbar-height))",
            borderRight: "1px solid var(--ifm-toc-border-color)",
            willChange: "width",
            transition: "width var(--ifm-transition-fast) ease",
            clipPath: "inset(0)",
          }}
          className="theme-doc-sidebar-container"
        >
          <div
            style={{
              top: 0,
              position: "sticky",
              height: "100%",
              maxHeight: "100vh",
            }}
          >
            <DocSidebar
              path={props.route.path}
              sidebar={sidebar}
              onCollapse={() => {}}
              isHidden={false}
            />
          </div>
        </aside>

        <main className="docMainContainer" style={{ width: "100%" }}>
          <div className="container padding-top--md padding-bottom--lg">
            <div className="row">
              <div className="col col--7">
                {!method && <div>Index</div>}
                <article>
                  {method && (
                    <Method
                      method={method}
                      components={{ CodeBlock }}
                      onExamplePairingChange={(
                        examplePairing: ExamplePairingObject | undefined
                      ) => setSelectedExamplePairing(examplePairing)}
                    />
                  )}
                </article>
              </div>

              <div
                id="interactive-box"
                className="col col--5 interactive-right-sidebar table-of-contents__left-border thin-scrollbar"
              >
                {method && (
                  <InteractiveMethod
                    method={method}
                    components={{ CodeBlock }}
                    defaultEndpoint={props.propsFile.defaultEndpoint}
                    selectedExamplePairing={
                      selectedExamplePairing as ExamplePairingObject
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
