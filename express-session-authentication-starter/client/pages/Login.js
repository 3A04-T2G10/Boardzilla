import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Section from "react-bulma-companion/lib/Section";

import LoginForm from "_forms/LoginForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/home"));
    }
  }, []);

  return (
    <div className="login-page page">
      <Section className="login-section">
        <LoginForm />
      </Section>
    </div>
  );
}
