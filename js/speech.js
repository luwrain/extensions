/*
   Copyright 2019 Michael Pozhidaev <msp@luwrain.org>

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

Luwrain.addHook("luwrain.speech.text.regular", function(text){
    /*
    for(var i = 0;i < text.length;i++)
    {
	var ch = new java.lang.Character(text[i]);
	if (java.lang.Character.isLetterOrDigit(ch.charValue()))
	    return text;
    }
    var res = '';
    for(var i = 0;i < text.length;i++)
    {
	var ch = new java.lang.Character(text[i]);
	//	res += (java.lang.Character.getName(ch.intValue()) + " ");
	res += "символ ";
    }
    return res.trim();
    */
    return text;
});
