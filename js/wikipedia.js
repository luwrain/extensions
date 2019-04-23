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

Luwrain.addHook("luwrain.wiki.search", function(query){
    var url = "https://" + java.net.URLEncoder.encode("ru") + ".wikipedia.org/w/api.php?action=query&list=search&srsearch=" + java.net.URLEncoder.encode(query, "UTF-8") + "&format=xml";
    var con = org.jsoup.Jsoup.connect(url);
    var doc = con.get();
    var pages = doc.getElementsByTag("p");
    var res = [];
    for(var i = 0;i < pages.length;i++)
    {
	var page = pages[i];
	var lang = "ru";
	var title = page.attr("title");
	var comment = page.attr("snippet");
	if (title == null || title.isEmpty())
	    continue;
	if (comment == null)
	    comment = "";
	comment = stripTags(comment);
	res.push({title: title, lang: lang, comment: comment});
    }
    return res;
});
