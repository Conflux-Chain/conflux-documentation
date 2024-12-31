import React from "react"

import { CreateEdge } from "../../components"
import { SchemaHierarchyComponent } from "../../contexts"
import { encodeStringForJSONPointer } from "../../utils"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreatePatternProperties(props: Props): JSX.Element {
  const { schema } = props

  const patternProperties = schema.patternProperties

  // If it doesn't exist, print nothing
  if (patternProperties === undefined) {
    return <></>
  }

  return (
    <ul>
      {Object.entries(patternProperties).map(([key, value]) => (
        <SchemaHierarchyComponent
          key={`object_patternProperties_${key}`}
          innerJsonPointer={`/patternProperties/${encodeStringForJSONPointer(
            key,
          )}`}
        >
          <CreateEdge
            name={<code>{key}</code>}
            schema={value}
            required={false}
          />
        </SchemaHierarchyComponent>
      ))}
    </ul>
  )
}
