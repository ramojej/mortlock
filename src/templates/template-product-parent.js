import React, { Component } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "@wardpeet/gatsby-image-nextgen/compat"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Button from "../components/global/button"

import ProductBoxes from "../components/productparent/product-boxes"
import ExpandableContent from "../components/productparent/expandable-content"

class Page extends Component {
  render() {
    const bannerContent = {
      banner_image: this.props.data.wordpressPage.acf
        .product_parent_banner_image,
      banner_image_overlay: this.props.data.wordpressPage.acf
        .main_banner_image_overlay,
      banner_heading: this.props.data.wordpressPage.acf
        .product_parent_banner_heading,
      banner_description: this.props.data.wordpressPage.acf
        .product_parent_banner_description,
      banner_buttons: this.props.data.wordpressPage.acf
        .product_parent_banner_buttons,
      banner_type: "medium",
    }

    const boxesContent = this.props.data.wordpressPage.acf.product_list

    const expandableContent = {
      description_text_box: this.props.data.wordpressPage.acf
        .description_text_box,
      description_button_text: this.props.data.wordpressPage.acf
        .description_button_text,
      description_additional_box: this.props.data.wordpressPage.acf
        .description_additional_box,
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
          className={
            bannerContent.banner_type
              ? `inner__banner ${bannerContent.banner_type}`
              : "inner__banner"
          }
        >
          <div className="bg__image has-overlay">
            {bannerContent.banner_image ? (
              <GatsbyImage
                fluid={
                  bannerContent.banner_image.localFile.childImageSharp.fluid
                }
                alt="Banner"
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
                {bannerContent.banner_buttons ? (
                  <div className="inner__bannerbuttons">
                    {bannerContent.banner_buttons.map((button, index) =>
                      index === 1 ? (
                        <Button
                          type="external"
                          link={button.product_parent_button_link}
                          text={button.product_parent_button_text}
                          style={button.product_parent_button_style}
                          key={index}
                        />
                      ) : (
                        <Button
                          link={button.product_parent_button_link}
                          text={button.product_parent_button_text}
                          style={button.product_parent_button_style}
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
        <ProductBoxes data={boxesContent} />
        <ExpandableContent data={expandableContent} />
      </Layout>
    )
  }
}

export default Page

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      slug
      yoast {
        title
        metadesc
      }
      acf {
        product_parent_banner_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1170) {
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
        product_parent_banner_heading
        product_parent_banner_description
        product_parent_banner_overlay
        product_parent_banner_buttons {
          product_parent_button_link
          product_parent_button_text
          product_parent_button_style
        }
        product_list {
          button_link
          button_text
          popup_text
          product_description
          product_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          product_title
        }
        description_text_box
        description_button_text
        description_additional_box
      }
    }
  }
`
