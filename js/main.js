document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('site-nav');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var hero = document.getElementById('hero');

  // Smooth-scroll for in-page nav links
  var scrollLinks = document.querySelectorAll('[data-scroll]');
  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeMobileNav();
        }
      }
    });
  });

  // Darken sticky nav once scrolled past the hero
  function updateNavOnScroll() {
    var heroHeight = hero ? hero.offsetHeight : 0;
    if (window.scrollY > heroHeight * 0.5) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavOnScroll, { passive: true });
  updateNavOnScroll();

  // Mobile hamburger menu toggle
  function closeMobileNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileNav() {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleMobileNav);

  // Close mobile nav on resize back to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileNav();
    }
  });
});
