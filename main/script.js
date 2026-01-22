/* =========================
   HERO TEXT (HOME ONLY)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.getElementById("hero-text");

  if (heroText) {
    const words = "Bringing Tradition to Life".split(" ");
    let index = 0;

    function showWords() {
      if (index < words.length) {
        heroText.innerHTML += words[index] + " ";
        index++;
        setTimeout(showWords, 400);
      }
    }

    showWords();
  }
});

/* =========================
   NAVBAR ACTIVE STATE (MULTI-PAGE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});

/* =========================
   MOBILE NAV TOGGLE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
});

/* =========================
   COUNTER ANIMATION (ABOUT PAGE / HOME)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number[data-target]");
  const aboutSection = document.getElementById("about");
  if (!counters.length || !aboutSection) return;

  let started = false;

  function animateCounters() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let current = 0;
      const increment = Math.ceil(target / 60);

      function update() {
        current += increment;
        if (current < target) {
          counter.textContent = current;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "+";
        }
      }

      update();
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) animateCounters();
    },
    { threshold: 0.4 }
  );

  observer.observe(aboutSection);
});

/* =========================
   CAROUSEL (SAFE INIT)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const carousel = document.querySelector(".carousel");

  if (!track || !carousel) return;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  const getBounds = () => {
    const max = 0;
    const min = -(track.scrollWidth - carousel.offsetWidth);
    return { max, min };
  };

  // Mouse
  track.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;

    const { max, min } = getBounds();
    currentTranslate = Math.max(min, Math.min(max, currentTranslate));
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
  });

  // Touch
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", e => {
    currentTranslate = prevTranslate + (e.touches[0].clientX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener("touchend", () => {
    const { max, min } = getBounds();
    currentTranslate = Math.max(min, Math.min(max, currentTranslate));
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
  });

  // Wheel (trackpad)
 carousel.addEventListener(
  "wheel",
  e => {
    // Only hijack scroll if user is clearly scrolling horizontally
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();

      currentTranslate -= e.deltaX;

      const { max, min } = getBounds();
      currentTranslate = Math.max(min, Math.min(max, currentTranslate));
      track.style.transition = "transform 0.25s ease";
      track.style.transform = `translateX(${currentTranslate}px)`;
      prevTranslate = currentTranslate;
    }
    // else → allow normal vertical page scroll
  },
  { passive: false }
);


  track.querySelectorAll("img").forEach(img =>
    img.addEventListener("dragstart", e => e.preventDefault())
  );
});

/* =========================
   IMAGE MODAL (GALLERY)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-track img");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-modal");

  if (!images.length || !modal || !modalImg || !closeBtn) return;

  images.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});
