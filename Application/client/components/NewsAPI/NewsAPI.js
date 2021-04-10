import React from "react";
import NewsHolder from "./NewsHolder";
import SearchNews from "./SearchNews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
//News API Key
const NewsAPI_Key = "d4144d51be414cfbb9335f533dfa78f3";

class NewsAPI extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      title: "title",
      description:
        "2021 has already proven itself as another crazy year. It’s also another fantastic opportunity to lear...",
      author: "author",
      publishedAt: "2021-05-10T21:30:50Z",
      urlToImage:
        "https://i.dailymail.co.uk/1s/2021/04/10/17/41587242-0-image-a-89_1618070504323.jpg",
      error: "",
      sourceName: "source",
      page: 0,
      topic: "topic",
      url: "#",
    };
  }

  getNews = async () => {
    //Query is everything
    const query = this.state.topic;

    const api_call = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${NewsAPI_Key}`
    );

    const response = await api_call.json();

    console.log(response);

    //setState to change the response
    this.setState({
      //The first index represents the most recent news
      articles: response.articles,
      title: response.articles[0].title,
      description: response.articles[0].description,
      author: response.articles[0].author,
      publishedAt: response.articles[0].publishedAt,
      urlToImage: response.articles[0].urlToImage,
      url: response.articles[0].url,
      source: response.articles[0].source.name,
      // when we have response, error is zero
      error: false,
    });
  };
  next = () => {
    this.setState({
      page: (this.state.page + 1) % this.state.articles.length,
      title: this.state.articles[this.state.page].title,
      description: this.state.articles[this.state.page].description,
      author: this.state.articles[this.state.page].author,
      publishedAt: this.state.articles[this.state.page].publishedAt,
      urlToImage: this.state.articles[this.state.page].urlToImage,
      url: this.state.articles[this.state.page].url,
      source: this.state.articles[this.state.page].source.name,
    });
  };
  prev = () => {
    this.setState({
      page:
        (this.state.page + this.state.articles.length - 1) %
        this.state.articles.length,
      title: this.state.articles[this.state.page].title,
      description: this.state.articles[this.state.page].description,
      author: this.state.articles[this.state.page].author,
      publishedAt: this.state.articles[this.state.page].publishedAt,
      urlToImage: this.state.articles[this.state.page].urlToImage,
      url: this.state.articles[this.state.page].url,
      source: this.state.articles[this.state.page].source.name,
    });
  };

  search = (e) => {
    this.setState({
      topic: e.target.value,
    });
  };
  render() {
    return (
      <div className={`card mb-3 px-2`}>
        <div className="has-text-centered">
          <p className="is-size-3 has-text-weight-bold p-1">
            {this.state.title}
          </p>
        </div>

        <div className="card-image">
          <figure className="image is-16by9">
            <img src={this.state.urlToImage} alt="article image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <p className="subtitle is-6">
                <span className="icon">
                  <FontAwesomeIcon icon={faUserEdit} />
                </span>
                {this.state.author}
              </p>
            </div>
            <div className="media-right">
              <p className="subtitle is-6">
                <span className="icon">
                  <FontAwesomeIcon icon={faLink} />
                </span>
                <a href={this.state.url}>{this.state.source}</a>
              </p>
            </div>
          </div>
          <div className="content">
            {this.state.description}
            {/* <SearchNews loadnews={this.getNews} error={this.state.error} />

            <NewsHolder
              title={this.state.title}
              description={this.state.description}
              author={this.state.author}
              publishedAt={this.state.publishedAt}
              urlToImage={this.state.urlToImage}
            /> */}
            <br />

            <time
              dateTime={this.state.publishedAt}
              className="has-text-weight-light"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faClock} />
              </span>
              {new Date(this.state.publishedAt).toDateString()}
            </time>
          </div>
        </div>
        <div className="has-text-centered pb-2">
          <button className="button is-dark is-rounded" onClick={this.prev}>
            <span className="icon">
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
          </button>
          <span className="px-2 has-text-weight-semibold">{`${
            this.state.page + 1
          } of ${this.state.articles.length}`}</span>
          <button className="button is-dark is-rounded" onClick={this.next}>
            <span className="icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </button>
        </div>
        {/* <!-- Main container --> */}
        <div className="card-footer level py-2">
          {/* <!-- Left side --> */}
          <div className="level-left">
            <p className="level-item">
              News about:
              <span className="has-text-weight-semibold pl-2">{`${this.state.topic}`}</span>
            </p>

            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Find a post"
                    onChange={this.search}
                  />
                </p>
                <p className="control">
                  <button className="button is-link" onClick={this.getNews}>
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Right side --> */}
          <div className="level-right">
            <p className="level-item">
              <button className="button is-success">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faSave} />
                </span>
                <span>Save</span>
              </button>
            </p>
            <p className="level-item">
              <button className="button is-warning has-text-centered">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faBan} />
                </span>
                <span>Cancel</span>
              </button>
            </p>
          </div>
        </div>
        {/* <div className="has-text-centered mt-1">
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

          <button className="button is-danger is-outlined has-text-centered">
            <span>Delete</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div> */}
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
