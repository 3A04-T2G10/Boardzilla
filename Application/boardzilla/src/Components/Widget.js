import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Resizable, ResizableBox } from 'react-resizable';
import "../widgetList.css"
import {Draggable} from 'react-beautiful-dnd';



export class Widget extends React.Component {

  constructor(props) {
    super(props);
  }

  onResize = (event, {element, size, handle}) => {
    this.props.getSize(this.props.index, size.width, size.height);
  };

  remove = () => {
    this.props.remove(this.props.index)
  }
  render() {
  return (
    <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.index}>
    {(provided) => {
      const style = {
      display: "inline-block",
      backgroundColor: `${this.props.colour}`,
      ...provided.draggableProps.style
      };
      return (
      <ResizableBox minConstraints={[350, 350]} width={this.props.width} height={this.props.height} onResize={this.onResize} {...provided.draggableProps} className="widget-box"  style={style}>
    <div ref={provided.innerRef} {...provided.dragHandleProps} className="title"> 
    <span className="delete" onClick={this.remove}></span>
    {this.props.content}
    {this.props.index}
    </div>

  </ResizableBox>);
    }}
    
  </Draggable>
  );
  }
};

export default Widget;
