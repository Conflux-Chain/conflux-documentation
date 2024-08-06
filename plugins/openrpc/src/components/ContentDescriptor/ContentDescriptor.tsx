import React, { Component } from 'react';
import { ContentDescriptorObject } from '@open-rpc/meta-schema';
import './ContentDescriptor.css';
import MarkdownDescription from '../MarkdownDescription/MarkdownDescription';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';

interface IProps {
  contentDescriptor?: ContentDescriptorObject;
  hideRequired?: boolean;
  uiSchema?: any;
}

class ContentDescriptor extends Component<IProps> {
  public render() {
    const { contentDescriptor, hideRequired, uiSchema } = this.props;
    if (!contentDescriptor) {
      return null;
    }
    const entries = Object.entries(contentDescriptor);
    if (entries.length === 0) {
      return null;
    }
    return (
      <div style={{ paddingLeft: 'var(--ifm-list-left-padding)' }}>
        {contentDescriptor.description && (
          <MarkdownDescription
            uiSchema={uiSchema}
            source={contentDescriptor.description}
            className="content-descriptor-description"
          />
        )}
        {contentDescriptor.schema && (
          <div className="stoplight">
            <JsonSchemaViewer schema={contentDescriptor.schema} />
          </div>
        )}
      </div>
    );
  }
}
export default ContentDescriptor;
