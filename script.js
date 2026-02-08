document.addEventListener('DOMContentLoaded', () => {
    // Image Transition Logic
    const images = document.querySelectorAll('.transition-img');
    let currentIndex = 0;

    function nextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Change image every 5 seconds
    setInterval(nextImage, 5000);

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // Add more complex mobile menu logic if needed
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form Submission (Mailto)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            const mailtoLink = `mailto:udaykiran.1324uk@gmail.com?subject=Portfolio Message from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
            
            window.location.href = mailtoLink;
            alert('Your email client will now open to send the message.');
            contactForm.reset();
        });
    }

    // Scroll Animation (Revealing elements)
    const revealElements = document.querySelectorAll('.project-card, .timeline-item, .edu-item');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Theme Toggle Logic
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Voice Control Logic
    const voiceBtn = document.getElementById('voice-btn');
    const voiceStatus = document.getElementById('voice-status');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('listening')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });

        recognition.onstart = () => {
            voiceBtn.classList.add('listening');
            voiceStatus.textContent = 'Voice: Active';
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            voiceStatus.textContent = `Saw: "${command}"`;
            handleVoiceCommand(command);
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') return; // Ignore silence
            voiceBtn.classList.remove('listening');
            voiceStatus.textContent = 'Error: ' + event.error;
        };

        recognition.onend = () => {
            // Always-on behavior
            recognition.start();
        };

        // Auto-start on load
        window.addEventListener('load', () => {
            recognition.start();
        });

        const handleVoiceCommand = (command) => {
            const sections = {
                'home': '#home',
                'about': '#about',
                'experience': '#experience',
                'projects': '#projects',
                'skills': '#skills',
                'contact': '#contact',
                'me': '#contact',
                'show projects': '#projects',
                'view projects': '#projects',
                'journey': '#experience'
            };

            for (const key in sections) {
                if (command.includes(key)) {
                    const targetElement = document.querySelector(sections[key]);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        return;
                    }
                }
            }
        };
    } else {
        voiceBtn.style.display = 'none';
        console.log('Speech Recognition not supported in this browser.');
    }
});
