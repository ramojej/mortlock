import React from "react"
import ProjectsContext from "./src/context/ProjectsContext"

import "./src/assets/scss/global.scss"

export const wrapRootElement = ({ element }) => (
  <ProjectsContext>{element}</ProjectsContext>
)
