import React from "react";
import NewsHolder from "./NewsHolder";
import SearchNews from "./SearchNews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
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

  getNews = async (e) => {
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
      error: false,
    });
  };

  render() {
    return (
      <div className={`card mb-3`}>
        <div className="card-content">
          <div className="content">
            <SearchNews loadnews={this.getNews} error={this.state.error} />

            <NewsHolder
              title={this.state.title}
              description={this.state.description}
              author={this.state.author}
              publishedAt={this.state.publishedAt}
              urlToImage={this.state.urlToImage}
            />
          </div>
        </div>
        <div className="has-text-centered mt-1">
          <>
            <button className="button is-success">
              <span className="icon is-small">
                <FontAwesomeIcon icon={faSave} />
              </span>
              <span>Save</span>
            </button>
            <button className="button is-warning has-text-centered">
              <span className="icon is-small">
                <FontAwesomeIcon icon={faBan} />
              </span>
              <span>Cancel</span>
            </button>
          </>
          {/**
             * ) : (
             <button
          //     className="button is-light has-text-centered"
          //     onClick={editSticky}
          //     onKeyPress={editSticky}
          //   >
          //     <span className="icon is-small">
          //       <FontAwesomeIcon icon={faPencilAlt} />
          //     </span>
          //     <span>Edit</span>
          //   </button>
          // )}
             */}

          <button className="button is-danger is-outlined has-text-centered">
            <span>Delete</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        {/* <ConfirmModal
          confirm={confirm}
          closeModal={closeModal}
          deleteSticky={deleteSticky}
        /> */}
      </div>
    );
  }
}
export default NewsAPI;
