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

Luwrain.addHook("luwrain.url.open", (url)=>{
    Luwrain.launchApp("reader", [url]);
});

Luwrain.addHook("luwrain.web.open", (query)=>{
    const q = query.trim();
    if (q.toLowerCase().startsWith("http://") ||
	q.toLowerCase().startsWith("https://")) {
		Luwrain.log.debug("web", q + " true");
	    Luwrain.openUrl(q);
	return true;
    }
    return false;
});
