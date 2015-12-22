;var myModule = (function (){

	var init = function(){
		_setUpListners();
	};


	var _setUpListners = function(){
			//прослушка событий...
			$('#add-new').on('click', _showModal); //открыть мод. окно
			$('#add-form-modal').on('submit', _addProject); //добавить проект 
			$('#fileupload').on('change', _changefileUpload); // добавление файла в #fileupload 
	};

	var _showModal = function(ev){
		console.log('Answer');
		ev.preventDefault();
	//	$('#new-proj-popup').bPopup();
	var divPop = $('.new-proj-popup'),
		form = divPop.find('.form-modal');
		divPop.bPopup(
			{
			positionStyle: 'fixed',
			onClose : function () {
			console.log('сброс'); // функция из документации bPopup - очистка формы
				// form.find('.server-message').text('').hide(); // очищаем текст формы и прячем её
				this.find('.form-modal').trigger("reset"); // сбрасываем форму
			}
			});
	};
	var _changefileUpload = function () {
		var input = $(this), 
			name = input[0].files[0].name; 
			name = _getNameFromPath(input.val()); 

		$('#filename')
			.val(name)
			.trigger('hideTooltip') 
			.removeClass('has-error'); 
	};
		var _getNameFromPath = function (path) {
		return path.replace(/\\/g, '/').replace(/.*\//, '');
	};
	var _addProject = function(ev){
		ev.preventDefault();

		var form = $(this), 
			url = $(this).attr('action'),
			url = 'add_project.php', 
			myServerGiveMeAnAnswer = _ajaxForm(form, url); 		

	if (myServerGiveMeAnAnswer) { 
		myServerGiveMeAnAnswer.done(function(ans) { 
			// console.log(ans);

			var successBox = form.find('.success-message'),
				errorBox = form.find('.error-message');

			if(ans.status === 'OK'){
				// console.log(ans.text);
				errorBox.hide();
				successBox.text(ans.text).show(); 
			}else{
				// console.log(ans.text);
				successBox.hide();
				errorBox.text(ans.text).show(); 
			}
		});
		}
	};

	var _ajaxForm = function (form, url) { 

		if (!validation.validateForm(form)) return false;  
		var data = form.serialize(); 

		var result = $.ajax({ 
			url: url, 
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail( function(ans) {
			 console.log('Проблемы в PHP');
			form.find('.error-message').text('На сервере произошла ошибка').show();
		});

		return result; // возвращаем результат запроса на сервер
	};

	return{
		init:init
	}

})();

myModule.init();