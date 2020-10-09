/*
   Copyright 2019-2020 Michael Pozhidaev <msp@luwrain.org>

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

var KEY = '';

function yatran(text, lang)
{
    try {
    var url = "https://translate.yandex.net/api/v1.5/tr/translate?key=" + KEY + "&text=";
    url += java.net.URLEncoder.encode(text);
    url += "&lang=";
    url += lang;
    var res = "";
    var con = org.jsoup.Jsoup.connect(url);
    var doc = con.get();
    var items = doc.getElementsByTag("text");
    for(var i = 0;i < items.length;i++)
	res += items[i].text();
	Luwrain.message(res);
    }
    catch(e)
    {
	print(e.toString());
    }
}

function yatranEnRu()
{
    var text = Luwrain.getActiveAreaText("region");
    if (text == null)
	text = Luwrain.getActiveAreaText("word");
    if (text == null || text.trim().isEmpty())
    {
	Luwrain.message("Отсутствует текст для перевода");//FIXME:error type
	return;
    }
        Luwrain.runBkg(function(){yatran(text, "en-ru");});
}

function yatranRuEn()
{
    var text = Luwrain.getActiveAreaText("region");
    if (text == null)
	text = Luwrain.getActiveAreaText("word");
    if (text == null || text.trim().isEmpty())
    {
	Luwrain.message("Отсутствует текст для перевода");//FIXME:error type
	return;
    }
        Luwrain.runBkg(function(){yatran(text, "ru-en");});
}

Luwrain.addCommand("yatran-en-ru", yatranEnRu);
Luwrain.addCommand("yatran-ru-en", yatranRuEn);
