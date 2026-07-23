document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // DOM Elements Queries
  // ==========================================================================
  const body = document.body;
  const header = document.getElementById('main-header');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contact-form');
  const currentYearSpan = document.getElementById('current-year');

  // Set current copyright year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Light/Dark Theme Switcher
  // ==========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.className = savedTheme;
    } else {
      body.className = 'dark-theme';
    }
  };

  const toggleTheme = () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  };

  themeToggleBtn.addEventListener('click', toggleTheme);
  initTheme();

  // ==========================================================================
  // Mobile Header Navigation
  // ==========================================================================
  const toggleMobileMenu = () => {
    navMenu.classList.toggle('open');
    body.classList.toggle('menu-active');
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    body.classList.remove('menu-active');
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (e) => {
    if (body.classList.contains('menu-active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // Header Sticky Effect & Scroll-To-Top Visibility
  // ==========================================================================
  const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScrollEffects);
  handleScrollEffects();

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================================================
  // Navigation Active State Highlighter on Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // ==========================================================================
  // Global Mouse Spotlight & Card Glowing Border coordinates bindings
  // ==========================================================================
  const cursorSpotlight = document.querySelector('.cursor-spotlight');
  
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (cursorSpotlight) {
      cursorSpotlight.style.left = `${x}px`;
      cursorSpotlight.style.top = `${y}px`;
    }
  });

  const glowingCards = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .stat-item, .contact-form-card, .about-image-card');
  glowingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================================================
  // Typing Subtitle Animation
  // ==========================================================================
  const typingTextEl = document.querySelector('.typing-text');
  if (typingTextEl) {
    const roles = [
      "MERN Stack Developer",
      "Digital Marketing Specialist",
      "Full-Stack Web Engineer",
      "SEO & Growth Strategist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1200);
  }

  // ==========================================================================
  // 3D Parallax Tilt Effects for Hero Section
  // ==========================================================================
  const heroImageWrapper = document.querySelector('.hero-image-wrapper');
  const tiltElements = document.querySelectorAll('.hero-blob-frame, .floating-badge');
  
  if (heroImageWrapper) {
    heroImageWrapper.addEventListener('mousemove', (e) => {
      const rect = heroImageWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = -(y / (rect.height / 2)) * 12;
      const rotateY = (x / (rect.width / 2)) * 12;

      tiltElements.forEach((el, index) => {
        // slight offset multipliers to give a multi-layered depth feeling
        const factor = index === 0 ? 0.8 : (index === 1 ? 1.2 : 1.5);
        el.style.transform = `perspective(1000px) rotateX(${rotateX * factor}deg) rotateY(${rotateY * factor}deg) translateZ(${20 * factor}px)`;
        el.style.transition = 'transform 0.08s ease-out';
      });
    });

    heroImageWrapper.addEventListener('mouseleave', () => {
      tiltElements.forEach(el => {
        el.style.transform = '';
        el.style.transition = 'transform 0.6s ease';
      });
    });
  }

  // ==========================================================================
  // About Stats Scroll Count-Up Animation
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = () => {
    statNumbers.forEach(stat => {
      const targetText = stat.textContent.trim();
      const numberMatch = targetText.match(/\d+/);
      if (!numberMatch) return;
      
      const targetValue = parseInt(numberMatch[0]);
      const suffix = targetText.replace(targetValue.toString(), '');
      
      let start = 0;
      const duration = 1600;
      const increment = targetValue / (duration / 16); // ~60fps
      
      const updateNumber = () => {
        start += increment;
        if (start >= targetValue) {
          stat.textContent = `${targetValue}${suffix}`;
        } else {
          stat.textContent = `${Math.floor(start)}${suffix}`;
          requestAnimationFrame(updateNumber);
        }
      };
      requestAnimationFrame(updateNumber);
    });
  };

  const statsSection = document.querySelector('.about-section');
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
  }

  // ==========================================================================
  // Skills Circular SVG Dials Animation
  // ==========================================================================
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsSection = document.getElementById('skills');

  const animateSkillsDials = () => {
    skillCards.forEach(card => {
      const percentage = card.getAttribute('data-skill-percentage');
      const progressCircle = card.querySelector('.circular-progress .circle');
      
      if (progressCircle && percentage) {
        progressCircle.style.transition = 'stroke-dasharray 1.8s cubic-bezier(0.25, 1, 0.5, 1)';
        setTimeout(() => {
          progressCircle.style.strokeDasharray = `${percentage}, 100`;
        }, 150);
      }
    });
  };

  if (skillsSection && skillCards.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillsDials();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    skillsObserver.observe(skillsSection);
  }

  // ==========================================================================
  // Experience Timeline Scroll Progress Filler
  // ==========================================================================
  const timelineContainer = document.querySelector('.timeline-container');
  const timelineLine = document.querySelector('.timeline-line');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const handleTimelineScroll = () => {
    if (!timelineContainer || !timelineLine) return;

    const rect = timelineContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Active bounds calculation
    const containerTop = rect.top;
    const containerHeight = rect.height;

    let progress = 0;
    if (containerTop < viewportHeight * 0.75) {
      const scrolled = (viewportHeight * 0.75) - containerTop;
      progress = Math.min(Math.max((scrolled / containerHeight) * 100, 0), 100);
    }

    timelineLine.style.background = `linear-gradient(to bottom, var(--primary) 0%, var(--secondary) ${progress}%, var(--border-color) ${progress}%)`;

    timelineItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      // Activate when node enters upper half of viewport
      if (itemRect.top < viewportHeight * 0.75) {
        item.classList.add('timeline-active');
      } else {
        item.classList.remove('timeline-active');
      }
    });
  };

  if (timelineContainer) {
    window.addEventListener('scroll', handleTimelineScroll);
    handleTimelineScroll();
  }

  // ==========================================================================
  // Form Submission Confetti Canvas Particle Generator
  // ==========================================================================
  const triggerConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    const colors = ['#8b5cf6', '#06b6d4', '#ffd600', '#ff6d00', '#10b981', '#ef4444'];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';

      const startX = Math.random() * 100; // left position
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 1.5 + 1.2;
      const delay = Math.random() * 0.2;

      particle.style.left = `${startX}vw`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // randomize shape
      const shapeType = Math.random();
      if (shapeType < 0.3) {
        particle.style.borderRadius = '50%';
      } else if (shapeType < 0.6) {
        particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'; // Triangle
      }

      confettiContainer.appendChild(particle);
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 3000);
  };

  // ==========================================================================
  // Projects Dynamic Categorization Filter
  // ==========================================================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
          card.classList.add('fade-in');
        } else {
          card.classList.remove('fade-in');
          card.classList.add('fade-out');
        }
      });
    });
  });

  // ==========================================================================
  // Contact Form Verification & Submitting Simulation
  // ==========================================================================
  const showFormError = (inputEl, errorEl, message) => {
    const group = inputEl.parentElement;
    group.classList.add('invalid');
    errorEl.textContent = message;
  };

  const clearFormError = (inputEl) => {
    const group = inputEl.parentElement;
    group.classList.remove('invalid');
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      clearFormError(input);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    if (nameInput.value.trim() === '') {
      showFormError(nameInput, nameError, 'Name is required to reply.');
      isValid = false;
    } else {
      clearFormError(nameInput);
    }

    if (emailInput.value.trim() === '') {
      showFormError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showFormError(emailInput, emailError, 'Please enter a valid email format.');
      isValid = false;
    } else {
      clearFormError(emailInput);
    }

    if (messageInput.value.trim() === '') {
      showFormError(messageInput, messageError, 'Please compose your message.');
      isValid = false;
    } else {
      clearFormError(messageInput);
    }

    if (isValid) {
      simulateFormSubmit();
    }
  });

  const simulateFormSubmit = () => {
    const submitBtn = document.getElementById('form-submit-btn');
    if (!submitBtn) return;

    const btnText = submitBtn.querySelector('.btn-text-content') || submitBtn.querySelector('span') || submitBtn;
    const sendIcon = submitBtn.querySelector('.send-icon') || submitBtn.querySelector('svg');
    const successIcon = submitBtn.querySelector('.success-icon') || submitBtn.querySelectorAll('svg')[1];
    const spinner = submitBtn.querySelector('.spinner') || submitBtn.querySelector('div');

    submitBtn.disabled = true;
    if (btnText && btnText !== submitBtn) btnText.textContent = 'Sending Message...';
    if (sendIcon) sendIcon.classList.add('hidden');
    if (spinner) spinner.classList.remove('hidden');

    setTimeout(() => {
      if (spinner) spinner.classList.add('hidden');
      if (successIcon) successIcon.classList.remove('hidden');
      if (btnText && btnText !== submitBtn) btnText.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      submitBtn.style.boxShadow = '0 4px 15px -3px rgba(16, 185, 129, 0.4)';

      // Trigger the premium confetti burst
      triggerConfetti();

      contactForm.reset();

      setTimeout(() => {
        if (successIcon) successIcon.classList.add('hidden');
        if (sendIcon) sendIcon.classList.remove('hidden');
        if (btnText && btnText !== submitBtn) btnText.textContent = 'Send Message';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
      }, 3000);

    }, 1800);
  };
});
