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

Luwrain.addHook("luwrain.pim.mail.save.new", function(mail, message){
    const defaultIncoming = mail.getFolders().findByProp("defaultIncoming", "true")
    if (!defaultIncoming) {
	Luwrain.log.error("mail", "no default incoming folder");
	return false;
    }
    if (defaultIncoming.saveMessage(message))
	Luwrain.log.debug("mail", "message saved");
    return true;
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

/*
Luwrain.addCommand("worker-mail-incoming", function(){
    if (!Luwrain.runWorker("luwrain.pim.fetch.pop3"))
	Luwrain.message("already");
});
*/

