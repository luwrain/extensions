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

