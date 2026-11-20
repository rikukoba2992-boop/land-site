/* =============================================================
   WORKS DATA — KOBAYASHI RIKU × LAND
   -------------------------------------------------------------
   Edit this file to add / reorder / update works.
   Leave anything unconfirmed as "" or []. Never guess facts.

   FIELDS
   id             unique slug
   identity       "riku" | "land"
   displayOrder   order inside its identity (1 = first)
   title          official title, exactly as published
   subtitle       optional secondary line
   category       e.g. "FILM", "INSTALLATION", "ARTWORK"
   loop           short silent hero loop: base path → <base>-1280.mp4 / <base>-720.mp4 (plays in view)
   description    short text (EN) — empty until provided
   year, duration, role, tools   empty until provided
   credits        array of { label, name, verified }
                    label: "SELECTED FOR" | "EXHIBITED AT" | "SUBMITTED TO" | ...
                    verified:false → shown with a pending flag in dev,
                    hidden in production until confirmed (see SITE.showUnverified)
   mainImage      image object (see IMAGES below) or "" if not ready
   galleryImages  array of image objects
   videoFile      local video for in-site playback (linkType "video")
   externalUrl    YouTube / site URL
   linkType       "youtube" | "site" | "artwork" | "video"
   layout         art-book layout key: "bleed" | "editorial" | "gallery" | "sequence"
   notes          internal notes, never rendered

   IMAGES — stills are cut straight from the original films (no AI edits).
   { base: "media/works/riku/name",   → name-<w>.avif + name-<w>.webp exist
     widths: [960, 1920],              available widths
     w: 1920, h: 1080,                 intrinsic size of the largest file (prevents layout shift)
     alt: "…",                         describes what is visible — no invented facts
     pos: "50% 50%",                 optional object-position when cropped
     edge: "long" }                    files are named by long edge (portrait stills)
   ============================================================= */

const img = (base, widths, w, h, alt, pos, edge) => ({ base, widths, w, h, alt, pos: pos || "", edge: edge || "" });

