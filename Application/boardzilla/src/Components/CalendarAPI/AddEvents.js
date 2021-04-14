import React from 'react';

// const AddEvents = props => {
//     return (
//       <div>
//         <form onSubmit={props.eventContent}>
//           <div>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Event"
//                 name="eventCont"
//               />
//               <button>Add event</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   };



// export default AddEvents;
// export default class AddEvents extends Component {
//     handleSubmit = (event) => {
//       event.preventDefault()
//       console.log(event.target[0].value)
//       console.log(event.target.elements.eventCont.value)
//       console.log(event.target.eventConte.value)
//       console.log(this.inputNode.value)
//     }
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               placeholder="New Event"
//               name="eventCont"
//               ref={node => (this.inputNode = node)}
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       )
//     }
//   }