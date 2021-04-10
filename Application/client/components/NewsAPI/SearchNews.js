import React from 'react';

const SearchNews = props => {
    return (
      <div>
        <form onSubmit={props.loadnews}>
          <div>{props.error ? error() : ""}</div>
          <div>
            <div>
              <input
                type="text"
                placeholder="News"
                name="title"
              />
              <button>Get News</button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
         Expected News incorrect !!!
      </div>
    );
  };



export default SearchNews;