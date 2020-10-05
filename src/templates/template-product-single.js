import React, { Component } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "@wardpeet/gatsby-image-nextgen/compat"
import scrollTo from "gatsby-plugin-smoothscroll"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SubMenu from "../components/global-subnav"
import Button from "../components/global/button"

import ProductOverview from "../components/productsingle/product-overview"
import ProductBenefit from "../components/productsingle/product-benefit"
import ProductApplication from "../components/productsingle/product-application"
import ProductFaq from "../components/productsingle/product-faq"
import ProductSpecies from "../components/productsingle/product-species"
import ProductInstallation from "../components/productsingle/product-installation"
import BattenShapeAndSize from "../components/productsingle/product-battensize"

import RequestSample from "../components/global/global-request-sample"
import PricingBlock from "../components/global/global-pricing-block"

class Page extends Component {
  render() {
    const bannerContent = {
      banner_image: this.props.data.wordpressPage.acf
        .product_single_banner_image,
      banner_image_overlay: this.props.data.wordpressPage.acf
        .product_single_banner_image_overlay,
      banner_heading: this.props.data.wordpressPage.acf
        .product_single_banner_heading,
      banner_description: this.props.data.wordpressPage.acf
        .product_single_banner_sub_heading,
      banner_buttons: this.props.data.wordpressPage.acf
        .product_single_banner_buttons,
    }

    const productOverview = {
      product_title: this.props.data.wordpressPage.acf.product_title,
      product_overview_aside_title: this.props.data.wordpressPage.acf
        .product_overview_aside_title,
      product_aside_image: this.props.data.wordpressPage.acf
        .product_aside_image,
      product_description: this.props.data.wordpressPage.acf
        .product_description,
      product_expand_description: this.props.data.wordpressPage.acf
        .product_expand_description,
    }

    const productBenefit = {
      product_benefit_image: this.props.data.wordpressPage.acf
        .product_benefit_image,
      product_benefit_title: this.props.data.wordpressPage.acf
        .product_benefit_title,
      product_benefit_columns: this.props.data.wordpressPage.acf
        .product_benefit_columns,
    }

    const productApplication = {
      application_content: this.props.data.wordpressPage.acf
        .application_content,
      application_gallery_image: this.props.data.wordpressPage.acf
        .application_gallery_image,
    }

    const timber_species = {
      species: this.props.data.wordpressPage.acf.timber_species,
      timber_finishes_download_text: this.props.data.wordpressPage.acf
        .timber_finishes_download_text,
      timber_finishes_button_style: this.props.data.wordpressPage.acf
        .timber_finishes_button_style,
      timber_finishes_download_link: this.props.data.wordpressPage.acf
        .timber_finishes_download_link,
    }

    const productInstallation = {
      installation_image: this.props.data.wordpressPage.acf.installation_image,
      installation_title: this.props.data.wordpressPage.acf.installation_title,
      installation_description: this.props.data.wordpressPage.acf
        .installation_description,
      installation_button_text: this.props.data.wordpressPage.acf
        .installation_button_text,
      installation_button_link: this.props.data.wordpressPage.acf
        .installation_button_link,
      installation_button_style: this.props.data.wordpressPage.acf
        .installation_button_style,
    }

    const userLinks = this.props.data.wordpressPage.acf.useful_info

    const batten_size = {
      shape_and_size_title: this.props.data.wordpressPage.acf
        .shape_and_size_title,
      batten_shapes: this.props.data.wordpressPage.acf.batten_shapes,
    }

    const productFAQ = {
      faq_title: this.props.data.wordpressPage.acf.faq_title,
      faqs: this.props.data.wordpressPage.acf.faqs,
    }

    const productPricing = {
      pricing_title: this.props.data.wordpressPage.acf.pricing_title,
      pricing_description: this.props.data.wordpressPage.acf
        .pricing_description,
      pricing_image: this.props.data.wordpressPage.acf.pricing_image,
      pricing_guide_download_link: this.props.data.wordpressPage.acf
        .pricing_guide_download_link,
    }

    const requestSample = {
      request_sample_image: this.props.data.wordpressPage.acf
        .request_sample_image,
      request_block_heading: this.props.data.wordpressPage.acf
        .request_block_heading,
      request_sample_brochure: this.props.data.wordpressPage.acf
        .request_sample_brochure,
      request_sample_description: this.props.data.wordpressPage.acf
        .request_sample_description,
      request_sample_heading: this.props.data.wordpressPage.acf
        .product_single_banner_heading,
    }

    const postID = this.props.data.wordpressPage.wordpress_id

    const submenus = ["product-overview", "technical", "pricing"]

    let requestSampleTag = {}
    let requestPricingTag = {}

    if (postID === 573) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "ClassicTimberDecking",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "ClassicTimberDecking",
      }
    } else if (postID === 561) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "MarineTimberDecking",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "MarineTimberDecking",
      }
    } else if (postID === 567) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "MetroPlankTimberDecking",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "MetroPlankTimberDecking",
      }
    } else if (postID === 339) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "ProPlankTimberCladding",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "ProPlankTimberCladding",
      }
    } else if (postID === 4205) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "ShouSugiTimberCladding",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "ShouSugiTimberCladding",
      }
    } else if (postID === 4209) {
      requestSampleTag = {
        event: "WebLead",
        eventAction: "RequestSample",
        eventLabel: "TrendPlankTimberCladding",
      }
      requestPricingTag = {
        event: "WebLead",
        eventAction: "RequestPricing",
        eventLabel: "TrendPlankTimberCladding",
      }
    }

    return (
      <Layout>
        <SEO
          description={
            this.props.data.wordpressPage.yoast.metadesc
              ? this.props.data.wordpressPage.yoast.metadesc
              : null
          }
          title={
            this.props.data.wordpressPage.yoast.title
              ? this.props.data.wordpressPage.yoast.title
              : null
          }
        />
        <div
          className="inner__banner"
          data-sample={requestSampleTag}
          data-price={requestPricingTag}
        >
          <div className="bg__image has-overlay">
            {bannerContent.banner_image ? (
              <GatsbyImage
                fluid={
                  bannerContent.banner_image.localFile.childImageSharp.fluid
                }
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
                          link={button.product_single_button_link}
                          text={button.product_single_button_text}
                          style={button.product_single_button_style}
                          key={index}
                        />
                      ) : (
                        <button
                          className="button primary"
                          key={index}
                          data-id={button.product_single_button_link}
                          onClick={() =>
                            scrollTo(`${button.product_single_button_link}`)
                          }
                        >
                          {button.product_single_button_text}
                        </button>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <SubMenu data={submenus} />
        <div className="product__singlewrap">
          <ProductOverview id={submenus[0]} data={productOverview} />
          <ProductBenefit data={productBenefit} />
          <ProductApplication data={productApplication} />
        </div>
        <div className="product__description" id={submenus[1]}>
          <div className="container">
            <ProductSpecies data={timber_species} />
            <BattenShapeAndSize data={batten_size} />
            <ProductInstallation data={productInstallation} />
            <div className="useful__info">
              <div className="general-heading">
                <h2>Useful Info</h2>
              </div>
              <div className="info__slider row center-sm">
                {userLinks
                  ? userLinks.map((link, index) => (
                      <div
                        className="col-sm-3"
                        data-sal="slide-up"
                        data-sal-easing="ease"
                        data-sal-delay="5"
                        key={index}
                      >
                        <div className="article__box">
                          <div className="icon_box">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: link.useful_icon,
                              }}
                            />
                          </div>
                          <h4>{link.userful_info_heading}</h4>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: link.useful_info_text,
                            }}
                          />
                          <a
                            className="link"
                            href={link.useful_info_link.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.useful_info_link_text}
                          </a>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <ProductFaq data={productFAQ} />
          </div>
        </div>
        <PricingBlock
          pageID={postID}
          id={submenus[2]}
          data={productPricing}
          finishes={timber_species}
          battensize={batten_size}
          location={this.props.location.href}
          gtag={requestPricingTag}
        />
        <RequestSample
          wpPageId={postID}
          data={requestSample}
          location={this.props.location.href}
          gtag={requestSampleTag}
        />
        <div
          className="fixed-request-pricing"
          onClick={() => scrollTo(`#pricing`)}
        >
          Request Pricing
        </div>
      </Layout>
    )
  }
}

