// Модуль валидации
;var validation = (function (){

	// Инициализация модуля
	var init = function(){
		
			_setUpListners();
		},

		validateForm = function (form) { 

	    	var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'), 
	        	valid = true; 
	
	      	$.each(elements, function(index, val) { 
	        	var element = $(val), 
	            	val = element.val(), 
	            	pos = element.attr('qtip-position'); 

	            // Проста проверка
	        	if(val.length === 0){ 
	        		console.log('red');
	        		element.addClass('has-error'); 
	         		_createQtip(element, pos); 
	          		valid = false; 
	        	} 

	     	}); 

	    	return valid;
      	},

      	// Прослушивает все события
		_setUpListners = function () {
	    	$('form').on('keydown', '.has-error', _removeError); 
	    	$('form').on('reset', _clearForm); 
	    },

    	_removeError = function() {
	
			$(this).removeClass('has-error');
	    },
	    // Очищает форму
	    _clearForm = function (form) { 
	      var form = $(this);
	      form.find('.input, .textarea').trigger('hideTooltip'); 
	      form.find('.has-error').removeClass('has-error'); 
	      form.find('.error-message, .success-message').text('').hide(); 
	    },
	    // Создаёт тултипы
	    _createQtip = function (element, position) {
	       console.log('Создаем тултип');
	      // позиция тултипа
	    	if (position === 'right') {
	        	position = {
	        		my: 'left center',
	        		at: 'right center'
	        	}
	    	}else{
	        	position = {
	          		my: 'right center',
	          		at: 'left center',
	          		adjust: {
	            		method: 'shift none'
	          		}
	       		}
	      	}
	      // API qTip2: инициализация тултипа
	      element.qtip({
	      	content: {
	        	text: function() {
	            	return $(this).attr('qtip-content');
	         	}
	        },
	        show: {
	        	event: 'show'
	        },
	        hide: {
	        	event: 'keydown click hideTooltip'
	        },
	        position: position,
	        style: {
	        	classes: 'qtip-mystyle qtip-rounded',
	        	tip: {
		            height: 10,
		            width: 16
	          	}
	        }
	      }).trigger('show');
    	};
    // Возвращаем объект (методы становятся публичными)
	return {
		init: init,
		validateForm: validateForm
	};

})();

// Вызов модуля
validation.init();