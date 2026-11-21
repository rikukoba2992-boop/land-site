/* =============================================================
   WORKS DATA — KOBAYASHI RIKU × LAND
   -------------------------------------------------------------
   Edit this file to add / reorder / update works.
   Leave anything unconfirmed as "" or []. Never guess facts —
   empty fields are simply not shown on the page.

   FIELDS
   id             unique slug (also the deep link: /#work-<id>)
   identity       "riku" | "land"
   displayOrder   order inside its identity (1 = first)
   title          official title
   subtitle       optional secondary line
   type           TYPE           e.g. "Music Video" (shown under the title)
   duration       DURATION       running time, e.g. "03:00" — films only
   production     PRODUCTION     when it was made, e.g. "MAY – JUL 2026"
   productionTime PRODUCTION TIME how long it took, e.g. "2 WEEKS"
   role           ROLE           e.g. "Solo Production"
   detailedRole   ROLE (detail)  e.g. "Concept / Creative Direction / CGI"
   tools          TOOLS          array of official product names
   music          MUSIC          artist — title
   featured       FEATURED BAND
   facts          array of { label, items: [] }
                    label: "RECOGNITION" | "SUBMISSION" | "EXHIBITION" | "PROJECT"
   overviewJa     OVERVIEW (JP)  array of paragraphs — shown first
   overviewEn     OVERVIEW (EN)  array of paragraphs — shown under the JP text
   linkLabel      text of the action link (default per linkType: WATCH FILM / VISIT SITE / …)
   loop           short silent hero loop: base path → <base>-1280.mp4 / <base>-720.mp4 (plays in view)
   mainImage      image object (see IMAGES below) or "" if not ready
   galleryImages  array of image objects
   videoFile      local video for in-site playback (linkType "video")
   externalUrl    YouTube / site URL
   linkType       "youtube" | "site" | "artwork" | "video"
   layout         "bleed" | "editorial" | "gallery" | "sequence" | "vertical" | "film" | "artwork"
   notes          internal notes / pre-publish checks, never rendered

   IMAGES — stills are cut straight from the original films (no AI edits).
   { base: "media/works/riku/name",   → name-<w>.avif + name-<w>.webp exist
     widths: [960, 1920],              available widths
     w: 1920, h: 1080,                 intrinsic size of the largest file (prevents layout shift)
     alt: "…",                         describes what is visible — no invented facts
     pos: "50% 50%",                   optional object-position when cropped
     edge: "long" }                    files are named by long edge (portrait stills)
   ============================================================= */

const img = (base, widths, w, h, alt, pos, edge) => ({ base, widths, w, h, alt, pos: pos || "", edge: edge || "" });

