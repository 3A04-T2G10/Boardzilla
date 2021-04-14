// import React from 'react';
// import ApiCalendar from 'react-google-calendar-api';
// import Calendar from 'react_google_calendar'

// const calendar_configuration = {
//     api_key: 'AIzaSyA5uPla-6q29UacEH6h6wGfPLilfumNFfg',
//     calendars: [
//       {
//         name: 'demo',
//         url: 'ehttps://calendar.google.com/calendar/embed?src=c_v55tib3hei85gbp8bvlod1kjs0%40group.calendar.google.com&ctz=America%2FToronto'
//       }
//     ],
//     dailyRecurrence: 700,
//     weeklyRecurrence: 500,
//     monthlyRecurrence: 20
// }

// export default class CalendarAPI extends Component {
//     constructor(props) {
//       super(props)
//         this.state = {
//           events: []
//         }
//     }

//     render = () =>
//       <div>
//         <Calendar
//           events={this.state.events}
//           config={calendar_configuration} />
//       </div>
// }
import React, { useState,Component } from 'react';
import Calendar from 'react-calendar';
import { AddEvents } from './AddEvents';

import './Sample.less';
class CalEvent {
  constructor(date,msg) {  // Constructor
    this.date = date;
    this.msg = msg;
  }
}
function Sample() {
  //const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const onChange = date => {
    setDate(date);
  };

  return (
    <div className="Sample">
      <header>
        <h1>react-calendar sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar
            onChange={onChange}
            showWeekNumbers
            value={date}
          />
          {console.log(date)}
          {date.toString()}
        </main>
      </div>
    </div>
  );
}



export default class CalendarAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: true,
      eventText: undefined,
    }
  }
  // onClick = date => {
  //   this.setState(({ addEvent }) => ({ addEvent: !addEvent }));
  // };
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target[0].value)
    console.log(event.target.elements.eventCont.value)
    console.log(event.target.eventCont.value)
  }
  // handleSubmit(event) {
  //   alert('An event was added: ' + this.state.value);
  // }
  // getEvent = async e =>{
  //   e.preventDefault();
  //   alert('An event was added: ' + e.target.value);

  //   this.setState({
  //     eventText: e.target.value,
  //   });
  // }
    

    
  render(){
    return (
      <div>
      {/* {this.state.addEvent ? <form onSubmit={this.handleSubmit}>
         <label>
           New Event:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form> : null} */}
      {/* <AddEvents eventContent={this.getEvent} /> */}
      <form onSubmit={this.handleSubmit}>
        <label>
          Event:
          <input
            type="text"
            placeholder="New Event"
            name="eventCont"
            ref={node => (this.inputNode = node)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <Sample/>
      Event: {this.state.eventText}

    </div>
    );
  }
}