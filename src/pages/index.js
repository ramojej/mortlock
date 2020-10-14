import React, { useRef } from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"

import Layout from "../components/layout"
import Banner from "../components/global/banner"
import GeneralText from "../components/general-text"
import GlobalNewsSlider from "../components/global-news-slider"
import GlobalTestimonialSlider from "../components/global-testimonial-slider"
import GlobalSuccessStory from "../components/global-success-slider"
import GlobalProjectSlider from "../components/global-projects-slider"
import { useHasBeenVisible } from "../hooks/useVisibility"

const IndexPage = props => {
  const { data } = props

  const halfPage = useRef()
  const preload = useRef()
  const hasScrolled = useHasBeenVisible(halfPage)
  const isScrolling = useHasBeenVisible(preload)

  const bannerContent =
    data.allWordpressPage.edges[0].node.acf.banner_home_slider

  const aboutContent = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_about_image,
    description: data.allWordpressPage.edges[0].node.acf.about_description,
    image: data.allWordpressPage.edges[0].node.acf.about_image,
    buttonText: data.allWordpressPage.edges[0].node.acf.about_button_text,
    buttonLink: data.allWordpressPage.edges[0].node.acf.about_button_link,
    showButton:
      data.allWordpressPage.edges[0].node.acf
        .show_button_under_about_description,
  }
  const imageBlock = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_main_image,
    description: data.allWordpressPage.edges[0].node.acf.general_description,
    image: data.allWordpressPage.edges[0].node.acf.main_image,
  }

  const pricingBlock = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_pricing_image,
    description: data.allWordpressPage.edges[0].node.acf.pricing_description,
    image: data.allWordpressPage.edges[0].node.acf.pricing_image,
    buttonText: data.allWordpressPage.edges[0].node.acf.pricing_button_text,
    buttonLink: data.allWordpressPage.edges[0].node.acf.pricing_button_link,
    showButton:
      data.allWordpressPage.edges[0].node.acf
        .show_button_under_pricing_description,
  }

  const timberDecking = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_decking_image,
    description: data.allWordpressPage.edges[0].node.acf.decking_description,
    image: data.allWordpressPage.edges[0].node.acf.decking_image,
    buttonText: data.allWordpressPage.edges[0].node.acf.decking_button_text,
    buttonLink: data.allWordpressPage.edges[0].node.acf.decking_button_link,
    showButton:
      data.allWordpressPage.edges[0].node.acf
        .show_button_under_decking_description,
  }

  const timberWalls = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_walls_image,
    description: data.allWordpressPage.edges[0].node.acf.walls_description,
    image: data.allWordpressPage.edges[0].node.acf.walls_image,
    buttonText: data.allWordpressPage.edges[0].node.acf.wall_button_text,
    buttonLink: data.allWordpressPage.edges[0].node.acf.wall_button_link,
    showButton:
      data.allWordpressPage.edges[0].node.acf
        .show_button_under_wall_description,
  }

  const timberCeilings = {
    alignImage: data.allWordpressPage.edges[0].node.acf.align_image,
    description: data.allWordpressPage.edges[0].node.acf.ceilings_description,
    image: data.allWordpressPage.edges[0].node.acf.ceilings_image,
    buttonText: data.allWordpressPage.edges[0].node.acf.button_text,
    buttonLink: data.allWordpressPage.edges[0].node.acf.button_link,
    showButton:
      data.allWordpressPage.edges[0].node.acf.show_button_under_description,
  }

  const generalContent = {
    successStory: data.allWordpressPage.edges[0].node.acf.show_success_stories,
    latestProject: data.allWordpressPage.edges[0].node.acf.show_latest_projects,
    latestArticle: data.allWordpressPage.edges[0].node.acf.show_latest_articles,
    testimonials: data.allWordpressPage.edges[0].node.acf.show_testimonials,
  }

  const latestArticles = data.allWordpressPost.edges
  const latestProjects = data.allWordpressWpProject.edges

  const latestSuccessStories = {
    successTitle:
      data.allWordpressAcfOptions.edges[0].node.options.success_stories_heading,
    successStories:
      data.allWordpressAcfOptions.edges[0].node.options.success_stories,
  }
  const latestTestomonial = {
    testimonialHeading:
      data.allWordpressAcfOptions.edges[0].node.options
        .client_testimonials_heading,
    allTestimonials:
      data.allWordpressAcfOptions.edges[0].node.options.client_testimonials,
  }

  return (
    <Layout>
      <SEO
        description={data.allWordpressPage.edges[0].node.yoast.metadesc}
        title={data.allWordpressPage.edges[0].node.yoast.title}
      />
      <Banner data={bannerContent} type="homepage" />
      <GeneralText
        contentData={aboutContent}
        animation="false"
        col1="col-sm-6 col-xlg-7"
        col2="col-sm-6 col-xlg-5"
      />

      {hasScrolled || isScrolling ? (
        <>
          <GeneralText
            contentData={imageBlock}
            col1="col-sm-6 col-xlg-5"
            col2="col-sm-6 col-xlg-7"
            addClass="range"
          />
          <GeneralText
            contentData={pricingBlock}
            col1="col-sm-6 col-xlg-7"
            col2="col-sm-6 col-xlg-5"
            addClass="pricing"
          />
          <GeneralText
            contentData={timberDecking}
            col1="col-sm-7 col-xlg-8"
            col2="col-sm-5 col-xlg-4"
            addClass="decking"
          />
          <GeneralText
            contentData={timberWalls}
            col1="col-sm-6 col-xlg-5"
            col2="col-sm-6 col-xlg-7"
            addClass="walls"
          />
          <GeneralText
            contentData={timberCeilings}
            col1="col-sm-6 col-xlg-6"
            col2="col-sm-6 col-xlg-6"
            addClass="ceilings"
          />
          <GlobalProjectSlider contentData={latestProjects} />
          <GlobalTestimonialSlider contentData={latestTestomonial} />
          <GlobalSuccessStory contentData={latestSuccessStories} />
          <GlobalNewsSlider contentData={latestArticles} />
        </>
      ) : (
        <div ref={halfPage} style={{ minHeight: "1000px" }}>
          Test
        </div>
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allWordpressPage(filter: { template: { eq: "template-homepage.php" } }) {
      edges {
        node {
          yoast {
            title
            metadesc
          }
          acf {
            banner_home_slider {
              slider_banner_button_link
              slider_banner_button_text
              slider_banner_button_style
              slider_banner_heading
              slider_banner_sub_heading
              slider_banner_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp
                      fallback: base64
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            align_about_image
            about_description
            about_button_text
            about_button_link
            show_button_under_about_description
            align_main_image
            general_description
            align_pricing_image
            pricing_description
            show_button_under_pricing_description
            pricing_button_link
            pricing_button_text
            align_decking_image
            decking_button_link
            decking_button_text
            decking_description
            show_button_under_decking_description
            align_walls_image
            walls_description
            show_button_under_wall_description
            wall_button_text
            wall_button_link
            align_image
            ceilings_description
            show_button_under_description
            button_text
            button_link
            show_success_stories
            show_latest_projects
            show_latest_articles
            show_testimonials
            about_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            main_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            pricing_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            decking_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            walls_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            ceilings_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }

    allWordpressAcfOptions {
      edges {
        node {
          options {
            client_testimonials_heading
            client_testimonials {
              client_name
              client_quote
              client_titleposition
            }
            success_stories_heading
            success_stories {
              video_thumbnail {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1000) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              video_link
              success_client_quote
              success_client_position__title
              success_client_name
            }
          }
        }
      }
    }

    allWordpressPost(limit: 3) {
      edges {
        node {
          title
          date(formatString: "DD MMMM YYYY")
          content
          wordpress_id
          type
          excerpt
          path
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }

    allWordpressWpProject(limit: 3) {
      edges {
        node {
          title
          wordpress_id
          path
          featured_media {
            link
            alt_text
            localFile {
              childImageSharp {
                fluid(maxWidth: 1350) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
