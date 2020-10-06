import React from "react"
import { Link } from "gatsby"
import Slider from "react-slick"

import GatsbyImage from "gatsby-image"

const GlobalNewsSlider = ({ ...props }) => {
  const content = props.contentData
  const customSlider = React.createRef()

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  }

  const gotoNext = () => {
    customSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
  }

  return (
    <div className="news__block">
      <div
        className="container"
        data-sal="slide-up"
        data-sal-easing="ease"
        data-sal-delay="5"
      >
        <h2>latest from us</h2>
        <Slider className="news__slider" ref={customSlider} {...sliderSettings}>
          {content.map(article => (
            <div className="slide" key={article.node.wordpress_id}>
              <div className="article">
                <span className="article__date">{article.node.date}</span>
                <div className="news_image">
                  <Link to={article.node.path}>
                    <GatsbyImage
                      className="bg__image"
                      fluid={
                        article.node.featured_media.localFile.childImageSharp
                          .fluid
                      }
                      alt="Latest News"
                    />
                  </Link>
                </div>
                <div className="article_text">
                  <h3>
                    <Link to={article.node.path}>{article.node.title}</Link>
                  </h3>
                  {(() => {
                    const regex = /(<([^>]+)>)/gi
                    var removeHTMLtags =
                      article.node.excerpt
                        .replace(regex, "")
                        .substring(0, 150) + "..."
                    return (
                      <p dangerouslySetInnerHTML={{ __html: removeHTMLtags }} />
                    )
                  })()}
                  <Link to={article.node.path} className="read-more">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="bottom-control">
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
          <span className="link">
            <Link to="/news">view all</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default GlobalNewsSlider
