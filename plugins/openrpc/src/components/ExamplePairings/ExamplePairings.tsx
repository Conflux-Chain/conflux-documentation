import ExamplePairing from "../ExamplePairing/ExamplePairing";
import {
  MethodObject,
  ExamplePairingObject,
  ContentDescriptorObject,
  MethodObjectParamStructure,
  MethodObjectExamples,
} from "@open-rpc/meta-schema";
import React, { Component, useEffect } from "react";
interface IProps {
  method?: MethodObject;
  examples?: ExamplePairingObject[];
  components?: {
    CodeBlock: React.FC<{ children: string; className?: string }>;
  };
  onExamplePairingChange?: (
    examplePairing: ExamplePairingObject | undefined
  ) => void;
  uiSchema?: any;
  reactJsonOptions?: any;
}

const ExamplePairings = ({
  method,
  examples,
  uiSchema,
  reactJsonOptions,
  onExamplePairingChange,
  components,
}: IProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const paramStructure =
    (method && (method.paramStructure as MethodObjectParamStructure)) ||
    "either";

  const optionElements = examples?.map((example, i) => (
    <option data-testid="example-pairing-option" key={i} value={i}>
      {example.name}
    </option>
  ));

  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const index = parseInt(event.target.value);
    setSelectedIndex(index);
    if (onExamplePairingChange && examples) {
      onExamplePairingChange(examples[index]);
    }
  }

  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div id='interactive-box'>
      {examples && examples.length > 1 && (
        <select
          data-testid="example-pairing-select"
          value={selectedIndex}
          className="form-control"
          onChange={handleOptionChange}
        >
          {optionElements}
        </select>
      )}
      {examples && (
        <ExamplePairing
          uiSchema={uiSchema}
          components={components}
          paramStructure={paramStructure}
          examplePairing={examples[selectedIndex] as ExamplePairingObject}
          methodName={method && (method.name as any)}
          reactJsonOptions={reactJsonOptions}
        />
      )}
    </div>
  );
};

export default ExamplePairings;
