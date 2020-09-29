import React, { createContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

export const ProjectContext = createContext({
  projects: [],
})

export default props => {
  const projects = useStaticQuery(query)
  return (
    <ProjectContext.Provider value={{ projects }}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export const query = graphql`
  query {
    allWordpressWpProject {
      edges {
        node {
          featured_media {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          title
          project_category
          id
          path
        }
      }
    }
  }
`
