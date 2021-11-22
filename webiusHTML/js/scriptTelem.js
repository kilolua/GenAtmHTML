//getBoundingClientRect()
window.onerror = function(err, file, line)
{
	alert('ERROR in ' + file + ' ' + err + ' line ' + line);
	pageError = 'ERROR in ' + file + ' ' + err + ' line ' + line;
	setResult('');
};

var enabledHWBtns2 = [1241, 1170, 1178, 1186, 1200, 1210, 1256, 1198, 1240,1187,1171,1199,1201,1179,1257,1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105,8,13,27,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,127,226,130,128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252];
var enabledHWBtns = [8,13,27,31,42,48,49,50,51,52,53,54,55,56,57, 113, 118, 117];

String.prototype.replaceChar = function(char1, char2) {
	var s = this.toString();
	for (var i = 0; i < s.length; i++) {
		if (s[i].charCodeAt(0) === char1.charCodeAt(0)) {
			s = s.slice(0, i) + char2 + s.slice(i+1);
		}
	}
	return s;
}

function isIE(version, comparison) {
	var cc      = 'IE',
		b       = document.createElement('B'),
		docElem = document.documentElement,
		isIE;

	if(version){
		cc += ' ' + version;
		if(comparison){ cc = comparison + ' ' + cc; }
	}

	b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);

	return isIE;
}
function getComputedStyleMult(elem,value) {
	var res = null;

	if(!!window.getComputedStyle) {
		res = getComputedStyle(elem, null).getPropertyValue('--'+value);
	}
	if(res == null || res === '')
		res = getComputedStyleIE(elem,null).getPropertyValue(value);
	if(res === '')
		res= null;
	return res;
}
var SCR = {};

