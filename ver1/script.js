// Global variables
let currentLanguage = "vi"
let currentTheme = "light"
let currentAudio = null

// Sample data
const artworks = [
  {
    id: 1,
    title: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
    description: "Khoảnh khắc lịch sử ngày 2/9/1945 tại Quảng trường Ba Đình, Hà Nội",
    category: "characters",
    image: "/ho-chi-minh-reading-independence-declaration-at-ba.png",
    narration: "Đây là khoảnh khắc thiêng liêng nhất trong lịch sử dân tộc Việt Nam...",
  },
  {
    id: 2,
    title: "Cuộc Tổng khởi nghĩa tại Hà Nội",
    description: "Nhân dân Hà Nội nổi dậy giành chính quyền tháng 8/1945",
    category: "events",
    image: "/vietnamese-people-uprising-in-hanoi-august-1945-wi.png",
    narration: "Ngày 19 tháng 8 năm 1945, nhân dân Hà Nội đã nổi dậy...",
  },
  {
    id: 3,
    title: "Lá cờ đỏ sao vàng tung bay",
    description: "Biểu tượng thiêng liêng của dân tộc Việt Nam",
    category: "symbols",
    image: "/vietnamese-red-flag-with-yellow-star-waving-proudl.png",
    narration: "Lá cờ đỏ sao vàng là biểu tượng thiêng liêng...",
  },
  {
    id: 4,
    title: "Đại tướng Võ Nguyên Giáp",
    description: "Vị tướng tài ba của cách mạng Việt Nam",
    category: "characters",
    image: "/general-vo-nguyen-giap-vietnamese-military-leader-.png",
    narration: "Đại tướng Võ Nguyên Giáp là một trong những nhà quân sự...",
  },
  {
    id: 5,
    title: "Khởi nghĩa tại Huế",
    description: "Cuộc khởi nghĩa giành chính quyền tại cố đô Huế",
    category: "events",
    image: "/uprising-in-hue-ancient-capital-vietnam-1945.png",
    narration: "Tại cố đô Huế, cuộc khởi nghĩa diễn ra vào ngày 23/8/1945...",
  },
  {
    id: 6,
    title: "Tiếng trống cách mạng",
    description: "Âm thanh kêu gọi nhân dân đứng lên",
    category: "symbols",
    image: "/revolutionary-drums-and-traditional-vietnamese-ins.png",
    narration: "Tiếng trống cách mạng vang lên khắp mọi miền đất nước...",
  },
]

const timelineEvents = [
  {
    date: "Tháng 3/1945",
    title: "Nhật đảo chính Pháp",
    description: "Nhật Bản đảo chính thực dân Pháp, tạo cơ hội cho cách mạng Việt Nam",
  },
  {
    date: "Tháng 8/1945",
    title: "Cách mạng Tháng Tám nổ ra",
    description: "Cuộc Tổng khởi nghĩa giành chính quyền trên toàn quốc",
  },
  {
    date: "19/8/1945",
    title: "Giải phóng Hà Nội",
    description: "Nhân dân Hà Nội nổi dậy giành chính quyền",
  },
  {
    date: "25/8/1945",
    title: "Giải phóng Sài Gòn",
    description: "Cuộc khởi nghĩa thành công tại Sài Gòn",
  },
  {
    date: "2/9/1945",
    title: "Tuyên ngôn Độc lập",
    description: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa",
  },
]

const quizQuestions = [
  {
    question: "Cách mạng Tháng Tám diễn ra vào năm nào?",
    options: ["1944", "1945", "1946", "1947"],
    correct: 1,
  },
  {
    question: "Ai đã đọc Tuyên ngôn Độc lập ngày 2/9/1945?",
    options: ["Võ Nguyên Giáp", "Phạm Văn Đồng", "Hồ Chí Minh", "Trường Chinh"],
    correct: 2,
  },
  {
    question: "Cuộc Tổng khởi nghĩa giành chính quyền ở Hà Nội diễn ra ngày nào?",
    options: ["17/8/1945", "19/8/1945", "23/8/1945", "25/8/1945"],
    correct: 1,
  },
]

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
  loadGallery()
  loadTimeline()
  setupEventListeners()
})

