import $ from "jquery";

$(document).ready(function() {
  var applyRatio = function() {
    if($(window).width() > $(window).height()) {
      $(".fit-square").css("height", "100%");
      $(".fit-square").css("width", "auto");
    } else {
      $(".fit-square").css("height", "auto");
      $(".fit-square").css("width", "100%");
    }
  };
  applyRatio();
  $(window).bind("resize", applyRatio);
});