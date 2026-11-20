/* =============================================================
   KOBAYASHI RIKU × LAND — main.js
   No dependencies. Scroll-linked values are written as CSS custom
   properties; all visual styling lives in css/main.css.
   ============================================================= */
(() => {
    "use strict";

    /* -----------------------------------------------------------
       SETTINGS — tweak timings here
       Phase ranges are fractions of the intro scroll distance
       (0 = page top, 1 = sticky stage released).
    ----------------------------------------------------------- */
    const SITE = {
        intro: {
            reelOut: [0.02, 0.40],   // showreel fades into white
            logoIn:  [0.36, 0.74],   // brush logo written top → bottom
            metaIn:  [0.66, 0.86]    // CG / FILM / INSTALLATION + folio
        },
        // white → black passage. 0 = passage top enters the viewport bottom,
        // 1 = sticky stage released. Black starts rising the moment the white content ends.
        passage: {
            rise:    [0.00, 0.45],   // black rises from the bottom of the viewport
            logoIn:  [0.50, 0.80],   // LAND logo written top → bottom (stage pinned)
            metaIn:  [0.74, 0.90]    // GENERATIVE AI / FILM / VISUAL ART + folio
        },
        // ≤ this width (or Save-Data) streams the 720p reel
        mobileReelMaxWidth: 900
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const $ = (sel, root = document) => root.querySelector(sel);
    const clamp01 = v => Math.min(1, Math.max(0, v));
    const range = (p, [a, b]) => clamp01((p - a) / (b - a));
    const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const easeInOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;

    const header = $("#siteHeader");
    const intro = $(".intro");
    const passage = $(".passage");
    const reel = $("#reel");
    const video = $("#reelVideo");
    const toggle = $("#reelToggle");
    const toggleText = toggle ? $(".reel__toggle-text", toggle) : null;
    const navLinks = [...document.querySelectorAll(".site-nav a")];

    // entry order (see js/start.js): which identity the intro writes, which the passage writes
    const landFirst = document.documentElement.dataset.start === "land";
    const introKey = landFirst ? "land" : "riku";
    const passageKey = landFirst ? "riku" : "land";
    const toneSections = [...document.querySelectorAll("[data-tone]:not(.site-header)")];
    const landmarks = [...document.querySelectorAll("#about, #about-land, .passage, #contact")];   // document order

    /* -----------------------------------------------------------
       SHOWREEL — source selection + playback control
    ----------------------------------------------------------- */
    let userPaused = reduceMotion;   // reduced motion: start on the poster
    let reelVisible = true;

    function pickReelSource(){
        const saveData = navigator.connection && navigator.connection.saveData;
        const small = window.matchMedia(`(max-width: ${SITE.mobileReelMaxWidth}px)`).matches;
        return (saveData || small) ? video.dataset.srcMobile : video.dataset.srcDesktop;
    }

    function setToggleUI(){
        if(!toggle) return;
        const paused = video.paused;
        toggleText.textContent = paused ? "PLAY" : "PAUSE";
        toggle.setAttribute("aria-label", paused ? "Play showreel" : "Pause showreel");
        toggle.setAttribute("aria-pressed", String(paused));
    }

    function tryPlay(){
        if(userPaused || !reelVisible || document.hidden) return;
        const p = video.play();
        if(p && p.catch){
            // autoplay blocked (e.g. Low Power Mode) → poster stays, button offers PLAY
            p.catch(() => setToggleUI());
        }
    }

    if(video){
        if(reduceMotion){
            video.removeAttribute("autoplay");
        }
        video.src = pickReelSource();
        video.addEventListener("play", setToggleUI);
        video.addEventListener("pause", setToggleUI);
        tryPlay();
        setToggleUI();

        toggle && toggle.addEventListener("click", () => {
            if(video.paused){
                userPaused = false;
                tryPlay();
            }else{
                userPaused = true;
                video.pause();
            }
        });

        document.addEventListener("visibilitychange", () => {
            if(document.hidden){ video.pause(); }
            else{ tryPlay(); }
        });
    }

    /* -----------------------------------------------------------
       INTRO — scroll-linked phases
    ----------------------------------------------------------- */
    function trackProgress(el){
        const rect = el.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        return distance > 0 ? clamp01(-rect.top / distance) : 0;
    }
    const introProgress = () => trackProgress(intro);

    let lastReelA = -1;

    function renderIntro(){
        const p = introProgress();
        const cfg = SITE.intro;

        let reelA, logoIn, metaA;
        if(reduceMotion){
            // no write-on / drift; plain cross-fades still follow the scroll
            reelA  = 1 - range(p, cfg.reelOut);
            logoIn = range(p, cfg.logoIn);
            metaA  = range(p, cfg.metaIn);
        }else{
            reelA  = 1 - easeInOutCubic(range(p, cfg.reelOut));
            logoIn = easeInOutSine(range(p, cfg.logoIn));
            metaA  = easeOutQuart(range(p, cfg.metaIn));
        }

        intro.style.setProperty("--reel-a", reelA.toFixed(4));
        intro.style.setProperty("--logo-in", logoIn.toFixed(4));
        intro.style.setProperty("--meta-a", metaA.toFixed(4));

        // stop decoding the reel once it has fully dissolved
        if((reelA <= .001) !== (lastReelA <= .001)){
            const gone = reelA <= .001;
            reel.classList.toggle("is-gone", gone);
            reelVisible = !gone;
            if(video){
                if(gone){ video.pause(); }
                else{ tryPlay(); }
            }
        }
        lastReelA = reelA;
        return reelA;
    }

    /* -----------------------------------------------------------
       PASSAGE — world change between the two identities
       (white → black → LAND, or black → white → RIKU when LAND comes first)
    ----------------------------------------------------------- */
    let lastRise = 0;
    let lastEdge = Infinity;     // viewport y of the black edge (px)
    function renderPassage(){
        if(!passage) return 0;
        const vh = window.innerHeight;
        const r = passage.getBoundingClientRect();
        if(r.bottom < -50 || r.top > vh + 50){            // off screen: hide the plane, skip writes
            if(lastEdge !== Infinity){
                passage.style.setProperty("--edge-top", `${vh}px`);
                lastEdge = Infinity;
            }
            return lastRise;
        }
        const p = clamp01((vh - r.top) / r.height);
        const cfg = SITE.passage;
        let rise, logoIn, metaA;
        if(reduceMotion){
            rise   = range(p, cfg.rise);
            logoIn = range(p, cfg.logoIn);
            metaA  = range(p, cfg.metaIn);
        }else{
            rise   = easeInOutCubic(range(p, cfg.rise));
            logoIn = easeInOutSine(range(p, cfg.logoIn));
            metaA  = easeOutQuart(range(p, cfg.metaIn));
        }
        // the black plane is fixed to the viewport: its top edge rises from the bottom,
        // its bottom edge follows the end of the passage (the LAND works are black anyway)
        const edgeTop = (1 - rise) * vh;
        const edgeBottom = Math.max(0, vh - r.bottom);
        passage.style.setProperty("--edge-top", `${edgeTop.toFixed(1)}px`);
        passage.style.setProperty("--edge-bottom", `${edgeBottom.toFixed(1)}px`);
        passage.style.setProperty("--logo-in", logoIn.toFixed(4));
        passage.style.setProperty("--meta-a", metaA.toFixed(4));
        lastRise = rise;
        lastEdge = edgeTop;
        return rise;
    }

    /* -----------------------------------------------------------
       HEADER TONE + ACTIVE NAV
    ----------------------------------------------------------- */
    function renderHeader(reelA, rise){
        const probeY = header.offsetHeight / 2;
        const introRect = intro.getBoundingClientRect();
        const passRect = passage ? passage.getBoundingClientRect() : null;
        let tone = "dark";
        let surface = "none";

        if(introRect.bottom > probeY){
            // the reel dissolves into white (RIKU first) or black (LAND first)
            tone = (landFirst || reelA > .5) ? "light" : "dark";
        }else if(passRect && passRect.top < window.innerHeight && passRect.bottom > probeY && lastEdge <= probeY){
            // the rising plane (black, or white when LAND comes first) has reached the header
            tone = landFirst ? "dark" : "light";
        }else{
            const hit = toneSections.find(s => {
                const r = s.getBoundingClientRect();
                return r.top <= probeY && r.bottom > probeY;
            });
            if(hit) tone = hit.dataset.tone;
            surface = tone === "dark" ? "paper" : "void";
        }
        if(header.dataset.tone !== tone) header.dataset.tone = tone;
        if(header.dataset.surface !== surface) header.dataset.surface = surface;

        // active nav item: last section whose top has passed the middle of the viewport
        const mid = window.innerHeight * .5;
        let current = "top";
        if(reelA <= .5) current = introKey;
        // walk the landmarks in document order (the order differs per entry, see start.js)
        for(const el of landmarks){
            if(el === passage){
                if((passRect.top < window.innerHeight && rise >= .5) || passRect.bottom <= mid) current = passageKey;
            }else if(el.getBoundingClientRect().top <= mid){
                current = el.id === "contact" ? "contact" : "about";
            }
        }
        navLinks.forEach(a => {
            const on = a.dataset.nav === current;
            if(on) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
        });
    }

    /* -----------------------------------------------------------
       LOOP — rAF-throttled scroll / resize
    ----------------------------------------------------------- */
    let ticking = false;
    function frame(){
        ticking = false;
        const reelA = renderIntro();
        const rise = renderPassage();
        renderHeader(reelA, rise);
    }
    function request(){
        if(!ticking){
            ticking = true;
            requestAnimationFrame(frame);
        }
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    frame();
})();
