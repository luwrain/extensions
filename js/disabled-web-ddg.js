/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

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
		clickUrl = 'https://duckduckgo.com' + a[k].attr("href");
	}
	if (children[j].attr("class") === 'result__snippet')
	    snippet = children[j].text();
    }
    return     {title: title, snippet: snippet, displayUrl: displayUrl, clickUrl: clickUrl};
}

function ddgQuery(query)
{
    var url = 'https://duckduckgo.com/html/?q=' + java.net.URLEncoder.encode(query, "UTF-8");
    var con = org.jsoup.Jsoup.connect(url);
    con.userAgent("Mozilla/4.0");
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
	res.push(extractSearchItemData(items[i]));
    }
    return res;
}


Luwrain.addHook("luwrain.web.open", function(query){
        var q = query.trim();
    if (!q.toLowerCase().startsWith("d ") && !q.toLowerCase().startsWith("д "))
	return null;
    q = q.substring(2).trim();
    return {title: q + " (Поиск в DuckDuckGo)", items: ddgQuery(q)};
});

Luwrain.addHook("luwrain.web.search", function(query){
    var q = query.trim();
    //FIXME:checking the default search engine
    return {title: q + " (Поиск в DuckDuckGo)", items: ddgQuery(q)};
});

