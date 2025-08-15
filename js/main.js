// ===== ProjexHub - Main JavaScript File =====

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme)
    document.body.className = `${this.theme}-theme`
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  bindEvents() {
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// User Management
class UserManager {
  constructor() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    this.userEmail = localStorage.getItem("userEmail") || ""
    this.userName = localStorage.getItem("userName") || "المستخدم"
    this.userAvatar = localStorage.getItem("userAvatar") || "م"
    this.init()
  }

  init() {
    this.updateNavbar()
    this.bindEvents()
  }

  updateNavbar() {
    const authButtons = document.querySelector(".auth-buttons")
    if (!authButtons) return

    if (this.isLoggedIn) {
      // Replace auth buttons with user menu
      authButtons.innerHTML = `
        <div class="user-menu">
          <button class="user-menu-trigger" id="userMenuTrigger">
            <div class="user-avatar">${this.userAvatar}</div>
            <span class="user-name">${this.userName}</span>
            <svg class="user-menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
          <div class="user-dropdown" id="userDropdown">
            <div class="user-dropdown-header">
              <div class="user-avatar-large">${this.userAvatar}</div>
              <div class="user-info">
                <div class="user-name-large">${this.userName}</div>
                <div class="user-email">${this.userEmail}</div>
              </div>
            </div>
            <div class="user-dropdown-divider"></div>
            <a href="profile.html" class="user-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              الملف الشخصي
            </a>
            <a href="upload-project.html" class="user-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              رفع مشروع
            </a>
            <button class="user-dropdown-item logout-btn" id="logoutBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              تسجيل الخروج
            </button>
          </div>
        </div>
      `
    } else {
      // Show login/signup buttons
      authButtons.innerHTML = `
        <a href="login.html" class="btn btn-secondary">تسجيل الدخول</a>
        <a href="signup.html" class="btn btn-primary">إنشاء حساب</a>
      `
    }
  }

  bindEvents() {
    if (!this.isLoggedIn) return

    const userMenuTrigger = document.getElementById("userMenuTrigger")
    const userDropdown = document.getElementById("userDropdown")
    const logoutBtn = document.getElementById("logoutBtn")

    if (userMenuTrigger && userDropdown) {
      userMenuTrigger.addEventListener("click", (e) => {
        e.stopPropagation()
        userDropdown.classList.toggle("active")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!userMenuTrigger.contains(e.target) && !userDropdown.contains(e.target)) {
          userDropdown.classList.remove("active")
        }
      })
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        this.logout()
      })
    }
  }

  logout() {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("userAvatar")
    localStorage.removeItem("rememberedEmail")

    if (window.notificationManager) {
      window.notificationManager.success("تم تسجيل الخروج بنجاح")
    }

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1000)
  }
}

// Mobile Menu Management
class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById("mobileMenuBtn")
    this.menu = document.getElementById("mobileMenu")
    this.isOpen = false
    this.init()
  }

  init() {
    if (this.menuBtn && this.menu) {
      this.bindEvents()
    }
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.menuBtn.classList.toggle("active", this.isOpen)
    this.menu.classList.toggle("active", this.isOpen)

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isOpen ? "hidden" : ""
  }

  close() {
    this.isOpen = false
    this.menuBtn.classList.remove("active")
    this.menu.classList.remove("active")
    document.body.style.overflow = ""
  }

  bindEvents() {
    this.menuBtn.addEventListener("click", () => this.toggle())

    // Close menu when clicking on links
    const menuLinks = this.menu.querySelectorAll("a")
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => this.close())
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.menu.contains(e.target) && !this.menuBtn.contains(e.target)) {
        this.close()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      }
    })
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Navbar Scroll Effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.init()
  }

  init() {
    if (this.navbar) {
      window.addEventListener("scroll", () => this.handleScroll())
    }
  }

  handleScroll() {
    const scrolled = window.scrollY > 50
    this.navbar.classList.toggle("scrolled", scrolled)
  }
}

