/*
   Copyright 2019 Michael Pozhidaev <msp@luwrain.org>

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

function stripTags(line)
{
    return line.replaceAll("</span>", "").replaceAll("<span class=.searchmatch.>", "");
}

function getLangs()
{
    var value = Luwrain.registry.ext.luwrain.wiki.langs;
    if (value.isEmpty())
	return ["en"];
    value = value.replaceAll(",", " ").replaceAll(";", " ").replaceAll(":", " ");
    var res = [];
    var values = value.split(" ", -1);
    for(var i = 0;i < values.length;i++)
	if (!values[i].trim().isEmpty())
	    res.push(values[i].trim());
    if (res.length == 0)
	return ["en"];
    return res;
}

function wikiQuery(query)
{
        var res = [];
    var langs = getLangs();
    for (var l=0;l < langs.length;l++)
    {
	var url = "https://" + java.net.URLEncoder.encode(langs[l]) + ".wikipedia.org/w/api.php?action=query&list=search&srsearch=" + java.net.URLEncoder.encode(query, "UTF-8") + "&format=xml";
	var con = org.jsoup.Jsoup.connect(url);
	var doc = con.get();
	var pages = doc.getElementsByTag("p");
	for(var i = 0;i < pages.length;i++)
	{
	    var page = pages[i];
	    var lang = langs[l];
	    var title = page.attr("title");
	    var comment = page.attr("snippet");
	    if (title == null || title.isEmpty())
		continue;
	    if (comment == null)
		comment = "";
	    comment = stripTags(comment);
	    res.push({title: title, lang: lang, comment: comment});
	}
    }
    Luwrain.sounds.ok();
    return res;
}

Luwrain.addHook("luwrain.wiki.search", function(query){
    return wikiQuery(query);
});

Luwrain.addHook("luwrain.web.open", function(query){
    var q = query.trim();
    if (!q.toLowerCase().startsWith("w ") && !q.toLowerCase().startsWith("в "))
	return null;
    q = q.substring(2).trim();
    var res = wikiQuery(q);
    for(var i = 0;i < res.length;i++)
    {
	res[i].snippet = res[i].comment;
	res[i].comment = undefined;
	res[i].displayUrl = res[i].lang + ".wikipedia.org/wiki/" + java.net.URLEncoder.encode(res[i].title, "UTF-8").replaceAll("\\+", "%20");
	res[i].clickUrl = "https://" + res[i].displayUrl;
	res[i].lang = undefined;
    }
    return {title: q + " (Поиск в Википедии)", items: res};
});
