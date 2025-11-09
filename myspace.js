// MY SPACE PAGE JAVASCRIPT

// Tab Switching Functionality
function switchSpaceTab(tabName) {
    // Remove active class from all tabs and content
    const tabs = document.querySelectorAll('.space-tab');
    const contents = document.querySelectorAll('.space-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.closest('.space-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Scroll to content smoothly
    document.getElementById(tabName).scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Trigger animations for the active tab
    animateOnTabSwitch(tabName);
}

// Animate elements when tab is switched
function animateOnTabSwitch(tabName) {
    const activeContent = document.getElementById(tabName);
    const animatedElements = activeContent.querySelectorAll('.app-card, .mobile-app-card, .freelance-item, .design-item, .consulting-card, .linkedin-post-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'block';
            card.style.animation = 'fadeInSlide 0.6s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    if (document.getElementById('clients').classList.contains('active')) {
        nextTestimonial();
    }
}, 5000);

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', () => {

const statNumbers = document.querySelectorAll('.client-stats .stat-number');
    statNumbers.forEach(stat => counterObserver.observe(stat));
    
    // Show first testimonial
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }
});

// Modal functions for design portfolio
function openDesignModal(designId) {
    // You can implement a modal here to show full design details
    console.log('Opening design modal for:', designId);
    // For now, just alert
    alert('Design details modal - To be implemented');
}

// LinkedIn Feed Integration
// This is a placeholder - you'll need to update with actual posts
const linkedInPosts = [
    {
        date: '2024-11-01',
        content: `Excited to share insights from my latest project on fine-tuning Large Language Models for mental health applications. The intersection of AI and healthcare continues to present fascinating challenges and opportunities. 🚀

Key learnings:
• Importance of domain-specific data
• Ethical considerations in health tech
• User-centric design in AI applications

#AI #MachineLearning #HealthTech #LLM`,
        likes: 145,
        comments: 23,
        shares: 12,
        url: 'https://linkedin.com/in/akshay-sasi'
    },
    {
        date: '2024-10-28',
        content: `Just completed an amazing consulting project helping a startup implement their AI strategy from scratch. It's incredibly rewarding to see how proper ML architecture can transform business operations.

Some practical tips for AI implementation:
✅ Start with clear business objectives
✅ Ensure data quality from day one
✅ Build iteratively
✅ Measure impact continuously

#AIConsulting #MLOps #TechStrategy`,
        likes: 89,
        comments: 15,
        shares: 8,
        url: 'https://linkedin.com/in/akshay-sasi'
    },
    {
        date: '2024-10-25',
        content: `Reflecting on my journey in AI/ML - from academic research to building production-ready systems. The field has evolved dramatically, and so has my approach to solving problems.

What I've learned:
🔹 Theory is important, but practical implementation teaches you more
🔹 User feedback is gold
🔹 Continuous learning is non-negotiable
🔹 Collaboration amplifies impact

Looking forward to more exciting challenges ahead! 💡

#AIJourney #MachineLearning #CareerGrowth`,
        likes: 201,
        comments: 34,
        shares: 15,
        url: 'https://linkedin.com/in/akshay-sasi'
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Optional: If you want to dynamically load LinkedIn posts (requires manual update)
function loadLinkedInPosts() {
    const feedContainer = document.getElementById('linkedinFeed');
    
    if (!feedContainer) return;
    
    // Only load if posts are defined
    if (typeof linkedInPosts === 'undefined' || linkedInPosts.length === 0) return;
    
    // Clear existing placeholder posts
    feedContainer.innerHTML = '';
    
    // Take only the latest 3 posts
    const latestPosts = linkedInPosts.slice(0, 3);
    
    latestPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'linkedin-post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <img src="images/user.png" alt="Akshay Sasi" class="post-author-img">
                <div class="post-author-info">
                    <h4>Akshay Sasi</h4>
                    <p>AI Engineer | ML Enthusiast | Tech Innovator</p>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
                <a href="${post.url}" class="linkedin-icon" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-engagement">
                <span><i class="fas fa-thumbs-up"></i> ${post.likes} likes</span>
                <span><i class="fas fa-comment"></i> ${post.comments} comments</span>
                <span><i class="fas fa-share"></i> ${post.shares} shares</span>
            </div>
            <a href="${post.url}" class="btn-view-post" target="_blank">
                View on LinkedIn
            </a>
        `;
        feedContainer.appendChild(postCard);
    });
}

// Call this function when LinkedIn tab is activated
document.addEventListener('DOMContentLoaded', () => {
    // Optionally load LinkedIn posts dynamically
    loadLinkedInPosts();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('myspace-hero');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroSection.style.transform = `translateY(${parallax}px)`;
    }
});

// Add fade-in animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInSlide {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Contact form handling (reused from main page)
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    status.style.display = 'none';
    
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyz5od7oMH_s7-n4cjDP3T-n46yt6GfdYiAyQE-PTTc9BfbreFXqZx9PUzYmTdcIROFJA/exec', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (!response.ok || data.result !== 'success') {
            throw new Error(data.message || 'Failed to send message');
        }
        
        showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        showStatus(error.message || 'Error sending message. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
    
    function showStatus(message, type) {
        status.style.display = 'block';
        status.textContent = message;
        status.style.color = type === 'success' ? '#4CAF50' : '#f44336';
        status.style.backgroundColor = type === 'success' 
            ? 'rgba(76, 175, 80, 0.1)' 
            : 'rgba(244, 67, 54, 0.1)';
        status.style.padding = '15px';
        status.style.borderRadius = '5px';
        status.style.marginTop = '20px';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }
});

// Analytics tracking (optional)
function trackEvent(category, action, label) {
    // If you have Google Analytics or similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track app launches
document.querySelectorAll('.btn-launch').forEach(btn => {
    btn.addEventListener('click', () => {
        const appName = btn.closest('.app-card').querySelector('h3').textContent;
        trackEvent('App Launch', 'Click', appName);
    });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External Link', 'Click', link.href);
    });
});

console.log('My Space page initialized successfully!');