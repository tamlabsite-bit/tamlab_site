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
            // translate Y negative moves up.
            parallaxLayer.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
        });
    }
});

// Localization Logic
const translations = {
    ja: {
        "hero.catchphrase": "無限の深淵へ、終わりなき挑戦を。",
        "hero.release_text": "2026年7月 Steam&reg;にて配信予定",
        "hero.wishlist_text": "Coming July 2026 to Steam",
        "intro.text": "インクリメンタル×無限育成<br>アーティファクトを収集し、クリスタルを集めステータスを強化<br>オートプレイで放置ファーミング",
        "community.title": "コミュニティ & リンク",
        "community.desc": "最新情報は公式Xアカウントでチェック",
        "community.follow_x": "Follow on X",
        "link.steam": "Steamストアページ",
        "link.presskit": "プレスキット"
    },
    en: {
        "hero.catchphrase": "Descend into the Abyss. Face the Endless Challenge.",
        "hero.release_text": "Coming July 2026 to Steam",
        "hero.wishlist_text": "Add to your Wishlist",
        "intro.text": "Incremental roguelite with infinite progression.<br>Collect powerful artifacts, gather crystals, and scale your stats to absurd levels.<br>Auto-play cleared dungeons and farm while AFK.",
        "community.title": "Community & Links",
        "community.desc": "Check the latest info on our official X account",
        "community.follow_x": "Follow on X",
        "link.steam": "Steam Store Page",
        "link.presskit": "Press Kit"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Language detection
    const userLang = navigator.language || navigator.userLanguage;
    // Default to 'ja' if starts with 'ja', otherwise 'en'
    const lang = userLang.startsWith('ja') ? 'ja' : 'en';

    // Set html lang attribute
    if (lang === 'en') {
        document.documentElement.lang = 'en';
    }

    // Apply translations
    const elements = document.querySelectorAll('[data-i18n]');
    if (translations[lang]) {
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }

    // Update trailer video based on language
    const trailerVideo = document.getElementById('trailer-video');
    if (trailerVideo) {
        if (lang === 'en') {
            trailerVideo.src = "https://www.youtube.com/embed/mtoJjaZSt-Q?vq=hd720";
        } else {
            trailerVideo.src = "https://www.youtube.com/embed/9ZPjNiJOgEM?vq=hd720";
        }
    }

    // Update presskit links based on language
    const presskitLinks = document.querySelectorAll('a[data-i18n="link.presskit"]');
    presskitLinks.forEach(link => {
        if (lang === 'en') {
            link.href = "https://drive.google.com/drive/folders/1-cc1j_zws2EV2nMz511JcHM3v0jtJ3Lk";
        } else {
            link.href = "https://drive.google.com/drive/folders/1QnVUIc1fDtsMnhzFZmHDK6cwAhTmsdWG";
        }
    });

    // Update logo based on language
    const logoImg = document.querySelector('.hero-logo');
    const logoSource = document.querySelector('.hero-overlay picture source');
    if (logoImg && logoSource) {
        const cacheBust = "?v=20260512162428";
        if (lang === 'en') {
            logoImg.src = "assets/images/logoEN.png" + cacheBust;
            logoSource.srcset = "assets/images/logoEN.webp" + cacheBust;
        } else {
            logoImg.src = "assets/images/logo.png" + cacheBust;
            logoSource.srcset = "assets/images/logo.webp" + cacheBust;
        }
    }
});
