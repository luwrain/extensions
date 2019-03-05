/*
   Copyright 2019 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

Luwrain.addHook("luwrain.i18n.ru.speech.natural.pre", function(text){
    var res = "";
    for(var i = 0;i < text.length;i++)
    {
	var ch = text[i];
	switch(ch)
	{
	    case '(':
	    res += " в скобках ";
	    break;
	    case ')':
	    res += " закрылась скобка ";
	    break;
	    	    case '[':
	    res += " в квадратных скобках ";
	    break;
	    case ']':
	    res += " закрылась квадратная скобка ";
	    break;
	    case '%':
	    res += " процент ";
	    break;
	    case ':':
	    res += " двоеточие ";
	    break;
	    default:
	    res += ch;
	}
    }
    return res.replaceAll("стр. ", "страница");
});
