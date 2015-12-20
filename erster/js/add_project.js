var myModule = (function (){

	var init = function(){
		_setUpListners();
	};

	var _showModal = function(ev){
		console.log('Answer');
		ev.preventDefault();
		$('#new-proj-popup').bPopup();
	};

	var _setUpListners = function(){
			//прослушка событий...
			$('#add-new').on('click', _showModal); //открыть мод. окно
		/*	$(#add-form-modal).on('submit', _addProject); //добавить проект */
	};


	return{
		init:init
	}

})();

myModule.init();