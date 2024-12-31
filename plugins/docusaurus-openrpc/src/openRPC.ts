import { MethodObject, Servers } from "@open-rpc/meta-schema";
import { render } from "mustache";
export type GenerateMarkdownDocParameters = {
  sidebar_label: string;
  method: MethodObject;
  servers: { name: string; url: string }[];
};
export function generateMarkdownDoc({
  method,
  sidebar_label,
  servers,
}: GenerateMarkdownDocParameters) {
  const { name, summary, description } = method;
  const template = `---
title: {{name}}
{{#description}}
description: {{description}}
{{/description}}
sidebar_label: {{sidebar_label}}
---
import Content from '@theme/Content';

<Content method={ {{{method}}} } servers={ {{{servers}}} }/>

    `;

  return render(template, {
    method: JSON.stringify(method),
    name,
    summary,
    description,
    sidebar_label,
    servers: JSON.stringify(servers),
  });
}
