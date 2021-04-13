import React from "react";
import {Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useSelector } from "react-redux";
import R from "ramda";
import Sticky from "_widgets/StickyNotes/Sticky";
import AddSticky from "_widgets/StickyNotes/AddSticky";
import Widget from "./Widget";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import AddStickyModal from "_widgets/StickyNotes/AddStickyModal";
import AddNewsModal from "_widgets/News/AddNewsModal";
import AddStockModal from "_widgets/Stock/AddStockModal";

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

  addWidget = () => {
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


  remove = (index) => {
    const newList = Array.from(this.state.list);
    newList.splice(index, 1);
    console.log(newList);
    this.setState({
      list: newList,
    });
  };

  selectType = (e) => {
    this.setState({
      newWidgetType: e.target.value,
    });
  };

  add = () => {
    switch (this.state.newWidgetType) {
      case "Sticky":
        this.setState({
          addStickyWidget: true,
        });
        break;
      case "News":
        this.setState({
          addNewsWidget: true,
        });
        break;
      case "Stock":
        this.setState({
          addStockWidget: true,
        });
        break;
      default:
        return;
    }
  };
  closeModal = () => {
    this.setState({
      addStickyWidget: false,
      addNewsWidget: false,
      addStockWidget: false,
    });
  };
  render() {
    return (
      <>
        <AddStickyModal
          open={this.state.addStickyWidget}
          closeModal={this.closeModal}
        />

        <AddNewsModal
          open={this.state.addNewsWidget}
          closeModal={this.closeModal}
        />

        <AddStockModal
          open={this.state.addStockWidget}
          closeModal={this.closeModal}
        />
        <div
          style={{
            width: `100%`,
            height: `50px`,
          }}>
          {/* <!-- Main container --> */}
          <div className="level px-5">
            {/* <!-- Left side --> 
    use these links to filter only a specific type of widget
  
  */}
            <div className="level-left">
              <p className="level-item">
                <strong>
                  <a>All</a>
                </strong>
              </p>
              <p className="level-item">
                <a>Stickies</a>
              </p>
              <p className="level-item">
                <a>News</a>
              </p>
              <p className="level-item">
                <a>Weather</a>
              </p>
              <p className="level-item">
                <a>Stocks</a>
              </p>
              <p className="level-item">
                <a>Calendars</a>
              </p>
            </div>

            {/* <!-- Right side --> */}
            <div className="level-right">
              <div className="control mr-2">
                <div className="select">
                  <select
                    onChange={this.selectType}
                    value={this.state.newWidgetType}>
                    <option value="Sticky">Sticky</option>
                    <option value="News">News</option>
                    <option value="Weather">Weather</option>
                    <option value="Stock">Stock</option>
                    <option value="Calendar">Calendar</option>
                  </select>
                </div>
              </div>

              <p className="level-item">
                <button
                  className="button is-link is-rounded"
                  onClick={this.add}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </p>
            </div>
          </div>
          <span className="add" onClick={this.addWidget}>
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
