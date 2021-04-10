import React from "react";

const NewsHolder = (props) => {
  return (
    <div className="has-text-centered card">
      <div className="card-content">
        <h3 className="card-title">{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.author}</p>
        <p>{props.publishedAt}</p>
        <img className="news_picture" src={props.urlToImage} />
      </div>
    </div>
  );
};

export default NewsHolder;
