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

    res = res.toLowerCase();

    res = res.replaceAll("см\\. на стр\\. ", "смотрите на странице ");
    res = res.replaceAll("см\\. стр\\. ", "смотрите на странице ");

    res = res.replaceAll("до н\\. *э\\.", "до нашей эры");
    res = res.replaceAll("н\\. *э\\.", "нашей эры");

    res = res.replaceAll("стр\\. ", "страница ");
    return res;
});


Luwrain.addHook("luwrain.i18n.ru.speech.programming.pre", function(text){
    var res = "";
    //Checking the first letter to understand what language must be the default
    var rusLang = true;
    for(var i = 0;i < text.length;i++)
    {
	var ch = text[i];
	if ((ch >= 'а' && ch <= 'я') ||
	    (ch >= 'А' && ch <= 'Я'))
	    break;
	if ((ch >= 'a' && ch <= 'z') ||
	    (ch >= 'A' && ch <= 'Z'))
	{
	    rusLang = false;
	    break;
	}
    }
    for(var i = 0;i < text.length;i++)
    {
	var ch = text[i];
	switch(ch)
	{
	    	    	    case '~':
	    	    if (rusLang)
			res += ' тильда '; else
			    res += ' tilde  ';
	    break;
	    	    	    	    case '!':
	    	    if (rusLang)
			res += ' восклицательный знак '; else
			    res += ' exclamation  ';
	    break;
	    	    case '#':
	    	    if (rusLang)
			res += ' диез '; else
			    res += ' sharp ';
	    break;
	    case '/':
	    	    if (rusLang)
			res += ' слэш '; else
			    res += ' slash ';
	    break;
	    case '(':
	    	    if (rusLang)
			res += " левая круглая "; else
			    res += ' left parent ';
	    break;
	    case ')':
	    	    if (rusLang)
			res += " правая круглая "; else
			    res += ' right parent ';
	    break;
	    case '[':
	    	    	    if (rusLang)
				res += ' левая квадратная '; else
				    res += ' left bracket ';
	    break;
	    case ']':
	    	    if (rusLang)
			res += ' правая квадратная '; else
			    res += ' right bracket ';
	    break;
	    	    case '{':
	    	    	    if (rusLang)
				res += ' левая фигурная '; else
				    res += ' left brace ';
	    break;
	    case '}':
	    	    if (rusLang)
			res += ' правая фигурная '; else
			    res += ' right brace ';
	    break;
	    case '%':
	    if (rusLang)
		res += " процент "; else
		    res += ' percent ';
	    break;
	    	    case '<':
	    if (rusLang)
		res += ' меньше '; else
		    res += ' less than ';
	    break;
	    	    	    case '>':
	    if (rusLang)
		res += ' больше '; else
		    res += ' greater than ';
	    break;
	    case '.':
	    if (rusLang)
		res += ' точка '; else
		    res += ' dot ';
	    break;
	    case ':':
	    if (rusLang)
		res += " двоеточие "; else
		    res += ' colon ';
	    break;
	    	    case ';':
	    if (rusLang)
		res += " точка с запятой "; else
		    res += ' semicolon ';
	    break;
	    case '-':
	    if (rusLang)
		res += ' дефис '; else
		    res += ' dash ';
	    break;
	    	    case '+':
	    if (rusLang)
		res += ' плюс '; else
		    res += ' plus ';
	    break;
	    	    	    case '=':
	    if (rusLang)
		res += ' равно '; else
		    res += ' equals ';
	    break;
	    default:
	    if ((ch >= 'а' && ch <= 'я') ||
		(ch >= 'А' && ch <= 'Я'))
		rusLang = true; else
	    	    if ((ch >= 'a' && ch <= 'z') ||
		(ch >= 'A' && ch <= 'Z'))
		rusLang = false;
	    res += ch;
	}
    }
    return res;
    });
