import { TrendItem, PlatformTop10Item, ViralIdea } from "../types";

export const FAITH_NICHES = [
  "Bible Study & Theology",
  "Worship & Worship Music",
  "Streetwear & Kingdom Fashion",
  "Apologetics & Faith Defense",
  "Christian Tech & Digital Ministry",
  "Marriage & Family Life",
  "Missions & Global Witness",
  "Church Life & Leadership",
  "Gospel Rap & Hip-Hop",
  "Mental Health & Faith",
  "Spoken Word & Poetry",
  "Devotionals & Daily Encouragement"
];

export const MOCK_TRENDS: TrendItem[] = [
  // Social
  {
    id: "s1",
    category: "social",
    title: "#BibleStudyChallenge",
    momentum: "+245%",
    volume: "128.4K",
    sentiment: 92,
    description: "A viral challenge urging creators to share their raw study highlights, margin notes, and original translation reflections. Massively popular on TikTok and Instagram.",
    growthRate: "spiking",
    history: [84, 91, 102, 110, 115, 122, 128]
  },
  {
    id: "s2",
    category: "social",
    title: "#JesusLovesYou",
    momentum: "+45%",
    volume: "1.2M",
    sentiment: 95,
    description: "Evergreen social content utilizing simple typographic boards and ambient street video. Generates high engagement through comments of mutual encouragement.",
    growthRate: "steady",
    history: [1150, 1170, 1180, 1195, 1198, 1205, 1210]
  },
  {
    id: "s3",
    category: "social",
    title: "#FaithWalkVlog",
    momentum: "+110%",
    volume: "84.3K",
    sentiment: 88,
    description: "Daily 'get ready with me' (GRWM) or 'walk and talk' vlogs focused on how to maintain prayer rhythms, scripture reading, and fasting in active workplaces.",
    growthRate: "spiking",
    history: [40, 48, 55, 63, 71, 79, 84]
  },
  {
    id: "s4",
    category: "social",
    title: "#WorshipAcoustic",
    momentum: "+85%",
    volume: "94.6K",
    sentiment: 91,
    description: "Raw acoustic praise covers recorded in simple bedroom setups. High watch-times due to peaceful aesthetics.",
    growthRate: "steady",
    history: [60, 68, 74, 80, 85, 90, 94]
  },
  {
    id: "s5",
    category: "social",
    title: "#ChristianRap",
    momentum: "+160%",
    volume: "185.0K",
    sentiment: 88,
    description: "Rising rap videos connecting theology-rich bars with modern drill beats. Major Gen-Z reach.",
    growthRate: "spiking",
    history: [110, 122, 138, 150, 162, 174, 185]
  },
  {
    id: "s6",
    category: "social",
    title: "#BibleJournaling",
    momentum: "+75%",
    volume: "210.4K",
    sentiment: 94,
    description: "Showcasing custom calligraphy, paints, and highlighters in study margins. Driven by aesthetic visual reels.",
    growthRate: "steady",
    history: [180, 185, 192, 198, 202, 207, 210]
  },
  {
    id: "s7",
    category: "social",
    title: "#ChurchHumor",
    momentum: "+220%",
    volume: "350.2K",
    sentiment: 92,
    description: "Relatable sketches about church potlucks, soundboard issues, and long sermons. Drives massive sharing.",
    growthRate: "spiking",
    history: [240, 260, 285, 305, 320, 338, 350]
  },
  {
    id: "s8",
    category: "social",
    title: "#ChristianAesthetic",
    momentum: "+65%",
    volume: "420.5K",
    sentiment: 93,
    description: "Clean interior layouts, morning study coffee mugs, and neutral clothing vibes framing daily devotions.",
    growthRate: "steady",
    history: [380, 388, 395, 402, 408, 414, 420]
  },
  {
    id: "s9",
    category: "social",
    title: "#PrayerRequests",
    momentum: "+190%",
    volume: "740.1K",
    sentiment: 96,
    description: "Interactive comment-driven posts where creators offer to pray for individual viewer needs. High comment density.",
    growthRate: "spiking",
    history: [580, 610, 640, 672, 698, 720, 740]
  },
  {
    id: "s10",
    category: "social",
    title: "#GospelTruth",
    momentum: "+25%",
    volume: "98.3K",
    sentiment: 89,
    description: "Typographic quote cards of classical theologians and reformers addressing modern dilemmas.",
    growthRate: "slowing",
    history: [95, 96, 97, 98, 98.2, 98.1, 98.3]
  },
  // Creators
  {
    id: "c1",
    category: "creators",
    title: "The Bible Project",
    momentum: "+80%",
    volume: "450K",
    sentiment: 98,
    description: "High-production-value animated explanations of biblical themes, literary styles, and structural outlines. Leading standard for scripture explainer media.",
    growthRate: "steady",
    history: [380, 395, 410, 422, 435, 442, 450]
  },
  {
    id: "c2",
    category: "creators",
    title: "Ruslan KD",
    momentum: "+135%",
    volume: "115.6K",
    sentiment: 84,
    description: "Cultural commentary, react videos, and interviews targeting modern Christian trends, music, and debates. Known for fast-paced video edits and live commentary streams.",
    growthRate: "spiking",
    history: [62, 70, 79, 88, 98, 108, 115]
  },
  {
    id: "c3",
    category: "creators",
    title: "Jackie Hill Perry",
    momentum: "+65%",
    volume: "310.2K",
    sentiment: 94,
    description: "Theology-rich spoken word poetry, teaching, and short Reels discussing holy living, discipled families, and biblical womanhood. Extremely high bookmark rates.",
    growthRate: "steady",
    history: [250, 260, 275, 280, 292, 301, 310]
  },
  {
    id: "c4",
    category: "creators",
    title: "Mike Winger",
    momentum: "+95%",
    volume: "245.0K",
    sentiment: 96,
    description: "Detailed, verse-by-verse teachings and long-form Q&A videos answering tough theological questions.",
    growthRate: "steady",
    history: [210, 218, 225, 231, 236, 241, 245]
  },
  {
    id: "c5",
    category: "creators",
    title: "Melissa Dougherty",
    momentum: "+110%",
    volume: "180.2K",
    sentiment: 93,
    description: "Apologetics content exploring the boundaries between New Age practices and historic orthodox Christianity.",
    growthRate: "spiking",
    history: [140, 148, 155, 162, 169, 175, 180]
  },
  {
    id: "c6",
    category: "creators",
    title: "Preston Perry",
    momentum: "+70%",
    volume: "155.4K",
    sentiment: 95,
    description: "Spoken word artist and apologist discussing relational evangelism and street apologetics.",
    growthRate: "steady",
    history: [138, 141, 144, 147, 150, 153, 155]
  },
  {
    id: "c7",
    category: "creators",
    title: "Jefferson Bethke",
    momentum: "+15%",
    volume: "210.0K",
    sentiment: 91,
    description: "Content regarding intentional family rhythms, multigenerational legacy, and simple discipled living.",
    growthRate: "slowing",
    history: [208, 209, 210, 209.5, 210, 209.8, 210]
  },
  {
    id: "c8",
    category: "creators",
    title: "Amena Brown",
    momentum: "+45%",
    volume: "89.2K",
    sentiment: 94,
    description: "Spoken word poet and speaker focusing on liturgy, faith struggles, and storytelling.",
    growthRate: "steady",
    history: [78, 80, 82, 84, 86, 88, 89]
  },
  {
    id: "c9",
    category: "creators",
    title: "Allie Beth Stuckey",
    momentum: "+150%",
    volume: "380.5K",
    sentiment: 82,
    description: "Cultural commentary analyzing current events, policy shifts, and theology from a conservative Christian worldview.",
    growthRate: "spiking",
    history: [280, 305, 322, 338, 352, 368, 380]
  },
  {
    id: "c10",
    category: "creators",
    title: "Jon Jorgenson",
    momentum: "+20%",
    volume: "122.1K",
    sentiment: 90,
    description: "Creative spoken word and vlog lessons addressing college-aged questions, dating, and faith doubts.",
    growthRate: "slowing",
    history: [118, 119, 120, 121, 121.5, 121.8, 122]
  },
  // Products
  {
    id: "p1",
    category: "products",
    title: "ESV Creeping Rose Wide-Margin Bible",
    momentum: "+310%",
    volume: "18.2K",
    sentiment: 96,
    description: "A wide-margin single-column study Bible bound in premium leather with custom floral embossing, optimized for journaling, calligraphy, and sermon annotations.",
    growthRate: "spiking",
    history: [2, 5, 8, 11, 13, 16, 18]
  },
  {
    id: "p2",
    category: "products",
    title: "Kingdom Vintage Streetwear Tee",
    momentum: "+180%",
    volume: "12.5K",
    sentiment: 89,
    description: "Oversized heavy-cotton vintage washed t-shirt printed with Hebrew text and old scripture engravings. High aesthetic appeal for Gen-Z Christian creators.",
    growthRate: "spiking",
    history: [3, 4, 6, 8, 9, 11, 12]
  },
  {
    id: "p3",
    category: "products",
    title: "Leather-Bound 90-Day Prayer Journal",
    momentum: "+30%",
    volume: "22.0K",
    sentiment: 91,
    description: "Elegant daily journal featuring guided prompts for adoration, confession, thanksgiving, and supplication. Premium thick pages prevent bleed-through.",
    growthRate: "slowing",
    history: [20, 21, 21.5, 22, 22.1, 21.8, 22]
  },
  {
    id: "p4",
    category: "products",
    title: "The Chosen Box Set (Seasons 1-4)",
    momentum: "+50%",
    volume: "44.2K",
    sentiment: 97,
    description: "Premium physical box sets of the historical Jesus series, popular for family gifting and study groups.",
    growthRate: "steady",
    history: [38, 39, 41, 42, 43, 43.8, 44.2]
  },
  {
    id: "p5",
    category: "products",
    title: "Hosanna Revival Journaling Bible",
    momentum: "+125%",
    volume: "28.5K",
    sentiment: 95,
    description: "Bibles decorated with original painted floral covers, designed to combine aesthetics with daily study.",
    growthRate: "spiking",
    history: [18, 20, 22, 24, 25.5, 27, 28.5]
  },
  {
    id: "p6",
    category: "products",
    title: "Daily Grace Co Scripture Cards",
    momentum: "+40%",
    volume: "35.1K",
    sentiment: 93,
    description: "Desk card decks with themed scripture verses for anxiety, parenting, and daily encouragement.",
    growthRate: "steady",
    history: [30, 31, 32, 33, 34, 34.6, 35.1]
  },
  {
    id: "p7",
    category: "products",
    title: "Faith Over Fear Vintage Mug",
    momentum: "+10%",
    volume: "19.3K",
    sentiment: 88,
    description: "Handmade ceramic camp mugs engraved with encouraging verses. Popular on study aesthetic posts.",
    growthRate: "slowing",
    history: [19, 19.1, 19.2, 19.3, 19.2, 19.25, 19.3]
  },
  {
    id: "p8",
    category: "products",
    title: "Christian Lofi Study Vinyl",
    momentum: "+145%",
    volume: "11.2K",
    sentiment: 94,
    description: "Physical vinyl records of smooth lo-fi beats blended with classical hymns, designed for study sessions.",
    growthRate: "spiking",
    history: [6, 7, 8, 9, 10, 10.6, 11.2]
  },
  {
    id: "p9",
    category: "products",
    title: "Scripture Memory Ring Cards",
    momentum: "+55%",
    volume: "24.6K",
    sentiment: 91,
    description: "Portable flashcard rings containing key verses for thematic memory systems.",
    growthRate: "steady",
    history: [20, 21, 21.8, 22.5, 23.2, 23.9, 24.6]
  },
  {
    id: "p10",
    category: "products",
    title: "He Reads Truth Study Book",
    momentum: "+35%",
    volume: "16.8K",
    sentiment: 93,
    description: "Thematic men's study workbooks with daily readings, maps, and commentary outlines.",
    growthRate: "steady",
    history: [14, 14.5, 15, 15.4, 15.9, 16.3, 16.8]
  },
  // Events
  {
    id: "e1",
    category: "events",
    title: "Passion Conference 2026",
    momentum: "+450%",
    volume: "180.5K",
    sentiment: 95,
    description: "Annual gathering of college-aged students for praise, prayer, and mission advocacy. Broadcast clips of worship sets generate high sharing velocity.",
    growthRate: "spiking",
    history: [15, 35, 75, 110, 140, 165, 180]
  },
  {
    id: "e2",
    category: "events",
    title: "SEND Conference",
    momentum: "+40%",
    volume: "35.1K",
    sentiment: 93,
    description: "Focus on domestic and international church planting movements. Attendees post live recaps focusing on sacrificial living and community impact.",
    growthRate: "steady",
    history: [30, 31, 32, 33, 34, 34.8, 35.1]
  },
  {
    id: "e3",
    category: "events",
    title: "G3 Conference",
    momentum: "+60%",
    volume: "58.2K",
    sentiment: 91,
    description: "Reformed theology conference focused on local church health, biblical exposition, and expository preaching.",
    growthRate: "steady",
    history: [50, 52, 53, 55, 56, 57, 58.2]
  },
  {
    id: "e4",
    category: "events",
    title: "Legacy Disciple Conference",
    momentum: "+115%",
    volume: "32.1K",
    sentiment: 94,
    description: "Urban discipleship training conference centering on gospel ministry in multi-ethnic contexts.",
    growthRate: "spiking",
    history: [20, 22, 25, 27, 29, 30.5, 32.1]
  },
  {
    id: "e5",
    category: "events",
    title: "Catalyst Leader Conference",
    momentum: "+12%",
    volume: "45.6K",
    sentiment: 89,
    description: "Leadership event highlighting ministry innovation, team building, and cultural engagement.",
    growthRate: "slowing",
    history: [44, 44.5, 45, 45.2, 45.4, 45.5, 45.6]
  },
  {
    id: "e6",
    category: "events",
    title: "Q Ideas Conference",
    momentum: "+48%",
    volume: "38.4K",
    sentiment: 92,
    description: "Collaborative talks focusing on how believers can engage cultural issues faithfully without compromise.",
    growthRate: "steady",
    history: [32, 33, 34, 35.5, 36.4, 37.3, 38.4]
  },
  {
    id: "e7",
    category: "events",
    title: "Together for the Gospel (T4G)",
    momentum: "+8%",
    volume: "68.9K",
    sentiment: 95,
    description: "Legacy bi-annual gathering of pastors celebrating cross-denominational unity around the message of the Gospel.",
    growthRate: "slowing",
    history: [67, 68, 68.5, 68.9, 68.8, 68.85, 68.9]
  },
  {
    id: "e8",
    category: "events",
    title: "Ligonier National Conference",
    momentum: "+50%",
    volume: "74.1K",
    sentiment: 96,
    description: "Theology conference centered on holiness, apologetics, and classical Christian education.",
    growthRate: "steady",
    history: [64, 66, 68, 70, 71.5, 73, 74.1]
  },
  {
    id: "e9",
    category: "events",
    title: "The Gospel Coalition Conference",
    momentum: "+130%",
    volume: "112.5K",
    sentiment: 93,
    description: "National event compiling pastors and teachers for scripture studies, panel debates, and workshop reviews.",
    growthRate: "spiking",
    history: [82, 88, 95, 101, 105, 109, 112.5]
  },
  {
    id: "e10",
    category: "events",
    title: "Asbury Revival Gathering",
    momentum: "+15%",
    volume: "94.2K",
    sentiment: 94,
    description: "Anniversary events commemorating the spontaneous prayer movements, sharing testimonies of lasting impact.",
    growthRate: "slowing",
    history: [90, 91, 92, 93, 93.5, 94, 94.2]
  },
  // Issues
  {
    id: "i1",
    category: "issues",
    title: "Mental Health & Pastoral Burnout",
    momentum: "+175%",
    volume: "52.3K",
    sentiment: 82,
    description: "Increasing open dialogue on pressure, loneliness, and emotional health challenges among ministry leaders. Focuses on setting healthy boundaries.",
    growthRate: "spiking",
    history: [20, 26, 32, 38, 44, 48, 52]
  },
  {
    id: "i2",
    category: "issues",
    title: "Online Fellowship vs Physical Gathering",
    momentum: "+20%",
    volume: "64.0K",
    sentiment: 72,
    description: "Debates around VR churches and digital-only congregation models. High polarization: traditionalists argue physical gathering is non-negotiable.",
    growthRate: "slowing",
    history: [60, 61, 62, 63, 63.5, 63.8, 64]
  },
  {
    id: "i3",
    category: "issues",
    title: "Deconstruction & Apologetics Resurgence",
    momentum: "+145%",
    volume: "78.4K",
    sentiment: 80,
    description: "The rise of 'reconstruction' and apologetic dialogues helping young adults navigate intellectual doubts without leaving the faith.",
    growthRate: "spiking",
    history: [45, 51, 58, 64, 70, 75, 78.4]
  },
  {
    id: "i4",
    category: "issues",
    title: "Biblical Justice vs Secular Ideology",
    momentum: "+50%",
    volume: "92.1K",
    sentiment: 75,
    description: "Sermons and debates distinguishing traditional biblical care for the vulnerable from secular critical theories.",
    growthRate: "steady",
    history: [78, 80, 83, 85, 88, 90, 92.1]
  },
  {
    id: "i5",
    category: "issues",
    title: "Christian Nationalism debates",
    momentum: "+195%",
    volume: "128.5K",
    sentiment: 65,
    description: "Highly polarized online conversations regarding the relationship between national identity, patriotism, and biblical Christianity.",
    growthRate: "spiking",
    history: [82, 90, 99, 108, 115, 122, 128.5]
  },
  {
    id: "i6",
    category: "issues",
    title: "AI in Sermon Writing & Ministry",
    momentum: "+120%",
    volume: "44.3K",
    sentiment: 74,
    description: "Pastoral debates regarding the ethical limits of using large language models for sermon research, outlining, and writing.",
    growthRate: "spiking",
    history: [28, 31, 35, 38, 40, 42, 44.3]
  },
  {
    id: "i7",
    category: "issues",
    title: "Church Abuse Disclosures & Healing",
    momentum: "+65%",
    volume: "64.8K",
    sentiment: 83,
    description: "Advocacy and accountability movements ensuring transparency, policy safety, and pastoral qualification standards.",
    growthRate: "steady",
    history: [54, 56, 58, 60, 62, 63.5, 64.8]
  },
  {
    id: "i8",
    category: "issues",
    title: "Gen Z Exodus & Re-engagement",
    momentum: "+110%",
    volume: "89.2K",
    sentiment: 91,
    description: "Research and ministry shifts focusing on how churches can offer high-challenge discipleship to retain young adults.",
    growthRate: "spiking",
    history: [62, 68, 73, 78, 82, 86, 89.2]
  },
  {
    id: "i9",
    category: "issues",
    title: "Dating & Purity in a Digital Age",
    momentum: "+40%",
    volume: "74.6K",
    sentiment: 86,
    description: "Conversations on how to build biblical relationships amidst dating app culture and high pornography saturation.",
    growthRate: "steady",
    history: [65, 67, 69, 71, 72.5, 73.8, 74.6]
  },
  {
    id: "i10",
    category: "issues",
    title: "Singleness & Community in Churches",
    momentum: "+22%",
    volume: "42.1K",
    sentiment: 89,
    description: "Advocacy for single believers, emphasizing that family in Christ includes those who are not married.",
    growthRate: "slowing",
    history: [39, 39.5, 40, 41, 41.5, 41.8, 42.1]
  },
  // Politics
  {
    id: "pol1",
    category: "politics",
    title: "Religious Liberty Protection Bills",
    momentum: "+125%",
    volume: "88.9K",
    sentiment: 78,
    description: "Legislation shielding faith-based schools, adoption agencies, and nonprofits from compliance mandates that clash with traditional creeds.",
    growthRate: "spiking",
    history: [40, 48, 56, 65, 73, 81, 88]
  },
  {
    id: "pol2",
    category: "politics",
    title: "Global Persecution Awareness Act",
    momentum: "+90%",
    volume: "44.6K",
    sentiment: 87,
    description: "Congressional panels highlighting advocacy measures for believers facing imprisonment or severe safety hazards in restricted regimes.",
    growthRate: "steady",
    history: [25, 28, 32, 35, 38, 41, 44]
  },
  {
    id: "pol3",
    category: "politics",
    title: "Tax-Exempt Status for Faith Orgs",
    momentum: "+35%",
    volume: "54.1K",
    sentiment: 79,
    description: "Filing policy debates concerning tax exclusions for religious institutions, charities, and denominational headquarters.",
    growthRate: "steady",
    history: [48, 49, 50, 51, 52, 53, 54.1]
  },
  {
    id: "pol4",
    category: "politics",
    title: "School Vouchers & Faith Education",
    momentum: "+115%",
    volume: "82.5K",
    sentiment: 85,
    description: "State legislations allocating public funds for school choice, enabling families to utilize vouchers for private Christian academies.",
    growthRate: "spiking",
    history: [52, 58, 65, 70, 75, 79, 82.5]
  },
  {
    id: "pol5",
    category: "politics",
    title: "Adoption & Foster Care disputes",
    momentum: "+45%",
    volume: "62.4K",
    sentiment: 81,
    description: "Legal clashes over whether faith-based placement agencies can maintain traditional marriage requirements for foster parents.",
    growthRate: "steady",
    history: [53, 55, 57, 59, 60.5, 61.5, 62.4]
  },
  {
    id: "pol6",
    category: "politics",
    title: "Protection of Holy Sites",
    momentum: "+140%",
    volume: "75.0K",
    sentiment: 88,
    description: "Global advocacy efforts to protect historic churches, monasteries, and minority Christian populations in active combat areas.",
    growthRate: "spiking",
    history: [45, 50, 56, 61, 66, 71, 75.0]
  },
  {
    id: "pol7",
    category: "politics",
    title: "Congressional Faith Caucus",
    momentum: "+18%",
    volume: "24.2K",
    sentiment: 86,
    description: "Bipartisan legislative groups organizing prayer breakfast panels and highlighting policy reviews on humanitarian aid.",
    growthRate: "slowing",
    history: [22, 22.5, 23, 23.5, 23.8, 24, 24.2]
  },
  {
    id: "pol8",
    category: "politics",
    title: "Pro-Life Advocacy state legislation",
    momentum: "+190%",
    volume: "180.4K",
    sentiment: 70,
    description: "State-level legal briefs, ballot initiatives, and lobbying efforts shaping healthcare, pregnancy center funding, and limits.",
    growthRate: "spiking",
    history: [110, 125, 142, 155, 166, 173, 180.4]
  },
  {
    id: "pol9",
    category: "politics",
    title: "Clergy-Penitent Privilege rulings",
    momentum: "+50%",
    volume: "34.6K",
    sentiment: 76,
    description: "Court reviews detailing the legal boundaries of confession confidentiality in cases involving mandatory reporting laws.",
    growthRate: "steady",
    history: [28, 29, 31, 32, 33, 34, 34.6]
  },
  {
    id: "pol10",
    category: "politics",
    title: "Religious Freedom Protection updates",
    momentum: "+65%",
    volume: "68.2K",
    sentiment: 82,
    description: "Federal and state legal updates protecting individuals from government actions that burden religious practice.",
    growthRate: "steady",
    history: [55, 57, 59, 61, 63, 65, 68.2]
  },
  // Denominations
  {
    id: "d1",
    category: "denominations",
    title: "Non-Denominational Expansion",
    momentum: "+195%",
    volume: "240.2K",
    sentiment: 89,
    description: "Substantial migration of youth from formal hierarchies into community-centric non-denominational hubs. Driven by contemporary aesthetics.",
    growthRate: "spiking",
    history: [110, 130, 155, 180, 202, 224, 240]
  },
  {
    id: "d2",
    category: "denominations",
    title: "Anglican Realignment Shifts",
    momentum: "+50%",
    volume: "68.5K",
    sentiment: 81,
    description: "Global South bishops declaring broken communion with Western divisions over doctrinal compromises. Reshapes worldwide parish dynamics.",
    growthRate: "steady",
    history: [50, 53, 56, 59, 62, 65, 68]
  },
  {
    id: "d3",
    category: "denominations",
    title: "Traditional Latin Mass (Roman Catholic)",
    momentum: "+145%",
    volume: "94.2K",
    sentiment: 85,
    description: "Surging attendance among Gen-Z and Millennial Catholics seeking traditional liturgy, despite diocesan restrictions.",
    growthRate: "spiking",
    history: [52, 60, 68, 75, 82, 89, 94.2]
  },
  {
    id: "d4",
    category: "denominations",
    title: "Western Orthodox Conversion Wave",
    momentum: "+120%",
    volume: "76.1K",
    sentiment: 91,
    description: "Notable increase of young men converting to Eastern Orthodoxy, drawn by historic liturgical depth and ascetic disciplines.",
    growthRate: "spiking",
    history: [42, 48, 55, 61, 66, 71, 76.1]
  },
  {
    id: "d5",
    category: "denominations",
    title: "Reformed Resurgence (Protestant)",
    momentum: "+75%",
    volume: "115.0K",
    sentiment: 92,
    description: "Growth of confessional Reformed and Presbyterian networks, drawn by robust theology podcasts and book studies.",
    growthRate: "steady",
    history: [90, 95, 99, 104, 108, 112, 115.0]
  },
  {
    id: "d6",
    category: "denominations",
    title: "Global South Pentecostal Expansion",
    momentum: "+280%",
    volume: "450.2K",
    sentiment: 95,
    description: "Explosive growth of Pentecostal congregations in Latin America and Sub-Saharan Africa, reshaping global mission strategies.",
    growthRate: "spiking",
    history: [240, 280, 320, 360, 395, 425, 450.2]
  },
  {
    id: "d7",
    category: "denominations",
    title: "Charismatic Deliverance Virality",
    momentum: "+165%",
    volume: "310.4K",
    sentiment: 78,
    description: "Viral TikTok and Instagram Reels showing deliverance prayers and spiritual warfare teachings in charismatic networks.",
    growthRate: "spiking",
    history: [180, 210, 235, 260, 280, 298, 310.4]
  },
  {
    id: "d8",
    category: "denominations",
    title: "Eucharistic Revival (Roman Catholic)",
    momentum: "+80%",
    volume: "180.5K",
    sentiment: 94,
    description: "National movements in the US focused on restoring devotion to the Real Presence in the Eucharist, culminating in massive congresses.",
    growthRate: "steady",
    history: [130, 142, 151, 160, 168, 174, 180.5]
  },
  {
    id: "d9",
    category: "denominations",
    title: "Confessional Lutheran Resurgence",
    momentum: "+35%",
    volume: "48.2K",
    sentiment: 90,
    description: "Growth in listenership for confessional Lutheran media defending classical sacraments and Christ-centered preaching.",
    growthRate: "steady",
    history: [40, 42, 43.5, 45, 46.2, 47.3, 48.2]
  },
  {
    id: "d10",
    category: "denominations",
    title: "Global Methodist Church Scaffolding",
    momentum: "+110%",
    volume: "88.6K",
    sentiment: 87,
    description: "Scaffolding of the new Global Methodist Church as traditionalist congregations disaffiliate from the United Methodist Church.",
    growthRate: "spiking",
    history: [54, 60, 67, 73, 79, 84, 88.6]
  },
  // Churches
  {
    id: "ch1",
    category: "churches",
    title: "Elevation Church",
    momentum: "+85%",
    volume: "380.0K",
    sentiment: 86,
    description: "Charlotte-based hub. Their worship releases capture rapid global momentum on playlists. Short sermon clips on Instagram Reels get massive reach.",
    growthRate: "steady",
    history: [300, 315, 330, 345, 360, 372, 380]
  },
  {
    id: "ch2",
    category: "churches",
    title: "Passion City Church",
    momentum: "+140%",
    volume: "195.4K",
    sentiment: 94,
    description: "Atlanta-based church. High engagement during conferences. Notable for worship albums, biblical teaching, and collegiate outreach initiatives.",
    growthRate: "spiking",
    history: [100, 118, 135, 152, 168, 182, 195]
  },
  {
    id: "ch3",
    category: "churches",
    title: "Redeemer Presbyterian NY",
    momentum: "+45%",
    volume: "88.2K",
    sentiment: 92,
    description: "Multi-site NYC congregation. Famous for public integration of faith and work and intellectual cultural engagement.",
    growthRate: "steady",
    history: [78, 80, 82, 84, 85.5, 87, 88.2]
  },
  {
    id: "ch4",
    category: "churches",
    title: "Bethel Church Redding",
    momentum: "+90%",
    volume: "310.5K",
    sentiment: 80,
    description: "Highly influential charismatic hub. Their worship music and ministry school shape charismatic theology globally.",
    growthRate: "steady",
    history: [250, 265, 278, 288, 297, 305, 310.5]
  },
  {
    id: "ch5",
    category: "churches",
    title: "Grace Community Church LA",
    momentum: "+70%",
    volume: "145.2K",
    sentiment: 87,
    description: "Expository preaching center in Los Angeles. Known for robust biblical teaching, eldership training, and legal religious freedom battles.",
    growthRate: "steady",
    history: [128, 131, 134, 137, 140, 143, 145.2]
  },
  {
    id: "ch6",
    category: "churches",
    title: "The Village Church",
    momentum: "+15%",
    volume: "98.4K",
    sentiment: 90,
    description: "Dallas-area congregation. Known for gospel-centered covenant membership and rich study curriculums.",
    growthRate: "slowing",
    history: [96, 97, 98, 97.5, 98.2, 98, 98.4]
  },
  {
    id: "ch7",
    category: "churches",
    title: "Cornerstone Fellowship",
    momentum: "+65%",
    volume: "42.6K",
    sentiment: 91,
    description: "Bay Area community church utilizing online streaming and hybrid cell groups to reach tech workers.",
    growthRate: "steady",
    history: [34, 36, 38, 39.5, 41, 42, 42.6]
  },
  {
    id: "ch8",
    category: "churches",
    title: "Times Square Church",
    momentum: "+50%",
    volume: "115.3K",
    sentiment: 94,
    description: "Interdenominational congregation in Manhattan known for global aid missions and multi-ethnic choir worship sets.",
    growthRate: "steady",
    history: [98, 102, 105, 108, 111, 113, 115.3]
  },
  {
    id: "ch9",
    category: "churches",
    title: "Biltmore Church",
    momentum: "+125%",
    volume: "64.1K",
    sentiment: 93,
    description: "Fast-growing multi-site church in North Carolina focusing on local community impact and collegiate small groups.",
    growthRate: "spiking",
    history: [42, 46, 51, 55, 59, 62, 64.1]
  },
  {
    id: "ch10",
    category: "churches",
    title: "Passion City Church DC",
    momentum: "+115%",
    volume: "82.3K",
    sentiment: 95,
    description: "Washington D.C. extension of Passion City Church, pulling high college-age and young professional attendance.",
    growthRate: "spiking",
    history: [55, 60, 66, 71, 75, 79, 82.3]
  },
  // Pastors
  {
    id: "pas1",
    category: "pastors",
    title: "John Piper",
    momentum: "+35%",
    volume: "150.0K",
    sentiment: 95,
    description: "Founder of DesiringGod. Known for 'Ask Pastor John' podcast shorts tackling detailed theological queries, maintaining a highly active online teaching shelf.",
    growthRate: "steady",
    history: [135, 138, 141, 144, 147, 148, 150]
  },
  {
    id: "pas2",
    category: "pastors",
    title: "Francis Chan",
    momentum: "+105%",
    volume: "94.2K",
    sentiment: 91,
    description: "Teaching focusing on radical self-denial, house church models, and international missions. Visual reels focus on prayer depth and house church formats.",
    growthRate: "spiking",
    history: [50, 58, 67, 75, 83, 89, 94]
  },
  {
    id: "pas3",
    category: "pastors",
    title: "Steven Furtick",
    momentum: "+65%",
    volume: "340.2K",
    sentiment: 83,
    description: "Pastor of Elevation Church. Known for highly dynamic preaching style and integration of songwriting with weekly messages.",
    growthRate: "steady",
    history: [300, 310, 318, 325, 331, 336, 340.2]
  },
  {
    id: "pas4",
    category: "pastors",
    title: "Timothy Keller (Legacy)",
    momentum: "+15%",
    volume: "210.0K",
    sentiment: 98,
    description: "Legacy apologetics author and church planter. His books on reason, idolatry, and grace remain extremely high-performing.",
    growthRate: "slowing",
    history: [208, 209, 210, 209, 210, 209.5, 210]
  },
  {
    id: "pas5",
    category: "pastors",
    title: "John MacArthur",
    momentum: "+45%",
    volume: "195.4K",
    sentiment: 86,
    description: "Radio teacher and author. Known for uncompromising expository preaching, strict scriptural literalism, and defense of cessationism.",
    growthRate: "steady",
    history: [178, 182, 186, 189, 191, 193, 195.4]
  },
  {
    id: "pas6",
    category: "pastors",
    title: "Alistair Begg",
    momentum: "+50%",
    volume: "112.5K",
    sentiment: 94,
    description: "Scottish-born pastor of Truth for Life. Popular for warm, humorous, yet deeply traditional expository teaching.",
    growthRate: "steady",
    history: [98, 101, 104, 107, 109, 111, 112.5]
  },
  {
    id: "pas7",
    category: "pastors",
    title: "Priscilla Shirer",
    momentum: "+120%",
    volume: "180.2K",
    sentiment: 97,
    description: "Bible teacher and author. Known for expository teaching on spiritual warfare, prayer, and discipled womanhood.",
    growthRate: "spiking",
    history: [110, 125, 138, 149, 159, 170, 180.2]
  },
  {
    id: "pas8",
    category: "pastors",
    title: "Matt Chandler",
    momentum: "+22%",
    volume: "105.4K",
    sentiment: 92,
    description: "Acts 29 president. Popular for high-energy preaching highlighting the weight of the gospel and covenant church membership.",
    growthRate: "slowing",
    history: [101, 102, 103, 104, 104.5, 105, 105.4]
  },
  {
    id: "pas9",
    category: "pastors",
    title: "Jackie Hill Perry (Speaker)",
    momentum: "+130%",
    volume: "245.0K",
    sentiment: 94,
    description: "Teacher and author known for direct, scripturally rigid messages on holiness, obedience, and theological discernment.",
    growthRate: "spiking",
    history: [180, 192, 205, 218, 228, 238, 245.0]
  },
  {
    id: "pas10",
    category: "pastors",
    title: "Paul Washer",
    momentum: "+115%",
    volume: "115.1K",
    sentiment: 89,
    description: "Founder of HeartCry Missionary Society. Known for intense, challenging sermons on holiness, repentance, and historical missionary devotion.",
    growthRate: "spiking",
    history: [82, 89, 97, 103, 108, 112, 115.1]
  }
];

