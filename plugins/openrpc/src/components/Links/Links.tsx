import React, { Component } from "react";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";
import { LinkObject } from "@open-rpc/meta-schema";
import ExpansionTable from "../ExpansionTable/ExpansionTable";
import Servers from "../Servers/Servers";

interface IProps {
  links?: LinkObject[];
  uiSchema?: any;
  components?: {
    CodeBlock: React.FC<{children: string, className?: string}>;
  };
}

class Links extends Component<IProps> {
  public render() {
    const { links, uiSchema, components } = this.props;
    if (!links || links.length === 0) { return null; }
    return (
      <ExpansionTable headers={["Method", "Summary"]}>
        <tr>
          <td colSpan={6}>
            {links.map((link, i) => (
              <div style={{ width: "100%" }} key={i}>
                <details
                  style={{ width: "100%" }} open={uiSchema && uiSchema.links["ui:defaultExpanded"]} key={i}>
                  <summary
                    style={{ justifyContent: "space-between" }}
                    key="links-header"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
                      <h6 className="link-method">{link.method}</h6>
                      <span className="link-summary">{link.summary}</span>
                    </div>
                  </summary>
                  <section style={{ display: "block" }} key="links-body">
                    {link.description && <MarkdownDescription uiSchema={uiSchema} source={link.description} /> }
                    {link.params && <h6>Params</h6>}
                    {link.params && components && components.CodeBlock && <components.CodeBlock className="language-json">{JSON.stringify(link.params, null, " ")}</components.CodeBlock>}
                    {link.params && !components?.CodeBlock &&
                      <pre>
                        <code>
                          {JSON.stringify(link.params, null, " ")}
                        </code>
                      </pre>
                    }
                    {link.server && <h6 className="link-server">Server</h6>}
                    {link.server && <Servers servers={[link.server]} noTitle={true} components={components} />}
                  </section>
                </details>
              </div>
            ))}
          </td>
        </tr>
      </ExpansionTable>
    );
  }
}

export default Links;
