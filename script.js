/**
 * SAHITHI TARIGOPPULA - PERSONAL PORTFOLIO
 * Vanilla JavaScript matching Akhilan's portfolio behavior:
 * - Custom spring difference cursor (expanding on hover-target)
 * - Dynamic role rotator for Data Scientist, Machine Learning Engineer, and AI/ML
 * - Project deep-dive modal dialogs
 * - Email clipboard copy and mailto dispatch
 * - Mobile navigation drawer and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initDynamicRole();
  initMobileNav();
  initProjectModals();
  initContactActions();
  initBackToTop();
  updateFooterYear();
});

/* ==========================================================================
   1. Custom Magnetic Difference Cursor (Exact behavior from Cursor.jsx)
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Do not initialize on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  const speed = 0.22; // Smooth spring interpolation factor

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  function attachHoverListeners() {
    const hoverElements = document.querySelectorAll(
      'button, a, .hover-target, input, textarea, .project-card, .cert-box, .stat-item, .info-cell'
    );

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });
  }

  attachHoverListeners();

  // Watch for dynamic DOM changes (e.g. modals opening)
  const observer = new MutationObserver(attachHoverListeners);
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

/* ==========================================================================
   2. Dynamic Role Rotator (Data Scientist, ML Engineer, AI/ML)
   ========================================================================== */
function initDynamicRole() {
  const roleElement = document.getElementById('dynamic-role');
  if (!roleElement) return;

  const roles = [
    'Data Scientist',
    'Machine Learning Engineer',
    'AI/ML Engineer Aspirant',
    'LLMs & RAG Researcher',
    'Quantum ML Explorer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      roleElement.textContent = current.substring(0, charIdx);
      typingSpeed = 45;
    } else {
      charIdx++;
      roleElement.textContent = current.substring(0, charIdx);
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }

  setTimeout(typeStep, 600);
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.setAttribute('aria-hidden', isExpanded);
    drawer.classList.toggle('open');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !menuBtn.contains(e.target) && drawer.classList.contains('open')) {
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('open');
    }
  });
}

/* ==========================================================================
   4. Featured Project Modals & Deep Dives
   ========================================================================== */
