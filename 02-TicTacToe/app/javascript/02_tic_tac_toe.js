"use strict";

$(function () {

    function install_sounds() {
      $('<audio id="ttt_sounds"><source src="notify.mp3" type="audio/mpeg"></audio>').appendTo('#ttt_board');
    }

    function play_sound() {
      $('#ttt_sounds')[0].play();
    }

    function init_page()
    {
      install_sounds();
      reset_board();
    }

    function reset_board() {
      $('#ttt_board .ttt_cell').addClass('ttt_free').removeClass('ttt_x').removeClass('ttt_o').data('ttt_player',null);
      var board  = $('#ttt_board');
      board.data('ttt_turn', 'o');

      $("#ttt_sounds").html('<embed src="" hidden="true" autostart="false" loop="false" />');

    }

    function take_turn(cell)
    {
      var board  = $('#ttt_board');
      var turn = board.data('ttt_turn');
      cell.removeClass('ttt_free').addClass('ttt_' + turn).data('ttt_player', turn);
      board.data('ttt_turn', turn == 'o' ? 'x' : 'o');
    }

    $('#ttt_reset').click(function () {
      reset_board();
    });

    $('#ttt_board').on('click', '.ttt_cell.ttt_free', function (event) {
       var cell = $(this);
      take_turn(cell);
    });

    init_page();
  }
);