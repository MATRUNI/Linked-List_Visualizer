type line = {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  brushColor?: string
  lineWidth?: number
}

function DrawLine({ id, x1, y1, x2, y2, brushColor = "#00b894", lineWidth = 3 }: line) {
  const NODE_WIDTH = 160;
  const NODE_HEIGHT = 192;

  const startX = x1 + NODE_WIDTH;
  const startY = y1 + (NODE_HEIGHT / 2);

  const endX = x2+5;
  const endY = y2 + (NODE_HEIGHT / 2);

  const dx = Math.abs(endX - startX);
  const curve = Math.min(150, dx * 0.6);

  const c1x = startX + curve;
  const c2x = endX - curve;

  return (
    <path
      key={id}
      stroke={brushColor}
      strokeWidth={lineWidth}
      fill="none"
      strokeLinecap="round"
      style={{
        filter: `drop-shadow(0px 0px 5px rgba(0, 184, 148, 0.6))`,
        transition: 'stroke 0.3s ease'
      }}
      d={`M ${startX} ${startY} C ${c1x} ${startY}, ${c2x} ${endY}, ${endX} ${endY}`}
    />
  );
}

export default DrawLine