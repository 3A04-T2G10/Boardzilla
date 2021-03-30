import React from "react";

export default function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Boardzilla</strong> by{" "}
          <a href="https://github.com/3A04-T2G10">Tutorial 2, Group 10</a>. The
          source code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
          {` Copyright Ⓒ ${year} Boardzilla. All Rights Reserved.`}
        </p>
      </div>
    </footer>
  );
}
