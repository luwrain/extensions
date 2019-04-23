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

function KeyboardApp()
{
    this.name = "Тренажёр клавиатуры";
    this.type = "simple-centered";
    this.text = "МЫ НАБИРАЕМ ЭТОТ ТЕКСТ И СТАНОВИМСЯ БОЛЬШИМИ МОЛОДЦАМИ";
    this.index = 0;
    this.lines = ["",
		  "",
		  "Ё 1 2 3 4 5 6 7 8 9 0 - =",
		  " Й Ц У К Е Н Г Ш Щ З Х Ъ",
		  " Ф Ы В А П Р О Л Д Ж Э \\",
		  "   Я Ч С М И Т Ь Б Ю ."];
    this.hotPointX = 9;
    this.hotPointY = 5;

    this.onInputEvent = function(event)
    {
	if (event == "ENTER")
	{
	    if (this.index == 0)
	    {
		Luwrain.message("Пока ничего не набрано");
		return true;
	    }
	    Luwrain.message(this.text.substring(0, this.index));
	    return true;
	}
	if (event.length() != 1)
	    return false;
	var ch = event.toUpperCase()[0];
	if ((ch < 'А' || ch > 'Я') && ch != ' ')
	    return false;
	if (this.index >= this.text.length())
	{
	    Luwrain.message("Весь ттекст набран");
	    return true;
	}
	if (ch != this.text[this.index])
	{
	    Luwrain.message("Это " + charName(ch) + ", а нам надо " + charName(this.text[this.index]));
	    return true;
	}
	this.index++;
	if (this.index >= this.text.length())
	{
	    this.lines[0] = this.text;
	    this.hotPointX = this.text.length();
	    this.hotPointY = 0;
	    Luwrain.message("Весь текст набран!");
	    return true;
	}
	Luwrain.message("Правильно! Теперь найдите " + charName(this.text[this.index]));
	this.lines[0] = this.text.substring(0, this.index);
	this.highlightChar(this.text[this.index]);
	return true;
    };

    this.highlightChar = function(ch)
    {
	if (ch == ' ')
	{
	    this.hotPointX = 0;
	    this.hotPointY = 1;
	    return true;
	}
	for(var i = 2;i < 6;i++)
	    for(var j = 0;j < this.lines[i].length();j++) 
		if (this.lines[i][j] == ch) {
		    this.hotPointX = j;
		    this.hotPointY = i;
		    return true;
		}
	return false;
    };
}

function charName(ch)
{
    if (ch == ' ')
	return "пробел";
    return ch;
}

Luwrain.addApp("edu-keyboard", KeyboardApp);
Luwrain.addCommand("edu-keyboard", function(){Luwrain.launchApp("edu-keyboard", []);});
