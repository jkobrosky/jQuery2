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
			console.log(task);
			listo.push(task);

			$('#newItemInput').val('');

			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	};

	$('#saveNewItem').on('click', function(e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	// Opens form
	$('#newListItem').on('click', function() {
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});

	//Closes form
	$('#cancel').on('click', function(e) {
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});

	$(document).on('click', '#item', function(e) {
		e.preventDefault();
			var task = this;
			task.id = 'inProgress';

			advanceTask(task);
			$('#currentList').append(this.outerHTML);
			// task.remove()
	});

	$(document).on('click', '#inProgress', function(e) {
		e.preventDefault();
		var task = this;
		task.id = 'archived';
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
		// task.remove()
	});

	$(document).on('click', '#archived', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		// task.remove()
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