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
        "hero.release_text": "2026年5月 Steam&reg;にて配信予定",
        "hero.wishlist_text": "Coming May 2026 to Steam",
        "intro.text": "挑むたびに強くなる快感。画面を埋め尽くす敵を一掃する爽快感。<br>インクリメンタル×トレハン×ローグライトアクション<br>『リミットレスサバイバーズ』、始動。",
        "feature.growth.title": "最弱から始まる、圧倒的成長体験",
        "feature.growth.desc": "初回プレイの生存時間はわずか20秒。<br>コツコツと積み上げた強さで、かつて手も足も出なかった強敵を相手に「無双」の快感を味わおう！",
        "feature.strategy.title": "戦略を構築する「武器×スキル」",
        "feature.strategy.desc": "手にする武器でスキルが決まる。<br>レベルアップで獲得する最大5つのスキルをどう組み合わせるかはあなた次第。自分だけの最強ビルドを作り上げよう！",
        "feature.drop.title": "運命を狂わせる「ドロップアイテム」",
        "feature.drop.desc": "たった1つで戦況が一変？<br>宝箱から溢れ出すのは、攻撃速度、貫通、範囲拡大などの強力な効果。<br>さらに「ランダムオプション」により、同じアイテムでも性能は千差万別。<br>究極のアイテムを引き当てた時、あなたの攻撃は「兵器」へと変貌する...",
        "upgrade.title": "永続強化",
        "upgrade.subtitle": "永続強化で限界を突破せよ",
        "upgrade.status.title": "ステータス強化",
        "upgrade.status.desc": "集めた素材でステータスを底上げ。<br>一歩ずつ、もっと遠くへ。",
        "upgrade.artifact.title": "アーティファクト",
        "upgrade.artifact.desc": "持ち帰ったアーティファクトがキャラクターを強化する。<br>集めれば集めるほど無限に強くなる！？",
        "reincarnation.title": "転生",
        "reincarnation.subtitle": "終わりなき挑戦と「転生」",
        "reincarnation.desc": "準備が整ったら、いざ「転生」へ！<br>一部の成果を引き継いで新しく始めることで、成長スピードはこれまで以上にスピーディーに。",
        "community.title": "コミュニティ",
        "community.desc": "最新情報は公式Xアカウントでチェック",
        "community.follow_x": "Follow on X"
    },
    en: {
        "hero.catchphrase": "Descend into the Abyss. Face the Endless Challenge.",
        "hero.release_text": "Coming May 2026 to Steam",
        "hero.wishlist_text": "Add to your Wishlist",
        "intro.text": "The rush of growing stronger with every run.<br>The thrill of wiping out screens full of enemies.<br>Incremental × Hack & Slash × Roguelite Action<br>LIMITLESS SURVIVORS — Out Now.",
        "feature.growth.title": "Start Weak, Grow Infinite",
        "feature.growth.desc": "Your first run might end in just 20 seconds.<br>But with steady upgrades, you'll soon experience the thrill of mowing down enemies that once seemed invincible!",
        "feature.strategy.title": "Strategy Built Through 'Weapon × Skill'",
        "feature.strategy.desc": "Your weapon dictates your skills.<br>With up to 5 skill slots to fill as you level up, the combinations are endless.<br>Craft your ultimate build and dominate!",
        "feature.drop.title": "Twist Fate with 'Drop Items'",
        "feature.drop.desc": "A single item can change the tide.<br>Treasure chests overflow with effects like Attack Speed, Pierce, and Area Expansion.<br>With 'Random Options', no two items are alike.<br>When you find the ultimate item, your attack transforms into a weapon of mass destruction...",
        "upgrade.title": "Permanent Upgrades",
        "upgrade.subtitle": "Break Limits with Permanent Upgrades",
        "upgrade.status.title": "Status Upgrades",
        "upgrade.status.desc": "Boost your base stats with collected materials.<br>Step by step, go further.",
        "upgrade.artifact.title": "Artifacts",
        "upgrade.artifact.desc": "Collected artifacts strengthen your character.<br>The more you collect, the stronger you become!?",
        "reincarnation.title": "Reincarnation",
        "reincarnation.subtitle": "Endless Challenge and 'Reincarnation'",
        "reincarnation.desc": "When you're ready, it's time for 'Reincarnation'!<br>By restarting with some achievements carried over, your growth speed becomes faster than ever.",
        "community.title": "Community",
        "community.desc": "Check the latest info on our official X account",
        "community.follow_x": "Follow on X"
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
});