export const MOCK_PLATFORM_TOP10: PlatformTop10Item[] = [
  // TikTok
  { rank: 1, handle: "@bible_reads", name: "Daily Scripture Read", score: "98.7", growth: "+45%", platform: "tiktok", contentPreview: "Typographic text overlays of Psalms over calm aesthetic forest loops." },
  { rank: 2, handle: "@kingdom_fits", name: "Kingdom Streetwear", score: "94.2", growth: "+120%", platform: "tiktok", contentPreview: "Showing how to style oversized faith hoodies with vintage denim." },
  { rank: 3, handle: "@apologetics_guy", name: "The Faith Defender", score: "91.8", growth: "+88%", platform: "tiktok", contentPreview: "Rapid fire rebuttals to popular atheist contentions on college campuses." },
  { rank: 4, handle: "@christian_comedy", name: "Squeaky Clean Humour", score: "89.5", growth: "+22%", platform: "tiktok", contentPreview: "Relatable sketches about church potlucks, choir members, and long sermons." },
  { rank: 5, handle: "@worship_covers", name: "Acoustic Praise", score: "87.0", growth: "+54%", platform: "tiktok", contentPreview: "Raw close-up guitar covers of popular modern worship anthems." },
  { rank: 6, handle: "@prayer_journal", name: "The Morning Prayer", score: "85.4", growth: "+15%", platform: "tiktok", contentPreview: "Simulated journal flips and soothing audio for quiet times." },
  { rank: 7, handle: "@theology_bytes", name: "Bite-Sized Truth", score: "83.1", growth: "+40%", platform: "tiktok", contentPreview: "60-second illustrations detailing historic church creeds." },
  { rank: 8, handle: "@church_tech", name: "Media Booth Life", score: "81.9", growth: "+95%", platform: "tiktok", contentPreview: "Humorous clips about sound board glitches and lighting cues." },
  { rank: 9, handle: "@hebrew_roots", name: "Hebrew Word Studies", score: "79.2", growth: "+31%", platform: "tiktok", contentPreview: "Drawing original Hebrew glyphs and explaining structural double meanings." },
  { rank: 10, handle: "@pastor_reacts", name: "Pastor Joe Reacts", score: "78.0", growth: "+75%", platform: "tiktok", contentPreview: "Friendly pastor reacts to secular viral trends and adds biblical advice." },

  // Instagram
  { rank: 1, handle: "@shirertruth", name: "Priscilla Shirer Fan", score: "97.5", growth: "+25%", platform: "instagram", contentPreview: "Sermon quotes beautifully styled on textured canvas backgrounds." },
  { rank: 2, handle: "@chosen_fanpage", name: "The Chosen Updates", score: "95.0", growth: "+150%", platform: "instagram", contentPreview: "Stills from season filming and character backstories from the cast." },
  { rank: 3, handle: "@bibleproject", name: "The Bible Project Official", score: "93.4", growth: "+50%", platform: "instagram", contentPreview: "Carousel graphics explaining specific words like 'Hesed' or 'Shalom'." },
  { rank: 4, handle: "@asbury_revived", name: "Asbury Rhythms", score: "90.2", growth: "+10%", platform: "instagram", contentPreview: "Acoustic video clips of students singing in chapel halls." },
  { rank: 5, handle: "@christian_memes", name: "Reverent Memes", score: "88.7", growth: "+35%", platform: "instagram", contentPreview: "Sarcastic yet clean jokes about church coffee and sermon notes." },
  { rank: 6, handle: "@gospel_streetwear", name: "Gospel Threads", score: "86.1", growth: "+80%", platform: "instagram", contentPreview: "Lookbooks of models posing in downtown settings with biblical hoodies." },
  { rank: 7, handle: "@faith_over_fear", name: "Daily Devotional Art", score: "84.0", growth: "+12%", platform: "instagram", contentPreview: "Elegant calligraphy overlays on pictures of sunrises." },
  { rank: 8, handle: "@marriage_disciples", name: "Discipled Marriage", score: "82.5", growth: "+28%", platform: "instagram", contentPreview: "Couples discussing tips on conflict resolution and prayer habits." },
  { rank: 9, handle: "@theology_visuals", name: "Visual Theology", score: "81.0", growth: "+45%", platform: "instagram", contentPreview: "Diagrams detailing the covenants and historical timelines." },
  { rank: 10, handle: "@missions_journal", name: "Frontline Missions", score: "79.8", growth: "+62%", platform: "instagram", contentPreview: "Photo essays documenting community water well projects in Kenya." },

  // YouTube
  { rank: 1, handle: "@BibleProject", name: "BibleProject Channel", score: "99.1", growth: "+38%", platform: "youtube", contentPreview: "10-minute animated series detailing entire books of the Bible." },
  { rank: 2, handle: "@MelissaDougherty", name: "Melissa Dougherty", score: "96.4", growth: "+105%", platform: "youtube", contentPreview: "Long-form reviews of New Age practices contrasted with historic theology." },
  { rank: 3, handle: "@RuslanKD_Official", name: "Ruslan KD commentary", score: "94.8", growth: "+95%", platform: "youtube", contentPreview: "15-minute video essays discussing culture, hip-hop, and Christian news." },
  { rank: 4, handle: "@DesiringGod", name: "Desiring God Teachings", score: "93.0", growth: "+15%", platform: "youtube", contentPreview: "Audio resources and short video shorts featuring Alistair Begg and John Piper." },
  { rank: 5, handle: "@InspiringPhilosophy", name: "Inspiring Philosophy", score: "91.2", growth: "+70%", platform: "youtube", contentPreview: "Detailed scientific and historical defenses of the Genesis accounts." },
  { rank: 6, handle: "@WorshipTogether", name: "Worship Together Live", score: "89.0", growth: "+30%", platform: "youtube", contentPreview: "New acoustic song launches and tutorials for church worship bands." },
  { rank: 7, handle: "@ApostleClips", name: "Apologetics Debate Hub", score: "87.5", growth: "+42%", platform: "youtube", contentPreview: "Clips of public debates between leading Christian and skeptic scholars." },
  { rank: 8, handle: "@MikeWinger", name: "Mike Winger - BibleThinker", score: "86.0", growth: "+55%", platform: "youtube", contentPreview: "Long-form verse-by-verse teachings answering thousands of specific questions." },
  { rank: 9, handle: "@SaddlebackChurch", name: "Saddleback online", score: "84.3", growth: "+5%", platform: "youtube", contentPreview: "Full Sunday sermons focused on practical lifestyle improvements." },
  { rank: 10, handle: "@StreetWorship", name: "Street Worship Encounters", score: "82.1", growth: "+110%", platform: "youtube", contentPreview: "Unrehearsed public street singing gatherings and testimonies." },

  // Facebook
  { rank: 1, handle: "@DesiringGodFB", name: "Desiring God", score: "96.2", growth: "+12%", platform: "facebook", contentPreview: "Links to articles regarding prayer depth and sanctified parenting." },
  { rank: 2, handle: "@ChristianityToday", name: "Christianity Today News", score: "92.8", growth: "+8%", platform: "facebook", contentPreview: "Analytical reports regarding global church growth and local ministry trends." },
  { rank: 3, handle: "@BillyGrahamAssoc", name: "Billy Graham Evangelistic Association", score: "90.5", growth: "+15%", platform: "facebook", contentPreview: "Inspirational clips from archives and prayer hotline details." },
  { rank: 4, handle: "@KLoveRadio", name: "K-LOVE Radio Station", score: "89.0", growth: "+20%", platform: "facebook", contentPreview: "Shareable verse-of-the-day image cards and artist news." },
  { rank: 5, handle: "@ChurchesPlantNetwork", name: "The Church Planting Network", score: "86.4", growth: "+32%", platform: "facebook", contentPreview: "Status updates from church planters sharing stories of local impact." },
  { rank: 6, handle: "@ChristianQuotes", name: "Inspiring Christian Quotes", score: "84.9", growth: "+5%", platform: "facebook", contentPreview: "Classic quotes from Spurgeon, Lewis, and Bonhoeffer in clean frames." },
  { rank: 7, handle: "@BibleDailyStudy", name: "Daily Bible Verse Community", score: "83.0", growth: "+18%", platform: "facebook", contentPreview: "Daily verses where users comment their personal prayers and concerns." },
  { rank: 8, handle: "@FocusOnFamily", name: "Focus on the Family", score: "82.1", growth: "+10%", platform: "facebook", contentPreview: "Links to podcast episodes on raising kids, marriage, and family values." },
  { rank: 9, handle: "@AnglicanCommunion", name: "Anglican Diocese Network", score: "79.5", growth: "+14%", platform: "facebook", contentPreview: "Announcements of conferences and statements on global issues." },
  { rank: 10, handle: "@GrandmasPrayers", name: "Grandma's Prayer Circle", score: "78.2", growth: "+40%", platform: "facebook", contentPreview: "Post templates asking for prayer requests for children and grandchildren." },

  // X (Twitter)
  { rank: 1, handle: "@johnpiper", name: "John Piper", score: "97.1", growth: "+18%", platform: "x", contentPreview: "Short, pithy theological claims emphasizing the supremacy of Christ." },
  { rank: 2, handle: "@daily_bible", name: "Scripture Daily", score: "94.5", growth: "+350%", platform: "x", contentPreview: "Bot account posting one verse every 4 hours. Gets massive retweets." },
  { rank: 3, handle: "@CSLewisQuotes", name: "C.S. Lewis Quotes", score: "92.0", growth: "+40%", platform: "x", contentPreview: "Paragraphs extracted from Mere Christianity and The Screwtape Letters." },
  { rank: 4, handle: "@raycomfort", name: "Ray Comfort", score: "89.8", growth: "+28%", platform: "x", contentPreview: "Evangelistic street encounter video links and open-air apologetics tips." },
  { rank: 5, handle: "@jackiehillperry", name: "Jackie Hill Perry", score: "88.2", growth: "+45%", platform: "x", contentPreview: "Direct statements challenging culture, church complacency, and pride." },
  { rank: 6, handle: "@TheologyPro", name: "Theology & Grace", score: "85.9", growth: "+75%", platform: "x", contentPreview: "Threads dissecting Reformational vs Arminian viewpoints." },
  { rank: 7, handle: "@AlbertMohler", name: "Albert Mohler", score: "84.0", growth: "+10%", platform: "x", contentPreview: "Commentary links regarding modern news events analyzed via Christian worldview." },
  { rank: 8, handle: "@WorshipLeader", name: "Worship Leader Tips", score: "82.4", growth: "+52%", platform: "x", contentPreview: "Encouragements and book lists for worship ministry directors." },
  { rank: 9, handle: "@HeIsRisen", name: "The Kingdom Truth", score: "81.0", growth: "+115%", platform: "x", contentPreview: "Short prayers and quotes concerning faith endurance during trials." },
  { rank: 10, handle: "@creed_insights", name: "Creedal Christian", score: "79.1", growth: "+64%", platform: "x", contentPreview: "Threads highlighting specific quotes from Early Church Fathers." }
];

