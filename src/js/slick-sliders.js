const settings = {
  autoplay: false,
  speed: 1000,
  autoplaySpeed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  arrows: false,
  prevArrow: "<div class='myarrow myarrow_prev'>Prev</div>",
  nextArrow: "<div class='myarrow myarrow_next'>Next</div>",
  appendDots: ".container_dots",
  dotsClass: "dots-box",
  dots: false,
  focusOnSelect: true,

  responsive: [
    {
      breakpoint: 500,
      settings: {},
    },
    {
      breakpoint: 600,
      settings: {
        arrows: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        dots: true,
        arrows: true,
      },
    },
  ],
};

$(".slider").slick(settings);
