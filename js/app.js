/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const nav = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section[data-nav]");
let previousActiveSection = sections[0];
let previousActiveNavLink;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavigationMenu() {
  const navItemsFragment = document.createDocumentFragment();

  for (let i = 0; i < sections.length; i++) {
    let navItem = document.createElement("li");
    let navLink = document.createElement("a");

    // Setting up the first item in the menu as active by default
    if (i === 0) {
      navLink.setAttribute("class", "menu__link menu__item__active");
    } else {
      navLink.setAttribute("class", "menu__link");
    }

    navLink.setAttribute("id", `secLink${i + 1}`);
    previousActiveNavLink = navLink;

    navLink.textContent = sections[i].getAttribute("data-nav");

    navItem.appendChild(navLink);
    navItemsFragment.appendChild(navItem);
  }

  nav.appendChild(navItemsFragment);
}

// Add class 'active' to section when near top of viewport
function setActiveSection(scrollPosition) {
  for (let i = 0; i < sections.length; i++) {
    if (
      (i + 1 === sections.length && scrollPosition >= sections[i].offsetTop) ||
      (scrollPosition >= sections[i].offsetTop &&
        scrollPosition < sections[i + 1].offsetTop)
    ) {
      previousActiveSection.classList.remove("active__section");
      sections[i].classList.add("active__section");
      previousActiveSection = sections[i];

      previousActiveNavLink.classList.remove("menu__item__active");
      const activeNavLink = nav.querySelector(`#secLink${i + 1}`);
      activeNavLink.classList.add("menu__item__active");
      previousActiveNavLink = activeNavLink;

      break;
    }
  }
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// when document is "ready".
document.addEventListener("DOMContentLoaded", buildNavigationMenu());

// Scroll to section on link click
// when a link is "clicked"

// Set sections as active
document.addEventListener("scroll", function (e) {
  let topOfViewport = e.target.defaultView.visualViewport.pageTop;
  setActiveSection(topOfViewport);
});
