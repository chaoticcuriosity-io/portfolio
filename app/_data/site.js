// Single source of truth for the site's content. Pages render from this data.
// NOTE: mission/values copy is a v1 drawn from existing material — refine when the
// LinkedIn archive is available.

export const PROFILE = {
  name: "Don Balanzat",
  tagline: "Physicist · Engineer · Builder",
  blurb:
    "I make hard technology usable — across physics, space, immersive reality, robotics, and AI. A decade of building and teaching, from university labs to a 12,000-person aerospace company, now leading AI enablement at Zillow.",
  location: "Phoenix, AZ",
  email: "dgbalanzat@gmail.com",
  linkedin: "https://linkedin.com/in/donbalanzat",
  github: "https://github.com/chaoticcuriosity-io",
  resume: "/resume/don-balanzat-resume.pdf",
  heroImage: "/media/space/space__don-space-headshot.jpg",
  studio: { name: "Chaotic Curiosity", url: "https://chaoticcuriosity.io" },
};

export const MISSION = [
  "For the benefit of Earth and the diversity of its inhabitants.",
  "AI is powerful enough to change everything — I choose to use it for good.",
  "Learning is built, not delivered. Find people who believe in you, then be that person for someone else.",
];

// Most-recent / biggest wins, surfaced on the landing page.
export const WINS = [
  {
    title: "AI Enablement at Zillow",
    blurb: "Took company-wide AI adoption from 30% to 75%+ for a 2,700-person org in two months.",
    href: "/ai",
    media: "/media/ai/ai__you-plus-ai-workshop.jpg",
    tag: "AI",
  },
  {
    title: "Humanoid Robotics (RL)",
    blurb: "Sim-to-real cartwheels and backflips on a Unitree H2 — Isaac Lab, NVIDIA GR00T, MuJoCo.",
    href: "/robotics",
    media: "/media/robotics/robotics__humanoid-cartwheel-rl.mp4",
    tag: "Robotics",
  },
  {
    title: "Image → 3D for Construction Safety",
    blurb: "A pipeline that turns a single site photo into clean, rigged 3D for safety training.",
    href: "/ai",
    media: "/media/ai/ai__kiewet-3d-model.png",
    tag: "AI · 3D",
  },
  {
    title: "Space at Blue Origin",
    blurb: "XR/AI tooling across every vehicle program, scaled to 12,000+ users. New Glenn, Blue Moon.",
    href: "/space",
    media: "/media/space/space__new-glenn-liftoff.jpg",
    tag: "Space",
  },
  {
    title: "Museum XR: Afrobotica & Earthlight",
    blurb: "Immersive dome experiences built for the Museum of Science, Boston.",
    href: "/xr",
    media: "/media/xr/xr__being-water-vr.jpg",
    tag: "XR",
  },
  {
    title: "Gaussian-Splat Pipeline",
    blurb: "Turn image and video into immersive-ready 3D for web, VR, Unity, and Unreal.",
    href: "/xr",
    media: "/media/xr/xr__moon-day-viewer-splat.mp4",
    tag: "XR · 3D",
  },
];

export const DOMAIN_ORDER = ["ai", "space", "xr", "robotics", "physics", "education"];

