import React, { useContext, useState } from "react";
import FormErrors from "../Utility/FormErrors";
import Validate from "../Utility/FormValidation";
import { AuthContext } from "./Auth.js";
import { GlobalContext } from "../../Context/GlobalState";
import { Redirect } from "react-router-dom";

const LogIn = () => {
  const { setDisplay } = useContext(GlobalContext);

  const [fields, setFields] = useState({
    username: "",
    password: "",
    errors: {
      fire: null,
      blankfield: false,
    },
  });

  const clearErrorState = () => {
    setFields({
      ...fields,
      errors: {
        fire: null,
        blankfield: false,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, fields);
    if (error) {
      setFields({
        ...fields,
        errors: { ...error },
      });
      return;
    }

    //firebase authentication
    // firebase
    //   .auth()
    //   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //   .then(() => {
    //     setDisplay("");
    //     return firebase
    //       .auth()
    //       .signInWithEmailAndPassword(fields.username, fields.password);
    //   })
    //   .catch(function (error) {
    //     let err = null;
    //     !error.message ? (err = { message: error }) : (err = error);
    //     setFields({
    //       ...fields,
    //       errors: {
    //         fire: err,
    //       },
    //     });
    //   });
  };

  const onInputChange = (event) => {
    setFields({
      ...fields,
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex-wrapper">
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={fields.errors} />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Email"
                  value={fields.username || ""}
                  onChange={onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={fields.password || ""}
                  onChange={onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-dark">Login</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LogIn;
