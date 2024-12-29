import React from "react"

import {
  AllOfSchema,
  AnyOfSchema,
  NotSchema,
  OneOfSchema,
} from "../../JSONSchemaElements/schemaComposition"

import type { JSONSchema } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

// To handle Schema Composition (anyOf, oneOf, not, allOf)
export default function SchemaComposition(props: Props): JSX.Element {
  const { schema } = props

  return (
    <>
      {schema.oneOf !== undefined && <OneOfSchema schema={schema} />}
      {schema.anyOf !== undefined && <AnyOfSchema schema={schema} />}
      {schema.allOf !== undefined && <AllOfSchema schema={schema} />}
      {schema.not !== undefined && <NotSchema schema={schema} />}
    </>
  )
}
