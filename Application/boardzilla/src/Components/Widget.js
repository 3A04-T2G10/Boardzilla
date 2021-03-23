import React, { useEffect, useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";
// class Widget extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       x: 50,
//       y: 50,
//       z: 0,
//       width: 50,
//       height: 50,
//       mouseDown: false,
//     };
//   }

//   render() {

//     return (

//     );
//   }
// }

export const Widget = (props) => {
  //pass props telling us the window size
  //   const [x, setX] = useState(0);
  //   const [y, setY] = useState(0);
  //   const [z, setZ] = useState(0);
  //   const [width, setWidth] = useState(50);
  //   const [height, setHeight] = useState(50);
  //   const [mouseDown, setMouseDown] = useState(false);

  //   useEffect(() => {
  //     const handleMouseUp = () => setMouseDown(false);
  //     window.addEventListener("mouseup", handleMouseUp);
  //     return () => {
  //       window.addEventListener("mouseup", handleMouseUp);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const handleMove = (event) => {
  //       setX((x) => x + event.movementX);
  //       setY((y) => y + event.movementY);
  //     };
  //     if (mouseDown) {
  //       window.addEventListener("mousemove", handleMove);
  //     }
  //     return () => {
  //       window.removeEventListener("mousemove", handleMove);
  //     };
  //   }, [mouseDown]);

  return (
    // <div style={{ position: "absolute", width: "100%", height: "100%" }}>
    //   <div
    //     style={{
    //       position: "relative",
    //       backgroundColor: `${props.color}`,
    //       width: `${width}%`,
    //       height: `${height}%`,
    //       left: `${x}px`,
    //       top: `${y}px`,
    //       zIndex: z,
    //     }}
    //     onMouseDown={() => setMouseDown(true)}
    //   ></div>
    // </div>
    <ResizableBox width={300} height={300} className="box">
      <div className="content-wrap">
        <span className="content">
          I'm hiding if there is
          <br />
          no space for me
        </span>
      </div>
    </ResizableBox>
  );
};

export default Widget;
