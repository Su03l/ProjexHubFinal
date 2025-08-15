// ===== ProjexHub - Explore Page JavaScript =====

// Mock project data
const mockProjects = [
  {
    id: 1,
    title: "نظام إدارة المكتبات الذكي",
    description:
      "نظام شامل لإدارة المكتبات الجامعية باستخدام تقنيات الذكاء الاصطناعي لتحسين تجربة المستخدمين وتنظيم الكتب والموارد.",
    major: "computer-science",
    university: "ksu",
    year: "2024",
    author: {
      name: "أحمد محمد العلي",
      university: "جامعة الملك سعود",
      avatar: "أ",
    },
    tags: ["ذكاء اصطناعي", "قواعد البيانات", "تطبيق ويب"],
    image: "public/test1.png?height=200&width=350",
    views: 245,
    likes: 32,
    rating: 4.8,
    badge: "مميز",
  },
  {
    id: 2,
    title: "تطبيق الواقع المعزز للتعليم الطبي",
    description:
      "تطبيق يستخدم تقنية الواقع المعزز لمساعدة طلاب الطب في دراسة التشريح والعمليات الجراحية بطريقة تفاعلية ومبتكرة.",
    major: "medicine",
    university: "kau",
    year: "2024",
    author: {
      name: "فاطمة سالم الزهراني",
      university: "جامعة الملك عبدالعزيز",
      avatar: "ف",
    },
    tags: ["واقع معزز", "طب", "تطبيق جوال"],
    image: "public/test1.png?height=200&width=350",
    views: 189,
    likes: 28,
    rating: 4.9,
    badge: "جديد",
  },
  {
    id: 3,
    title: "منصة التجارة الإلكترونية للمنتجات المحلية",
    description:
      "منصة تجارة إلكترونية تهدف إلى دعم المنتجات المحلية السعودية وربط المنتجين بالمستهلكين مباشرة.",
    major: "business",
    university: "imam",
    year: "2023",
    author: {
      name: "خالد عبدالله الشمري",
      university: "جامعة الإمام محمد بن سعود",
      avatar: "خ",
    },
    tags: ["تجارة إلكترونية", "ريادة أعمال", "تطوير ويب"],
    image: "public/test1.png?height=200&width=350",
    views: 312,
    likes: 45,
    rating: 4.6,
    badge: "شائع",
  },
  {
    id: 4,
    title: "نظام مراقبة جودة الهواء الذكي",
    description:
      "نظام IoT لمراقبة جودة الهواء في المدن السعودية باستخدام أجهزة استشعار ذكية وتحليل البيانات في الوقت الفعلي.",
    major: "engineering",
    university: "kfupm",
    year: "2024",
    author: {
      name: "سارة أحمد القحطاني",
      university: "جامعة الملك فهد للبترول والمعادن",
      avatar: "س",
    },
    tags: ["إنترنت الأشياء", "بيئة", "أجهزة استشعار"],
    image: "public/test1.png?height=200&width=350",
    views: 156,
    likes: 22,
    rating: 4.7,
    badge: "تقني",
  },
  {
    id: 5,
    title: "تطبيق الصحة النفسية للطلاب",
    description:
      "تطبيق جوال يقدم الدعم النفسي والاستشارات للطلاب الجامعيين مع ميزات التتبع والتقييم الذاتي.",
    major: "science",
    university: "kku",
    year: "2023",
    author: {
      name: "نورا محمد الغامدي",
      university: "جامعة الملك خالد",
      avatar: "ن",
    },
    tags: ["صحة نفسية", "تطبيق جوال", "طلاب"],
    image: "public/test1.png?height=200&width=350",
    views: 203,
    likes: 38,
    rating: 4.5,
    badge: "مفيد",
  },
  {
    id: 6,
    title: "نظام التصميم التفاعلي للمواقع",
    description:
      "أداة تصميم تفاعلية تساعد المصممين في إنشاء واجهات مستخدم حديثة ومتجاوبة بسهولة وسرعة.",
    major: "design",
    university: "ksu",
    year: "2024",
    author: {
      name: "عبدالرحمن سعد المطيري",
      university: "جامعة الملك سعود",
      avatar: "ع",
    },
    tags: ["تصميم UI/UX", "أدوات تصميم", "تفاعلي"],
    image: "public/test1.png?height=200&width=350",
    views: 178,
    likes: 29,
    rating: 4.8,
    badge: "إبداعي",
  },
];

