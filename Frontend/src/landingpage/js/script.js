jQuery("#carousel").owlCarousel({
    autoplay: true,
    rewind: true,
    loop: true,
    /* use rewind if you don't want loop */
    margin: 20, 
    /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
  
      600: {
        items: 3
      },
  
      1024: {
        items: 3
      },
  
      1366: {
        items: 3
      }
    }
});
jQuery("#carousel1").owlCarousel({
    autoplay: true,
    rewind: true,
    loop: true,
    /* use rewind if you don't want loop */
    margin: 20, 
    /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
  
      600: {
        items: 1
      },
  
      1024: {
        items: 2
      },
  
      1366: {
        items: 2
      }
    }
});
$( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
$( ".owl-next").html('<i class="fa fa-chevron-right"></i>');