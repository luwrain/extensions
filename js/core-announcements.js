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

var inputEventTime = -1

Luwrain.addHook("luwrain.announcement", function(text, announcementClass, announcementSubclass){
    var d = new java.util.Date();
    if (inputEventTime >= 0 && d.getTime() - inputEventTime < 30000)
	return;
    if (text.match("RT @[a-zA-Z0-9_]+: .*"))
	text = text.substring(text.indexOf(":") + 1);
    Luwrain.message.announcement(text);
});

Luwrain.addHook("luwrain.events.input", function(event){
    var d = new java.util.Date();
    inputEventTime = d.getTime();
});
