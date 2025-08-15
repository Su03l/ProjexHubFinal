// Project View JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get project ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (projectId) {
    loadProjectDetails(projectId);
  } else {
    showError("معرف المشروع غير صحيح");
  }

  // Initialize event listeners
  initializeEventListeners();
});

// Sample project data (in real app, this would come from API)
const projectsData = {
  1: {
    id: 1,
    title: "نظام إدارة المكتبات الذكي",
    subtitle:
      "نظام شامل لإدارة المكتبات الجامعية باستخدام تقنيات الذكاء الاصطناعي",
    description:
      "يهدف هذا المشروع إلى تطوير نظام متكامل لإدارة المكتبات الجامعية باستخدام أحدث تقنيات الذكاء الاصطناعي. يوفر النظام واجهة سهلة الاستخدام للطلاب والموظفين، مع إمكانيات البحث المتقدم والتوصيات الذكية للكتب والمراجع. كما يتضمن النظام أدوات إدارية متطورة لتتبع الكتب والمخزون وإدارة العضويات.",
    author: "أحمد محمد العلي",
    university: "جامعة الملك سعود",
    major: "علوم الحاسب",
    year: "2024",
    tags: ["ذكاء اصطناعي", "قواعد البيانات", "تطوير ويب"],
    views: 1250,
    likes: 89,
    rating: 4.8,
    image: "public/test1.png",
    features: [
      "واجهة مستخدم حديثة وسهلة الاستخدام",
      "نظام بحث ذكي مع التوصيات المخصصة",
      "إدارة شاملة للمخزون والكتب",
      "نظام إشعارات تلقائي للمواعيد",
      "تقارير وإحصائيات مفصلة",
      "دعم متعدد اللغات (العربية والإنجليزية)",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Python",
      "TensorFlow",
      "Express.js",
    ],
    comments: [
      {
        id: 1,
        author: "سارة أحمد",
        avatar: "س",
        date: "منذ يومين",
        content:
          "مشروع رائع ومفيد جداً! التصميم احترافي والفكرة مبتكرة. أتمنى رؤية المزيد من هذه المشاريع.",
      },
      {
        id: 2,
        author: "محمد علي",
        avatar: "م",
        date: "منذ 3 أيام",
        content:
          "عمل ممتاز، خاصة في استخدام تقنيات الذكاء الاصطناعي. هل يمكن مشاركة الكود المصدري؟",
      },
    ],
  },
  2: {
    id: 2,
    title: "تطبيق الصحة النفسية للطلاب",
    subtitle: "تطبيق محمول يهدف إلى دعم الصحة النفسية للطلاب الجامعيين",
    description:
      "تطبيق محمول مبتكر مصمم خصيصاً لدعم الصحة النفسية للطلاب الجامعيين. يوفر التطبيق أدوات التقييم الذاتي، جلسات الإرشاد النفسي، وموارد تعليمية شاملة. كما يتضمن ميزات التتبع اليومي للمزاج والأنشطة، مع إمكانية التواصل مع مختصين في الصحة النفسية.",
    author: "فاطمة سالم الزهراني",
    university: "جامعة الملك عبدالعزيز",
    major: "علم النفس",
    year: "2024",
    tags: ["صحة نفسية", "تطبيق محمول", "UI/UX"],
    views: 980,
    likes: 67,
    rating: 4.6,
    image: "public/test1.png",
    features: [
      "تقييم ذاتي للحالة النفسية",
      "جلسات إرشاد نفسي تفاعلية",
      "تتبع يومي للمزاج والأنشطة",
      "موارد تعليمية شاملة",
      "تواصل مع مختصين",
      "إشعارات تذكيرية ذكية",
    ],
    technologies: [
      "React Native",
      "Firebase",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
    ],
    comments: [
      {
        id: 1,
        author: "نورا محمد",
        avatar: "ن",
        date: "منذ يوم",
        content:
          "مشروع مهم جداً ويلبي حاجة حقيقية في المجتمع الجامعي. التصميم بسيط وسهل الاستخدام.",
      },
    ],
  },
  3: {
    id: 3,
    title: "روبوت زراعي ذكي",
    subtitle: "روبوت مصمم لمراقبة المحاصيل الزراعية وتحليل التربة",
    description:
      "مشروع روبوت زراعي متطور يستخدم أجهزة الاستشعار المتقدمة وتقنيات التعلم الآلي لمراقبة المحاصيل الزراعية وتحليل التربة. يوفر الروبوت معلومات دقيقة عن حالة النباتات، مستوى الرطوبة، ودرجة الحموضة في التربة، مما يساعد المزارعين على اتخاذ قرارات مدروسة لتحسين الإنتاجية.",
    author: "عبدالله سالم القحطاني",
    university: "جامعة الملك فهد للبترول والمعادن",
    major: "الهندسة",
    year: "2023",
    tags: ["روبوتات", "زراعة", "IoT"],
    views: 1450,
    likes: 112,
    rating: 4.9,
    image: "public/test1.png",
    features: [
      "مراقبة تلقائية للمحاصيل",
      "تحليل دقيق للتربة",
      "أجهزة استشعار متطورة",
      "تقارير مفصلة عن حالة المزرعة",
      "تحكم عن بُعد",
      "توفير في استهلاك المياه",
    ],
    technologies: [
      "Arduino",
      "Raspberry Pi",
      "Python",
      "TensorFlow",
      "OpenCV",
      "IoT Sensors",
    ],
    comments: [
      {
        id: 1,
        author: "خالد أحمد",
        avatar: "خ",
        date: "منذ أسبوع",
        content:
          "مشروع متقدم جداً ومفيد للقطاع الزراعي. هل تم اختباره في بيئة زراعية حقيقية؟",
      },
      {
        id: 2,
        author: "عائشة محمد",
        avatar: "ع",
        date: "منذ أسبوعين",
        content: "عمل رائع! يمكن أن يساهم في تطوير الزراعة الذكية في المملكة.",
      },
    ],
  },
  4: {
    id: 4,
    title: "نظام مراقبة جودة الهواء الذكي",
    subtitle: "نظام IoT لمراقبة جودة الهواء في المدن السعودية",
    description:
      "نظام IoT متطور لمراقبة جودة الهواء في المدن السعودية باستخدام أجهزة استشعار ذكية وتحليل البيانات في الوقت الفعلي. يوفر النظام معلومات دقيقة عن مستويات التلوث والغازات الضارة، مع إمكانية إرسال تنبيهات فورية عند تجاوز الحدود الآمنة.",
    author: "سارة أحمد القحطاني",
    university: "جامعة الملك فهد للبترول والمعادن",
    major: "الهندسة",
    year: "2024",
    tags: ["إنترنت الأشياء", "بيئة", "أجهزة استشعار"],
    views: 856,
    likes: 73,
    rating: 4.7,
    image: "public/test1.png",
    features: [
      "مراقبة مستمرة لجودة الهواء",
      "أجهزة استشعار متعددة الغازات",
      "تحليل البيانات في الوقت الفعلي",
      "تنبيهات فورية للتلوث",
      "واجهة ويب تفاعلية",
      "تقارير بيئية شاملة",
    ],
    technologies: [
      "Arduino",
      "Raspberry Pi",
      "Python",
      "React",
      "MongoDB",
      "MQTT",
    ],
    comments: [],
  },
  5: {
    id: 5,
    title: "تطبيق الصحة النفسية للطلاب",
    subtitle: "تطبيق جوال يقدم الدعم النفسي والاستشارات للطلاب الجامعيين",
    description:
      "تطبيق جوال يقدم الدعم النفسي والاستشارات للطلاب الجامعيين مع ميزات التتبع والتقييم الذاتي.",
    author: "نورا محمد الغامدي",
    university: "جامعة الملك خالد",
    major: "علم النفس",
    year: "2023",
    tags: ["صحة نفسية", "تطبيق جوال", "طلاب"],
    views: 203,
    likes: 38,
    rating: 4.5,
    image: "public/test1.png",
    features: [
      "تقييم ذاتي للحالة النفسية",
      "جلسات إرشاد تفاعلية",
      "تتبع المزاج اليومي",
      "موارد تعليمية",
      "دعم المجتمع",
      "إشعارات تحفيزية",
    ],
    technologies: ["Flutter", "Firebase", "Node.js", "Express", "MongoDB"],
    comments: [],
  },
  6: {
    id: 6,
    title: "نظام التصميم التفاعلي للمواقع",
    subtitle: "أداة تصميم تفاعلية تساعد المصممين في إنشاء واجهات مستخدم حديثة",
    description:
      "أداة تصميم تفاعلية تساعد المصممين في إنشاء واجهات مستخدم حديثة ومتجاوبة بسهولة وسرعة.",
    author: "عبدالرحمن سعد المطيري",
    university: "جامعة الملك سعود",
    major: "التصميم",
    year: "2024",
    tags: ["تصميم UI/UX", "أدوات تصميم", "تفاعلي"],
    views: 178,
    likes: 29,
    rating: 4.8,
    image: "public/test1.png",
    features: [
      "واجهة سحب وإفلات",
      "مكونات جاهزة",
      "معاينة فورية",
      "تصدير الكود",
      "تعاون الفريق",
      "قوالب احترافية",
    ],
    technologies: ["React", "TypeScript", "Canvas API", "WebGL", "Node.js"],
    comments: [],
  },
};

