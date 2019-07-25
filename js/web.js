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

Luwrain.addHook("luwrain.url.open.default", function(url){
    Luwrain.launchApp("reader", [url]);
});

Luwrain.addCommand("url", function(){
    var url = Luwrain.popups.simple("Открыть URL", "URL:", "");
    if (url == null)
	return;
    Luwrain.openUrl("http://marigostra.ru");
});
