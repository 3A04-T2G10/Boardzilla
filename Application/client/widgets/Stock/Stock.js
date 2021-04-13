import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons/faDollarSign";
import { attemptDeleteStock } from "_thunks/stocks";
import { attemptUpdateStock } from "_thunks/stocks";
import ConfirmModal from "_components/ConfirmModal";

export const Stock = ({ id, dailyData, symbol }) => {
  const dispatch = useDispatch();
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);
  const updateSymbol = (e) => setCurrentSymbol(e.target.value);
  const editStock = () => setEdit(true);
  const cancelEdit = () => {
    setEdit(false);
    setCurrentSymbol(symbol);
  };
  const deleteStock = () => dispatch(attemptDeleteStock(id));
  const handleUpdateStock = () => {
    if (currentSymbol && currentSymbol !== symbol) {
      dispatch(attemptUpdateStock(id, currentSymbol)).then(() =>
        setEdit(false)
      );
    }
  };

  return dailyData && dailyData.dateTime && dailyData.dateTime.length > 1 ? (
    <div className={`card mb-3 px-2`}>
      <div className="content has-text-centered">
        <Plot
          data={[
            {
              x: dailyData.dateTime,
              open: dailyData.open,
              close: dailyData.close,
              decreasing: { line: { color: "#f03434" } },
              increasing: { line: { color: "#00b16a" } },
              high: dailyData.high,
              low: dailyData.low,
              type: "candlestick",
              xaxis: "x",
              yaxis: "y",
            },
          ]}
          layout={{
            dragmode: "zoom",
            showlegend: false,
            xaxis: {
              range: [
                dailyData.dateTime.length > 30
                  ? dailyData.dateTime[30]
                  : dailyData.dateTime[dailyData.dateTime.length - 1],
                dailyData.dateTime[0],
              ],
              title: "Date",
              type: "date",
            },
            yaxis: {
              autorange: true,
            },
          }}
        />
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                Current Price
              </p>

              <p className="title">
                {dailyData.close[0]}
                <span className="icon is-small mx-3">
                  {dailyData.close[0] > dailyData.open[0] ? (
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      style={{ color: "#00b16a" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: "#f03434" }}
                    />
                  )}
                </span>
                <span className="is-size-6">
                  {`${(
                    (100 * (dailyData.close[0] - dailyData.open[0])) /
                    dailyData.open[0]
                  ).toFixed(1)}%`}
                </span>
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faChartBar} />
                </span>
                Volume
              </p>
              <p className="title">{dailyData.volume[0]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer level py-2">
        <div className="level-left">
          {edit ? (
            <div className="level-item">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="ticker symbol"
                    value={currentSymbol}
                    onChange={updateSymbol}
                  />
                </p>
              </div>
            </div>
          ) : (
            <p className="level-item is-size-4">
              Stock:
              <span className="has-text-weight-semibold pl-2">{`${
                symbol || ""
              }`}</span>
            </p>
          )}
        </div>
        <div className="level-right">
          {edit ? (
            <>
              <p className="level-item">
                <button
                  className="button is-success"
                  onClick={handleUpdateStock}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faSave} />
                  </span>
                </button>
              </p>
              <p className="level-item">
                <button
                  className="button is-warning has-text-centered"
                  onClick={cancelEdit}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faBan} />
                  </span>
                </button>
              </p>
            </>
          ) : (
            <p className="level-item">
              <button
                className="button is-dark has-text-centered"
                onClick={editStock}>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </button>
            </p>
          )}
          <p className="level-item">
            <button
              className="button is-danger is-outlined has-text-centered"
              onClick={openModal}>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </button>
          </p>
        </div>
      </div>
      <ConfirmModal
        confirm={confirm}
        closeModal={closeModal}
        deleteWidget={deleteStock}
      />
    </div>
  ) : (
    <>No Data Found</>
  );
};
export default Stock;

Stock.propTypes = {
  id: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  dailyData: PropTypes.object,
};

Stock.defaultProps = {
  dailyData: {},
  symbol: "",
};
