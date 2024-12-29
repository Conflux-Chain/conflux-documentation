import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components"
import { SchemaHierarchyComponent } from "../../contexts"

import type { JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

export default function CreateContains(props: Props): JSX.Element {
  const { schema } = props

  let item = schema.contains

  if (item === undefined) {
    return <></>
  }

  const containsLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.containsEntry",
        }}
      >
        {"items[..., x, ...]"}
      </Translate>
    </code>
  )

  return (
    <ul>
      <SchemaHierarchyComponent innerJsonPointer="/contains">
        <CreateEdge
          key={"contains"}
          name={containsLabel}
          schema={item}
          required={schema.minContains !== undefined && schema.minContains > 0}
        />
      </SchemaHierarchyComponent>
    </ul>
  )
}
