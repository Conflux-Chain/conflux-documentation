import React, { Component } from "react";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import { ContentDescriptorObject } from "@open-rpc/meta-schema";
import ExpansionTable from "../ExpansionTable/ExpansionTable";

interface IProps {
  params?: ContentDescriptorObject[];
  disableTransitionProps?: boolean;
  uiSchema?: any;
}

class Params extends Component<IProps> {
  public render() {
    const { params, uiSchema } = this.props;
    if (!params || params.length === 0) {
      return null;
    }
    return (
      params.map((row, i) =>
        <section>
          <h3>
            {i + 1}. {row.name}
            {
              (
                row.required === undefined ||
                row.required === true
              ) &&
              <span className="content-descriptor-summary">
                <i><small> (required)</small></i>
              </span>
            }
          </h3>
          <ContentDescriptor
            key={row.name}
            contentDescriptor={row}
            uiSchema={uiSchema}
          />
        </section>
      )
    );
  }
}

export default Params;
