import React, { useRef, useState } from "react";

const LongPressable = ({ children, onLongPress, longPressDuration = 500 }) => {
  const timeoutRef = useRef(null);
  const [isPressing, setIsPressing] = useState(false);

  const startLongPress = (event) => {
    setIsPressing(true);
    timeoutRef.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress(event); // Call the provided callback with the event
      }
      setIsPressing(false);
    }, longPressDuration);
  };

  const stopLongPress = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsPressing(false);
    }
  };

  return (
    <div
      onMouseDown={startLongPress}
      onMouseUp={stopLongPress}
      onMouseLeave={stopLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={stopLongPress}
      onTouchCancel={stopLongPress}
      style={{
        userSelect: "none", // Prevents text selection during long press
        background: isPressing ? "#f0f0f0" : "transparent", // Optional visual feedback
        display: "inline-block", // Ensures it wraps content properly
      }}
    >
      {children}
    </div>
  );
};

export default LongPressable;