export const DOMAINS = {
  ai: {
    slug: "ai",
    name: "AI",
    accent: "#fb7185",
    tagline: "Powerful enough to change everything — I choose to use it for good.",
    intro:
      "I lead enterprise AI enablement and still ship the tools myself. The job is getting whole organizations to actually use AI — and proving the technical patterns by building them, not commissioning them.",
    bullets: [
      "AI Enablement Lead at Zillow — company-wide adoption for 2,700+ people across Product, Engineering, Marketing, and Design.",
      "Lifted weekly-active AI use in Product & Design from 30% to 75%+ in two months.",
      "Build with Claude Code (skills, subagents, harnesses), Codex, Cursor, the Agent SDK, and MCP.",
      "Built an image→3D generation pipeline (Kiewet) that turns site photos into rigged 3D for construction-safety training.",
      "Run the 'You + AI' workshop series and teach Hyperspace: XR + AI at ASU.",
    ],
    media: [
      { src: "/media/ai/ai__you-plus-ai-workshop.jpg", alt: "You + AI workshop session" },
      { src: "/media/ai/ai__kiewet-source-photo.png", alt: "Source site photo — input to the image→3D pipeline", caption: "1 · Source photo" },
      { src: "/media/ai/ai__kiewet-imagegen.png", alt: "AI-generated clean reference of a steel beam", caption: "2 · AI image generation" },
      { src: "/media/ai/ai__kiewet-3d-model.png", alt: "Cleaned, rigged 3D model turntable", caption: "3 · Generated 3D model" },
      { src: "/media/ai/ai__llm-experience.mp4", alt: "LLM experience demo" },
      { src: "/media/ai/ai__vfx-clip.mp4", alt: "Generative VFX clip" },
    ],
  },
  space: {
    slug: "space",
    name: "Space",
    accent: "#818cf8",
    tagline: "Built the tools to get things off this planet.",
    intro:
      "As XR/AI Engineering Lead at Blue Origin I built emerging-technology capability from zero across every vehicle program — the software that helps engineers design, build, and launch.",
    bullets: [
      "XR/AI Engineering Lead at Blue Origin — New Shepard, New Glenn, Blue Moon MK1 & MK2, Blue Ring.",
      "Contributed tooling used across the Blue Moon program — NASA's $3.4B lunar-lander award.",
      "Built VR labs, AR manufacturing tools, and spatial-capture pipelines scaled to 12,000+ users.",
      "NASA Goddard intern — Mixed Reality Exploration Toolkit (MRET) on the Roman Space Telescope.",
      "2× Blue Origin Liftoff Award · Space for Humanity citizen-astronaut finalist.",
    ],
    media: [
      { src: "/media/space/space__don-blue-moon.jpg", alt: "Don in front of the Blue Moon lunar lander" },
      { src: "/media/space/space__new-glenn-liftoff.jpg", alt: "New Glenn liftoff" },
      { src: "/media/space/space__new-glenn-slc36.jpg", alt: "New Glenn at Space Launch Complex 36" },
      { src: "/media/space/space__blue-moon-thermal-vacuum.jpg", alt: "Blue Moon in thermal-vacuum testing" },
      { src: "/media/space/space__new-shepard-booster-touchdown.jpg", alt: "New Shepard booster touchdown" },
      { src: "/media/space/space__nasa-mret-demo.mp4", alt: "NASA MRET scenario demonstration" },
      { src: "/media/space/space__earth-render.jpg", alt: "Earth render" },
      { src: "/media/space/space__don-spacesuit.jpg", alt: "Don in a spacesuit" },
    ],
  },
  xr: {
    slug: "xr",
    name: "XR",
    accent: "#c084fc",
    tagline: "Digital things in real places.",
    intro:
      "A decade building immersive systems for industry, education, and museums — from manufacturing AR at Blue Origin to dome experiences and a Gaussian-splat pipeline that turns the real world into immersive 3D.",
    bullets: [
      "Led XR engineering at Blue Origin — VR labs, AR manufacturing, spatial capture.",
      "Afrobotica & Earthlight dome experiences for the Museum of Science, Boston.",
      "Dreamscape Learn research; VISOR UI; CovidCampus simulation; Meta Quest passthrough.",
      "3D/4D Gaussian-splat pipeline — image/video to web, VR, Unity, and Unreal.",
      "MS in XR for STEAM visualization (ASU); teaches Hyperspace: XR + AI.",
    ],
    media: [
      { src: "/media/xr/xr__visor-ui-walkthrough.mp4", alt: "VISOR UI walkthrough" },
      { src: "/media/xr/xr__quest-pro-live-looping.mp4", alt: "Live looping on Meta Quest Pro passthrough" },
      { src: "/media/xr/xr__moon-day-viewer-splat.mp4", alt: "Gaussian-splat moon viewer" },
      { src: "/media/xr/xr__covid-campus-sim.mp4", alt: "CovidCampus simulation" },
      { src: "/media/xr/xr__in-world-demo.mp4", alt: "In-world VR demonstration" },
      { src: "/media/xr/xr__vr-world-demo.mp4", alt: "VR world demo" },
      { src: "/media/xr/xr__being-water-vr.jpg", alt: "Being Water VR experience" },
      { src: "/media/xr/xr__dreamscape-alien-zoo.png", alt: "Dreamscape Learn Alien Zoo" },
      { src: "/media/xr/xr__don-in-vr.jpg", alt: "Don in a VR headset" },
      { src: "/media/xr/xr__vr-meeting-avatars.jpg", alt: "VR meeting with avatars" },
      { src: "/media/xr/xr__afrobotica-flow-diagram.png", alt: "Afrobotica experience flow diagram" },
      { src: "/media/xr/xr__hyperspace-flyer.jpg", alt: "Hyperspace: XR + AI course flyer" },
    ],
  },
  robotics: {
    slug: "robotics",
    name: "Robotics",
    accent: "#2dd4bf",
    tagline: "Teaching machines to move.",
    intro:
      "Lead technologist on a humanoid robotics program — reinforcement learning in simulation, transferred to real hardware, aimed at keeping people out of dangerous places.",
    bullets: [
      "Lead tech on a Unitree H2 EDU humanoid at ASU's Pooladvand Lab.",
      "Reinforcement learning with Isaac Lab, NVIDIA GR00T, ROS, and MuJoCo.",
      "Trained cartwheel, backflip, and velocity policies — sim-to-real transfer.",
      "Construction-safety research: fewer people in hazardous spots.",
      "Reachy manipulation and teleoperation experiments.",
    ],
    media: [
      { src: "/media/robotics/robotics__humanoid-cartwheel-rl.mp4", alt: "Humanoid cartwheel learned via RL" },
      { src: "/media/robotics/robotics__velocity-policy-progression.mp4", alt: "Velocity policy training progression" },
      { src: "/media/robotics/robotics__humanoid-backflip.mp4", alt: "Humanoid backflip reference" },
      { src: "/media/robotics/robotics__g1-progression-chase.mp4", alt: "Humanoid progression, chase camera" },
      { src: "/media/robotics/robotics__isaac-lab-screencast.mp4", alt: "Isaac Lab training screencast" },
      { src: "/media/robotics/robotics__reachy-hello.mp4", alt: "Reachy robot waving hello" },
      { src: "/media/robotics/robotics__reachy-postman.mp4", alt: "Reachy robot manipulation" },
      { src: "/media/robotics/robotics__robotics-clip.mp4", alt: "Robotics development clip" },
    ],
  },
  physics: {
    slug: "physics",
    name: "Physics",
    accent: "#22d3ee",
    tagline: "The operating system of the universe.",
    intro:
      "Physics is where I started, and how I still think. A decade making the invisible tangible — for thousands of students and for the public.",
    bullets: [
      "B.S. Physics (Rutgers); 6 years running ASU physics labs serving the full undergraduate curriculum — 3,000+ students per semester.",
      "Built demonstrations and experiments: optics & diffraction, Galton boards, metronome entrainment, Rubens tube, polarization, tuned-mass dampers.",
      "Handled liquid nitrogen, radioactive sources, and high-voltage demos; put on physics shows for the public.",
      "Building PhLEx — an AI-native physics lab platform with ASU.",
    ],
    media: [
      { src: "/media/physics/physics__green-laser-diffraction.jpg", alt: "Green-laser diffraction through a circular aperture (long exposure)" },
      { src: "/media/physics/physics__diffraction-patterns.png", alt: "Diffraction patterns with parameters" },
      { src: "/media/physics/physics__polarizers.jpg", alt: "Polarizers blocking light" },
      { src: "/media/physics/physics__thermal-imaging.jpg", alt: "Thermal/infrared imaging" },
      { src: "/media/physics/physics__thermal-i-love-physics.png", alt: "'I love physics' in thermal camera" },
      { src: "/media/physics/physics__rubens-tube-standing-waves.png", alt: "Rubens tube standing waves" },
      { src: "/media/physics/physics__galton-board-sim.mp4", alt: "Galton board simulation" },
      { src: "/media/physics/physics__metronome-entrainment.mp4", alt: "Synchronized metronome entrainment" },
      { src: "/media/physics/physics__inertia-tablecloth-demo.mp4", alt: "Tablecloth inertia demo" },
      { src: "/media/physics/physics__van-de-graaff.mp4", alt: "Van de Graaff generator demo" },
      { src: "/media/physics/physics__circuits.mp4", alt: "Circuits close-up" },
      { src: "/media/physics/physics__guitar-waveform-oscilloscope.mp4", alt: "Guitar waveform on an oscilloscope" },
    ],
  },
  education: {
    slug: "education",
    name: "Education",
    accent: "#f59e0b",
    tagline: "Learning is built, not delivered.",
    intro:
      "Everything I build, I teach. Ten-plus years turning frontier technology into something people can actually pick up — in labs, lecture halls, conferences, and the community.",
    bullets: [
      "ASU Faculty Associate — designed and taught Hyperspace: XR + AI (graduate course).",
      "6 years running ASU physics labs — 3,000+ students per semester.",
      "MIT Reality Hack mentor; AzAAPT and TEC-for-Girls presenter.",
      "ASU MIX Center workshop series; free community 'You + AI' workshops in Mesa.",
      "Frequent keynote and panel speaker translating tech for technical and non-technical audiences.",
    ],
    media: [
      { src: "/media/education/education__lecture-audience.png", alt: "Lecturing to a large audience" },
      { src: "/media/education/education__mentoring-mit-reality-hack.jpg", alt: "Mentoring at MIT Reality Hack" },
      { src: "/media/education/education__teaching-workshop.jpg", alt: "Teaching a workshop" },
      { src: "/media/education/education__convention-panel.jpg", alt: "Speaking on a convention panel" },
      { src: "/media/education/education__azaapt-2019.jpg", alt: "Presenting at AzAAPT 2019" },
      { src: "/media/education/education__tec-for-girls.jpg", alt: "TEC is for Girls conference" },
      { src: "/media/education/education__speaker-talk.mp4", alt: "Speaking engagement" },
    ],
  },
  beyond: {
    slug: "beyond",
    name: "Beyond",
    accent: "#a3e635",
    tagline: "The rest of me.",
    intro:
      "Curiosity doesn't clock out. Music, activism, and the things that keep me human.",
    bullets: [
      "Music — produce and perform (bass, Stratocaster, Rubens tube, live looping). Ted & The Muskrats; Musical Instrument Museum content creator.",
      "Activism — organized March for Science Phoenix (14,000+ attendees); featured on NPR, Good Morning Arizona, and AZ Central.",
      "Life — skateboarding, reptile-sanctuary volunteer, and a partner who believes in me.",
    ],
    media: [
      { src: "/media/music/music__don-stratocaster.png", alt: "Don playing a Stratocaster" },
      { src: "/media/music/music__don-bass.jpg", alt: "Don playing bass" },
      { src: "/media/music/music__don-live-performance.jpg", alt: "Don performing live" },
      { src: "/media/music/music__don-rubens-tube.jpg", alt: "Don with a Rubens tube" },
      { src: "/media/music/music__ted-and-the-muskrats.jpg", alt: "Ted and the Muskrats" },
      { src: "/media/music/music__on-the-road-looping.mp4", alt: "Live looping performance" },
      { src: "/media/music/music__button-piano.mp4", alt: "Physical button piano" },
      { src: "/media/activism/activism__leading-march-for-science.jpg", alt: "Leading the March for Science" },
      { src: "/media/activism/activism__march-for-science.jpg", alt: "March for Science crowd" },
      { src: "/media/activism/activism__kjzz-radio.jpg", alt: "At KJZZ radio" },
      { src: "/media/personal/personal__skate-clip.mp4", alt: "Skateboarding" },
      { src: "/media/personal/personal__double-tre-flip.mp4", alt: "Double tre flip" },
      { src: "/media/personal/personal__don-firebender.png", alt: "Fire performance" },
      { src: "/media/personal/personal__don-courtney-hobbiton.jpg", alt: "Don and Courtney at Hobbiton" },
      { src: "/media/personal/personal__don-courtney-wedding.jpg", alt: "Don and Courtney — wedding" },
    ],
  },
};

export function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src);
}
