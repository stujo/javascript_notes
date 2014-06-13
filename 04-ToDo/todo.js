$(document).ready(function () {

  function build_todo(todo) {
    var li = $("<li>");
    var delete_button = $('<div class="todo_delete"></div>');
    var label = $('<div class="todo_label"></div>');
    // use text instead of html() to insert insecure content
    label.text(todo);
    li.append(delete_button);
    li.append(label);
    return li;
  }

  //Assign Delegated Click Handler to List Items
  $('#todo_list').delegate('li .todo_label', 'click', function (event) {
    var todo = $(event.target).closest('li');
    todo.toggleClass('todo_done');
    update_status_panels();
  });

  //Assign Delegated Click Handler to List Items
  $('#todo_list').delegate('li .todo_delete', 'click', function (event) {
    var todo = $(event.target).closest('li');
    todo.remove();
    update_status_panels();
  });

  //Validate Input Prior to Adding
  var parsleyConfig = {
    errorsContainer: function (pEle) {
      return $('#todo_add_form').find('.todo_form_error');
    }
  }

  var parsley = $('#todo_add_form').parsley(parsleyConfig);

  //Assign Submit Handler to Add Form After Parsley
  $("#todo_add_form").submit(function (event) {

    var todo = $('#todo_title').val();

    if (todo) {
      var todo = build_todo(todo);

      $('#todo_list').append(todo);

      $('#todo_title').val('');

      parsley.reset();
    }

    update_status_panels();

    return false;
  });

  $('#todo_list_delete_all button').click(function () {
    $('#todo_list li').remove();
    update_status_panels();
  });

  function update_status_panels() {
    var empty = $('#todo_list li').length == 0;

    if (empty) {
      $('#todo_list_delete_all').hide();
      $('#todo_list_placeholder').show();
    }
    else {
      $('#todo_list_delete_all').show();
      $('#todo_list_placeholder').hide();
    }
  }

  update_status_panels();
});

