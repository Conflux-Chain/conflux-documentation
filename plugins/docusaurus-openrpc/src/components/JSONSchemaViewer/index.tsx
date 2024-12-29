import React, { useState, useEffect } from "react";

import { CreateNodes, Collapsible } from "./components";
import {
  JSVOptionsContextProvider,
  SchemaHierarchyContextProvider,
} from "./contexts";

import type { JSONSchema } from "./types";
import type { JSVOptions } from "./contexts";
import { LoadingLabel, ErrorOccurredLabel } from "./labels";

export type Props = {
  /**
   * The JSON schema to use
   */
  schema: unknown;
  /**
   * To customize the ref resolving
   * By default, only inline references will be dereferenced by @stoplight/json-ref-resolver
   */
  /**
   * To customize the viewer itself
   */
  viewerOptions?: Omit<JSVOptions, "fullSchema">;
  /**
   * To customize the styles of the viewer, to override docusaurus styles on a specific page
   */
  className?: string;
};

type InnerViewerProperties = {
  // Thanks to @stoplight/json-ref-resolver, $ref are either :
  // 1. resolved
  // 2. unresolved (as circular stuff are not on the roadmap)
  schema: JSONSchema;
  // Options for viewer
  viewerOptions?: Omit<JSVOptions, "fullSchema">;
  // To customize the styles of the viewer, to override docusaurus styles on a specific page
  className?: string;
};

// Translated labels

function ErrorOccurred(props: { error: Error }): JSX.Element {
  const { error } = props;
  return (
    <div>
      <ErrorOccurredLabel error={error} />
    </div>
  );
}

// Internal
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  const { schema, viewerOptions } = props;
  // Title of the schema, for user friendliness
  const title =
    typeof schema !== "boolean" && schema.title !== undefined
      ? schema.title
      : "Schema";

  // state for provider
  const startingState: JSVOptions = {
    fullSchema: schema,
    // spread provided attributes
    ...viewerOptions,
  };

  return (
    <SchemaHierarchyContextProvider
      value={{
        jsonPointer: "",
        level: 0,
      }}
    >
      <JSVOptionsContextProvider value={startingState}>
        <Collapsible
          summary={<strong>{title}</strong>}
          detailsProps={{
            open: true,
            className: props.className || "json-schema-viewer",
          }}
        >
          <CreateNodes schema={schema} />
        </Collapsible>
      </JSVOptionsContextProvider>
    </SchemaHierarchyContextProvider>
  );
}

// Entry point
export default function JSONSchemaViewer(props: Props): JSX.Element {
  const { schema, viewerOptions } = props;

  return (
    <JSONSchemaInnerViewer
      //@ts-ignore
      schema={schema}
      viewerOptions={viewerOptions}
      className={props.className}
    />
  );
}
