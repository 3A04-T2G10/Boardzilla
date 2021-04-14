import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import { push } from "connected-react-router";
import R from "ramda";
import {
  attemptGetEvents,
  attemptAddEvent,
  attemptDeleteEvent,
} from "_thunks/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
export const Cal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const { events } = useSelector(R.pick(["events"]));
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");

  const sameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  const hasEvent = (date) => {
    for (let i = 0; i < events.length; i++) {
      if (sameDay(new Date(events[i].date), date)) return true;
    }
    return false;
  };
  const handleAddEvent = () => {
    if (text && date) {
      dispatch(attemptAddEvent(text, date));
      setText("");
      setAdd(false);
    }
  };

  const cancelAddEvent = () => {
    setText("");
    setAdd(false);
  };

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetEvents()).then(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    !loading && (
      <div className={`card mb-3 px-2 py-2 height-100`}>
        <div className="content has-text-centered">
          <button
            className="button is-dark is-rounded"
            onClick={() => setAdd(true)}>
            Add Event
          </button>
          <div className="calendar">
            <div className="calendar__container">
              <main className="calendar__container__content">
                <Calendar
                  onChange={setDate}
                  value={date}
                  className="react-calendar"
                  tileContent={({ date, view }) =>
                    view === "month" && hasEvent(date) ? (
                      <span className="icon is-large pl-3">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                      </span>
                    ) : null
                  }
                />
              </main>
            </div>
          </div>
          {add ? (
            <div>
              <textarea
                className="textarea is-link"
                placeholder="event"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="button is-dark is-outlined m-3"
                onClick={cancelAddEvent}>
                Cancel
              </button>
              <button className="button is-dark m-3" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          ) : (
            events
              .filter((widget) => sameDay(new Date(widget.date), date))
              .map((w) => {
                return (
                  <article className="message is-link" key={w.id}>
                    <div className="message-header">
                      <button
                        className="delete"
                        aria-label="delete"
                        onClick={() =>
                          dispatch(attemptDeleteEvent(w.id))
                        }></button>
                    </div>
                    <div className="message-body">{w.text}</div>
                  </article>
                );
              })
          )}
        </div>
      </div>
    )
  );
};

export default Cal;
