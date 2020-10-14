import React, { Component } from "react"
import axios from "axios"

import Helpers from "../helpers/helpers"
import Loader from "../helpers/loader"
import ProductPricingPopupForm from "../forms/product-pricing-popup-form-4367"

const togglePopupOverlay = () => {
  document.body.classList.toggle("popup__active")
}

class ProductPricingForm extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      fields: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        company: "",
        state: "",
        leadsource: "Website",
        pageURL: this.props.location,
        interest: "Unsure",
        leadinfo: "Product Pricing",
      },
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        company: "",
        state: "",
      },
      passedValidation: false,
      submitActive: false,
      mainFormMsg: "",
      mainFormState: null,
      popupActive: false,
      popupFormActive: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.pricingPopup = this.pricingPopup.bind(this)
    this.handleGTag = this.handleGTag.bind(this)
  }

  handleInputChange(event) {
    const { name, value, type } = event.target
    this.setState({
      submitActive: false,
      mainFormMsg: "",
      mainFormState: "",
    })

    if (event.target.classList.contains("noEmpty")) {
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: value,
        },
        errors: {
          ...this.state.errors,
          [name]: Helpers.formValidation(type, value).err,
        },
      })
    } else {
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: value,
        },
      })
    }
  }

  handleGTag() {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(this.props.gtag)
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ submitActive: true })
    const formLink =
      "https://site.mortlock.com.au/wp-json/contact-form-7/v1/contact-forms/4360/feedback"
    let isFormValid = false
    let elements = document.querySelectorAll(".pricing__form .noEmpty")

    for (let i = 0, element; (element = elements[i++]); ) {
      if (element.value === "") {
        isFormValid = false
        setTimeout(() => {
          this.setState({
            submitActive: false,
            mainFormMsg: "Please fill in the required fields.",
            mainFormState: "error",
            errors: {
              ...this.state.errors,
              [element.name]: Helpers.formValidation(
                element.type,
                element.value
              ).err,
            },
          })
        }, 800)
      } else {
        isFormValid = true
      }
    }

    if (isFormValid) {
      var bodyFormData = new FormData()
      bodyFormData.append("firstname", this.state.fields.firstname)
      bodyFormData.append("lastname", this.state.fields.lastname)
      if (this.state.fields.company === "") {
        bodyFormData.append("company", "N/A")
      } else {
        bodyFormData.append("company", this.state.fields.company)
      }
      bodyFormData.append("state", this.state.fields.state)
      bodyFormData.append("email", this.state.fields.email)
      bodyFormData.append("phone", this.state.fields.phone)
      bodyFormData.append("leadsource", this.state.fields.leadsource)
      bodyFormData.append("pageURL", this.state.fields.pageURL)
      bodyFormData.append("interest", this.state.fields.interest)

      axios
        .post(formLink, bodyFormData, Helpers.config)
        .then(res => {
          if (res.data.status === "mail_sent") {
            this.handleGTag()
            setTimeout(() => {
              this.setState({
                popupActive: true,
                submitActive: false,
                mainFormMsg: res.data.message,
                mainFormState: res.data.status,
                fields: {
                  firstname: "",
                  lastname: "",
                  email: "",
                  phone: "",
                  company: "",
                  state: "",
                  leadsource: "Website",
                  pageURL: this.props.location,
                  interest: "Unsure",
                  leadinfo: "Product Pricing",
                },
              })
            }, 800)

            setTimeout(() => {
              this.setState({ mainFormMsg: "", mainFormState: "" })
            }, 4000)
          } else if (res.data.status === "validation_failed") {
            setTimeout(() => {
              this.setState({
                submitActive: false,
                mainFormMsg: res.data.message,
                mainFormState: res.data.status,
              })
            }, 800)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  pricingPopup = e => {
    e.preventDefault()
    this.setState({
      popupFormActive: !this.state.popupFormActive,
    })
    togglePopupOverlay()
  }

  render() {
    const { submitActive, popupActive, popupFormActive } = this.state

    if (popupActive) {
      return (
        <div className="formsub__popup">
          <h3>Thank you!</h3>
          <p>Please click the link below to download the guide.</p>
          <a
            class="link"
            target="_blank"
            rel="noreferrer"
            href={this.props.data.pricing_guide_download_link.link}
          >
            Click here to download pricing guide
          </a>
        </div>
      )
    } else {
      return (
        <>
          <form
            className={submitActive ? "pricing__form loading" : "pricing__form"}
            id="pricing__form"
            type="POST"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <div className="row">
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="firstname1">first name *</label>
                  <div className="form_input">
                    <input
                      aria-label="Firstname"
                      type="text"
                      name="firstname"
                      id="firstname1"
                      placeholder="Enter your first name"
                      className="noEmpty"
                      value={this.state.fields.firstname || ""}
                      onChange={this.handleInputChange}
                    />
                    {this.state.errors.firstname !== "" && (
                      <span className="error">
                        {this.state.errors.firstname}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="lastname1">last name *</label>
                  <div className="form_input">
                    <input
                      aria-label="Lastname"
                      className="noEmpty"
                      type="text"
                      name="lastname"
                      id="lastname1"
                      placeholder="Enter your last name"
                      value={this.state.fields.lastname || ""}
                      onChange={this.handleInputChange}
                    />
                    {this.state.errors.lastname !== "" && (
                      <span className="error">
                        {this.state.errors.lastname}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="state">State *</label>
                  <div className="form_input">
                    <select
                      name="state"
                      id="state"
                      className="noEmpty"
                      value={this.state.fields.state || ""}
                      onChange={this.handleInputChange}
                    >
                      <option value="">- Select -</option>
                      <option value="ACT">ACT</option>
                      <option value="NSW">NSW</option>
                      <option value="NT">NT</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="TAS">TAS</option>
                      <option value="VIC">VIC</option>
                      <option value="WA">WA</option>
                      <option value="International">International</option>
                    </select>
                    {this.state.errors.state !== "" && (
                      <span className="error">{this.state.errors.state}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="company1">Company</label>
                  <div className="form_input">
                    <input
                      aria-label="Company name"
                      type="text"
                      name="company"
                      id="company1"
                      placeholder="Enter company name"
                      value={this.state.fields.company || ""}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="email1">Email *</label>
                  <div className="form_input">
                    <input
                      aria-label="Email"
                      className="noEmpty"
                      type="email"
                      name="email"
                      id="email1"
                      placeholder="Enter your email address"
                      value={this.state.fields.email || ""}
                      onChange={this.handleInputChange}
                    />
                    {this.state.errors.email !== "" && (
                      <span className="error">{this.state.errors.email}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form_group">
                  <label htmlFor="phone1">Phone *</label>
                  <div className="form_input">
                    <input
                      aria-label="Company name"
                      className="noEmpty"
                      type="text"
                      name="phone"
                      id="phone1"
                      placeholder="Enter your phone number"
                      value={this.state.fields.phone || ""}
                      onChange={this.handleInputChange}
                    />
                    {this.state.errors.phone !== "" && (
                      <span className="error">{this.state.errors.phone}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_wrap">
              <button className="button" type="submit">
                <span className="text">Download</span>
                <Loader />
              </button>
              {this.props.pageID === 339 && (
                <button
                  className="button blackoutline"
                  onClick={this.pricingPopup}
                >
                  know exactly what you’re looking for? click here
                </button>
              )}
              {this.state.mainFormMsg && (
                <span className={`form-msg ${this.state.mainFormState}`}>
                  {this.state.mainFormMsg}
                </span>
              )}
            </div>
          </form>
          {popupFormActive && this.props.pageID === 339 && (
            <div className="popup__wrapper">
              <button className="popup__close" onClick={this.pricingPopup}>
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
              <div className="popup__hold">
                <div className="container container__big">
                  <div className="popup__heading">
                    <h2>{this.props.data.pricing_title}</h2>
                  </div>
                  <div className="popup__content">
                    <div className="pricing__popupform">
                      <ProductPricingPopupForm
                        finishes={this.props.finishes}
                        battensize={this.props.battensize}
                        data={this.props.data}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )
    }
  }
}

export default ProductPricingForm
