import { useEffect, useState } from "react";
import './BeforeAfterToggle.css'
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import useDataContext from "../context/DataContext";

export default function BeforeAfterToggle() {

  const {nodeData ,hasNodes,setHasNodes,isAfter,setIsAfter}=useDataContext();
  useEffect(()=>{
    if(nodeData.length!==0)
    {
      setHasNodes(true)
    }
    else
      setHasNodes(false);
  },[nodeData]);

  
  return (
    <div className="container"
    style={{
      opacity: hasNodes?1:0.8,
      pointerEvents: hasNodes?"all":"none"
    }}>
      <div
        className="toggle"
        style={{
          backgroundColor: isAfter ? "#0984e3" : "#ff8465",
        }}
        onClick={() => setIsAfter(!isAfter)}
      >
        <div
          className={`slider ${isAfter ? "sliderLeft" : "sliderRight"}`}
          style={{
            transform: isAfter ? "translateX(60px)" : "translateX(0px)",
          }}
        >
          {isAfter ? <GoArrowRight />: <GoArrowLeft />}
        </div>
      </div>

      <p
        className="text"
      >
        {isAfter ? "After Node" : "Before Node"}
      </p>
    </div>
  );
}