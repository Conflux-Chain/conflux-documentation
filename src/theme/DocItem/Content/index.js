import React from "react";
import Content from "@theme-original/DocItem/Content";
import CopyPageButton from "@site/src/components/CopyPageButton";

export default function ContentWrapper(props) {
  return (
    <>
      <CopyPageButton />
      <Content {...props} />
    </>
  );
}
