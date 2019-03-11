/*
   Copyright 2019 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

Luwrain.addHook("luwrain.pim.message.new.save", function(mail, message){
    var listId = message.list.id;
    if (listId.isEmpty())
	return true;
    var existingFolder = mail.folders.findFirstByProperty("list", listId)
    if (existingFolder == null)
    {
	var listsFolder = mail.folders.findFirstByProperty("lists", "true");
	if (listsFolder == null)
	    return true;
	var newFolder = listsFolder.newSubfolder();
	if (!message.list.name.isEmpty())
	    newFolder.title = message.list.name; else
		newFolder.title = listId;
	newFolder.properties.list = listId;
	newFolder.saveProperties();
    }
    return true;
});

Luwrain.addCommand("fetch-mail-incoming-bkg", function(){
    if (!Luwrain.runWorker("luwrain.pim.fetch.pop3"))
	Luwrain.message("already");
});
