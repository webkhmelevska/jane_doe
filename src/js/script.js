const menuButton = $("#menu-button");
const mobileMenuContainer = $("#mobile-menu-container");

function initMobile() {
  console.log("is-mobile");
}

function initTablet() {
  console.log("is-tablet");
}

function initDesktop() {
  console.log("is-desktop");
  resetMobileMenu();
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);

$(document).on("click", "#menu-button", handleMenu);

function handleMenu(e) {
  e.preventDefault();
  $(this).toggleClass("active");
  mobileMenuContainer.slideToggle();
}

function resetMobileMenu() {
  menuButton.removeClass("active");
  mobileMenuContainer.hide();
}
