const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 0,
  
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 0
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

   autoplay: {
   delay: 5000,
 },
});