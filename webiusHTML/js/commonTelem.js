
document.oncontextmenu = function() {
    return false;
};

document.onselectstart = function() {
    return false;
};


var GetScrData;

// Dev env
if (typeof window.external.exchange === 'undefined') {
	GetScrData = function () {
		return {};
	};
}
else {
	GetScrData = function () {
		return window.external.exchange.GetScrData();
	};
}
function onLoadBody() {
	if(document.addEventListener)
	{
		return;
	}else {
		RefreshScr(GetScrData(), true);
	}
}
function getInitialData(extraData)
{
	var data = {
		// From host
		label: {},
		button: {},
		input: {},
		list: {},
		wait: {
			enable: false,
			text: '',
		},
		modalMessage: {
			visible: false,
			text: '',
			options: [],
			selected: 0,
		},
		balance: {
			visible: false,
			values: [
				'120 000 ₽',
				'$14 590',
				'€ 5000',
			],
		},
		selected_currency: 0,
		timeout: {
			clientActivityTimeout: 0,
		},
		// Common data
		overlay: false,
	};
	if (typeof extraData === 'object') {
		for (var key in extraData) {
			if (extraData.hasOwnProperty(key)) {
				data[key] = extraData[key];
			}
		}
	}
	return data;
}

// Эта функция может быть переопределена экранами,
// которым необходимо реагировать на нажатие кнопок на банкомате
window.KeyPressed = function () {};

// Dev env
if (typeof window.external.exchange === 'undefined') {
	window.SetScrResult = function (scrResult) {
		//console.log('Sending result');
		//console.log(scrResult);
		alert(scrResult);
	};
}
else {
	window.SetScrResult = function (scrResult) {
		window.external.exchange.SetScrResult(scrResult);
	};
}

// Dev env
if (typeof window.external.exchange === 'undefined') {
	window.writeLog = function (message) {
		//console.log(message);
	};
}
else {
	window.writeLog = function (message) {
		window.external.exchange.writeLog(name,message);
	};
}

window.ScreenMixin = {
	beforeMount: function () {
		var data = JSON.parse(GetScrData()),
			self = this;
		this.setData(data);
	},

	methods: {
		setData: function (data) {
			this.label = data.label || {};
			this.button = data.button || {};
			this.input = data.input || {};
			this.list = data.list || {};
			this.image = data.image || {};
			this.wait = data.wait || { enable: false };
			this.modalMessage = data.modalMessage || { visible: false };
			this.timeout = data.timeout || { clientActivityTimeout: 0 };

			this._timeout = null;
			// FIXME: activate timeout
			// if (data.timeout.clientActivityTimeout > 0) {
			// 	this.resetTimeout();
			// }
		},

		getData: function () {
			var dataHelp = {};
			
			dataHelp.buttonName = '';
			
			// Поля ввода
			dataHelp.input = {};
			for (name in this.input) {
				elem = document.getElementById('input-' + name);
				if (!elem) {
					dataHelp.input[name] = '';
				}
				else
					dataHelp.input[name] = elem.value;
			}

			// Select'ы
			dataHelp.list = {};
			for (name in this.list) {
				elem = document.getElementById('list-' + name);
				dataHelp.list[name] = -1;
				if (!elem) {
					continue;
				}
				for (i = 0; i < elem.options.length; i++) {
					if(typeof elem.options[i].selected != 'undefined' && elem.options[i].selected) {
						dataHelp.list[name] = i;
						break;
					}
				}
			}
			
			dataHelp.modalMessageSelected = -1;
			dataHelp.clientActivityTimeout = false;
			dataHelp.ext = {};
			
			dataHelp.error = {};
			dataHelp.error.enable = false;
			dataHelp.error.message = '';
			
			return dataHelp;
		},

		buttonClicked: function (buttonName) {
			var scrResult = this.getData();
			scrResult.buttonName = buttonName;
			window.SetScrResult(scrResult);
		},

		resetTimeout: function () {
			var self = this;
			if (this._timeout) {
				clearTimeout(this._timeout);
			}
			if (this.timeout.clientActivityTimeout > 0) {
				this._timeout = setTimeout(function () {
					var scrResult = self.getData();
					scrResult.clientActivityTimeout = true;
					window.SetScrResult(scrResult);
				}, this.timeout.clientActivityTimeout);
			}
		},

		keyPressed: function () {
			// For overriding//

		},

		imgUrl: function (key) {
			return 'url("' + this.image[key].src + '")';
		},
	},
};

function loadTest()
{
	alert('onload');
}

// Начальная загрузка данных
if(document.addEventListener)
{
	document.addEventListener('DOMContentLoaded', function () {
		RefreshScr(GetScrData(), true);
		//setTimeout('RefreshScr(GetScrDataMockTest())',2000);
		//setTimeout('RefreshScr(GetScrDataMockTest2())',2000);
	}, false);
	document.addEventListener('click', function () {
		window.resetIdleTimeout();
	});
}else
{
	/*document.attachEvent("onload", function () {
		RefreshScr(GetScrData(), true);
		//setTimeout('RefreshScr(GetScrDataMockTest())',2000);
		//setTimeout('RefreshScr(GetScrDataMockTest2())',2000);
	});*/
	//document.attachEvent("onload", RefreshScr(GetScrData(), true));
	//document.attachEvent("onload", loadTest);
	//document.attachEvent('onclick',window.resetIdleTimeout());
}


// Любой тычок в экран должен перезапускать таймаут бездействия.
// Важно: в обработчиках события click на элементах страницы желательно
// не вызывать event.stopPropagation(), чтобы события дохидили до document.
// Если вызов event.stopPropagation() всё же необходим, нужно в том же обработчике
// явно вызвать функцию window.resetIdleTimeout.


window.resetIdleTimeout = function(period)
{
	if (window.clientIdleTimeout) {
		clearTimeout(window.clientIdleTimeout);
	}
	if (typeof period !== 'undefined') {
		window.idlePeriod = period;
	}

	if (window.idlePeriod > 0) {
		window.clientIdleTimeout = setInterval(function () {
			SendScreenData({
				clientActivityTimeout: true,
			});
		}, window.idlePeriod);
	}
};


// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
	Element.prototype.remove = function() {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
}