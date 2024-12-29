import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components"
import { SchemaHierarchyComponent } from "../../contexts"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

// Translated label
function PrefixItemsLabel({ count }: { count: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.prefixItemsEntry",
          count: count,
        }}
      >
        {"items[{count}]"}
      </Translate>
    </code>
  )
}

export default function CreatePrefixItems(props: Props): JSX.Element {
  const { schema } = props

  let items = schema.prefixItems

  // If undefined, print nothing
  if (items === undefined) {
    return <></>
  }

  let isArray = Array.isArray(items)
  let minimal = Array.isArray(items) ? items.length : 1
  let array = (Array.isArray(items) ? items : [items]) as JSONSchema[]

  // prefixItems is an array in any case
  return (
    <ul>
      {array.map((val, idx) => {
        return (
          <SchemaHierarchyComponent
            key={`schema_hierarchy_${idx}`}
            innerJsonPointer={`/prefixItems${isArray ? `/${idx}` : ""}`}
          >
            <CreateEdge
              key={`array_prefixItems_${idx}`}
              name={<PrefixItemsLabel count={idx} />}
              schema={val}
              required={
                schema.minItems !== undefined && schema.minItems >= minimal
              }
            />
          </SchemaHierarchyComponent>
        )
      })}
    </ul>
  )
}
