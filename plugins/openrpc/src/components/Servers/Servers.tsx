import React, { Component } from "react";
import { ServerObject } from "@open-rpc/meta-schema";
import ExpansionTable from "../ExpansionTable/ExpansionTable";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

interface IProps {
  servers?: ServerObject[];
  uiSchema?: any;
  components?: {
    CodeBlock: React.FC<{children: string, className?: string}>;
  }
  noTitle?: boolean;
}

class Servers extends Component<IProps> {
  public render() {
    const { servers, noTitle, components, uiSchema } = this.props;
    if (!servers || servers.length === 0) {
      return null;
    }
    return (
      <>
        {noTitle ? null : <h2>Servers</h2>}
        <ExpansionTable headers={["Name", "Url", "Summary"]}>
          <tr>
            <td colSpan={6}>
              {servers.map((server, i) => (
                <div style={{ width: "100%" }} key={i}>
                  <details open={uiSchema && uiSchema.servers["ui:defaultExpanded"]}>
                    <summary style={{ justifyContent: "space-between" }}>
                      <span>{server.name}</span>
                      <span>{server.url}</span>
                      <span>{server.summary}</span>
                    </summary>
                    <div style={{ display: "block" }}>
                      {server.description &&
                        <MarkdownDescription
                          uiSchema={uiSchema}
                          source={server.description}
                        />
                      }
                      {server.variables && <>
                        <h6>Variables</h6>
                        <br />
                      </>
                      }
                      {server.variables && components && components.CodeBlock && <components.CodeBlock className="language-json">{JSON.stringify(server.variables, null, " ")}</components.CodeBlock>}
                      {server.variables && !components?.CodeBlock &&
                        <pre>
                          <code>
                            {JSON.stringify(server.variables, null, " ")}
                          </code>
                        </pre>
                      }
                    </div>
                  </details>
                </div>
              ))}
            </td>
          </tr>
        </ExpansionTable>
      </>
    );
  }
}

export default Servers;
