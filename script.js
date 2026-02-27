(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;

  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.08,
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

  const header = document.getElementById("top-header");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = gsap.utils.toArray(".section");
  let lastY = window.scrollY;

  const updateHeaderState = () => {
    const currentY = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", currentY > 34);

      if (window.innerWidth > 820) {
        const scrollingDown = currentY > lastY;
        header.classList.toggle("is-hidden", scrollingDown && currentY > 220);
      } else {
        header.classList.remove("is-hidden");
      }
    }

    lastY = currentY;
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    link.addEventListener("click", (event) => {
      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      event.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, {
          offset: -88,
          duration: 1.1
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    ScrollTrigger.create({
      trigger: target,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => setActiveNav(targetId),
      onEnterBack: () => setActiveNav(targetId)
    });
  });

  function setActiveNav(activeId) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === activeId);
    });
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
        scrub: 1.15
      }
    });
  });

  sections.forEach((section) => {
    const isReverse = section.classList.contains("reverse");
    const main = section.querySelector(".section-main");
    const side = section.querySelector(".section-side");
    const staggered = section.querySelectorAll(".stagger");

    ScrollTrigger.create({
      trigger: section,
      start: "top 68%",
      end: "bottom 35%",
      onEnter: () => section.classList.add("is-active"),
      onLeave: () => section.classList.remove("is-active"),
      onEnterBack: () => section.classList.add("is-active"),
      onLeaveBack: () => section.classList.remove("is-active")
    });

    if (main) {
      gsap.from(main, {
        x: isReverse ? 38 : -38,
        autoAlpha: 0,
        duration: 0.92,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (side) {
      gsap.from(side, {
        x: isReverse ? -38 : 38,
        autoAlpha: 0,
        duration: 0.92,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (staggered.length) {
      gsap.from(staggered, {
        y: 20,
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.038,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%"
        }
      });
    }

    const flowPath = section.querySelectorAll(".flow-svg path");

    flowPath.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      });
    });
  });

  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const state = { value: 0 };

    counter.textContent = `0${suffix}`;

    gsap.to(state, {
      value: target,
      duration: 1.65,
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
