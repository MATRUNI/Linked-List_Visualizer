import { useState } from "react";
import './BeforeAfterToggle.css'

export default function BeforeAfterToggle() {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <div className="container">
      <div
        className="toggle"
        style={{
          backgroundColor: isAfter ? "#0984e3" : "#e17055",
        }}
        onClick={() => setIsAfter(!isAfter)}
      >
        <div
          className="slider"
          style={{
            transform: isAfter ? "translateX(60px)" : "translateX(0px)",
          }}
        >
          {isAfter ? "After" : "Before"}
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