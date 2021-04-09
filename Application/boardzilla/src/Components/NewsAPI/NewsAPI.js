import React from 'react';
import NewsHolder from "./NewsHolder";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchNews from './SearchNews';
//News API Key
const NewsAPI_Key = "d4144d51be414cfbb9335f533dfa78f3";


class NewsAPI extends React.Component {
    constructor() {
      super();
      this.state = {
        title: undefined,
        description: undefined,
        author: undefined,
        publishedAt: undefined,
        urlToImage: null,
        error: false,
      };

    }

    getNews = async e =>{
        e.preventDefault();
        //Query is everything
        const query = e.target.elements.title.value;

        const api_call = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${NewsAPI_Key}`
      );
        
        const response = await api_call.json();

        console.log(response);

        //setState to change the response 
        this.setState({
            //The first index represents the most recent news
            title: response.articles[0].title,
            description: response.articles[0].description,
            author: response.articles[0].author,
            publishedAt: response.articles[0].publishedAt,
            urlToImage: response.articles[0].urlToImage,
            // when we have response, error is zero
            error: false
        })
    };



    render() {
      return ( 
        <div className = "news">
            
            <SearchNews loadnews={this.getNews} error={this.state.error} />

            <NewsHolder
            title ={this.state.title} 
            description = {this.state.description}
            author={this.state.author}
            publishedAt={this.state.publishedAt}
            urlToImage={this.state.urlToImage}
        />  
        </div>
      );
    }
  }
  export default NewsAPI;