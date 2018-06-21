
var KEY = "trnsl.1.1.20150921T153654Z.976f9d18953f9209.b06292c929d38cffaa9d8e5f724898fa4c9c382d";

var yatran = function()
{
    var text = "";
    var url = "https://translate.yandex.net/api/v1.5/tr/translate?key=" + KEY + "&text=";
    url += java.net.URLEncoder.encode(text);
    url += "&lang=en-ru";
    
    Luwrain.runBkg(function(){

	var res = "";

	var con = org.jsoup.Jsoup.connect(url);
var doc = con.get();
var items = doc.getElementsByTag("text");
for(var i = 0;i < items.length;i++)
	{
	    res += items[i].text();
    }

	
	Luwrain.message(res);
    });
}

Luwrain.addCommand("yatran2", yatran);
