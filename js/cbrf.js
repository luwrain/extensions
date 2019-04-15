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

// Speaks the currency rate for USD as it's published by CBRF

function speakCurrencyRate(id)
{
        var date = new java.util.Date();
    var day = date.getDate();
    day = day < 10?"0" + day:"" + day;
    var month = date.getMonth() + 1;
    month = month < 10?"0" + month:"" + month;
    var year = "" + (date.getYear() + 1900);
    var url = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + day + "/" + month + "/" + year;
    var con = org.jsoup.Jsoup.connect(url);
    var doc = con.get();
    var valutes = doc.getElementsByTag("valute");
    for(var i = 0;i < valutes.length;i++)
    {
	var charCode = valutes[i].getElementsByTag("charcode");
	if (charCode[0].text() == id)
	{
	    var value = valutes[i].getElementsByTag("value");
	    Luwrain.message(value[0].text());
	}
    }
}

Luwrain.addCommand("currency-usd", function(){Luwrain.runBkg(function(){speakCurrencyRate("USD");});});
Luwrain.addCommand("currency-eur", function(){Luwrain.runBkg(function(){speakCurrencyRate("EUR");});});
Luwrain.addCommand("currency-gbp", function(){Luwrain.runBkg(function(){speakCurrencyRate("GBP");});});
