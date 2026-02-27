(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  gsap.to(".blob-1", {
    xPercent: 7,
    yPercent: -6,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".blob-2", {
    xPercent: -6,
    yPercent: 8,
    duration: 21,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".blob-3", {
    xPercent: 5,
    yPercent: -7,
    duration: 23,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.utils.toArray(".parallax").forEach((shape) => {
    const depth = Number(shape.dataset.depth || 10);

    gsap.to(shape, {
      yPercent: -depth,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1
      }
    });
  });

  gsap.utils.toArray(".reveal-section").forEach((section) => {
    const isReverse = section.classList.contains("reverse");
    const main = section.querySelector(".section-main");
    const side = section.querySelector(".section-side");
    const staggered = section.querySelectorAll(".stagger");

    if (main) {
      gsap.from(main, {
        x: isReverse ? 42 : -42,
        autoAlpha: 0,
        duration: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (side) {
      gsap.from(side, {
        x: isReverse ? -42 : 42,
        autoAlpha: 0,
        duration: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (staggered.length) {
      gsap.from(staggered, {
        y: 22,
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.045,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%"
        }
      });
    }
  });

  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const state = { value: 0 };

    counter.textContent = `0${suffix}`;

    gsap.to(state, {
      value: target,
      duration: 1.7,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = `${Math.floor(state.value)}${suffix}`;
      },
      onComplete: () => {
        counter.textContent = `${target}${suffix}`;
      },
      scrollTrigger: {
        trigger: counter.closest(".section") || counter,
        start: "top 78%",
        once: true
      }
    });
  });
})();
