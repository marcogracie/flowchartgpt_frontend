import React from 'react';
import Mermaid from 'react-mermaid2';

const MermaidComponent = ({ chart }) => {
  return (
    <div>
      <Mermaid chart={chart} />
    </div>
  );
};

export default MermaidComponent;