function loadProjectDetails(projectId) {
  const project = projectsData[projectId];

  if (!project) {
    showError("المشروع غير موجود");
    return;
  }

  // Update page title and breadcrumb
  document.title = `${project.title} - ProjexHub`;
  document.getElementById("projectBreadcrumb").textContent = project.title;

  // Update project header
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectSubtitle").textContent = project.subtitle;
  document.getElementById("projectAuthor").textContent = project.author;
  document.getElementById("projectUniversity").textContent = project.university;
  document.getElementById("projectYear").textContent = project.year;

  // Update project tags
  const tagsContainer = document.getElementById("projectTags");
  tagsContainer.innerHTML = project.tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");

  // Update project image
  const projectImage = document.getElementById("projectImage");
  projectImage.src = project.image;
  projectImage.alt = project.title;

  // Update project description
  document.getElementById("projectDescription").textContent =
    project.description;

  // Update features
  const featuresContainer = document.getElementById("projectFeatures");
  featuresContainer.innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  // Update technologies
  const techContainer = document.getElementById("projectTechnologies");
  techContainer.innerHTML = project.technologies
    .map((tech) => `<div class="tech-item">${tech}</div>`)
    .join("");

  // Update stats
  document.getElementById("viewCount").textContent =
    project.views.toLocaleString();
  document.getElementById("likeCount").textContent = project.likes;
  document.getElementById("likeCountSidebar").textContent = project.likes;
  document.getElementById("ratingValue").textContent = project.rating;

  // Update author info
  document.getElementById("authorAvatar").textContent =
    project.author.charAt(0);
  document.getElementById("authorName").textContent = project.author;
  document.getElementById("authorUniversity").textContent = project.university;
  document.getElementById("authorMajor").textContent = project.major;

  // Load related projects
  loadRelatedProjects(project.id, project.major);

  // Load comments
  loadComments(project.comments || []);

  // Increment view count (in real app, this would be an API call)
  incrementViewCount(project.id);
}

