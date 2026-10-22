/**
 * PROJECT DATA
 * -------------------------------------------------------------
 * Every project drives both the gallery item and its case-study page.
 *
 * MEDIA OBJECTS
 * Each `media` entry is either:
 *   { kind: 'artwork', variant: 'phone', props: { screen: 'home' }, ratio: '4/5', caption: '…' }
 *     → an original CSS/SVG composition rendered by <Artwork /> (see components/Artwork.jsx)
 *   { kind: 'image', src: '/projects/ecommerce/home.jpg', alt: '…', ratio: '4/5', caption: '…' }
 *     → a real screenshot you drop into /public/projects/<slug>/
 *
 * To replace concept artwork with real work, swap the `kind: 'artwork'` entries
 * for `kind: 'image'` entries. Nothing else needs to change.
 *
 * HONESTY FLAGS
 * `concept: true` marks a project whose visuals are illustrative. The UI labels
 * these clearly. Do not invent clients, metrics or outcomes here.
 */

export const projects = [
  {
    slug: 'visual-identity-brand-systems',
    number: '01',
    title: 'Visual Identity & Brand Systems',
    shortTitle: 'Identity Systems',
    category: 'Branding',
    tagline: 'Logo exploration, typography, colour systems and the places a brand actually lives.',
    year: '2025',
    role: 'Visual Designer',
    tools: ['Figma', 'Illustrator', 'Photoshop', 'Canva'],
    concept: true,
    conceptNote:
      'Mockups shown here are portfolio visuals created to demonstrate the identity process. They are not claims about undisclosed client deliverables.',
    accent: 'orange',
    size: 'wide',
    cover: { kind: 'artwork', variant: 'monogram', props: { scheme: 'ivory' }, ratio: '16/10' },
    thumb: { kind: 'artwork', variant: 'monogram', props: { scheme: 'ivory' }, ratio: '4/3' },
    overview:
      'A brand system is a set of decisions that keeps a business looking like itself across menus, social posts, signage and screens. This study walks through how I build one: starting from a mark, extending it into a typographic voice and colour system, and then stress-testing it on real applications — including the kind of menu design and promotional graphics I produce as a Visual Designer for Marigold Fine Indian Cuisine.',
    caseStudy: {
      labels: { problem: 'The brief', goals: 'What the system had to do', research: 'Context & references', flow: 'System architecture', wireframes: 'Mark exploration', visual: 'Typography & colour', screens: 'Applications', interaction: 'Flexibility across formats' },
      problem:
        'Small hospitality businesses usually accumulate visuals rather than design them: a logo from one place, a menu from another, social posts from whoever had time. The result is noise. The brief was to define a compact, reusable system that a non-designer could keep consistent week after week.',
      goals: [
        'One mark that works at 16px as a favicon and at two metres on a window.',
        'A typographic pairing that feels warm and premium without looking like every other restaurant.',
        'A colour system with clear roles — not just a palette, but rules for where each colour goes.',
        'Templates for the recurring jobs: menus, promotions, and social creatives.',
      ],
      research: {
        intro: 'Before drawing anything I collected the recurring jobs the brand needs done and audited how competing venues present themselves.',
        insights: [
          { title: 'Menus are the brand’s most-read document', text: 'Guests spend more time with the menu than with any poster. Type hierarchy and spacing there matter more than decoration.' },
          { title: 'Warmth comes from contrast, not from ornament', text: 'The references that felt most premium paired a confident sans with a quiet serif and lots of ivory space.' },
          { title: 'Most assets are produced in a hurry', text: 'A system that depends on a designer being present will fail. Templates and rules beat one-off artwork.' },
        ],
      },
      flow: {
        intro: 'The system is organised in layers so each application inherits from the one above it.',
        steps: ['Core mark & wordmark', 'Type voice (display / serif / mono)', 'Colour roles', 'Grid & spacing', 'Templates: menu, promo, social'],
        media: { kind: 'artwork', variant: 'ia', props: { scheme: 'ivory', root: 'BRAND', nodes: ['Mark', 'Type', 'Colour', 'Grid', 'Templates'] }, ratio: '16/9', caption: 'Layered system — each application inherits from the layer above.' },
      },
      wireframes: {
        intro: 'Marks are explored as families: dozens of fast variations on a few constructions before refining a single direction.',
        media: [
          { kind: 'artwork', variant: 'marks', props: { scheme: 'ivory' }, ratio: '4/3', caption: 'Exploration sheet — geometric constructions of a monogram.' },
          { kind: 'artwork', variant: 'monogram', props: { scheme: 'ink' }, ratio: '4/3', caption: 'Refined mark on ink.' },
        ],
      },
      visual: {
        intro: 'Type and colour are specified as roles, so the question is never “which orange?” but “is this a highlight or a background?”.',
        colors: [
          { name: 'Ivory', hex: '#F4F0E8', role: 'Surface' },
          { name: 'Ink', hex: '#171717', role: 'Text & mark' },
          { name: 'Marigold', hex: '#FF4D24', role: 'Highlight' },
          { name: 'Cobalt', hex: '#304FFE', role: 'Secondary accent' },
          { name: 'Stone', hex: '#888780', role: 'Metadata' },
        ],
        type: [
          { family: 'Space Grotesk', role: 'Display & headings', sample: 'Aa' },
          { family: 'Instrument Serif', role: 'Editorial moments', sample: 'Aa' },
          { family: 'JetBrains Mono', role: 'Prices, labels, data', sample: '01' },
        ],
        media: { kind: 'artwork', variant: 'palette', props: { scheme: 'ivory' }, ratio: '16/9', caption: 'Colour roles and type specimen.' },
      },
      screens: {
        intro: 'The real test is the boring stuff: can the system make a Tuesday lunch menu look like it belongs to the same brand as the launch poster?',
        media: [
          { kind: 'artwork', variant: 'menu', props: { scheme: 'ivory' }, ratio: '3/4', caption: 'Menu layout — hierarchy, spacing and mono prices.' },
          { kind: 'artwork', variant: 'poster', props: { scheme: 'orange', text: 'SPICE\nIS A\nFEELING.' }, ratio: '3/4', caption: 'Promotional poster template.' },
          { kind: 'artwork', variant: 'social', props: { scheme: 'ivory' }, ratio: '1/1', caption: 'Social creative set.' },
          { kind: 'artwork', variant: 'poster', props: { scheme: 'ink', text: 'OPEN\nLATE.' }, ratio: '1/1', caption: 'Window / signage variant.' },
        ],
      },
      interaction: {
        intro: 'A system has to bend without breaking. These are the rules that keep it recognisable at every size.',
        points: [
          'Mark simplifies to a single glyph below 32px; wordmark drops entirely as a favicon.',
          'Ivory is the default surface; ink inverts for night-time and signage uses.',
          'Highlight colour appears on one element per composition — never two.',
          'Mono type is reserved for data: prices, dates, addresses.',
        ],
        media: { kind: 'artwork', variant: 'responsive', props: { scheme: 'ivory' }, ratio: '16/9', caption: 'The same template at three widths.' },
      },
      reflection: {
        text: 'Working on recurring hospitality assets taught me that the quality of a brand lives in its tenth menu, not its first poster. The system is only successful if someone with Canva and twenty minutes can keep it looking right.',
        next: ['Build a motion guideline for short social clips.', 'Produce an accessibility pass for menu contrast in low light.'],
      },
    },
  },

  {
    slug: 'ecommerce-app-experience',
    number: '02',
    title: 'E-commerce App Experience',
    shortTitle: 'E-commerce App',
    category: 'UI/UX Case Study',
    tagline: 'From messy workflow to a shopping flow people can finish on a bus.',
    year: '2024 — 2025',
    role: 'UX Designer',
    tools: ['Figma', 'Adobe XD'],
    concept: true,
    conceptNote:
      'Inspired by the e-commerce application I contributed to at Softechpark — from initial concept through interactive prototyping. Screens, data and flows shown here are illustrative re-creations, not the client’s product.',
    accent: 'cobalt',
    size: 'tall',
    cover: { kind: 'artwork', variant: 'responsive', props: { scheme: 'cobalt' }, ratio: '16/10' },
    thumb: { kind: 'artwork', variant: 'phone', props: { screen: 'home', scheme: 'cobalt' }, ratio: '4/5' },
    overview:
      'At Softechpark I collaborated with engineers and project managers to turn complex workflows into user-friendly interfaces, and contributed to an e-commerce app from idea to interactive prototype. This case study reconstructs the shape of that work: the problem framing, the flow decisions and the interface system — using conceptual screens so nothing confidential is shown.',
    caseStudy: {
      problem:
        'Shopping apps fail in the gaps between screens: search that returns too much, product pages that hide the one detail someone needs, and checkouts that ask for everything at once. The challenge was to design a flow where every step feels like it has exactly one job.',
      goals: [
        'Let a first-time user find and buy a product in under five taps from the home screen.',
        'Make product pages scannable — price, availability, variants and delivery visible without scrolling.',
        'Design a checkout that asks for information in the order people are willing to give it.',
        'Build a component library the engineering team could implement consistently.',
      ],
      research: {
        intro: 'Research was lightweight and continuous: conversations with stakeholders, a review of comparable apps, and informal walkthroughs with people who shop on their phones.',
        insights: [
          { title: 'Search is the home screen', text: 'Most sessions started with intent. Browsing categories was secondary, so search needed prime real estate.' },
          { title: 'Trust is built on the product page', text: 'Delivery time and return policy were asked about more than product features.' },
          { title: 'Checkout anxiety is about surprises', text: 'People abandon when the total changes late. Showing the full cost early reduced hesitation in walkthroughs.' },
        ],
      },
      flow: {
        intro: 'The primary flow was mapped first, then edge cases were layered on so they never interrupted the happy path.',
        steps: ['Home / search', 'Results & filters', 'Product detail', 'Cart review', 'Address & payment', 'Confirmation'],
        media: { kind: 'artwork', variant: 'flow', props: { scheme: 'ivory', nodes: ['Home', 'Search', 'Results', 'Product', 'Cart', 'Checkout', 'Done'] }, ratio: '16/9', caption: 'Primary purchase flow — illustrative.' },
      },
      wireframes: {
        intro: 'Low-fidelity wireframes were used to argue about hierarchy before anyone argued about colour.',
        media: [
          { kind: 'artwork', variant: 'wireframe', props: { device: 'phone', screen: 'home' }, ratio: '4/5', caption: 'Home — search-first layout.' },
          { kind: 'artwork', variant: 'wireframe', props: { device: 'phone', screen: 'product' }, ratio: '4/5', caption: 'Product — key facts above the fold.' },
          { kind: 'artwork', variant: 'wireframe', props: { device: 'phone', screen: 'checkout' }, ratio: '4/5', caption: 'Checkout — one question per step.' },
        ],
      },
      visual: {
        intro: 'The interface system keeps cobalt for action and lets product imagery carry the colour.',
        colors: [
          { name: 'Surface', hex: '#F4F0E8', role: 'Background' },
          { name: 'Ink', hex: '#171717', role: 'Text' },
          { name: 'Cobalt', hex: '#304FFE', role: 'Primary action' },
          { name: 'Signal', hex: '#FF4D24', role: 'Alerts & badges' },
          { name: 'Stone', hex: '#888780', role: 'Secondary text' },
        ],
        type: [
          { family: 'Space Grotesk', role: 'Titles & prices', sample: 'Aa' },
          { family: 'Inter', role: 'Body & UI labels', sample: 'Aa' },
          { family: 'JetBrains Mono', role: 'Order IDs, SKUs', sample: '#1' },
        ],
        media: { kind: 'artwork', variant: 'system', props: { scheme: 'ivory' }, ratio: '16/9', caption: 'Component sheet — buttons, inputs, chips, cards.' },
      },
      screens: {
        intro: 'High-fidelity screens from the concept prototype.',
        media: [
          { kind: 'artwork', variant: 'phone', props: { screen: 'home', scheme: 'ivory' }, ratio: '4/5', caption: 'Home — search, categories, featured.' },
          { kind: 'artwork', variant: 'phone', props: { screen: 'product', scheme: 'ivory' }, ratio: '4/5', caption: 'Product detail.' },
          { kind: 'artwork', variant: 'phone', props: { screen: 'cart', scheme: 'ivory' }, ratio: '4/5', caption: 'Cart with full cost shown early.' },
          { kind: 'artwork', variant: 'phone', props: { screen: 'checkout', scheme: 'cobalt' }, ratio: '4/5', caption: 'Checkout — progressive steps.' },
        ],
      },
      interaction: {
        intro: 'Prototype interactions were designed to make state obvious without animation for its own sake.',
        points: [
          'Add-to-cart confirms inline on the button and updates the cart badge — no modal.',
          'Filters apply instantly with a result count so people never hit an empty screen blind.',
          'Checkout steps slide horizontally; completed steps collapse into an editable summary.',
          'Tablet layout promotes the cart to a persistent side panel.',
        ],
        media: { kind: 'artwork', variant: 'responsive', props: { scheme: 'cobalt' }, ratio: '16/9', caption: 'Phone, tablet and desktop variants.' },
      },
      reflection: {
        text: 'The most valuable work happened in conversations with engineers — understanding what the backend could return quickly shaped what the interface promised. Designing with implementation in mind made the hand-off smooth and the result honest.',
        next: ['Validate the checkout order with a moderated usability session.', 'Explore an order-tracking experience as a follow-on flow.'],
      },
    },
  },

  {
    slug: 'digital-product-ux',
    number: '03',
    title: 'Digital Product & UX',
    shortTitle: 'Product UX',
    category: 'Concept Case Study',
    tagline: 'A concept dashboard that shows how research, architecture and UI fit together.',
    year: '2025',
    role: 'Product Designer (concept)',
    tools: ['Figma'],
    concept: true,
    conceptNote:
      'This is a self-initiated concept project. The product, users and findings are illustrative and exist to demonstrate process. Replace with real work when available.',
    accent: 'ink',
    size: 'wide',
    cover: { kind: 'artwork', variant: 'desktop', props: { scheme: 'ivory' }, ratio: '16/10' },
    thumb: { kind: 'artwork', variant: 'desktop', props: { scheme: 'ivory' }, ratio: '16/10' },
    overview:
      'A concept for a small-team project tracker: the kind of tool where people spend hours a day and feel every bit of friction. The study demonstrates how I approach a digital product end to end — user research, information architecture, wireframes, usability thinking and a high-fidelity interface.',
    caseStudy: {
      problem:
        'Teams of five to fifteen people outgrow spreadsheets but drown in enterprise tools. The concept problem: design a tracker that shows each person what needs their attention today without making them manage the tool itself.',
      goals: [
        'A home view that answers “what should I do next?” in one glance.',
        'An information architecture shallow enough to learn in a single session.',
        'Keyboard-first interactions for power users, without hiding anything from newcomers.',
        'Accessible contrast and focus states as a baseline, not an afterthought.',
      ],
      research: {
        intro: 'Illustrative research plan: short interviews with people on small teams, a task analysis of a typical day, and a review of how existing tools handle notifications.',
        insights: [
          { title: 'Attention is the scarce resource', text: 'People do not need more views; they need the right three things surfaced.' },
          { title: 'Status should be felt, not read', text: 'Colour and position communicate urgency faster than labels.' },
          { title: 'Setup is where tools die', text: 'If the first ten minutes require configuration, the tool is abandoned before it helps.' },
        ],
      },
      flow: {
        intro: 'The architecture is deliberately flat: three top-level areas, with everything else reachable through search or context.',
        steps: ['Today', 'Projects', 'People', 'Settings (secondary)'],
        media: { kind: 'artwork', variant: 'ia', props: { scheme: 'ivory', root: 'APP', nodes: ['Today', 'Projects', 'People', 'Search', 'Settings'] }, ratio: '16/9', caption: 'Information architecture — three primary areas.' },
      },
      wireframes: {
        intro: 'Desktop wireframes tested whether the “Today” concept could carry the whole product.',
        media: [
          { kind: 'artwork', variant: 'wireframe', props: { device: 'desktop', screen: 'dashboard' }, ratio: '16/10', caption: 'Today view — wireframe.' },
          { kind: 'artwork', variant: 'wireframe', props: { device: 'desktop', screen: 'list' }, ratio: '16/10', caption: 'Project list — wireframe.' },
        ],
      },
      visual: {
        intro: 'The visual direction is calm: ivory surfaces, ink text, and colour reserved for status.',
        colors: [
          { name: 'Surface', hex: '#F4F0E8', role: 'Background' },
          { name: 'Ink', hex: '#171717', role: 'Text' },
          { name: 'Cobalt', hex: '#304FFE', role: 'Focus & links' },
          { name: 'Signal', hex: '#FF4D24', role: 'Overdue' },
          { name: 'Stone', hex: '#888780', role: 'Muted' },
        ],
        type: [
          { family: 'Inter', role: 'UI text', sample: 'Aa' },
          { family: 'Space Grotesk', role: 'Numbers & headings', sample: '24' },
          { family: 'JetBrains Mono', role: 'IDs & shortcuts', sample: '⌘K' },
        ],
        media: { kind: 'artwork', variant: 'system', props: { scheme: 'ivory' }, ratio: '16/9', caption: 'Component inventory.' },
      },
      screens: {
        intro: 'High-fidelity concept screens.',
        media: [
          { kind: 'artwork', variant: 'desktop', props: { scheme: 'ivory' }, ratio: '16/10', caption: 'Today — the home view.' },
          { kind: 'artwork', variant: 'phone', props: { screen: 'tasks', scheme: 'ivory' }, ratio: '4/5', caption: 'Mobile companion — tasks.' },
          { kind: 'artwork', variant: 'desktop', props: { scheme: 'ink' }, ratio: '16/10', caption: 'Dark variant.' },
        ],
      },
      interaction: {
        intro: 'Interaction principles for the concept.',
        points: [
          'Command palette (⌘K) reaches any project or person in two keystrokes.',
          'Drag to reprioritise; the list animates only the rows that moved.',
          'Every interactive element has a visible focus ring with 3:1 contrast.',
          'Mobile reduces the product to “Today” and search — nothing else is needed on the go.',
        ],
        media: { kind: 'artwork', variant: 'responsive', props: { scheme: 'ivory' }, ratio: '16/9', caption: 'Responsive behaviour.' },
      },
      reflection: {
        text: 'Concept work is where I test ideas I cannot always try on client projects. The main lesson from this one: subtracting views did more for clarity than any visual polish.',
        next: ['Prototype the command palette and test it with keyboard-only users.', 'Design an onboarding that needs zero configuration.'],
      },
    },
  },

  {
    slug: 'campaign-graphic-design',
    number: '04',
    title: 'Campaign & Graphic Design',
    shortTitle: 'Campaign Graphics',
    category: 'Graphic Design',
    tagline: 'Posters, promotions, menus and social creatives with a loud typographic voice.',
    year: '2023 — 2025',
    role: 'Graphic Designer',
    tools: ['Photoshop', 'Illustrator', 'Figma', 'Canva'],
    concept: true,
    conceptNote: 'A collection of self-directed and template-style compositions. Replace with real campaign artwork from /public/projects/.',
    accent: 'orange',
    size: 'tall',
    cover: { kind: 'artwork', variant: 'poster', props: { scheme: 'orange', text: 'MAKE\nNOISE\nQUIETLY.' }, ratio: '16/10' },
    thumb: { kind: 'artwork', variant: 'poster', props: { scheme: 'orange', text: 'MAKE\nNOISE\nQUIETLY.' }, ratio: '3/4' },
    overview:
      'Graphic design is where I think fastest. This collection gathers promotional layouts, editorial posters, menu systems and social creatives — the kind of marketing collateral where typography, colour and composition have to work in a glance.',
    caseStudy: {
      labels: { problem: 'The idea', goals: 'Principles', research: 'Typographic references', flow: 'Campaign structure', wireframes: 'Layout sketches', visual: 'Visual language', screens: 'The collection', interaction: 'Across formats' },
      problem:
        'Campaign graphics compete for a second of attention. Each piece here is built on one idea, one dominant typographic gesture and one accent — the discipline that keeps loud work legible.',
      goals: [
        'Lead with type: the headline is the image.',
        'One accent per composition, chosen for contrast against the surface.',
        'Compositions that survive cropping to stories, squares and landscape.',
        'Grids that stay invisible but keep every piece feeling related.',
      ],
      research: {
        intro: 'Influences include Swiss poster typography, contemporary editorial covers and the directness of hand-painted shop signage in Kathmandu.',
        insights: [
          { title: 'Scale is a message', text: 'A single oversized word reads as confidence. Three medium words read as a list.' },
          { title: 'Alignment can be expressive', text: 'Breaking a line in an unexpected place creates rhythm without any decoration.' },
          { title: 'Texture adds warmth', text: 'Halftones and grain make flat colour feel printed, not rendered.' },
        ],
      },
      flow: {
        intro: 'A campaign is a family of formats that share a core composition.',
        steps: ['Key visual (poster)', 'Square & story crops', 'Menu / print adaptation', 'Motion teaser'],
        media: { kind: 'artwork', variant: 'ia', props: { scheme: 'orange', root: 'KEY VISUAL', nodes: ['Poster', 'Square', 'Story', 'Print', 'Motion'] }, ratio: '16/9', caption: 'One key visual, many formats.' },
      },
      wireframes: {
        intro: 'Thumbnail sketches explore the hierarchy before colour enters.',
        media: [
          { kind: 'artwork', variant: 'marks', props: { scheme: 'ivory', mode: 'layouts' }, ratio: '4/3', caption: 'Layout thumbnails.' },
        ],
      },
      visual: {
        intro: 'Oversized grotesk headlines, serif italics for the counterpoint, mono for the facts.',
        colors: [
          { name: 'Ivory', hex: '#F4F0E8', role: 'Surface' },
          { name: 'Ink', hex: '#171717', role: 'Type' },
          { name: 'Orange-red', hex: '#FF4D24', role: 'Shout' },
          { name: 'Cobalt', hex: '#304FFE', role: 'Counter-accent' },
        ],
        type: [
          { family: 'Space Grotesk', role: 'Headlines', sample: 'Aa' },
          { family: 'Instrument Serif', role: 'Italic counterpoint', sample: 'Aa' },
          { family: 'JetBrains Mono', role: 'Dates, prices, places', sample: '08' },
        ],
        media: { kind: 'artwork', variant: 'palette', props: { scheme: 'orange' }, ratio: '16/9', caption: 'Campaign palette and type.' },
      },
      screens: {
        intro: 'Selected compositions.',
        media: [
          { kind: 'artwork', variant: 'poster', props: { scheme: 'orange', text: 'MAKE\nNOISE\nQUIETLY.' }, ratio: '3/4', caption: 'Poster — key visual.' },
          { kind: 'artwork', variant: 'poster', props: { scheme: 'cobalt', text: 'EAT\nWITH\nYOUR EYES.' }, ratio: '3/4', caption: 'Poster — menu launch.' },
          { kind: 'artwork', variant: 'social', props: { scheme: 'orange' }, ratio: '1/1', caption: 'Social creative set.' },
          { kind: 'artwork', variant: 'menu', props: { scheme: 'ink' }, ratio: '3/4', caption: 'Menu — ink variant.' },
          { kind: 'artwork', variant: 'poster', props: { scheme: 'ivory', text: 'LATE\nNIGHT\nMENU.' }, ratio: '1/1', caption: 'Square crop for feed.' },
          { kind: 'artwork', variant: 'poster', props: { scheme: 'ink', text: 'NEW\nSEASON.' }, ratio: '9/16', caption: 'Story crop.' },
        ],
      },
      interaction: {
        intro: 'Print and screen are treated as one system.',
        points: [
          'Headline scale is set in the key visual and preserved proportionally in every crop.',
          'Stories move the headline to the top third so UI chrome never covers it.',
          'Print versions switch to a finer halftone and 3mm bleed.',
          'Motion teasers animate only the accent shape and one line of type.',
        ],
        media: { kind: 'artwork', variant: 'responsive', props: { scheme: 'orange' }, ratio: '16/9', caption: 'Key visual across formats.' },
      },
      reflection: {
        text: 'Graphic work keeps my interface work honest: if a poster can say it with one word, a screen probably can too.',
        next: ['Document the halftone and grain recipes as reusable Photoshop actions.', 'Extend the family with short motion loops.'],
      },
    },
  },

  {
    slug: 'experimental-visual-lab',
    number: '05',
    title: 'Experimental Visual Lab',
    shortTitle: 'Visual Lab',
    category: 'Experiments',
    tagline: 'Typography, generative graphics, motion studies and colour play.',
    year: 'Ongoing',
    role: 'Designer & tinkerer',
    tools: ['Figma', 'Illustrator', 'CSS / SVG'],
    concept: true,
    conceptNote: 'A living playground. Everything here is an experiment, built to learn rather than to ship.',
    accent: 'cobalt',
    size: 'square',
    cover: { kind: 'artwork', variant: 'typegrid', props: { scheme: 'ink' }, ratio: '16/10' },
    thumb: { kind: 'artwork', variant: 'shapes', props: { scheme: 'ink' }, ratio: '1/1' },
    overview:
      'The lab is where I try things without a brief: letterforms pushed until they stop being letters, geometric systems that generate their own compositions, motion studies in CSS and SVG, and colour experiments. Some of it feeds client work later. Most of it just keeps the eye sharp.',
    caseStudy: {
      labels: { problem: 'Why a lab', goals: 'Rules of the playground', research: 'Starting points', flow: 'Studies', wireframes: 'Type studies', visual: 'Colour studies', screens: 'Motion & generative', interaction: 'Try it' },
      problem:
        'Client work rewards restraint. A lab rewards the opposite. Keeping both running means the restraint is a choice, not a limit.',
      goals: [
        'Every experiment starts with one constraint and breaks one rule.',
        'Build it in a tool that can ship — CSS, SVG, Figma — so it can be reused.',
        'Finish quickly. The point is quantity and surprise, not polish.',
        'Keep what teaches something; delete the rest.',
      ],
      research: {
        intro: 'Starting points for recent studies.',
        insights: [
          { title: 'Variable weight as rhythm', text: 'Changing weight across a line reads like volume in music.' },
          { title: 'Rotation systems', text: 'Rotating a simple shape by a fixed step produces compositions no hand would draw.' },
          { title: 'Two-colour limits', text: 'Removing colour options makes composition decisions faster and braver.' },
        ],
      },
      flow: {
        intro: 'Studies are grouped by what they manipulate.',
        steps: ['Type', 'Shape', 'Motion', 'Colour'],
        media: { kind: 'artwork', variant: 'ia', props: { scheme: 'cobalt', root: 'LAB', nodes: ['Type', 'Shape', 'Motion', 'Colour'] }, ratio: '16/9', caption: 'Four families of experiments.' },
      },
      wireframes: {
        intro: 'Letterforms as material.',
        media: [
          { kind: 'artwork', variant: 'typegrid', props: { scheme: 'ivory' }, ratio: '4/3', caption: 'Weight and width grid.' },
          { kind: 'artwork', variant: 'typegrid', props: { scheme: 'cobalt' }, ratio: '4/3', caption: 'Inverted study.' },
        ],
      },
      visual: {
        intro: 'Two-colour exercises with the site palette.',
        colors: [
          { name: 'Ink', hex: '#171717', role: 'Ground' },
          { name: 'Cobalt', hex: '#304FFE', role: 'Figure' },
          { name: 'Orange-red', hex: '#FF4D24', role: 'Figure' },
          { name: 'Ivory', hex: '#F4F0E8', role: 'Ground' },
        ],
        type: [
          { family: 'Space Grotesk', role: 'Primary material', sample: 'Aa' },
          { family: 'Instrument Serif', role: 'Contrast material', sample: 'Aa' },
        ],
        media: { kind: 'artwork', variant: 'palette', props: { scheme: 'ink' }, ratio: '16/9', caption: 'Two-colour pairs.' },
      },
      screens: {
        intro: 'Motion and generative studies, rendered live in CSS and SVG.',
        media: [
          { kind: 'artwork', variant: 'shapes', props: { scheme: 'ink' }, ratio: '1/1', caption: 'Rotation system — live.' },
          { kind: 'artwork', variant: 'shapes', props: { scheme: 'cobalt' }, ratio: '1/1', caption: 'Rotation system — cobalt.' },
          { kind: 'artwork', variant: 'typegrid', props: { scheme: 'orange' }, ratio: '4/3', caption: 'Type grid — orange.' },
        ],
      },
      interaction: {
        intro: 'The hero and the type playground on the home page are two of these experiments running live.',
        points: [
          'The hero’s typographic object tilts toward the pointer.',
          'The “PLAY” section lets letters respond to pointer distance.',
          'All experiments respect reduced-motion preferences and fall back to static compositions.',
        ],
        media: { kind: 'artwork', variant: 'shapes', props: { scheme: 'orange' }, ratio: '16/9', caption: 'Rotation system — wide.' },
      },
      reflection: {
        text: 'The lab is the reason the rest of the portfolio looks the way it does.',
        next: ['Publish selected studies as a small, open set of CSS/SVG snippets.'],
      },
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
};

export const getPrevProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i - 1 + projects.length) % projects.length];
};

export default projects;
