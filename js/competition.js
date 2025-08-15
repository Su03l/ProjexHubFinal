// Competition Page JavaScript
class CompetitionManager {
  constructor() {
    this.leaderboardData = [
      {
        rank: 4,
        project: "نظام التجارة الإلكترونية الذكي",
        author: "محمد الزهراني - جامعة الملك فهد",
        category: "تطبيقات الويب",
        score: 4.6,
        votes: 234,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        project: "تطبيق إدارة المهام الذكي",
        author: "نورا العتيبي - جامعة الإمام",
        category: "تطبيقات الموبايل",
        score: 4.5,
        votes: 198,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 6,
        project: "نظام التعرف على الوجوه",
        author: "عبدالله السعد - جامعة الملك سعود",
        category: "الذكاء الاصطناعي",
        score: 4.4,
        votes: 187,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 7,
        project: "منصة التعلم التفاعلي",
        author: "هند المطيري - جامعة الملك عبدالعزيز",
        category: "تطبيقات الويب",
        score: 4.3,
        votes: 176,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 8,
        project: "نظام مراقبة الأمان الذكي",
        author: "خالد الغامدي - جامعة الإمام",
        category: "إنترنت الأشياء",
        score: 4.2,
        votes: 165,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ]

    this.currentFilter = "all"
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.renderLeaderboard()
    this.setupModal()
    this.animateStats()
  }

  setupEventListeners() {
    // Join competition button
    document.getElementById("join-competition").addEventListener("click", () => {
      this.openRegistrationModal()
    })

    // View rules button
    document.getElementById("view-rules").addEventListener("click", () => {
      this.showRules()
    })

    // Category cards
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const category = card.dataset.category
        this.filterLeaderboard(category)
        this.highlightCategory(card)
      })
    })

    // Leaderboard filters
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter
        this.filterLeaderboard(filter)
        this.updateFilterButtons(btn)
      })
    })
  }

  setupModal() {
    const modal = document.getElementById("registration-modal")
    const closeBtn = document.getElementById("close-modal")
    const cancelBtn = document.getElementById("cancel-registration")
    const form = document.getElementById("registration-form")

    // Close modal events
    closeBtn.addEventListener("click", () => this.closeModal())
    cancelBtn.addEventListener("click", () => this.closeModal())

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal()
      }
    })

    // Form submission
    form.addEventListener("submit", (e) => this.handleRegistration(e))

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.closeModal()
      }
    })
  }

  openRegistrationModal() {
    const modal = document.getElementById("registration-modal")
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Focus first input
    setTimeout(() => {
      document.getElementById("participant-name").focus()
    }, 100)
  }

  closeModal() {
    const modal = document.getElementById("registration-modal")
    modal.classList.remove("active")
    document.body.style.overflow = ""

    // Reset form
    document.getElementById("registration-form").reset()
  }

  async handleRegistration(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {
      name: formData.get("participant-name") || document.getElementById("participant-name").value,
      email: formData.get("participant-email") || document.getElementById("participant-email").value,
      university: formData.get("participant-university") || document.getElementById("participant-university").value,
      category: formData.get("competition-category") || document.getElementById("competition-category").value,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.university || !data.category) {
      this.showMessage("يرجى ملء جميع الحقول المطلوبة", "error")
      return
    }

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التسجيل...'

      // Simulate API call
      await this.simulateRegistration(data)

      this.showMessage("تم التسجيل بنجاح! سيتم التواصل معك قريباً.", "success")

      setTimeout(() => {
        this.closeModal()
      }, 2000)
    } catch (error) {
      this.showMessage("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.", "error")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  }

  async simulateRegistration(data) {
    // Simulate API delay
    return new Promise((resolve) => setTimeout(resolve, 1500))
  }

  filterLeaderboard(filter) {
    this.currentFilter = filter
    this.renderLeaderboard()
  }

  updateFilterButtons(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    activeBtn.classList.add("active")
  }

  highlightCategory(activeCard) {
    document.querySelectorAll(".category-card").forEach((card) => {
      card.style.transform = ""
      card.style.borderColor = "transparent"
    })

    activeCard.style.transform = "translateY(-10px)"
    activeCard.style.borderColor = "#2563eb"

    setTimeout(() => {
      activeCard.style.transform = ""
    }, 2000)
  }

  renderLeaderboard() {
    const tbody = document.getElementById("leaderboard-body")
    let filteredData = this.leaderboardData

    // Apply filter
    if (this.currentFilter !== "all") {
      filteredData = this.leaderboardData.filter((entry) => {
        const categoryMap = {
          web: "تطبيقات الويب",
          mobile: "تطبيقات الموبايل",
          ai: "الذكاء الاصطناعي",
          iot: "إنترنت الأشياء",
          security: "أمن المعلومات",
          data: "تحليل البيانات",
        }
        return entry.category === categoryMap[this.currentFilter]
      })
    }

    tbody.innerHTML = filteredData
      .map(
        (entry) => `
            <div class="leaderboard-entry">
                <div class="entry-rank">#${entry.rank}</div>
                <div class="entry-project">
                    <div class="project-avatar">
                        <img src="${entry.avatar}" alt="${entry.project}">
                    </div>
                    <div class="project-info">
                        <h4>${entry.project}</h4>
                        <p>${entry.author}</p>
                    </div>
                </div>
                <div class="entry-category">${entry.category}</div>
                <div class="entry-score">
                    <span class="score-stars">${this.generateStars(entry.score)}</span>
                    ${entry.score}
                </div>
                <div class="entry-votes">${entry.votes}</div>
            </div>
        `,
      )
      .join("")

    // Add animation
    const entries = tbody.querySelectorAll(".leaderboard-entry")
    entries.forEach((entry, index) => {
      entry.style.opacity = "0"
      entry.style.transform = "translateY(20px)"

      setTimeout(() => {
        entry.style.transition = "all 0.5s ease"
        entry.style.opacity = "1"
        entry.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  generateStars(score) {
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5
    let stars = ""

    for (let i = 0; i < fullStars; i++) {
      stars += "★"
    }

    if (hasHalfStar) {
      stars += "☆"
    }

    return stars
  }

  animateStats() {
    const stats = document.querySelectorAll(".stat-number")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateNumber(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    stats.forEach((stat) => observer.observe(stat))
  }

  animateNumber(element) {
    const target = Number.parseInt(element.textContent.replace(/,/g, ""))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      element.textContent = Math.floor(current).toLocaleString("ar-SA")
    }, 16)
  }

  showRules() {
    const rules = `
قواعد المسابقة:

1. المشاركة مفتوحة لجميع طلاب الجامعات السعودية
2. يجب أن يكون المشروع من إنتاج الطالب/الفريق
3. آخر موعد للتسجيل: 28 فبراير 2024
4. آخر موعد لرفع المشاريع: 15 مارس 2024
5. التقييم يتم على أساس الابتكار والتنفيذ والفائدة
6. يحق للجنة طلب توضيحات إضافية
7. القرار النهائي للجنة غير قابل للاستئناف
8. الجوائز غير قابلة للتحويل النقدي
        `

    alert(rules)
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".notification-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    const messageElement = document.createElement("div")
    messageElement.className = `notification-message ${type}`
    messageElement.textContent = message

    const styles = {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      fontWeight: "600",
      zIndex: "9999",
      maxWidth: "400px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    }

    if (type === "success") {
      styles.background = "#10b981"
      styles.color = "white"
    } else {
      styles.background = "#ef4444"
      styles.color = "white"
    }

    Object.assign(messageElement.style, styles)

    document.body.appendChild(messageElement)

    // Animate in
    messageElement.style.transform = "translateX(100%)"
    setTimeout(() => {
      messageElement.style.transition = "transform 0.3s ease"
      messageElement.style.transform = "translateX(0)"
    }, 10)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.style.transform = "translateX(100%)"
        setTimeout(() => {
          messageElement.remove()
        }, 300)
      }
    }, 5000)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CompetitionManager()
})
