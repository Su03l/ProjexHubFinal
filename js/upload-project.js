// Upload Project JavaScript
class UploadProjectManager {
  constructor() {
    this.currentStep = 1
    this.totalSteps = 4
    this.selectedTechnologies = new Set()
    this.uploadedFiles = {
      images: [],
      video: null,
    }

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupFileUploads()
    this.setupTechnologyTags()
    this.updateFormNavigation()
  }

  setupEventListeners() {
    // Navigation buttons
    document.getElementById("next-btn").addEventListener("click", () => this.nextStep())
    document.getElementById("prev-btn").addEventListener("click", () => this.prevStep())
    document.getElementById("submit-btn").addEventListener("click", (e) => this.submitForm(e))

    // Form submission
    document.getElementById("upload-form").addEventListener("submit", (e) => this.submitForm(e))

    // Custom technology input
    document.getElementById("custom-tech").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        this.addCustomTechnology(e.target.value.trim())
        e.target.value = ""
      }
    })
  }

  setupFileUploads() {
    // Images upload
    const imagesArea = document.getElementById("project-images")
    const imagesInput = document.getElementById("images-input")

    imagesArea.addEventListener("click", () => imagesInput.click())
    imagesArea.addEventListener("dragover", (e) => this.handleDragOver(e))
    imagesArea.addEventListener("dragleave", (e) => this.handleDragLeave(e))
    imagesArea.addEventListener("drop", (e) => this.handleImageDrop(e))

    imagesInput.addEventListener("change", (e) => this.handleImageSelect(e))

    // Video upload
    const videoArea = document.getElementById("project-video")
    const videoInput = document.getElementById("video-input")

    videoArea.addEventListener("click", () => videoInput.click())
    videoArea.addEventListener("dragover", (e) => this.handleDragOver(e))
    videoArea.addEventListener("dragleave", (e) => this.handleDragLeave(e))
    videoArea.addEventListener("drop", (e) => this.handleVideoDrop(e))

    videoInput.addEventListener("change", (e) => this.handleVideoSelect(e))
  }

  setupTechnologyTags() {
    const techTags = document.querySelectorAll(".tech-tag")
    techTags.forEach((tag) => {
      tag.addEventListener("click", () => this.toggleTechnology(tag))
    })
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
        this.updateStepDisplay()
        this.updateFormNavigation()

        if (this.currentStep === 4) {
          this.populateReview()
        }
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
      this.updateStepDisplay()
      this.updateFormNavigation()
    }
  }

  updateStepDisplay() {
    // Update progress steps
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      const stepNumber = index + 1
      step.classList.remove("active", "completed")

      if (stepNumber === this.currentStep) {
        step.classList.add("active")
      } else if (stepNumber < this.currentStep) {
        step.classList.add("completed")
      }
    })

    // Update form steps
    document.querySelectorAll(".form-step").forEach((step, index) => {
      const stepNumber = index + 1
      step.classList.remove("active")

      if (stepNumber === this.currentStep) {
        step.classList.add("active")
      }
    })

    // Smooth scroll to top
    document.querySelector(".upload-form-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  updateFormNavigation() {
    const prevBtn = document.getElementById("prev-btn")
    const nextBtn = document.getElementById("next-btn")
    const submitBtn = document.getElementById("submit-btn")

    // Previous button
    prevBtn.style.display = this.currentStep > 1 ? "block" : "none"

    // Next/Submit buttons
    if (this.currentStep === this.totalSteps) {
      nextBtn.style.display = "none"
      submitBtn.style.display = "block"
    } else {
      nextBtn.style.display = "block"
      submitBtn.style.display = "none"
    }
  }

  validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`)
    const requiredFields = currentStepElement.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        this.showFieldError(field, "هذا الحقل مطلوب")
        isValid = false
      } else {
        this.clearFieldError(field)
      }
    })

    // Special validation for step 2 (technologies)
    if (this.currentStep === 2 && this.selectedTechnologies.size === 0) {
      this.showMessage("يرجى اختيار تقنية واحدة على الأقل", "error")
      isValid = false
    }

    return isValid
  }

  showFieldError(field, message) {
    this.clearFieldError(field)

    field.style.borderColor = "#ef4444"

    const errorElement = document.createElement("div")
    errorElement.className = "field-error"
    errorElement.textContent = message
    errorElement.style.color = "#ef4444"
    errorElement.style.fontSize = "0.875rem"
    errorElement.style.marginTop = "0.25rem"

    field.parentNode.appendChild(errorElement)
  }

  clearFieldError(field) {
    field.style.borderColor = "#e5e7eb"
    const errorElement = field.parentNode.querySelector(".field-error")
    if (errorElement) {
      errorElement.remove()
    }
  }

  toggleTechnology(tag) {
    const tech = tag.dataset.tech

    if (this.selectedTechnologies.has(tech)) {
      this.selectedTechnologies.delete(tech)
      tag.classList.remove("selected")
    } else {
      this.selectedTechnologies.add(tech)
      tag.classList.add("selected")
    }

    this.updateSelectedTechnologies()
  }

  addCustomTechnology(tech) {
    if (tech && !this.selectedTechnologies.has(tech)) {
      this.selectedTechnologies.add(tech)

      // Create new tag
      const tagElement = document.createElement("div")
      tagElement.className = "tech-tag selected"
      tagElement.dataset.tech = tech
      tagElement.textContent = tech
      tagElement.addEventListener("click", () => this.toggleTechnology(tagElement))

      document.getElementById("tech-tags").appendChild(tagElement)
      this.updateSelectedTechnologies()
    }
  }

  updateSelectedTechnologies() {
    document.getElementById("selected-technologies").value = Array.from(this.selectedTechnologies).join(",")
  }

  // File upload handlers
  handleDragOver(e) {
    e.preventDefault()
    e.currentTarget.classList.add("dragover")
  }

  handleDragLeave(e) {
    e.preventDefault()
    e.currentTarget.classList.remove("dragover")
  }

  handleImageDrop(e) {
    e.preventDefault()
    e.currentTarget.classList.remove("dragover")

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    this.processImageFiles(files)
  }

  handleImageSelect(e) {
    const files = Array.from(e.target.files)
    this.processImageFiles(files)
  }

  processImageFiles(files) {
    files.forEach((file) => {
      if (this.uploadedFiles.images.length < 10) {
        // Limit to 10 images
        this.uploadedFiles.images.push(file)
        this.displayUploadedFile(file, "images")
      }
    })
  }

  handleVideoDrop(e) {
    e.preventDefault()
    e.currentTarget.classList.remove("dragover")

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("video/"))
    if (files.length > 0) {
      this.processVideoFile(files[0])
    }
  }

  handleVideoSelect(e) {
    if (e.target.files.length > 0) {
      this.processVideoFile(e.target.files[0])
    }
  }

  processVideoFile(file) {
    this.uploadedFiles.video = file
    this.displayUploadedFile(file, "video")
  }

  displayUploadedFile(file, type) {
    const container = document.getElementById(`uploaded-${type}`)

    if (type === "video") {
      container.innerHTML = "" // Clear previous video
    }

    const fileItem = document.createElement("div")
    fileItem.className = "file-item"

    const fileInfo = document.createElement("div")
    fileInfo.className = "file-info"

    const fileIcon = document.createElement("div")
    fileIcon.className = "file-icon"
    fileIcon.innerHTML = type === "video" ? '<i class="fas fa-video"></i>' : '<i class="fas fa-image"></i>'

    const fileDetails = document.createElement("div")
    fileDetails.className = "file-details"
    fileDetails.innerHTML = `
            <h4>${file.name}</h4>
            <p>${this.formatFileSize(file.size)}</p>
        `

    const removeBtn = document.createElement("button")
    removeBtn.className = "file-remove"
    removeBtn.innerHTML = '<i class="fas fa-times"></i>'
    removeBtn.addEventListener("click", () => this.removeFile(file, type, fileItem))

    fileInfo.appendChild(fileIcon)
    fileInfo.appendChild(fileDetails)
    fileItem.appendChild(fileInfo)
    fileItem.appendChild(removeBtn)

    container.appendChild(fileItem)
  }

  removeFile(file, type, element) {
    if (type === "video") {
      this.uploadedFiles.video = null
    } else {
      const index = this.uploadedFiles.images.indexOf(file)
      if (index > -1) {
        this.uploadedFiles.images.splice(index, 1)
      }
    }

    element.remove()
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  populateReview() {
    const reviewContent = document.getElementById("review-content")
    const formData = new FormData(document.getElementById("upload-form"))

    const reviewItems = [
      { label: "عنوان المشروع", value: formData.get("project-title") },
      { label: "الجامعة", value: formData.get("university") },
      { label: "التخصص", value: formData.get("major") },
      { label: "سنة التخرج", value: formData.get("year") },
      { label: "الدرجة", value: formData.get("grade") || "غير محدد" },
      { label: "فئة المشروع", value: formData.get("project-category") },
      { label: "التقنيات المستخدمة", value: Array.from(this.selectedTechnologies).join(", ") },
      { label: "عدد الصور", value: this.uploadedFiles.images.length },
      { label: "فيديو توضيحي", value: this.uploadedFiles.video ? "نعم" : "لا" },
    ]

    reviewContent.innerHTML = reviewItems
      .map(
        (item) => `
            <div class="review-item">
                <span class="review-label">${item.label}:</span>
                <span class="review-value">${item.value}</span>
            </div>
        `,
      )
      .join("")
  }

  async submitForm(e) {
    e.preventDefault()

    if (!this.validateCurrentStep()) {
      return
    }

    const termsAgreement = document.getElementById("terms-agreement")
    if (!termsAgreement.checked) {
      this.showMessage("يجب الموافقة على شروط الاستخدام", "error")
      return
    }

    const submitBtn = document.getElementById("submit-btn")
    const originalText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري النشر...'

      // Simulate form submission
      await this.simulateUpload()

      this.showMessage("تم نشر المشروع بنجاح!", "success")

      // Redirect after success
      setTimeout(() => {
        window.location.href = "explore.html"
      }, 2000)
    } catch (error) {
      this.showMessage("حدث خطأ أثناء نشر المشروع. يرجى المحاولة مرة أخرى.", "error")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  }

  async simulateUpload() {
    // Simulate API call delay
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    const messageElement = document.createElement("div")
    messageElement.className = `form-message ${type}`
    messageElement.textContent = message

    const styles = {
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontWeight: "600",
      textAlign: "center",
    }

    if (type === "success") {
      styles.background = "#d1fae5"
      styles.color = "#065f46"
      styles.border = "1px solid #a7f3d0"
    } else {
      styles.background = "#fee2e2"
      styles.color = "#991b1b"
      styles.border = "1px solid #fca5a5"
    }

    Object.assign(messageElement.style, styles)

    const form = document.getElementById("upload-form")
    form.insertBefore(messageElement, form.firstChild)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove()
      }
    }, 5000)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new UploadProjectManager()
})
