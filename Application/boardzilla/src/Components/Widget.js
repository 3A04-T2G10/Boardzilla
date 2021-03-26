import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Resizable, ResizableBox } from "react-resizable";

export const Widget = (props) => {
  return (
    //<div style={{ position: "relative", width: "auto", height: "auto"}}>

    <ResizableBox
      width={500}
      height={500}
      style={{
        display: "inline-block",
        left: `${0}px`,
        top: `${0}px`,
        backgroundColor: `${props.color}`,
      }}
    >
      {/* <div style={{
      position: "relative",
      width: `${width}px`,
      height: `${height}px`,
      zIndex: z,
    }}
    onMouseDown={() => setMouseDown(true)}>
    Contents
  </div> */}
    </ResizableBox>
    //</div>
  );
};

export default Widget;
