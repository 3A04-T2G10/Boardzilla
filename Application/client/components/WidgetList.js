import React from "react";
import Widget from "./Widget";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import AddStickyModal from "_widgets/StickyNotes/AddStickyModal";

class WidgetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: "0",
          colour: "green",
          content: "Weather",
          width: 350,
          height: 350,
        },
        { id: "1", colour: "red", content: "Sticky", width: 350, height: 350 },
        {
          id: "2",
          colour: "grey",
          content: "Calendar",
          width: 350,
          height: 350,
        },
      ],
      newWidgetType: "Sticky",
      addStickyWidget: false,
    };
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newList = this.state.list;
    var tmp = newList[source.index];
    newList[source.index] = newList[destination.index];
    newList[destination.index] = tmp;

    console.log(newList);
    this.setState({
      list: newList,
    });
  };

  getSize = (index, width, height) => {
    this.state.list[index].width = width;
    this.state.list[index].height = height;
  };

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
        console.log("adding sticky");
        this.setState({
          addStickyWidget: true,
        });
        break;
      default:
        return;
    }

    // const newWidget = {
    //   id: this.state.list.length.toString(),
    //   colour: "aqua",
    //   content: "New Widget: " + this.state.newWidgetType,
    //   width: 350,
    //   height: 350,
    // };
    // const newList = Array.from(this.state.list);
    // newList.push(newWidget);
    // this.setState({
    //   list: newList,
    // });
  };
  closeModal = () => {
    console.log("closing");
    this.setState({
      addStickyWidget: false,
    });
  };
  render() {
    return (
      <>
        <AddStickyModal
          open={this.state.addStickyWidget}
          closeModal={this.closeModal}
        />
        <div
          style={{
            width: `100%`,
            height: `50px`,
          }}
        >
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
              <div className="control has-icons-left mr-2">
                <div className="select">
                  <select
                    onChange={this.selectType}
                    value={this.state.newWidgetType}
                  >
                    <option value="Sticky">Sticky</option>
                    <option value="News">News</option>
                    <option value="Weather">Weather</option>
                    <option value="Stock">Stock</option>
                    <option value="Calendar">Calendar</option>
                  </select>
                </div>
                <span className="icon is-left">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>

              <p className="level-item">
                {/* <a className="button is-success" onClick={this.add}> */}
                <a className="button is-success" onClick={this.add}>
                  Create
                </a>
              </p>
            </div>
          </div>
          {/* <span className="add" onClick={this.add}>
            Add
          </span> */}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={"00"} direction="horizontal">
            {(provided) => (
              <div
                className="layout"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.state.list.map((widget, index) => {
                  return (
                    <Widget
                      id={widget.id}
                      key={widget.id}
                      remove={this.remove}
                      colour={widget.colour}
                      content={widget.content}
                      width={widget.width}
                      height={widget.height}
                      index={index}
                      getSize={this.getSize}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

export default WidgetList;