// Explore Page Manager
class ExplorePageManager {
  constructor() {
    this.projects = [...mockProjects];
    this.filteredProjects = [...mockProjects];
    this.currentPage = 1;
    this.projectsPerPage = 6;
    this.filters = {
      search: "",
      major: "",
      university: "",
      year: "",
      sort: "newest",
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadFiltersFromURL();
    this.populateUniversities();
    this.populateMajors();
    this.populateYears();
    this.setupSearchableSelects();
    this.renderProjects();
    this.updateResultsCount();
  }

  bindEvents() {
    // Search functionality
    const searchInput = document.getElementById("exploreSearchInput");
    const searchBtn = document.querySelector(".search-btn");

    if (searchInput) {
      searchInput.addEventListener(
        "input",
        this.debounce(() => this.handleSearch(), 300)
      );
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.handleSearch());
    }

    // Filter functionality
    const majorFilter = document.getElementById("majorFilter");
    const universityFilter = document.getElementById("universityFilter");
    const yearFilter = document.getElementById("yearFilter");
    const sortSelect = document.getElementById("sortSelect");

    if (majorFilter) {
      majorFilter.addEventListener("change", () => this.handleFilterChange());
    }
    if (universityFilter) {
      universityFilter.addEventListener("change", () =>
        this.handleFilterChange()
      );
    }
    if (yearFilter) {
      yearFilter.addEventListener("change", () => this.handleFilterChange());
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", () => this.handleSortChange());
    }

    // Reset filters
    const resetBtn = document.querySelector(".filter-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetFilters());
    }

    // Load more
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => this.loadMore());
    }
  }

  // Populate Saudi universities dropdown
  populateUniversities() {
    const universitySelect = document.getElementById("universityFilter");
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
    universitySelect.innerHTML = '<option value="">جميع الجامعات</option>';

    saudiUniversities.forEach((university) => {
      const option = document.createElement("option");
      option.value = university;
      option.textContent = university;
      universitySelect.appendChild(option);
    });
  }

  // Populate majors dropdown
  populateMajors() {
    const majorSelect = document.getElementById("majorFilter");
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
    majorSelect.innerHTML = '<option value="">جميع التخصصات</option>';

    saudiMajors.forEach((major) => {
      const option = document.createElement("option");
      option.value = major;
      option.textContent = major;
      majorSelect.appendChild(option);
    });
  }

  // Populate years dropdown
  populateYears() {
    const yearSelect = document.getElementById("yearFilter");
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    const startYear = 2000;

    // Clear existing options except the first one
    yearSelect.innerHTML = '<option value="">جميع السنوات</option>';

    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }

  // Setup searchable selects
  setupSearchableSelects() {
    const searchableSelects = document.querySelectorAll(".searchable-select");

    searchableSelects.forEach((select) => {
      this.makeSelectSearchable(select);
    });
  }

  // Make select element searchable
  makeSelectSearchable(selectElement) {
    const selectId = selectElement.id;
    const wrapper = document.createElement("div");
    wrapper.className = "searchable-select-wrapper";

    // Create search input
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "ابحث...";
    searchInput.className = "select-search-input";

    // Create options container
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "select-options-container";

    // Wrap the original select
    selectElement.parentNode.insertBefore(wrapper, selectElement);
    wrapper.appendChild(selectElement);
    wrapper.appendChild(searchInput);
    wrapper.appendChild(optionsContainer);

    // Hide original select
    selectElement.style.display = "none";

    // Create custom options
    const options = Array.from(selectElement.options);
    options.forEach((option) => {
      if (option.value) {
        const div = document.createElement("div");
        div.className = "select-option";
        div.textContent = option.text;
        div.dataset.value = option.value;
        div.addEventListener("click", () => {
          selectElement.value = option.value;
          this.handleFilterChange();
          // Update display
          searchInput.value = option.text;
          optionsContainer.style.display = "none";
        });
        optionsContainer.appendChild(div);
      }
    });

    // Handle search input
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const options = optionsContainer.querySelectorAll(".select-option");

      options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          option.style.display = "block";
        } else {
          option.style.display = "none";
        }
      });
    });

    // Toggle options visibility
    searchInput.addEventListener("focus", () => {
      optionsContainer.style.display = "block";
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        optionsContainer.style.display = "none";
      }
    });
  }

  loadFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    // Load search query
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
      this.filters.search = searchQuery;
      const searchInput = document.getElementById("exploreSearchInput");
      if (searchInput) {
        searchInput.value = searchQuery;
      }
    }

    // Load major filter
    const major = urlParams.get("major");
    if (major) {
      this.filters.major = major;
      const majorFilter = document.getElementById("majorFilter");
      if (majorFilter) {
        majorFilter.value = major;
      }
    }

    // Load university filter
    const university = urlParams.get("university");
    if (university) {
      this.filters.university = university;
      const universityFilter = document.getElementById("universityFilter");
      if (universityFilter) {
        universityFilter.value = university;
      }
    }

    // Load year filter
    const year = urlParams.get("year");
    if (year) {
      this.filters.year = year;
      const yearFilter = document.getElementById("yearFilter");
      if (yearFilter) {
        yearFilter.value = year;
      }
    }

    this.applyFilters();
  }

  handleSearch() {
    const searchInput = document.getElementById("exploreSearchInput");
    this.filters.search = searchInput ? searchInput.value.trim() : "";
    this.currentPage = 1;
    this.applyFilters();
    this.updateURL();
  }

  handleFilterChange() {
    const majorFilter = document.getElementById("majorFilter");
    const universityFilter = document.getElementById("universityFilter");
    const yearFilter = document.getElementById("yearFilter");

    this.filters.major = majorFilter ? majorFilter.value : "";
    this.filters.university = universityFilter ? universityFilter.value : "";
    this.filters.year = yearFilter ? yearFilter.value : "";

    this.currentPage = 1;
    this.applyFilters();
    this.updateURL();
    this.updateFilterStates();
  }

  handleSortChange() {
    const sortSelect = document.getElementById("sortSelect");
    this.filters.sort = sortSelect ? sortSelect.value : "newest";
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.projects];

    // Apply search filter
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.author.name.toLowerCase().includes(searchTerm) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply major filter
    if (this.filters.major) {
      filtered = filtered.filter(
        (project) => project.major === this.filters.major
      );
    }

    // Apply university filter
    if (this.filters.university) {
      filtered = filtered.filter(
        (project) => project.author.university === this.filters.university
      );
    }

    // Apply year filter
    if (this.filters.year) {
      filtered = filtered.filter(
        (project) => project.year === this.filters.year.toString()
      );
    }

    // Apply sorting
    this.sortProjects(filtered);

    this.filteredProjects = filtered;
    this.renderProjects();
    this.updateResultsCount();
    this.updateLoadMoreButton();
  }

  sortProjects(projects) {
    switch (this.filters.sort) {
      case "newest":
        projects.sort((a, b) => b.year.localeCompare(a.year) || b.id - a.id);
        break;
      case "oldest":
        projects.sort((a, b) => a.year.localeCompare(b.year) || a.id - b.id);
        break;
      case "popular":
        projects.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        projects.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  renderProjects() {
    const projectsGrid = document.getElementById("projectsGrid");
    if (!projectsGrid) return;

    // Show loading state
    this.showLoadingState();

    // Simulate loading delay
    setTimeout(() => {
      const startIndex = 0;
      const endIndex = this.currentPage * this.projectsPerPage;
      const projectsToShow = this.filteredProjects.slice(startIndex, endIndex);

      if (projectsToShow.length === 0) {
        this.showEmptyState();
        return;
      }

      projectsGrid.innerHTML = projectsToShow
        .map((project) => this.createProjectCard(project))
        .join("");

      // Add click events to project cards
      this.addProjectCardEvents();
    }, 500);
  }

  createProjectCard(project) {
    const majorNames = {
      "computer-science": "علوم الحاسب",
      engineering: "الهندسة",
      medicine: "الطب",
      business: "إدارة الأعمال",
      design: "التصميم",
      science: "العلوم",
    };

    return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${
      project.title
    }" loading="lazy">
                    <div class="project-badge">${project.badge}</div>
                </div>
                
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${
                          project.description
                        }</p>
                    </div>
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                            <span>${
                              majorNames[project.major] || project.major
                            }</span>
                        </div>
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>${project.year}</span>
                        </div>
                    </div>
                    
                    <div class="project-tags">
                        ${project.tags
                          .map(
                            (tag) => `<span class="project-tag">${tag}</span>`
                          )
                          .join("")}
                    </div>
                    
                    <div class="project-footer">
                        <div class="project-author">
                            <div class="author-avatar">${
                              project.author.avatar
                            }</div>
                            <div class="author-info">
                                <div class="author-name">${
                                  project.author.name
                                }</div>
                                <div class="author-university">${
                                  project.author.university
                                }</div>
                            </div>
                        </div>
                        
                        <div class="project-stats">
                            <div class="stat-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>${this.formatNumber(project.views)}</span>
                            </div>
                            <div class="stat-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                                </svg>
                                <span>${this.formatNumber(project.likes)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-actions">
                        <button class="btn-view-project" onclick="window.exploreManager.openProjectDetails(${
                          project.id
                        })" aria-label="عرض تفاصيل المشروع">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            عرض المشروع
                        </button>
                        <button class="btn-like-project" onclick="window.exploreManager.toggleLike(${
                          project.id
                        })" aria-label="إعجاب بالمشروع">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  addProjectCardEvents() {
    // No longer adding click events to entire cards since we have specific buttons
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      // Add keyboard navigation for accessibility
      card.setAttribute("tabindex", "0");
    });
  }

  toggleLike(projectId) {
    const project = this.projects.find((p) => p.id == projectId);
    if (!project) return;

    // Toggle like status (in real app, this would be an API call)
    const likeBtn = document.querySelector(
      `[onclick="window.exploreManager.toggleLike(${projectId})"]`
    );
    if (likeBtn) {
      const isLiked = likeBtn.classList.contains("liked");

      if (isLiked) {
        likeBtn.classList.remove("liked");
        project.likes--;
      } else {
        likeBtn.classList.add("liked");
        project.likes++;
      }

      // Update the display
      this.renderProjects();

      // Show notification
      const message = isLiked ? "تم إلغاء الإعجاب" : "تم الإعجاب بالمشروع";
      if (window.notificationManager) {
        window.notificationManager.success(message);
      }
    }
  }

  openProjectDetails(projectId) {
    // Navigate to project view page with project ID
    window.location.href = `project-view.html?id=${projectId}`;
  }

  showLoadingState() {
    const projectsGrid = document.getElementById("projectsGrid");
    if (!projectsGrid) return;

    const skeletonCards = Array(6)
      .fill(0)
      .map(
        () => `
            <div class="skeleton-card">
                <div class="skeleton-image loading-skeleton"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title loading-skeleton"></div>
                    <div class="skeleton-description loading-skeleton"></div>
                    <div class="skeleton-description loading-skeleton"></div>
                </div>
            </div>
        `
      )
      .join("");

    projectsGrid.innerHTML = skeletonCards;
  }

  showEmptyState() {
    const projectsGrid = document.getElementById("projectsGrid");
    if (!projectsGrid) return;

    projectsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3>لم يتم العثور على مشاريع</h3>
                <p>جرب تعديل معايير البحث أو الفلاتر للعثور على مشاريع أخرى</p>
                <button class="btn btn-primary" onclick="window.exploreManager.resetFilters()">
                    إعادة تعيين الفلاتر
                </button>
            </div>
        `;
  }

  loadMore() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!loadMoreBtn) return;

    // Show loading state
    const originalText = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<span class="loading"></span> جاري التحميل...';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
      this.currentPage++;
      this.renderProjects();

      // Reset button
      loadMoreBtn.innerHTML = originalText;
      loadMoreBtn.disabled = false;
    }, 1000);
  }

  updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!loadMoreBtn) return;

    const totalShown = this.currentPage * this.projectsPerPage;
    const hasMore = totalShown < this.filteredProjects.length;

    loadMoreBtn.style.display = hasMore ? "inline-flex" : "none";
  }

  updateResultsCount() {
    const resultsCount = document.getElementById("resultsCount");
    if (!resultsCount) return;

    const count = this.filteredProjects.length;
    const arabicCount = this.formatArabicNumber(count);

    if (count === 0) {
      resultsCount.textContent = "لم يتم العثور على مشاريع";
    } else if (count === 1) {
      resultsCount.textContent = `تم العثور على مشروع واحد`;
    } else {
      resultsCount.textContent = `تم العثور على ${arabicCount} مشروع`;
    }
  }

  updateFilterStates() {
    const filters = ["majorFilter", "universityFilter", "yearFilter"];

    filters.forEach((filterId) => {
      const filterElement = document.getElementById(filterId);
      if (filterElement) {
        filterElement.classList.toggle("active", filterElement.value !== "");
      }
    });

    const resetBtn = document.querySelector(".filter-reset-btn");
    if (resetBtn) {
      const hasActiveFilters = Object.values(this.filters).some(
        (value) => value !== "" && value !== "newest"
      );
      resetBtn.classList.toggle("active", hasActiveFilters);
    }
  }

  resetFilters() {
    // Reset filter values
    this.filters = {
      search: "",
      major: "",
      university: "",
      year: "",
      sort: "newest",
    };

    // Reset UI elements
    const searchInput = document.getElementById("exploreSearchInput");
    const majorFilter = document.getElementById("majorFilter");
    const universityFilter = document.getElementById("universityFilter");
    const yearFilter = document.getElementById("yearFilter");
    const sortSelect = document.getElementById("sortSelect");

    if (searchInput) searchInput.value = "";
    if (majorFilter) majorFilter.value = "";
    if (universityFilter) universityFilter.value = "";
    if (yearFilter) yearFilter.value = "";
    if (sortSelect) sortSelect.value = "newest";

    // Reset page
    this.currentPage = 1;

    // Apply filters and update UI
    this.applyFilters();
    this.updateURL();
    this.updateFilterStates();

    // Show success message
    window.notificationManager?.success("تم إعادة تعيين جميع الفلاتر");
  }

  updateURL() {
    const params = new URLSearchParams();

    if (this.filters.search) params.set("search", this.filters.search);
    if (this.filters.major) params.set("major", this.filters.major);
    if (this.filters.university)
      params.set("university", this.filters.university);
    if (this.filters.year) params.set("year", this.filters.year);

    const newURL = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newURL);
  }

  formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }

  formatArabicNumber(num) {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٢", "٣", "٨", "٩"];
    return num.toString().replace(/\d/g, (digit) => arabicNumerals[digit]);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Global functions for button clicks
function performExploreSearch() {
  if (window.exploreManager) {
    window.exploreManager.handleSearch();
  }
}

function resetFilters() {
  if (window.exploreManager) {
    window.exploreManager.resetFilters();
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.exploreManager = new ExplorePageManager();

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";
        entry.target.style.transition = "all 0.6s ease";

        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards for animation
  setTimeout(() => {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => observer.observe(card));
  }, 600);
});

// Export for global access
window.ExplorePage = {
  ExplorePageManager,
};