var pageError = "";
var activeInput = "";
var isTimeoutOff = false;
var listArray = {};
var clientTimeout;
var refreshTimeout;
var inputsArray = [];
var screenString = typeof defaultScreen == 'undefined'?"":defaultScreen;
var styleClass = {"ok":" successBack","error":" dangerBack","warning":" warningBack","none":""};
function ProcessMask(mask,value)
{
	if(!!mask && mask !== "" && mask.indexOf('_') !== -1)
	{
		if(!!value && value !== "")
		{
			var tmpRes = mask;
			for(var i = 0; i < value.length; i++)
				tmpRes = tmpRes.replace('_',value.charAt(i));
			return tmpRes;
		}else
			return mask;
	}else
		return value;
}
function RenderElements(dataStr)
{
	var key;
	var elem;
	var i;
	try {
		SCR.Data = dataStr;
	}catch (e) {
		throw "INVALID JSON SCREEN DATA";
	}
	// if(typeof clientTimeout !== 'undefined')
	// 	clearTimeout(clientTimeout);
	//  // document.querySelector("body").classList.add('vip');
	// // if(parseInt(SCR.Data.timeout.clientActivityTimeout) > 0) {
	// // 	clientTimeout = setTimeout('clientTimeoutFunc();', parseInt(SCR.Data.timeout.clientActivityTimeout));
	// // 	isTimeoutOff = false;
	// // }else
	// // 	isTimeoutOff = true;


	for(key in SCR.Data.button)
	{
		elem = document.getElementById('button-' + key);
		if (!elem) {
			continue;
		}

		if(SCR.Data.button[key].visible === true)
		{
			//console.log(key, 'key')
			elem.style.visibility = 'visible';
			elem.classList.remove('disabled');
			if (SCR.Data.button[key].enable !== true) {
				elem.classList.add('disabled');
				if(isIE(8))
					elem.style.visibility = 'hidden'
				if(isIE(8))
					elem.disabledIE8 = true;
				else
					elem.disabled = true;
				elem.onclick = new Function('return;');
				}
			else {
				elem.classList.remove('disabled');
				elem.onclickF = new Function('setResult("' + key + '");');
			}
			if (!!elem.getElementsByTagName('span')[0]) {
				var tmp = SCR.Data.button[key].text;
				if(isIE(8)){
					tmp = tmp.replaceChar('₽', 'Р');
					tmp = tmp.replaceChar('₸', 'Т');
				}
				elem.getElementsByTagName('span')[0].innerHTML = tmp;

				// Костыльный способ уменьшать шрифт для минивыписки на казахском(надо было сделать быстро)
				if (SCR.Data.button[key].text.length > 15 && key === 'BtnTop2')
					elem.getElementsByTagName('span')[0].style.top = '7px';
				// Конец костыля(сделать нормально)
			}
			if (typeof SCR.Data.button[key].map_act !== "undefined"){
				if (SCR.Data.button[key].map_act === true){
					var elemLabel = document.getElementById("button-"+key);
					elemLabel.classList.add("active");
					var tmp = SCR.Data.button[key].ext.icon;
					tmp = tmp.substr(0, tmp.length-4)+'_act.png';
					SCR.Data.button[key].ext.icon = tmp;
				}
				if (SCR.Data.button[key].map_act === false){
					var elemLabel = document.getElementById("button-"+key);
					elemLabel.classList.remove("active");
					var tmp = SCR.Data.button[key].ext.icon;
					if (tmp.indexOf('_act') !== -1)
					{
						tmp = tmp.substr(0, tmp.length-8)+'.png';
						SCR.Data.button[key].ext.icon = tmp;
					}
				}
			}
			if(!!SCR.Data.button[key].ext)
			{
				if (!!SCR.Data.button[key].ext.icon)
				{
					if (document.querySelector("body").classList.contains('vip'))
					{
						var tmp = SCR.Data.button[key].ext.icon
						if (tmp.indexOf('.gif') !== -1)
							tmp = tmp.substr(0, tmp.length-4)+'_vip.gif'
						else
							tmp = tmp.substr(0, tmp.length-4)+'_vip.png'
						elem.querySelector('img').src = tmp;
					}
					else
						elem.querySelector('img').src = SCR.Data.button[key].ext.icon;
				}

				if (!!SCR.Data.button[key].ext.text)
				{
					if(elem.getElementsByTagName('span').length > 1) {
						var tmp = SCR.Data.button[key].ext.text;
						// alert(tmp.indexOf('₽'))
						if(isIE(8)){
							tmp = tmp.replaceChar('₽', 'Р');
							tmp = tmp.replaceChar('₸', 'Т');
						}
						elem.getElementsByTagName('span')[1].innerHTML = tmp;
					}
				}

				if (SCR.Data.button[key].ext.themes)
				{
					for (i = 0; i < SCR.Data.button[key].ext.themes.length; i++) {
						elem.classList.add(SCR.Data.button[key].ext.themes[i]);
					}
				}
			}
		}else
		{
			elem.style.visibility = 'hidden';
		}

	}

	for(key in SCR.Data.input)
	{
		elem = document.getElementById('input-' + key);
		if (!elem) {
			continue;
		}
		if(SCR.Data.input[key].visible === true)
		{
			elem.style.visibility = 'visible';
			if (SCR.Data.input[key].enable !== true)
			{
				if (SCR.Data.input[key].type === 'check'){
					elem.value = SCR.Data.input[key].value;
					if (elem.value === true){
						elem.innerHTML = '<img src="img/icons/Stitch_ON.png">';
						var elemLabel = document.getElementById("label-check");
						elemLabel.classList.add("label-on");
					}
					else {
						elem.innerHTML = '<img src="img/icons/Stitch_OFF.png">'
						var elemLabel = document.getElementById("label-check");
						elemLabel.classList.add("label-off");
					}
				}
				elem.classList.add('disabled');
				elem.disabled = true;
			}
			else
			{

				if (!elem.disabled) {
					inputsArray.push(key);
				}
				else {
					inputsArray = deleteFromArray(inputsArray, key);
				}
				if(getComputedStyleMult(elem,'card_num') != null)
				{
					elem.style.fontSize =getComputedStyleMult(elem,'card_num')+'px';
				}
				elem.maxAmount = parseInt(SCR.Data.input[key].max);
				elem.minAmount = parseInt(SCR.Data.input[key].min);

				elem.maxLength = parseInt(SCR.Data.input[key].maxLength);

				elem.minLength= parseInt(SCR.Data.input[key].minLength);
				elem.classList.remove('disabled');
				elem.validate = SCR.Data.input[key].validate === true;

				if (!!SCR.Data.input[key].token){
					var tmp = SCR.Data.input[key].token

					if(isIE(8)){
						tmp = tmp.replaceChar('₽', 'Р');
						tmp = tmp.replaceChar('₸', 'Т');
					}
					elem.token = tmp;
				}

				if(!!SCR.Data.input[key].text) {
					elem.value = SCR.Data.input[key].text;
					elem.defaultValue = true;
				}else
				{
					elem.value = '';
					elem.defaultValue = false;
					}
				}
				if(typeof validateDefaultInput !== 'undefined')
				{
					validateDefaultInput(SCR.Data.input[key].text);
				}
				elem.mask = !!SCR.Data.input[key].mask?SCR.Data.input[key].mask:'';
				if (!!SCR.Data.input[key].type && SCR.Data.input[key].type === 'account'){
					elem.style.fontSize = '50px';
				}
				if(!!SCR.Data.input[key].type && elem.defaultValue === true && elem.mask === '')
				{
					switch (SCR.Data.input[key].type) {
						case "amount":
							if (!!SCR.Data.input[key].token) {
								var tmp = SCR.Data.input[key].token;
								if(isIE(8)){
									tmp = tmp.replaceChar('₽', 'Р');
									tmp = tmp.replaceChar('₸', 'Т');
								}
								elem.innerHTML = AddSpace(elem.value, 3) + ' ' + tmp;
							}
							else
								elem.innerHTML = AddSpace(elem.value,3);
							break;
						case "card_number":
							try {
								elem.type = "card_number"
								elem.innerHTML = makePan(elem.value, 4);
							}catch (e) {
								errorValue = e;
							}
							break;
						default:
							elem.innerHTML = ProcessMask(elem.mask, SCR.Data.input[key].text);
							break;
					}
				}else {
					if (SCR.Data.input[key].type === 'check'){
						elem.value = SCR.Data.input[key].value;
						if (elem.value === true){
							if (document.querySelector('body').classList.contains('vip'))
								elem.innerHTML = '<img src="img/icons/Stitch_ON_vip.png">';
							else
								elem.innerHTML = '<img src="img/icons/Stitch_ON.png">';
							var elemLabel = document.getElementById("label-check");
							elemLabel.classList.add("label-on");
						}
						else {
							if (document.querySelector('body').classList.contains('vip'))
								elem.innerHTML = '<img src="img/icons/Stitch_OFF_vip.png">';
							else
								elem.innerHTML = '<img src="img/icons/Stitch_OFF.png">';
							var elemLabel = document.getElementById("label-check");
							elemLabel.classList.add("label-off");
						}
					}
					else if (SCR.Data.input[key].type === 'lst'){
						if (!!SCR.Data.input[key].ext.value){
							elem.values = SCR.Data.input[key].ext.value;
							elem.state = SCR.Data.input[key].state;
							elem.value = elem.values[elem.state];
							elem.innerHTML = '';
							for(i = 0; i < elem.values.length; i++){
								if (isIE(8)){
									elem.values[i] = elem.values[i].replaceChar('₽', 'Р');
									elem.values[i] = elem.values[i].replaceChar('₸', 'Т');
								}
								if (i === elem.state)
								{
									elem.innerHTML += '<li class="payElem-active" id="payElem'+i+'" onclick="setState('+i+')">'+elem.values[i]+'</li>';
								}
								else
								{
									elem.innerHTML += '<li class="payElem" id="payElem'+i+'" onclick="setState('+i+')">'+elem.values[i]+'</li>';
								}
							}
						}
					}
					else if (SCR.Data.input[key].type === 'data'){
						if (!!SCR.Data.input[key].ext.value){
							elem.values = SCR.Data.input[key].ext.value;
							elem.state = SCR.Data.input[key].state;
							elem.value = elem.values[elem.state];
							for(i = 0; i < elem.values.length && i < 5; i++){
								if (isIE(8)){
									elem.values[i] = elem.values[i].replaceChar('₽', 'Р');
									elem.values[i] = elem.values[i].replaceChar('₸', 'Т');
								}
								elem.innerHTML += '<li class="dataElem" id="dataElem'+i+'">'+elem.values[i]+'</li>';
							}
						}
					}
					else if (SCR.Data.input[key].type === 'lst_jkh'){
						if (!!SCR.Data.input[key].ext.value){
							elem.values = SCR.Data.input[key].ext.value;
							for(i = 0; i < elem.values.length; i++){
								elem.innerHTML +=
									'<li class="jkhElem" id="jkhElem'+i+'">'+
										'<div>'+
											'<span class="jkh jkh1">'+elem.values[i].col1+'</span>'+
											'<span class="jkh jkh2">'+elem.values[i].col2+'</span>'+
											'<span class="jkh jkh3">'+elem.values[i].col3+'</span>'+
											'<span class="jkh jkh4">'+elem.values[i].col4+'</span>'+
											'<span class="jkh jkh5">'+elem.values[i].col5+'</span>'+
											'<span class="jkh jkh6">'+elem.values[i].col6+'</span>'+
											'<span class="jkh jkh7">'+elem.values[i].col7+'</span>'+
											'<span class="jkh jkh8">'+elem.values[i].col8+'</span>'+
										'</div>'
									'</li>';
							}
						}
					}
					else if (!!SCR.Data.input[key].lab){
						elem.innerHTML = "<span class='gr'>"+SCR.Data.input[key].lab+"</span>" + SCR.Data.input[key].text;
						elem.type = '';
					}
					else {
						elem.innerHTML = ProcessMask(elem.mask, SCR.Data.input[key].text);
						elem.type = '';
						if (!!SCR.Data.input[key].type && SCR.Data.input[key].type === 'amount'){
							if (!!SCR.Data.input[key].token) {
								var tmp = SCR.Data.input[key].token
								if(isIE(8)){
									tmp = tmp.replaceChar('₽', 'Р');
									tmp = tmp.replaceChar('₸', 'Т');
								}
								elem.innerHTML = '0 ' + tmp;
							}
							else
								elem.innerHTML = '0';
					}
				}
				if (SCR.Data.input[key].type !== 'lst' && SCR.Data.input[key].type !== 'lst_jkh' && SCR.Data.input[key].type !== 'data' )
					elem.type = SCR.Data.input[key].type;


				if(elem.mask !== '')
				{
					elem.type = null;
					elem.maxLength = elem.mask.split('_').length -1;
				}

				if (!!SCR.Data.input[key].FontSize){
					if (SCR.Data.input[key].FontSize === 'big'){
						elem.style.fontSize = '60px';
						elem.style.lineHeight = '80px';
					}
					else if (SCR.Data.input[key].FontSize === 'small'){
						elem.style.fontSize = '36px';
						elem.style.lineHeight = '80px';
					}
					else if (SCR.Data.input[key].FontSize === 'middle'){
						elem.style.fontSize = '50px';
						elem.style.lineHeight = '80px';
					}
				}

				if(SCR.Data.input[key].hint !== '' && SCR.Data.input[key].type !== 'check')
					elem.setAttribute('placeholder', SCR.Data.input[key].hint);
				/*inputInner += '<td><div class="form-group"><label for="input' + key + '" class="control-label">' + SCR.Data.input[key].hint + '</label><br>' +
					'<input onclick="setActiveInput(this);" onkeydown="return false;"  onkeyup="inputKey(\'' + SCR.Data.input[key].mask + '\',event.keyCode,this);" class="form-control' + (typeof styleClass[SCR.Data.input[key].state] == 'undefined' ? '"' : styleClass[SCR.Data.input[key].state]) + '" id="input' + key + '" type="text" name="name" value="' + ProcessMask(SCR.Data.input[key].mask, SCR.Data.input[key].text) + '"/></div></td>';*/
			}

		}else
		{
			elem.style.visibility = 'hidden';
		}
	}
	for(key in SCR.Data.label)
	{

		elem = document.getElementById('label-' + key);


		if (!elem) {
			continue;
		}
		if (!!SCR.Data.label[key].value){
			var tmp = SCR.Data.label[key].value.toString();
			if(isIE(8)){
				tmp = tmp.replaceChar('₽', 'Р');
				tmp = tmp.replaceChar('₸', 'Т');
			}
			elem.innerHTML = tmp;
		}

	}
	for(key in SCR.Data.sound)
	{

		var main_body = document.querySelector("body");

		if (!!SCR.Data.sound[key].src){
			main_body.innerHTML += "<audio autoplay='autoplay' style='visibility:hidden'>" +
				"    <source src='"+SCR.Data.sound[key].src+"' type='audio/mpeg'>" +
				"  </audio>"
		}

	}
	var options;
	for(key in SCR.Data.list)
	{
		elem = document.getElementById('list-' + key);
		if (!elem) {
			continue;
		}
		if (SCR.Data.list[key].type === 'pays'){
			if (!!SCR.Data.list[key].obj){
				elem.obj = SCR.Data.list[key].obj;
				elem.state = SCR.Data.list[key].state;
				for(i = 0; i < elem.obj.length; i++){
					if (i === elem.state)
					{
						elem.innerHTML += '<li class="payElem-active" id="payElem'+i+'">'+elem.obj[i].value+'</li>';
					}
					else
					{
						elem.innerHTML += '<li class="payElem" id="payElem'+i+'">'+elem.obj[i].value+'</li>';
					}
				}
			}
		}
		else{
			if (SCR.Data.list[key].active)
			{
				if (SCR.Data.list[key].active === true)
				{
					var elemLabel = document.getElementById("label-check");
					elemLabel.classList.add("label-on");
					elem.classList.add("switch-on");
					elem.style.visibility = 'visible';
					elem.active = true;
				}
				else{
					elem.active = false;
				}
			}
			else {
				elem.dataset.ui_name = name;
				if (SCR.Data.list[key].visible === true) {
					elem.style.visibility = 'visible';
					elem.classList[SCR.Data.list[key].enable ? 'remove' : 'add']('disabled');

					options = SCR.Data.list[key].text;

					var values, maxsums, enablings;

					if (SCR.Data.list[key].ext.values) {
						values = SCR.Data.list[key].ext.values;
					}
					if (SCR.Data.list[key].ext.maxsum) {
						maxsums = SCR.Data.list[key].ext.maxsum;
					}
					if (SCR.Data.list[key].ext.enabled) {
						enablings = SCR.Data.list[key].ext.enabled;
					}

					for (i = elem.options.length - 1; i >= 0; i--) {
						elem.remove(i);
					}
					for (i = 0; i < options.length; i++) {
						var newOption;

						if (values) {
							newOption = new Option(options[i], values[i], false, i === SCR.Data.list[key].state);
						} else {
							newOption = new Option(options[i], options[i], false, i === SCR.Data.list[key].state);
						}

						if (maxsums) {
							newOption.setAttribute('data-maxsum', maxsums[i]);
						}
						if (enablings && enablings[i] === false) {
							newOption.setAttribute('disabled', true);
							newOption.classList.add('disabled');
						}
						elem.options.add(newOption);
					}
				} else {
					elem.style.visibility = 'hidden';
				}
			}
		}
	}
	for(key in SCR.Data.image)
	{

		if(key === 'bg')
		{
			var body = document.getElementById('body');
			if(body != null)
				body.style.backgroundImage = 'url("' + SCR.Data.image[key].src + '")';
			continue;
		}

		elem = document.getElementById('image-' + key);
		if (!elem) {
			continue;
		}
		if (document.querySelector("body").classList.contains('vip'))
		{
			var tmp = SCR.Data.image[key].src
			if (tmp.indexOf('.gif') !== -1)
				tmp = tmp.substr(0, tmp.length-4)+'_vip.gif'
			else
				tmp = tmp.substr(0, tmp.length-4)+'_vip.png'
			elem.src = tmp;
		}
		else
			elem.src = SCR.Data.image[key].src;
		elem.style.visibility = 'visible';


	}
	if(typeof SCR.Data.wait != 'undefined')
	{
		if (SCR.Data.wait.enable === true)
		{
			var wpopup = document.getElementById('wait-popup');
			wpopup.className = 'pop-up hide';


			wpopup.classList.remove('hide');
			document.getElementById('blurred').style.display = 'block';
			document.getElementById('wait-text').innerText = SCR.Data.wait.text;
			document.getElementById('wait-icon').className = '';

			if(SCR.Data.wait.ext && SCR.Data.wait.ext.icon) {
				if(SCR.Data.wait.ext.loader && SCR.Data.wait.ext.loader === 'loader') {
					document.getElementById('wait-icon').innerHTML = '';
				} else {
					document.getElementById('wait-icon').innerHTML = '<img src="' + SCR.Data.wait.ext.icon + '" alt="">';
				}
			}
			document.getElementById('wait-loader').className = '';
			if(SCR.Data.wait.ext && SCR.Data.wait.ext.loader) {
				document.getElementById('wait-loader').classList.add(SCR.Data.wait.ext.loader);
			}
			if(SCR.Data.wait.ext && SCR.Data.wait.ext.count) {
				document.getElementById('wait-loader').setAttribute('data-count', SCR.Data.wait.ext.count);
				if(!SCR.Data.wait.ext.icon) {
					document.getElementById('wait-icon').classList.add('cnumber');
					document.getElementById('wait-icon').innerText = SCR.Data.wait.ext.count;
				}
			}

			if(SCR.Data.wait.ext && SCR.Data.wait.ext.theme) {
				wpopup.classList.add(SCR.Data.wait.ext.theme);
			}
			if(SCR.Data.wait.ext && SCR.Data.wait.ext.themes) {
				for(i = 0; i<SCR.Data.wait.ext.themes.length; i++)   {
					wpopup.classList.add(SCR.Data.wait.ext.themes[i]);
				}
			}

			var buttons = document.querySelectorAll('[id^="button-"]');

			for(i=0; i<buttons.length; i++) {
				buttons[i].classList.add('disabled');
				buttons[i].disabled = true;
			}


		} else
		{


		}
	}else
	{

	}

	if(typeof SCR.Data.modalMessage != 'undefined')
	{
		if (SCR.Data.modalMessage.visible === true)
		{

			document.getElementById('modal-title').innerHTML = SCR.Data.modalMessage.text;
			document.getElementById('modal-popup').style.display = 'block';
			document.getElementById('blurred').style.display = 'block';
			for (i = 0; i < SCR.Data.modalMessage.options.length; i++)
			{
				var modalButton = document.getElementById('modal_option-'+i);
				if(typeof modalButton != 'undefined')
				{
					modalButton.onclick = new Function('setResult(' + i + ',' + i + ');');
					modalButton.innerHTML = '<span>'+SCR.Data.modalMessage.options[i]+'</span>';
				}
			}
			if(!!SCR.Data.modalMessage.ext)
			{
				for(i = 0; i < 10; i++)
				{

					if(!!SCR.Data.modalMessage.ext["note"+i])
					{
						var modalNote = document.getElementById("modal-note"+i);
						if(typeof modalNote!= 'undefined')
						{
							modalNote.innerHTML = SCR.Data.modalMessage.ext["note"+i].toString();
						}
					}
				}

			}

		}
	}

}
function getFromMask(mask,value) {
	var res = "";

	if(!!mask && mask !== "")
	{
		for(var i = 0; i < value.length; i++)
		{
			if(i < mask.length)
			{
				if(mask.charAt(i) === '_')
				{
					if(value.charAt(i) !== '_')
						res += value.charAt(i);
				}
			}else
				break;
		}
	}else
	{
		res = value;
	}
	return res;
}
function setActiveInput(id) {
	activeInput = id.id;
}
function ProcessKey(keyCode) {
	clearClientTimeoutFunc();
	if(typeof catchHardwareButton != 'undefined')
	{
		catchHardwareButton(keyCode);
	}
}
function RefreshScr(data) {

	clearTimeout(clientTimeout);
	alert(JSON.stringify(data))
	RenderElements(data);
	clearTimeout(refreshTimeout);

}
function inputKey(mask,key,elem) {

	if(key === 8)
	{
		if (!!mask && mask !== "") {
			var tmpValue = getFromMask(mask,elem.value);
			if(tmpValue === "")
			{
				elem.value = mask;
			}else
			{
				tmpValue = tmpValue.substring(0,tmpValue.length - 1);
				elem.value = ProcessMask(mask,tmpValue);
			}
		}
		else {
			if(elem.value.length > 0)
				elem.value = elem.value.substring(0,elem.value.length - 1);
		}
	}else {
		if (!!mask && mask !== "") {
			elem.value = elem.value.replace('_', String.fromCharCode(key));
		}
		else {
			elem.value += String.fromCharCode(key);
		}
	}
	return false;

}
function delSymbol(value){
	if (value.substring(value.length - 1, value.length) === ';' && value.lastIndexOf('&') !== -1){
		return value.substring(0,value.lastIndexOf('&'));
	}
	else
		return value.substring(0, value.length - 1);
}
function inputKey2(key,id,value,showValue,isDefault,elem) {
	var res = {};
	var iValue = value;
	var errorValue = "";
	var nowValue = value;
	var needProccesValue = true;
	if(isInArray(inputsArray,id))
	{
		if(!isNaN(elem.maxLength))
		{
			if(value.length >= elem.maxLength)
				if(key !== 'back' && key !== 31 && key !== 8)
					needProccesValue = false;
		}

		if(!isNaN(elem.minLength))
		{
			if(value.length >= elem.maxLength)
				if(key !== 'back' && key !== 31 && key !== 8)
					needProccesValue = false;
		}
		if(needProccesValue) {
			var mask = elem.mask;
			if (key === 'back' || key === 31 || key === 8) {
				if (!!elem.type) {
					switch (elem.type) {
						case "pin":
							value = '';
							iValue = value;
							break;
						default:
							if (value.length > 0) {
								value = delSymbol(value);
								if(elem.type === "amount" && value === "")
									value = "0";
								iValue = value;
							}
							else
							{
								value = '';
								iValue = '';
							}
							break;
					}
				}
				else {
					if (value.length > 0) {
						value = delSymbol(value);
						iValue = value;
					}
				}
			}
			else {
				if (value === '0' && String.fromCharCode(key) === '0' && elem.type === 'amount'){
					// console.log('fu');
					value = '';
				}
				else{
					if (key === 34)
					{
						value += '&#34;';
					}
					else if (key === 39){
						value += '&apos;';
					}
					else if (key === 38){
						value += '&#38;';
					}
					else if (key === 226){
						value += '&#8376;';
					}
					else if (key === 58){
						value += '&#8470;';
					}
					else if (key === 130){
						value += '&#8381;';
					}
					else
						value += String.fromCharCode(key);
					iValue = value;
				}
			}
			value = ProcessMask(mask, value);

			var useNowValue = false;
			if (!!elem.type) {
				switch (elem.type) {
					case "amount":
						if (!!elem.maxAmount) {

							var maxAmount = parseInt(elem.maxAmount, 10);
							if (!isNaN(maxAmount)) {
								var cAmount = parseInt(value, 10);
								if (!isNaN(cAmount)) {
									if (cAmount > maxAmount) {
										value = showValue;
										iValue = nowValue;
										useNowValue = true;
									}
								}
							}
						}
						if (!useNowValue) {
							value = AddSpace(value, 3);
						}
						break;
					case "card_number":
						try {
							value = makePan(value, 4);
						} catch (e) {
							errorValue = e;
						}
						break;
					case "pin":
						try {
							var tmpP = '';
							for (var i = 0; i < value.length; i++) {
								tmpP += '•'
							}
							value = tmpP;
						} catch (e) {
							errorValue = e;
						}
						break;
					default:
						break;
				}
			}
			res.showValue = value;
		}else
		{
			res.showValue = showValue;
		}
	}

	res.errorValue = errorValue;
	res.inputedValue = iValue;

	return res;
}
function sendValidate(elem) {
	setResult('');
}
function clearClientTimeoutFunc() {

	if(isTimeoutOff)
		return;
	clearTimeout(clientTimeout);

	if(typeof SCR.Data != 'undefined' && typeof SCR.Data != null && typeof SCR.Data.timeout != 'undefined' && SCR.Data.timeout != null) {
		if (!isNaN(parseInt(SCR.Data.timeout.clientActivityTimeout)))
			clientTimeout = setTimeout('clientTimeoutFunc();', parseInt(SCR.Data.timeout.clientActivityTimeout));
	}
}
function clientTimeoutFunc()
{
	if(isTimeoutOff)
		return;
	isTimeoutOff = true;
	clearTimeout(clientTimeout);
	setResult('');
}
function isValidInput(elem)
{

}
function clearList(listName) {
	for(var i = 0; i < SCR.Data.list[listName].text.length;i++)
	{
		listArray[listName+"_"+i] = false;
		var elem = document.getElementById(listName+"_"+i);
		$(elem).removeClass("active").addClass("blackColor");
	}

}
function selectList(elem)
{
	//alert(isIE(8));
	var listkey = elem.id;
	var lIndex = elem.id.lastIndexOf('_');
	if(lIndex !== -1){
		listkey = listkey.substr(0,lIndex);
		clearList(listkey);
	}else {
		alert('clearList error');
	}


	if(!isIE(8))
	{
		if (elem.className.indexOf("active") !== -1) {

			$(elem).removeClass("active").addClass("blackColor");
			listArray[elem.id] = false;
		}
		else {
			$(elem).removeClass("blackColor").addClass("active");
			listArray[elem.id] = true;
		}
	}else
	{

		if ( elem.style.backgroundColor !== '#ffffff')
		{
			elem.style.backgroundColor = '#ffffff';
			elem.style.color = '#2e3133';
			listArray[elem.id] = false;
		}
		else
		{
			elem.style.backgroundColor = '#007bff';
			elem.style.color = '#ffffff';
			listArray[elem.id] = true;
		}
	}


	setResult('');
}
function setResult(str,modalBtn)
{

	var result = {};
	result.buttonName = str;
	result.input = {};



	for(var i = 0; i< inputsArray.length;i++)
	{
		var elem = document.getElementById('input-' + inputsArray[i]);
		if(elem == null || !elem)
		{
			result.input[inputsArray[i]] = '';
		}else
		{
			if(elem.getAttribute('type') === 'checkbox') {
				if(elem.value === true) {
					result.input[inputsArray[i]] = elem.value;
				} else {
					result.input[inputsArray[i]] = false;
				}
			}  else if(elem.getAttribute('type') === 'phone') {
				result.input[inputsArray[i]] = elem.value.replace(/\D/g,'');
			} else {
				result.input[inputsArray[i]] = elem.value;
			}
		}

	}

	result.list = {};
	for(var listkey in listArray)
	{
		if(listArray[listkey] === true)
		{
			var listName = listkey.substr(0,listkey.lastIndexOf('_'));

			if(typeof result.list[listName] != 'undefined')
			{
				result.list[listName][result.list[listName].length] = parseInt(listkey.substr(listkey.lastIndexOf('_')+1));
			}else
			{
				result.list[listName] = [];
				result.list[listName][0] = parseInt(listkey.substr(listkey.lastIndexOf('_')+1));
			}
		}
	}
	// var elem = document.getElementById('input-pay');
	// if (!!elem){
	// 	if (!!elem.values && !!elem.state){
	// 		alert(elem.values[elem.state]);
	// 		result.input['pay'].value = elem.values[elem.state];
	// 	}
	// }

	if(typeof modalBtn != 'undefined')
		result.modalMessageSelected = modalBtn;
	else
		result.modalMessageSelected = -1;

	result.clientActivityTimeout = isTimeoutOff;
	if(pageError !== "") {
		result.error = {};
		result.error.enable = true;
		result.error.message = pageError;
	}else
		result.error = new Error();
	clearTimeout(clientTimeout);

	if(typeof window.external.exchange != 'undefined')
		window.external.exchange.SetScrResult(JSON.stringify(result));
	else
		SetScrResult(JSON.stringify(result));
}


