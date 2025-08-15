// Signup Page JavaScript
class SignupManager {
  constructor() {
    this.setupSignupForm();
    this.setupPasswordStrength();
    this.setupSocialSignup();
    this.setupPasswordToggle();
    this.populateUniversities();
    this.populateMajors();
    this.populateGraduationYears();
    this.setupSearchableSelects();
    this.setupSelectedValueDisplay();
  }

  // Display selected value in input for select elements
  setupSelectedValueDisplay() {
    const selectElements = document.querySelectorAll(".searchable-select");

    selectElements.forEach((select) => {
      const wrapper = select.closest(".input-wrapper");
      if (wrapper) {
        const displayInput = wrapper.querySelector(".select-display-input");
        if (displayInput) {
          // Set default placeholder text based on select ID
          if (select.id === "university") {
            displayInput.placeholder = "اختر جامعتك";
          } else if (select.id === "major") {
            displayInput.placeholder = "اختر تخصصك";
          } else if (select.id === "graduation-year") {
            displayInput.placeholder = "اختر سنة التخرج";
          }
        }
      }

      select.addEventListener("change", (e) => {
        const wrapper = e.target.closest(".input-wrapper");
        if (wrapper) {
          const displayInput = wrapper.querySelector(".select-display-input");
          if (displayInput) {
            displayInput.value = e.target.options[e.target.selectedIndex].text;
          }
        }
      });
    });
  }

  // إضافة جميع الجامعات السعودية
  populateUniversities() {
    const universitySelect = document.getElementById("university");
    if (!universitySelect) return;

    const saudiUniversities = [
      "جامعة الملك سعود",
      "جامعة الملك عبدالعزيز",
      "جامعة الإمام محمد بن سعود الإسلامية",
      "جامعة الملك فهد للبترول والمعادن",
      "جامعة الملك خالد",
      "جامعة طيبة",
      "جامعة الطائف",
      "جامعة جازان",
      "جامعة حائل",
      "جامعة القصيم",
      "جامعة الباحة",
      "جامعة تبوك",
      "جامعة نجران",
      "جامعة الحدود الشمالية",
      "جامعة الجوف",
      "جامعة الأميرة نورة بنت عبدالرحمن",
      "جامعة الملك سعود بن عبدالعزيز للعلوم الصحية",
      "جامعة الملك عبدالله للعلوم والتقنية",
      "جامعة الأمير سطام بن عبدالعزيز",
      "جامعة المجمعة",
      "جامعة شقراء",
      "جامعة الدمام",
      "جامعة الأحساء",
      "جامعة بيشة",
      "جامعة الملك فيصل",
      "جامعة أم القرى",
      "الجامعة الإسلامية بالمدينة المنورة",
      "جامعة الملك عبدالعزيز للعلوم الصحية",
      "كلية الأمير سلطان العسكرية للعلوم الصحية",
      "جامعة الأمير محمد بن فهد",
      "جامعة دار العلوم",
      "جامعة الفيصل",
      "جامعة الأمير سلطان",
      "الجامعة العربية المفتوحة",
      "جامعة رياض العلم",
      "كليات الرياض للتقنية",
      "معهد الإدارة العامة",
      "جامعة الملك سعود للعلوم الصحية",
      "جامعة الملك فهد الأمنية",
      "كلية الملك عبدالعزيز الحربية",
      "جامعة نايف العربية للعلوم الأمنية",
      "جامعة الأعمال والتكنولوجيا",
      "جامعة عفت",
      "جامعة الملك سلمان الدولية",
      "الجامعة السعودية الإلكترونية",
      "جامعة حفر الباطن",
      "جامعة الملك سعود بن عبدالعزيز للعلوم الصحية - الرياض",
      "جامعة الملك سعود بن عبدالعزيز للعلوم الصحية - جدة",
      "جامعة الملك سعود بن عبدالعزيز للعلوم الصحية - الأحساء",
    ];

    // Clear existing options except the first one
    universitySelect.innerHTML = '<option value="">اختر جامعتك</option>';

    saudiUniversities.forEach((university) => {
      const option = document.createElement("option");
      option.value = university;
      option.textContent = university;
      universitySelect.appendChild(option);
    });
  }

