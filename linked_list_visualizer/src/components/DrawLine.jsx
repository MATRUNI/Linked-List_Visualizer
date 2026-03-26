import React from "react";
import './Drawline.css'
function DrawLine({
  id,
  x1,
  y1,
  x2,
  y2,
  brushColor = "#00b894",
  lineWidth = 3
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

  return (
    <>
      {/* Arrow definition */}
      <defs>
        <marker
          id={`arrow-${id}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill={brushColor} />
        </marker>
      </defs>

      {/* Line */}
      <path
        stroke={brushColor}
        strokeWidth={lineWidth}
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