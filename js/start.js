/* =============================================================
   KOBAYASHI RIKU × LAND — start.js
   Entry order. The HTML is written KOBAYASHI RIKU first; the inline
   script in <head> sets html[data-start]:
     "riku"  /?start=riku   showreel → white → RIKU … → black → LAND …
     "land"  / (default)    showreel → black → LAND … → white → RIKU …
   For "land" this file reorders the sections and swaps the identity
   (logo + folio) and anchors between the intro and the passage.
   Runs before works.js / main.js (all deferred, in order).
   ============================================================= */
(() => {
    "use strict";
    if(document.documentElement.dataset.start !== "land") return;

    const $ = id => document.getElementById(id);
    const main = document.querySelector("main");
    const intro = $("top");
    const passage = $("landPassage");
    const order = [intro, $("land-works"), $("about-land"), passage, $("riku-works"), $("about"), $("contact")];
    if(order.some(el => !el)) return;

    // 1. section order
    order.forEach(el => main.appendChild(el));

    // 2. the intro writes LAND, the passage writes KOBAYASHI RIKU
    const iStage = intro.querySelector(".intro__stage");
    const pStage = passage.querySelector(".passage__stage");
    const rikuIdentity = iStage.querySelector(".identity--riku");
    const rikuFolio = iStage.querySelector(".folio--riku");
    const landIdentity = pStage.querySelector(".identity--land");
    const landFolio = pStage.querySelector(".folio--land");
    iStage.append(landIdentity, landFolio);
    pStage.append(rikuIdentity, rikuFolio);
    landIdentity.querySelector("img").loading = "eager";
    rikuIdentity.querySelector("img").loading = "lazy";
    intro.setAttribute("aria-label", "Showreel and LAND");
    passage.setAttribute("aria-label", "KOBAYASHI RIKU");

    // 3. anchors follow their logos (#land in the intro, #riku in the passage)
    const introAnchor = intro.querySelector(".intro__anchor");
    const passageAnchor = passage.querySelector(".passage__anchor");
    passageAnchor.id = "riku";
    introAnchor.id = "land";

    // 4. LAND is world 01 here, KOBAYASHI RIKU world 02
    document.querySelectorAll(".folio span, .profile__label span").forEach(s => {
        s.textContent = s.textContent.replace("BLACK — 02", "BLACK — 01").replace("WHITE — 01", "WHITE — 02");
    });

    // 5. navigation follows the page order
    const nav = document.querySelector(".site-nav");
    const navRiku = nav.querySelector('[data-nav="riku"]');
    const navLand = nav.querySelector('[data-nav="land"]');
    nav.insertBefore(navLand, navRiku);
    nav.querySelector('[data-nav="about"]').setAttribute("href", "#about-land");
    const skip = document.querySelector(".skip-link");
    if(skip) skip.setAttribute("href", "#land-works");

    // 6. a fragment in the URL was resolved against the old order: resolve it again
    //    (#work-… links are handled by works.js after the works are rendered)
    if(location.hash && !location.hash.startsWith("#work-")){
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if(target) target.scrollIntoView({ block: "start", behavior: "instant" });
    }
})();
