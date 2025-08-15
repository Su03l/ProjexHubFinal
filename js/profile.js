// Profile Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  initializeProfilePage()
})

function initializeProfilePage() {
  // Initialize tab navigation
  initializeTabNavigation()

  // Initialize user menu
  initializeUserMenu()

  // Initialize avatar upload
  initializeAvatarUpload()

  // Initialize password toggles
  initializePasswordToggles()

  // Initialize password strength checker
  initializePasswordStrength()

  // Initialize forms
  initializeForms()

  // Load user projects
  loadUserProjects()

  // Initialize project actions
  initializeProjectActions()

  // Initialize mobile menu toggle
  initializeMobileMenuToggle()
}

// Tab Navigation
function initializeTabNavigation() {
  const tabButtons = document.querySelectorAll(".profile-nav-btn")
  const tabContents = document.querySelectorAll(".profile-tab")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Remove active class from all buttons and tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((tab) => tab.classList.remove("active"))

      // Add active class to clicked button and corresponding tab
      button.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })
}

// User Menu
function initializeUserMenu() {
  const userMenuBtn = document.getElementById("userMenuBtn")
  const userDropdown = document.getElementById("userDropdown")

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      userMenuBtn.classList.toggle("active")
      userDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      userMenuBtn.classList.remove("active")
      userDropdown.classList.remove("active")
    })
  }
}

// Avatar Upload
function initializeAvatarUpload() {
  const avatarEditBtn = document.getElementById("avatarEditBtn")
  const avatarInput = document.getElementById("avatarInput")
  const profileImage = document.getElementById("profileImage")

  if (avatarEditBtn && avatarInput && profileImage) {
    avatarEditBtn.addEventListener("click", () => {
      avatarInput.click()
    })

    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.src = e.target.result
          showNotification("تم تحديث الصورة الشخصية بنجاح")
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

// Password Toggles
function initializePasswordToggles() {
  const passwordToggles = document.querySelectorAll(".password-toggle")

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.previousElementSibling
      const isPassword = input.type === "password"

      input.type = isPassword ? "text" : "password"

      // Update icon
      const icon = toggle.querySelector("svg")
      if (isPassword) {
        icon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `
      } else {
        icon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `
      }
    })
  })
}

// Password Strength
function initializePasswordStrength() {
  const newPasswordInput = document.getElementById("newPassword")
  const strengthFill = document.querySelector(".strength-fill")
  const strengthText = document.querySelector(".strength-text")

  if (newPasswordInput && strengthFill && strengthText) {
    newPasswordInput.addEventListener("input", (e) => {
      const password = e.target.value
      const strength = calculatePasswordStrength(password)

      // Update strength bar
      strengthFill.className = `strength-fill ${strength.level}`

      // Update strength text
      const strengthLabels = {
        weak: "ضعيفة",
        fair: "متوسطة",
        good: "جيدة",
        strong: "قوية",
      }

      strengthText.textContent = password ? `قوة كلمة المرور: ${strengthLabels[strength.level]}` : "قوة كلمة المرور"
    })
  }
}

function calculatePasswordStrength(password) {
  let score = 0
  let level = "weak"

  if (password.length >= 8) score += 1
  if (password.match(/[a-z]/)) score += 1
  if (password.match(/[A-Z]/)) score += 1
  if (password.match(/[0-9]/)) score += 1
  if (password.match(/[^a-zA-Z0-9]/)) score += 1

  if (score >= 4) level = "strong"
  else if (score >= 3) level = "good"
  else if (score >= 2) level = "fair"

  return { score, level }
}

// Forms
function initializeForms() {
  // Profile settings form
  const profileForm = document.getElementById("profileSettingsForm")
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleProfileUpdate()
    })
  }

  // Password change form
  const passwordForm = document.getElementById("passwordChangeForm")
  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handlePasswordChange()
    })
  }
}

function handleProfileUpdate() {
  // Show loading state
  const submitBtn = document.querySelector('#profileSettingsForm button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<div class="loading-spinner"></div> جاري الحفظ...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
    showNotification("تم حفظ التغييرات بنجاح")
  }, 2000)
}

