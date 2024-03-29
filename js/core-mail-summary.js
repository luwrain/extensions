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

function stripRe(text)
{
    return text.replaceAll('^[Rr][Ee](\\[[0-9]+\\])*: ', '').trim();
}

function stripCommonBeginning(items)
{
    if (items.length == 0)
	return;
    var commonTo = 0;
    while(true)
    {
	if (commonTo >= items[0].subject.length)
	    break;
	var ch = items[0].subject[commonTo];
	//Looking for the item not matching the ch
	var i;
	for(i = 1;i < items.length;i++)
	    if (commonTo >= items[i].subject.length || items[i].subject[commonTo] != ch)
		break;
	if (i < items.length)
	    break;
	commonTo++;
    }
    if (commonTo > 0)
	for(var i = 0;i < items.length;i++)
	    items[i].subject = items[i].subject.substring(commonTo);
}

function divideOnGroups(items)
{
    var groups = [];
    for(var i = 0;i < items.length;i++)
    {
	var k = 0;
	for(k = 0;k < groups.length;k++)
	    if (groups[k].subject == items[i].subject)
		break;
	if (k < groups.length)
	    groups[k].messages.push(items[i]); else
		groups.push({subject: items[i].subject, messages: [items[i]]});
    }
    return groups;
}

Luwrain.addHook("luwrain.mail.summary.organize", function(messages){
    return messages;
    var res = [];
    for(var i = 0;i < messages.length;i++)
	res.push({
	    subject: stripRe(messages[i].subject),
	    source: messages[i]
	});
    stripCommonBeginning(res);
    //Stripping RE: once more time
    for(var i = 0;i < res.length;i++)
	res[i].subject = stripRe(res[i].subject);
    var groups = divideOnGroups(res);
    res = [];
    for(var i = 0;i < groups.length;i++)
	if (groups[i].messages.length == 1)
	    res.push({message: groups[i].messages[0].source, title: groups[i].messages[0].source.from.personal + ' ' + groups[i].messages[0].source.subject});
    for(var i = 0;i < groups.length;i++)
    {
	if (groups[i].messages.length < 2)
	    continue;
	res.push("Тема " + groups[i].subject);
	for(var j = 0;j < groups[i].messages.length;j++)
	    res.push({message: groups[i].messages[j].source, title: groups[i].messages[j].source.from.personal});
    }
    return res;
});

