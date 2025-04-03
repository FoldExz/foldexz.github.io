// Immediately Invoked Function Expression for better scope management
(function() {
    'use strict';
    
    // DOM elements cache
    const DOM = {
      header: document.querySelector('.header'),
      navLinks: document.querySelectorAll('a[href^="#"]'),
      contactForm: document.getElementById('contactForm'),
      bookSlide: document.querySelector('.book-slide'),
      animatedElements: document.querySelectorAll('.card, .blog-post, .book-slide')
    };
    
    // EmailJS configuration - Store these in a secure way in production
    const emailConfig = {
        PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, 
        SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
        TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
        RECEIVER: process.env.NEXT_PUBLIC_EMAILJS_RECEIVER
      };
      
    // Book data array
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
    
    // State variables
    let currentBookIndex = 0;
    let isFormSubmitting = false;
    
    /**
     * Initialize EmailJS with public key
     */
    function initEmailJS() {
      // Load EmailJS script dynamically
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      
      script.onload = () => {
        // Initialize EmailJS with public key
        emailjs.init(emailConfig.PUBLIC_KEY);
      };
      
      document.head.appendChild(script);
    }
    
    /**
     * Update book slide content
     */
    function updateBookSlide() {
      const book = books[currentBookIndex];
      
      if (!DOM.bookSlide) return;
      
      // Use animation for smooth transition
      DOM.bookSlide.classList.add('changing');
      
      // Update content after a short delay for animation
      setTimeout(() => {
        DOM.bookSlide.querySelector('.book-title').textContent = book.title;
        DOM.bookSlide.querySelector('.book-description').innerHTML = book.description;
        DOM.bookSlide.querySelector('.book-cover img').src = book.image;
        DOM.bookSlide.querySelector('.book-cover img').alt = book.title;
        DOM.bookSlide.querySelector('.vendor-logo img').src = book.logo;
        
        // Remove changing class to reveal new content
        DOM.bookSlide.classList.remove('changing');
      }, 300);
    }
    
    /**
     * Navigate to next book
     */
    function nextBook() {
      currentBookIndex = (currentBookIndex + 1) % books.length;
      updateBookSlide();
    }
    
    /**
     * Navigate to previous book
     */
    function prevBook() {
      currentBookIndex = (currentBookIndex - 1 + books.length) % books.length;
      updateBookSlide();
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
      
      // Form data
      const formData = {
        fullName: form.elements.fullName.value,
        email: form.elements.email.value,
        message: form.elements.message.value,
        to_email: emailConfig.RECEIVER
      };
      
      // Validate form data
      if (!validateForm(formData)) return;
      
      // Show loading state
      isFormSubmitting = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Send email using EmailJS
      emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        formData
      ).then(
        function(response) {
          // Show success message
          showFormNotification('success', 'Thank you for your message! I will get back to you soon.');
          form.reset();
        },
        function(error) {
          // Show error message
          console.error('EmailJS error:', error);
          showFormNotification('error', 'Something went wrong. Please try again or contact me directly.');
        }
      ).finally(() => {
        // Reset button state
        isFormSubmitting = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
    }
    
    /**
     * Validate form data
     * @param {Object} formData - Form data object
     * @returns {boolean} Whether form data is valid
     */
    function validateForm(formData) {
      const { fullName, email, message } = formData;
      
      // Simple validation
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
     * @param {string} email - Email to validate
     * @returns {boolean} Whether email is valid
     */
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    
    /**
     * Show form notification
     * @param {string} type - Notification type (success/error)
     * @param {string} message - Notification message
     */
    function showFormNotification(type, message) {
      // Remove any existing notification
      const existingNotification = document.querySelector('.form-notification');
      if (existingNotification) {
        existingNotification.remove();
      }
      
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `form-notification ${type}`;
      notification.textContent = message;
      
      // Insert after form
      DOM.contactForm.parentNode.insertBefore(notification, DOM.contactForm.nextSibling);
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 5000);
    }
    
    /**
     * Handle scroll to section on nav link click
     * @param {Event} event - Click event
     */
    function handleNavLinkClick(event) {
      event.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Get header height for offset
      const headerHeight = DOM.header.offsetHeight;
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open (for responsive designs)
      const mobileMenu = document.querySelector('.mobile-menu-open');
      if (mobileMenu) {
        mobileMenu.classList.remove('mobile-menu-open');
      }
    }
    
    /**
     * Handle scroll events
     */
    function handleScroll() {
      // Update header background
      if (window.scrollY > 50) {
        DOM.header.classList.add('header-scrolled');
      } else {
        DOM.header.classList.remove('header-scrolled');
      }
      
      // Animate elements as they come into view
      animateOnScroll();
    }
    
    /**
     * Animate elements on scroll
     */
    function animateOnScroll() {
      DOM.animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('fade-in');
        }
      });
    }
    
    /**
     * Copy email to clipboard
     */
    function copyEmail() {
      const emailElement = document.querySelector('.email');
      if (!emailElement) return;
      
      const email = emailElement.textContent;
      
      navigator.clipboard.writeText(email)
        .then(() => {
          // Show tooltip
          const tooltip = document.createElement('span');
          tooltip.className = 'copy-tooltip';
          tooltip.textContent = 'Email copied!';
          emailElement.appendChild(tooltip);
          
          // Remove tooltip after 2 seconds
          setTimeout(() => {
            tooltip.remove();
          }, 2000);
        })
        .catch(err => {
          console.error('Could not copy text:', err);
        });
    }
    
    /**
     * Prevent image drag
     */
    function preventImageDrag() {
      document.querySelectorAll('img').forEach(img => {
        img.ondragstart = event => event.preventDefault();
      });
    }
    
    /**
     * Add CSS animations
     */
    function addAnimationStyles() {
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
          transition: opacity 0.3s ease;
        }
        
        .book-slide.changing {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .header-scrolled {
          background: rgba(1, 1, 3, 0.9) !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-notification {
          padding: 12px 16px;
          margin: 10px 0;
          border-radius: 4px;
          font-size: 14px;
          animation: slideIn 0.3s ease;
        }
        
        .form-notification.success {
          background-color: rgba(47, 158, 68, 0.1);
          border-left: 4px solid #2f9e44;
          color: #2f9e44;
        }
        
        .form-notification.error {
          background-color: rgba(230, 57, 70, 0.1);
          border-left: 4px solid #e63946;
          color: #e63946;
        }
        
        .form-notification.fade-out {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .copy-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          animation: fadeInOut 2s ease;
        }
        
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    /**
     * Initialize the application
     */
    function init() {
      // Initialize EmailJS
      initEmailJS();
      
      // Add animation styles
      addAnimationStyles();
      
      // Set up event listeners
      window.addEventListener('scroll', handleScroll);
      DOM.navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
      if (DOM.contactForm) DOM.contactForm.addEventListener('submit', submitForm);
      
      // Email copy function (if applicable)
      const emailElement = document.querySelector('.email');
      if (emailElement) {
        emailElement.addEventListener('click', copyEmail);
      }
      
      // Prevent image drag
      preventImageDrag();
      
      // Add book navigation to global scope for onclick attributes
      window.nextBook = nextBook;
      window.prevBook = prevBook;
      
      // Run initial functions
      handleScroll();
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
  })();