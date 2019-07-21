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

Luwrain.addHook("luwrain.popups.disks.click", function(disk){
    return disk.name;
    Luwrain.message.error(disk.name);
    return false;
});

Luwrain.addHook("luwrain.popups.disks.list", function(volumes, disks){
var fileSystem = java.nio.file.FileSystems.getDefault();
    var stores = fileSystem.getFileStores();
    var it = stores.iterator();
    var res = [];
    res.push({name: fileSystem.toString()});
    while(it.hasNext())
    {
	var item = it.next();
	var name = item.toString();
	if (name.startsWith("/sys"))
	    continue;
	if (name.startsWith("/proc"))
	    continue;
		if (name.startsWith("/dev"))
		    continue;
	if (name.startsWith("/run"))
	    continue;
	    var pos = name.indexOf(" (");
	if (pos < 0)
	    continue;
	name = name.substring(0, pos);
	res.push({name: name});
    }
    return res;
    });
