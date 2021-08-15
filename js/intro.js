/*
   Copyright 2019-2021 Michael Pozhidaev <msp@luwrain.org>

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

var frames = [

    //0
    [
	"Добро пожаловать в LUWRAIN!",
	"",
	"Вашему вниманию предлагается учебник и тренажёр для быстрого ознакомления с основными правилами работы в LUWRAIN."
    ],

    //1
    [
    "Основной элемент управления в нашей системе - список. В виде списка",
    "представлены файлы на вашем жёстком диске, содержимое рабочего стола,",
    "главного меню и прочие объекты.  Навигация по списку производится",
    "путём нажатия клавиш со стрелками вверх и вниз. При установке курсора",
    "на новый элемент списка, произносится его название.",
    "",
    "На следующем шаге мы предлагаем вам попробовать навигацию в списке из",
    "трёх элементов. Внимательно прослушайте их название и научитесь",
	"мысленно в них ориентироваться."
	]


];

function sayFrameText(index)
{
var text = "";
for(var i = 0;i < frames[index].length;i++)
text += (frames[index][i] + " ");
Luwrain.message(text);
}

function IntroApp()
{
    this.name = "Первые шаги в LUWRAIN, нажмите пробел для прослушивания текста";
    this.type = "simple-centered";
    this.index = 1;
    this.lines = frames[0];
    this.hotPointX = 0;
    this.hotPointY = 0;

    this.onInputEvent = function(event)
    {
	if (event == " ")
	{
sayFrameText(this.index);
	    return true;
	}
	return false;
    };
}


Luwrain.addApp("edu-intro-ru", IntroApp);
Luwrain.addCommand("edu-intro-ru", function(){Luwrain.launchApp("edu-intro-ru", []);});
