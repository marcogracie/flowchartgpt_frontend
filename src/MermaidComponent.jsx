import React from 'react';
import Mermaid from 'react-mermaid2';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MermaidComponent = ({ chart }) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>x</button>
            </div>
            <TransformComponent>
              <Mermaid chart={chart} />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default MermaidComponent;

