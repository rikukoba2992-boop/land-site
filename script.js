(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isFinePointer = !isTouch;

    /* ---------------------------------------------------------
       CHARACTER-MASK HEADINGS
       Wraps each character of .mask-heading elements in
       <span class="char"><i>X</i></span> so CSS can reveal
       them as a staggered mask animation.
    --------------------------------------------------------- */
    function wrapChars(node, counter){
        // snapshot first: replaceChild() below mutates childNodes in place,
        // and a live NodeList would then skip/re-visit nodes mid-iteration
        Array.from(node.childNodes).forEach(child => {
            if(child.nodeType === Node.TEXT_NODE){
                const frag = document.createDocumentFragment();
                [...child.textContent].forEach(ch => {
                    const span = document.createElement("span");
                    span.className = "char";
                    const i = document.createElement("i");
                    i.textContent = ch === " " ? " " : ch;
                    span.appendChild(i);
                    span.style.transitionDelay = `${Math.min(counter.n * 18, 700)}ms`;
                    i.style.transitionDelay = `${Math.min(counter.n * 18, 700)}ms`;
                    counter.n++;
                    frag.appendChild(span);
                });
                node.replaceChild(frag, child);
            }else if(child.nodeType === Node.ELEMENT_NODE){
                wrapChars(child, counter);
            }
        });
    }

    const maskHeadings = document.querySelectorAll(".mask-heading");
    maskHeadings.forEach(el => wrapChars(el, { n: 0 }));

    /* ---------------------------------------------------------
       OPENING
    --------------------------------------------------------- */
    const opening = document.getElementById("opening");
    const skipIntro = document.getElementById("skipIntro");
    const main = document.getElementById("main");
    const hero = document.getElementById("hero");

    let introDone = false;

    function enterSite(){
        if(introDone) return;
        introDone = true;

        opening.classList.add("is-hidden");
        main.classList.add("is-visible");
        main.removeAttribute("aria-hidden");

        if(!reduceMotion){
            hero.classList.add("is-igniting");
        }
    }

    const introTimer = setTimeout(enterSite, reduceMotion ? 400 : 1700);

    skipIntro.addEventListener("click", () => {
        clearTimeout(introTimer);
        enterSite();
    });

    /* ---------------------------------------------------------
       CLOCK (HUD)
    --------------------------------------------------------- */
    const hudClock = document.getElementById("hudClock");

    function tickClock(){
        const now = new Date();
        const pad = n => String(n).padStart(2, "0");
        hudClock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    tickClock();
    setInterval(tickClock, 1000);

    /* ---------------------------------------------------------
       SCROLL PROGRESS
    --------------------------------------------------------- */
    const progressBar = document.getElementById("progressBar");

    function updateProgress(){
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${pct}%`;
    }

    /* ---------------------------------------------------------
       CUSTOM CURSOR — state changes over LAND / RIKU / clickables
    --------------------------------------------------------- */
    const cursor = document.getElementById("cursor");
    const cursorText = document.getElementById("cursorText");

    if(isFinePointer){
        let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        let tx = cx, ty = cy;

        window.addEventListener("mousemove", (e) => {
            tx = e.clientX;
            ty = e.clientY;
        });

        function animateCursor(){
            cx += (tx - cx) * .18;
            cy += (ty - cy) * .18;
            cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        function setCursorState(el){
            cursor.classList.remove("is-active", "is-land", "is-riku");
            cursorText.textContent = "";

            if(!el){ return; }

            const landWork = el.closest(".work--land");
            const rikuWork = el.closest(".work--riku");
            const clickable = el.closest("[data-cursor-text]");

            if(landWork){
                cursor.classList.add("is-land");
            }else if(rikuWork){
                cursor.classList.add("is-riku");
            }else if(clickable){
                cursor.classList.add("is-active");
            }

            // nearest data-cursor-text wins the label (e.g. a YouTube
            // link inside a work overrides the work's own "VIEW")
            if(clickable){
                cursorText.textContent = clickable.dataset.cursorText || "ENTER";
            }
        }

        document.addEventListener("mouseover", (e) => setCursorState(e.target));
        document.addEventListener("mouseout", (e) => {
            if(!e.relatedTarget){ setCursorState(null); }
        });
    }

    /* ---------------------------------------------------------
       HERO — projector parallax + LAND letter dispersal
    --------------------------------------------------------- */
    const heroVisual = document.getElementById("heroVisual");
    const heroTitle = document.getElementById("heroTitle");
    const heroLetters = heroTitle ? [...heroTitle.querySelectorAll("span[data-dir]")] : [];
    let mouseX = 0, mouseY = 0;

    const letterVectors = {
        left:  { x: -1, y: 0 },
        up:    { x: 0,  y: -1 },
        down:  { x: 0,  y: 1 },
        right: { x: 1,  y: 0 }
    };

    if(!reduceMotion){
        if(isFinePointer){
            window.addEventListener("mousemove", (e) => {
                mouseX = (e.clientX / window.innerWidth - .5) * 2;
                mouseY = (e.clientY / window.innerHeight - .5) * 2;
            });
        }

        let heroActive = true;

        function applyParallax(){
            const heroRect = hero.getBoundingClientRect();
            const heroHeight = heroRect.height || window.innerHeight;
            // 0 at top of hero, 1 once fully scrolled past
            const raw = -heroRect.top / heroHeight;
            const scrollProgress = Math.max(0, Math.min(1, raw));

            // release will-change once the hero is fully out of frame
            const heroInFrame = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
            if(heroInFrame !== heroActive){
                heroActive = heroInFrame;
                const mode = heroActive ? "transform" : "auto";
                if(heroVisual) heroVisual.style.willChange = mode;
                if(heroTitle) heroTitle.style.willChange = mode;
            }

            if(heroVisual){
                const mx = isFinePointer ? mouseX * 12 : 0;
                const my = isFinePointer ? mouseY * 12 : 0;
                const depthShift = scrollProgress * 90;
                heroVisual.style.transform = `translate(${mx}px, ${my + depthShift}px) scale(1.02)`;
            }

            if(heroTitle){
                const mx = isFinePointer ? mouseX * -6 : 0;
                heroTitle.style.transform = `translate(${mx}px, ${-scrollProgress * 40}px)`;
            }

            // letters disperse only after the reader has had a moment (progress > .12)
            const dispersal = Math.max(0, (scrollProgress - .12) / .68);
            const eased = Math.min(1, dispersal);

            heroLetters.forEach(span => {
                const dir = letterVectors[span.dataset.dir] || { x: 0, y: 0 };
                const distance = eased * 220;
                const tx = dir.x * distance;
                const ty = dir.y * distance;
                const spacing = eased * 10;
                const opacity = 1 - eased * .85;
                span.style.transform = `translate(${tx}px, ${ty}px)`;
                span.style.opacity = opacity;
                span.style.letterSpacing = `${spacing}px`;
            });
        }

        function loop(){
            applyParallax();
            updateProgress();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }else{
        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();
    }

    /* ---------------------------------------------------------
       GENERIC REVEAL ON SCROLL (.reveal, .mask-heading, .about)
    --------------------------------------------------------- */
    const genericTargets = document.querySelectorAll(".reveal, .mask-heading, .about");

    if("IntersectionObserver" in window){
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("is-in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });

        genericTargets.forEach(el => io.observe(el));
    }else{
        genericTargets.forEach(el => el.classList.add("is-in"));
    }

    /* ---------------------------------------------------------
       LAND WORKS — fast collage entrance + one-shot glitch
    --------------------------------------------------------- */
    const landWorks = document.querySelectorAll(".work--land");

    if("IntersectionObserver" in window){
        const landIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("is-in");
                    landIO.unobserve(entry.target);
                }
            });
        }, { threshold: .3 });

        landWorks.forEach(el => landIO.observe(el));
    }else{
        landWorks.forEach(el => el.classList.add("is-in"));
    }

    landWorks.forEach(el => {
        let glitchTimer = null;
        el.addEventListener("mouseenter", () => {
            if(reduceMotion) return;
            el.classList.remove("is-glitching");
            // force reflow so the animation can retrigger
            void el.offsetWidth;
            el.classList.add("is-glitching");
            clearTimeout(glitchTimer);
            glitchTimer = setTimeout(() => el.classList.remove("is-glitching"), 400);
        });
    });

    /* ---------------------------------------------------------
       RIKU WORKS — slow spatial reveal + scale/brightness by ratio
    --------------------------------------------------------- */
    const rikuWorks = document.querySelectorAll(".work--riku");

    if("IntersectionObserver" in window){
        const rikuEnterIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("is-in");
                    rikuEnterIO.unobserve(entry.target);
                }
            });
        }, { threshold: .25 });

        rikuWorks.forEach(el => rikuEnterIO.observe(el));

        if(!reduceMotion){
            const steps = Array.from({ length: 21 }, (_, i) => i / 20);
            const rikuProgressIO = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    entry.target.style.setProperty("--p", entry.intersectionRatio.toFixed(3));
                });
            }, { threshold: steps });

            rikuWorks.forEach(el => rikuProgressIO.observe(el.querySelector(".work__media") || el));
        }else{
            rikuWorks.forEach(el => {
                const media = el.querySelector(".work__media");
                if(media) media.style.setProperty("--p", 1);
            });
        }
    }else{
        rikuWorks.forEach(el => {
            el.classList.add("is-in");
            const media = el.querySelector(".work__media");
            if(media) media.style.setProperty("--p", 1);
        });
    }

    /* ---------------------------------------------------------
       YOUTUBE WORKS — thumbnail facade links straight out to
       youtu.be in a new tab (no in-page iframe/autoplay, since
       embedded playback is unreliable on filtered networks).
    --------------------------------------------------------- */

    /* ---------------------------------------------------------
       PRACTICE ENTRY TRANSITIONS
       LAND    -> color panels sweep + meet + open
       RIKU    -> dim + vertical light beam
    --------------------------------------------------------- */
    const overlay = document.getElementById("practiceTransition");

    document.querySelectorAll(".practice[data-target]").forEach(el => {
        el.addEventListener("click", (e) => {
            const target = document.getElementById(el.dataset.target);
            if(!target) return;
            e.preventDefault();

            if(reduceMotion){
                target.scrollIntoView({ behavior: "auto" });
                return;
            }

            const kind = el.dataset.transition === "riku" ? "is-riku" : "is-land";
            overlay.className = "practice-transition " + kind;

            requestAnimationFrame(() => {
                overlay.classList.add("is-cover");
            });

            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth" });
                overlay.classList.add("is-open");
            }, kind === "is-land" ? 420 : 650);

            setTimeout(() => {
                overlay.className = "practice-transition";
            }, kind === "is-land" ? 950 : 1400);
        });
    });

})();
