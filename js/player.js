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

function getFilesInDir(dir)
{
    var res = [];
    var items = dir.listFiles();
    if (items == null || items.length == 0)
	return [];
    java.util.Arrays.sort(items);
    for(var i = 0;i < items.length;i++)
	if (items[i].isDirectory())
	{
	    var subdirItems = getFilesInDir(items[i]);
	    for(var j = 0;j < subdirItems.length;j++)
		res.push(subdirItems[j]);
	}
    for(var i = 0;i < items.length;i++)
	if (items[i].isFile())
	    res.push(items[i]);
    return res;
}

Luwrain.addHook("luwrain.prop.player.track.sec", function(propName, propValue){
//    Luwrain.message(propValue);
});

Luwrain.addHook("luwrain.player.album.play", function(album){
    switch(album.type)
    {
	case "dir":
	{
	    if (album.path.isEmpty())
		return false;
	    var files = getFilesInDir(new java.io.File(album.path));
	    var urls = [];
	    for(var i = 0;i < files.length;i++)
		urls.push(org.luwrain.util.Urls.toUrl(files[i]).toString());
	    Luwrain.player.play(urls, {});
	    return true;
	}
	case "streaming":
	if (album.url.isEmpty())
	    return false;
	Luwrain.sounds.playing();
	Luwrain.player.play([album.url], {streaming: true});
	return true;
	default:
	return false;
    }
});

Luwrain.addHook("luwrain.app.player.areas.albums.input", function(event, album){
    if (event.special == null)
	return false;
    switch(event.special)
    {
	case "f5":
	Luwrain.message(album.title);
	return true;
	default:
	return false;
    }
});

Luwrain.createPropertyHook("luwrain.player.track.sec", "luwrain.prop.player.track.sec");
