!(function($){
	$(function(){

		var searchButtonSelector = "#r19_search-link";		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).mousedown();
				$(searchButtonSelector).click();
				return false;
			}
		});
		// custom select
		if ( $.fn.customSelect )
		{
			$(".r19_search-field select").customSelect();
		}

	});
})(jQuery);