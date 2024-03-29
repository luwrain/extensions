/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

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

function isUpperCase(ch)
{
    return (ch >= 'A' && ch <= 'Z') ||
	(ch >= 'А' && ch <= 'Я');
}

function isLowerCase(ch)
{
    return (ch >= 'a' && ch <= 'z') ||
	(ch >= 'а' && ch <= 'я');
}

function spaceBeforeCap(text)
{
    if (text.length <= 1)
	return text;
    var res = '';
    for(var i = 0;i < text.length - 1;i++)
    {
	var ch1 = text[i];
	var ch2 = text[i + 1];
	if (!isLowerCase(ch1) || !isUpperCase(ch2))
	{
	    res += ch1;
	    continue;
	}
	res += ch1;
	res += ' ';
	    }
    res += text[text.length - 1];
    return res;
}

Luwrain.addHook("luwrain.speech.text.regular", function(text){
    var res = '';
    for(var i = 0;i < text.length;i++)
    {
	if (Luwrain.i18n.isLetterOrDigit(text[i]))
	    return spaceBeforeCap(text);
	if (Luwrain.i18n.isSpace(text[i]))
	{
	    res += ' ';
	    continue;
	}
	var value = Luwrain.i18n.lang.getSpecialNameOfChar(text[i]);
	if (value != null)
	    res += (' ' + value + ' '); else
		res += text[i];
    }
    return res;
    	});
