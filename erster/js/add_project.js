;var myModule = (function (){

	var init = function(){
		_setUpListners();
	};


	var _setUpListners = function(){
			//прослушка событий...
			$('#add-new').on('click', _showModal); //открыть мод. окно
			$('#add-form-modal').on('submit', _addProject); //добавить проект 
		//	$('#fileupload').on('change', _changefileUpload); // добавление файла в #fileupload 
	};

	var _showModal = function(ev){
		console.log('Answer');
		ev.preventDefault();
	//	$('#new-proj-popup').bPopup();
	var divPop = $('#new-proj-popup'),
		form = divPop.find('.form-modal');
		divPop.bPopup();
	};

	var _addProject = function(ev){
		ev.preventDefault();

		var form = $(this), // взять "этот" элемент, т.е. в _addProject
			url = $(this).attr('action'),
			url = 'add_project.php', // файл, к которому будем обращаться при отправке формы
			myServerGiveMeAnAnswer = _ajaxForm(form, url); // сюда будем передавать ответ из ajaxForm		

	if (myServerGiveMeAnAnswer) { // Не выполнять код ниже, если форма не проходит валидацию - был ли запрос на сервер
		myServerGiveMeAnAnswer.done(function(ans) { // сюда будет приходить ответ
			// console.log(ans);

			// обработка ошибок при добалвении проекта
			var successBox = form.find('.success-message'),
				errorBox = form.find('.error-message');

			if(ans.status === 'OK'){
				// console.log(ans.text);
				errorBox.hide();
				successBox.text(ans.text).show(); // если всё ок, то вставлять текст ок
			}else{
				// console.log(ans.text);
				successBox.hide();
				errorBox.text(ans.text).show(); // если всё не ок, то вставлять в блок .error-me текст ошибки
			}
		});
		}
	};

	var _ajaxForm = function (form, url) { // добавляем универсальную ajax-функцию

		// 1. Проверить форму
		// 2. Собрать данные из формы
		// 3. Вернуть ответ с сервера

		if (!validation.validateForm(form)) return false;  // Возвращает false, если не проходит валидацию
		var data = form.serialize(); // собираем данные из формы в объект data

		var result = $.ajax({ // результат запроса на сервер помещаем в переменную и далее эту переменную возвращаем
			url: url, // здесь будет url сайта
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail( function(ans) {
			// console.log('Проблемы в PHP');
			form.find('.error-message').text('На сервере произошла ошибка').show();
		});

		return result; // возвращаем результат запроса на сервер
	};

	return{
		init:init
	}

})();

myModule.init();