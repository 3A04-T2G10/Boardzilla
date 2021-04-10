import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Sticky from "_widgets/StickyNotes/Sticky";
// import AddSticky from "_widgets/StickyNotes/AddSticky";
import { attemptGetStickies } from "_thunks/stickies";

export const Stickies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { stickies } = useSelector(R.pick(["stickies"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetStickies()).then(() => setLoading(false));
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          {/* <AddSticky /> */}
          <ul className="sticky-list">
            {stickies.map((sticky) => (
              <Sticky key={sticky.id} {...sticky} />
            ))}
          </ul>
        </>
      </div>
    )
  );
};
export default Stickies;
