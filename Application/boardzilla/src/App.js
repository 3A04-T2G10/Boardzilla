// import "./App.css";
import Widget from "./Components/Widget";
import Dashboard from "./Components/Dashboard";
// import Example from './example'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        {/* <Widget color={"green"} />
        <Widget color={"red"} /> */}
        <Dashboard />
      </DndProvider>
    </div>
  );
}

export default App;
