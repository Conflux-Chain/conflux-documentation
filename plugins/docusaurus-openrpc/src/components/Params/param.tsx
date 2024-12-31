import React from "react";
import { ContentDescriptorOrReference } from "@open-rpc/meta-schema";
import JSONSchemaViewer from "../JSONSchemaViewer";
interface Props {
  param: ContentDescriptorOrReference;
}

export function Param({ param }: Props) {
  if ("$ref" in param) return null;
  const { name, required, schema } = param;
  return (
    <section>
      <h3>
        <span>{name} </span>
        <span className={`badge badge--${required ? "primary" : "secondary"}`}>
          {required ? "required" : "optional"}
        </span>
      </h3>

    {typeof schema === "object" && (
        <JSONSchemaViewer schema={schema} />
    )}
    </section>
  );
}
