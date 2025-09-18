import React from "react";
import Navigation from './Navigation'

function Layout({ children }) {
  return (
    <>
      <Navigation/>
      <div>{children}</div>
    </>
  );
}

export default Layout;
