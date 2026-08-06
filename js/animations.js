gsap.registerPlugin(ScrollTrigger);

const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTimeline.fromTo('.hero-copy', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9 });
heroTimeline.fromTo('.hero-copy .tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .65 }, '-=.5');
heroTimeline.fromTo('.hero-copy h1', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .02 }, '-=.55');
heroTimeline.fromTo('.hero-copy p', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8 }, '-=.7');
heroTimeline.fromTo('.hero-actions .btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: .1, duration: .7 }, '-=.7');
heroTimeline.fromTo('.hero-panel', { opacity: 0, y: 22, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, '-=.9');

const revealItems = gsap.utils.toArray('.reveal:not(.hero-copy):not(.hero-panel)');
revealItems.forEach((item) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: .95,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 84%'
    }
  });
});

gsap.to('.hero-visual img', {
  y: -10,
  duration: 2.4,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.hero-panel .aurora', {
  xPercent: -3,
  yPercent: 2,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

const sections = gsap.utils.toArray('.section-title, .category-switcher, .vehicle-card, .feature-card, .tech-card, .gallery-card, .stat-card');
sections.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 24,
    duration: .8,
    delay: index * .03,
    scrollTrigger: {
      trigger: section,
      start: 'top 88%'
    }
  });
});

const parallaxItems = gsap.utils.toArray('.parallax-layer');
parallaxItems.forEach((item) => {
  gsap.to(item, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: item,
      scrub: true
    }
  });
});
