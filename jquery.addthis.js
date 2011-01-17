/*
 * Addthis 0.3
 * (c)2009 Brent Wong
 * 
 * Modified by Nick Shepherd
 * 
 * Usage:
 *  $.addthis();
 *   -or-
 *  $.addthis('username');
 *   -or-
 *  $.addthis('username', opts);
 *  Where opts are options, the following options are supported
 *  elem: the element to apply the "Add This" button to (default: a.addthis)
 *  btn_size: the size of the button to be displayed (large, small)
 *  url: the url to be shared (default: '[URL]')
 *  url_title: title of the url to be shared (default: '[TITLE]')
*/
(function($){
	$.addthis = function(code, options){

		function init(){
			try{

				var defaults = {
					elem: 'a.addthis',
					btn_size: 'large',
					url: '[URL]',
					url_title: '[TITLE]'
				}

				var opts = $.extend(defaults, options);

				// determine whether to include the normal or SSL version
				var addthisurl = (location.href.indexOf('https') == 0 ? 'https://' : 'http://') + 's7.addthis.com/js/250/addthis_widget.js?pub=' + code;
				var btn_image  = '';

				if(opts.btn_size == 'large') 
					btn_image = '<img src="http://s7.addthis.com/static/btn/lg-share-en.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/>';
				else
					btn_image = '<img src="http://s7.addthis.com/static/btn/sm-share-en.gif" width="83" height="16" alt="Bookmark and Share" style="border:0"/>';

				// include the script
				$.getScript(addthisurl, function(){
					$(opts.elem).append(btn_image).attr('href', 'http://www.addthis.com/bookmark.php?v=250').mouseover(
						function(){
							return addthis_open(this, '', opts.url, opts.url_title);
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
