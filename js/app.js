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
let previousActiveSection;
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
const buildNavigationMenu = () => {
  const navItemsFragment = document.createDocumentFragment(); // gathering all li's in one fragment container for better performance.

  for (let i = 0; i < sections.length; i++) {
    let navItem = document.createElement("li");
    let navLink = document.createElement("a");
    // Setting up the anchor element in navigation:
    navLink.setAttribute("class", "menu__link"); // to apply style.
    navLink.setAttribute("id", `secLink${i}`); // to use when scrolling.
    navLink.setAttribute("href", `#`); // to look clickable.
    navLink.textContent = sections[i].getAttribute("data-nav"); // getting the title of the nav item.

    navItem.appendChild(navLink);
    navItemsFragment.appendChild(navItem);
  }

  nav.appendChild(navItemsFragment);
};

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
  let scrollTopPosition = window.scrollY; // the top value of the window to compare with.
  const goTopLink = document.querySelector("#go__top");

  for (let i = 0; i < sections.length; i++) {
    // looping through all sections.
    // checking whenever a section top reaches the top of viewport.
    if (
      scrollTopPosition >= sections[i].offsetTop &&
      scrollTopPosition < sections[i].offsetTop + sections[i].clientHeight
    ) {
      // if so, then:

      // set section as active and update previous section if it's defined to not be active.
      // previousActiveSection will be undefined at first, until scrolling and reaching a section.
      previousActiveSection &&
        previousActiveSection.classList.remove("active__section");
      sections[i].classList.add("active__section");
      previousActiveSection = sections[i];

      // set navigation link as active and update previous navigation link if it's defined to not be active.
      // previousActiveNavLink will be undefined at first, until scrolling and reaching a section.
      previousActiveNavLink &&
        previousActiveNavLink.classList.remove("menu__item__active");
      const activeNavLink = nav.querySelector(`#secLink${i}`);
      activeNavLink.classList.add("menu__item__active");
      previousActiveNavLink = activeNavLink;
      goTopLink.setAttribute("style", "display: block;");
      break;
    } else if (scrollTopPosition < sections[0].offsetTop) {
      // else, when it reaches the top of the page.
      previousActiveSection &&
        previousActiveSection.classList.remove("active__section");
      previousActiveNavLink &&
        previousActiveNavLink.classList.remove("menu__item__active");
      goTopLink.setAttribute("style", "display: none;");
    }
  }
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
  e.preventDefault();
  // Making sure that an anchor is clicked by checking the node name.
  if (e.target.nodeName === "A") {
    // Getting section id to scroll to, which is the same id concat in anchor id "#secLink${i}"
    const linkId = e.target.id;
    const sectionId = linkId.slice(linkId.indexOf("k") + 1);

    sections[sectionId].scrollIntoView({
      behavior: "smooth",
    });
  }
};

// Scroll to top function
const scrollToTop = (e) => {
  e.preventDefault();
  document.querySelector("#top").scrollIntoView({
    behavior: "smooth",
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNavigationMenu);

// Scroll to section on link click
nav.addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener("scroll", setActiveSection);

// Scroll to top
document.querySelector("#go__top").addEventListener("click", scrollToTop);
