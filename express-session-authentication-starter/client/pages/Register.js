import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Section from "react-bulma-companion/lib/Section";

import RegisterForm from "_forms/RegisterForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/home"));
    }
  }, []);

  return (
    <div className="register-page page">
      <Section className="register-section">
        <RegisterForm />
      </Section>
    </div>
  );
}
