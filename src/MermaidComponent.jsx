import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidComponent = ({ chart }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      mermaid.initialize({ startOnLoad: true, theme: "default" });
      mermaid.render("mermaidChart", chart, (svgCode) => {
        chartRef.current.innerHTML = svgCode;
      });
    }
  }, [chart]);

  return (
    <div>
      <div ref={chartRef} />
    </div>
  );
};

export default MermaidComponent;