window.WORKS = [

  /* ---------------- KOBAYASHI RIKU — WHITE WORLD ---------------- */
  {
    id: "choosing-the-unknown",
    identity: "riku",
    displayOrder: 1,
    title: "未知の選択 - Choosing the Unknown -",
    subtitle: "",
    category: "INSTALLATION",
    description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [
      { label: "SELECTED FOR", name: "WOW Student Program 2026", verified: false },
      { label: "EXHIBITED AT", name: "Pixel × Pixel 2026", verified: false },
      { label: "EXHIBITED AT", name: "NEUNE 2026", verified: false }
    ],
    loop: "media/works/riku/choosing-loop",
    mainImage: img("media/works/riku/choosing-loop-poster", [960, 1920], 1920, 1080,
      "Colour fluid swirling across a white turntable platter"),
    galleryImages: [
      img("media/works/riku/choosing-detail", [960, 1600], 1600, 900,
        "Close-up of the spindle on a red and blue fluid surface"),
      img("media/works/riku/choosing-square", [720, 1080], 1080, 1080,
        "The turntable seen from above, colours folding into each other"),
      img("media/works/riku/choosing-tonearm", [960, 1600], 1600, 900,
        "Tonearm resting over a pale blue disc")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/m9I633lOP4o",
    linkType: "youtube",
    layout: "bleed",
    notes: "Official EN names of programs + pre/post exhibition wording to be confirmed."
  },
  {
    id: "ippou-tsuukou",
    identity: "riku",
    displayOrder: 2,
    title: "一方通好",
    subtitle: "",
    category: "MV",
    description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [],
    loop: "media/works/riku/ippou-loop",
    mainImage: img("media/works/riku/ippou-loop-poster", [960, 1920], 1920, 1080,
      "A girl walks into a backlit alley", "50% 55%"),
    galleryImages: [
      img("media/works/riku/ippou-bear", [960, 1600], 1600, 900,
        "A teddy bear held in both arms"),
      img("media/works/riku/ippou-eye", [960, 1600], 1600, 900,
        "Macro shot of a round glass detail against the bear's fur"),
      img("media/works/riku/ippou-street", [960, 1600], 1600, 900,
        "A bin and rubbish bags on an empty street in low sun")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/S_p1n-Z3gBQ",
    linkType: "youtube",
    layout: "sequence",
    notes: "Lyrics are burned in from ~0:54 to ~2:08 — pick stills outside that range."
  },
  {
    id: "own-color",
    identity: "riku",
    displayOrder: 3,
    title: "OWN COLOR",
    subtitle: "",
    category: "",
    description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [],
    mainImage: img("media/works/riku/owncolor-poster", [800, 1400], 1400, 1980,
      "OWN COLOR poster — a white sneaker over a field of colour and repeated type"),
    galleryImages: [],
    videoFile: "",
    externalUrl: "https://define-your-own-color.vercel.app/",
    linkType: "site",
    layout: "gallery",
    notes: "Main visual = sneaker poster (KOBAYASHI RIKU/OWN COLOR.png, 3508×4961)."
  },
  {
    id: "magurazi",
    identity: "riku",
    displayOrder: 4,
    title: "マグラジ！~ From YUYU to YOU music ~",
    subtitle: "",
    category: "PV",
    description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [],
    loop: "media/works/riku/magurazi-loop",
    mainImage: img("media/works/riku/magurazi-loop-poster", [960, 1920], 1920, 1080,
      "RIKU speaking into the microphone on air, seen through a camera viewfinder"),
    galleryImages: [
      img("media/works/riku/magurazi-title", [960, 1600], 1600, 900,
        "マグラジ！ title card — From YUYU to YOU music"),
      img("media/works/riku/magurazi-band", [960, 1600], 1600, 900,
        "Two guitarists playing in a rehearsal studio")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/GQ8neUK025Q",
    linkType: "youtube",
    layout: "editorial",
    notes: "Local source: KOBAYASHI RIKU/マグロニカン侑夕PV_小林陸_260117.mp4 (24 min)."
  },

  /* ---------------- LAND — BLACK WORLD ---------------- */
  {
    id: "birth", identity: "land", displayOrder: 1,
    title: "Birth", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/birth-loop",
    mainImage: img("media/works/land/birth-loop-poster", [960, 1280], 1280, 720,
      "A fish made of water and light, its heart glowing"),
    galleryImages: [
      img("media/works/land/birth-embryo", [960, 1280], 1280, 720, "An embryo of light inside a sphere of water"),
      img("media/works/land/birth-sphere", [720], 720, 720, "A swirl of light inside a water sphere"),
      img("media/works/land/birth-ripples", [960, 1280], 1280, 720, "Ripples of light spreading across dark water")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/EbZXpaiilMc", linkType: "youtube", layout: "bleed",
    notes: "Source is 720p."
  },
  {
    id: "jaunt", identity: "land", displayOrder: 2,
    title: "JAUNT — THE WORLD'S SMALLEST HEADLINER", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [ { label: "SUBMITTED TO", name: "Runway Big Ad Contest", verified: false } ],
    loop: "media/works/land/jaunt-loop",
    mainImage: img("media/works/land/jaunt-loop-poster", [960, 1600], 1600, 900,
      "Pyrotechnics erupt over a stadium stage bearing the JAUNT name"),
    galleryImages: [
      img("media/works/land/jaunt-speaker", [960, 1600], 1600, 900, "A bodyguard presents a tiny speaker on his palm"),
      img("media/works/land/jaunt-crowd", [960, 1600], 1600, 900, "Fans screaming in the front row")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/bprNqIEZ3tY", linkType: "youtube", layout: "editorial",
    notes: "Contest mark visible bottom-right — left uncropped on purpose (user, 2026-11-20)."
  },
  {
    id: "52hz-ni-mo-shiten-wo", identity: "land", displayOrder: 3,
    title: "52Hzにも、視点を", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [ { label: "SUBMITTED TO", name: "Vook news zero Bumper Competition", verified: false } ],
    mainImage: img("media/works/land/52hz-whale", [960, 1600], 1600, 900,
      "A white toy whale floating among red, white and green spheres beside the news zero logo"),
    galleryImages: [],
    videoFile: "media/works/land/52hz-ni-mo-shiten-wo.mp4",
    externalUrl: "", linkType: "video", layout: "film",
    notes: "3 s bumper, played in-site as is (user confirmed). Uncropped (user: logos may stay visible)."
  },
  {
    id: "musubi", identity: "land", displayOrder: 4,
    title: "MUSUBI", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [ { label: "EXHIBITED AT", name: "NFFT 2026", verified: false } ],
    loop: "media/works/land/musubi-loop",
    mainImage: img("media/works/land/musubi-loop-poster", [960, 1600], 900, 1600,
      "A man in a red robe stands before a torii gate in the rain", "", "long"),
    galleryImages: [
      img("media/works/land/musubi-face", [960, 1600], 900, 1600, "Portrait of the man wrapped in red cloth", "", "long"),
      img("media/works/land/musubi-rope", [960, 1600], 900, 1600, "Red cloth in close-up", "", "long"),
      img("media/works/land/musubi-torii", [960, 1600], 900, 1600, "A red torii gate in a misty cedar forest", "", "long")
    ],
    videoFile: "",
    externalUrl: "https://youtube.com/shorts/oIZgPFNVmNA", linkType: "youtube", layout: "vertical",
    notes: "Vertical 1080×1920. Year / official name of NFFT to be confirmed."
  },
  {
    id: "pizza-wine-sisi", identity: "land", displayOrder: 5,
    title: "Pizza & Wine Sisi", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/pizza-loop",
    mainImage: img("media/works/land/pizza-loop-poster", [960, 1920], 1920, 1088,
      "Illustrated dough taking shape on a terracotta ground"),
    galleryImages: [
      img("media/works/land/pizza-hands", [960, 1600], 1600, 908, "Many hands painting toward the centre"),
      img("media/works/land/pizza-table", [960, 1600], 1600, 908, "A pizza at the centre of a table, hands reaching in")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/iXFKUTpmspw", linkType: "youtube", layout: "editorial", notes: "Source 3824×2168."
  },
  {
    id: "reply-52hz", identity: "land", displayOrder: 6,
    title: "REPLY - 52Hz -", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/reply-loop",
    mainImage: img("media/works/land/reply-loop-poster", [960, 1920], 1920, 1080,
      "A robot underwater, a heartbeat line glowing on its chest"),
    galleryImages: [
      img("media/works/land/reply-boat", [960, 1600], 1600, 900, "A rusted fishing boat in heavy sea"),
      img("media/works/land/reply-robot", [960, 1600], 1600, 900, "The robot on deck among fishermen"),
      img("media/works/land/reply-jellyfish", [960, 1600], 1600, 900, "A whale swimming through glowing jellyfish")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/2jJj_KVZnqg", linkType: "youtube", layout: "sequence", notes: ""
  },
  {
    id: "fujisaki", identity: "land", displayOrder: 7,
    title: "FUJISAKI", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/fujisaki-loop",
    mainImage: img("media/works/land/fujisaki-loop-poster", [960, 1920], 1920, 1074,
      "White fibres flowing through dark space"),
    galleryImages: [
      img("media/works/land/fujisaki-sculpture", [960, 1600], 1600, 894, "A woven white form rising in waves"),
      img("media/works/land/fujisaki-silk", [960, 1600], 1600, 894, "Folds of grey silk")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/OBDtsSECBdA", linkType: "youtube", layout: "editorial",
    notes: "Local source: LAND/FUJISAKI.mp4 (1924×1076)."
  },
  {
    id: "reiwa-tokaido", identity: "land", displayOrder: 8,
    title: "令和・東海道五十三次 ― 一歩も動かぬ男 ―", subtitle: "", category: "", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/tokaido-loop",
    mainImage: img("media/works/land/tokaido-loop-poster", [960, 1920], 1920, 1080,
      "A white arched bridge in a white room, a man seated behind it"),
    galleryImages: [
      img("media/works/land/tokaido-tea", [960, 1600], 1600, 900, "A hand holding a cup of green tea, rippling"),
      img("media/works/land/tokaido-glasses", [960, 1600], 1600, 900, "White sunglasses reflecting the sea"),
      img("media/works/land/tokaido-street", [960, 1600], 1600, 900, "A street of white Edo-period houses")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/JzRH3H7gJto", linkType: "youtube", layout: "bleed",
    notes: "Burned-in subtitles stay visible (uncropped, user 2026-11-20)."
  },
  {
    id: "sumika-toumei", identity: "land", displayOrder: 9,
    title: "sumika「透明」Artwork", subtitle: "", category: "ARTWORK", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    mainImage: img("media/works/land/art-sumika", [800, 1600], 1600, 1600,
      "Cover artwork: a bouquet of flowers forming a translucent jellyfish"),
    galleryImages: [
      img("media/works/land/art-sumika-cd", [960, 1600], 1600, 894, "The artwork on a CD beside its case"),
      img("media/works/land/art-sumika-case", [960, 1600], 1600, 894, "The artwork in a clear CD case")
    ],
    videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork",
    notes: "Main = 配信用 (2500×2500). Also CD + CD&case mockups (2752×1536)."
  },
  {
    id: "super-beaver-hitotsu", identity: "land", displayOrder: 10,
    title: "SUPER BEAVER「ひとつ」Artwork", subtitle: "", category: "ARTWORK", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    mainImage: img("media/works/land/art-superbeaver", [800, 1600], 1600, 1600,
      "Cover artwork: two figures under circular star trails"),
    galleryImages: [], videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork", notes: "2500×2500"
  },
  {
    id: "mr-children-innocent-world", identity: "land", displayOrder: 11,
    title: "Mr.Children「innocent world」Artwork", subtitle: "", category: "ARTWORK", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    mainImage: img("media/works/land/art-mrchildren", [800, 1600], 1600, 1600,
      "Cover artwork: two hands tearing open plastic film to reveal the Earth"),
    galleryImages: [], videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork", notes: "2500×2500"
  },
  {
    id: "kinmokusei", identity: "land", displayOrder: 12,
    title: "キンモクセイ MV", subtitle: "", category: "MV", description: "",
    year: "", duration: "", role: "", tools: [], credits: [],
    loop: "media/works/land/kinmokusei-loop",
    mainImage: img("media/works/land/kinmokusei-loop-poster", [960, 1920], 1920, 820,
      "A leaf falling through autumn light"),
    galleryImages: [
      img("media/works/land/kinmokusei-face", [960, 1600], 1600, 684, "A woman smiling by a window"),
      img("media/works/land/kinmokusei-couple", [960, 1600], 1600, 684, "Two people walking toward each other under autumn trees"),
      img("media/works/land/kinmokusei-steps", [960, 1600], 1600, 684, "Two pairs of feet walking side by side on fallen leaves")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/bJ3jQZ8bTVo", linkType: "youtube", layout: "sequence",
    notes: "Source is letterboxed 1920×820 inside 1080 — bars cropped."
  },
  {
    id: "aesop", identity: "land", displayOrder: 13,
    title: "Aesop CM", subtitle: "", category: "CM", description: "",
    year: "", duration: "", role: "", tools: [],
    credits: [ { label: "PROJECT", name: "amana inc. corporate project", verified: false } ],
    loop: "media/works/land/aesop-loop",
    mainImage: img("media/works/land/aesop-loop-poster", [960, 1600], 908, 1600,
      "An amber perfume bottle on rippling water among rose petals", "", "long"),
    galleryImages: [
      img("media/works/land/aesop-label", [960, 1600], 908, 1600, "The bottle's label in close-up", "", "long"),
      img("media/works/land/aesop-water", [960, 1600], 908, 1600, "The bottle standing on a glass dish of water", "", "long"),
      img("media/works/land/aesop-trio", [960, 1600], 908, 1600, "Three bottles in a row in warm light", "", "long")
    ],
    videoFile: "",
    externalUrl: "https://youtube.com/shorts/ufdI_TYrsR8", linkType: "youtube", layout: "vertical",
    notes: "Public wording to be confirmed. Must not read as an official Aesop commission."
  }
];
