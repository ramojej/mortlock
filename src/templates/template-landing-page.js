import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import scrollTo from "gatsby-plugin-smoothscroll"

import LayoutLanding from "../components/layout-landing"
import SEO from "../components/seo"
import Button from "../components/global/button"

import LandingPageForm from "../components/forms/landing-page-form-5153"
import GlobalTestimonialSlider from "../components/global-testimonial-slider"

class Page extends Component {
  render() {
    const bannerContent = {
      banner_image: this.props.data.wordpressPage.acf.landing_page_banner_image,
      banner_image_overlay: this.props.data.wordpressPage.acf
        .landing_page_banner_image_overlay,
      banner_heading: this.props.data.wordpressPage.acf
        .landing_page_banner_heading,
      banner_description: this.props.data.wordpressPage.acf
        .landing_page_banner_subheading,
      banner_buttons: this.props.data.wordpressPage.acf
        .landing_page_banner_buttons,
    }

    const latestTestomonial = {
      testimonialHeading: this.props.data.allWordpressAcfOptions.edges[0].node
        .options.client_testimonials_heading,
      allTestimonials: this.props.data.allWordpressAcfOptions.edges[0].node
        .options.client_testimonials,
    }
    const product_features = this.props.data.wordpressPage.acf.product_features

    return (
      <LayoutLanding>
        <SEO
          description={
            this.props.data.wordpressPage.yoast.metadesc
              ? this.props.data.wordpressPage.yoast.metadesc
              : null
          }
          title={
            this.props.data.wordpressPage.yoast.title
              ? this.props.data.wordpressPage.yoast.title
              : "Mortlock Timber"
          }
        />
        <div className="inner__banner large">
          <div className="bg__image has-overlay">
            {bannerContent.banner_image ? (
              <Img
                fluid={
                  bannerContent.banner_image.localFile.childImageSharp.fluid
                }
              />
            ) : null}
          </div>
          <div className="container">
            <div className="inner__bannerbox">
              <div
                className="box"
                data-sal="slide-up"
                data-sal-easing="ease"
                data-sal-delay="5"
              >
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
                <div className="inner__bannerbuttons">
                  <button
                    className="button primary"
                    data-id="#request-a-quote-block"
                    onClick={() => scrollTo("#request-a-quote-block")}
                  >
                    Request a quote
                  </button>
                  <a className="button whiteoutline" href="tel:1800894400">
                    Call us now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="generaltext walls add">
          <div
            className="aside__text"
            dangerouslySetInnerHTML={{
              __html: this.props.data.wordpressPage.acf
                .introduction_aside_heading,
            }}
          />
          <div className="container">
            <div className="row middle-md reverse">
              <div className="col-md-6">
                <div
                  className="textBox"
                  data-sal="slide-up"
                  data-sal-easing="ease"
                  data-sal-delay="5"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.wordpressPage.acf
                        .introduction_description,
                    }}
                  />
                  <div className="btnWrap">
                    <button
                      data-id="#request-a-quote-block"
                      onClick={() => scrollTo("#request-a-quote-block")}
                      className="button-learn"
                    >
                      {
                        this.props.data.wordpressPage.acf
                          .introduction_button_text
                      }{" "}
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
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image__wrap">
                  <Img
                    fluid={
                      this.props.data.wordpressPage.acf.introduction_image
                        .localFile.childImageSharp.fluid
                    }
                    alt="Mortlock Timber"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="use__block">
          <div className="container">
            <div className="row">
              {product_features.map((product, index) => (
                <div className="col-sm-6 col-md-3" key={index}>
                  <div className="icon__box">
                    <div
                      className="ico_wrap"
                      dangerouslySetInnerHTML={{
                        __html: product.product_icon_svg_code,
                      }}
                    />
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: product.feature_title,
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.feature_description,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="subtainability__block">
          <div className="aside__text">Sustainable Jarrah</div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.wordpressPage.acf
                      .product_description_heading,
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.wordpressPage.acf
                      .product_text_description,
                  }}
                />
                <div className="button_wrap">
                  {this.props.data.wordpressPage.acf.product_description_buttons.map(
                    (button, index) =>
                      button.description_button_link ? (
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={button.description_button_link.link}
                          className="button-learn"
                          key={index}
                        >
                          {button.description_button_text}{" "}
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
                        </a>
                      ) : (
                        <button
                          key={index}
                          data-id="#request-a-quote-block"
                          onClick={() => scrollTo("#request-a-quote-block")}
                          className="button-learn"
                        >
                          {button.description_button_text}{" "}
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
                        </button>
                      )
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-offset-1 col-lg-5">
                <div className="sustainability_image">
                  <Img
                    fluid={
                      this.props.data.wordpressPage.acf
                        .product_description_image.localFile.childImageSharp
                        .fluid
                    }
                    alt="Mortlock Timber"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="why__product">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="why_image">
                  <Img
                    fluid={
                      this.props.data.wordpressPage.acf.what_client_say_image
                        .localFile.childImageSharp.fluid
                    }
                    alt="Mortlock Timber"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="general__heading">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.wordpressPage.acf
                        .why_this_product_main_heading,
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.props.data.wordpressPage.acf
                          .description_column_one,
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.props.data.wordpressPage.acf
                          .description_column_two,
                      }}
                    />
                    <div className="btn-holdd">
                      <Link
                        to={
                          this.props.data.wordpressPage.acf
                            .why_product_button_link
                        }
                        className="button-learn"
                      >
                        {
                          this.props.data.wordpressPage.acf
                            .why_product_button_text
                        }{" "}
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
                      <span className="info">
                        <button
                          data-id="#testimonial"
                          onClick={() => scrollTo("#testimonial")}
                        >
                          <span className="underline">
                            {
                              this.props.data.wordpressPage.acf
                                .what_client_say_text
                            }
                          </span>{" "}
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
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="article__where">
          <div className="container">
            <h2
              dangerouslySetInnerHTML={{
                __html: this.props.data.wordpressPage.acf.sections_main_heading,
              }}
            />
            <div className="row">
              {this.props.data.wordpressPage.acf.where_can_it_be_used.map(
                (product, index) => (
                  <div className="col-sm-6 col-md-4" key={index}>
                    <div className="articletext__box">
                      <div className="img__wrap">
                        <Img
                          fluid={
                            product.using_image.localFile.childImageSharp.fluid
                          }
                          alt="Mortlock Timber"
                        />
                      </div>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: product.using_product_title,
                        }}
                      />
                      {this.props.data.wordpressPage.acf
                        .show_description_underneath && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.using_product_description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="button_center">
              <button
                data-id="#request-a-quote-block"
                onClick={() => scrollTo("#request-a-quote-block")}
                className="button-learn white"
              >
                {this.props.data.wordpressPage.acf.where_to_use_button_text}{" "}
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
              </button>
              <div>
                <button
                  className="normal_link"
                  data-id="#testimonial"
                  onClick={() => scrollTo("#testimonial")}
                >
                  <span className="underline">
                    {this.props.data.wordpressPage.acf.what_client_say_text}
                  </span>{" "}
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
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="decking_options">
          <div
            className="aside__text"
            dangerouslySetInnerHTML={{
              __html: this.props.data.wordpressPage.acf
                .decking_options_aside_title,
            }}
          />
          <div className="container">
            <div className="main_heading">
              <h2
                dangerouslySetInnerHTML={{
                  __html: this.props.data.wordpressPage.acf
                    .decking_option_main_heading,
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.data.wordpressPage.acf
                    .decking_option_description,
                }}
              />
            </div>
            <div className="row">
              {this.props.data.wordpressPage.acf.decking_options_text_description.map(
                (post, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="option__box">
                      <div className="option_image">
                        <Img
                          fluid={
                            post.decking_options_image.localFile.childImageSharp
                              .fluid
                          }
                          alt="Mortlock Timber"
                        />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.description_option_description,
                        }}
                      />
                      <div className="button_center">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={post.decking_option_button_link.link}
                          className="button-learn"
                        >
                          {post.decking_option_button_text}{" "}
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
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="pricingform__block" id="request-a-quote-block">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="pricingff__image">
                  <div className="bg_image">
                    <Img
                      fluid={
                        this.props.data.wordpressPage.acf.product_pricing_image
                          .localFile.childImageSharp.fluid
                      }
                      alt="Mortlock Timber"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="pricing__formwrap">
                  <div className="main_heading">
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: this.props.data.wordpressPage.acf
                          .product_pricing_heading,
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.props.data.wordpressPage.acf
                          .product_pricing_description,
                      }}
                    />
                  </div>
                  <div className="form__wrapper">
                    <LandingPageForm location={this.props.location.href} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GlobalTestimonialSlider
          contentData={latestTestomonial}
          button="mortlock timber testimonials"
        />
      </LayoutLanding>
    )
  }
}

