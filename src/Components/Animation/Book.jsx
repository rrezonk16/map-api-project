import React, { useState } from "react";
import "./Book.css"; // Import the CSS file for styling

const Book = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`book ${isFlipped ? "flipped" : ""}`}>
      <div className="cover front">Front Cover</div>
      <div className="cover back">Back Cover</div>
      <button onClick={handleFlip}>Flip</button>
    </div>
  );
};

export default Book;
