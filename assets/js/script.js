    const phrases = [
        {
            headline: `Expert <span class="highlight-text">Barber</span> Services`,
            subtext: `Traditional <span class="special-word">grooming</span> meets modern style`,
            bgIndex: 0
        },
        {
            headline: `Premium <span class="highlight-text">Beauty</span> Services`,
            subtext: `Experience luxury <span class="special-word">spa</span> treatments in the city`,
            bgIndex: 1
        },
        {
            headline: `Luxury <span class="highlight-text">Wellness</span> Packages`,
            subtext: `Rejuvenate your <span class="special-word">body</span> and mind`,
            bgIndex: 2
        }
    ];

    let currentPhrase = 0;
    let isDeleting = false;
    let timer = null;
    let currentText = '';
    let currentSubtext = '';

    function typeText() {
        const { headline, subtext } = phrases[currentPhrase];
        const headlineElement = document.getElementById('typing-headline');
        const subtextElement = document.getElementById('typing-subtext');
        
        // Type headline
        if (!isDeleting) {
            currentText = headline.substring(0, currentText.length + 1);
            headlineElement.innerHTML = currentText;
            
            if (currentText === headline) {
                // Start typing subtext after headline completes
                setTimeout(() => {
                    typeSubtext(subtext);
                }, 1000);
            } else {
                timer = setTimeout(typeText, 100);
            }
        } else {
            currentText = headline.substring(0, currentText.length - 1);
            headlineElement.innerHTML = currentText;
            timer = setTimeout(typeText, 50);
        }
    }

    function typeSubtext(text) {
        currentSubtext = text.substring(0, currentSubtext.length + 1);
        document.getElementById('typing-subtext').innerHTML = currentSubtext;
        
        if (currentSubtext !== text) {
            setTimeout(() => typeSubtext(text), 50);
        } else {
            // Wait before deleting
            setTimeout(() => {
                isDeleting = true;
                deleteText();
            }, 3000);
        }
    }

    function deleteText() {
        const headlineElement = document.getElementById('typing-headline');
        const subtextElement = document.getElementById('typing-subtext');
        
        if (currentSubtext.length > 0) {
            currentSubtext = currentSubtext.substring(0, currentSubtext.length - 1);
            subtextElement.innerHTML = currentSubtext;
            setTimeout(deleteText, 30);
        } else if (currentText.length > 0) {
            currentText = currentText.substring(0, currentText.length - 1);
            headlineElement.innerHTML = currentText;
            setTimeout(deleteText, 50);
        } else {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeText();
        }
    }

    // Start the typing effect
    typeText();
    
    // Sync background with text changes
    setInterval(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach(slide => slide.style.opacity = 0);
        slides[currentPhrase].style.opacity = 1;
    }, 20000);

    // Service Section Animation Trigger
    const servicesGrid = document.querySelector('.services-grid');
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                servicesGrid.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    servicesObserver.observe(servicesGrid);
    // Clone elements for perfect infinite loop
    const scrollTrack = document.querySelector('.scroll-track');
    const scrollPhrase = document.querySelector('.scroll-phrase');
    
    function cloneElements() {
        const clone = scrollPhrase.cloneNode(true);
        scrollTrack.appendChild(clone);
    }
    
    // Clone enough times to cover viewport
    cloneElements();
    cloneElements();

    // Animation trigger
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(50px)';
        serviceObserver.observe(item);
    });
    

// Add intersection observer for fade-in effect
        const aboutContent = document.querySelector('.about-content');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutContent);

        //counter
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Counter Observer
        const counters = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    animateValue(target, 0, count, 2000);
                    statsObserver.unobserve(target); // Stop observing after animation
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => {
            statsObserver.observe(counter);
        });
        //before/after slider

        const container = document.querySelector('.compare-container');
        const handle = document.querySelector('.slider-handle');
        const beforeImage = document.querySelector('.image-before');
        let isDragging = false;

        function updateSlider(clientX) {
            const rect = container.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = (x / rect.width) * 100;
            
            // Update before image clip and handle position
            beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            beforeImage.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        }

        // Mouse events
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Initialize slider at 50%
        updateSlider(container.offsetWidth / 2);

        //testimonial

