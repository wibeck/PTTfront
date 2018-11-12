function persist(event) {
	var properties = [["url",clipBoardEvents,clipBoardEventProperties], 
	["url",dragEvents, dragEventProperties],["url",focusEvents, focusEventProperties],
	["url",inputEvents], ["url",keyboardEvents, keyboardEventProperties], 
	["url",mouseEvents, mouseEventProperties], ["url",touchEvents, touchEventProperties],
	["url",uiEvents, uiEventProperties]["url",wheelEvents, wheelEventProperties]];
	var destinations =  [];
	
	for(var x = 0; x < props.length; x++) {
		if(properties[x][1].includes(event.type)) {
			var url = "";
			var properties = [];
			destinations.push([props[x][0], trimmedPropertiesString(event, props[x][1])]);
		}
	}
	destinations.forEach(function(data){
		var request = new XMLHttpRequest();
		request.open("POST", data[0],false);
		request.send(data[1]);
	});
}

function trimmedPropertiesString(event, properties) {
	var result = "";
	for(var property in event){ 
			result += property +":"+ event[property] + ";";
	}
    result2 = result.substring(0, result.length - 1);
    var result3="";
    var props = result2.split(";");
    
    for(var x=0; x<props.length;x++) {
    	if(properties.includes(props[x].split(":")[0])) {
        	result3 += props[x] + " ";
        }
    }
    return result3;
}
	
function indexOf( element, nodeList) {
	var i = 0;
	var res = 0;
	for(i = 0; i < nodeList.length; i++){
		if(nodeList[i].isEqualNode(element)){
			res = i;
		} 
	}
	return res;
}

var animationEvents = ["animationend", "animationiteration", "animationstart"];
var animationEventProperties = ["animationName", "elapsedTime", "pseudoElement"];
var dragEvents = ["drag", "dragend", "dragenter", "dragleave", "dragover", 
"dragstart", "drop"];
var dragEventProperties =["dataTransfer"];
var clipBoardEvents = ["copy", "cut", "paste"];
var clipBoardEventProperties = ["clipboard"];
var focusEvents = ["blur", "focus", "focusin", "focusout", 
"abort", "beforeunload", "error", "load", "resize", "scroll", "select", "unload"];
var focusEventProperties = ["relatedTarget"];
var inputEvents = ["input", "abort", "beforeunload", "error",
 "load", "resize", "scroll", "select", "unload"];
var inputEventProperties = ["data", "dataTransfer", "inputType", "isComposing"];
var keyboardEvents = ["keydown", "keypress", "keyup", 
"abort", "beforeunload", "error", "load", "resize", "scroll", "select", "unload"];
var keyboardEventProperties = ["altKey", "charCode", "code", "ctrlKey", "isComposing",
"key", "keyCode", "location", "metaKey", "repeat","shiftKey", "which"]
var mouseEvents = ["click", "contextmenu", "dblclick", "mousedown", "mouseenter",
"mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "drag", "dragend", 
"dragenter", "dragleave", "dragover", "dragstart", "drop", "abort", "beforeunload", 
"error", "load", "resize", "scroll", "select", "unload", "wheel"];
var mouseEventProperties = ["altKey", "button", "buttons", "clientX", "clientY", "ctrlKey",
"metaKey", "movementX", "movementY", "offsetX", "offsetY", "pageX", "pageY", "region", 
"relatedTarget", "screenX", "screenY", "shiftKey", "which"];
var progressEvents = ["error", "loadstart"];
var progressEventProperties = ["lengthComputable", "loaded", "total"];
var touchEvents = ["touchcancel", "touchend", "touchmove", "touchstart",
 "abort", "beforeunload", "error", "load", "resize", "scroll", "select", "unload"];
var touchEventProperties = ["altKey", "changedTouches", "ctrlKey", 
"metaKey", "shiftKey", "targetTouches", "touches"];
var uiEvents = ["abort", "beforeunload", "error", "load", "resize", "scroll", "select", "unload",
"blur", "focus", "focusin", "focusout", "input", "keydown", "keypress", "keyup", 
"click", "contextmenu", "dblclick", "mousedown", "mouseenter", "mouseleave", 
"mousemove", "mouseout", "mouseover", "mouseup", "drag", "dragend", 
"dragenter", "dragleave", "dragover", "dragstart", "drop", 
"touchcancel", "touchend", "touchmove", "touchstart", "wheel" ];
var uiEventProperties = ["detail", "view"];
var transitionEvent = ["transitionend"];
var transitionEventProperties = ["propertyName", "elapsedTime", "pseudoElement"];
var	wheelEvent = ["wheel", "abort", "beforeunload",
 "error", "load", "resize", "scroll", "select", "unload"];
var wheelEventProperties = ["deltaX", "deltaY", "deltaZ", "deltaMode"];
var environmentEvents = ["playing", "stalled", "waiting",
 "afterprint", "animationend", "animationiteration", "animationstart", 
 "beforeprint", "beforeunload", "blur", "canplay", "canplaythrough", "change"];
 

window.document.addEventListener("click",function(event){
	
	var el = event.target;
			var info =  + " " + event.target.tagName + " " + indexOf(el, 
			window.document.getElementsByTagName(event.target.tagName)) + " " + iframe.contentDocument.URL;
			window.postMessage(info, "http://localhost:8330/hi.html");
});




window.document.addEventListener("click",function(event){
			var el = event.target;
			var info = event.type + " " + event.target.tagName + " " 
			+ indexOf(el, idoc.getElementsByTagName(event.target.tagName)) + " " 
			+ iframe.contentDocument.URL;
			window.postMessage(info, "http://localhost:8330/hi.html");
});