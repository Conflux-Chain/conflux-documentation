import React from "react";
import { MethodObject } from "@open-rpc/meta-schema";
import { Param } from "./param";

interface Props {
  params: MethodObject["params"];
}

function Params({ params }: Props) {
  if (params.length === 0) return null;

  return (
    <div>
      <div>
        <h2>Params </h2>
        <div>
          {params.map((param, key) => (
            <Param param={param} key={key}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Params;