function loadRelatedProjects(currentProjectId, major) {
  const relatedContainer = document.getElementById("relatedProjects");
  const relatedProjects = Object.values(projectsData)
    .filter(
      (p) => p.id !== Number.parseInt(currentProjectId) && p.major === major
    )
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    relatedContainer.innerHTML =
      '<p style="color: var(--text-muted); text-align: center;">لا توجد مشاريع مشابهة</p>';
    return;
  }

  relatedContainer.innerHTML = relatedProjects
    .map(
      (project) => `
        <a href="project-view.html?id=${project.id}" class="related-project-item">
            <div class="related-project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: none;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                </svg>
            </div>
            <div class="related-project-info">
                <div class="related-project-title">${project.title}</div>
                <div class="related-project-author">${project.author}</div>
            </div>
        </a>
    `
    )
    .join("");
}

function loadComments(comments) {
  const commentsContainer = document.querySelector(".comments-list");
  const commentsCount = document.querySelector(".comments-count");

  if (!commentsContainer) return;

  commentsCount.textContent = `${comments.length} تعليق`;

  if (comments.length === 0) {
    commentsContainer.innerHTML =
      '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">لا توجد تعليقات بعد. كن أول من يعلق!</p>';
    return;
  }

  commentsContainer.innerHTML = comments
    .map(
      (comment) => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-avatar">${comment.avatar}</div>
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${comment.date}</span>
      </div>
      <div class="comment-content">${comment.content}</div>
      <div class="comment-actions">
        <button class="comment-action" onclick="likeComment(${comment.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 14px; height: 14px; margin-left: 4px;">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          إعجاب
        </button>
        <button class="comment-action" onclick="replyToComment(${comment.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 14px; height: 14px; margin-left: 4px;">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          رد
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function initializeEventListeners() {
  // Like button
  const likeBtn = document.getElementById("likeBtn");
  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      toggleLike();
    });
  }

  // Share button
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      shareProject();
    });
  }

  // Comment form
  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitComment();
    });
  }
}

