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
    if (album.streaming)
    {
	if (album.url.isEmpty())
	    return false;
    Luwrain.sounds.playing();
	Luwrain.player.play([album.url], {streaming: true});
	return true;
    }
    return false;
});

Luwrain.createPropertyHook("luwrain.player.track.sec", "luwrain.prop.player.track.sec");


