import { SET_EVENTS, ADD_EVENT, UPDATE_EVENT, REMOVE_EVENT } from "./types";

export const setEvents = (events) => ({
  type: SET_EVENTS,
  events,
});

export const addEvent = ({ id, text, type, date }) => ({
  type: ADD_EVENT,
  id,
  widgetType: type,
  text,
  date,
});

export const updateEvent = ({ id, text, type, date }) => ({
  type: UPDATE_EVENT,
  id,
  text,
  widgetType: type,
  type,
  date,
});

export const removeEvent = (id) => ({
  type: REMOVE_EVENT,
  id,
});
