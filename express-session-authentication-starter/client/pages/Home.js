import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    }
  }, []);

  return (
    <div className="home-page page">
      <section>
        <div className="container">
          <h1 className="title">Home Page</h1>
        </div>
      </section>
    </div>
  );
}
