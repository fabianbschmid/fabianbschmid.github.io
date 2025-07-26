const $headerButton = $("#header-button");
const $nav = $("#main-navigation");
const $header = $("#header");
const $backToTop = $("#back-to-top");
const $main = $("#main");
const $contactSubmit = $("#contact-form-submit");
const $spider = $("#spider");

function moveSpider(e) {
  const posy = 120 + e.clientY / 10;
  const rotate = Math.sin(e.clientY/100);
  $spider.css('transform',  'rotateZ(' + rotate + 'deg) translateY(' + posy + 'px)');
}

$(document).ready(function() {

  $headerButton.click(function() {
    //Open Navbar on Button click
    $nav.toggleClass("visible");
    $main.toggleClass("shifted");

    if ($nav.hasClass("visible")) {

      setTimeout(() => {
        $spider.addClass("free");
        console.log("ho")
        $(document).on("mousemove", moveSpider);
      }, 1500);
    }
    else {
      $spider.removeClass("free");
      $spider.removeAttr("style");
      $(document).off("mousemove", moveSpider);
    }

    // Viewport width
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w <= 400) {
      $headerButton.toggleClass("mobile-nav-visible");
    }
  });

  // stop click event when clicking on header-button
  $headerButton.click(function(event){
    event.stopPropagation();
  });

  //on scroll
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 400) {
        //show buttons on sroll
        $headerButton.addClass("scrolled");
        $backToTop.addClass("scrolled");

    }
    else {
        //Hide buttons on no scroll
        $headerButton.removeClass("scrolled");
        $backToTop.removeClass("scrolled");
    }
  });

  //hide menu on click on main area
  $main.click(function() {
    if ($nav.hasClass("visible")) {
      $nav.removeClass("visible");
      $main.removeClass("shifted");
      $spider.removeClass("free");
      $spider.removeAttr("style");
      $(document).off("mousemove", moveSpider);

      $headerButton.removeClass("mobile-nav-visible");
    }
  });


  // Smooth Scrolling on Anchor link
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 600);
          return false;
        }
      }
    });
  });

});
