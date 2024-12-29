import React from "react";
import { MethodObjectResult } from "@open-rpc/meta-schema";
import JSONSchemaViewer from "../JSONSchemaViewer";

interface Props {
  result?: MethodObjectResult;
}

export function Result({ result }: Props) {
  if (!result) return null;
  if ("$ref" in result) return null;

  return (
    <div>
      <h2>Result</h2>
      <JSONSchemaViewer schema={result.schema} />
    </div>
  );
}
