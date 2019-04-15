/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>

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

if (Luwrain.registry.org.luwrain.extensions.speechTranslitLatinCyr)
Luwrain.addHook("luwrain.speech.text.regular", function(text){
    var lowerText = text.toLowerCase();
    var res = "";
    for(var i = 0;i < lowerText.length;i++)
    {
	var ch = lowerText[i];
	if (ch < 'a' || ch > 'z')
	{
	    res += ch;
	    continue;
	}
	switch(ch)
	{
	    case 'a': ch2 = "а"; break;
	    case 'b': ch2 = "б"; break;
	    case 'c': ch2 = "ц"; break;
	    case 'd': ch2 = "д"; break;
	    case 'e': ch2 = "е"; break;
	    case 'f': ch2 = "ф"; break;
	    case 'g': ch2 = "г"; break;
	    case 'h': ch2 = "х"; break;
	    case 'i': ch2 = "и"; break;
	    case 'j': ch2 = "дж"; break;
	    case 'k': ch2 = "к"; break;
	    case 'l': ch2 = "л"; break;
	    case 'm': ch2 = "м"; break;
	    case 'n': ch2 = "н"; break;
	    case 'o': ch2 = "о"; break;
	    case 'p': ch2 = "п"; break;
	    case 'q': ch2 = "кв"; break;
	    case 'r': ch2 = "р"; break;
	    case 's': ch2 = "с"; break;
	    case 't': ch2 = "т"; break;
	    case 'u': ch2 = "у"; break;
	    case 'v': ch2 = "в"; break;
	    case 'w': ch2 = "в"; break;
	    case 'x': ch2 = "кс"; break;
	    case 'y': ch2 = "и"; break;
	    case 'z': ch2 = "з"; break;
	}
	res += ch2;
    }
    return res;
});

