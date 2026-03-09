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

  const offset = 80

  return (
    <path
      key={id}
      stroke={brushColor}
      strokeWidth={lineWidth}
      fill="none"
      d={`M ${x1+50} ${y1+30} C ${x1 + offset} ${y1+30}, ${x2 - offset} ${y2+30}, ${x2 +20} ${y2+30}`}
    />
  )
}

export default DrawLine