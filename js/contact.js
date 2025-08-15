// Contact Page JavaScript
class ContactManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupContactForm()
    this.setupFileUpload()
    this.setupFAQ()
    this.setupCharacterCount()
    this.setupMap()
  }

  setupContactForm() {
    const form = document.getElementById("contact-form")
    const submitBtn = document.getElementById("submit-btn")

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await this.handleFormSubmission(e)
    })

    // Real-time validation
    const requiredFields = form.querySelectorAll("[required]")
    requiredFields.forEach((field) => {
      field.addEventListener("blur", () => this.validateField(field))
      field.addEventListener("input", () => this.clearFieldError(field))
    })
  }

  async handleFormSubmission(e) {
    const form = e.target
    const formData = new FormData(form)
    const submitBtn = document.getElementById("submit-btn")

    // Collect form data
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      university: formData.get("university"),
      subject: formData.get("subject"),
      priority: formData.get("priority"),
      message: formData.get("message"),
      newsletter: formData.get("newsletter") === "on",
      attachment: formData.get("attachment"),
    }

    // Validate form
    let isValid = true
    const requiredFields = form.querySelectorAll("[required]")

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    if (!isValid) {
      this.showNotification("يرجى تصحيح الأخطاء في النموذج", "error")
      return
    }

    try {
      this.setButtonLoading(submitBtn, true)

      // Simulate API call
      await this.simulateFormSubmission(data)

      this.showNotification("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.", "success")

      // Reset form
      form.reset()
      this.updateCharacterCount()
      this.clearUploadedFile()
    } catch (error) {
      this.showNotification(error.message || "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.", "error")
    } finally {
      this.setButtonLoading(submitBtn, false)
    }
  }

  validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let message = ""

    // Clear previous errors
    this.clearFieldError(field)

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false
      message = "هذا الحقل مطلوب"
    }
    // Email validation
    else if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        message = "يرجى إدخال بريد إلكتروني صحيح"
      }
    }
    // Phone validation
    else if (field.type === "tel" && value) {
      const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
      if (!phoneRegex.test(value)) {
        isValid = false
        message = "يرجى إدخال رقم هاتف صحيح"
      }
    }
    // Message length validation
    else if (field.name === "message" && value) {
      if (value.length < 10) {
        isValid = false
        message = "الرسالة يجب أن تكون 10 أحرف على الأقل"
      } else if (value.length > 1000) {
        isValid = false
        message = "الرسالة يجب أن تكون أقل من 1000 حرف"
      }
    }

    if (!isValid) {
      this.showFieldError(field, message)
    }

    return isValid
  }

  showFieldError(field, message) {
    field.style.borderColor = "#ef4444"

    // Remove existing error message
    const existingError = field.parentElement.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    // Add new error message
    const errorElement = document.createElement("div")
    errorElement.className = "error-message"
    errorElement.style.color = "#ef4444"
    errorElement.style.fontSize = "0.8rem"
    errorElement.style.marginTop = "0.25rem"
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    field.parentElement.appendChild(errorElement)
  }

  clearFieldError(field) {
    field.style.borderColor = "#e5e7eb"
    const errorElement = field.parentElement.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  setupFileUpload() {
    const uploadArea = document.getElementById("file-upload")
    const fileInput = document.getElementById("attachment")

    // Click to upload
    uploadArea.addEventListener("click", () => fileInput.click())

    // Drag and drop
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      uploadArea.classList.add("dragover")
    })

    uploadArea.addEventListener("dragleave", (e) => {
      e.preventDefault()
      uploadArea.classList.remove("dragover")
    })

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      uploadArea.classList.remove("dragover")

      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.handleFileUpload(files[0])
      }
    })

    // File input change
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        this.handleFileUpload(e.target.files[0])
      }
    })
  }

  handleFileUpload(file) {
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      this.showNotification("حجم الملف يجب أن يكون أقل من 5 ميجابايت", "error")
      return
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/jpeg",
      "image/png",
    ]

    if (!allowedTypes.includes(file.type)) {
      this.showNotification("نوع الملف غير مدعوم. يرجى اختيار ملف PDF, DOC, DOCX, TXT, JPG, أو PNG", "error")
      return
    }

    this.displayUploadedFile(file)
  }

  displayUploadedFile(file) {
    const uploadedFileDiv = document.getElementById("uploaded-file")

    uploadedFileDiv.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="fas fa-file"></i>
                </div>
                <div>
                    <div style="font-weight: 600; color: #1a1a1a;">${file.name}</div>
                    <div style="font-size: 0.8rem; color: #6b7280;">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="file-remove" onclick="contactManager.clearUploadedFile()">
                <i class="fas fa-times"></i>
            </button>
        `

    uploadedFileDiv.style.display = "flex"
  }

  clearUploadedFile() {
    const uploadedFileDiv = document.getElementById("uploaded-file")
    const fileInput = document.getElementById("attachment")

    uploadedFileDiv.style.display = "none"
    uploadedFileDiv.innerHTML = ""
    fileInput.value = ""
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  setupCharacterCount() {
    const messageTextarea = document.getElementById("message")
    const charCount = document.getElementById("char-count")

    messageTextarea.addEventListener("input", () => {
      this.updateCharacterCount()
    })
  }

  updateCharacterCount() {
    const messageTextarea = document.getElementById("message")
    const charCount = document.getElementById("char-count")
    const currentLength = messageTextarea.value.length

    charCount.textContent = currentLength

    // Change color based on length
    if (currentLength > 900) {
      charCount.style.color = "#ef4444"
    } else if (currentLength > 800) {
      charCount.style.color = "#f59e0b"
    } else {
      charCount.style.color = "#6b7280"
    }
  }

  setupFAQ() {
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")

        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active")
        })

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
        }
      })
    })
  }

  setupMap() {
    const mapBtn = document.querySelector(".map-btn")

    mapBtn.addEventListener("click", () => {
      // Open Google Maps with the location
      const address = "شارع الملك فهد، حي العليا، الرياض، المملكة العربية السعودية"
      const encodedAddress = encodeURIComponent(address)
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

      window.open(mapsUrl, "_blank")
    })
  }

  async simulateFormSubmission(data) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          // 90% success rate
          resolve({ success: true, data })
        } else {
          reject(new Error("حدث خطأ في الخادم"))
        }
      }, 2000)
    })
  }

  setButtonLoading(button, loading = true) {
    if (loading) {
      button.disabled = true
      const originalContent = button.innerHTML
      button.dataset.originalContent = originalContent
      button.innerHTML = '<div class="spinner"></div> جاري الإرسال...'
    } else {
      button.disabled = false
      button.innerHTML = button.dataset.originalContent || button.innerHTML
    }
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".contact-notification")
    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement("div")
    notification.className = `contact-notification ${type}`
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
}

// Initialize contact functionality
let contactManager
document.addEventListener("DOMContentLoaded", () => {
  contactManager = new ContactManager()
})
