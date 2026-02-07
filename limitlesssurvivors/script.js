document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Video playback handling (ensure autoplay works)
    const video = document.getElementById('bg-video');
    if (video) {
        video.play().catch(error => {
            console.log("Video autoplay blocked or failed:", error);
        });
    }

    // Parallax effect for fixed hero layer
    const parallaxLayer = document.querySelector('.hero-parallax-layer');
    if (parallaxLayer) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            // Since it's fixed, it stays at 0.
            // Move it UP by 0.5 * scrollPosition to make it disappear slower than normal scroll (which is 1.0)
            // Wait, normal scroll means content moves UP. 
            // If fixed layer stays at 0, it doesn't move.
            // If we want it to move at 0.5 speed, we need to translate it UP by 0.5 * scrollPosition
            // translate Y negative moves up.
            parallaxLayer.style.transform = `translateY(-${scrollPosition * 0.5}px)`;

            // Opacity fade out removed as requested
        });
    }
});
