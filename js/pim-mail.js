/*
   Copyright 2019-2021 Michael Pozhidaev <msp@luwrain.org>

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

var SERVERS = [
    {suffixes: ['@yandex.ru', '@yandex.com'],
     smtp: {
	 host: 'smtp.yandex.ru',
	 port: 587,
	 ssl: false,
	 tls: true}
    },

    {suffixes: ['@gmail.com'],
     smtp: {
	 host: 'smtp.gmail.com',
	 port: 587,
	 ssl: false,
	 tls: true}
    },

    {suffixes: ['@mail.ru'],
     smtp: {
	 host: 'smtp.mail.ru',
	 port: 587,
	 ssl: false,
	 tls: true}
    },

    {suffixes: ['@rambler.ru'],
     smtp: {
	 host: 'smtp.rambler.ru',
	 port: 465,
	 ssl: true,
	 tls: false}
    }]

function findServer(addr)
{
    for(var i = 0;i < SERVERS.length;i++)
    {
	var s = SERVERS[i];
	var j = 0;
	for(var j = 0;j < s.suffixes.length;j++)
	    if (addr.trim().toLowerCase().endsWith(s.suffixes[j].trim().toLowerCase()))
		break;
	if (j >= s.suffixes.length)
	    continue;
	return s;
    }
    return null;
}


function saveToDefaultIncoming(mail, message)
{
    var defaultIncoming = mail.folders.findFirstByProperty("defaultIncoming", 'true')
    if (defaultIncoming == null)
	return false;
    return defaultIncoming.saveMessage(message);
}

Luwrain.addHook("luwrain.pim.message.new.save", function(mail, message){
    var listId = message.list.id;
//    if (listId.isEmpty())
	return saveToDefaultIncoming(mail, message);
    var existingFolder = mail.folders.findFirstByProperty("list", listId)
    if (existingFolder != null)
    {
	existingFolder.saveMessage(message);
	return true;
    }
    if (existingFolder == null)
    {
	var listsFolder = mail.folders.findFirstByProperty("lists", 'true');
	if (listsFolder == null)
	    return saveToDefaultIncoming(mail, message);
	var newFolder = listsFolder.newSubfolder();
	if (!message.list.name.isEmpty())
	    newFolder.title = message.list.name; else
		newFolder.title = listId;
	newFolder.properties.list = listId;
	newFolder.saveProperties();
    }
    return true;
});

Luwrain.addCommand("worker-mail-incoming", function(){
    if (!Luwrain.runWorker("luwrain.pim.fetch.pop3"))
	Luwrain.message("already");
});


Luwrain.addHook("luwrain.wizards.mail.account", function(mail){
    var title = "Подключение почтового ящика";
    var fullName = Luwrain.popups.simple(title, "Ваше полное имя:", "");
    if (fullName == null)
	return;
    var addr = Luwrain.popups.simple(title, "Ваш адрес электронной почты:", "")
    if (addr == null)
	return;
    var server = findServer(addr);
    if (server == null)
    {
	Luwrain.message.error("К сожалению, не удалос подобрать известный сервер для вашего адреса");
	return;
    }
    Luwrain.message(server.smtp.host);

    });
