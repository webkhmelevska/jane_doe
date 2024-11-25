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

const counters = document.querySelectorAll(".numbers__number");

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
  elScroll = document.getElementById("scroll-top");
  if (scroll_pos > 5) {
    elScroll.style.bottom = "44px";
  } else {
    elScroll.style.bottom = "-100px";
  }
}

window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

$(function () {
  // scroll to top
  $(".scroll-top").click(scrollToTop);

  function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
    return false;
  }
});

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      if (change.target.classList.contains("numbers__number")) {
        counters.forEach((counter) => {
          counter.innerText = 0;
          let count = 0;
          function updCount() {
            const target = parseInt(counter.dataset.count);
            if (count < target) {
              count++;
              counter.innerText = count;
              setTimeout(updCount, 10);
            } else {
              counter.innerText = target;
            }
          }
          updCount();
        });
        return;
      }
      change.target.classList.add("element-show");
    } else {
      if (change.target.classList.contains("numbers__number")) {
        counters.forEach((counter) => {
          counter.innerText = 0;
        });
        return;
      }
      change.target.classList.remove("element-show");
    }
  });
}

let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".el-animate");

for (let elm of elements) {
  observer.observe(elm);
}
