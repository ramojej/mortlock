import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import BGImage from "gatsby-background-image"
import Slider from "react-slick"

const GlobalProjectSlider = ({ ...props }) => {
  const content = props.contentData

  const customSlider = React.createRef()

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const gotoNext = () => {
    customSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
  }

  return (
    <div className="project__block">
      <div
        className="container"
        data-sal="slide-up"
        data-sal-easing="ease"
        data-sal-delay="5"
      >
        <h2>latest projects</h2>
        <Slider
          className="project__slider"
          ref={customSlider}
          {...sliderSettings}
        >
          {content.map(project => (
            <div className="slide" key={project.node.wordpress_id}>
              <div className="project__box">
                <div className="project_image">
                  <Link to={project.node.path}>
                    {project.node.featured_media && (
                      <BGImage
                        className="bg__image"
                        fluid={
                          project.node.featured_media.localFile.childImageSharp
                            .fluid
                        }
                      >
                        <Img
                          fluid={
                            project.node.featured_media.localFile
                              .childImageSharp.fluid
                          }
                          alt="Mortlock Timber"
                        />
                      </BGImage>
                    )}
                  </Link>
                </div>
                <div className="project_text">
                  <span className="project_title">
                    <Link
                      to={project.node.path}
                      dangerouslySetInnerHTML={{ __html: project.node.title }}
                    />
                  </span>
                </div>
                <div className="control_wrapper">
                  <button
                    className="slick-arrow slick-prev"
                    onClick={() => gotoPrev()}
                  >
                    <span className="text">Prev</span>
                    <svg
                      className="icon"
                      width="100pt"
                      height="100pt"
                      version="1.1"
                      viewBox="0 0 100 100"
                    >
                      <path d="m87.5 45.832h-58.75l17.918-17.914-5.8359-5.8359-27.914 27.918 27.914 27.918 5.8359-5.8359-17.918-17.914h58.75z" />
                    </svg>
                  </button>
                  <button
                    className="slick-arrow slick-next"
                    onClick={() => gotoNext()}
                  >
                    <span className="text">Next</span>
                    <svg
                      className="icon"
                      width="100pt"
                      height="100pt"
                      version="1.1"
                      viewBox="0 0 100 100"
                    >
                      <path d="m12.5 45.832h64.582v8.332h-64.582z" />
                      <path d="m59.168 77.918l-5.8359-5.8359 22.086-22.082-22.086-22.082 5.8359-5.8359 27.914 27.918z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="button_wrapper">
          <Link to="/portfolio" className="button-learn white">
            View all projects{" "}
            <span className="btnArrow">
              <svg
                className="icon"
                width="100pt"
                height="100pt"
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m32.812 0l-15.625 15.625 34.375 34.375-34.375 34.375 15.625 15.625 50-50z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GlobalProjectSlider
