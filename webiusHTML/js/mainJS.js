/*Version 1.0.0.22*/

;(function() {
	// helpers
	var regExp = function(name) {
		return new RegExp('(^| )'+ name +'( |$)');
	};
	var forEach = function(list, fn, scope) {
		for (var i = 0; i < list.length; i++) {
			fn.call(scope, list[i]);
		}
	};

	// class list object with basic methods
	function ClassList(element) {
		this.element = element;
	}

	ClassList.prototype = {
		add: function() {
			forEach(arguments, function(name) {
				if (!this.contains(name)) {
					this.element.className += ' '+ name;
				}
			}, this);
		},
		remove: function() {
			forEach(arguments, function(name) {
				this.element.className =
					this.element.className.replace(regExp(name), '');
			}, this);
		},
		toggle: function(name) {
			return this.contains(name)
				? (this.remove(name), false) : (this.add(name), true);
		},
		contains: function(name) {
			return regExp(name).test(this.element.className);
		},
		// bonus..
		replace: function(oldName, newName) {
			this.remove(oldName), this.add(newName);
		}
	};

	// IE8/9, Safari
	if (!('classList' in Element.prototype)) {
		Object.defineProperty(Element.prototype, 'classList', {
			get: function() {
				return new ClassList(this);
			}
		});
	}

	// replace() support for others
	if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
		DOMTokenList.prototype.replace = ClassList.prototype.replace;
	}
})();

document.onselectstart = function() {
	return false;
};
document.oncontextmenu = function() {
	return false;
};
window.onerror = function(err, file, line)
{
	alert('ERROR in ' + file + ' ' + err + ' line ' + line);
};
function getParam(str,sParamName)
{
	var tmp = str.split("?");
	if(tmp.length === 1)
	{
		return tmp[0];
	}
	var Params = tmp[1].split("&");
	var variable = "";
	for (var i = 0; i < Params.length; i++)
	{
		if (Params[i].split("=")[0] === sParamName)
		{
			if (Params[i].split("=").length > 1) variable = Params[i].split("=")[1];
			return variable;
		}
	}
	return "";
}
function animateTxt(elem,type,func,elemId)
{

	var imagePath;
	var spans;
	var i;
	if(!!elemId)
	{
		elem = document.getElementById(elemId);
	}

	var bgColor = getComputedStyleMult(elem,'actTxtColor');

	if(type === 1 && bgColor != null)
	{
		elem.style.color = bgColor;
		setTimeout('animateTxt(null,0,'+func+',"'+elem.id+'")',100);
		return;
	}else
	{

		bgColor = getComputedStyleMult(elem,'idleTxtColor');
		if(bgColor != null)
			elem.style.color = bgColor;
	}

	if (!!func) {
		func();
	}
}
function animateButton(elem,type,func,elemId)
{

	var imagePath;
	var spans;
	var i;
	if(!!elemId)
	{
		elem = document.getElementById(elemId);
	}

	var bgColor = getComputedStyleMult(elem,'actBgColor');

	if(type === 1)
	{
		elem.style.backgroundColor = bgColor;
		spans = elem.getElementsByTagName('span');
		if (spans != null) {
			for (i = 0; i < spans.length; i++) {
				if (getComputedStyleMult(spans[i],'actColor') != null) {
					spans[i].style.color = getComputedStyleMult(spans[i],'actColor');
				}
			}
		}

		setTimeout('animateButton(null,0,'+func+',"'+elem.id+'")',100);
		return;
	}else
	{

		bgColor = getComputedStyleMult(elem,'idleBgColor');

		if(bgColor != null)
			elem.style.backgroundColor = bgColor;
	}

	if (!!func) {
		func();
	}
}
function animateButtonImage(elem,type,func,elemId)
{
	var imagePath;
	var spans;
	var i;

	if(!!elemId)
	{
		elem = document.getElementById(elemId);
	}
	var bgColor = null;
	if(bgColor == null) {

		imagePath = getComputedStyleMult(elem,"background-image");
		if (imagePath.length < 7)
			return;

		if (type === 1) {
			if (imagePath.indexOf("_act.png") === -1)
				elem.style.backgroundImage = imagePath.substring(0, imagePath.length - 6) + '_act.png")';
			setTimeout('animateButtonImage(null,0,'+func+',"'+elem.id+'")',100);
		}
		else {
			if (imagePath.indexOf("_act.png") !== -1)
				elem.style.backgroundImage = imagePath.substring(0, imagePath.length - 10) + '.png")';
			if (!!func) {
				func();
			}
		}
	}else
	{
		if(type === 1) {
			elem.style.backgroundColor = bgColor;
			spans = elem.getElementsByTagName('span');
			if (spans != null) {
				for (i = 0; i < spans.length; i++) {
					if (spans[i].getAttribute('actColor') != null) {
						spans[i].style.color = spans[i].getAttribute('actColor');
					}
				}
			}
		}else
		{

			elem.style.backgroundColor = getComputedStyleIE(elem,"").getPropertyValue("idleBgColor");
			if (!!func) {
				func();
			}
		}

	}
}

function getComputedStyleMult(elem,value) {
	var res = null;

	if(elem === null || typeof elem === 'undefined')
		return null;

	if(!!window.getComputedStyle) {
		res = getComputedStyle(elem, null).getPropertyValue('--'+value);
	}
	if(res == null || res === '')
		res = getComputedStyleIE(elem,null).getPropertyValue(value);
	if(res === '')
		res= null;
	return res;
}
function getComputedStyleIE(el, pseudo)
{

	this.el = el;
	this.getPropertyValue = function(prop) {
		var re = /(\-([a-z]){1})/g;
		if (prop == 'float') prop = 'styleFloat';
		if (re.test(prop)) {
			prop = prop.replace(re, function () {
				return arguments[2].toUpperCase();
			});
		}
		return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	};
	return this;
}