"use strict";

$(function () {

    var VERSION = 2;

    var local_storage_key = 'tic_tac_toe';

    var selector_array = function () {
      var selectors = [];
      for (var x = 1; x <= 3; x++) {
        for (var y = 1; y <= 3; y++) {
          selectors.push('#ttt_' + x + '_' + y);
        }
      }
      return selectors;
    }();

    function data_for_storage() {

      var board = $('#ttt_board');
      var turn = board.data('ttt_turn');

      var data = [];

      for (var i = 0; i < selector_array.length; i++) {
        data.push($(selector_array[i]).data('ttt_player'));
      }
      return {version: VERSION, turn: turn, data: data};
    }

    function save_to_local_storage() {
      localStorage[local_storage_key] = JSON.stringify(data_for_storage());
    }

    function load_from_local_storage() {
      var game = localStorage[local_storage_key];
      return JSON.parse(game);
    }


    function install_sounds() {
      // Sounds from: http://www.soundjay.com/beep-sounds-1.html
      $('<audio id="ttt_sounds_buzz"><source src="sounds/beep-03.mp3" type="audio/mpeg"></audio>').appendTo('#ttt_board');
      $('<audio id="ttt_sounds_yeay"><source src="sounds/bart_aye_carumba.wav" type="audio/mpeg"></audio>').appendTo('#ttt_board');
    }

    function play_buzzer() {
      $('#ttt_sounds_buzz')[0].play();
    }

    function play_yeay() {
      $('#ttt_sounds_yeay')[0].play();
    }

    function init_page() {
      install_sounds();
      reset_board(load_from_local_storage());
    }

    function valid_game_data(data)
    {
      return data && data.hasOwnProperty('version') && data['version'] == VERSION;
    }

    function reset_board(data) {
      var board = $('#ttt_board');
      board.data('ttt_turn', 'o');
      board.data('ttt_inprogress', true);

      $('#ttt_board .ttt_cell').addClass('ttt_free').removeClass('ttt_x').removeClass('ttt_o').removeClass('ttt_winner');

      // We are setting up a clean board
      if (!valid_game_data(data)) {
        $('#ttt_board .ttt_cell').data('ttt_player', null);
        save_to_local_storage();
      }
      else {
        // We are setting up a previous board
        board.data('ttt_turn', data['turn']);

        for (var i = 0; i < selector_array.length; i++) {
          var player = data['data'][i];
          if (player == 'x' || player == 'o') {
            $(selector_array[i]).removeClass('ttt_free').addClass('ttt_' + player).data('ttt_player', player);
          }
        }
        check_for_winner();
      }

    }

    function show_winner(line, squares) {
      var board = $('#ttt_board');
      board.data('ttt_inprogress', false);
      $.each(squares, function (i, value) {
        value.addClass('ttt_winner');
      });
      play_yeay();
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

      };

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
        play_buzzer();
      }
      save_to_local_storage();
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
        play_buzzer();
      }
    });

    init_page();
  }
);