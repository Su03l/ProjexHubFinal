// Shared Authentication JavaScript
class AuthManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupPasswordToggles()
    this.setupFormValidation()
  }

  setupPasswordToggles() {
    document.querySelectorAll(".password-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault()
        const input = toggle.parentElement.querySelector("input")
        const icon = toggle.querySelector("i")

        if (input.type === "password") {
          input.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          input.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  }

  setupFormValidation() {
    // Real-time validation for inputs
    document.querySelectorAll("input[required]").forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearFieldError(input))
    })
  }

  validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let message = ""

    // Clear previous errors
    this.clearFieldError(field)

    // Required field validation
    if (!value) {
      isValid = false
      message = "هذا الحقل مطلوب"
    }
    // Email validation
    else if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        message = "يرجى إدخال بريد إلكتروني صحيح"
      }
    }
    // Password validation
    else if (field.type === "password" && field.name === "password") {
      if (value.length < 8) {
        isValid = false
        message = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
      }
    }

    if (!isValid) {
      this.showFieldError(field, message)
    }

    return isValid
  }

  showFieldError(field, message) {
    field.classList.add("input-error")

    // Remove existing error message
    const existingError = field.parentElement.parentElement.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    // Add new error message
    const errorElement = document.createElement("div")
    errorElement.className = "error-message"
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    field.parentElement.parentElement.appendChild(errorElement)
  }

  clearFieldError(field) {
    field.classList.remove("input-error")
    const errorElement = field.parentElement.parentElement.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  showSuccessMessage(field, message) {
    // Remove existing messages
    this.clearFieldError(field)
    const existingSuccess = field.parentElement.parentElement.querySelector(".success-message")
    if (existingSuccess) {
      existingSuccess.remove()
    }

    // Add success message
    const successElement = document.createElement("div")
    successElement.className = "success-message"
    successElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`

    field.parentElement.parentElement.appendChild(successElement)
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".auth-notification")
    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement("div")
    notification.className = `auth-notification ${type}`
    notification.textContent = message

    const styles = {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      fontWeight: "600",
      zIndex: "9999",
      maxWidth: "400px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
    }

    if (type === "success") {
      styles.background = "#10b981"
      styles.color = "white"
    } else if (type === "error") {
      styles.background = "#ef4444"
      styles.color = "white"
    } else {
      styles.background = "#2563eb"
      styles.color = "white"
    }

    Object.assign(notification.style, styles)
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }, 5000)
  }

  async simulateApiCall(data, delay = 1500) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          // 90% success rate
          resolve({ success: true, data })
        } else {
          reject(new Error("حدث خطأ في الخادم"))
        }
      }, delay)
    })
  }

  setButtonLoading(button, loading = true) {
    if (loading) {
      button.disabled = true
      const originalContent = button.innerHTML
      button.dataset.originalContent = originalContent
      button.innerHTML = '<div class="spinner"></div> جاري المعالجة...'
    } else {
      button.disabled = false
      button.innerHTML = button.dataset.originalContent || button.innerHTML
    }
  }
}

// Initialize shared auth functionality
document.addEventListener("DOMContentLoaded", () => {
  new AuthManager()
})
