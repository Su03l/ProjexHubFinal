// ===== ProjexHub - Index Page JavaScript =====

// Real-time Clock
class RealTimeClock {
  constructor() {
    this.hoursElement = document.getElementById("hours")
    this.minutesElement = document.getElementById("minutes")
    this.secondsElement = document.getElementById("seconds")
    this.currentDateElement = document.getElementById("currentDate")
    this.gregorianDateElement = document.getElementById("gregorianDate")

    if (this.hoursElement && this.minutesElement && this.secondsElement) {
      this.init()
    }
  }

  init() {
    this.updateClock()
    setInterval(() => this.updateClock(), 1000)
  }

  updateClock() {
    const now = new Date()

    // Get Riyadh time (UTC+3)
    const riyadhTime = new Date(now.getTime() + 3 * 60 * 60 * 1000)

    const hours = riyadhTime.getUTCHours()
    const minutes = riyadhTime.getUTCMinutes()
    const seconds = riyadhTime.getUTCSeconds()

    // Update time display with Arabic numerals
    this.hoursElement.textContent = this.formatTime(hours)
    this.minutesElement.textContent = this.formatTime(minutes)
    this.secondsElement.textContent = this.formatTime(seconds)

    // Update date display
    if (this.currentDateElement) {
      this.currentDateElement.textContent = this.getArabicDate(riyadhTime)
    }

    if (this.gregorianDateElement) {
      this.gregorianDateElement.textContent = this.getGregorianDate(riyadhTime)
    }
  }

  formatTime(time) {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    const formattedTime = time.toString().padStart(2, "0")
    return formattedTime.replace(/\d/g, (digit) => arabicNumerals[digit])
  }

  getArabicDate(date) {
    const months = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الثانية",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ]

    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

    // For simplicity, using Gregorian months with Arabic names
    const gregorianMonths = [
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

    const dayName = days[date.getUTCDay()]
    const day = date.getUTCDate()
    const month = gregorianMonths[date.getUTCMonth()]
    const year = date.getUTCFullYear()

    return `${dayName}، ${this.formatTime(day)} ${month} ${this.formatTime(year)}`
  }

  getGregorianDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Riyadh",
    }
    return date.toLocaleDateString("en-US", options)
  }
}

// Statistics Counter Animation
class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number")
    this.init()
  }

  init() {
    if (this.counters.length > 0) {
      this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), { threshold: 0.5 })

      this.counters.forEach((counter) => {
        this.observer.observe(counter)
      })
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target)
        this.observer.unobserve(entry.target)
      }
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target")) || 0
    const duration = 2000 // 2 seconds
    const increment = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      // Format with Arabic numerals
      element.textContent = this.formatArabicNumber(Math.floor(current))
    }, 16)
  }

  formatArabicNumber(num) {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    return num.toString().replace(/\d/g, (digit) => arabicNumerals[digit])
  }
}

// Hero Animations
class HeroAnimations {
  constructor() {
    this.heroElements = document.querySelectorAll(".hero .floating-element")
    this.init()
  }

  init() {
    // Add staggered animation delays
    this.heroElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })

    // Add parallax effect to hero background
    this.addParallaxEffect()
  }

  addParallaxEffect() {
    const hero = document.querySelector(".hero")
    if (!hero) return

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    })
  }
}

// Search Functionality
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById("searchInput")
    this.searchBtn = document.querySelector(".search-btn")
    this.init()
  }

  init() {
    if (this.searchInput) {
      this.bindEvents()
      this.addSearchSuggestions()
    }
  }

  bindEvents() {
    // Enter key search
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch()
      }
    })

    // Search button click
    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", () => this.performSearch())
    }

    // Real-time search suggestions
    this.searchInput.addEventListener(
      "input",
      this.debounce(() => this.showSuggestions(), 300),
    )
  }

  performSearch() {
    const query = this.searchInput.value.trim()
    if (query) {
      // Add to search history
      this.addToSearchHistory(query)

      // Redirect to explore page
      window.location.href = `explore.html?search=${encodeURIComponent(query)}`
    }
  }

  addSearchSuggestions() {
    const suggestions = [
      "ذكاء اصطناعي",
      "تطبيقات الجوال",
      "مواقع الويب",
      "أمن المعلومات",
      "علوم البيانات",
      "الروبوتات",
      "الواقع المعزز",
      "إنترنت الأشياء",
    ]

    // Create suggestions dropdown
    const suggestionsContainer = document.createElement("div")
    suggestionsContainer.className = "search-suggestions"
    suggestionsContainer.style.display = "none"

    this.searchInput.parentNode.appendChild(suggestionsContainer)
  }

  showSuggestions() {
    const query = this.searchInput.value.trim().toLowerCase()
    const suggestionsContainer = document.querySelector(".search-suggestions")

    if (!query || query.length < 2) {
      suggestionsContainer.style.display = "none"
      return
    }

    // Mock suggestions based on query
    const mockSuggestions = [
      `${query} في علوم الحاسب`,
      `مشاريع ${query}`,
      `${query} جامعة الملك سعود`,
      `تطبيق ${query}`,
      `نظام ${query}`,
    ]

    suggestionsContainer.innerHTML = mockSuggestions
      .map(
        (suggestion) => `
                <div class="suggestion-item" onclick="this.selectSuggestion('${suggestion}')">
                    ${suggestion}
                </div>
            `,
      )
      .join("")

    suggestionsContainer.style.display = "block"
  }

  selectSuggestion(suggestion) {
    this.searchInput.value = suggestion
    document.querySelector(".search-suggestions").style.display = "none"
    this.performSearch()
  }

  addToSearchHistory(query) {
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    history = history.filter((item) => item !== query) // Remove duplicates
    history.unshift(query) // Add to beginning
    history = history.slice(0, 10) // Keep only last 10 searches
    localStorage.setItem("searchHistory", JSON.stringify(history))
  }

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
  }
}

