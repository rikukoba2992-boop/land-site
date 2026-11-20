/* =============================================================
   KOBAYASHI RIKU × LAND — works.js
   Renders window.WORKS into every [data-works="<identity>"] container.
   Layout keys (art-book plates):
     bleed      A  FULL BLEED          one image edge to edge
     editorial  B  EDITORIAL           image + text column, offset plates
     gallery    C  ARTWORK GALLERY     a single artwork shown whole on a mat
     artwork    C  ARTWORK GALLERY     consecutive artworks grouped as a set → lightbox
     sequence   D  CINEMATIC SEQUENCE  scope frame + film strip
     vertical      portrait film (9:16) + text + portrait strip
     film          still with PLAY → plays the local film in-site
   Every second use of a layout inside one identity is mirrored automatically.
   ============================================================= */
(() => {
    "use strict";

    const WORKS = window.WORKS || [];

    /* unverified credits are hidden unless the page is opened with ?dev */
    const showUnverified = new URLSearchParams(location.search).has("dev");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const useLoops = !reduceMotion && !saveData;

    const CTA = {
        youtube: { text: "WATCH FILM", ext: true },
        site:    { text: "VISIT SITE", ext: true },
        artwork: { text: "VIEW ARTWORK", ext: false },
        video:   { text: "PLAY FILM", ext: false }
    };

    /* sizes hints per role (desktop grid ≥ 900px is 12 columns) */
    const SIZES = {
        bleed:     "100vw",
        sequence:  "(min-width: 900px) 92vw, 100vw",
        editorial: "(min-width: 900px) 62vw, 100vw",
        gallery:   "(min-width: 900px) 46vw, 100vw",
        film:      "(min-width: 900px) 62vw, 100vw",
        vertical:  "(min-width: 900px) 30vw, 80vw",
        artwork:   "(min-width: 900px) 30vw, 84vw",
        plate:     "(min-width: 900px) 42vw, 92vw",
        strip:     "(min-width: 900px) 30vw, 78vw",
        portrait:  "(min-width: 900px) 16vw, 40vw"
    };

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
    const pad = n => String(n).padStart(2, "0");
    const byId = Object.fromEntries(WORKS.map(w => [w.id, w]));

    /* file sizes are named by width, or by long edge when im.edge === "long" */
    function pxWidth(im, size){
        return im.edge === "long" && im.h > im.w ? Math.round(size * im.w / im.h) : size;
    }

    function picture(im, sizes, eager){
        if(!im || !im.base) return "";
        const set = ext => im.widths.map(s => `./${im.base}-${s}.${ext} ${pxWidth(im, s)}w`).join(", ");
        const fallback = `./${im.base}-${im.widths[0]}.webp`;
        const style = ` style="--ar:${im.w} / ${im.h}${im.pos ? `;object-position:${esc(im.pos)}` : ""}"`;
        return `<picture>
            <source type="image/avif" srcset="${set("avif")}" sizes="${sizes}">
            <source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">
            <img src="${fallback}" width="${im.w}" height="${im.h}" alt="${esc(im.alt)}"
                 ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${style}>
        </picture>`;
    }

    function credits(work){
        const list = (work.credits || []).filter(c => c.verified || showUnverified);
        if(!list.length) return "";
        return `<ul class="work__credits">${list.map(c => `
            <li${c.verified ? "" : ' class="is-unverified"'}>
                <span class="work__credit-label">${esc(c.label)}</span>
                <span class="work__credit-name">${esc(c.name)}</span>
                ${c.verified ? "" : '<span class="work__flag">UNCONFIRMED</span>'}
            </li>`).join("")}
        </ul>`;
    }

    function meta(work){
        const bits = [work.category, work.year, work.duration].filter(Boolean);
        return bits.length ? `<p class="work__meta">${bits.map(esc).join('<span aria-hidden="true"> / </span>')}</p>` : "";
    }

    function cta(work){
        const c = CTA[work.linkType];
        if(!c) return "";
        if(c.ext && work.externalUrl){
            return `<a class="work__cta" href="${esc(work.externalUrl)}" target="_blank" rel="noopener">
                ${c.text}<span class="work__arrow" aria-hidden="true"> ↗</span>
                <span class="u-visually-hidden">: ${esc(work.title)} (opens in a new tab)</span></a>`;
        }
        return `<button class="work__cta" type="button" data-open="${esc(work.id)}" aria-haspopup="dialog">
                ${c.text}<span class="u-visually-hidden">: ${esc(work.title)}</span></button>`;
    }

    /* silent loop layered over the still; src is attached only when it scrolls into view */
    function loopVideo(work){
        if(!useLoops || !work.loop) return "";
        return `<video class="work__loop" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"
            data-src-desktop="./${work.loop}-1280.mp4" data-src-mobile="./${work.loop}-720.mp4"></video>`;
    }

    /* the hero doubles as a pointer target for the work's action; it is hidden
       from AT / tab order so each work exposes exactly one accessible control */
    function hero(work, sizes){
        const c = CTA[work.linkType];
        const inner = picture(work.mainImage, sizes) + loopVideo(work);
        if(c && c.ext && work.externalUrl){
            return `<a class="work__hero" href="${esc(work.externalUrl)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${inner}
                <span class="work__hover" aria-hidden="true">${c.text} ↗</span></a>`;
        }
        if(c && !c.ext){
            const play = work.linkType === "video"
                ? `<span class="work__play" aria-hidden="true"><span class="work__play-icon"></span>${c.text}</span>` : "";
            return `<div class="work__hero is-button" data-open="${esc(work.id)}" aria-hidden="true">${inner}${play}
                <span class="work__hover" aria-hidden="true">${c.text}</span></div>`;
        }
        return `<div class="work__hero">${inner}</div>`;
    }

    function text(work, n, total){
        return `<div class="work__text">
            <p class="work__index"><span>${pad(n)}</span><span class="work__of"> / ${pad(total)}</span></p>
            <div class="work__heading">
                <h3 class="work__title">${esc(work.title)}</h3>
                ${work.subtitle ? `<p class="work__subtitle">${esc(work.subtitle)}</p>` : ""}
                ${meta(work)}
            </div>
            <div class="work__side">
                ${work.description ? `<p class="work__desc">${esc(work.description)}</p>` : ""}
                ${credits(work)}
                ${cta(work)}
            </div>
        </div>`;
    }

    function plates(work, layout){
        const g = work.galleryImages || [];
        if(!g.length) return "";
        if(layout === "sequence"){
            return `<div class="work__strip" tabindex="0" role="group" aria-label="Frames from ${esc(work.title)}">
                ${g.map(im => `<figure class="work__frame" data-parallax>${picture(im, SIZES.strip)}</figure>`).join("")}
            </div>`;
        }
        if(layout === "vertical"){
            return `<div class="work__portraits">
                ${g.map(im => `<figure class="work__plate work__portrait" data-parallax>${picture(im, SIZES.portrait)}</figure>`).join("")}
            </div>`;
        }
        return `<div class="work__plates">
            ${g.map((im, i) => `<figure class="work__plate work__plate--${i + 1}${im.w === im.h ? " is-square" : ""}"${i ? " data-parallax" : ""}>${picture(im, SIZES.plate)}</figure>`).join("")}
        </div>`;
    }

    function article(work, n, total, mirror){
        const layout = work.layout || "editorial";
        return `<article class="work work--${layout}${mirror ? " work--mirror" : ""}" id="work-${esc(work.id)}">
            ${hero(work, SIZES[layout] || SIZES.editorial)}
            ${text(work, n, total)}
            ${plates(work, layout)}
        </article>`;
    }

    /* consecutive "artwork" works share one plate: a set of covers */
    function artworkSet(list, startN, total){
        return `<div class="artworks">
            ${list.map((work, i) => `
            <article class="work work--artwork" id="work-${esc(work.id)}">
                ${hero(work, SIZES.artwork)}
                <div class="work__text">
                    <p class="work__index"><span>${pad(startN + i)}</span><span class="work__of"> / ${pad(total)}</span></p>
                    <h3 class="work__title">${esc(work.title)}</h3>
                    ${meta(work)}
                    ${credits(work)}
                    ${cta(work)}
                </div>
            </article>`).join("")}
        </div>`;
    }

    function render(container){
        const identity = container.dataset.works;
        const list = WORKS
            .filter(w => w.identity === identity)
            .sort((a, b) => a.displayOrder - b.displayOrder);
        const seen = {};
        const out = [];
        for(let i = 0; i < list.length; i++){
            const w = list[i];
            if(w.layout === "artwork"){
                const group = [];
                while(i < list.length && list[i].layout === "artwork") group.push(list[i++]);
                i--;
                out.push(artworkSet(group, i - group.length + 2, list.length));
                continue;
            }
            const k = w.layout || "editorial";
            seen[k] = (seen[k] || 0) + 1;
            out.push(article(w, i + 1, list.length, seen[k] % 2 === 0));
        }
        container.innerHTML = out.join("");
    }

    document.querySelectorAll("[data-works]").forEach(render);

    /* deep links to a rendered work (e.g. /#work-own-color): the browser tried
       to scroll before the element existed, so do it now */
    if(location.hash.startsWith("#work-")){
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if(target) target.scrollIntoView({ block: "start", behavior: "instant" });
    }

    /* -----------------------------------------------------------
       VIEWER — artworks (lightbox) and local films, in a modal <dialog>
    ----------------------------------------------------------- */
    const viewer = document.getElementById("viewer");
    const vStage = viewer && viewer.querySelector(".viewer__stage");
    const vTitle = viewer && viewer.querySelector(".viewer__title");
    const vCount = viewer && viewer.querySelector(".viewer__count");
    let vItems = [], vIndex = 0;

    function showItem(){
        const im = vItems[vIndex];
        const big = im.widths[im.widths.length - 1];
        vStage.innerHTML = `<picture>
            <source type="image/avif" srcset="./${im.base}-${big}.avif">
            <img src="./${im.base}-${big}.webp" width="${im.w}" height="${im.h}" alt="${esc(im.alt)}" decoding="async">
        </picture>`;
        vCount.textContent = vItems.length > 1 ? `${vIndex + 1} / ${vItems.length}` : "";
        viewer.classList.toggle("is-single", vItems.length < 2);
    }

    function openViewer(work){
        if(!viewer || typeof viewer.showModal !== "function"){
            // no <dialog> support: fall back to the raw file
            if(work.linkType === "video") location.href = `./${work.videoFile}`;
            else location.href = `./${work.mainImage.base}-${work.mainImage.widths.slice(-1)[0]}.webp`;
            return;
        }
        vTitle.textContent = work.title;
        if(work.linkType === "video"){
            vItems = [];
            viewer.classList.add("is-film", "is-single");
            vCount.textContent = "";
            vStage.innerHTML = `<video class="viewer__film" src="./${esc(work.videoFile)}" controls playsinline autoplay
                ${work.mainImage ? `poster="./${work.mainImage.base}-${work.mainImage.widths.slice(-1)[0]}.webp"` : ""}></video>`;
        }else{
            viewer.classList.remove("is-film");
            vItems = [work.mainImage, ...(work.galleryImages || [])].filter(Boolean);
            vIndex = 0;
            showItem();
        }
        document.documentElement.classList.add("has-viewer");
        viewer.showModal();
    }

    function step(d){
        if(vItems.length < 2) return;
        vIndex = (vIndex + d + vItems.length) % vItems.length;
        showItem();
    }

    if(viewer){
        document.addEventListener("click", e => {
            const opener = e.target.closest("[data-open]");
            if(opener && byId[opener.dataset.open]){
                e.preventDefault();
                openViewer(byId[opener.dataset.open]);
            }
        });
        viewer.addEventListener("click", e => {
            if(e.target.closest("[data-viewer-close]") || e.target === viewer || e.target === vStage) viewer.close();
            const s = e.target.closest("[data-viewer-step]");
            if(s) step(Number(s.dataset.viewerStep));
        });
        viewer.addEventListener("keydown", e => {
            if(e.key === "ArrowRight") step(1);
            if(e.key === "ArrowLeft") step(-1);
        });
        viewer.addEventListener("close", () => {
            if(viewer.open) return;   // re-opened before this queued event ran
            const film = vStage.querySelector("video");
            if(film){ film.pause(); film.removeAttribute("src"); film.load(); }
            vStage.innerHTML = "";
            document.documentElement.classList.remove("has-viewer");
        });
    }

    if(reduceMotion || !("IntersectionObserver" in window)){
        return;   // everything simply visible, stills only
    }

    /* -----------------------------------------------------------
       LOOPS — play only while at least ~35% visible
    ----------------------------------------------------------- */
    const small = window.matchMedia("(max-width: 900px)").matches;
    const loopIO = new IntersectionObserver(entries => {
        entries.forEach(({ target: v, isIntersecting }) => {
            if(isIntersecting){
                if(!v.src) v.src = small ? v.dataset.srcMobile : v.dataset.srcDesktop;
                const p = v.play();
                if(p && p.catch) p.catch(() => {});   // autoplay refused → the still stays
            }else if(!v.paused){
                v.pause();
            }
        });
    }, { threshold: 0.35 });
    document.querySelectorAll(".work__loop").forEach(v => {
        v.addEventListener("playing", () => v.classList.add("is-playing"), { once: true });
        loopIO.observe(v);
    });
    document.addEventListener("visibilitychange", () => {
        if(document.hidden) document.querySelectorAll(".work__loop").forEach(v => v.pause());
    });

    /* -----------------------------------------------------------
       PARALLAX — secondary plates drift slightly against the scroll
       (desktop only; written to the independent `translate` property)
    ----------------------------------------------------------- */
    const drift = [...document.querySelectorAll("[data-parallax]")];
    const wide = window.matchMedia("(min-width: 900px)");
    let pTick = false;
    function parallax(){
        pTick = false;
        const vh = window.innerHeight;
        drift.forEach((el, i) => {
            if(!wide.matches){ el.style.removeProperty("--py"); return; }
            const r = el.getBoundingClientRect();
            if(r.bottom < -200 || r.top > vh + 200) return;
            const centre = (r.top + r.height / 2 - vh / 2) / vh;   // −1 … 1 around the viewport
            const k = 36 + (i % 3) * 18;                            // px of travel
            el.style.setProperty("--py", `${(centre * -k).toFixed(1)}px`);
        });
    }
    const requestParallax = () => { if(!pTick){ pTick = true; requestAnimationFrame(parallax); } };
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    parallax();

    /* -----------------------------------------------------------
       REVEAL — heroes open like a curtain, the rest fades / rises
    ----------------------------------------------------------- */
    const targets = document.querySelectorAll(".work__hero, .work__text, .work__plate, .work__frame, .profile");
    document.documentElement.classList.add("has-reveal");
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting){
                e.target.classList.add("is-in");
                io.unobserve(e.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(t => io.observe(t));
})();
