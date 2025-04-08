// Book slider functionality
let currentBookIndex = 0;
const books = [
  {
      title: "Unveil Deeper | Mikrotik - MTCNA",
      description: `<p>This comprehensive guide covers all essential aspects of Mikrotik Router OS with a focus on network administrator certification topics. The book takes readers from basic operations like accessing and configuring Mikrotik devices to advanced features including wireless setup, firewall implementation, QoS management, and network management tools. Clear step-by-step instructions make complex networking concepts accessible to beginners.</p>
      <p>The book excels in its practical approach, with extensive coverage of real-world applications like creating wireless bridges, setting up repeaters, implementing content filtering, and configuring hotspots. It provides the perfect preparation for the Mikrotik Certified Network Associate (MTCNA) exam while delivering immediate value for network administrators looking to implement Mikrotik solutions in production environments.</p>`,
      image: "images/book-mtcna.png",
      logo: "images/mikrotik-logo.png"
  },
  {
      title: "Unveil Deeper | Cisco - MTCRE",
      description: `<p>Building on the foundations of MTCNA, this advanced guide focuses exclusively on routing concepts for Mikrotik networks. The book is structured around 39 hands-on labs covering static routing, dynamic routing protocols (RIP and OSPF), VLANs, tunneling protocols, and network monitoring systems. Each lab provides detailed configuration steps and clear explanations of the underlying networking principles.</p>
      <p>What sets this book apart is its emphasis on practical implementations of complex routing scenarios including route summarization, routing policies, authentication, redundancy setups, and monitoring solutions. Network professionals will appreciate the comprehensive coverage of tunneling protocols (EoIP, IP-IP, GRE, PPTP, PPPoE, L2TP) and the integration with popular Network Management Systems like WhatsUp Gold, PRTG, and NetFlow Analyzer.</p>`,
      image: "images/book-mtcre.png",
      logo: "images/mikrotik-logo.png"
  },
  {
      title: "Unveil Deeper | Cisco - CCNA",
      description: `<p>This CCNA preparation guide covers the complete Cisco certification curriculum with a focus on practical implementation. Starting with network fundamentals and the OSI model, the book progresses through switching technologies (VLANs, trunking, STP), routing protocols (static, EIGRP, OSPF), security measures (access lists, NAT), tunneling, and high availability protocols (HSRP, VRRP, GLBP). The content follows a logical progression from basic to advanced concepts.</p>
      <p>The book's strength lies in its concise, to-the-point approach that eliminates unnecessary theory while providing exactly what's needed to pass the CCNA exam and implement Cisco networks in professional environments. Multiple scenarios for each technology demonstrate different implementation options, helping readers develop a deeper understanding of how to apply Cisco technologies to solve various networking challenges.</p>`,
      image: "images/book-ccna.png",
      logo: "images/cisco-logo.png"
  },
  {
      title: "Unveil Deeper | Cisco - CCNP",
      description: `<p>This advanced guide targets professionals pursuing CCNP certification or working with complex enterprise networks. The book provides in-depth coverage of EIGRP and OSPF advanced features, IPv6 routing and tunneling, BGP implementation, VPN technologies (including DMVPN and IPSec), MPLS configurations, and advanced switching topics. Each chapter includes detailed configuration examples and explanations of the underlying routing mechanisms.</p>
      <p>The most valuable aspect of this book is its enterprise-focused approach to network design and troubleshooting. Rather than just covering certification topics, it presents real-world implementation scenarios for complex routing filters, route redistribution, high-availability configurations, and service provider technologies like MPLS. The comprehensive coverage of BGP attributes, DMVPN phases, and switching technologies makes this an essential reference for network engineers working in large-scale environments.</p>`,
      image: "images/book-ccnp.png",
      logo: "images/cisco-logo.png"
  }
];

function updateBookSlide() {
  const book = books[currentBookIndex];
  const bookSlide = document.querySelector('.book-slide');
  
  // Update book content
  bookSlide.querySelector('.book-title').textContent = book.title;
  bookSlide.querySelector('.book-description').innerHTML = book.description;
  bookSlide.querySelector('.book-cover img').src = book.image;
  bookSlide.querySelector('.book-cover img').alt = book.title;
  bookSlide.querySelector('.vendor-logo img').src = book.logo;
}

