// import "./App.css";
import Widget from "./Components/Widget";

function App() {
  return (
    <div className="App">
      <Widget color={"green"}/>
      <Widget color={"red"}/>
    </div>
  );
}

export default App;

{/* <Draggable>
<div>
<ResizableBox width={500} height={500} style={{
    // left: `${x}px`,
    // top: `${y + props.y}px`,
    backgroundColor: `${props.color}`
}}>
<div style={{
    position: "relative",
    width: `${width}px`,
    height: `${height}px`,
    zIndex: z,
  }}
  >
  onMouseDown={handleMouseDown}Contents
  
</div>
</ResizableBox>

</div>
</Draggable> 


*/}

 {/* <Rnd style={{
      backgroundColor: `${props.color}`
    }}default={{
    x: x,
    y: y + props.y,
    width: `${width}px`,
    height: `${height}px`,
  }} >
dskalkkds
    </Rnd> */}