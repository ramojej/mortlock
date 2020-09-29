import React from "react"
import ProjectsContext from "./src/context/ProjectsContext"

export const wrapRootElement = ({ element }) => (
  <ProjectsContext>{element}</ProjectsContext>
)