  // إضافة جميع التخصصات الجامعية السعودية
  populateMajors() {
    const majorSelect = document.getElementById("major");
    if (!majorSelect) return;

    const saudiMajors = [
      "علوم الحاسب",
      "هندسة البرمجيات",
      "نظم المعلومات",
      "تقنية المعلومات",
      "هندسة الحاسب",
      "أمن المعلومات",
      "الذكاء الاصطناعي",
      "علوم البيانات",
      "الأمن السيبراني",
      "هندسة الشبكات",
      "تطوير الألعاب",
      "الحوسبة السحابية",
      "إنترنت الأشياء",
      "الواقع الافتراضي والمعزز",
      "الهندسة المدنية",
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "الهندسة الكيميائية",
      "هندسة البترول",
      "الهندسة الصناعية",
      "هندسة الطيران",
      "الهندسة البحرية",
      "هندسة التعدين",
      "الهندسة النووية",
      "الهندسة البيئية",
      "هندسة المواد",
      "الهندسة الطبية الحيوية",
      "هندسة الاتصالات",
      "هندسة الإلكترونيات",
      "هندسة الطاقة المتجددة",
      "الطب البشري",
      "طب الأسنان",
      "الصيدلة",
      "التمريض",
      "العلاج الطبيعي",
      "المختبرات الطبية",
      "الأشعة التشخيصية",
      "التغذية الإكلينيكية",
      "الطب البيطري",
      "طب الطوارئ",
      "التخدير والعناية المركزة",
      "الصحة العامة",
      "إدارة المعلومات الصحية",
      "تقنية القلب",
      "تقنية التنفس الصناعي",
      "الفيزياء",
      "الكيمياء",
      "الأحياء",
      "الرياضيات",
      "الإحصاء",
      "علوم الأرض",
      "الجيولوجيا",
      "علوم البحار",
      "الفلك",
      "الفيزياء الطبية",
      "الكيمياء الحيوية",
      "علم الوراثة",
      "علوم البيئة",
      "الأرصاد الجوية",
      "اللغة العربية وآدابها",
      "اللغة الإنجليزية وآدابها",
      "التاريخ",
      "الجغرافيا",
      "علم النفس",
      "علم الاجتماع",
      "الخدمة الاجتماعية",
      "الفلسفة",
      "الآثار والمتاحف",
      "الأنثروبولوجيا",
      "علوم المكتبات والمعلومات",
      "الترجمة",
      "اللغات الأجنبية",
      "إدارة الأعمال",
      "المحاسبة",
      "المالية",
      "التسويق",
      "إدارة الموارد البشرية",
      "الاقتصاد",
      "العلوم المصرفية",
      "إدارة المخاطر",
      "ريادة الأعمال",
      "التجارة الإلكترونية",
      "إدارة سلسلة التوريد",
      "إدارة الجودة الشاملة",
      "الإدارة العامة",
      "إدارة المشاريع",
      "الشريعة",
      "أصول الدين",
      "الدراسات الإسلامية",
      "القرآن الكريم وعلومه",
      "الحديث الشريف وعلومه",
      "الفقه وأصوله",
      "العقيدة والمذاهب المعاصرة",
      "الدعوة والاحتساب",
      "السياسة الشرعية",
      "العمارة",
      "التصميم الداخلي",
      "التصميم الجرافيكي",
      "الفنون التطبيقية",
      "الإعلام",
      "الصحافة",
      "العلاقات العامة",
      "الإذاعة والتلفزيون",
      "الإنتاج الإعلامي",
      "التصوير الفوتوغرافي",
      "الرسوم المتحركة",
      "تصميم الأزياء",
      "التربية",
      "علم النفس التربوي",
      "المناهج وطرق التدريس",
      "الإدارة التربوية",
      "التربية الخاصة",
      "تقنيات التعليم",
      "الإرشاد النفسي",
      "التربية الفنية",
      "التربية البدنية",
      "رياض الأطفال",
      "الزراعة",
      "علوم الأغذية",
      "السياحة والآثار",
      "إدارة الطيران",
      "الأمن والسلامة",
      "إدارة الكوارث والأزمات",
      "علوم الرياضة",
      "إدارة الفعاليات",
      "الموسيقى",
      "المسرح",
      "السينما والتلفزيون",
      "التصميم الصناعي",
      "هندسة التصميم",
      "علوم الطيران",
      "الملاحة البحرية",
      "الأرصاد والبيئة",
      "علوم الفضاء",
    ];

    // Clear existing options except the first one
    majorSelect.innerHTML = '<option value="">اختر تخصصك</option>';

    saudiMajors.forEach((major) => {
      const option = document.createElement("option");
      option.value = major;
      option.textContent = major;
      majorSelect.appendChild(option);
    });
  }

