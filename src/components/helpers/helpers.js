const Helpers = {
  formValidation: function (type, data) {
    const validEmailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    var isValid = false
    var errorMsg = ""

    if (type === "text") {
      errorMsg = data.length < 1 ? "Field cannot be empty." : ""
    } else if (type === "email") {
      errorMsg = validEmailRegex.test(data) ? "" : "Email is not valid!"
    } else {
      errorMsg = data.length < 1 ? "Field cannot be empty." : ""
    }

    if (errorMsg === "") {
      isValid = true
    }

    return { valid: isValid, err: errorMsg }
  },

  emptyValidation: function (selector) {
    var elements = document.querySelectorAll(selector + " .noEmpty")

    for (var i = 0, element; (element = elements[i++]); ) {
      if (element.value === "") {
        return false
      } else {
        return true
      }
    }
  },

  validateForm: function (errors) {
    let valid = true
    Object.values(errors).forEach(val => val.length > 0 && (valid = false))
    return valid
  },

  config: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },

  fileConfig: {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
}

export default Helpers
