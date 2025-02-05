// Initialize particles.js
document.addEventListener('DOMContentLoaded', () => {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#08d9d6'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#08d9d6',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      }
    },
    retina_detect: true
  });

  // Loading animation
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
      initializeAnimations();
    }, 1000);
  }, 3000);
});

// Initialize animations and interactive elements
function initializeAnimations() {
  // Typing animation for introduction
  const text = "Hello, I'm";
  const typingText = document.querySelector('.typing-text');
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      // Add bounce effect
      typingText.style.animation = 'bounce 0.5s';
      setTimeout(() => {
        typingText.style.animation = '';
      }, 500);
    }
  }

  typeWriter();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-active');
    navLinks.classList.toggle('show');
  });

  // Academic cards flip animation
  const academicCards = document.querySelectorAll('.academic-card');
  academicCards.forEach(card => {
    card.addEventListener('click', () => {
      card.querySelector('.card-inner').classList.toggle('flipped');
    });
  });

  // Quote container interaction
  const quoteContainer = document.querySelector('.quote-container');
  quoteContainer.addEventListener('mouseenter', () => {
    quoteContainer.style.transform = 'scale(1.05) rotate(2deg)';
  });
  
  quoteContainer.addEventListener('mouseleave', () => {
    quoteContainer.style.transform = 'scale(1) rotate(0deg)';
  });

  // Project cards hover effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Profile image parallax effect
  const profile = document.querySelector('.profile-container');
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    if (profile) {
      profile.style.transform = `
        rotateY(${mouseX * 20}deg)
        rotateX(${-mouseY * 20}deg)
        translateZ(0)
      `;
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Dynamic navbar background
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
      navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
  });
}

// Optional: Form submission handling (if you add a form later)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  });
}