export const MOCK_VIRAL_IDEAS: Record<string, ViralIdea[]> = {
  "Bible Study & Theology": [
    {
      id: "vi_bst_1",
      niche: "Bible Study & Theology",
      platform: "TikTok",
      title: "The Hebrew Word that Changes How You Read Genesis",
      hook: "If you read Genesis in English, you missed this mind-blowing Hebrew word...",
      probability: 96,
      outlierFactor: "Focuses on linguistic secrets rather than standard commentary, which triggers curiosity loops.",
      viewerPayoff: "Viewer learns a specific Hebrew root word and feels equipped with deep scripture knowledge.",
      scriptOutline: [
        "Hook: Call out the gap in English translations.",
        "Introduce the word 'Bereshit' or 'Bara' and explain its structural blueprint.",
        "Compare typical assumptions with historic theological depth.",
        "Call to action: Comment if this changed your perspective, and bookmark for your next study."
      ]
    },
    {
      id: "vi_bst_2",
      niche: "Bible Study & Theology",
      platform: "Instagram",
      title: "Stop Reading the Bible in Isolated Verses (Here's Why)",
      hook: "This one reading mistake is completely distorting your study...",
      probability: 88,
      outlierFactor: "Constructive confrontation of common habits leads to high saving and sharing.",
      viewerPayoff: "A simple 3-step blueprint to study full scripture chapters in contextual flow.",
      scriptOutline: [
        "Hook: Show a widely misused single verse (e.g. Jeremiah 29:11).",
        "Explain the historical context (who was the prophet talking to?).",
        "Provide the 'Bookend Rule' for reading paragraphs instead of sentences.",
        "CTA: Share this with a friend who loves studying theology."
      ]
    },
    {
      id: "vi_bst_3",
      niche: "Bible Study & Theology",
      platform: "YouTube",
      title: "How I Study Difficult Passages (My 4-Step System)",
      hook: "Most people skip the hardest verses in scripture, but that's where the gold is...",
      probability: 91,
      outlierFactor: "Step-by-step practical dashboard tutorial showing physical notebooks and software.",
      viewerPayoff: "Actionable system to tackle complex biblical texts without feeling overwhelmed.",
      scriptOutline: [
        "Hook: Display a difficult theological controversy.",
        "Step 1: The Observation Phase (highlighting repeated nouns).",
        "Step 2: Cross-referencing other books.",
        "Step 3: consulting historical commentary.",
        "Step 4: Writing prayerful application steps.",
        "CTA: Subscribe for weekly long-form study walkthroughs."
      ]
    }
  ],
  "Worship & Worship Music": [
    {
      id: "vi_wwm_1",
      niche: "Worship & Worship Music",
      platform: "TikTok",
      title: "Why Modern Worship Songs Hit Differently (Acoustic Secrets)",
      hook: "Ever wondered why this chord progression makes you feel so close to heaven?",
      probability: 94,
      outlierFactor: "Combines music theory breakdown with heartfelt spiritual encouragement.",
      viewerPayoff: "Learn how simple chord resolutions mimic biblical restoration stories.",
      scriptOutline: [
        "Hook: Play a specific chord progression on guitar or piano.",
        "Explain the movement from tension (4th chord) to resolution (1st chord).",
        "Connect the musical tension to our spiritual waiting periods.",
        "CTA: Tag your church worship team leader in the comments."
      ]
    },
    {
      id: "vi_wwm_2",
      niche: "Worship & Worship Music",
      platform: "Instagram",
      title: "The Behind-the-Scenes of Writing an Original Hymn",
      hook: "I spent 30 days trying to write a song that captures God's holiness...",
      probability: 85,
      outlierFactor: "Authentic vulnerable documentation of creative struggles.",
      viewerPayoff: "Inspirational narrative about prayer, songwriting, and devotion.",
      scriptOutline: [
        "Hook: Play the opening vocal line of the song.",
        "Vlog style clip: Sitting at a piano, scribbling lyrics, crossing them out.",
        "Share the scripture that inspired the chorus (e.g., Isaiah 6).",
        "CTA: Save this sound and let me know if you want the full chords sheet."
      ]
    }
  ],
  "Streetwear & Kingdom Fashion": [
    {
      id: "vi_skf_1",
      niche: "Streetwear & Kingdom Fashion",
      platform: "TikTok",
      title: "Aesthetic Christian Outfits that aren't Cheesy",
      hook: "You want to represent Christ, but you don't want to look like you're wearing camp shirts...",
      probability: 92,
      outlierFactor: "Directly addresses the stereotype of 'cringe' Christian apparel with clean styling.",
      viewerPayoff: "3 lookbooks matching oversized wash tees, Hebrew typography, and cargo pants.",
      scriptOutline: [
        "Hook: Show a stereotypical loud design vs a minimal washed streetwear design.",
        "Look 1: Oversized Hebrew script tee styled with black jeans.",
        "Look 2: Boxy beige scripture graphic hoodie styled with neutral trousers.",
        "Look 3: Minimalist emblem cap and corduroy shirt combo.",
        "CTA: Links to the items in bio. Comment which look you'd rock!"
      ]
    }
  ],
  "Apologetics & Faith Defense": [
    {
      id: "vi_afd_1",
      niche: "Apologetics & Faith Defense",
      platform: "YouTube",
      title: "Answering the Hardest Objection to Christianity in 3 Minutes",
      hook: "If God is good, why is there so much suffering? Here is the absolute best answer...",
      probability: 95,
      outlierFactor: "Clear logical pacing that avoids dismissive answers and validates human pain.",
      viewerPayoff: "A coherent, scriptural defense of God's goodness in a broken world.",
      scriptOutline: [
        "Hook: State the objection clearly and empathetically.",
        "Explain the free will perspective and the necessity of real love.",
        "Discuss the Christian uniqueness: A God who enters suffering (the Cross) rather than watching from afar.",
        "CTA: Drop your thoughts below; let's keep the dialogue respectful."
      ]
    }
  ]
};

