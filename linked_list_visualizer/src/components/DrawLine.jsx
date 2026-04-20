import React from "react";
import './Drawline.css'
function DrawLine({
  id,
  x1,
  y1,
  x2,
  y2,
  brushColor = "#00b894",
  lineWidth = 3,
  zoom=1
}) {
  const NODE_WIDTH = 160;
  const NODE_HEIGHT = 192;

  const startX = x1 + NODE_WIDTH + 75;
  const startY = y1 + (NODE_HEIGHT / 2);

  const endX = x2 + 5;
  const endY = y2 + (NODE_HEIGHT / 2);

  const dx = Math.abs(endX - startX);
  const curve = Math.min(150, dx * 0.6);

  const c1x = startX + curve;
  const c2x = endX - curve;
  const markerSize = 10 * zoom;
  return (
    <>
      {/* Arrow definition */}
      <defs>
        <marker
          id={`arrow-${id}`}
          markerWidth={markerSize}
          markerHeight={markerSize}
          refX={markerSize-1}
          refY={markerSize/2}
          orient="auto"
        >
          <path d={`M0,0 L${markerSize},${markerSize / 2} L0,${markerSize} Z`} fill={brushColor} />
        </marker>
      </defs>

      {/* Line */}
      <path
        stroke={brushColor}
        strokeWidth={lineWidth*zoom}
        className="animated-line"
        fill="none"
        strokeLinecap="round"
        markerEnd={`url(#arrow-${id})`}
        d={`M ${startX} ${startY} C ${c1x} ${startY}, ${c2x} ${endY}, ${endX} ${endY}`}
      />

      {/* Start circle */}
      <circle cx={startX} cy={startY} r={20} fill={brushColor} />
    </>
  );
}

export default React.memo(DrawLine)