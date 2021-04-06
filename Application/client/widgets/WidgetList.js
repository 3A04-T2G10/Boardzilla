import React from "react";
import { useSelector } from "react-redux";
import R from "ramda";

import Sticky from "_widgets/StickyNotes/Sticky";
import AddSticky from "./StickyNotes/AddSticky";

export default function WidgetList() {
  const { stickies } = useSelector(R.pick(["stickies"]));
  //   const { stocks } = useSelector(R.pick(['stocks']));
  //   const { news } = useSelector(R.pick(['news']));
  //   const { calendars } = useSelector(R.pick(['calendars']));
  //   const { weathers } = useSelector(R.pick(['weathers']));
  console.log(stickies);
  return (
    <>
      <AddSticky />
      <ul className="sticky-list">
        {stickies.map((sticky) => (
          <Sticky key={sticky.id} {...sticky} />
        ))}
      </ul>
    </>
  );
}
