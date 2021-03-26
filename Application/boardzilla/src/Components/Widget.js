import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Resizable, ResizableBox } from 'react-resizable';



export const Widget = (props) => {
  //pass props telling us the window size
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [mouseDown, setMouseDown] = useState(false);
  
  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      setX((x) => x + event.movementX);
      setY((y) => y + event.movementY);
    };
    if (mouseDown) {
      console.log("Clicked")
      window.addEventListener("mousemove", handleMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  
  }, [mouseDown]);
  return (
    //<div style={{ position: "relative", width: "auto", height: "auto"}}>
    
    <ResizableBox width={500} height={500} style={{
      display: "inline-block",
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: `${props.color}`
    }}>
    <div style={{
      position: "relative",
      width: `${width}px`,
      height: `${height}px`,
      zIndex: z,
    }}
    onMouseDown={() => setMouseDown(true)}>
    Contents
  </div>
  </ResizableBox>
  //</div>
  );
};

export default Widget;