function nextBook() {
  currentBookIndex = (currentBookIndex + 1) % books.length;
  updateBookSlide();
}

function prevBook() {
  currentBookIndex = (currentBookIndex - 1 + books.length) % books.length;
  updateBookSlide();
}


// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
          });
      }
  });
});

// Add scroll event listener to change header background
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
      header.style.background = 'rgba(1, 1, 3, 0.9)';
  } else {
      header.style.background = 'rgba(1, 1, 3, 0.38)';
  }
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements as they come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.card, .blog-post, .book-slide');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('fade-in');
          }
      });
  };
  
  // Add fade-in class for CSS animation
  const style = document.createElement('style');
  style.textContent = `
      .fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
      }
      
      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }
      
      .card, .blog-post, .book-slide {
          opacity: 0;
      }
  `;
  document.head.appendChild(style);
  
  // Run on initial load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("img").forEach(img => {
      img.ondragstart = function(event) {
          event.preventDefault();
      };
  });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const menuClose = document.querySelector('.menu-close');

// Make sure these elements exist in your HTML
if (!mobileMenu) {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'mobile-menu';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'menu-close';
    closeBtn.innerHTML = '✕';
    menuDiv.appendChild(closeBtn);
    
    const menuLinks = document.querySelector('.navbar ul').cloneNode(true);
    menuDiv.appendChild(menuLinks);
    
    document.body.appendChild(menuDiv);
    
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    document.body.appendChild(overlayDiv);
}

// Add button if not exists
if (!mobileMenuBtn) {
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = '☰';
    document.querySelector('.header .container').appendChild(btn);
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const menuClose = document.querySelector('.menu-close');
    
    // Toggle menu open
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Function to close menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close button functionality
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking menu items
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// EmailJS configuration - Store these in a secure way in production
const emailConfig = {
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, 
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
    RECEIVER: process.env.NEXT_PUBLIC_EMAILJS_RECEIVER
  };
  
  /**
   * Initialize EmailJS with public key
   */
  function initEmailJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
  
    script.onload = () => {
      emailjs.init(emailConfig.PUBLIC_KEY);
    };
  
    document.head.appendChild(script);
  }
  
  /**
   * Submit form using EmailJS
   * @param {Event} event - Form submission event
   */
  function submitForm(event) {
    event.preventDefault();
  
    if (isFormSubmitting) return;
  
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
  
    const formData = {
      fullName: form.elements.fullName.value,
      email: form.elements.email.value,
      message: form.elements.message.value,
      to_email: emailConfig.RECEIVER
    };
  
    if (!validateForm(formData)) return;
  
    isFormSubmitting = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
  
    emailjs.send(
      emailConfig.SERVICE_ID,
      emailConfig.TEMPLATE_ID,
      formData
    ).then(
      function(response) {
        showFormNotification('success', 'Thank you for your message! I will get back to you soon.');
        form.reset();
      },
      function(error) {
        console.error('EmailJS error:', error);
        showFormNotification('error', 'Something went wrong. Please try again or contact me directly.');
      }
    ).finally(() => {
      isFormSubmitting = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  }
  
  /**
   * Validate form data
   */
  function validateForm(formData) {
    const { fullName, email, message } = formData;
  
    if (!fullName || fullName.trim().length < 2) {
      showFormNotification('error', 'Please enter your full name');
      return false;
    }
  
    if (!email || !isValidEmail(email)) {
      showFormNotification('error', 'Please enter a valid email address');
      return false;
    }
  
    if (!message || message.trim().length < 5) {
      showFormNotification('error', 'Please enter your message');
      return false;
    }
  
    return true;
  }
  
  /**
   * Validate email format
   */
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Show form notification
   */
  function showFormNotification(type, message) {
    const successEl = document.querySelector('.success-message');
    const errorEl = document.querySelector('.error-message');
  
    // Reset visibility
    successEl.style.display = 'none';
    errorEl.style.display = 'none';
  
    if (type === 'success') {
      successEl.textContent = message;
      successEl.style.display = 'block';
    } else if (type === 'error') {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  
    // Auto-hide after 5s
    setTimeout(() => {
      successEl.style.display = 'none';
      errorEl.style.display = 'none';
    }, 5000);
  }
  
  
