
// Initialize AOS animation library
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const backToTopBtn = document.getElementById('back-to-top');
const portfolioModal = document.getElementById('portfolio-modal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.getElementById('modal-content');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Navigation - Change on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
  
  // Highlight current section in navigation
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Portfolio Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove('active');
    });
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterValue === 'all') {
      portfolioItems.forEach((item) => {
        item.style.display = 'block';
      });
    } else {
      portfolioItems.forEach((item) => {
        if (item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });
});

// Portfolio Modal
function openPortfolioModal(index) {
  const project = projectsData[index];
  
  let toolsHTML = '';
  project.tools.forEach(tool => {
    toolsHTML += `<div class="tool-tag">${tool}</div>`;
  });
  
  const modalHTML = `
    <div class="modal-project">
      <div class="modal-img-container">
        <img src="${project.image}" alt="${project.title}" class="modal-img">
      </div>
      <div class="modal-info">
        <h2 class="modal-title">${project.title}</h2>
        <span class="modal-category">${project.category}</span>
        <p class="modal-description">${project.description}</p>
        <div class="modal-details">
          <div class="modal-detail-item">
            <div class="modal-detail-label">Client:</div>
            <div>${project.client}</div>
          </div>
          <div class="modal-detail-item">
            <div class="modal-detail-label">Date:</div>
            <div>${project.date}</div>
          </div>
        </div>
        <div class="modal-tools">
          <h4 class="modal-tools-title">Tools & Technologies</h4>
          <div class="modal-tools-list">
            ${toolsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  
  modalContent.innerHTML = modalHTML;
  portfolioModal.classList.add('show');
  
  // Prevent scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

// Close portfolio modal
closeModal.addEventListener('click', () => {
  portfolioModal.classList.remove('show');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === portfolioModal) {
    portfolioModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // This is where you would normally send the form data to a server
  // For demo purposes, we'll just show a success message
  
  formMessage.innerHTML = `Thank you ${name}! Your message has been sent successfully.`;
  formMessage.classList.add('success');
  
  // Reset form after submission
  contactForm.reset();
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    formMessage.innerHTML = '';
    formMessage.classList.remove('success');
  }, 5000);
});

// Initialize Charts
function initCharts() {
  // Revenue Growth Chart
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: '2022 Revenue',
          data: [30, 45, 35, 55, 40, 60, 55, 70, 65, 80, 75, 90],
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#2ecc71',
          pointRadius: 4,
          tension: 0.3,
          fill: true
        },
        {
          label: '2021 Revenue',
          data: [20, 35, 25, 45, 30, 50, 40, 60, 55, 65, 60, 75],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#3498db',
          pointRadius: 4,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [5, 5],
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // Market Segment Distribution
  const segmentCtx = document.getElementById('segmentChart').getContext('2d');
  new Chart(segmentCtx, {
    type: 'doughnut',
    data: {
      labels: ['Retail', 'E-commerce', 'Wholesale', 'B2B Services', 'Other'],
      datasets: [{
        data: [35, 30, 15, 12, 8],
        backgroundColor: [
          '#2ecc71',
          '#3498db',
          '#f39c12',
          '#9b59b6',
          '#e74c3c'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      },
      cutout: '65%'
    }
  });

  // Performance Metrics
  const metricsCtx = document.getElementById('metricsChart').getContext('2d');
  new Chart(metricsCtx, {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Acquisition',
          data: [65, 75, 80, 85],
          backgroundColor: 'rgba(52, 152, 219, 0.7)'
        },
        {
          label: 'Retention',
          data: [70, 65, 75, 90],
          backgroundColor: 'rgba(46, 204, 113, 0.7)'
        },
        {
          label: 'Engagement',
          data: [55, 60, 70, 80],
          backgroundColor: 'rgba(243, 156, 18, 0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      barPercentage: 0.7,
      categoryPercentage: 0.8
    }
  });
  
  // Hero Chart (Background Visual)
  const heroChartCtx = document.getElementById('hero-chart');
  if (heroChartCtx) {
    const dataPoints = 50;
    const dataSet1 = Array(dataPoints).fill().map(() => Math.random() * 100);
    const dataSet2 = Array(dataPoints).fill().map(() => Math.random() * 100);
    
    new Chart(heroChartCtx, {
      type: 'line',
      data: {
        labels: Array(dataPoints).fill(''),
        datasets: [
          {
            data: dataSet1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 1,
            pointRadius: 0,
            fill: false,
            tension: 0.4
          },
          {
            data: dataSet2,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            pointRadius: 0,
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        elements: {
          line: {
            tension: 0.4
          }
        },
        animation: {
          duration: 2000
        }
      }
    });
  }
}

// Populate portfolio items from project data
function populatePortfolio() {
  projectsData.forEach((project, index) => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = `portfolio-item ${project.filter}`;
    
    portfolioItem.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="portfolio-img">
      <div class="portfolio-overlay">
        <h3 class="portfolio-title">${project.title}</h3>
        <p class="portfolio-category">${project.category}</p>
        <button class="portfolio-btn">View Details</button>
      </div>
    `;
    
    // Add click event to open modal
    portfolioItem.addEventListener('click', () => {
      openPortfolioModal(index);
    });
    
    portfolioGrid.appendChild(portfolioItem);
  });
}

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  populatePortfolio();
  initCharts();
  
  // Animate skill bars after they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.5});
  
  document.querySelectorAll('.skills-category').forEach(skillCategory => {
    observer.observe(skillCategory);
  });
});
