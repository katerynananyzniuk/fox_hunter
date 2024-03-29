$(document).ready(function(){
  $('.slider').slick({
    dots:true,
    speed:1000,
    autoplay:false,
    autoplayspeed:2500,
    pauseOnFocus:true,
    pauseOnHover:true,
    pauseOnDotsHover:true,
    draggable:false,
    touchMove:true,
    waitForAnimate:false,
    slick:false
  });
};
function(){
  $('.reviews').slick({
    dots:false,
    speed:1000,
    autoplay:false,
    autoplayspeed:2500,
    pauseOnFocus:true,
    pauseOnHover:true,
    pauseOnDotsHover:true,
    draggable:false,
    touchMove:true,
    waitForAnimate:false
  });
};
function(){
  $('.slider-preview-main').slick({
    arrows:true,
    dots:false,
    infinite:true,
    initialSlide:0,
    speed:500,
    autoplay:false,
    draggable:false,
    swipe:true,
    touchMove:true,
    waitForAnimate:false,
    fade:false
  });
};
function(){
  $('.slider-preview-add').slick({
    arrows:false,
    dots:false,
    infinite:true,
    initialSlide:0,
    speed:500,
    autoplay:false,
    draggable:false,
    touchMove:true,
    waitForAnimate:false,
    slidesToShow:4,
    centerMode:false
  });
});
