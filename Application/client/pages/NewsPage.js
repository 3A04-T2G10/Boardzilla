import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import News from "_widgets/News/News";
import { attemptGetNews } from "_thunks/news";

export const NewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { news } = useSelector(R.pick(["news"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetNews()).then(() => {
        setLoading(false);
      });
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          <ul className="sticky-list">
            {news.map((widget) => (
              <News key={widget.id} {...widget} remove={() => {}} />
            ))}
          </ul>
        </>
      </div>
    )
  );
};
export default NewsPage;
