import React, { useRef, useEffect, useState } from "react";
import Mermaid from "react-mermaid2";
import { onSnapshot, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import app from './Firebase'

const MermaidComponent = () => {
  const mermaidRef = useRef();
  const [chart, setChart] = useState(null);

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

      svgElement.setAttribute(
        "viewBox",
        `${bbox.x} ${bbox.y} ${bbox.width * scaleFactor} ${
          bbox.height * scaleFactor
        }`
      );
      svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";
      svgElement.style.display = "block";
      svgElement.style.margin = "auto";
    }
  }, [chart]);

  useEffect(() => {
    const auth = getAuth(); // initialise auth
    const db = getFirestore(app); // initialise firestore

    auth.onAuthStateChanged((user) => {
      if (user) {
        // Path to the user's chart document in Firestore
        const userChartDocRef = doc(db, "users", user.uid, "charts");

        // Listen for real-time updates to the user's chart document
        const unsubscribe = onSnapshot(userChartDocRef, (doc) => {
          if (doc.exists()) {
            const chartsData = doc.data().charts;
            if (chartsData.length > 0) {
              // Find the chart with the latest timestamp
              const latestChart = chartsData.reduce((latest, current) =>
                latest.timestamp > current.timestamp ? latest : current
              );

              // Set the content of the latest chart
              setChart(latestChart.content);
            }
          }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      }
    });
  }, []); // adding an empty dependency array makes sure this effect runs only once after initial render.

  return (
    <TransformWrapper options={{ limitToBounds: false }}>
      <TransformComponent>
        <div
          ref={mermaidRef}
          style={{ width: "74vw", height: "89vh", overflow: "hidden" }}
        >
          <Mermaid chart={chart} />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default MermaidComponent;
