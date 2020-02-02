//窗口加载时调用方法
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		func();
	}
}
//参数newElement:将被插入的新元素
//参数targetElement:新元素将被插入到它前面的目标元素
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
//highlightRows函数将在鼠标指针悬停在某个表格行的上方时，把该行文本显示为黑体字
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].onmouseover = function(){
			this.style.fontWeight = "bold";
		}
		rows[i].onmouseout =function(){
			this.style.fontWeight = "normal";
		}
	}
}
//addClass用于往后添加一个类名
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className = newClassName;
	}
}
//tag是添加类名标签，theclass是添加的类名名字
function styleElementSiblings(tag,theclass){
	if(!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName(tag);
	for(var i=0;i<headers.length;i++){
		var elem = getNextElement(headers[i]);
		addClass(elem,theclass);
	}
}
//获取下一个元素节点
function getNextElement(node){
	if(node.nodeType==1){
		return node;
	}
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
}

//移动元素
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById)return false;
	if(!document.getElementById(elementID)) return false;
	//获取元素当前位置
	var elem = document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos =parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos>final_x){
		var dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos<final_y){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos>final_y){
		var dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos-dist;
	}
	elem.style.left = xpos+"px";
	elem.style.top = ypos+"px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement= setTimeout(repeat,interval);
}

//事件常用工具類，可兼容IE
var EventUtil = {
			//添加事件行为
			addHandler:function(element,type,handler){
				if (element.addEventListener) {
					element.addEventListener(type,handler,false);
				}else if (element.attachEvent) {
					element.attachEvent("on"+type,handler);
				}else{
					element["on"+type]=handler;
				}
			},
			//返回event的对象引用
			getEvent:function(event){
				return event?event:window.event;
			},
			//返回事件目标
			getTarget:function(event){
				return event.target||event.srcElement;
			},
			//取消事件的默认行为
			preventDefault:function(event){
				if (event.preventDefault) {
					event.preventDefault();
				}else{
					event.returnValue=false;
				}
			},
			//移除事件行为
			removeHandler:function(element,type,handler){
				if (element.removeEventListener) {
					element.removeEventListener(type,handler,false);
				}else if (element.detachEvent) {
					element.detachEvent("on"+type,handler);
				}else{
					element["on"+type]=null;
				}
			},
			//取消事件的进一步捕获和冒泡
			stopPropagation:function(event){
				if (event.stopPropagation) {
					event.stopPropagation();
				}else{
					//使用与ie
					event.cancelBubble = true;
				}
			}
		}

