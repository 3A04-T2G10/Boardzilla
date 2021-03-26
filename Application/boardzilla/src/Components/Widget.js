import React, { useState, useCallback } from "react";
import { ResizableBox } from "react-resizable";

export const Widget = (props) => {
  return (
    <ResizableBox
      width={150}
      height={150}
      style={{
        display: "inline-block",
        left: `${0}px`,
        top: `${0}px`,
        backgroundColor: `${props.color}`,
      }}
    >
      <div>Contents</div>
    </ResizableBox>
  );
};

export default Widget;