/**
 * @return {string}
 */
function AddSpace(a,step)
{

	a = a.toString();
	var mant = "";
	if(a.indexOf(',')!== -1)
	{
		mant =','+a.substr(a.indexOf(',')+1);
		a = a.substr(0,a.indexOf(','));
	}
	try {
		a = parseInt(a);//.toString();
		if(isNaN(a))
			a = 0;
		a = a.toString();
	}catch (e) {
		return a + mant;
	}
	var res = "";
	if(a.length <= step) {
		if(a === '')
			return '';
		return a + mant;
	}
	var startIndex = a.length ;
	var subInd = a.indexOf(',');
	if(subInd === -1)
		subInd = a.indexOf('.');
	if(subInd > -1){
		startIndex = subInd;
		res = a.substr(subInd);
	}

	while(startIndex - step > 0){
		startIndex-=step;
		res = a.substr(startIndex,step) + (res === ''?'':(' ' + res));
	}
	res =  a.substr(0,startIndex)+ (res === ''?'':(' ' + res));

	return res+mant;
}
function makePan(a,step)
{
	a = a.toString();

	var res = "";
	if(a.length <= step) {
		return a;
	}
	var intValue = parseInt(a);
	if(isNaN(intValue) || intValue > 9999999999999999)
	{
		throw "invalid number";
	}

	var startIndex = 0 ;

	while (startIndex < a.length)
	{
		res += a.substr(startIndex,step) + ' ';
		startIndex+=step;
	}
	return res;
}

function isInArray(array,value) {
	for(var i = 0; i< array.length;i++)
	{
		if(array[i]===value)
			return true;
	}
	return false;

}
function deleteFromArray(array,value) {
	return arr.filter(function(item){
		return item !== value;
	});
}
function luhn(cardNumber) {

	var arr = cardNumber.split('').map(function(char, index) {
		var digit = parseInt(char);

		if ((index + cardNumber.length) % 2 === 0) {
			var digitX2 = digit * 2;

			return digitX2 > 9 ? digitX2 - 9 : digitX2;
		}

		return digit;
	});

	return !(arr.reduce(function (a, b) { return a + b }, 0) % 10);
}