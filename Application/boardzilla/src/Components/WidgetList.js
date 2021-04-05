import React from 'react';
import Widget from "./Widget";
import "../widgetList.css";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: "0", colour: "green", content:"Weather", width: 350, height: 350}, 
            {id: "1", colour:"red", content:"Sticky", width: 350, height: 350},  
            {id: "2", colour:"grey", content:"Calendar", width: 350, height: 350}]
        };

    }
    
   

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId 
            && destination.index === source.index){
                return;
            }
        
        const newList = this.state.list;
        var tmp = newList[source.index];
        newList[source.index] = newList[destination.index];
        newList[destination.index] = tmp;

        console.log(newList);
        this.setState({
             list: newList
         });

    }

    getSize = (index, width, height) =>  {
        this.state.list[index].width = width
        this.state.list[index].height = height
    }

    remove = (index) => {
        const newList = Array.from(this.state.list);
        newList.splice(index, 1);
        console.log(newList);
        this.setState({
            list: newList
        });
        
    }

    add = () => {
        const newWidget = {
            id: this.state.list.length.toString(),
            colour: "aqua",
            content: "New Widget",
            width: 350,
            height: 350
        }
        const newList = Array.from(this.state.list);
        newList.push(newWidget);
        this.setState({
            list: newList
        });
    }

    render() {
        return (
            <>

            <div style={{
                width: `100%`,
                height: `50px`
            }}>
                <span className="add" onClick={this.add}>Add</span>
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={"00"} direction="horizontal">
            {(provided) => (
            <div className="layout" ref={provided.innerRef} {...provided.droppableProps} >
                
                {this.state.list.map((widget, index) => {
                return (
                <Widget id={widget.id} remove={this.remove} colour={widget.colour} content={widget.content} width={widget.width} height={widget.height} index={index} getSize={this.getSize}/>
                
                );
            })
            
            }  
            {provided.placeholder}
            </div>
        
        )}
        </Droppable>
        </DragDropContext>
        </>
        );
    }

};

export default WidgetList;