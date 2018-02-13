var con = org.jsoup.Jsoup.connect("http://www.cbr.ru/scripts/XML_daily.asp?date_req=20/01/2018");
var doc = con.get();
var valutes = doc.getElementsByTag("valute");
for(var i = 0;i < valutes.length;i++)
{
    var charCode = valutes[i].getElementsByTag("charcode");
    if (charCode[0].text() == "USD")
    {
	var value = valutes[i].getElementsByTag("value");
	Luwrain.message(value[0].text());
    }
}
