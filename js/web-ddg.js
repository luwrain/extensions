

function ddgQuery(query)
{
var url = 'http://duckduckgo.com/html/?q=' + java.net.URLEncoder.encode(query);



var con = org.jsoup.Jsoup.connect(url);
var doc = con.get();
var items = doc.getElementsByTag("div");
var res = []; 
for(var i = 0;i < items.length;i++)
{
    var text = items[i].toString();
    if (text.indexOf("form") >= 0)
	continue;
    if (text.indexOf("result__title") < 0)
	continue;
    if (text.indexOf("results_links_deep") >= 0)
	continue;

//            print("new tag");
    var title = '';
    var h2 = items[i].getElementsByTag("h2");
    for(var j = 0;j < h2.length;j++)
	title = h2[j].text();

    var snippet = '';
    var children = Java.from(items[i].childNodes());
    for(var j = 0;j < children.length;j++)
    {
	if (children[j].getClass().getSimpleName() != "Element")
	    continue;
	if (children[j].attr("class") === 'result__snippet')
snippet = children[j].text();
    }

    res.push({title: title, snippet: snippet});
}

    return res;
}
