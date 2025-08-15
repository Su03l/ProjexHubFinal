// Login Page JavaScript
class AuthManager {
  validateField(field) {
    const value = field.value.trim()
    this.clearFieldError(field)

    if (field.hasAttribute("required") && !value) {
      this.showFieldError(field, "هذا الحقل مطلوب")
      return false
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        this.showFieldError(field, "يرجى إدخال بريد إلكتروني صحيح")
        return false
      }
    }

    return true
  }

  showFieldError(field, message) {
    field.classList.add("input-error")
    let errorElement = field.parentNode.querySelector(".error-message")
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "error-message"
      field.parentNode.appendChild(errorElement)
    }
    errorElement.textContent = message
  }

  clearFieldError(field) {
    field.classList.remove("input-error")
    const errorElement = field.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--success)" : type === "error" ? "var(--danger)" : "var(--primary)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => notification.remove())
  }

  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true
      button.innerHTML = `
        <div class="spinner"></div>
        <span>جاري المعالجة...</span>
      `
    } else {
      button.disabled = false
      button.innerHTML = button.dataset.originalText || button.textContent
    }
  }

  async simulateApiCall(data, delay = 1500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login for demo purposes - no validation required
        resolve({ success: true, message: "تم تسجيل الدخول بنجاح" })
      }, delay)
    })
  }
}

class LoginManager extends AuthManager {
  constructor() {
    super()
    this.setupLoginForm()
    this.setupForgotPassword()
    this.setupSocialLogin()
    this.setupPasswordToggle()
  }

  setupLoginForm() {
    const form = document.getElementById("login-form")
    const loginBtn = document.getElementById("login-btn")

    // Store original button text
    if (loginBtn) {
      loginBtn.dataset.originalText = loginBtn.innerHTML
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await this.handleLogin(e)
    })
  }

  setupPasswordToggle() {
    const passwordToggle = document.getElementById("password-toggle")
    const passwordInput = document.getElementById("password")

    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)

        const icon = passwordToggle.querySelector("i")
        if (icon) {
          icon.className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash"
        }
      })
    }
  }

  async handleLogin(e) {
    const form = e.target
    const formData = new FormData(form)
    const loginBtn = document.getElementById("login-btn")

    const data = {
      email: formData.get("email") || "user@example.com",
      password: formData.get("password") || "password",
      remember: formData.get("remember-me") === "on",
    }

    try {
      this.setButtonLoading(loginBtn, true)

      await this.simulateApiCall(data)

      this.showNotification("تم تسجيل الدخول بنجاح!", "success")

      // Store login state if remember me is checked
      if (data.remember) {
        localStorage.setItem("rememberedEmail", data.email)
      }

      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", data.email || "user@example.com")
      localStorage.setItem("userName", "أحمد محمد")
      localStorage.setItem("userAvatar", "أ")

      // Redirect after successful login
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } catch (error) {
      this.showNotification(error.message || "فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.", "error")
    } finally {
      this.setButtonLoading(loginBtn, false)
    }
  }

  setupForgotPassword() {
    const forgotLink = document.getElementById("forgot-password")
    const modal = document.getElementById("forgot-password-modal")
    const closeBtn = document.getElementById("close-forgot-modal")
    const cancelBtn = document.getElementById("cancel-reset")
    const form = document.getElementById("forgot-password-form")

    if (!forgotLink || !modal) return

    // Open modal
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault()
      this.openForgotPasswordModal()
    })

    // Close modal
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeForgotPasswordModal())
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.closeForgotPasswordModal())

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeForgotPasswordModal()
      }
    })

    // Handle form submission
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()
        await this.handlePasswordReset(e)
      })
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.closeForgotPasswordModal()
      }
    })
  }

  openForgotPasswordModal() {
    const modal = document.getElementById("forgot-password-modal")
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Focus email input
    setTimeout(() => {
      const emailInput = document.getElementById("reset-email")
      if (emailInput) emailInput.focus()
    }, 100)
  }

  closeForgotPasswordModal() {
    const modal = document.getElementById("forgot-password-modal")
    modal.classList.remove("active")
    document.body.style.overflow = ""

    // Reset form
    const form = document.getElementById("forgot-password-form")
    if (form) form.reset()
  }

  async handlePasswordReset(e) {
    const form = e.target
    const formData = new FormData(form)
    const submitBtn = form.querySelector('button[type="submit"]')

    const email = formData.get("reset-email") || document.getElementById("reset-email").value

    if (!email) {
      this.showNotification("يرجى إدخال البريد الإلكتروني", "error")
      return
    }

    try {
      this.setButtonLoading(submitBtn, true)

      // Simulate API call
      await this.simulateApiCall({ email })

      this.showNotification("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني", "success")

      setTimeout(() => {
        this.closeForgotPasswordModal()
      }, 2000)
    } catch (error) {
      this.showNotification(error.message || "فشل في إرسال رابط إعادة التعيين", "error")
    } finally {
      this.setButtonLoading(submitBtn, false)
    }
  }

  setupSocialLogin() {
    const googleBtn = document.querySelector(".social-btn.google")
    const microsoftBtn = document.querySelector(".social-btn.microsoft")

    if (googleBtn) {
      googleBtn.addEventListener("click", () => {
        this.handleSocialLogin("google")
      })
    }

    if (microsoftBtn) {
      microsoftBtn.addEventListener("click", () => {
        this.handleSocialLogin("microsoft")
      })
    }
  }

  async handleSocialLogin(provider) {
    try {
      this.showNotification(`جاري تسجيل الدخول عبر ${provider === "google" ? "Google" : "Microsoft"}...`, "info")

      // Simulate social login
      await this.simulateApiCall({ provider })

      this.showNotification("تم تسجيل الدخول بنجاح!", "success")

      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", `user@${provider}.com`)
      localStorage.setItem("userName", "أحمد محمد")
      localStorage.setItem("userAvatar", "أ")

      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } catch (error) {
      this.showNotification("فشل في تسجيل الدخول عبر " + (provider === "google" ? "Google" : "Microsoft"), "error")
    }
  }

  // Load remembered email on page load
  loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem("rememberedEmail")
    if (rememberedEmail) {
      const emailInput = document.getElementById("email")
      const rememberCheckbox = document.getElementById("remember-me")

      if (emailInput) {
        emailInput.value = rememberedEmail
      }
      if (rememberCheckbox) {
        rememberCheckbox.checked = true
      }
    }
  }
}

// Add notification styles
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .notification-close:hover {
    opacity: 1;
  }
`
document.head.appendChild(notificationStyles)

// Initialize login functionality
document.addEventListener("DOMContentLoaded", () => {
  const loginManager = new LoginManager()
  loginManager.loadRememberedEmail()
})