// Feature Cards Hover Effects
class FeatureCardsEffects {
  constructor() {
    this.featureCards = document.querySelectorAll(".feature-card, .major-card")
    this.init()
  }

  init() {
    this.featureCards.forEach((card) => {
      card.addEventListener("mouseenter", () => this.onCardHover(card))
      card.addEventListener("mouseleave", () => this.onCardLeave(card))
    })
  }

  onCardHover(card) {
    // Add subtle scale and glow effect
    card.style.transform = "translateY(-8px) scale(1.02)"

    // Add glow effect to icon
    const icon = card.querySelector(".feature-icon, .major-icon")
    if (icon) {
      icon.style.boxShadow = "0 0 20px rgba(37, 99, 235, 0.3)"
    }
  }

  onCardLeave(card) {
    card.style.transform = ""

    const icon = card.querySelector(".feature-icon, .major-icon")
    if (icon) {
      icon.style.boxShadow = ""
    }
  }
}

// Welcome Message Animation
class WelcomeAnimation {
  constructor() {
    this.welcomeCard = document.querySelector(".welcome-card")
    this.init()
  }

  init() {
    if (this.welcomeCard) {
      this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), { threshold: 0.3 })

      this.observer.observe(this.welcomeCard)
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateWelcome()
        this.observer.unobserve(entry.target)
      }
    })
  }

  animateWelcome() {
    const elements = this.welcomeCard.querySelectorAll("h2, .welcome-subtitle, .welcome-description, .welcome-actions")

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "all 0.6s ease"

        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }, 100)
      }, index * 200)
    })
  }
}

// Initialize Index Page Components
document.addEventListener("DOMContentLoaded", () => {
  // Initialize index-specific components
  window.realTimeClock = new RealTimeClock()
  window.statsCounter = new StatsCounter()
  window.heroAnimations = new HeroAnimations()
  window.searchManager = new SearchManager()
  window.featureCardsEffects = new FeatureCardsEffects()
  window.welcomeAnimation = new WelcomeAnimation()

  // Add search suggestions styles
  if (!document.getElementById("search-suggestions-styles")) {
    const style = document.createElement("style")
    style.id = "search-suggestions-styles"
    style.textContent = `
            .search-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                border: 2px solid var(--border-light);
                border-top: none;
                border-radius: 0 0 var(--radius-xl) var(--radius-xl);
                box-shadow: var(--shadow-lg);
                z-index: 100;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .suggestion-item {
                padding: var(--spacing-md) var(--spacing-lg);
                cursor: pointer;
                transition: background-color var(--transition-fast);
                border-bottom: 1px solid var(--border-light);
            }
            
            .suggestion-item:hover {
                background: var(--bg-secondary);
                color: var(--primary);
            }
            
            .suggestion-item:last-child {
                border-bottom: none;
            }
        `
    document.head.appendChild(style)
  }

  // Add floating animation keyframes
  if (!document.getElementById("floating-animation-styles")) {
    const style = document.createElement("style")
    style.id = "floating-animation-styles"
    style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px); 
                }
                50% { 
                    transform: translateY(-10px); 
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
        `
    document.head.appendChild(style)
  }

  // Add scroll-triggered animations
  const animatedElements = document.querySelectorAll(".feature-card, .major-card, .stat-card")
  animatedElements.forEach((element) => {
    element.setAttribute("data-animate", "true")
  })
})

// Export for global access
window.IndexPage = {
  RealTimeClock,
  StatsCounter,
  HeroAnimations,
  SearchManager,
  FeatureCardsEffects,
  WelcomeAnimation,
}
