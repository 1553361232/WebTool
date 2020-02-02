//控制字体
(function(doc, win) {

		var docEl = doc.documentElement,
		resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
		recalc = function() {
			var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 750) {
				docEl.style.fontSize = '100px';//1rem = 100px
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
			if(!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
			recalc();
})(document, window);