  // تحديث نطاق السنوات من 2000 إلى العام الحالي + 5 سنوات للمستقبل
  populateGraduationYears() {
    const yearSelect = document.getElementById("graduation-year");
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    const startYear = 2000;

    // Clear existing options except the first one
    yearSelect.innerHTML = '<option value="">اختر سنة التخرج</option>';

    for (let year = currentYear + 5; year >= startYear; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }

  // إضافة خاصية البحث في القوائم مع تحسينات
  setupSearchableSelects() {
    const searchableSelects = document.querySelectorAll(".searchable-select");

    searchableSelects.forEach((select) => {
      this.makeSelectSearchable(select);
    });
  }

  makeSelectSearchable(select) {
    const wrapper = document.createElement("div");
    wrapper.className = "searchable-select-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.width = "500px"; // Set width to 500px as requested

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    // Create a visible input to show selected value
    const displayInput = document.createElement("input");
    displayInput.type = "text";
    displayInput.className = "select-display-input";
    displayInput.readOnly = true;
    displayInput.style.cssText = `
      width: 100%;
      padding: 1rem 3.5rem 1rem 1rem;
      border: 2px solid var(--border-light);
      border-radius: var(--radius-xl);
      background: var(--bg-secondary);
      color: var(--text-muted);
      font-size: 1rem;
      cursor: pointer;
    `;
    wrapper.insertBefore(displayInput, select);

    // Style the actual select to be hidden but functional
    select.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    `;

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "select-search-input";
    searchInput.placeholder = "ابحث...";
    searchInput.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid var(--border-light);
      border-radius: var(--radius-xl);
      background: var(--bg-secondary);
      color: var(--text-primary);
      z-index: 3;
      display: none;
      font-size: 1rem;
      transition: all var(--transition-fast);
      width: 500px;
    `;

    wrapper.appendChild(searchInput);

    const originalOptions = Array.from(select.options).slice(1); // Skip first option

    // Show search input when display input is clicked
    displayInput.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInput.style.display = "block";
      searchInput.focus();
      searchInput.value = "";
    });

    // Update display when selection changes
    select.addEventListener("change", () => {
      if (select.selectedIndex > 0) {
        displayInput.value = select.options[select.selectedIndex].text;
        displayInput.style.color = "var(--text-primary)";
      } else {
        displayInput.value = "";
      }
    });

    // Hide search input when it loses focus
    searchInput.addEventListener("blur", (e) => {
      setTimeout(() => {
        searchInput.style.display = "none";
        // Reset options to show all
        select.innerHTML = select.options[0].outerHTML;
        originalOptions.forEach((option) => {
          select.appendChild(option.cloneNode(true));
        });
      }, 200);
    });

    // Filter options based on search input
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      // Clear current options except first
      select.innerHTML = select.options[0].outerHTML;

