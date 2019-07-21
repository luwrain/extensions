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

var BLOCK_DEVICES_DIR = '/sys/block';

function getMountedVolumes()
{
    var fileSystem = java.nio.file.FileSystems.getDefault();
    var stores = fileSystem.getFileStores();
    var it = stores.iterator();
    var res = [];
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
	res.push(name);
    }
    return res;
}

Luwrain.addHook("luwrain.popups.disks.click", function(disk){
    return disk.name;
    Luwrain.message.error(disk.name);
    return false;
});



Luwrain.addHook("luwrain.popups.disks.list", function(volumes, disks){
    var res = [];
    var mounted = getMountedVolumes();
    for(var i = 0;i < mounted.length;i++)
    {
	var name = mounted[i];
	var pos = name.indexOf(" (");
	if (pos < 0)
	    continue;
	name = name.substring(0, pos);
	res.push({name: name});
    }


    var blockDevDir = new java.io.File(BLOCK_DEVICES_DIR);
    var devices = blockDevDir.listFiles();
    if (devices != null)
	for(var i = 0;i < devices.length;i++)
    {

	var device = devices[i];

	var removable = new java.io.File(device, "removable");
	var line = org.luwrain.util.FileUtils.readTextFileSingleString(removable, "US-ASCII");
	if (!line.trim().equals('1'))
	    continue;

	
	res.push({name: device.getName()});
    }
    return res;
	});
