// Speaks the currency rate for USD as it's published by CBRF
// Michael Pozhidaev <michael.pozhidaev@gmail.com>

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
