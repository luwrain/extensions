

function extractSearchItemData(el)
{
    
    var title = '';
        var snippet = '';
    var displayUrl = '';
    var clickUrl = '';

    
    var h2 = el.getElementsByTag("h2");
    for(var j = 0;j < h2.length;j++)
	title = h2[j].text();
    var children = Java.from(el.childNodes());
    for(var j = 0;j < children.length;j++)
    {
	if (children[j].getClass().getSimpleName() != "Element")
	    continue;
	if (children[j].attr("class") === 'result__extras')
	{
displayUrl = children[j].text();
	    var a = children[j].getElementsByTag("a");
	    for(var k = 0;k < a.length;k++)
clickUrl = a[k].attr("href");
		     }
	if (children[j].attr("class") === 'result__snippet')
snippet = children[j].text();
    }
return     {title: title, snippet: snippet, displayUrl: displayUrl, clickUrl: clickUrl};
}

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
    res.push(extractSearchItemData(item[i]));
}
    return res;
}