function handlePasswordChange() {
  const currentPassword = document.getElementById("currentPassword").value
  const newPassword = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  // Validate passwords
  if (newPassword !== confirmPassword) {
    showNotification("كلمات المرور غير متطابقة", "error")
    return
  }

  if (newPassword.length < 8) {
    showNotification("كلمة المرور يجب أن تكون 8 أحرف على الأقل", "error")
    return
  }

  // Show loading state
  const submitBtn = document.querySelector('#passwordChangeForm button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<div class="loading-spinner"></div> جاري التغيير...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
    showNotification("تم تغيير كلمة المرور بنجاح")

    // Clear form
    document.getElementById("currentPassword").value = ""
    document.getElementById("newPassword").value = ""
    document.getElementById("confirmPassword").value = ""

    // Reset strength indicator
    const strengthFill = document.querySelector(".strength-fill")
    const strengthText = document.querySelector(".strength-text")
    if (strengthFill && strengthText) {
      strengthFill.className = "strength-fill"
      strengthText.textContent = "قوة كلمة المرور"
    }
  }, 2000)
}

// Load User Projects
function loadUserProjects() {
  const projectsGrid = document.getElementById("userProjectsGrid")
  if (!projectsGrid) return

  // Sample user projects data
  const userProjects = [
    {
      id: 1,
      title: "نظام إدارة المكتبات الذكي",
      description: "نظام شامل لإدارة المكتبات الجامعية باستخدام تقنيات الذكاء الاصطناعي",
      image: "/placeholder.svg?height=200&width=350",
      date: "2024-01-15",
      views: 1250,
      likes: 89,
      status: "published",
    },
    {
      id: 2,
      title: "تطبيق الصحة النفسية للطلاب",
      description: "تطبيق محمول يهدف إلى دعم الصحة النفسية للطلاب الجامعيين",
      image: "/placeholder.svg?height=200&width=350",
      date: "2024-02-20",
      views: 980,
      likes: 67,
      status: "published",
    },
    {
      id: 3,
      title: "منصة التعلم التفاعلي",
      description: "منصة تعليمية تفاعلية تستخدم تقنيات الواقع المعزز",
      image: "/placeholder.svg?height=200&width=350",
      date: "2024-03-10",
      views: 756,
      likes: 45,
      status: "draft",
    },
  ]

  // Render projects
  projectsGrid.innerHTML = userProjects
    .map(
      (project) => `
        <div class="user-project-card" data-project-id="${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <svg class="project-image-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: none;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                </svg>
                <div class="project-actions">
                    <button class="project-action-btn edit" onclick="editProject(${project.id})" title="تعديل المشروع">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="project-action-btn delete" onclick="deleteProject(${project.id})" title="حذف المشروع">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="project-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${formatDate(project.date)}
                    </div>
                    <div class="project-stats">
                        <div class="project-stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            ${project.views}
                        </div>
                        <div class="project-stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            ${project.likes}
                        </div>
                    </div>
                </div>
                <div class="project-status">
                    <span class="status-badge ${project.status}">
                        ${project.status === "published" ? "منشور" : "مسودة"}
                    </span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Project Actions
function initializeProjectActions() {
  // Project actions are handled by individual onclick handlers
}

function editProject(projectId) {
  // Redirect to edit project page or open modal
  window.location.href = `upload-project.html?edit=${projectId}`
}

function deleteProject(projectId) {
  if (confirm("هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.")) {
    // Show loading state
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`)
    if (projectCard) {
      projectCard.style.opacity = "0.5"
      projectCard.style.pointerEvents = "none"
    }

    // Simulate API call
    setTimeout(() => {
      if (projectCard) {
        projectCard.remove()
      }
      showNotification("تم حذف المشروع بنجاح")
    }, 1500)
  }
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("ar-SA", options)
}

function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                ${
                  type === "success"
                    ? '<polyline points="20,6 9,17 4,12"/>'
                    : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `

  // Add to page
  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Mobile menu toggle
function initializeMobileMenuToggle() {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuToggle = document.querySelector(".menu-toggle")

  if (mobileMenu && menuToggle) {
    menuToggle.addEventListener("click", () => {
      toggleMobileMenu()
    })
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuToggle = document.querySelector(".menu-toggle")

  if (mobileMenu && menuToggle) {
    mobileMenu.classList.toggle("active")
    menuToggle.classList.toggle("active")
  }
}