const projectDetails = {
  rag: {
    title: 'Unified Multimodal RAG Evaluation & Query-Adaptive Selection Framework',
    category: 'LLMs, RAG & Evaluation Benchmarks',
    overview: 'A research-grade web framework benchmarking and comparing multiple Retrieval-Augmented Generation architectures (Basic RAG, Self-RAG, Adaptive-RAG, Agentic-RAG) using standardized metrics and a dedicated Final Judge LLM decision engine.',
    features: [
      'Executes queries across four RAG architectures in parallel to compare responses empirically.',
      'Comprehensive standardized evaluation metrics: Context Precision, Context Recall, Answer Relevance, Faithfulness, and Latency.',
      'Dedicated Final Judge LLM analyzes query complexity, faithfulness requirements, and returns structured decision recommendations.',
      'Automated test suites with computed empirical Architecture Win Rates.'
    ],
    tech: ['Python', 'TypeScript', 'LLMs', 'RAG', 'ChromaDB', 'LangChain', 'Evaluation Metrics'],
    github: 'https://github.com/Sahithiiii22/MultiModal-RAG-Evaluation-Framework-'
  },
  cropland: {
    title: 'Crop Land Classification using Hybrid Quantum Machine Learning',
    category: 'Quantum ML, Remote Sensing & Agriculture',
    overview: 'A hybrid quantum-classical machine learning model using Qiskit for satellite image-based cropland classification with spectral vegetation indices and variational quantum circuit feature processing. Presented at the VBIT College Project Expo.',
    features: [
      'Satellite multi-spectral image preprocessing and NDVI/EVI feature extraction.',
      'Parameterized variational quantum circuits in Qiskit providing high-dimensional quantum state mapping.',
      'Hybrid classical neural network ensemble optimizing crop type and health classification accuracy.',
      'Presented at the VBIT College-Level Project Expo.'
    ],
    tech: ['Python', 'Qiskit', 'Quantum Computing', 'Scikit-learn', 'NumPy', 'Pandas', 'Streamlit'],
    github: 'https://github.com/Sahithiiii22/cropland-quantum-learning'
  },
  incidentiq: {
    title: 'IncidentIQ — Self-Learning AI Incident Response Agent',
    category: 'Autonomous AI Agents, DevOps & SRE',
    overview: 'An experience-driven AI incident response agent with continuous long-term operational memory (Vectorize Hindsight). Observes production error telemetry, recalls historical outages, reasons about root causes, and recommends proven runbook remediations to minimize MTTR.',
    features: [
      'Multi-strategy retrieval blending semantic, keyword, symptom graph, and temporal search pathways.',
      'Structured memory units segregating Incident Memories, Operational SRE Patterns, and Heuristic Rules.',
      'Self-improving 6-stage core loop (Observe, Recall, Reason, Act, Resolve, Retain).',
      'Reflective synthesis synthesizing aggregated mental models across all past production outages.'
    ],
    tech: ['TypeScript', 'Python', 'AI Agents', 'Vectorize Hindsight', 'DevOps / SRE', 'Telemetry'],
    github: 'https://github.com/Sahithiiii22/IncidentIQ-An-Experience-Driven-AI-Agent-for-Production-Incident-Response'
  },
  phishing: {
    title: 'Phishing URL & Image Detection System',
    category: 'Cybersecurity & Multi-Modal Machine Learning',
    overview: 'A dual-pipeline cyber threat detection system designed to analyze suspicious URLs and visual deceptive forms with OCR-assisted text extraction (Tesseract) and lexical feature classification in a real-time Streamlit dashboard.',
    features: [
      'Lexical domain analysis extracting entropy, token structure, and domain age heuristics.',
      'Optical Character Recognition (OCR) via Tesseract extracting embedded credentials from screenshot banners.',
      'Scikit-learn classification engine delivering automated threat probability assessments.',
      'Interactive Streamlit web dashboard for real-time URL and screenshot inspection.'
    ],
    tech: ['Python', 'Scikit-learn', 'Tesseract OCR', 'Streamlit', 'Cybersecurity', 'Machine Learning'],
    github: 'https://github.com/Sahithiiii22/Phishing-detection-system'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const detailBtns = document.querySelectorAll('.project-detail-btn');

  if (!modal || !closeBtn) return;

  detailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectDetails[key];
      if (!data) return;

      modalTitle.textContent = data.title;

      const techBadges = data.tech
        .map((t) => `<span class="tag-pill">${t}</span>`)
        .join('');

      const featureList = data.features
        .map((f) => `<li style="margin-bottom: 8px;">${f}</li>`)
        .join('');

      modalBody.innerHTML = `
        <p style="font-family: var(--font-headline); font-size: 1.15rem; color: #000000; margin-bottom: 14px;">
          ${data.category}
        </p>

        <h4 class="modal-h4">Project Overview</h4>
        <p class="modal-p">${data.overview}</p>

        <h4 class="modal-h4">Key Capabilities</h4>
        <ul style="padding-left: 20px; font-size: 0.95rem; line-height: 1.7; color: var(--text-dark-muted); margin: 10px 0 16px 0;">
          ${featureList}
        </ul>

        <h4 class="modal-h4">Technologies Used</h4>
        <div class="modal-tech-list">${techBadges}</div>

        <div class="modal-footer">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-black btn-sm hover-target">
            <span>View GitHub Repository</span>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
          <button class="btn btn-outline btn-sm hover-target" onclick="document.getElementById('project-modal').close()">
            Close
          </button>
        </div>
      `;

      modal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => modal.close());

  // Close when clicking outside content
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      modal.close();
    }
  });
}

/* ==========================================================================
   5. Contact Actions (Copy Email, Form Mailto Dispatch)
   ========================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');
  const email = 'sahithi22t@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`Copied email to clipboard: ${email}`);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy to clipboard'; }, 2000);
        })
        .catch(() => {
          showToast(`Email: ${email}`);
        });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill in your name, email, and message.');
        return;
      }

      const subject = encodeURIComponent(subjectInput.value.trim() || 'Opportunity Inquiry - Sahithi Tarigoppula');
      const body = encodeURIComponent(
        `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
      );

      const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
      window.location.href = mailtoUrl;

      contactForm.reset();
    });
  }

  // Resume download toast notification
  const resumeDownloadBtns = [
    document.getElementById('hero-resume-download'),
    document.getElementById('download-resume-btn'),
    document.getElementById('view-resume-btn')
  ];

  resumeDownloadBtns.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      showToast('Opening Sahithi Tarigoppula Resume (PDF)');
    });
  });
}

/* ==========================================================================
   6. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   7. Toast Notification Helper
   ========================================================================== */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   8. Footer Year
   ========================================================================== */
function updateFooterYear() {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}
