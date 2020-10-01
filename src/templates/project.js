import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Slider from "react-slick"

import SEO from "../components/seo"

import Layout from "../components/layout"
import Banner from "../components/global/banner"

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <button className={className} onClick={onClick}>
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
  )
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <button className={className} onClick={onClick}>
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
  )
}

const Project = ({ ...props }) => {
  const [playVideo, setPlayVideo] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(1)
  const carouselRef = useRef(null)

  useEffect(() => {
    carouselRef.current.slickGoTo(selectedIndex)
  }, [selectedIndex])

  const setGalleryIndex = (num, title) => {
    togglePopupOverlay()
  }

  const togglePopupOverlay = num => {
    setSelectedIndex(num)
    document.body.classList.toggle("popup__active")
  }

  const pageData = props.data.wordpressWpProject

  const bannerContent = {
    banner_image: pageData.acf.project_banner_image,
    banner_image_overlay: pageData.acf.project_banner_image_overlay,
    banner_heading: pageData.acf.project_banner_heading,
    banner_description: pageData.acf.project_banner_description,
    banner_buttons: pageData.acf.project_banner_buttons,
    banner_type: "project",
  }

  const funPlayVideo = () => {
    setPlayVideo(true)
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: selectedIndex,
  }

  return (
    <Layout>
      <SEO description={pageData.yoast.metadesc} title={pageData.yoast.title} />
      <Banner data={bannerContent} />
      <div className="project__detail">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              {pageData.acf.about_heading ||
              pageData.acf.about_heading === undefined ? (
                <h2
                  className="project_heading"
                  data-sal="slide-up"
                  data-sal-easing="ease"
                  data-sal-delay="5"
                  dangerouslySetInnerHTML={{
                    __html: pageData.acf.about_heading,
                  }}
                />
              ) : null}
            </div>
            <div className="col-sm-8">
              {pageData.acf.about_description ? (
                <div
                  className="project_content"
                  dangerouslySetInnerHTML={{
                    __html: pageData.acf.about_description,
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="project_infos">
            <div className="row">
              {pageData.acf.project_info.map((info, index) =>
                index < 1 ? (
                  <div
                    className="col-sm-4"
                    data-sal="slide-up"
                    data-sal-easing="ease"
                    data-sal-delay="5"
                    key={index}
                  >
                    <span className="project__info">
                      <span className="title">{info.info_title}</span>
                      <span className="info">{info.info_description}</span>
                    </span>
                  </div>
                ) : null
              )}
              <div className="col-sm-8">
                <div className="row">
                  {pageData.acf.project_info.map((info, index) =>
                    index >= 1 ? (
                      <div
                        className="col-sm-4"
                        data-sal="slide-up"
                        data-sal-easing="ease"
                        data-sal-delay="5"
                        key={index}
                      >
                        <span className="project__info">
                          <span className="title">{info.info_title}</span>
                          <span className="info">{info.info_description}</span>
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
          {pageData.acf.this_project_has_video && (
            <div
              className={
                playVideo ? "video__wrapper video--playing" : "video__wrapper"
              }
            >
              {playVideo && pageData.acf.project_video_iframe_code ? (
                <div
                  className="video__content"
                  dangerouslySetInnerHTML={{
                    __html: pageData.acf.project_video_iframe_code,
                  }}
                />
              ) : null}
              <div className="video__play">
                <div
                  className="text__wrap"
                  role="button"
                  tabIndex={0}
                  onClick={() => funPlayVideo()}
                  onKeyDown={() => funPlayVideo()}
                >
                  <svg
                    className="icon"
                    width="100pt"
                    height="100pt"
                    version="1.1"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m50 9c-22.633 0-41 18.367-41 41s18.367 41 41 41 41-18.367 41-41-18.367-41-41-41zm0 2c21.551 0 39 17.449 39 39s-17.449 39-39 39-39-17.449-39-39 17.449-39 39-39zm-10.625 18.969c-0.94531 0.019531-1.8672 0.28125-2.6562 0.75-1.5742 0.93359-2.6719 2.6836-2.7188 4.7812v28.906c0.046875 2.0977 1.1445 3.8398 2.7188 4.7812s3.6484 1.0664 5.5 0.0625l25-14.5c1.6484-0.95703 2.7812-2.7539 2.7812-4.8125s-1.1328-3.8242-2.7812-4.7812c-8.2266-4.9883-16.805-9.582-25-14.5-0.91797-0.51172-1.957-0.69922-2.8438-0.6875zm0.125 1.9688c0.54688 0.011719 1.1016 0.1875 1.75 0.5l24.969 14.438c1.0703 0.62109 1.7812 1.7305 1.7812 3.0625s-0.71094 2.4727-1.7812 3.0938c-8.3086 4.668-16.016 9.332-25 14.469-1.2461 0.66406-2.4805 0.55859-3.4688-0.03125s-1.707-1.6719-1.75-3.0938v-28.844c0.03125-1.4414 0.75391-2.5039 1.75-3.0938 0.66406-0.35156 1.2031-0.50781 1.75-0.5z" />
                  </svg>
                  <span className="text">Play Video</span>
                </div>
              </div>
              {pageData.acf.project_video_image ? (
                <BackgroundImage
                  className="bg__image"
                  fluid={
                    pageData.acf.project_video_image.localFile.childImageSharp
                      .fluid
                  }
                  alt="Mortlock Timber"
                />
              ) : null}
            </div>
          )}
          <div className="spec__wrapper">
            <div className="row">
              <div className="col-sm-5">
                <div className="spec__image">
                  {pageData.acf.specification_image ? (
                    <Img
                      fluid={
                        pageData.acf.specification_image.localFile
                          .childImageSharp.fluid
                      }
                      alt="Mortlock Timber"
                    />
                  ) : null}
                </div>
              </div>
              <div className="col-sm-7">
                <div
                  className="spec__column"
                  data-sal="slide-up"
                  data-sal-easing="ease"
                  data-sal-delay="5"
                >
                  <h2>{pageData.acf.specification_heading}</h2>
                  <div
                    className="spec__box"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="gallery__wrapper">
            <h2>Gallery</h2>
            <div className="galley__image">
              {pageData.acf.gallery_images
                ? pageData.acf.gallery_images.map((image, index) => (
                    <div
                      className="image"
                      tabIndex={0}
                      role="button"
                      key={index}
                      onClick={() => togglePopupOverlay(index)}
                      onKeyDown={() => togglePopupOverlay(index)}
                    >
                      <span className="expand_icon">
                        <svg
                          className="icon"
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m99.93 2.9219c-0.023438-0.10547-0.0625-0.20703-0.09375-0.30859-0.035157-0.125-0.066407-0.24609-0.11328-0.36719-0.050781-0.12109-0.12109-0.23438-0.18359-0.35156-0.050781-0.089843-0.089843-0.18359-0.15234-0.27344-0.26562-0.39844-0.60547-0.74219-1.0078-1.0078-0.089844-0.0625-0.19141-0.10547-0.28516-0.15625-0.11328-0.0625-0.21875-0.12891-0.33984-0.17969-0.12109-0.050782-0.24609-0.078125-0.37109-0.11719-0.10156-0.027344-0.19922-0.066406-0.30469-0.089844-0.23438-0.042969-0.47656-0.070312-0.71484-0.070312h-21.816c-2.0078 0-3.6367 1.6289-3.6367 3.6367 0 2.0078 1.6289 3.6367 3.6367 3.6367h13.039l-26.52 26.52c-1.4219 1.418-1.4219 3.7227 0 5.1406 0.70703 0.71094 1.6406 1.0664 2.5703 1.0664 0.92969 0 1.8633-0.35547 2.5703-1.0664l26.52-26.52v13.039c0 2.0078 1.6289 3.6367 3.6367 3.6367 2.0078 0 3.6367-1.6289 3.6367-3.6367v-21.816c0-0.23828-0.027344-0.47656-0.070312-0.71484" />
                          <path d="m33.793 61.066l-26.52 26.52v-13.039c0-2.0078-1.6289-3.6367-3.6367-3.6367-2.0078 0-3.6367 1.6289-3.6367 3.6367v21.816c0 0.23828 0.027344 0.47656 0.074219 0.71484 0.019531 0.10547 0.058593 0.20703 0.089843 0.30859 0.035157 0.125 0.066407 0.24609 0.11328 0.36719 0.050781 0.12109 0.12109 0.23438 0.18359 0.34766 0.050781 0.09375 0.089843 0.1875 0.15234 0.27734 0.26562 0.39844 0.60547 0.74219 1.0078 1.0078 0.089844 0.0625 0.1875 0.10156 0.28125 0.15234 0.11328 0.0625 0.22266 0.13281 0.34375 0.18359 0.12109 0.046875 0.24609 0.078125 0.36719 0.11328 0.10547 0.03125 0.20312 0.070312 0.30859 0.089843 0.23828 0.046875 0.47656 0.074219 0.71484 0.074219h21.816c2.0078 0 3.6367-1.6289 3.6367-3.6367 0-2.0078-1.6289-3.6367-3.6367-3.6367h-13.039l26.52-26.52c1.4219-1.418 1.4219-3.7227 0-5.1406-1.418-1.4219-3.7227-1.4219-5.1406 0" />
                          <path d="m3.6367 29.09c2.0078 0 3.6367-1.6289 3.6367-3.6367v-13.039l26.516 26.52c0.71094 0.70703 1.6406 1.0625 2.5742 1.0625 0.92578 0 1.8594-0.35547 2.5703-1.0625 1.418-1.4219 1.418-3.7227 0-5.1445l-26.52-26.516h13.039c2.0078 0 3.6367-1.6289 3.6367-3.6367 0-2.0078-1.6289-3.6367-3.6367-3.6367h-21.816c-0.23828 0-0.47656 0.027344-0.71484 0.070312-0.10547 0.023438-0.20312 0.0625-0.30469 0.089844-0.125 0.039063-0.25 0.066406-0.37109 0.11719-0.12109 0.050781-0.22656 0.11719-0.33984 0.17969-0.097656 0.050781-0.19531 0.09375-0.28516 0.15625-0.40234 0.26562-0.74219 0.60938-1.0078 1.0078-0.0625 0.089844-0.10156 0.18359-0.15234 0.27344-0.0625 0.11719-0.13281 0.23047-0.18359 0.35156-0.046875 0.12109-0.078125 0.24219-0.11328 0.36719-0.03125 0.10156-0.070312 0.20312-0.089843 0.30859-0.046875 0.23828-0.074219 0.47656-0.074219 0.71484v21.816c0 2.0078 1.6289 3.6367 3.6367 3.6367" />
                          <path d="m96.363 70.91c-2.0078 0-3.6367 1.6289-3.6367 3.6367v13.039l-26.52-26.523c-1.418-1.418-3.7227-1.418-5.1445 0-1.418 1.4219-1.418 3.7266 0 5.1445l26.523 26.52h-13.039c-2.0078 0-3.6367 1.6289-3.6367 3.6367 0 2.0078 1.6289 3.6367 3.6367 3.6367h21.816c0.23828 0 0.47656-0.027344 0.71484-0.074219 0.10547-0.019531 0.20312-0.058593 0.30859-0.089843 0.12109-0.035157 0.24609-0.066407 0.36719-0.11328 0.12109-0.050781 0.23047-0.12109 0.34375-0.18359 0.09375-0.050781 0.19141-0.089843 0.28125-0.15234 0.40234-0.26562 0.74219-0.60938 1.0078-1.0078 0.0625-0.089844 0.10156-0.18359 0.15234-0.27734 0.0625-0.11328 0.13281-0.22656 0.18359-0.34766 0.046875-0.12109 0.078125-0.24219 0.11328-0.36719 0.03125-0.10156 0.070312-0.20312 0.09375-0.30859 0.042968-0.23828 0.070312-0.47656 0.070312-0.71484v-21.816c0-2.0078-1.6289-3.6367-3.6367-3.6367" />
                        </svg>
                      </span>
                      <img
                        src={image.gallery_image.link}
                        alt="Mortlock Timber"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="popup__wrapper gallery--popup">
        <button
          className="popup__close"
          onClick={() => setGalleryIndex()}
          onKeyDown={() => setGalleryIndex()}
        >
          <span className="text">Close</span>
          <svg
            className="icon"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m54.168 50 32.477-32.582c1.125-1.1523 1.1016-2.9922-0.050781-4.1172-1.1523-1.1211-2.9922-1.0977-4.1133 0.054688l-32.48 32.477-32.582-32.477c-1.1367-1.0469-2.8906-1.0117-3.9844 0.078125-1.0898 1.0938-1.125 2.8477-0.078125 3.9844l32.477 32.582-32.477 32.582c-0.58203 0.53906-0.91406 1.293-0.91406 2.0859 0 0.78906 0.33203 1.5469 0.91406 2.082 0.53125 0.54688 1.2656 0.85938 2.0312 0.85938s1.4961-0.3125 2.0312-0.85938l32.582-32.582 32.582 32.477c0.53906 0.58203 1.293 0.91406 2.0859 0.91406 0.78906 0 1.5469-0.33203 2.082-0.91406 0.58203-0.53516 0.91406-1.2891 0.91406-2.082s-0.33203-1.5469-0.91406-2.082z" />
          </svg>
        </button>
        <div className="container">
          <div className="popup__content">
            <Slider
              className="gallery__slider"
              {...sliderSettings}
              ref={carouselRef}
            >
              {pageData.acf.gallery_images
                ? pageData.acf.gallery_images.map((image, index) => (
                    <div className="image" key={index}>
                      <img
                        src={image.gallery_image.link}
                        alt="Mortlock Timber"
                      />
                    </div>
                  ))
                : null}
            </Slider>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query($id: String!) {
    wordpressWpProject(id: { eq: $id }) {
      yoast {
        title
        metadesc
      }
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      acf {
        project_banner_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        project_banner_image_overlay
        project_banner_heading
        project_banner_description
        project_banner_buttons {
          button_text
          button_link
          button_style
        }
        about_heading
        this_project_has_video
        about_description
        gallery_images {
          gallery_image {
            link
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        project_info {
          info_title
          info_description
        }
        project_video_image {
          link
          localFile {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        project_video_iframe_code
        specification_heading
        specification_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
