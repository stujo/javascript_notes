"use strict";

$(function () {

    function install_sounds() {
      // Sounds from: http://www.soundjay.com/beep-sounds-1.html
      $('<audio id="ttt_sounds"><source src="sounds/beep-03.mp3" type="audio/mpeg"></audio>').appendTo('#ttt_board');
    }

    function play_sound() {
      $('#ttt_sounds')[0].play();
    }

    function init_page() {
      install_sounds();
      reset_board();
    }

    function reset_board() {
      $('#ttt_board .ttt_cell').addClass('ttt_free').removeClass('ttt_x').removeClass('ttt_o').removeClass('ttt_winner').data('ttt_player', null);
      var board = $('#ttt_board');
      board.data('ttt_turn', 'o');
      board.data('ttt_inprogress', true);
    }

    function show_winner(line, squares) {
      var board = $('#ttt_board');
      board.data('ttt_inprogress', false);
      $.each(squares, function (i, value) {
        value.addClass('ttt_winner');
      });
    }

    function check_for_winner() {
      var board = $('#ttt_board');

      var lines = {
        top: [ $('#ttt_1_1'), $('#ttt_1_2'), $('#ttt_1_3') ],
        middle: [ $('#ttt_2_1'), $('#ttt_2_2'), $('#ttt_2_3') ],
        bottom: [ $('#ttt_3_1'), $('#ttt_3_2'), $('#ttt_3_3') ],

        left: [$('#ttt_1_1'), $('#ttt_2_1'), $('#ttt_3_1')],
        center: [$('#ttt_1_2'), $('#ttt_2_2'), $('#ttt_3_2')],
        right: [$('#ttt_1_3'), $('#ttt_2_3'), $('#ttt_3_3')],

        tlbr: [$('#ttt_1_1'), $('#ttt_2_2'), $('#ttt_3_3')],
        bltr: [$('#ttt_3_1'), $('#ttt_2_2'), $('#ttt_1_3')],

      }

      $.each(lines, function (key, squares) {
        if (squares[0].data('ttt_player')
          && (squares[0].data('ttt_player') == squares[1].data('ttt_player') && squares[1].data('ttt_player') == squares[2].data('ttt_player'))) {
          return show_winner(key, squares);
        }
      });
    }

    function take_turn(cell) {
      var board = $('#ttt_board');

      if (board.data('ttt_inprogress')) {
        var turn = board.data('ttt_turn');
        cell.removeClass('ttt_free').addClass('ttt_' + turn).data('ttt_player', turn);
        board.data('ttt_turn', turn == 'o' ? 'x' : 'o');

        check_for_winner();
      }
      else {
        play_sound();
      }
    }

    $('#ttt_reset').click(function () {
      reset_board();
    });

    $('#ttt_board').on('click', '.ttt_cell', function (event) {
      var cell = $(this);

      if (cell.hasClass('ttt_free')) {
        take_turn(cell);
      }
      else {
        play_sound();
      }
    });

    init_page();
  }
);