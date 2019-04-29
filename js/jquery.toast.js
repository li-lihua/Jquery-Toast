/* Author：254359015@qq.com
 * Github: https://github.com/li-lihua/Jquery-Toast.git
 * Date：2019-03-26
 * Desc: Jquery仿原生Android Toast提示插件
 * Use：
 *      $(this).showToast("用户名不能为空！");//默认隐藏时间2000
 *	    $(this).showToast("用户名不能为空！", 50000);
 */
;(function ($) {
    $.fn.showToast = function (msg, time) {
		var id = uuid();
		if(undefined == time){
			time = 2000;
		}
		show(id, msg);  
		setTimeout(function() {
			close(id);
		}, time); 

    };
	
	
	// 显示内容
	function show(id, msg){
		if($("#div-toast-" + id).length == 0) {
			//先移除掉之前所有提示
			$("._hidden_toast_text").remove();
			//显示最新的提示
			$("body").append('<div id="div-toast-'+id+'" class="_hidden_toast_text" style="color:#fff;font-size: 0.8rem; border-radius: 0.2rem; display:none; background: #000; padding: 0.5rem; text-align: left; width: auto; height: auto; overflow: auto; position: absolute; top: 0; left: 0; z-index: 9999999;"></div>');
		}

		$("#div-toast-" + id).text(msg);
		var st = $(document).scrollTop(); 
		var objH = $("#div-toast-" + id).height();
		var ch = $(window).height();
		var objT = Number(st) + (Number(ch)-Number(objH)) / 2;   
		$("#div-toast-" + id).css("top",objT);
		 
		var sl = $(document).scrollLeft(); 
		var objW = $("#div-toast-" + id).width();
		var cw = $(window).width();
		var objL = Number(sl) + (Number(cw) - Number(objW)) / 2; 
		$("#div-toast-" + id).css("left",objL);
		$("#div-toast-" + id).fadeIn(2000);
	}

	
	// 隐藏内容
	function close(id){
		if($("#div-toast-" + id).length > 0) {
			$("#div-toast-" + id).fadeOut(2000);
			setTimeout(function() {
				if($("#div-toast-" + id).length > 0) {
					$("#div-toast-" + id).remove();
				} 
			}, 2000);  
		}  
	}
	
	
	//生成唯一id
	function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
	 
		var uuid = s.join("");
		return uuid;
	}
	
})(jQuery);
