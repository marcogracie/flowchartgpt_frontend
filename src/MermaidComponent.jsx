import React, { useRef, useEffect } from "react";
import Mermaid from "react-mermaid2";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

const MermaidComponent = ({ chart }) => {
  const mermaidRef = useRef();

  useEffect(() => {
    const svgElement = mermaidRef.current.querySelector("svg");
    if (svgElement) {
      const bbox = svgElement.getBBox();
      console.log(`SVG size: ${bbox.width}x${bbox.height}`);
  
      const containerWidth = mermaidRef.current.offsetWidth;
      const containerHeight = mermaidRef.current.offsetHeight;
  
      const svgAspectRatio = bbox.width / bbox.height;
      const containerAspectRatio = containerWidth / containerHeight;
  
      let scaleFactor;
      if (svgAspectRatio > containerAspectRatio) {
        // SVG is wider than the container, scale based on width
        scaleFactor = bbox.width / containerWidth;
      } else {
        // SVG is taller than the container, scale based on height
        scaleFactor = bbox.height / containerHeight;
      }
  
      scaleFactor *= 1.05; // Reduce scale by 5%
  
      svgElement.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width * scaleFactor} ${bbox.height * scaleFactor}`);
      svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";
      svgElement.style.display = "block";
      svgElement.style.margin = "auto";
    }
  }, [chart]);
  
  
  
  
  
  

  return (
    <TransformWrapper options={{limitToBounds: false}}>
      <TransformComponent>
        <div ref={mermaidRef} style={{width: '74vw', height: '89vh', overflow: 'hidden'}}>
          <Mermaid chart={chart} />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default MermaidComponent;
