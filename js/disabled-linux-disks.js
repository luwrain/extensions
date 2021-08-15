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

var BLOCK_DEVICES_DIR = '/sys/block';
var MOUNTS_FILE = '/proc/mounts';

function getMounts()
{
    var lines = org.luwrain.util.FileUtils.readTextFileMultipleStrings(new java.io.File(MOUNTS_FILE), "UTF-8", null);
    var res = [];
    for(var i = 0;i < lines.length;i++)
    {
	var items = lines[i].split(' ', -1);
	var name = '';
	var device = '';
	var fstype = '';
	if (items.length >= 3)
	    fstype = items[2];
	if (items.length >= 2)
	    name = items[1].replaceAll('\\\\040', ' ');
	if (items.length >= 1)
	    device = items[0];
	res.push({name: name, device: device, fstype: fstype});
    }
    return res;
}

/*
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
*/

Luwrain.addHook("luwrain.popups.disks.list", function(){
    var res = [];
    var mounted = getMounts();
    for(var i = 0;i < mounted.length;i++)
    {
	var fstype = mounted[i].fstype;
	if (mounted[i].name.startsWith('/proc/') || mounted[i].name == '/')
	    continue;
	switch(fstype)
	{
	    case 'tmpfs':
	    case 'sysfs':
	    case 'proc':
	    case 'devpts':
	    case 'devtmpfs':
	    case 'cgroup':
	    case 'securityfs':
	    case 'pstore':
	    case 'mqueue':
	    case 'debugfs':
	    case 'hugetlbfs':
	    case 'configfs':
	    case 'fusectl':
	    continue;
	    default:
	    	res.push({name: mounted[i].name});
	}
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

Luwrain.addHook("luwrain.popups.disks.click", function(disk){
    return disk.name;
    Luwrain.message.error(disk.name);
    return false;
});

