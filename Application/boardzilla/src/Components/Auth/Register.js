import React, { useContext, useState } from "react";
import FormErrors from "../Utility/FormErrors";
import Validate from "../Utility/FormValidation";
import { AuthContext } from "./Auth.js";
import { GlobalContext } from "../../Context/GlobalState";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { setDisplay } = useContext(GlobalContext);

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      fire: null,
      blankfield: false,
      passwordmatch: false,
    },
  });

  const clearErrorState = () => {
    setFields({
      ...fields,
      errors: {
        fire: null,
        blankfield: false,
        passwordmatch: false,
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
  };
  //firebase authentication
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(fields.email, fields.password)
  //       .then((newUser) => {
  //         //set up user in db
  //         setDisplay("");
  //         return firebase
  //           .firestore()
  //           .collection("users")
  //           .doc(newUser.user.uid)
  //           .set(
  //             {
  //               username: fields.username,
  //             },
  //             { merge: true }
  //           );
  //       })
  //       .then(() => {
  //         return <Redirect to="/" />;
  //       })
  //       .catch(function (error) {
  //         let err = null;
  //         !error.message ? (err = { message: error }) : (err = error);
  //         setFields({
  //           ...fields,
  //           errors: {
  //             fire: err,
  //           },
  //         });
  //       });
  //   };

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
          <h1>Register</h1>
          <FormErrors formerrors={fields.errors} />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Username"
                  value={fields.username}
                  onChange={onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={fields.email}
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
                  value={fields.password}
                  onChange={onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={fields.confirmpassword}
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
                <button className="button is-dark">Register</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