      // Filter and add matching options
      originalOptions.forEach((option) => {
        if (option.textContent.toLowerCase().includes(searchTerm)) {
          select.appendChild(option.cloneNode(true));
        }
      });
    });

    // Handle keyboard navigation
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const firstOption = select.options[1];
        if (firstOption) {
          select.value = firstOption.value;
          displayInput.value = firstOption.text;
          displayInput.style.color = "var(--text-primary)";
          searchInput.style.display = "none";
          select.focus();
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      } else if (e.key === "Escape") {
        searchInput.style.display = "none";
        select.focus();
      }
    });
  }

  setupSignupForm() {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleSignup(e);
    });

    // Setup password confirmation validation
    const password = document.getElementById("signup-password");
    const confirmPassword = document.getElementById("confirm-password");

    if (confirmPassword) {
      confirmPassword.addEventListener("blur", () => {
        this.validatePasswordConfirmation();
      });
    }

    if (password) {
      password.addEventListener("input", () => {
        if (confirmPassword && confirmPassword.value) {
          this.validatePasswordConfirmation();
        }
      });
    }
  }

  setupPasswordToggle() {
    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const input = toggle.parentNode.querySelector(
          'input[type="password"], input[type="text"]'
        );
        if (input) {
          const type =
            input.getAttribute("type") === "password" ? "text" : "password";
          input.setAttribute("type", type);

          const icon = toggle.querySelector("i");
          if (icon) {
            icon.className =
              type === "password" ? "fas fa-eye" : "fas fa-eye-slash";
          }
        }
      });
    });
  }

  setupPasswordStrength() {
    const passwordInput = document.getElementById("signup-password");
    const strengthBar = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    if (passwordInput && strengthBar && strengthText) {
      passwordInput.addEventListener("input", (e) => {
        const password = e.target.value;
        const strength = this.calculatePasswordStrength(password);

        this.updatePasswordStrengthUI(strength, strengthBar, strengthText);
      });
    }
  }

  calculatePasswordStrength(password) {
    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) score += 25;
    else feedback.push("8 أحرف على الأقل");

    // Uppercase check
    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push("حرف كبير");

    // Lowercase check
    if (/[a-z]/.test(password)) score += 25;
    else feedback.push("حرف صغير");

    // Number or special character check
    if (/[\d\W]/.test(password)) score += 25;
    else feedback.push("رقم أو رمز");

    return { score, feedback };
  }

  updatePasswordStrengthUI(strength, strengthBar, strengthText) {
    const { score, feedback } = strength;

    // Update progress bar
    strengthBar.style.width = `${score}%`;

    // Update colors and text
    if (score < 50) {
      strengthBar.style.background = "#ef4444";
      strengthText.textContent = "ضعيفة";
      strengthText.style.color = "#ef4444";
    } else if (score < 75) {
      strengthBar.style.background = "#f59e0b";
      strengthText.textContent = "متوسطة";
      strengthText.style.color = "#f59e0b";
    } else if (score < 100) {
      strengthBar.style.background = "#10b981";
      strengthText.textContent = "قوية";
      strengthText.style.color = "#10b981";
    } else {
      strengthBar.style.background = "#059669";
      strengthText.textContent = "قوية جداً";
      strengthText.style.color = "#059669";
    }

    // Show feedback for missing requirements
    if (feedback.length > 0 && score < 100) {
      strengthText.textContent += ` (يحتاج: ${feedback.join(", ")})`;
    }
  }

  validatePasswordConfirmation() {
    const password = document.getElementById("signup-password");
    const confirmPassword = document.getElementById("confirm-password");

    if (!password || !confirmPassword) return true;

    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    this.clearFieldError(confirmPassword);

    if (confirmValue && passwordValue !== confirmValue) {
      this.showFieldError(confirmPassword, "كلمات المرور غير متطابقة");
      return false;
    } else if (confirmValue && passwordValue === confirmValue) {
      this.showSuccessMessage(confirmPassword, "كلمات المرور متطابقة");
      return true;
    }

    return true;
  }

  async handleSignup(e) {
    const form = e.target;
    const formData = new FormData(form);
    const signupBtn = document.getElementById("signup-btn");

    const data = {
      firstName: formData.get("first-name") || "مستخدم",
      lastName: formData.get("last-name") || "جديد",
      email: formData.get("email") || "user@example.com",
      university: formData.get("university") || "جامعة الملك سعود",
      major: formData.get("major") || "علوم الحاسب",
      graduationYear: formData.get("graduation-year") || "2024",
      password: formData.get("password") || "password123",
      confirmPassword: formData.get("confirm-password") || "password123",
      termsAgreed: true, // Always true for demo
      newsletter: formData.get("newsletter") === "on",
    };

    try {
      this.setButtonLoading(signupBtn, true);

      // Simulate API call - no validation required for demo
      await this.simulateApiCall(data, 2000);

      this.showNotification("تم إنشاء الحساب بنجاح!", "success");

      // Store user data for demo
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);
      localStorage.setItem("userAvatar", data.firstName.charAt(0));

      // Redirect to home page after successful signup
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      this.showNotification(
        error.message || "فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        "error"
      );
    } finally {
      this.setButtonLoading(signupBtn, false);
    }
  }

  setupSocialSignup() {
    const googleBtn = document.querySelector(".social-btn.google");
    const microsoftBtn = document.querySelector(".social-btn.microsoft");

    if (googleBtn) {
      googleBtn.addEventListener("click", () => {
        this.handleSocialSignup("google");
      });
    }

    if (microsoftBtn) {
      microsoftBtn.addEventListener("click", () => {
        this.handleSocialSignup("microsoft");
      });
    }
  }

  async handleSocialSignup(provider) {
    try {
      this.showNotification(
        `جاري التسجيل عبر ${provider === "google" ? "Google" : "Microsoft"}...`,
        "info"
      );

      // Simulate social signup
      await this.simulateApiCall({ provider });

      this.showNotification("تم إنشاء الحساب بنجاح!", "success");

      // Store user data for demo
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", `user@${provider}.com`);
      localStorage.setItem("userName", "أحمد محمد");
      localStorage.setItem("userAvatar", "أ");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      this.showNotification(
        "فشل في التسجيل عبر " +
          (provider === "google" ? "Google" : "Microsoft"),
        "error"
      );
    }
  }

  // Validation and utility methods
  validateField(field) {
    const value = field.value.trim();
    this.clearFieldError(field);

    if (field.hasAttribute("required") && !value) {
      this.showFieldError(field, "هذا الحقل مطلوب");
      return false;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, "يرجى إدخال بريد إلكتروني صحيح");
        return false;
      }
    }

    // Additional validation for name fields
    if (field.name === "first-name" || field.name === "last-name") {
      if (value && value.length < 2) {
        this.showFieldError(field, "الاسم يجب أن يكون حرفين على الأقل");
        return false;
      }
    }

    return true;
  }

  showFieldError(field, message) {
    field.classList.add("input-error");
    let errorElement = field.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.style.cssText = `
        color: var(--danger);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      `;
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove("input-error");
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }

  showSuccessMessage(field, message) {
    this.clearFieldError(field);
    let successElement = field.parentNode.querySelector(".success-message");
    if (!successElement) {
      successElement = document.createElement("div");
      successElement.className = "success-message";
      successElement.style.cssText = `
        color: var(--success);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      `;
      field.parentNode.appendChild(successElement);
    }
    successElement.textContent = message;
  }

  showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
        type === "success"
          ? "var(--success)"
          : type === "error"
          ? "var(--danger)"
          : "var(--primary)"
      };
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => notification.remove());
  }

  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = `
        <div class="spinner"></div>
        <span>جاري التسجيل...</span>
      `;
    } else {
      button.disabled = false;
      button.innerHTML = `
        <span>إنشاء الحساب</span>
        <i class="fas fa-arrow-left"></i>
      `;
    }
  }

  async simulateApiCall(data, delay = 1500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Always resolve for demo purposes
        resolve({ success: true, message: "تم إنشاء الحساب بنجاح" });
      }, delay);
    });
  }
}

// Add notification styles
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
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

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .input-error {
    border-color: var(--danger) !important;
  }

  .searchable-select-wrapper {
    position: relative;
    width: 500px;
  }

  .select-search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }

  .dark-theme .select-search-input:focus {
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
  }

  .select-display-input {
    background-color: var(--bg-secondary) !important;
    width: 500px;
  }
`;
document.head.appendChild(notificationStyles);

// Initialize signup functionality
document.addEventListener("DOMContentLoaded", () => {
  new SignupManager();
});