export default Page

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      yoast {
        title
        metadesc
      }
      acf {
        landing_page_banner_image {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        landing_page_banner_image_overlay
        landing_page_banner_heading
        landing_page_banner_subheading
        landing_page_banner_buttons {
          landing_page_banner_button_text
          landing_page_banner_button_link
          landing_page_banner_button_style
        }
        introduction_aside_heading
        introduction_image {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        introduction_description
        introduction_button_text
        introduction_button_link
        introduction_button_style
        product_features {
          product_icon_svg_code
          feature_title
          feature_description
        }
        product_description_heading
        product_text_description
        product_description_buttons {
          description_button_text
          description_button_link {
            link
          }
          description_button_style
        }
        product_description_image {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        why_this_product_main_heading
        what_client_say_text
        what_client_say_image {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        description_column_one
        description_column_two
        why_product_button_text
        why_product_button_link
        why_product_button_style
        sections_main_heading
        show_description_underneath
        where_can_it_be_used {
          using_image {
            alt_text
            localFile {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          using_product_title
          using_product_description
        }
        where_to_use_button_text
        where_to_use_button_link
        where_to_use_button_style
        client_saying_text
        client_saying_link
        decking_options_aside_title
        decking_option_main_heading
        decking_option_description
        decking_options_text_description {
          decking_options_image {
            alt_text
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description_option_description
          decking_option_button_text
          decking_option_button_link {
            link
          }
        }
        product_pricing_image {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        product_pricing_heading
        product_pricing_description
        show_testimonial_block_in_landing_page
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
  }
`
