/*
 * Addthis 0.1
 * (c)2009 Brent Wong
 * 
 * Usage:
 *  $.addthis();
 *   -or-
 *  $.addthis('username');
 *   -or-
 *  $.addthis('username','#element');
 *  where username is your AddThis username. Useful for tracking statistics
*/
(function($){
	$.addthis = function(code, elem){

		function init(){
			try{
				// determine whether to include the normal or SSL version
				var addthisurl = (location.href.indexOf('https') == 0 ? 'https://' : 'http://') + 's7.addthis.com/js/250/addthis_widget.js?pub=' + code;

				if(!elem) elem = 'a.addthis';

				// include the script
				$.getScript(addthisurl, function(){
					$(elem).append('<img src="http://s7.addthis.com/static/btn/lg-share-en.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/>').attr('href', 'http://www.addthis.com/bookmark.php?v=250').mouseover(
						function(){
							return addthis_open(this, '', '[URL]', '[TITLE]');
						}).mouseout(
						function(){
							addthis_close();
						}).click(
						function(){
							return addthis_sendto();
						});
				});
			} catch(err) {
				// log any failure
				console.log('Failed to load AddThis Script:' + err);
			}
		}

		init();
	}
})(jQuery);