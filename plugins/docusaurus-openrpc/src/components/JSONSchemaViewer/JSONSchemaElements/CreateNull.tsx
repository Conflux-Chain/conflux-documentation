import React from "react"

import { QualifierMessages } from "../utils"

import { useJSVOptionsContext } from "../contexts"

import { TypeLabel, NullLabel } from "../labels"

import { CreateDescription } from "../JSONSchemaElements"

import type { JSONSchemaNS } from "../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Null
  description?: string
}

export default function CreateNull(props: Props): JSX.Element {
  const { schema, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <NullLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} options={options} />
      </div>
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
