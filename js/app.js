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
  const nav = document.querySelector("#navbar__list");
  const sections = document.querySelectorAll("section[data-nav]");
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

    navLink.textContent = sections[i].getAttribute("data-nav");

    navItem.appendChild(navLink);
    navItemsFragment.appendChild(navItem);
  }

  nav.appendChild(navItemsFragment);
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
