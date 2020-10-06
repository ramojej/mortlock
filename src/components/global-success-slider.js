import React, { useState } from "react"
import Slider from "react-slick"

import GatsbyImage from "gatsby-image"

const GlobalSuccessStory = ({ ...props }) => {
  const content = props.contentData
  const customSlider = React.createRef()

  const [playVideo, setPlayVideo] = useState(false)
  const [slideIndex, setSlideIndex] = useState()

  const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    infinite: false,
  }

  const gotoNext = () => {
    customSlider.current.slickNext()
    setPlayVideo(false)
    setSlideIndex()
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
    setPlayVideo(false)
    setSlideIndex()
  }

  const funPlayVideo = index => {
    setPlayVideo(true)
    setSlideIndex(index)
  }

  return (
    <div
      className="success__block"
      data-sal="slide-up"
      data-sal-easing="ease"
      data-sal-delay="5"
    >
      <Slider
        className="success__slider"
        ref={customSlider}
        {...sliderSettings}
      >
        {content.successStories.map((success, index) => (
          <div className="slide" key={index}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div
                    className={
                      playVideo && slideIndex === index
                        ? "videoWrapper video--playing"
                        : "videoWrapper"
                    }
                  >
                    {playVideo && slideIndex === index ? (
                      <div
                        data-id={index}
                        className="video__content"
                        dangerouslySetInnerHTML={{ __html: success.video_link }}
                      />
                    ) : null}
                    <div className="video__play">
                      <div
                        className="text__wrap"
                        data-id={index}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => funPlayVideo(index)}
                        onClick={event => funPlayVideo(index)}
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
                    <GatsbyImage
                      className="bg__image"
                      alt="success"
                      fluid={
                        success.video_thumbnail.localFile.childImageSharp.fluid
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="successText">
                    <h2>{content.successTitle}</h2>
                    <blockquote className="quote">
                      <q>{success.success_client_quote}</q>
                      <cite>
                        - {success.success_client_name},{" "}
                        {success.success_client_position__title}
                      </cite>
                    </blockquote>
                    <div className="control_wrapper">
                      <button
                        className="slick-arrow slick-prev"
                        onKeyDown={() => gotoPrev()}
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
                        onKeyDown={() => gotoNext()}
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
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default GlobalSuccessStory
