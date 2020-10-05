import React, { useState } from "react"
import Slider from "react-slick"
import { GatsbyImage } from "@wardpeet/gatsby-image-nextgen/compat"

import Button from "./button"

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

const Banner = ({ ...props }) => {
  const bannerContent = props.data

  var bannerType = ""

  const [count, setCount] = useState(1)

  if (props.type === "homepage") {
    bannerType = "homepage"
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current, next) => {
      setCount(current + 1)
    },
  }

  if (bannerContent !== undefined && bannerType === "homepage") {
    return (
      <div className="banner">
        <Slider className="banner__slider" {...sliderSettings}>
          {bannerContent
            ? bannerContent.map((slide, index) => (
                <div className="slide" key={index}>
                  <div className="bg__image has-overlay">
                    {slide.slider_banner_image ? (
                      <GatsbyImage
                        fluid={
                          slide.slider_banner_image.localFile.childImageSharp
                            .fluid
                        }
                        layout="responsive"
                        alt="Mortlock Timber"
                      />
                    ) : null}
                  </div>
                  <div className="container container__big">
                    <div
                      className="banner__text"
                      data-sal="slide-up"
                      data-sal-easing="ease"
                      data-sal-delay="100"
                    >
                      <div className="bottomtext__top">
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: slide.slider_banner_heading,
                          }}
                        />
                        <span className="bannerCounter">
                          <span className="activeNum">0{count}</span>
                          <span className="bar">/</span>0{bannerContent.length}
                        </span>
                      </div>
                      <div className="bottomtext__bottom">
                        <span
                          className="banner__smalltext"
                          dangerouslySetInnerHTML={{
                            __html: slide.slider_banner_sub_heading,
                          }}
                        />
                      </div>
                      <div className="mobile__button">
                        <Button
                          link={slide.slider_banner_button_link}
                          text={slide.slider_banner_button_text}
                          style={slide.slider_banner_button_style}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </Slider>
      </div>
    )
  } else if (bannerContent !== undefined) {
    return (
      <div
        className={
          bannerContent.banner_type
            ? `inner__banner ${bannerContent.banner_type}`
            : "inner__banner"
        }
      >
        <div className="bg__image has-overlay">
          {bannerContent.banner_image ? (
            <GatsbyImage
              fluid={bannerContent.banner_image.localFile.childImageSharp.fluid}
              layout="responsive"
              alt="banner"
            />
          ) : null}
        </div>
        <div className="container">
          <div
            className="inner__bannerbox"
            data-sal="slide-up"
            data-sal-easing="ease"
            data-sal-delay="5"
          >
            <div className="box">
              <h1
                className={
                  !bannerContent.banner_description ? "text-center" : null
                }
                dangerouslySetInnerHTML={{
                  __html: bannerContent.banner_heading,
                }}
              />
              {bannerContent.banner_description ? (
                <span
                  className="inner__bannertext"
                  dangerouslySetInnerHTML={{
                    __html: bannerContent.banner_description,
                  }}
                />
              ) : null}
              {bannerContent.banner_buttons ? (
                <div className="inner__bannerbuttons">
                  {bannerContent.banner_buttons.map((button, index) =>
                    index === 1 ? (
                      <Button
                        type="external"
                        link={button.button_link}
                        text={button.button_text}
                        style={button.button_style}
                        key={index}
                      />
                    ) : (
                      <Button
                        link={button.button_link}
                        text={button.button_text}
                        style={button.button_style}
                        key={index}
                      />
                    )
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Banner
