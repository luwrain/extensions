// SPDX-License-Identifier: BUSL-1.1
// Copyright 2019-2026 Michael Pozhidaev <msp@luwrain.org>

Luwrain.addHook("luwrain.i18n.ru.speakable.programming", (text)=>{
    //Checking the first letter to understand what language must be the default
    var rusLang = true;
    for(let i = 0;i < text.length;i++) {
	const ch = text[i];
	if ((ch >= 'а' && ch <= 'я') ||
	    (ch >= 'А' && ch <= 'Я') || ch == 'ё' || ch == 'Ё')
	    break;
	if ((ch >= 'a' && ch <= 'z') ||
	    (ch >= 'A' && ch <= 'Z')) {
	    rusLang = false;
	    break;
	}
    }

    //Transforming the text
    var res = '';
    
    for(let i = 0;i < text.length;i++) {
	const ch = text[i];

	//Adding letters as they are, but updating the default language, if it's needed
	if (Luwrain.isLetter(ch)) {
	    if ((ch >= 'а' && ch <= 'я') ||
		(ch >= 'А' && ch <= 'Я') ||
		ch == 'ё' || ch == 'Ё')
		rusLang = true; else
		    rusLang = false;
	    res += ch;
	    continue;
	}
	
	if (Luwrain.isDigit(ch) || Luwrain.isSpace(ch)) {
	    res += ch;
	    continue;
	}
	
	const value = rusLang
	      ?Luwrain.i18n().langs.ru.getSpecialNameOfChar(ch)
	      :Luwrain.i18n().langs.en.getSpecialNameOfChar(ch);
	if (!!value && value.trim().length > 0)
	    res += ` ${value} `; else
	    res += ch;
    }
    return res;
});
