import React from "react"

import { QualifierMessages } from "../utils"

import { useJSVOptionsContext } from "../contexts"

import { TypeLabel, NumberLabel } from "../labels"

import { CreateDescription } from "../JSONSchemaElements"

import type { JSONSchemaNS } from "../types"

type Props = {
  [x: string]: any
  nullable?: boolean
  description?: string
  schema: JSONSchemaNS.Number
}

export default function CreateNumber(props: Props): JSX.Element {
  const { schema, description, nullable } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <NumberLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages
          schema={schema}
          options={options}
          nullable={nullable}
        />
      </div>
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
