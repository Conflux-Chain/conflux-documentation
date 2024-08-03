import {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorObject,
  ErrorObject,
  ExamplePairingObject,
  LinkObject,
} from "@open-rpc/meta-schema";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";
import React from "react";
import Links from "../Links/Links";
import Tags from "../Tags/Tags";
import Params from "../Params/Params";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import ExamplePairings from "../ExamplePairings/ExamplePairings";
import Errors from "../Errors/Errors";
import isEmpty from "lodash-es/isEmpty";

const defaultJsonViewOptions = {
  theme: "summerfruit:inverted",
  collapseStringsAfterLength: 25,
  displayDataTypes: false,
  displayObjectSize: false,
  indentWidth: 2,
  name: false,
};

export interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}

interface IProps {
  method?: MethodObject;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  components?: {
    CodeBlock: React.FC<{ children: string; className?: string }>;
  };
  onExamplePairingChange?: (
    examplePairing: ExamplePairingObject | undefined
  ) => void;
  reactJsonOptions?: object;
  uiSchema?: any;
  key?: string;
}

const Method = ({
  method,
  uiSchema,
  key,
  methodPlugins,
  reactJsonOptions,
  onExamplePairingChange,
  components,
}: IProps) => {
  reactJsonOptions = { ...defaultJsonViewOptions, ...reactJsonOptions };
  if (!method) {
    return null;
  }
  if (isEmpty(method)) {
    return null;
  }
  const links = method.links as LinkObject[];
  return (
    <div id={method.name} key={key} className="method margin-bottom--sm">
      <h1
        key={method.name}
        className="method-name"
        style={{ marginRight: "3px" }}
      >
        {method.name}
      </h1>

      {method.tags && method.tags.length > 0 && (
        <section key="tags">
          <Tags tags={method.tags as any} />
        </section>
      )}

      {method.description ? (
        <section key="description">
          <MarkdownDescription
            uiSchema={uiSchema}
            source={method.description}
            className="method-description"
          />
        </section>
      ) : method.summary ? (
        <p key={method.summary} className="method-summary">
          {method.summary}
        </p>
      ) : null}
      <section key="params">
        <div style={{ marginBottom: "var(--ifm-heading-margin-bottom)" }}>
          <h2 style={{ display: "inline", marginRight: "3px" }}>Params</h2>
          <span>({method.params?.length || 0})</span>
        </div>

        {method.params && method.params.length > 0 && (
          <Params
            params={method.params as ContentDescriptorObject[]}
            uiSchema={uiSchema}
          />
        )}
      </section>

      {method.result && (
        <section key="result-title">
          <div style={{ marginBottom: "var(--ifm-heading-margin-bottom)" }}>
            <h2 style={{ display: "inline", marginRight: "3px" }}>Result</h2>
            <span>
              <i>({(method.result as ContentDescriptorObject).name})</i>
            </span>
          </div>

          <ContentDescriptor
            contentDescriptor={method.result as ContentDescriptorObject}
            hideRequired={true}
            uiSchema={uiSchema}
          />
        </section>
      )}
      {method.errors && method.errors.length > 0 && (
        <section key="errors">
          <h2>Errors</h2>
          <Errors
            errors={method.errors as ErrorObject[]}
            reactJsonOptions={reactJsonOptions}
          />
        </section>
      )}

      {method.examples && method.examples.length > 0 && (
        <section key="examples">
          <div style={{ marginBottom: "var(--ifm-heading-margin-bottom)" }}>
            <h2 style={{ marginRight: "3px" }}>
              {(method.examples as ExamplePairingObject[]).length > 1
                ? "Examples"
                : "Example"}
            </h2>
          </div>
          <ExamplePairings
            uiSchema={uiSchema}
            components={components}
            examples={method.examples as ExamplePairingObject[]}
            onExamplePairingChange={onExamplePairingChange}
            method={method}
            reactJsonOptions={reactJsonOptions}
          />
        </section>
      )}

      {links && links.length > 0 && (
        <section key="links-title">
          <h2>Links</h2>
          <section key="links">
            <Links links={links} components={components} />
          </section>
        </section>
      )}
      {methodPlugins && methodPlugins.length > 0 && (
        <section key="method-plugins">
          {methodPlugins.map((CompDef: any) => {
            return <CompDef openrpcMethodObject={method} />;
          })}
        </section>
      )}
    </div>
  );
};

export default Method;
