import React from 'react';
import Mermaid from 'react-mermaid2';

const MermaidComponent = ({ chart }) => {
  return (
    <div sx={{ width: '100%', height: '100%', overflow: 'auto'}}>
      <Mermaid chart={chart} />
    </div>
  );
};

export default MermaidComponent;
