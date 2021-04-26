var slideIndex = 0;
// Next/previous controls
function showDots(images)
{
    if(!images)
        return;
    var elem = document.getElementById('dotsslot');
    var dot;
    while (elem.firstChild)
    {
        elem.removeChild(elem.lastChild);
    }
    for (var i = 0; i < images.length; i++)
    {
        dot = document.createElement('span');
        dot.setAttribute("id", i.toString());
        dot.classList.add('dot');
        dot.onclick = function ()
        {
            currentSlide(this.id);
            stopAutoSlide();
        };
        if (i === slideIndex)
            dot.classList.add('active');
        elem.appendChild(dot);
    }
}

function plusSlides(n,images)
{
    slideIndex += n;
    showSlides(slideIndex,ADSArray);
}

// Thumbnail image controls
function currentSlide(n) {
    slideIndex = parseInt(n, 10);
    showSlides(slideIndex, ADSArray);
}

function showSlides(n,images) {
    if(n >= images.length) {
        slideIndex = 0;
        if(typeof window.external !== "undefined" && typeof window.external.wbCassetes !== "undefined")
            ADSArray = window.external.wbCassetes.getFilesInDirectory("C:\\SBKZ\\img\\ads","*.bmp|*.jpeg|*.jpg|*.png").split('|');
        for (var i = 0; i<ADSArray.length;i++){
            ADSArray[i] = ADSArray[i].substr(8,ADSArray[i].length);
            ADSArray[i] = ADSArray[i].replace(/\\/g, "/");
        }
    }
    if(n < 0)
        slideIndex = images.length -1;
    document.getElementById('imgAD').style.backgroundImage = "url('"+images[slideIndex]+"')";
    var dots = document.querySelectorAll(".dot");
    if(!dots || dots.length < 1)
        return;
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if(slideIndex < dots.length)
        dots[slideIndex].className += " active";
}
/*function changeInfo(imgIndex) {
	//alert('changeInfo:'+imgIndex);
	if(lang === 'en')
	{
		imgIndex = getRandomInt(0,scr.enimages.length);
		document.getElementById('imgAD').style.backgroundImage = 'url("'+scr.enimages[imgIndex].src+'")';
		var elems = document.querySelectorAll(".prev, .next, .dotsslot");
		if(elems)
			for(var i = 0; i < elems.length; ++i)
				elems[i].style.display = "none";
	}else
	{
		document.getElementById('imgAD').style.backgroundImage = 'url("'+scr.images[imgIndex].src+'")';
	}

	let title =document.getElementById('title');

	if(!!scr.images[imgIndex].title) {
		if(!!scr.images[imgIndex].title.Text[lang])
			title.innerHTML = scr.images[imgIndex].title.Text[lang];
		if (!!scr.images[imgIndex].title.FontWait)
			title.style.fontWeight = scr.images[imgIndex].title.FontWait;
		if (!!scr.images[imgIndex].title.Top)
			title.style.top = scr.images[imgIndex].title.Top;
		if (!!scr.images[imgIndex].title.Left)
			title.style.left = scr.images[imgIndex].title.Left;
	}
	let note = document.getElementById('note');
	if(!!scr.images[imgIndex].note) {
		if(!!scr.images[imgIndex].note.Text[lang])
			note.innerHTML = scr.images[imgIndex].note.Text[lang];
		if (!!scr.images[imgIndex].note.FontWait)
			note.style.fontWeight = scr.images[imgIndex].note.FontWait;
		if (!!scr.images[imgIndex].note.Top)
			note.style.top = scr.images[imgIndex].note.Top;
		if (!!scr.images[imgIndex].note.Left)
			note.style.left = scr.images[imgIndex].note.Left;
	}

	let btnInfo = document.getElementById('infoBtn');
	let btnInfoText = document.getElementById('infoBtnText');
	if(!!scr.images[imgIndex].btnInfo && !!scr.images[imgIndex].btnInfo.Text[lang])
	{
        //alert(btnInfo.style.display);
		if(!!scr.images[imgIndex].btnInfo.Text[lang])
			btnInfoText.innerHTML = scr.images[imgIndex].btnInfo.Text[lang];
		if (!!scr.images[imgIndex].btnInfo.FontWait)
			btnInfo.style.fontWeight = scr.images[imgIndex].btnInfo.FontWait;
		if (!!scr.images[imgIndex].btnInfo.Top)
			btnInfo.style.top = scr.images[imgIndex].btnInfo.Top;
		if (!!scr.images[imgIndex].btnInfo.Left)
			btnInfo.style.left = scr.images[imgIndex].btnInfo.Left;
		if (!!scr.images[imgIndex].btnInfo.Width)
			btnInfo.style.width = scr.images[imgIndex].btnInfo.Width;
		if (!!scr.images[imgIndex].btnInfo.Color)
		{
			//alert(scr.images[imgIndex].btnInfo.Color);
			btnInfo.style.borderColor = scr.images[imgIndex].btnInfo.Color;
			btnInfo.style.color = scr.images[imgIndex].btnInfo.Color;
		}
		else
		{
			btnInfo.style.borderColor = '#FFFFFF';
			btnInfo.style.color = '#FFFFFF';
		}
		//if (!!scr.images[imgIndex].btnInfo.QR)
			//document.getElementById('popupQR').style.backgroundImage = 'url("'+scr.images[imgIndex].btnInfo.QR+'")';
        if(!!scr.images[imgIndex].btnInfo.fontSize)
            document.getElementById('popupInfo').style.fontSize = scr.images[imgIndex].btnInfo.fontSize;
        var hdr = '';
        if(!!scr.images[imgIndex].btnInfo.Heading)
            hdr = '<h1>' + scr.images[imgIndex].btnInfo.Heading + '</h1>';
        if(!!scr.images[imgIndex].btnInfo.Info)
            document.getElementById('popupInfo').innerHTML = hdr + scr.images[imgIndex].btnInfo.Info;
        btnInfo.style.display = '';
	}else
	{
		btnInfo.style.display = 'none';
	}

	if (lang === 'en')
	{
		document.getElementById('label-switch_lang_l').innerText = 'RU';
		setTimeout('switchLang();',10000);
		if(!! window.external.exchange)
			window.external.exchange.setMemory("preLang", "en");

	}else
	{
		document.getElementById('label-switch_lang_l').innerText = 'EN';
		if(!! window.external.exchange)
			window.external.exchange.setMemory("preLang", "ru");

	}
	let ATMState = getATMState();

	document.getElementById('atmValue').innerText = ATMState.id;

	if(!ATMState.nfcState)
	{
		document.getElementById('nfc').classList.add('iconNfc-disabled');
	}
	if(!ATMState.cashinState)
	{
		document.getElementById('btnCardless').classList.add('opac-disabled');
		document.getElementById('button-nocard').disabled = true;
		document.getElementById('iconRUB').classList.add('disabled');
		document.getElementById('iconUSA').classList.add('disabled');
		document.getElementById('iconEUR').classList.add('disabled');
		document.getElementById('iconCash').classList.add('iconCash-disabled');
		document.getElementById('depositInfo').classList.add('opInfo-disabled');
	}

	if(!ATMState.cashoutState)
	{

		document.getElementById('note1').classList.add('opac-disabled');
		document.getElementById('note2').classList.add('opac-disabled');
		document.getElementById('note3').classList.add('opac-disabled');
		document.getElementById('note4').classList.add('opac-disabled');
		document.getElementById('withdrawalInfo').classList.add('opInfo-disabled');
	}
	let offCassttesCount = 0;
	if(!!ATMState.cassettes)
	{
		for(let i =0; i < ATMState.cassettes.length; i++)
		{

			let icon = getNoteImg(ATMState.cassettes[i].currency,ATMState.cassettes[i].nominal);
			{

				document.getElementById('note'+(i+1)).style.backgroundImage = 'url("'+icon+'")';
			}

			if(!ATMState.cassettes[i].state)
			{

				document.getElementById('note'+(i+1)).classList.add('opac-disabled');
				offCassttesCount++;
			}
		}
	}
	if(offCassttesCount === ATMState.cassettes.length )
	{
		document.getElementById('withdrawalInfo').classList.add('opInfo-disabled');
	}
	let depOff = true;
	if(!ATMState.cashinStateCurrency.eur)
	{
		document.getElementById('iconEUR').classList.add('disabled');
	}else
		depOff = false;
	if(!ATMState.cashinStateCurrency.rub)
	{
		document.getElementById('iconRUB').classList.add('disabled');
	}else
		depOff = false;
	if(!ATMState.cashinStateCurrency.usa)
	{
		document.getElementById('iconUSA').classList.add('disabled');
	}else
		depOff = false;
	if(depOff)
	{
		document.getElementById('depositInfo').classList.add('opInfo-disabled');
	}
}*/