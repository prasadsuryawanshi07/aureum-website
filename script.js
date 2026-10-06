/* =========================================================
   AUREUM INDUSTRIES
   Corporate Website — Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     MOBILE NAVIGATION
     --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.classList.toggle("nav-open", isOpen);
    });

    // Close menu after clicking a navigation link
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* ---------------------------------------------------------
     SMOOTH SCROLLING
     --------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

  });


  /* ---------------------------------------------------------
     HEADER SCROLL EFFECT
     --------------------------------------------------------- */

  const header = document.querySelector(".site-header");

  if (header) {

    const updateHeader = () => {

      if (window.scrollY > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });
  }


  /* ---------------------------------------------------------
     REVEAL ANIMATIONS
     --------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right"
  );

  if ("IntersectionObserver" in window && revealElements.length) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* ---------------------------------------------------------
     CURRENT YEAR
     --------------------------------------------------------- */

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ---------------------------------------------------------
     ESC KEY — CLOSE MOBILE NAVIGATION
     --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (siteNav) {
      siteNav.classList.remove("is-open");
    }

    document.body.classList.remove("nav-open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

  });

});

/* =====================================================
   CAPABILITIES SLIDER
====================================================== */

const capabilityNavItems = document.querySelectorAll(
  ".capability-nav-item"
);

const capabilitySlides = document.querySelectorAll(
  ".capability-slide"
);

const capabilityProgressFill = document.querySelector(
  ".capability-progress-fill"
);

const capabilitySlideLabel = document.querySelector(
  ".capability-slide-label"
);

if (
  capabilityNavItems.length &&
  capabilitySlides.length
) {

  function setCapabilitySlide(index) {

    /* Navigation */

    capabilityNavItems.forEach((item, i) => {
      item.classList.toggle(
        "is-active",
        i === index
      );
    });


    /* Visual slides */

    capabilitySlides.forEach((slide, i) => {
      slide.classList.toggle(
        "is-active",
        i === index
      );
    });


    /* Slide number */

    if (capabilitySlideLabel) {
      capabilitySlideLabel.textContent =
        `${String(index + 1).padStart(2, "0")} / 04`;
    }


    /* Progress */

    if (capabilityProgressFill) {
      const progress =
        ((index + 1) / capabilitySlides.length) * 100;

      capabilityProgressFill.style.width =
        `${progress}%`;
    }
  }


  /* Navigation click */

  capabilityNavItems.forEach((item) => {

    item.addEventListener("click", () => {

      const index = Number(
        item.dataset.slide
      );

      setCapabilitySlide(index);

    });

  });


  /* Initialise */

  setCapabilitySlide(0);

}
