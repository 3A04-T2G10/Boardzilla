import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Stock from "_widgets/Stock/Stock";
import { attemptGetStocks } from "_thunks/stocks";

export const StockPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { stocks } = useSelector(R.pick(["stocks"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetStocks()).then(() => {
        setLoading(false);
      });
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          <ul className="sticky-list">
            {stocks.map((widget) => (
              <Stock key={widget.id} {...widget} remove={() => {}} />
            ))}
          </ul>
        </>
      </div>
    )
  );
};
export default StockPage;