function toggleLike() {
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const likeCountSidebar = document.getElementById("likeCountSidebar");

  const isLiked = likeBtn.classList.contains("liked");
  const currentCount = Number.parseInt(likeCount.textContent);

  if (isLiked) {
    likeBtn.classList.remove("liked");
    likeCount.textContent = currentCount - 1;
    likeCountSidebar.textContent = currentCount - 1;
    showNotification("تم إلغاء الإعجاب", "info");
  } else {
    likeBtn.classList.add("liked");
    likeCount.textContent = currentCount + 1;
    likeCountSidebar.textContent = currentCount + 1;
    showNotification("تم الإعجاب بالمشروع", "success");
  }

  // Add animation
  likeBtn.style.transform = "scale(0.9)";
  setTimeout(() => {
    likeBtn.style.transform = "scale(1)";
  }, 150);
}

function shareProject() {
  if (navigator.share) {
    navigator
      .share({
        title: document.getElementById("projectTitle").textContent,
        text: document.getElementById("projectSubtitle").textContent,
        url: window.location.href,
      })
      .then(() => {
        showNotification("تم مشاركة المشروع", "success");
      })
      .catch(() => {
        fallbackShare();
      });
  } else {
    fallbackShare();
  }
}

function fallbackShare() {
  // Fallback: copy to clipboard
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      showNotification("تم نسخ رابط المشروع", "success");
    })
    .catch(() => {
      showNotification("فشل في نسخ الرابط", "error");
    });
}

function submitComment() {
  const textarea = document.getElementById("commentTextarea");
  const content = textarea.value.trim();

  if (!content) {
    showNotification("يرجى كتابة تعليق", "error");
    return;
  }

  // In real app, this would be an API call
  const newComment = {
    id: Date.now(),
    author: "مستخدم جديد",
    avatar: "م",
    date: "الآن",
    content: content,
  };

  // Add to current project's comments
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");
  const project = projectsData[projectId];

  if (project) {
    if (!project.comments) project.comments = [];
    project.comments.unshift(newComment);
    loadComments(project.comments);
  }

  // Clear form
  textarea.value = "";
  showNotification("تم إضافة التعليق بنجاح", "success");
}

function likeComment(commentId) {
  showNotification("تم الإعجاب بالتعليق", "success");
}

function replyToComment(commentId) {
  const textarea = document.getElementById("commentTextarea");
  textarea.focus();
  textarea.value = `@تعليق${commentId} `;
}

function incrementViewCount(projectId) {
  // In real app, this would be an API call
  const project = projectsData[projectId];
  if (project) {
    project.views += 1;
    document.getElementById("viewCount").textContent =
      project.views.toLocaleString();
  }
}

function showError(message) {
  const main = document.querySelector("main");
  main.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-primary);">
            <h1 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">خطأ</h1>
            <p style="font-size: 1.25rem; color: var(--text-secondary);">${message}</p>
            <a href="explore.html" style="display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: var(--gradient-primary); color: var(--text-inverse); text-decoration: none; border-radius: 0.5rem;">العودة إلى تصفح المشاريع</a>
        </div>
    `;
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".project-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `project-notification ${type}`;
  notification.textContent = message;

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
  };

  if (type === "success") {
    styles.background = "#10b981";
    styles.color = "white";
  } else if (type === "error") {
    styles.background = "#ef4444";
    styles.color = "white";
  } else {
    styles.background = "#2563eb";
    styles.color = "white";
  }

  Object.assign(notification.style, styles);
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4000);
}
