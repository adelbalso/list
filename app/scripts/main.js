var _ = require('underscore');

// var tasks = new Firebase("https://blinding-torch-6766.firebaseio.com/");

var tasks = ['This is a todo item','Pretty nifty stuff'];

$(function(){
	var redrawTasks = function(){
		var $resultsList = $('.list-items');

		$resultsList.empty();
		var cleanTasks = _.map(tasks,function(i){ return $.trim(i); });
		    cleanTasks = _.uniq(cleanTasks),
		    cleanTasks = _.compact(cleanTasks);
		$.each(cleanTasks,function(index, task){
			$resultsList.append('<li class="list-item"><div class="li-content"><input type="checkbox" class="checkbox"><span class="task-name">' + task + '</span></div></li>' );
		})
	}
	
	$(".btn-submit").click(function(e){
		var $form = $("#todo-submission-form"),
		    $input = $form.find('input'),
		    val = $input.val();

	    tasks.push(val);
	    // $form.hide();
	    $input.val('');
	    redrawTasks();
	    // $form.show();

		e.preventDefault();
	});

	redrawTasks();

	$(".list-item").click(function() {
		var $task = $(this).find('.task-name')
			val = $task.html()

		if($(this).find('#todo-submission').length == 0) {
			$(this).find('.li-content').hide();
			$(this).html('<input id="todo-submission" type="text"><button class="btn-submit btn-add-task">done</button>');
			$(this).find('input').val(val);
		}
	});

});
