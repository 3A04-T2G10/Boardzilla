import React from 'react';

const SearchStock = props => {
    return (
      <div>
        <form onSubmit={props.loadstock}>
          <div>{props.error ? error() : ""}</div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Stock"
                name="symbol"
              />
              <button>Get Stock</button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Expected Stock incorrect !!!
      </div>
    );
  };



export default SearchStock;