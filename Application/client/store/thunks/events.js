import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import { getEvents, postEvent, putEvent, deleteEvent } from "_api/events";

import { setEvents, addEvent, updateEvent, removeEvent } from "_actions/events";

import { dispatchError } from "_utils/api";

export const attemptGetEvents = () => (dispatch) =>
  getEvents()
    .then((data) => {
      const events = R.map(
        (event) =>
          R.omit(["Id"], R.assoc("id", event._id, snakeToCamelCase(event))),
        data.events
      );
      dispatch(setEvents(events));
      return data.events;
    })
    .catch(dispatchError(dispatch));

export const attemptAddEvent = (text, date) => (dispatch) =>
  postEvent({ text, date })
    .then((data) => {
      const event = R.omit(
        ["Id"],
        R.assoc("id", data.event._id, snakeToCamelCase(data.event))
      );
      dispatch(addEvent(event));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateEvent = (id, text, date) => (dispatch) =>
  putEvent({ id, text, date })
    .then((data) => {
      const event = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateEvent(event));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteEvent = (id) => (dispatch) =>
  deleteEvent({ id })
    .then((data) => {
      dispatch(removeEvent(id));
      return data;
    })
    .catch(dispatchError(dispatch));
