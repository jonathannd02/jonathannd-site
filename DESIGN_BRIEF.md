# The Atlas — design and implementation brief

## The improved prompt

Build a production-quality personal website for Jonathan Núñez Dhondt called **The Atlas**.

This is not a standard CV, portfolio grid, startup landing page or WebGL demo. It is a calm, precise field atlas: a place where a technically minded person puts useful work, notes and open questions. The site should communicate personality through restraint, typography, composition and the quality of its thinking — not through a pile of symbols or temporary project claims.

### Person and tone

Jonathan is a design-sensitive, pragmatic builder. He likes systems when they reduce confusion, depth without theatre, and beauty that serves a purpose. He is technically focused, reflective but not confessional, ambitious without fake hype, and impatient with unnecessary complexity. The site should feel:

- quiet but not empty;
- exact but not sterile;
- personal but not performative;
- cinematic but still useful;
- unfinished in the good sense: alive and evolving.

### Core visual hierarchy

Use one primary metaphor only: **cartography of complex systems**.

- Video: the world and atmosphere.
- SVG route: the actual map and continuity between sections.
- Motion: a restrained response to the visitor.
- Semantic HTML: the content, links and identity.

The supplied city video contains a golden network. Use it as a narrative opening, not as a decorative background loop. Let it play once, hold the final frame, and hand off to a real route into the work section.

### Visual direction

- dark charcoal hero with warm bone typography;
- antique gold as the only expressive accent;
- deep blue-black for the notes section;
- strong editorial serif for display copy;
- clean sans-serif and compact monospace metadata;
- thin rules, generous negative space and asymmetric alignment;
- no neon, rainbow liquid, glassmorphism, fake metrics, generic cards, custom cursor, typewriter effect or decorative dashboard clutter.

### Content hierarchy

The first viewport must answer these questions quickly:

1. Who is this?
2. What does he work on?
3. Where can I inspect the proof?

Initial copy:

```text
JND / FIELD ATLAS / VOL. 01

I map complex systems
and build useful things.

Security-minded builder working across agent systems,
application security and practical web products.

EXPLORE THE ATLAS ↓
```

Then move from atmosphere to evidence:

- Current coordinates / selected work;
- Field notes;
- About the person and working approach;
- direct contact.

Only use project names, links, outcomes and statuses that are verified. Mark research as `IN PROGRESS`; do not turn planned work into completed case studies.

### Technical requirements

Use Astro for the static shell. Keep the page semantic and light. Use native CSS, SVG and small client-side JavaScript first. Any WebGL or Liquid layer is progressive enhancement and must never own the H1, navigation, CTA or project information.

The site must include:

- immediate poster fallback;
- `prefers-reduced-motion` behavior;
- keyboard-visible focus states;
- real links and landmarks;
- responsive video cropping;
- a responsive SVG route that degrades to a vertical rule on mobile;
- no scroll hijacking;
- no invented performance numbers;
- production build and browser verification.

Do not stop at a visual mockup. Run the site, inspect it at desktop and mobile widths, check the console, test reduced motion and report what was actually verified.
