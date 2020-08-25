import React from 'react';
import Img from 'gatsby-image';

import ProductPricingForm from "../forms/pricing-form";

const PricingBlock = ({ ...props }) =>  {
  const content = props.data;
  const id = props.id;

  return (
    <div className="pricing__block" id={ id ? id : null }>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="pricing__text">
              <h2 dangerouslySetInnerHTML={{ __html: content.pricing_title }} />
              <p dangerouslySetInnerHTML={{ __html: content.pricing_description }} />
              <ProductPricingForm />
            </div>
          </div>
          <div className="col-sm-offset-1 col-sm-5">
            <div className="price__image">
              {content.pricing_image ? <Img fluid={content.pricing_image.localFile.childImageSharp.fluid} alt="Alternative Text" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingBlock;