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
export default function CreateProperties(props: Props): JSX.Element {
  const { schema } = props

  const properties = schema.properties

  // If it doesn't exist, print nothing
  if (properties === undefined) {
    return <></>
  }

  return (
    <ul>
      {Object.entries(properties).map(([key, value]) => {
        return (
          <SchemaHierarchyComponent
            key={`object_properties_${key}`}
            innerJsonPointer={`/properties/${encodeStringForJSONPointer(key)}`}
          >
            <CreateEdge
              name={<strong>{key}</strong>}
              schema={value}
              required={
                Array.isArray(schema.required)
                  ? schema.required.includes(key)
                  : false
              }
            />
          </SchemaHierarchyComponent>
        )
      })}
    </ul>
  )
}
