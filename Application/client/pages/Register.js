import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import RegisterForm from "_forms/RegisterForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/"));
    }
  }, []);

  return (
    <div className="register-page page">
      <section className="register-section">
        <RegisterForm />
      </section>
    </div>
  );
}
