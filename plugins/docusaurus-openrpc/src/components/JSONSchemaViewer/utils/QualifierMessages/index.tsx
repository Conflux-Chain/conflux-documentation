import React from "react"

import CodeBlock from "@theme-original/CodeBlock"

// To print all JSONS / value / string
export function printSchemaType(obj: unknown): JSX.Element {
  // deal with simple types first
  if (["string", "number", "bigint", "boolean"].includes(typeof obj)) {
    return <code>{(obj as string | number | bigint | boolean).toString()}</code>
  }

  // if it is a object / array, it is likely to be complex so time for my ace card
  return <CodeBlock language="json">{`${JSON.stringify(obj)}`}</CodeBlock>
}

// Inner functions
export { default as EnumQM } from "../../utils/QualifierMessages/Enum"
export { default as StringLengthQM } from "../../utils/QualifierMessages/StringLength"
export { default as ObjectPropertiesQM } from "../../utils/QualifierMessages/ObjectProperties"
export { default as NoExtraPropertiesQM } from "../../utils/QualifierMessages/NoExtraProperties"
export { default as ArrayNumberOfItemsQM } from "../../utils/QualifierMessages/ArrayNumberOfItems"
export { default as ArrayContainsNumberQM } from "../../utils/QualifierMessages/ArrayContainsNumber"
export { default as NoExtraItemsQM } from "../../utils/QualifierMessages/NoExtraItems"
export { default as NumberBoundsQM } from "../../utils/QualifierMessages/NumberBounds"
export { default as PatternQM } from "../../utils/QualifierMessages/Pattern"
export { default as MultipleOfQM } from "../../utils/QualifierMessages/NumberMultipleOf"
export { default as ArrayUniqueItemsQM } from "../../utils/QualifierMessages/ArrayUniqueItems"
export { default as DefaultValueQM } from "../../utils/QualifierMessages/DefaultValue"
export { default as ConstantQM } from "../../utils/QualifierMessages/Constant"
export { default as ExamplesQM } from "../../utils/QualifierMessages/Examples"
export { default as DeprecatedQM } from "../../utils/QualifierMessages/Deprecated"
export { default as ReadOnlyQM } from "../../utils/QualifierMessages/ReadOnly"
export { default as WriteOnlyQM } from "../../utils/QualifierMessages/WriteOnly"
export { default as NullableQM } from "../../utils/QualifierMessages/Nullable"
export { default as ContentMediaTypeQM } from "../../utils/QualifierMessages/ContentMediaType"
export { default as ContentEncodingQM } from "../../utils/QualifierMessages/ContentEncoding"
export { default as ContentSchemaQM } from "../../utils/QualifierMessages/ContentSchema"
export { default as UnsolvedRefsQM } from "../../utils/QualifierMessages/UnsolvedRefs"
export {
  CHECKS_MAP as QUALIFIERS_MAP,
  DEFAULT_ORDER as QUALIFIERS_DEFAULT_ORDER,
} from "../../utils/QualifierMessages/QualifierMessagesMap"

export type { CheckKey } from "../../utils/QualifierMessages/QualifierMessagesMap"
