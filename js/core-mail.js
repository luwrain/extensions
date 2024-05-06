/*
   Copyright 2019-2024 Michael Pozhidaev <msp@luwrain.org>

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

const PROPERTY_MAILING_LIST = "mailing-list";

Luwrain.addHook("luwrain.mail.incoming", (mail, msg) => {
    var folder = null;
    const headers = msg.getHeader("List-Id");
    if (headers.length > 0) {
	var listId = headers[0]
	var personal = mail.getAddressPersonalName(listId);
	if (!personal) {
	    const from= msg.getHeader("From");
	    if (from.length > 0)
		personal = mail.getAddressPersonalName(from[0]);
	}
	listId = mail.getAddressWithoutPersonalName(listId);
	if (!personal)
	    personal = listId;
folder = mail.getFolders().findFirstByProperty(PROPERTY_MAILING_LIST, listId);
	if (!folder) {
folder = mail.getFolders().getDefaultMailingLists().newSubfolder();
	    folder.setName(personal);
	    folder.getProperties().setProperty(PROPERTY_MAILING_LIST, listId);
	    folder.update();
	}
    } else
folder = mail.getFolders().getDefaultIncoming();
    if (!folder)
	throw "No folder to save the mail";
    folder.saveMessage(msg);
});

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