// Animation on Scroll
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll("[data-animate]")
    this.init()
  }

  init() {
    if (this.elements.length > 0) {
      this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      })

      this.elements.forEach((el) => this.observer.observe(el))
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Form Validation
class FormValidator {
  constructor() {
    this.forms = document.querySelectorAll("form[data-validate]")
    this.init()
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e))

      // Real-time validation
      const inputs = form.querySelectorAll("input, textarea, select")
      inputs.forEach((input) => {
        input.addEventListener("blur", () => this.validateField(input))
        input.addEventListener("input", () => this.clearError(input))
      })
    })
  }

  handleSubmit(e) {
    const form = e.target
    const isValid = this.validateForm(form)

    if (!isValid) {
      e.preventDefault()
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  validateField(field) {
    const value = field.value.trim()
    const type = field.type
    let isValid = true
    let message = ""

    // Required validation
    if (field.hasAttribute("required") && !value) {
      isValid = false
      message = "هذا الحقل مطلوب"
    }

    // Email validation
    if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        message = "يرجى إدخال بريد إلكتروني صحيح"
      }
    }

    // Password validation
    if (type === "password" && value) {
      if (value.length < 8) {
        isValid = false
        message = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
      }
    }

    // Phone validation
    if (field.name === "phone" && value) {
      const phoneRegex = /^[0-9+\-\s()]+$/
      if (!phoneRegex.test(value)) {
        isValid = false
        message = "يرجى إدخال رقم هاتف صحيح"
      }
    }

    this.showFieldError(field, isValid ? "" : message)
    return isValid
  }

  showFieldError(field, message) {
    this.clearError(field)

    if (message) {
      field.classList.add("error")
      const errorDiv = document.createElement("div")
      errorDiv.className = "field-error"
      errorDiv.textContent = message
      field.parentNode.appendChild(errorDiv)
    }
  }

  clearError(field) {
    field.classList.remove("error")
    const existingError = field.parentNode.querySelector(".field-error")
    if (existingError) {
      existingError.remove()
    }
  }
}

// Loading States
class LoadingManager {
  static show(element, text = "جاري التحميل...") {
    element.disabled = true
    element.innerHTML = `<span class="loading"></span> ${text}`
  }

  static hide(element, originalText) {
    element.disabled = false
    element.innerHTML = originalText
  }
}

// Notification System
class NotificationManager {
  constructor() {
    this.container = this.createContainer()
  }

  createContainer() {
    let container = document.getElementById("notifications")
    if (!container) {
      container = document.createElement("div")
      container.id = "notifications"
      container.className = "notifications-container"
      document.body.appendChild(container)
    }
    return container
  }

  show(message, type = "info", duration = 5000) {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `

    this.container.appendChild(notification)

    // Auto remove
    const timer = setTimeout(() => {
      this.remove(notification)
    }, duration)

    // Manual close
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      clearTimeout(timer)
      this.remove(notification)
    })

    // Animate in
    setTimeout(() => notification.classList.add("show"), 100)
  }

  remove(notification) {
    notification.classList.add("hide")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }

  success(message) {
    this.show(message, "success")
  }

  error(message) {
    this.show(message, "error")
  }

  warning(message) {
    this.show(message, "warning")
  }

  info(message) {
    this.show(message, "info")
  }
}

// Utility Functions
const Utils = {
  // Format numbers with Arabic numerals
  formatNumber(num) {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٢", "٩"]
    return num.toString().replace(/\d/g, (digit) => arabicNumerals[digit])
  },

  // Format date in Arabic
  formatArabicDate(date) {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ]

    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayName}، ${this.formatNumber(day)} ${month} ${this.formatNumber(year)}`
  },

  // Debounce function
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
}

// Global Functions
function performSearch() {
  const searchInput = document.getElementById("searchInput")
  const query = searchInput?.value.trim()

  if (query) {
    // Redirect to explore page with search query
    window.location.href = `explore.html?search=${encodeURIComponent(query)}`
  }
}

