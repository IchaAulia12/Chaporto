/* ==========================================================================
   main.js — small progressive enhancements

   Everything here is optional. If JavaScript fails or is disabled, the site
   still works completely: all content is in the HTML, navigation is plain
   links, and the form is a normal HTML form.

   Contents:
   1. Theme toggle (light / dark, remembered)
   2. Mobile navigation
   3. Current year in the footer
   4. Fade sections in on scroll
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------------------------------------------------
     1. THEME TOGGLE
     The <head> script already applied any saved theme before paint.
     Here we just handle clicks and keep the button label accurate.
     -------------------------------------------------------------------- */
  var root = document.documentElement;
  var themeButtons = document.querySelectorAll("[data-theme-toggle]");

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
  }

  function updateThemeButtons() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    themeButtons.forEach(function (button) {
      button.setAttribute("aria-label", "Switch to " + next + " theme");
      button.setAttribute("title", "Switch to " + next + " theme");
    });
  }

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private browsing — the choice just won't persist */
      }
      updateThemeButtons();
    });
  });

  updateThemeButtons();

  // If the visitor hasn't made a manual choice, follow the OS if it changes.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!root.hasAttribute("data-theme")) updateThemeButtons();
  });

  /* --------------------------------------------------------------------
     2. MOBILE NAVIGATION
     CSS shows the menu when the header has data-nav-open="true".
     -------------------------------------------------------------------- */
  var header = document.getElementById("site-header");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!header || !navToggle) return;
    header.setAttribute("data-nav-open", open ? "true" : "false");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after tapping a link (matters for same-page #anchors)
    if (nav) {
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) setNav(false);
      });
    }

    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });

    // Clicking outside closes it
    document.addEventListener("click", function (event) {
      if (
        navToggle.getAttribute("aria-expanded") === "true" &&
        !event.target.closest(".header-inner")
      ) {
        setNav(false);
      }
    });
  }

  /* --------------------------------------------------------------------
     3. CURRENT YEAR — so the footer never goes stale
     -------------------------------------------------------------------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --------------------------------------------------------------------
     4. REVEAL ON SCROLL
     Skipped entirely for visitors who prefer reduced motion.
     -------------------------------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");
  var wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealables.length && wantsMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    revealables.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No observer support, or reduced motion: show everything immediately.
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
