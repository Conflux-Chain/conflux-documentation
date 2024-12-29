import React from "react"

import type { JSONSchema } from "../types"
import { useJSVOptionsContext } from "../contexts"
import { printSchemaType } from "../utils/QualifierMessages"

type Props = {
  value: unknown
  schema: JSONSchema
}

export default function CreateValue(props: Props): JSX.Element {
  const { value, schema } = props
  const { ValueComponent } = useJSVOptionsContext()

  if (ValueComponent) {
    return <ValueComponent value={value} schema={schema} />
  }

  return printSchemaType(value)
}
