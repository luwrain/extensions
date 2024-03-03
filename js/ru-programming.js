/*
   Copyright 2019-2024 Michael Pozhidaev <msp@luwrain.org>

   This file is part of LUWRAIN.

   LUWRAIN is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public
   License as published by the Free Software Foundation; either
   version 3 of the License, or (at your option) any later version.

   LUWRAIN is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.
*/

Luwrain.addHook("luwrain.i18n.ru.speakable.programming", (text)=>{
    var res = "";
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
    for(let i = 0;i < text.length;i++) {
	const ch = text[i];
	if (Luwrain.isLetter(ch)) {
	    if ((ch >= 'а' && ch <= 'я') ||
		(ch >= 'А' && ch <= 'Я') || ch == 'ё' || ch == 'Ё')
		rusLang = true; else
		    rusLang = false;
	    res += ch;
	    continue;
	}
	if (Luwrain.isDigit(ch) || Luwrain.isSpace(ch)) {
	    res += ch;
	    continue;
	}
	const value = rusLang?Luwrain.i18n().langs.ru.getSpecialNameOfChar(ch):Luwrain.i18n().langs.en.getSpecialNameOfChar(ch);
	if (!!value && value.trim().length > 0)
	    res += (' ' + value + ' '); else
		res += ch;
    }
    return res;
});
