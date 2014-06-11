$(document).ready(function(){

  //Assign Delegated Click Handler to List Items
  $('#todo_list').delegate('li .todo_label', 'click', function(event){
    var todo = $(event.target).closest('li');
    todo.toggleClass('todo_done');
  });

  //Assign Delegated Click Handler to List Items
  $('#todo_list').delegate('li .todo_delete', 'click', function(event){
    var todo = $(event.target).closest('li');
    todo.remove();
  });


  //Assign Click Handler to Add Button


  //Validate Input Prior to Adding
  var parsleyConfig = {
    errorsContainer: function(pEle) {
      var $err = pEle.$element.siblings('.todo_form_error');
      return $err;
    }
  }

  $('#todo_add_form').parsley(parsleyConfig);

  //Clear Form Errors


  //Set Form Error




});

