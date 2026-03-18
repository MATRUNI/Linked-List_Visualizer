import { useState } from "react";
import './BeforeAfterToggle.css'

export default function BeforeAfterToggle() {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <div className="container">
      <div
        className="toggle"
        style={{
          backgroundColor: isAfter ? "#4CAF50" : "#999797",
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
        {isAfter ? "After State" : "Before State"}
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "50px",
  },
  toggle: {
    width: "120px",
    height: "50px",
    borderRadius: "50px",
    cursor: "pointer",
    position: "relative",
    transition: "background-color 0.4s ease",
    display: "flex",
    alignItems: "center",
    padding: "5px",
  },
  slider: {
    width: "50px",
    height: "40px",
    borderRadius: "40px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
    transition: "transform 0.4s ease, box-shadow 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  text: {
    fontSize: "18px",
    fontWeight: "600",
  },
};