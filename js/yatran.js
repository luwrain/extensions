
var KEY = "trnsl.1.1.20150921T153654Z.976f9d18953f9209.b06292c929d38cffaa9d8e5f724898fa4c9c382d";

function yatran(text, lang)
{
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
