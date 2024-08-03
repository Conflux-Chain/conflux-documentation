import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";

interface IProps {
  className?: string;
  source?: string;
  uiSchema: any;
}

const MarkdownDescription: React.FC<IProps> = ({ source, className, uiSchema }) => {
  return (
    <ReactMarkdown
      children={source || ""}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={uiSchema && uiSchema.appBar && uiSchema.appBar["ui:darkMode"] ? materialDark : materialLight}
              language={match[1]}
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}
    />
  );
};

export default MarkdownDescription;
