"use strict";

$(function () {

    $.fn.sej_exists = function () {
      return this.length !== 0;
    }

    var jumboHeight = $('.jumbotron').outerHeight();

    function parallax() {
      var scrolled = $(window).scrollTop();
      $('.bg').css('height', (jumboHeight - scrolled) + 'px');
    }

    $(window).scroll(function (e) {
      parallax();
    });


    function scrollToAnchor(aid, e) {
      var aTag = $("a[name='" + aid + "']");
      if (aTag.sej_exists()) {
        e.preventDefault();
        $('html,body').animate({scrollTop: aTag.offset().top}, 1500, function () {
            window.location.hash = aid;
          }
        );
      }
    }

    $(".sej_section_jump").click(function (e) {
      var me = $(e.target);
      var tag = me.attr('href');
      if (tag) {
        var tagName = tag.substring(1);
        if (tagName) {
          scrollToAnchor(tagName, e);
        }
      }
    });

    function init_page() {
    }

    init_page();
  }
);