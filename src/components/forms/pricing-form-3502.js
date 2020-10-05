import React, { Component } from "react"
import axios from "axios"
import qs from "qs"

import Helpers from "../helpers/helpers"
import Loader from "../helpers/loader"

class PricingForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        state: "",
        company: "",
        interest: "Unsure",
        leadsource: "Website",
        pageURL: this.props.location,
        productinterest: [
          {
            id: 1,
            name: "Timber Ceilings",
            value: "timberceilings",
            isChecked: false,
          },
          {
            id: 2,
            name: "Timber Walls",
            value: "timberwalls",
            isChecked: false,
          },
          {
            id: 3,
            name: "Timber Decking",
            value: "timberdecking",
            isChecked: false,
          },
          {
            id: 4,
            name: "Shou Sugi Ban",
            value: "shousugiban",
            isChecked: false,
          },
        ],
        products: [],
      },
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        state: "",
      },
      passedValidation: false,
      submitActive: false,
      mainFormMsg: "",
      mainFormState: null,
      popupActive: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputCheck = this.handleInputCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputCheck(event) {
    let interests = this.state.fields.productinterest

    interests.forEach(interest => {
      if (interest.value === event.target.value)
        interest.isChecked = event.target.checked
    })

    this.setState({
      fields: {
        ...this.state.fields,
        productinterest: interests,
      },
    })
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

  handleSubmit = event => {
    event.preventDefault()
    let checkedBoxes = []
    this.setState({ submitActive: true })
    const formLink =
      "https://site.mortlock.com.au/wp-json/contact-form-7/v1/contact-forms/3502/feedback"
    let isFormValid = false
    let elements = document.querySelectorAll(".contact__form .noEmpty")

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
      this.state.fields.productinterest.map(interest => {
        if (interest.isChecked) {
          checkedBoxes.push(interest.value)
          this.state.fields.products.push(interest.value)
        }
      })

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
      bodyFormData.append("products", checkedBoxes)
      bodyFormData.append("leadsource", this.state.fields.leadsource)
      bodyFormData.append("pageURL", this.state.fields.pageURL)
      bodyFormData.append("interest", this.state.fields.interest)

      axios
        .post(formLink, bodyFormData, Helpers.config)
        .then(res => {
          if (res.data.status === "mail_sent") {
            setTimeout(() => {
              this.setState({
                submitActive: false,
                mainFormMsg: res.data.message,
                mainFormState: res.data.status,
                popupActive: true,
                fields: {
                  firstname: "",
                  lastname: "",
                  email: "",
                  phone: "",
                  state: "",
                  interest: "Unsure",
                  leadsource: "Website",
                  pageURL: this.props.location,
                  company: "",
                  productinterest: [
                    {
                      id: 1,
                      name: "Timber Ceilings",
                      value: "timberceilings",
                      isChecked: false,
                    },
                    {
                      id: 2,
                      name: "Timber Walls",
                      value: "timberwalls",
                      isChecked: false,
                    },
                    {
                      id: 3,
                      name: "Timber Decking",
                      value: "timberdecking",
                      isChecked: false,
                    },
                    {
                      id: 4,
                      name: "Shou Sugi Ban",
                      value: "shousugiban",
                      isChecked: false,
                    },
                  ],
                  products: this.state.fields.products,
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

  render() {
    const { submitActive, popupActive } = this.state
    if (popupActive) {
      return (
        <div className="formsub__popup">
          <h3>Thank you!</h3>
          <p>Please click the link below to download the guide.</p>
          {this.state.fields.products &&
            this.state.fields.products.map((product, index) => (
              <div className="link__hold" key={index}>
                {(() => {
                  if (product === "timberceilings") {
                    return (
                      <a
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        href={
                          this.props.zip.download_zip_file_timber_ceilings.link
                        }
                      >
                        Download Timber Ceilings Pricing Guide
                      </a>
                    )
                  } else if (product === "timberwalls") {
                    return (
                      <a
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        href={
                          this.props.zip.download_zip_file_timber_walls.link
                        }
                      >
                        Download Timber Walls Pricing Guide
                      </a>
                    )
                  } else if (product === "timberdecking") {
                    return (
                      <a
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        href={
                          this.props.zip.download_zip_file_timber_decking.link
                        }
                      >
                        Download Timber Decking Pricing Guide
                      </a>
                    )
                  } else if (product === "shousugiban") {
                    return (
                      <a
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        href={this.props.zip.download_zip_shou_sugi_ban.link}
                      >
                        Download Shou Sugi Ban Pricing Guide
                      </a>
                    )
                  }
                })()}
              </div>
            ))}
        </div>
      )
    } else {
      return (
        <form
          className={submitActive ? "contact__form loading" : "contact__form"}
          id="pricing-guide-form"
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
                    id="firstname"
                    placeholder="Enter your first name"
                    className="noEmpty"
                    value={this.state.fields.firstname || ""}
                    onChange={this.handleInputChange}
                  />
                  {this.state.errors.firstname !== "" && (
                    <span className="error">{this.state.errors.firstname}</span>
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
                    id="lastname"
                    placeholder="Enter your last name"
                    value={this.state.fields.lastname || ""}
                    onChange={this.handleInputChange}
                  />
                  {this.state.errors.lastname !== "" && (
                    <span className="error">{this.state.errors.lastname}</span>
                  )}
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
                    id="email"
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
                    aria-label="Phone Number"
                    className="noEmpty"
                    type="text"
                    name="phone"
                    id="phone"
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
                <label htmlFor="company">Company name</label>
                <div className="form_input">
                  <input
                    aria-label="Company name"
                    type="text"
                    id="company"
                    className="noEmpty"
                    placeholder="Enter company name"
                    value={this.state.fields.company || ""}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form_group">
            <span className="label">Select product of Interest</span>
            <ul className="check__list">
              {this.state.fields.productinterest.map((interest, index) => (
                <li key={index}>
                  <label className="custom_check" htmlFor={interest.value}>
                    <input
                      aria-label={interest.name}
                      name="productinterest"
                      checked={interest.isChecked}
                      value={interest.value}
                      type="checkbox"
                      id={interest.value}
                      onChange={this.handleInputCheck}
                    />
                    <span className="custom-box"></span>
                    <span className="custom-text">{interest.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn_wrap">
            <button className="button" type="submit">
              <span className="text">Submit</span>
              <Loader />
            </button>
            {this.state.mainFormMsg && (
              <span className={`form-msg ${this.state.mainFormState}`}>
                {this.state.mainFormMsg}
              </span>
            )}
          </div>
        </form>
      )
    }
  }
}

export default PricingForm
