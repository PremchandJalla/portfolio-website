// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Header on Scroll
const header = document.getElementById('header');
window.onscroll = () => {
    if (window.pageYOffset > 50) {
        header.style.background = '#333';
        header.style.color = '#fff';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.color = '#333';
    }
};

// Lazy Load Images (optional)
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
        });
    }
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});


// rotating-subtitle.js

document.addEventListener('DOMContentLoaded', function () {
    const titles = ["AI Engineer","Application Developer", "Innovator"];
    let currentIndex = 0;
    const subtitleElement = document.getElementById('rotating-subtitle');

    function rotateTitle() {
        currentIndex = (currentIndex + 1) % titles.length;
        subtitleElement.textContent = titles[currentIndex];
    }

    setInterval(rotateTitle, 3000); // Change every 3 seconds
});


// Advanced GSAP Animations

// Bouncing GitHub Icon
gsap.from(".github-icon", { 
    duration: 1, 
    scale: 0.8, 
    opacity: 0, 
    ease: "bounce.out", 
    yoyo: true, 
    repeat: -1 
});

// Wobble Effect on LinkedIn Icon
gsap.to(".linkedin-icon", {
    duration: 1.5,
    rotate: 10,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});