export default Page

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      wordpress_id
      yoast {
        title
        metadesc
      }
      acf {
        product_single_banner_sub_heading
        product_single_banner_heading
        product_single_banner_image_overlay
        product_single_banner_buttons {
          product_single_button_link
          product_single_button_text
          product_single_button_style
        }
        product_single_banner_image {
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
        product_title
        product_overview_aside_title
        product_aside_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        product_description
        product_expand_description
        product_benefit_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        product_benefit_title
        product_benefit_columns {
          benefit_or_button
          button_text
          button_link
          icon_svg
          benefit_title
          benefit_description
        }
        application_content
        application_gallery_image {
          gallery_image {
            link
            alt_text
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          image_title
          image_icon
        }
        timber_finishes_download_text
        timber_finishes_button_style
        timber_finishes_download_link {
          link
        }
        timber_species {
          timber_small_thumbnail {
            alt_text
            localFile {
              childImageSharp {
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          timber_title
          timber_finishes {
            finishes_image_thumbnail {
              alt_text
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            finishes_title
            finishes_use
          }
        }
        shape_and_size_title
        batten_shapes {
          shape_and_size_title
          shape_icons {
            shape_svg
            shape_title
          }
        }
        installation_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        installation_title
        installation_description
        installation_button_text
        installation_button_link {
          link
        }
        installation_button_style
        useful_info {
          useful_icon
          userful_info_heading
          useful_info_text
          useful_info_link_text
          useful_info_link {
            link
          }
        }
        faq_title
        faqs {
          faq_title
          faq_content
        }
        pricing_title
        pricing_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 650) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        pricing_description
        pricing_guide_download_link {
          link
        }
        request_block_heading
        request_sample_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        request_sample_description
        request_sample_brochure {
          link
        }
      }
    }
  }
`
