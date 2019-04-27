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

function getSizeStr(bytes)
{
    if (bytes < 1024)
	return "" + bytes;
    if (bytes < 1048576)
	return "" + java.lang.Math.floor(bytes / 1024) + "K";
    if (bytes < 1048576 * 1024)
	return "" + java.lang.Math.floor(bytes / 1048576) + "M";
	return "" + java.lang.Math.floor(bytes / 1048576 / 1024) + "G";
}

function getSize(f)
{
    if (f.isFile())
	return f.length();
    if (!f.isDirectory())
	return 0;
    var items = f.listFiles();
    if (items == null)
	throw new java.io.IOException("Unable to get the content of " + f.getAbsolutePath());
    var res = 0;
    for(var i = 0;i < items.length;i++)
	if (items[i].isFile())
	    res += items[i].length(); else
		res += getSize(items[i]);
    return res;
}

Luwrain.addHook("luwrain.commander.info.local", function(files){
    /*
    var res = [];
    for(var i = 0;i < files.length;i++)
    {
	var file = files[i];
	var basic = java.nio.file.Files.getFileAttributeView(file.toPath(), java.nio.file.attribute.BasicFileAttributeView.class, java.nio.file.LinkOption.NOFOLLOW_LINKS);
	var posix = java.nio.file.Files.getFileAttributeView(file.toPath(), java.nio.file.attribute.PosixFileAttributeView.class, java.nio.file.LinkOption.NOFOLLOW_LINKS);
	var attr = basic.readAttributes();
	if (attr.isDirectory())
	    res.push(Luwrain.i18n.static.commanderDirectory);
	if (attr.isSymbolicLink())
	    res.push(Luwrain.i18n.static.commanderSymlink);
	if (posix != null)
	{
	    res.push("posix");
	    var posixAttr = posix.readAttributes();
	    var perm = posixAttr.permissions();
	    try {
		res.push(perm.toString());
		throw new java.lang.Exception("llll");
	    }
	    catch(e)
	    {
		res.push("catch" + e.toString());
	    }
		}
	res.push(files[i].getName());
    }
    return res;
    */
    return null;
});

Luwrain.addHook("luwrain.commander.size.local", function(files){
    try {
    var res = 0;
    for(var i = 0;i < files.length;i++)
	res += getSize(new java.io.File(files[i]));
	Luwrain.message.done(getSizeStr(res));
    }
    catch(e)
    {
	Luwrain.sounds.error();
    }
});


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
