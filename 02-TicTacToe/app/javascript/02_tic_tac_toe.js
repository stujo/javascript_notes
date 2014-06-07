"use strict";

$(function () {

    function install_sounds() {
      // Sounds from: http://www.soundjay.com/beep-sounds-1.html
      $('<audio id="ttt_sounds"><source src="sounds/beep-03.mp3" type="audio/mpeg"></audio>').appendTo('#ttt_board');
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

    $('#ttt_board').on('click', '.ttt_cell', function (event) {
      var cell = $(this);

      if(cell.hasClass('ttt_free')) {
        take_turn(cell);
      }
      else
      {
        play_sound();
      }
    });

    init_page();
  }
);