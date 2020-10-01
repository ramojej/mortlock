import React, { useContext, useState } from "react"
import { graphql, Link } from "gatsby"
import BGImage from "gatsby-background-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ProjectContext } from "../context/ProjectsContext"

const Page = props => {
  //initiating the arrays
  let projectCategories = props.data.allWordpressWpProjectCategory.edges
  //console.log(projectCategories)

  const { projects } = useContext(ProjectContext)
  //console.log(projects)

  const content = props
  const page = props.data.allWordpressPage
  let products = []
  let productTypes = []
  let projectTypes = []
  const [activeFilter, setActiveFilter] = useState(false)
  const [filterCategories, setFilterCategories] = useState([]) //contains categories ids that needs to be filtered
  const [filtering, setFiltering] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState([])

  //causes too many rerenders
  // projectCategories.forEach(category => {
  //   if (category.node.slug.includes("product-type"))
  //     setProductTypes(productTypes => [...productTypes, category.node])
  //   else if (category.node.slug.includes("timber"))
  //     setProjectTypes(projectTypes => [...projectTypes, category.node])
  //   else setProducts(products => [...products, category.node])
  // })

  projectCategories.forEach(category => {
    if (category.node.slug.includes("product-type"))
      productTypes.push(category.node)
    else if (category.node.slug.includes("timber"))
      projectTypes.push(category.node)
    else products.push(category.node)
  })

  const newProductTypes = [
    ...productTypes.filter(item => !item.name.includes("Other")),
    productTypes.find(item => item.name.includes("Other")),
  ]

  const newProjectTypes = [
    ...projectTypes.filter(item => !item.name.includes("Other")),
    projectTypes.find(item => item.name.includes("Other")),
  ]

  const newProducts = [
    ...products.filter(item => !item.name.includes("Other")),
    products.find(item => item.name.includes("Other")),
  ]

  const toggleVisibility = () => {
    setActiveFilter(!activeFilter)
  }

  const handleCheck = e => {
    let newfilterCategories = filterCategories
    let id = e.target.id
    setFiltering(true)

    //---Update the category Array (filterCategories)
    if (e.target.checked) {
      //checking the box
      newfilterCategories.push(parseInt(id))
      setFiltering(true)
    } else {
      //unchecking the box
      newfilterCategories = newfilterCategories.filter(
        categoryId => categoryId !== parseInt(id)
      )
      if (newfilterCategories.length === 0) setFiltering(false)
    }

    //---Update the projects Array (filtered)
    let filterd = [] //reset
    let allProjects = projects.allWordpressWpProject.edges
    //console.log(allProjects)

    allProjects.forEach(project => {
      //filter the projects according to the filterCategories array
      if (
        project.node.project_category.some(id => {
          return newfilterCategories.indexOf(id) === -1 ? false : true
        })
      )
        if (filterd.indexOf(project.node) === -1) filterd.push(project.node) //add the project to filterd array //no duplicates are allowed
    })

    setFilterCategories(newfilterCategories)
    setFilteredProjects(filterd)
  }

  const paginationStyle = {
    display: "none",
  }

  return (
    <Layout>
      <SEO
        description={page.edges[0].node.yoast.metadesc}
        title={page.edges[0].node.yoast.title}
      />
      <div className="blog__wrapper">
        <div className="container">
          <div className="blog__heading">
            <h1>Projects</h1>
            <div className="article__metas">
              <span
                role="button"
                tabIndex={0}
                className="filter__button"
                onKeyDown={toggleVisibility}
                onClick={toggleVisibility}
              >
                {!activeFilter ? (
                  <span>
                    Show Filters <i>+</i>
                  </span>
                ) : (
                  <span>
                    Hide Filters <i>-</i>
                  </span>
                )}{" "}
              </span>
            </div>
            <div
              className={
                activeFilter
                  ? "head_filter__content filter--active"
                  : "head_filter__content"
              }
            >
              <div className="row aside">
                <div className="col-sm-4">
                  <span className="title">Application</span>
                  <ul className="list">
                    {newProducts.map(product => (
                      <li key={product.id}>
                        <label
                          className="custom-check"
                          htmlFor={product.wordpress_id}
                        >
                          <input
                            role="button"
                            type="checkbox"
                            aria-label={product.name}
                            id={product.wordpress_id}
                            name={product.id}
                            onChange={handleCheck}
                          />
                          <span className="custom-text">{product.name}</span>
                          <span className="custom-box"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-sm-4">
                  <span className="title">Product</span>
                  <ul className="list">
                    {newProductTypes.map(product => (
                      <li key={product.id}>
                        <label
                          className="custom-check"
                          htmlFor={product.wordpress_id}
                        >
                          <input
                            type="checkbox"
                            id={product.wordpress_id}
                            aria-label={product.name}
                            name={product.name}
                            onChange={handleCheck}
                          />
                          <span className="custom-text">{product.name}</span>
                          <span className="custom-box"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-sm-4">
                  <span className="title">Timber Species</span>
                  <ul className="list">
                    {newProjectTypes.map(product => (
                      <li key={product.name}>
                        <label
                          className="custom-check"
                          htmlFor={product.wordpress_id}
                        >
                          <input
                            type="checkbox"
                            id={product.wordpress_id}
                            aria-label={product.name}
                            name={product.name}
                            onChange={handleCheck}
                          />
                          <span className="custom-text">{product.name}</span>
                          <span className="custom-box"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="project__wrapper">
            <div className="project__content">
              <div className="row">
                {/* do not apply filter if this.state.filtering is false */}
                {!filtering
                  ? content.data.allWordpressWpProject.edges.map(post => (
                      <div className="col-sm-6" key={post.node.wordpress_id}>
                        <div className="project_article">
                          <div className="blog_image">
                            {post.node.featured_media && (
                              <BGImage
                                className="bg_image"
                                fluid={
                                  post.node.featured_media.localFile
                                    .childImageSharp.fluid
                                }
                              ></BGImage>
                            )}
                            <div className="image_overlay">
                              <Link
                                className="button primary"
                                to={post.node.path}
                              >
                                View Project
                              </Link>
                            </div>
                          </div>
                          <div className="project_desc">
                            <h3>
                              <Link
                                to={post.node.path}
                                dangerouslySetInnerHTML={{
                                  __html: post.node.title,
                                }}
                              />
                            </h3>
                            <span
                              className="location"
                              dangerouslySetInnerHTML={{
                                __html:
                                  post.node.acf.project_banner_description,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : //DO apply filter if this.state.filtering is true
                    filteredProjects.map(post => (
                      <div className="col-sm-6" key={post.id}>
                        <div className="project_article">
                          <div className="blog_image">
                            {post.featured_media && (
                              <BGImage
                                className="bg_image"
                                fluid={
                                  post.featured_media.localFile.childImageSharp
                                    .fluid
                                }
                              ></BGImage>
                            )}
                            <div className="image_overlay">
                              <Link className="button primary" to={post.path}>
                                View Project
                              </Link>
                            </div>
                          </div>
                          <div className="project_desc">
                            <h3>
                              <Link to={post.path}>{post.title}</Link>
                            </h3>
                            {/* <span className="location">
                                  {post.node.acf.project_banner_description}
                                </span> */}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="pagination" style={filtering ? paginationStyle : {}}>
            <span className="title">Pages</span>
            <ul className="pages">
              {Array.from({
                length: content.pageContext.numberOfProjects,
              }).map((page, index) => (
                <li
                  key={index}
                  className={
                    index + 1 === content.pageContext.currentPage
                      ? "active"
                      : null
                  }
                >
                  <Link
                    to={
                      index === 0
                        ? content.pageContext.actualPath
                        : `${content.pageContext.actualPath}${index + 1}`
                    }
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allWordpressWpProject(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          featured_media {
            alt_text
            link
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          slug
          path
          project_category
          wordpress_id
          acf {
            project_banner_description
          }
          yoast {
            title
            metadesc
          }
        }
      }
    }

    allWordpressPage(
      filter: { template: { eq: "template-portfolio-parent.php" } }
    ) {
      edges {
        node {
          yoast {
            title
            metadesc
          }
        }
      }
    }

    allWordpressWpProjectCategory {
      edges {
        node {
          id
          name
          wordpress_id
          slug
        }
      }
    }
  }
`