function initializeWebsite() {
  // Set initial theme
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  // Set initial language
  const savedLanguage = localStorage.getItem("language") || "vi"
  setLanguage(savedLanguage)

  // Add scroll animations
  observeElements()
}

function setupEventListeners() {
  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", toggleTheme)

  // Language toggle
  document.getElementById("langToggle").addEventListener("click", toggleLanguage)

  // Navigation smooth scroll
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")
      filterArtworks(filter)

      // Update active button
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Audio controls
  document.querySelectorAll(".play-audio-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const audioType = this.getAttribute("data-audio")
      playAudio(audioType, this)
    })
  })

  // Map markers
  document.querySelectorAll(".marker").forEach((marker) => {
    marker.addEventListener("click", function () {
      const location = this.getAttribute("data-location")
      showLocationInfo(location)
    })
  })

  // Modal controls
  setupModalControls()
}

function loadGallery() {
  const galleryGrid = document.getElementById("galleryGrid")
  galleryGrid.innerHTML = ""

  artworks.forEach((artwork) => {
    const artworkCard = createArtworkCard(artwork)
    galleryGrid.appendChild(artworkCard)
  })
}

function createArtworkCard(artwork) {
  const card = document.createElement("div")
  card.className = "artwork-card fade-in-up"
  card.setAttribute("data-category", artwork.category)

  card.innerHTML = `
        <div class="artwork-image">
            <img src="${artwork.image}" alt="${artwork.title}">
        </div>
        <div class="artwork-info">
            <h3>${artwork.title}</h3>
            <p>${artwork.description}</p>
        </div>
    `

  card.addEventListener("click", () => showArtworkModal(artwork))

  return card
}

function filterArtworks(filter) {
  const artworkCards = document.querySelectorAll(".artwork-card")

  artworkCards.forEach((card) => {
    const category = card.getAttribute("data-category")
    if (filter === "all" || category === filter) {
      card.style.display = "block"
      card.classList.add("fade-in-up")
    } else {
      card.style.display = "none"
    }
  })
}

function loadTimeline() {
  const timeline = document.getElementById("timeline")
  timeline.innerHTML = ""

  timelineEvents.forEach((event, index) => {
    const eventElement = document.createElement("div")
    eventElement.className = "timeline-event fade-in-up"

    eventElement.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${event.date}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `

    timeline.appendChild(eventElement)
  })
}

function showArtworkModal(artwork) {
  const modal = document.getElementById("artworkModal")
  const modalImage = document.getElementById("modalArtworkImage")
  const modalTitle = document.getElementById("modalArtworkTitle")
  const modalDescription = document.getElementById("modalArtworkDescription")

  modalImage.src = artwork.image
  modalImage.alt = artwork.title
  modalTitle.textContent = artwork.title
  modalDescription.textContent = artwork.description

  modal.style.display = "block"

  // Store current artwork for other functions
  modal.currentArtwork = artwork
}

function setupModalControls() {
  // Close modal buttons
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none"
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none"
    }
  })
}

function playNarration() {
  const modal = document.getElementById("artworkModal")
  const artwork = modal.currentArtwork

  if (artwork && artwork.narration) {
    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause()
    }

    // Simulate audio playback (in real implementation, use Web Speech API or audio files)
    alert(`Đang phát thuyết minh: "${artwork.narration}"`)

    // In a real implementation, you would use:
    // const utterance = new SpeechSynthesisUtterance(artwork.narration);
    // utterance.lang = 'vi-VN';
    // speechSynthesis.speak(utterance);
  }
}

function shareArtwork() {
  const modal = document.getElementById("artworkModal")
  const artwork = modal.currentArtwork

  if (artwork) {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${artwork.title} - ${artwork.description}\n${window.location.href}`
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Đã sao chép link chia sẻ!")
      })
    }
  }
}

