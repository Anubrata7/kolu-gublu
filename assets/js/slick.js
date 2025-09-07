$('.slickSlider').slick({
  //   infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  //   centerPadding: '60px',
  accessibility: false,
  prevArrow: '<button type="button" class="slick-prev absolute top-[50%] left-0 z-[1] -translateY-1/2 bg-gray-700 py-1 px-2 flex items-center justify-center text-white rounded-lg opacity-0.9"><i class="bi bi-chevron-left"></i></button>',
  nextArrow: '<button type="button" class="slick-prev absolute top-[50%] right-0 z-[1] -translateY-1/2 bg-gray-700 py-1 px-2 flex items-center justify-center text-white rounded-lg opacity-0.9"><i class="bi bi-chevron-right"></i></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        // centerMode: true,
        centerPadding: '20px',
        slidesToShow: 3,
        accessibility: true
      }
    }
  ]
});