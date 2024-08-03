import React, { Component } from "react";

interface IProps {
  headers?: string[];
  children: any;
}

class ExpansionTable extends Component<IProps> {
  public render() {
    const { headers, children } = this.props;
    if (!headers || headers.length === 0) { return null; }
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => {
              return (
                <th
                  scope="col"
                  key={i}
                  style={{textAlign: i === 0 ? undefined : "right"}}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    );
  }
}

export default ExpansionTable;
