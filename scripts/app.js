$(document).ready(function() {
	
	var listo = [];

	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	}

	$('#newTaskForm').hide();

	var addTask = function(task) {
		if (task) {
			task = new Task(task);
			listo.push(task);

			$('#newItemInput').val('');

			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm, #newListItem, #saveLists').fadeToggle('fast', 'linear');
	};

	$('#saveNewItem').on('click', function(e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	$('#saveLists').on('click', function() {
		// Saves the list to local storage
		var savedNewTodo = $('#newList').html();
		console.log('new list saved: ' + savedNewTodo);

		var savedProgressToDo = $('#currentList').html();
		console.log('progress saved: ' + savedProgressToDo);

		var savedArchivedToDo = $('#archivedList').html();
		console.log('archived saved: ' + savedArchivedToDo);

	});

	// Opens form
	$('#newListItem').on('click', function() {
		$('#newTaskForm, #newListItem, #saveLists').fadeToggle('fast', 'linear');
	});

	//Closes form
	$('#cancel').on('click', function(e) {
		e.preventDefault();
		$('#newTaskForm, #newListItem, #saveLists').fadeToggle('fast', 'linear');
	});

	$(document).on('click', '#item', function(e) {
		e.preventDefault();
			var task = this;
			advanceTask(task);
			task.id = 'inProgress';
			$('#currentList').append(this.outerHTML);
			$('.status-bar').fadeIn(10).fadeOut(2000).text('Item changed to ' + task.id).css({'color' : '#336600'});

			
	});

	$(document).on('click', '#inProgress', function(e) {
		e.preventDefault();
		var task = this;
		task.id = 'archived';
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
		$('.status-bar').fadeIn(10).fadeOut(2000).text('Item changed to ' + task.id).css({'color' : '#ff0000'});

	});

	$(document).on('click', '#archived', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		$('.status-bar').fadeIn(10).fadeOut(2000).text('Congratulations on completing an item!').css({'color' : '#3333ff'});

	});

	var advanceTask = function(task) {
		var compare = task.innerText.trim();
		console.log('compare: ' + compare);
		for (var i = 0; i < listo.length; i++) {
			if (listo[i].task === compare) {
				console.log(listo[i].id);
				if (listo[i].id === 'new') {
					listo[i].id = 'inProgress';
				} else if (listo[i].id === 'inProgress') {
					listo[i].id = 'archived';
				} else {
					listo.splice(i, 1);
				}
			}
		}

		task.remove();

	}



});