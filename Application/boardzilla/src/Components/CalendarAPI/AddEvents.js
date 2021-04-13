import React from 'react';

const AddEvents = props => {
    return (
      <div>
        <form onSubmit={props.eventContent}>
          <div>
            <div>
              <input
                type="text"
                placeholder="Event"
                name="eventCont"
              />
              <button>Add event</button>
            </div>
          </div>
        </form>
      </div>
    );
  };



export default AddEvents;