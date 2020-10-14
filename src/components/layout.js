import React from "react"

import Header from "./layout-header"
import Footer from "./layout-footer"

const Layout = ({ children, ...props }) => (
  <div id="wrapper">
    <Header color={props.headerColor} />
    <main id="main">{children}</main>
    <Footer />
  </div>
)

export default Layout