// Fallback generator database for other categories
export const GENERIC_IDEAS_DATABASE: Record<string, string[]> = {
  topics: [
    "The secret habit that transformed my prayer life",
    "How to respond when friends criticize your faith",
    "The historical proof for scripture that skeptics ignore",
    "Why modern busy schedules are killing your devotion",
    "A biblical response to anxiety that actually works",
    "How to discipled your family when you're exhausted",
    "The theology behind digital church fellowship",
    "5 scriptures to read when you feel completely lost"
  ],
  hooks: [
    "Most believers get this completely backwards, but once you understand it...",
    "If you struggle to stay consistent in prayer, try this 2-minute rule...",
    "I was reading church history and found this warning we are ignoring...",
    "The bible actually gave a warning about this exact situation thousands of years ago..."
  ],
  outliers: [
    "Utilizes ancient desert fathers advice instead of modern self-help tips.",
    "Highlights archeological findings that were recently excavated.",
    "Taps into the Gen-Z 'quiet lifestyle' aesthetic with slow-paced shots.",
    "Uses high contrast dark background templates with minimal serif typography."
  ],
  payoffs: [
    "A tangible daily journaling checklist that takes less than 3 minutes.",
    "Understanding the historical validity of the resurrection account.",
    "A simple prayer structure (A.C.T.S.) to structure busy mornings.",
    "An immediate feeling of relief backed by scripture on anxiety."
  ]
};
