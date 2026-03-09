
type line={id:string,x1:number,y1:number,x2:number,y2:number,brushColor?:string,lineWidth?:number}

function DrawLine({id,x1,y1,x2,y2,brushColor="Black",lineWidth=2}:line)
{
    return (
        <svg>
            <line
            key={id}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={brushColor}
            strokeWidth={lineWidth}/>
        </svg>
    )
}
export default DrawLine;