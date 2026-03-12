type line = {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  brushColor?: string
  lineWidth?: number
}

function DrawLine({ id, x1, y1, x2, y2, brushColor = "black", lineWidth = 2 }: line) {

  const NODE_WIDTH = 192
  const NODE_HEIGHT = 160

  const startX = x1 + NODE_WIDTH
  const startY = y1 + NODE_HEIGHT / 2

  const endX = x2
  const endY = y2 + NODE_HEIGHT / 2

  const dx = Math.abs(endX - startX)
  const curve = Math.max(60, dx * 0.5)

  const c1x = startX + curve
  const c2x = endX - curve

  return (
    <path
      key={id}
      stroke={brushColor}
      strokeWidth={lineWidth}
      fill="none"
      strokeLinecap="round"
      d={`M ${startX} ${startY} C ${c1x} ${startY}, ${c2x} ${endY}, ${endX} ${endY}`}
    />
  )
}

export default DrawLine