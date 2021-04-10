import React from "react";
import StockHolder from "./StockHolder";
//import 'bootstrap/dist/css/bootstrap.min.css';
import SearchStock from "./SearchStock";

const StockAPI_Key = "I8057XOVVLW4GTT2";

class StockAPI extends React.Component {
  constructor() {
    super();
    this.state = {
      Stock_X_Values: [],
      Stock_Y_Values: [],
      Query: undefined,
    };
  }

  getStock = async (e) => {
    e.preventDefault();
    const symbol = e.target.elements.symbol.value;
    let X_Array = [];
    let Y_Array = [];

    const api_call = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${StockAPI_Key}`
    );

    const response = await api_call.json();
    console.log(response);

    for (var key in response["Time Series (Daily)"]) {
      X_Array.push(key);
      Y_Array.push(response["Time Series (Daily)"][key]["1. open"]);
    }

    //setState to change the response
    this.setState({
      Stock_X_Values: X_Array,
      Stock_Y_Values: Y_Array,
      Query: symbol,
      // when we have response, error is zero
      error: false,
    });
  };

  render() {
    return (
      <div className="news">
        <SearchStock loadstock={this.getStock} error={this.state.error} />

        <StockHolder
          Stock_X_Values={this.state.Stock_X_Values}
          Stock_Y_Values={this.state.Stock_Y_Values}
          Query={this.state.Query}
        />
      </div>
    );
  }
}
export default StockAPI;
