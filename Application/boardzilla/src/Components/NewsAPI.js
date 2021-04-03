import React, { useState } from 'react';
import "../App.css"

//`https://newsapi.org/v2/everything?q=${query}&apiKey=d4144d51be414cfbb9335f533dfa78f3`

const api = {
  key: "d4144d51be414cfbb9335f533dfa78f3",
  base: "https://newsapi.org/v2/"
}

function NewsAPI() {


    const [query, setQuery] = useState('');
    const [news, setNews] = useState({});
  
    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}everything?q=${query}&apiKey=${api.key}`)
        .then(response => response.json())
        .then(data =>{setNews(data); setQuery(''); console.log(data);} );
      }
    }
  
    return (
      <div className="news"> 
        
          <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            /> 
            
        </div>
        {(typeof news.articles != "undefined") ? (
          <div>
            <h1 className="news__title">{news.articles[0].title}</h1>
            <p className="news__desc">{news.articles[0].description}</p><br />
            <p className="news__author">{news.articles[0].author}</p>
            {/* <p className="news__published">{news.articles[0].publishedAt}</p> <br /> */}
            <p className="news__published">{news.articles[0].publishedAt}</p> <br />
            <img className="news_picture" src={news.articles[0].urlToImage}/>
          </div>
        ) : ('')}
        
        
      </div>
    );
  }
  
  export default NewsAPI;