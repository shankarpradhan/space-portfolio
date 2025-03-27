document.addEventListener('DOMContentLoaded', function() {

    emailjs.init('kHF76lVuHfckxlsGp'); // Replace with your actual public key

    // ... (keep all your existing code until the contact form section)

    // Replace the existing form submission code with this:
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Create message element dynamically
    const formMessage = document.createElement('div');
    formMessage.className = 'form-message';
    contactForm.appendChild(formMessage);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button state
        submitBtn.textContent = 'Launching...';
        submitBtn.disabled = true;
        
        // Send email via EmailJS
        emailjs.sendForm(
            'service_ofh2xlv', // Your service ID
            'template_k779zdv', // Your template ID
            contactForm
        )
        .then(function() {
            // Success message
            formMessage.textContent = 'Message launched successfully! 🚀';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Change button back after delay
            setTimeout(() => {
                submitBtn.textContent = 'Launch Message';
                submitBtn.style.background = 'linear-gradient(to right, var(--space-blue), var(--space-purple))';
            }, 3000);
        }, function(error) {
            // Error message
            formMessage.textContent = 'Message failed to launch! Try again.';
            formMessage.className = 'form-message error';
            console.error('Failed to send:', error);
            
            // Reset button immediately on error
            submitBtn.textContent = 'Launch Message';
            submitBtn.disabled = false;
        });
    });


    // Optional: Scroll animations for elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Only observe elements with scroll-animate class
    document.querySelectorAll('.space-section.scroll-animate').forEach(section => {
        observer.observe(section);
    });

    // Smooth eased scrolling function
    function slowEasedScroll(targetId, duration = 1500) {
        const target = document.getElementById(targetId);
        
        if (!target) {
            window.location.href = `/#${targetId}`;
            return;
        }
    
        // Make sure target is visible
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        target.classList.remove('scroll-animate');
        
        const startPosition = window.scrollY;
        const targetPosition = target.getBoundingClientRect().top + startPosition - 100;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        // Easing function
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
    
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easeProgress = easeInOutQuad(progress);
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                history.pushState(null, "", `#${targetId}`);
            }
        }
    
        requestAnimationFrame(animation);
    }
    
    // Navigation click handler
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                targetSection.classList.remove('scroll-animate');
            }
            
            slowEasedScroll(targetId);
        });
    });

    // Form submission
    

    // Initialize tilt.js on project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Scroll to hash on page load if present
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
            slowEasedScroll(targetId, 1500);
        }, 100);
    }

    // Skill Planets Interaction - MOVED INSIDE DOMContentLoaded
    const skillPlanets = document.querySelectorAll('.skill-planet');
    const skillInfo = document.getElementById('skill-info');

    // Skill details data
    const skillDetails = {
        'HTML5': {
            description: 'Proficient in semantic HTML5 markup and accessibility standards.',
            level: 90
        },
        'CSS3': {
            description: 'Advanced CSS3 skills including animations and responsive design.',
            level: 85
        },
        'JavaScript': {
            description: 'Strong JavaScript fundamentals and ES6+ features.',
            level: 80
        },
        'React': {
            description: 'Experience building applications with React and Redux.',
            level: 75
        },
        'Node.js': {
            description: 'Backend development with Node.js and Express.',
            level: 70
        },
        'Python': {
            description: 'Python scripting and Django framework experience.',
            level: 65
        }
    };

    // Add hover effects to each planet
    skillPlanets.forEach(planet => {
        const skill = planet.getAttribute('data-skill');
        
        planet.addEventListener('mouseenter', function() {
            // Highlight the planet
            planet.style.transform = 'scale(1.2)';
            planet.style.filter = 'brightness(1.2)';
            planet.style.boxShadow = '0 0 15px var(--space-light)';
            
            // Display skill information
            if (skillInfo && skillDetails[skill]) {
                skillInfo.innerHTML = `
                    <h3>${skill}</h3>
                    <p>${skillDetails[skill].description}</p>
                    <div class="skill-level">
                        <div class="level-bar" style="width: ${skillDetails[skill].level}%"></div>
                    </div>
                `;
                skillInfo.style.opacity = '1';
                skillInfo.style.visibility = 'visible';
            }
        });

        planet.addEventListener('mouseleave', function() {
            // Reset planet appearance
            planet.style.transform = '';
            planet.style.filter = '';
            planet.style.boxShadow = '';
            
            // Hide skill info
            if (skillInfo) {
                skillInfo.style.opacity = '0';
                skillInfo.style.visibility = 'hidden';
            }
        });
    });

    // contact form
    
});