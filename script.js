// Hamburger toggle
const toggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Active menu underline
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // close menu on mobile
    navMenu.classList.remove("active");
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // active button
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#nav-menu ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.parentElement.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.parentElement.classList.add("active");
    }
  });
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImg || !closeBtn) {
    console.log("Lightbox elements not found");
    return;
  }

  document.querySelectorAll(".project-box img").forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  let scale = 1;

lightboxImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 3);
  lightboxImg.style.transform = `scale(${scale})`;
});


});

// ===== GRAPHICS MASONRY =====
const graphicsGrid = document.querySelector(".graphics-portfolio .projects-grid");

if (graphicsGrid) {
  const msnry = new Masonry(graphicsGrid, {
    itemSelector: ".project-card",
    percentPosition: true,
    gutter: 20
  });

  // relayout after images load
  imagesLoaded(graphicsGrid, function () {
    msnry.layout();
  });
}




