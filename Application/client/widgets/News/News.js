import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
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
import { attemptDeleteNews } from "_thunks/news";
import { attemptUpdateNews } from "_thunks/news";
import ConfirmModal from "_components/ConfirmModal";

export const News = ({ id, articles, topic }) => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(topic);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);
  const updateTopic = (e) => setCurrentTopic(e.target.value);
  const editNews = () => setEdit(true);
  const cancelEdit = () => {
    setEdit(false);
    setCurrentTopic(topic);
  };
  const deleteNews = () => dispatch(attemptDeleteNews(id));
  const handleUpdateNews = () => {
    if (currentTopic && currentTopic !== topic) {
      dispatch(attemptUpdateNews(id, currentTopic)).then(() => setEdit(false));
    }
  };
  const next = () => setPageNumber((pageNumber + 1) % articles.length);
  const prev = () =>
    setPageNumber((pageNumber + articles.length - 1) % articles.length);
  return articles.length ? (
    <div className={`card mb-3 px-2`}>
      <div className="has-text-centered">
        <p className="is-size-3 has-text-weight-bold p-1">
          {articles[pageNumber].title || "Title"}
        </p>
      </div>
      <div className="card-image">
        <figure className="image is-16by9">
          <img
            src={
              articles[pageNumber].urlToImage ||
              "https://media2.vault.com/21223/rainy_window.jpg"
            }
            alt="article image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <p className="subtitle is-6">
              <span className="icon">
                <FontAwesomeIcon icon={faUserEdit} />
              </span>
              {articles[pageNumber].author || "Unknown"}
            </p>
          </div>
          <div className="media-right">
            <p className="subtitle is-6">
              <span className="icon">
                <FontAwesomeIcon icon={faLink} />
              </span>
              <a href={articles[pageNumber].url || "#"}>
                {articles[pageNumber].source.name || source}
              </a>
            </p>
          </div>
        </div>
        <div className="content">
          {articles[pageNumber].description}
          <br />
          <time
            dateTime={articles[pageNumber].publishedAt}
            className="has-text-weight-light">
            <span className="icon">
              <FontAwesomeIcon icon={faClock} />
            </span>
            {new Date(articles[pageNumber].publishedAt).toDateString()}
          </time>
        </div>
      </div>
      <div className="has-text-centered pb-2">
        <button className="button is-dark is-rounded" onClick={prev}>
          <span className="icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
        </button>
        <span className="px-2 has-text-weight-semibold">{`${
          pageNumber + 1
        } of ${articles.length}`}</span>
        <button className="button is-dark is-rounded" onClick={next}>
          <span className="icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </button>
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
                    placeholder="News topic"
                    value={currentTopic}
                    onChange={updateTopic}
                  />
                </p>
              </div>
            </div>
          ) : (
            <p className="level-item">
              News about:
              <span className="has-text-weight-semibold pl-2">{`${
                topic ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
                  onClick={handleUpdateNews}>
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
                onClick={editNews}>
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
        deleteWidget={deleteNews}
      />
    </div>
  ) : (
    <></>
  );
};
export default News;

News.propTypes = {
  id: PropTypes.string.isRequired,
  topic: PropTypes.string,
  articles: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

News.defaultProps = {
  articles: [],
  topic: "",
};
