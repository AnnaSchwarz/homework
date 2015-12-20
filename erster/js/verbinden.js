// Модуль связи
;var connectMe = (function (){

	// Инициализация модуля
	var init = function(){

				_setUpListners();
			},
			// Прослушка выбранных событий
			_setUpListners = function (){
				$('#contactme-form').on('submit', _submitForm); 
			},
			// Функция обработки формы
			_submitForm = function (ev) {
				 ev.preventDefault(); 
				 var form = $(this),         
	          	 url = 'test.php', 
	          	 defObject = _ajaxForm(form, url); 
	          	 
	          	 // здесь работаем с ответом с сервера - defObject
	   		 },
	   		// Универсальная ajax-функция
	    	_ajaxForm = function (form, url) {
      			// Обращаемся к модулю validation.js (способ общения между модулями)
	      		if (!validation.validateForm(form)) return false; 
	      		var data = form.serialize(); 
	   		 };   

	// Возвращает объект (публичные методы)
	return {
		init: init
	};

})();

// Вызов модуля
connectMe.init();