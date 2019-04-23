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

Luwrain.addHook("luwrain.commander.preview.local.default", function(file){
    if (!file.isFile())
	return false;
    if (file.getName().toLowerCase().endsWith(".txt") ||
	file.getName().toLowerCase().endsWith(".doc") ||
	file.getName().toLowerCase().endsWith(".docx") ||
	file.getName().toLowerCase().endsWith(".htm") ||
	file.getName().toLowerCase().endsWith(".html") ||
	file.getName().toLowerCase().endsWith(".pdf"))
    {
	var url = org.luwrain.util.UrlUtils.fileToUrl(file);
	Luwrain.launchApp("reader", [url]);
	return true;
    }
    return false;
});
