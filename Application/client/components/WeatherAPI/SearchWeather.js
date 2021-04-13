import React from 'react';

const SearchWeather = props => {
    return (
      <div>
        <form onSubmit={props.loadweather}>
          <div>{props.error ? error() : ""}</div>
          <div>
            <div>
              <input
                type="text"
                placeholder="City"
                name="city"
              />
              <input
                type="text"
                placeholder="Country"
                name="country"
              />
              <button>Get Weather</button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
         Expected Weather incorrect !!!
      </div>
    );
  };



export default SearchWeather;

