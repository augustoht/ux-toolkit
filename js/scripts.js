$(document).ready(function() {
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

function movieFormatResult(movie) {
    var markup = "<table class='movie-result'><tr>";
    if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
        markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
    }
    markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
    if (movie.critics_consensus !== undefined) {
        markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
    }
    else if (movie.synopsis !== undefined) {
        markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
    }
    markup += "</td></tr></table>"
    return markup;
}

function movieFormatSelection(movie) {
    return movie.title;
}
