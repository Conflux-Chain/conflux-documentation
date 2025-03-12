import React, { useEffect, useState } from "react";
import Codes from "./codes";
import Tabs from "@theme-original/Tabs";
import TabItem from "@theme-original/TabItem";
import CodeBlock from "@theme-original/CodeBlock";
import {
  ExamplePairingOrReference,
  JSONSchema,
  MethodObject,
  MethodObjectParams,
} from "@open-rpc/meta-schema";
import Form from "../Theme";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { Button, Card, Input } from "antd";
interface Props {
  servers: { name: string; url: string }[];
  method: MethodObject;
}

const convertOpenApiSchemaToJsonSchema = (schema: any): any => {
  if (!schema) return schema;

  let convertedSchema = { ...schema };

  if (convertedSchema.nullable === true) {
    if (convertedSchema.type) {
      convertedSchema.type = Array.isArray(convertedSchema.type)
        ? [...convertedSchema.type, "null"]
        : [convertedSchema.type, "null"];
    }

    delete convertedSchema.nullable;
  }

  if (convertedSchema.properties) {
    const newProperties: Record<string, any> = {};
    Object.keys(convertedSchema.properties).forEach((key) => {
      newProperties[key] = convertOpenApiSchemaToJsonSchema(
        convertedSchema.properties[key]
      );
    });
    convertedSchema.properties = newProperties;
  }

  if (convertedSchema.items) {
    convertedSchema.items = convertOpenApiSchemaToJsonSchema(
      convertedSchema.items
    );
  }

  return convertedSchema;
};

const createJsonSchema = (params: MethodObjectParams): RJSFSchema => {
  const properties: Record<string, JSONSchema> = {};
  const required: string[] = [];

  params.forEach((element) => {
    if ("$ref" in element) {
      return;
    }

    // 转换 schema
    properties[element.name] = convertOpenApiSchemaToJsonSchema(element.schema);
    if (element.required) {
      required.push(element.name);
    }
  });

  return {
    type: "object" as const,
    properties: properties,
    required: required,
  };
};

const uiSchema: UiSchema = {
  "ui:description": "",
  "ui:submitButtonOptions": {
    norender: true,
  },
};

const formatPlaygroundParams = (
  params: MethodObjectParams,
  formatData: Record<string, string>
) => {
  if (`$ref` in params) return [];

  return params
    .map((element) => {
      if ("$ref" in element) {
        return null;
      }

      return formatData[element.name];
    })
    .filter((v) => v !== null);
};

const getDefaultValue = (example?: ExamplePairingOrReference) => {
  if (!example || `$ref` in example) return {};

  return example.params
    .map((param) => {
      if ("$ref" in param) return null;
      return param;
    })
    .filter((v) => v !== null)
    .reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {} as Record<string, string>);
};

const Playground = ({ servers, method }: Props) => {
  const [url, setUrl] = useState(servers[0]?.url || "");
  const [formData, setFormData] = useState(
    getDefaultValue(method.examples?.[0])
  );

  const [res, setRes] = useState<Record<string, any> | null>(null);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {servers.map((server, index) => {
          return (
            <Button onClick={() => setUrl(server.url)} key={index}>
              {server.name}
            </Button>
          );
        })}
      </div>
      <Input
        style={{ marginBottom: 10 }}
        value={url}
        onChange={(v) => setUrl(v.target.value)}
      />
      {method.params && (
        <Card>
          <Form
            liveValidate
            uiSchema={uiSchema}
            schema={createJsonSchema(method.params)}
            validator={validator}
            formData={formData}
            onChange={(v) => setFormData(v.formData)}
            showErrorList={false}
          />
        </Card>
      )}

      <Tabs>
        {Codes.map((code, index) => {
          return (
            <TabItem key={index} value={code.name} label={code.name}>
              <div>
                <CodeBlock language={code.language} showLineNumbers>
                  {code.getCode(
                    url,
                    method.name,
                    formatPlaygroundParams(method.params, formData)
                  )}
                </CodeBlock>

                {code.run && (
                  <button
                    className="button button--primary"
                    onClick={() => {
                      if (code.run) {
                        code
                          .run(
                            url,
                            method.name,
                            formatPlaygroundParams(method.params, formData)
                          )
                          .then((res) => setRes(res));
                      }
                    }}
                  >
                    Send Request
                  </button>
                )}

                <div style={{ marginTop: "10px" }}>
                  {res && (
                    <CodeBlock language="javascript">
                      {JSON.stringify(res, null, 2)}
                    </CodeBlock>
                  )}
                </div>
              </div>
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Playground;
