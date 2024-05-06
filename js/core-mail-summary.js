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


Luwrain.addHook("luwrain.mail.summary", (mail, messages)=>{
    const topics = [];
    for(let m of messages){
	var theme = m.getSubject();
	if (!theme)
	    theme = "Без темы";
	var re = theme.match(/Re:\s+(.*)$/);
	if (re)
	    theme = re[1];
	var topic = topics.find((t) => { return t.theme == theme;});
	if (!topic) {
	    topic = {theme, messages: []};
	    topics.push(topic);
	}
	topic.messages.push(m);
    }
    topics.sort((a, b) => {
	if (a.messages.length > b.messages.length)
	    return -1;
		if (a.messages.length < b.messages.length)
		    return 1;
	return 0;
    });
    const res = [];
    for(let t of topics) {
	res.push(t.theme);
	for(let m of t.messages)
	    res.push(m);
    }
    return res;
    });

Luwrain.addHook("luwrain.mail.reply", (message)=>{
    const to = message.getTo().full;
    const t = message.getTextAsArray();
    const text = ["", ""];
    for(let i of t) {
	if (i.trim() == "--")
	    break;
	text.push(">" + i);
    }
    var subject = message.getSubject();
    subject = "Re: " + subject;
    const arg = {to, subject, text};
    Luwrain.launchApp("message", [JSON.stringify(arg)]);
    return true;
});
