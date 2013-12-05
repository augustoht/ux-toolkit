$(document).ready(function() {
  sticky();
  $('a[href^="#"]').on('click', function(e) {
    var $target, target;
    e.preventDefault();
    target = this.hash;
    $target = $(target);
    return $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      return window.location.hash = target;
    });
  });
});

sticky = function() {
  var lastPosition, offset;
  lastPosition = $(document).scrollTop();
  offset = 400;
  return $(window).scroll(function(event) {
    if (lastPosition < $(document).scrollTop() && $(document).scrollTop() > offset) {
      $('#sticker').css('margin-top', '0');
    } else if (lastPosition > $(document).scrollTop() && $(document).scrollTop() < offset) {
      $('#sticker').css('margin-top', '-100px');
    }
    return lastPosition = $(document).scrollTop();
  });
};