window.WORKS = [

  /* ---------------- KOBAYASHI RIKU — WHITE WORLD ---------------- */
  {
    id: "choosing-the-unknown",
    identity: "riku",
    displayOrder: 1,
    title: "未知の選択 — Choosing the Unknown",
    subtitle: "",
    type: "Interactive Installation",
    duration: "Approx. 03:48",
    production: "JUL – SEP 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / Visual Design / Sound Design / Interactive System / Programming / Editing",
    tools: ["TouchDesigner", "Adobe Premiere Pro", "GarageBand"],
    music: "", featured: "",
    facts: [
      { label: "RECOGNITION", items: [
        "WOW Student Program 2026 — Selected",
        "Pixel × Pixel 2026 — Exhibition",
        "NEUNE 2026 — Scheduled Exhibition"
      ] }
    ],
    overviewJa: [
      `白いレコード盤をキャンバスに、音と色彩、鑑賞者の選択によって変化するインタラクティブインスタレーション。`,
      `レコードの回転と音に呼応して流動するビジュアルを生み出し、鑑賞者自身の選択を通して、未知なる時間を体験する作品。`
    ],
    overviewEn: [
      `An interactive installation that transforms a white vinyl record into a canvas for sound, color, and choice.`,
      `Fluid visuals respond to the record's rotation and sound, inviting viewers to experience an unknown sense of time through their own decisions.`
    ],
    linkLabel: "WATCH FILM",
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
    notes: "PRE-PUBLISH CHECK: switch NEUNE 2026 to 'Exhibition' once it has taken place; confirm official event names (WOW Student Program / Pixel × Pixel / NEUNE)."
  },
  {
    id: "ippou-tsuukou",
    identity: "riku",
    displayOrder: 2,
    title: "一方通好",
    subtitle: "",
    type: "Music Video",
    duration: "03:00",
    production: "MAY – JUL 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / CGI / Compositing / Editing",
    tools: ["Blender", "Adobe After Effects", "Adobe Premiere Pro", "Adobe Photoshop", "Adobe Illustrator"],
    music: "野村皐月 — 「一方通好」", featured: "",
    facts: [],
    overviewJa: [
      `野村皐月「一方通好」のMV。`,
      `舞台となる神楽坂の「逆転式一方通行」を物語に取り入れ、道の進行方向の変化と二人の関係性を重ね合わせた。`,
      `3DCGで描く現実と、イラストで表現する記憶を対比させ、忘れられてもなお愛し続ける切なさと、その想いの行方を描いた。`
    ],
    overviewEn: [
      `A music video for "一方通好" by Satsuki Nomura.`,
      `Set in Kagurazaka, Tokyo, the film incorporates the neighborhood's reversible one-way traffic system, drawing a parallel between the changing direction of the road and the relationship between two people.`,
      `By contrasting reality rendered in 3D CGI with memories portrayed through illustration, the film explores the bittersweet emotion of loving someone who no longer remembers you, and where those feelings ultimately lead.`
    ],
    linkLabel: "WATCH FILM",
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
    notes: "Keep the music credit (野村皐月). Lyrics are burned in from ~0:54 to ~2:08 — stills avoid that range."
  },
  {
    id: "own-color",
    identity: "riku",
    displayOrder: 3,
    title: "OWN COLOR",
    subtitle: "",
    type: "Poster Design / Interactive Web Experience",
    duration: "",                       // not a film — no duration
    production: "OCT 17–31, 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Art Direction / CGI / Graphic Design / Interactive Web Design / AI-assisted Development",
    tools: ["Blender", "TouchDesigner", "Adobe Photoshop", "Adobe Illustrator", "Claude", "Suno"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `「自分の色は、自分で決める。」`,
      `白いスニーカーをモチーフに、個性と自己表現をテーマとして制作したビジュアル作品。`,
      `鮮やかな色彩とCRTディスプレイによる空間表現を組み合わせたポスターデザインから、スニーカーを自由にカスタマイズできるインタラクティブWebサイトへと展開した。`,
      `本作では、自身のCG・デザイン技術と生成AIを掛け合わせることで、これまでのスキルだけでは実現が難しかった表現に挑戦。技術の枠を超え、創造の可能性を広げることを目指した。`
    ],
    overviewEn: [
      `"Define your own color."`,
      `A visual project exploring individuality and self-expression through the motif of a white sneaker.`,
      `Combining vivid colors with an arrangement of CRT displays, the project extends from poster design into an interactive website where visitors can customize their own sneakers.`,
      `By combining my skills in CGI and design with generative AI, I challenged myself to explore creative possibilities beyond what my existing skill set alone could achieve, expanding the boundaries of my own expression.`
    ],
    linkLabel: "VISIT SITE",
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
    title: "マグラジ！〜 From YUYU to YOU music 〜",
    subtitle: "",
    type: "Web Radio / Music Talk Show",
    duration: "24:14",
    production: "MAY – DEC 2025",
    productionTime: "",
    role: "Direction / Radio DJ / Editing / Compositing / Motion Graphics",
    detailedRole: "",
    tools: ["Adobe Premiere Pro", "Adobe After Effects"],
    music: "", featured: "マグロニカン",
    facts: [],
    overviewJa: [
      `バンド「マグロニカン」の魅力をより多くの人に届けるために制作したWebラジオ番組。`,
      `メンバーとの対談や日常にまつわる質問、おすすめ楽曲の紹介を通して、音楽だけでは伝わらないバンドの素顔や個性を引き出した。`,
      `視聴者が楽しみながらバンドへの理解を深め、新たな音楽との出会いや興味につながることを目指した作品。`
    ],
    overviewEn: [
      `A web radio program created to introduce the music and personalities of the band マグロニカン to a wider audience.`,
      `Through conversations with the band members, questions about their everyday lives, and music recommendations, the program reveals the personalities and stories behind their music.`,
      `The project aims to bring listeners closer to the band while inspiring curiosity and new musical discoveries.`
    ],
    linkLabel: "WATCH PROGRAM",
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
    notes: "ROLE lists his own scope only (not every role in the programme). Local source: KOBAYASHI RIKU/マグロニカン侑夕PV_小林陸_260117.mp4 (24 min)."
  },

  /* ---------------- LAND — BLACK WORLD ---------------- */
  {
    id: "birth", identity: "land", displayOrder: 1,
    title: "Birth", subtitle: "",
    type: "Experimental Film",
    duration: "00:40",
    production: "",
    productionTime: "2 HOURS",
    role: "Solo Production",
    detailedRole: "Concept / Direction / AI Visual Production / Sound Design / Editing",
    tools: ["Runway", "Suno", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `生命の誕生と循環をテーマに制作した実験映像作品。`,
      `一滴の水から気泡や細胞が生まれ、鼓動とともに生命が形づくられていく。やがて魚や鳥へと姿を変えていく過程を、幻想的な液体表現によって描いた。`,
      `水から生まれた生命が再び水へと還る円環構造を通して、生命の神秘と美しさ、そして終わりのない循環を表現している。`
    ],
    overviewEn: [
      `An experimental film exploring the birth and cycle of life.`,
      `From a single drop of water, bubbles and cells emerge, gradually forming life to the rhythm of a heartbeat. Through dreamlike fluid imagery, these forms transform into fish and birds.`,
      `As life born from water eventually returns to it, the film reflects on the mystery and beauty of existence, and the endless cycle of life.`
    ],
    linkLabel: "WATCH FILM",
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
    title: "JAUNT — THE WORLD’S SMALLEST HEADLINER", subtitle: "",
    type: "Spec Commercial",
    duration: "00:30",
    production: "JUL – AUG 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Sound Production / Editing",
    tools: ["Runway", "Suno", "ElevenLabs", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [ { label: "SUBMISSION", items: ["Runway Big Ad Contest"] } ],
    overviewJa: [
      `手のひらサイズのポータブルスピーカーを世界的スターに見立てた、ユーモアあふれる架空のCM作品。`,
      `ボディーガードやパパラッチに囲まれたスピーカーが、巨大フェスのヘッドライナーとして登場。再生ボタンをきっかけに、観客を熱狂の渦へと巻き込んでいく。`,
      `小さなボディーに秘められた圧倒的なサウンドと高揚感を、壮大なスケールの映像演出と意外性のあるストーリーによって表現した。`
    ],
    overviewEn: [
      `A playful spec commercial that reimagines a palm-sized portable speaker as a global superstar.`,
      `Surrounded by bodyguards and paparazzi, the tiny speaker takes the stage as the headliner of a massive music festival. With the press of a play button, the crowd erupts into excitement.`,
      `Through cinematic scale and an unexpected storyline, the film captures the powerful sound and exhilarating energy contained within such a small device.`
    ],
    linkLabel: "WATCH FILM",
    loop: "media/works/land/jaunt-loop",
    mainImage: img("media/works/land/jaunt-loop-poster", [960, 1600], 1600, 900,
      "Pyrotechnics erupt over a stadium stage bearing the JAUNT name"),
    galleryImages: [
      img("media/works/land/jaunt-speaker", [960, 1600], 1600, 900, "A bodyguard presents a tiny speaker on his palm"),
      img("media/works/land/jaunt-crowd", [960, 1600], 1600, 900, "Fans screaming in the front row")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/bprNqIEZ3tY", linkType: "youtube", layout: "editorial",
    notes: "Contest submission — never word it as a winning entry or an official ad. Contest mark left uncropped (user, 2026-11-20)."
  },
  {
    id: "52hz-ni-mo-shiten-wo", identity: "land", displayOrder: 3,
    title: "52Hzにも、視点を", subtitle: "",
    type: "Bumper Film",
    duration: "00:03",
    production: "",
    productionTime: "1 HOUR",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Editing",
    tools: ["Midjourney", "Runway", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [ { label: "SUBMISSION", items: ["Vook news zero Next Creators Contest"] } ],
    overviewJa: [
      `他のクジラには届かないとされる52Hzの周波数で鳴く「世界で最も孤独なクジラ」をモチーフに、news zeroの「ある視点」というテーマを表現した3秒間のバンパー映像。`,
      `白とライムグリーンを基調に、透明なガラスや光の屈折を用いて、見えない声や存在に光を当てる視覚表現を追求した。`
    ],
    overviewEn: [
      `A three-second bumper film created for the Vook news zero Next Creators Contest, inspired by the "world's loneliest whale," known for singing at a frequency of 52Hz, often described as going unheard by other whales.`,
      `Using a palette of white and lime green, along with transparent glass and refracted light, the piece explores a visual language that sheds light on unseen voices and unnoticed presences.`
    ],
    linkLabel: "PLAY FILM",
    mainImage: img("media/works/land/52hz-whale", [960, 1600], 1600, 900,
      "A white toy whale floating among red, white and green spheres beside the news zero logo"),
    galleryImages: [],
    videoFile: "media/works/land/52hz-ni-mo-shiten-wo.mp4",
    externalUrl: "", linkType: "video", layout: "film",
    notes: "3 s bumper, played in-site from the local file (unchanged). Uncropped (user: logos may stay visible)."
  },
  {
    id: "musubi", identity: "land", displayOrder: 4,
    title: "MUSUBI", subtitle: "",
    type: "Fashion Film",
    duration: "00:30",
    production: "AUG – SEP 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Sound Production / Editing",
    tools: ["Runway", "Midjourney", "Suno", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [ { label: "EXHIBITION", items: ["NFFT 2026"] } ],
    overviewJa: [
      `日本古来の「産霊（むすひ）」という思想をもとに、人と自然、伝統と未来のつながりを描いたファッションフィルム。`,
      `神社や鳥居、霧に包まれた森などの日本的な風景と、生体的な質感を持つ未来的な衣装を融合させ、自然との断絶から再び結ばれていく過程を表現した。`,
      `自然とテクノロジーが対立するのではなく、互いに調和しながら共生する、新たな未来の可能性を提示している。`
    ],
    overviewEn: [
      `A fashion film inspired by the ancient Japanese concept of musuhi, exploring the connection between humanity and nature, tradition and the future.`,
      `By blending distinctly Japanese landscapes—such as shrines, torii gates, and mist-covered forests—with futuristic garments featuring organic, bio-like textures, the film portrays a journey from disconnection to reconnection with nature.`,
      `Rather than positioning nature and technology in opposition, the work envisions a new future in which the two exist in harmony.`
    ],
    linkLabel: "WATCH FILM",
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
    notes: "PRE-PUBLISH CHECK: NFFT year / official event name — keep 'NFFT 2026' as given until confirmed."
  },
  {
    id: "pizza-wine-sisi", identity: "land", displayOrder: 5,
    title: "Pizza & Wine Sisi", subtitle: "",
    type: "Brand Film",
    duration: "00:30",
    production: "AUG – SEP 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Editing",
    tools: ["Runway", "Suno", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `北海道産スペルト小麦を起点に、「Pizza & Wine Sisi」が生まれるまでの物語を描いた30秒のブランドフィルム。`,
      `小麦から粉、生地、窯、そしてピザへと移り変わる過程を、抽象的なイラストレーションと流れるようなモーフィングアニメーションで表現した。`,
      `温かみのある色彩と有機的な動きを通して、素材へのこだわりと店の誕生に込められたストーリーを紡ぎ、Sisiならではのブランドの世界観を描いている。`
    ],
    overviewEn: [
      `A 30-second brand film tracing the story behind Pizza & Wine Sisi, beginning with spelt wheat grown in Hokkaido, Japan.`,
      `Through abstract illustrations and fluid morphing animation, the film follows the transformation from wheat to flour, dough, oven, and finally pizza.`,
      `Warm colors and organic movement convey the care given to each ingredient and the story behind the restaurant's creation, bringing Sisi's distinctive brand identity to life.`
    ],
    linkLabel: "WATCH FILM",
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
    title: "REPLY - 52Hz -", subtitle: "",
    type: "Sci-Fi Film Trailer",
    duration: "00:30",
    production: "JUL – AUG",            // year not confirmed — do not add one
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Sound Design / Voice Production / Editing",
    tools: ["Runway", "Suno", "ElevenLabs", "Adobe Premiere Pro", "Adobe Photoshop"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `人間に不良品として捨てられたロボットと、「世界で最も孤独なクジラ」と呼ばれる52Hzのクジラの出会いを描いた、生成AIによるSF映画の予告編。`,
      `命令を受信できないというロボットの欠陥が、誰にも届かなかったクジラの声を受け取る力となり、孤独な存在同士が言葉を超えてつながっていく。`,
      `「誰にも必要とされなかった存在が、誰にも届かなかった声に応える。」`,
      `欠陥が誰かを救う可能性と、孤独の先に生まれる希望を描いた作品。`
    ],
    overviewEn: [
      `A 30-second AI-generated sci-fi film trailer depicting an encounter between a robot discarded by humans as defective and the 52Hz whale, often called "the world's loneliest whale."`,
      `The robot's inability to receive commands becomes its greatest strength: the ability to hear a voice that has never reached anyone else. Two isolated beings find a connection beyond words.`,
      `"A being no one needed answers a voice no one could hear."`,
      `Through this encounter, the film explores how an apparent flaw can become the power to save another, revealing hope beyond loneliness.`
    ],
    linkLabel: "WATCH FILM",
    loop: "media/works/land/reply-loop",
    mainImage: img("media/works/land/reply-loop-poster", [960, 1920], 1920, 1080,
      "A robot underwater, a heartbeat line glowing on its chest"),
    galleryImages: [
      img("media/works/land/reply-boat", [960, 1600], 1600, 900, "A rusted fishing boat in heavy sea"),
      img("media/works/land/reply-robot", [960, 1600], 1600, 900, "The robot on deck among fishermen"),
      img("media/works/land/reply-jellyfish", [960, 1600], 1600, 900, "A whale swimming through glowing jellyfish")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/2jJj_KVZnqg", linkType: "youtube", layout: "sequence",
    notes: "PRE-PUBLISH CHECK: production year not confirmed — shown as 'JUL – AUG' without a year."
  },
  {
    id: "fujisaki", identity: "land", displayOrder: 7,
    title: "FUJISAKI", subtitle: "",
    type: "Brand Film",
    duration: "00:30",
    production: "",
    productionTime: "3 HOURS",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Voice Production / Sound Production / Editing",
    tools: ["Runway", "Midjourney", "Suno", "ElevenLabs", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `老舗百貨店「藤崎」の歴史と未来を、「つながり」をテーマに描いた30秒のブランドムービー。`,
      `創業当時の「糸と糸をつなぐ」という原点から、現代の「人と人をつなぐ」存在へと進化してきた歩みを、素材の質感変化と流れるような映像表現で描いた。`,
      `時代が変わっても受け継がれる藤崎の想いと、人々の暮らしを結び続ける姿を表現している。`
    ],
    overviewEn: [
      `A 30-second brand film exploring the history and future of the long-established department store FUJISAKI through the theme of connection.`,
      `Beginning with the brand's origin of "connecting thread to thread," the film traces its evolution into a presence that now connects people to people, expressed through changing material textures and fluid visual transitions.`,
      `The work reflects FUJISAKI's enduring values and its continuing role in connecting people's lives across generations.`
    ],
    linkLabel: "WATCH FILM",
    loop: "media/works/land/fujisaki-loop",
    mainImage: img("media/works/land/fujisaki-loop-poster", [960, 1920], 1920, 1074,
      "White fibres flowing through dark space"),
    galleryImages: [
      img("media/works/land/fujisaki-sculpture", [960, 1600], 1600, 894, "A woven white form rising in waves"),
      img("media/works/land/fujisaki-silk", [960, 1600], 1600, 894, "Folds of grey silk")
    ],
    videoFile: "",
    externalUrl: "https://youtu.be/OBDtsSECBdA", linkType: "youtube", layout: "editorial",
    notes: "A work about the company — not confirmed as an official / commissioned ad; avoid wording that implies one."
  },
  {
    id: "reiwa-tokaido", identity: "land", displayOrder: 8,
    title: "令和・東海道五十三次 ― 一歩も動かぬ男 ―", subtitle: "",
    type: "AI Short Film",
    duration: "02:00",
    production: "",
    productionTime: "2 WEEKS",
    role: "Solo Production",
    detailedRole: "Concept / Direction / AI Visual Production / Voice Production / Sound Production / Editing",
    tools: ["Runway", "Midjourney", "Suno", "ElevenLabs", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `日本の伝統話芸「講談」を現代的に再解釈し、江戸時代の旅と令和の世界を融合させた約2分間のAIショートフィルム。`,
      `白く無機質な空間に座る講談師の語りに合わせて、東海道五十三次の宿場や風景が次々と変化し、主人公が一歩も動かずに旅をする奇妙な物語を描いている。`,
      `伝統的な語り口と、生成AIによる非現実的な映像表現を組み合わせることで、時代や空間を超えた新しい講談の可能性を追求した作品。`
    ],
    overviewEn: [
      `A two-minute AI short film that reinterprets kodan, a traditional Japanese storytelling art, by blending an Edo-period journey with the contemporary world of Reiwa.`,
      `Accompanied by the narration of a storyteller seated in a stark white space, scenes inspired by the stations and landscapes of the Tokaido shift one after another, unfolding the strange tale of a man who travels without taking a single step.`,
      `By combining the traditional cadence of oral storytelling with surreal AI-generated imagery, the film explores a new possibility for kodan that transcends both time and space.`
    ],
    linkLabel: "WATCH FILM",
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

  /* LAND — artwork collection: no OVERVIEW, self-initiated / unofficial */
  {
    id: "sumika-toumei", identity: "land", displayOrder: 9,
    title: "sumika「透明」Artwork", subtitle: "",
    type: "Music Artwork",
    duration: "", production: "",
    productionTime: "2 WEEKS",
    role: "",                           // to be confirmed — not shown
    detailedRole: "",
    tools: ["Midjourney", "Adobe Photoshop", "Adobe Illustrator"],
    music: "", featured: "",
    facts: [ { label: "PROJECT", items: ["Self-Initiated / Unofficial"] } ],
    overviewJa: [], overviewEn: [],
    linkLabel: "VIEW ARTWORK",
    mainImage: img("media/works/land/art-sumika", [800, 1600], 1600, 1600,
      "Cover artwork: a bouquet of flowers forming a translucent jellyfish"),
    galleryImages: [
      img("media/works/land/art-sumika-cd", [960, 1600], 1600, 894, "The artwork on a CD beside its case"),
      img("media/works/land/art-sumika-case", [960, 1600], 1600, 894, "The artwork in a clear CD case")
    ],
    videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork",
    notes: "PRE-PUBLISH CHECK: ROLE to be confirmed. Self-initiated, not an official artwork. Main = 配信用 (2500×2500)."
  },
  {
    id: "super-beaver-hitotsu", identity: "land", displayOrder: 10,
    title: "SUPER BEAVER「ひとつ」Artwork", subtitle: "",
    type: "Music Artwork",
    duration: "", production: "",
    productionTime: "2 WEEKS",
    role: "Solo Production",
    detailedRole: "",
    tools: ["Runway", "Adobe Photoshop", "Adobe Illustrator"],
    music: "", featured: "",
    facts: [ { label: "PROJECT", items: ["Self-Initiated / Unofficial"] } ],
    overviewJa: [], overviewEn: [],
    linkLabel: "VIEW ARTWORK",
    mainImage: img("media/works/land/art-superbeaver", [800, 1600], 1600, 1600,
      "Cover artwork: two figures under circular star trails"),
    galleryImages: [], videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork",
    notes: "Self-initiated, not an official artwork. 2500×2500."
  },
  {
    id: "mr-children-innocent-world", identity: "land", displayOrder: 11,
    title: "Mr.Children「innocent world」Artwork", subtitle: "",
    type: "Music Artwork",
    duration: "", production: "",
    productionTime: "2 WEEKS",
    role: "Solo Production",
    detailedRole: "",
    tools: ["Runway", "Adobe Photoshop", "Adobe Illustrator"],
    music: "", featured: "",
    facts: [ { label: "PROJECT", items: ["Self-Initiated / Unofficial"] } ],
    overviewJa: [], overviewEn: [],
    linkLabel: "VIEW ARTWORK",
    mainImage: img("media/works/land/art-mrchildren", [800, 1600], 1600, 1600,
      "Cover artwork: two hands tearing open plastic film to reveal the Earth"),
    galleryImages: [], videoFile: "",
    externalUrl: "", linkType: "artwork", layout: "artwork",
    notes: "Self-initiated, not an official artwork. 2500×2500."
  },

  /* LAND — remaining films */
  {
    id: "kinmokusei", identity: "land", displayOrder: 12,
    title: "キンモクセイ", subtitle: "",
    type: "Music Video",
    duration: "02:00",
    production: "SEP – OCT 2026",
    productionTime: "",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Music Production / AI Visual Production / Editing",
    tools: ["Runway", "Adobe Premiere Pro", "Suno"],
    music: "", featured: "",
    facts: [],
    overviewJa: [
      `楽曲制作から映像表現まで生成AIを活用し、花の香りをきっかけによみがえる初恋の記憶と、すれ違う二人の想いを描いたMV。`,
      `かつて恋をした男女が、それぞれ別の恋人と過ごす現在の日常を、分割画面による対比表現を用いて描いた。`,
      `キンモクセイの花言葉「初恋」「陶酔」に着想を得て、過去の記憶と現在の幸せが交差する、切なくも温かい世界観を表現している。`
    ],
    overviewEn: [
      `A music video created using generative AI for both music production and visual storytelling, exploring memories of first love awakened by the scent of osmanthus flowers.`,
      `Through a split-screen composition, the film contrasts the everyday lives of two people who once shared a romance but now find themselves with different partners.`,
      `Inspired by the flower meanings of osmanthus, "first love" and "intoxication," the work portrays a bittersweet yet tender world where memories of the past intertwine with happiness in the present.`
    ],
    linkLabel: "WATCH MUSIC VIDEO",
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
    notes: "Music and film both made with generative AI, solo. Source is letterboxed 1920×820 inside 1080 — bars cropped."
  },
  {
    id: "aesop", identity: "land", displayOrder: 13,
    title: "Aesop CM", subtitle: "",
    type: "Spec Commercial / Perfume Film",
    duration: "00:15",
    production: "",
    productionTime: "2 DAYS",
    role: "Solo Production",
    detailedRole: "Concept / Creative Direction / AI Visual Production / Music Production / Editing",
    tools: ["Figma Weave", "Suno", "Adobe Premiere Pro"],
    music: "", featured: "",
    facts: [ { label: "PROJECT", items: ["amana inc. — Corporate Project"] } ],
    overviewJa: [
      `「自分らしさを取り戻す」をテーマに、香りを纏うことで本来の自分へと立ち返る瞬間を描いた15秒の香水ブランドムービー。`,
      `香水ボトルを「揺るがない自分自身の核」、周囲に広がるガラスの波紋を「外部からの影響や心の揺らぎ」、内部の気泡を「人間らしい不完全さ」の象徴として表現した。`,
      `中心から外へと広がる波紋には、自分自身を受け入れることが、他者や異なる価値観を受け入れることにもつながるという想いを込めた。`,
      `「やわらかく、揺るがない。」`,
      `そのメッセージを、繊細な質感と抽象的な映像表現によって描いた作品。`
    ],
    overviewEn: [
      `A 15-second perfume concept film exploring the theme of rediscovering one's authentic self through scent.`,
      `The perfume bottle represents the unwavering core of one's identity, while the surrounding glass ripples symbolize external influences and emotional uncertainty. Bubbles within the bottle embody the imperfections that make us human.`,
      `The ripples expanding outward from the center express the idea that accepting oneself can lead to embracing others and their different perspectives.`,
      `"Gentle, yet unwavering."`,
      `Through delicate textures and abstract visual storytelling, the film brings this message to life.`
    ],
    linkLabel: "WATCH FILM",
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
    notes: "amana corporate project — not confirmed as an official Aesop ad; avoid wording that implies one."
  }
];
