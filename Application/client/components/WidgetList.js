import React from "react";
import {Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useSelector } from "react-redux";
import R from "ramda";
import Sticky from "_widgets/StickyNotes/Sticky";
import AddSticky from "_widgets/StickyNotes/AddSticky";
class WidgetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // layouts array storing the data about location and size of each widget
      layouts:  [
        {i: "1", x: 0, y: 0, w: 3, h: 2},
        {i: "2", x: 3, y: 0, w: 3, h: 2},
        {i: "3", x: 6, y: 0, w: 3, h: 2}
      ], 
      widgetCounter: 3 // counting number of widgets
    };
  }
    //const { stickies } = useSelector(R.pick(["stickies"]));

  add = () => {
    const newId = this.state.widgetCounter + 1;
    const newWidget = {
        i: newId.toString(),
        x: (this.state.layouts.length * 3) % 12, // 3 is the multiplier
        y: Infinity, // puts it at the bottom
        w: 3,
        h: 2
    };
  this.setState( prevState => ({
      widgetCounter: prevState.widgetCounter + 1,
      layouts: prevState.layouts.concat(newWidget)
    }));

  };

  onLayoutChange = (layout) =>  {
    this.setState({ layouts: layout })
  }

  render() {
    return (
      <>
        <div
          style={{
            width: `100%`,
            height: `50px`,
          }}
        >
          <span className="add" onClick={this.add}>
            Add
          </span>
        </div>
        <ResponsiveReactGridLayout style={{backgroundColor: `aqua`}} className="layout" onLayoutChange={this.onLayoutChange} >
          {this.state.layouts.map(widgetLayout => {
            return (
              <div style={{backgroundColor: `grey`}} key={widgetLayout.i} data-grid={widgetLayout} >Add Content</div>
            )
          })}
        </ResponsiveReactGridLayout>
      </>
    );
  }
}

export default WidgetList;