function openWhatsApp() {
  const message = encodeURIComponent("مرحباً، أريد الاستفسار عن منصة ProjexHub")
  const whatsappUrl = `https://wa.me/966500000000?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core components
  window.themeManager = new ThemeManager()
  window.userManager = new UserManager()
  window.mobileMenu = new MobileMenu()
  window.smoothScroll = new SmoothScroll()
  window.navbarScroll = new NavbarScroll()
  window.scrollAnimations = new ScrollAnimations()
  window.formValidator = new FormValidator()
  window.notificationManager = new NotificationManager()

  // Add loading states to buttons
  document.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.addEventListener("click", function (e) {
      const form = this.closest("form")
      if (form && form.checkValidity()) {
        const originalText = this.innerHTML
        LoadingManager.show(this)

        // Simulate form submission
        setTimeout(() => {
          LoadingManager.hide(this, originalText)
        }, 2000)
      }
    })
  })

  // Add search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }

  // Add CSS for user menu
  if (!document.getElementById("user-menu-styles")) {
    const style = document.createElement("style")
    style.id = "user-menu-styles"
    style.textContent = `
      .user-menu {
        position: relative;
      }
      
      .user-menu-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-xl);
        cursor: pointer;
        transition: all var(--transition-fast);
        color: var(--text-primary);
      }
      
      .user-menu-trigger:hover {
        background: var(--bg-tertiary);
        border-color: var(--primary);
      }
      
      .user-avatar {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: var(--font-bold);
        font-size: 0.9rem;
      }
      
      .user-name {
        font-weight: var(--font-medium);
        font-size: 0.9rem;
      }
      
      .user-menu-arrow {
        width: 16px;
        height: 16px;
        transition: transform var(--transition-fast);
      }
      
      .user-menu-trigger:hover .user-menu-arrow {
        transform: rotate(180deg);
      }
      
      .user-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        min-width: 280px;
        background: var(--bg-primary);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-2xl);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all var(--transition-fast);
        z-index: 1000;
      }
      
      .user-dropdown.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .user-dropdown-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
      }
      
      .user-avatar-large {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: var(--font-bold);
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      
      .user-info {
        flex: 1;
        min-width: 0;
      }
      
      .user-name-large {
        font-weight: var(--font-bold);
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
      
      .user-email {
        font-size: 0.85rem;
        color: var(--text-muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .user-dropdown-divider {
        height: 1px;
        background: var(--border-light);
        margin: 0 1rem;
      }
      
      .user-dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        color: var(--text-secondary);
        text-decoration: none;
        transition: all var(--transition-fast);
        border: none;
        background: none;
        width: 100%;
        text-align: right;
        cursor: pointer;
        font-size: 0.95rem;
      }
      
      .user-dropdown-item:hover {
        background: var(--bg-secondary);
        color: var(--primary);
      }
      
      .user-dropdown-item:first-of-type {
        border-radius: 0;
      }
      
      .user-dropdown-item:last-of-type {
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      }
      
      .user-dropdown-item svg {
        width: 18px;
        height: 18px;
        stroke-width: 2;
      }
      
      .logout-btn:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
      
      @media (max-width: 768px) {
        .user-dropdown {
          right: -1rem;
          left: -1rem;
          min-width: auto;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Add CSS for notifications
  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            .notifications-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            }
            
            .notification {
                background: var(--bg-primary);
                border: 2px solid var(--border-light);
                border-radius: var(--radius-lg);
                margin-bottom: var(--spacing-md);
                box-shadow: var(--shadow-lg);
                transform: translateX(100%);
                transition: all 0.3s ease;
                opacity: 0;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.hide {
                transform: translateX(100%);
                opacity: 0;
            }
            
            .notification-success {
                border-color: #10b981;
            }
            
            .notification-error {
                border-color: #ef4444;
            }
            
            .notification-warning {
                border-color: #f59e0b;
            }
            
            .notification-info {
                border-color: var(--primary);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--spacing-lg);
            }
            
            .notification-message {
                flex: 1;
                color: var(--text-primary);
                font-weight: var(--font-medium);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                font-size: 1.5rem;
                margin-right: var(--spacing-md);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            .field-error {
                color: #ef4444;
                font-size: var(--font-size-sm);
                margin-top: var(--spacing-xs);
            }
            
            .form-input.error {
                border-color: #ef4444;
            }
        `
    document.head.appendChild(style)
  }
})

// Export for use in other files
window.ProjexHub = {
  ThemeManager,
  UserManager,
  MobileMenu,
  SmoothScroll,
  NavbarScroll,
  ScrollAnimations,
  FormValidator,
  LoadingManager,
  NotificationManager,
  Utils,
  performSearch,
  openWhatsApp,
}
