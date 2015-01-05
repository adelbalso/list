var _ = require('underscore');

// var tasks = new Firebase("https://blinding-torch-6766.firebaseio.com/");

var tasks = ['This is a todo item','Pretty nifty stuff'];

$(function(){
	var redrawTasks = function(){
		var $resultsList = $('.list-items');

		$resultsList.empty();
		$.each(tasks,function(index, task){
			$resultsList.append('<li class="list-item">' + task + '</li>' );
		})
	}
	
	$(".btn-submit").click(function(e){
		var $form = $("#todo-submission-form"),
		    $input = $form.find('input'),
		    val = $input.val();

	    tasks.push(val);
	    redrawTasks();

		e.preventDefault();
	});
});