function startQuiz() {
  const modal = document.getElementById("artworkModal")
  modal.style.display = "none"

  showQuizModal()
}

function showQuizModal() {
  const modal = document.getElementById("quizModal")
  const quizContent = document.getElementById("quizContent")

  // Select random question
  const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)]

  quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>${randomQuestion.question}</h3>
            <div class="quiz-options">
                ${randomQuestion.options
                  .map(
                    (option, index) => `
                    <button class="quiz-option" data-index="${index}">${option}</button>
                `,
                  )
                  .join("")}
            </div>
            <div class="quiz-result" id="quizResult"></div>
        </div>
    `

  // Add event listeners to quiz options
  document.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedIndex = Number.parseInt(this.getAttribute("data-index"))
      const resultDiv = document.getElementById("quizResult")

      if (selectedIndex === randomQuestion.correct) {
        resultDiv.innerHTML = '<p style="color: green;">✓ Chính xác! Bạn đã trả lời đúng.</p>'
      } else {
        resultDiv.innerHTML = `<p style="color: red;">✗ Sai rồi. Đáp án đúng là: ${randomQuestion.options[randomQuestion.correct]}</p>`
      }

      // Disable all buttons after selection
      document.querySelectorAll(".quiz-option").forEach((b) => (b.disabled = true))
    })
  })

  modal.style.display = "block"
}

function playAudio(audioType, button) {
  // Stop current audio if playing
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
    // Reset all play buttons
    document.querySelectorAll(".play-audio-btn").forEach((btn) => {
      btn.innerHTML = '<i class="fas fa-play"></i>'
    })
  }

  // Simulate audio playback
  button.innerHTML = '<div class="loading"></div>'

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-pause"></i>'

    // Simulate audio duration
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-play"></i>'
    }, 5000)
  }, 1000)

  // In a real implementation, you would load and play actual audio files
  console.log(`Playing audio: ${audioType}`)
}

function playVideo() {
  // Simulate video playback
  alert('Đang phát video: "Diễn biến Cách mạng Tháng Tám"')

  // In a real implementation, you would:
  // 1. Replace the image with a video element
  // 2. Load and play the actual video file
  // 3. Add video controls
}

function showLocationInfo(location) {
  const locationInfo = {
    hanoi: {
      name: "Hà Nội",
      date: "19/8/1945",
      description: "Cuộc Tổng khởi nghĩa giành chính quyền tại thủ đô",
    },
    hue: {
      name: "Huế",
      date: "23/8/1945",
      description: "Khởi nghĩa tại cố đô, vua Bảo Đại thoái vị",
    },
    saigon: {
      name: "Sài Gòn",
      date: "25/8/1945",
      description: "Giành chính quyền tại thành phố lớn nhất miền Nam",
    },
  }

  const info = locationInfo[location]
  if (info) {
    alert(`${info.name} (${info.date})\n${info.description}`)
  }
}

function startTour() {
  // Smooth scroll to gallery section
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" })

  // Show welcome message
  setTimeout(() => {
    alert("Chào mừng bạn đến với Bảo tàng AI! Hãy khám phá các tác phẩm nghệ thuật về Cách mạng Tháng Tám.")
  }, 1000)
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(currentTheme)
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)

  const themeIcon = document.querySelector("#themeToggle i")
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }

  localStorage.setItem("theme", theme)
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "vi" ? "en" : "vi"
  setLanguage(currentLanguage)
}

function setLanguage(language) {
  currentLanguage = language

  // In a real implementation, you would translate all text content
  // For now, just show the current language
  console.log(`Language set to: ${language}`)

  localStorage.setItem("language", language)
}

function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  })

  // Observe elements that should animate on scroll
  document.querySelectorAll(".artwork-card, .timeline-event, .audio-card, .document-card").forEach((el) => {
    observer.observe(el)
  })
}

// Smooth scrolling for navigation
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: "smooth",
  })
}

// Initialize everything when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWebsite)
} else {
  initializeWebsite()
}
