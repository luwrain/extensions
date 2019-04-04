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

Luwrain.createPropertyHook("luwrain.player.track.sec", "luwrain.prop.player.track.sec");

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
});

Luwrain.addHook("luwrain.player.album.play", function(album){
    switch(album.type)
    {
    case "dir":
	{
	    var path = "" + album.properties.path;
	    if (path.isEmpty())
		return false;
	    var files = getFilesInDir(new java.io.File(path));
	    if (files.length == 0)
		return false;
	    var urls = [];
	    for(var i = 0;i < files.length;i++)
		urls.push(org.luwrain.util.UrlUtils.fileToUrl(files[i]).toString());
	    Luwrain.player.play(urls, 0, 0, [], album.properties);
	    return true;
	}
    case "streaming":
	{
	    var url = "" + album.properties.url;
	    if (url.isEmpty())
		return false;
	    Luwrain.sounds.playing();
	    Luwrain.player.play([album.properties.url], 0, 0, ["streaming"], album.properties);
	    return true;
	}
    default:
	return false;
    }
});

function commonKeys(event)
{
    if (Luwrain.player.state === "stopped")
    {
	if(event.special != null)
	    return false;
	switch(event.ch)
	{
		case "_":
	{
	    if (event.modified && !event.withShiftOnly)
		return false;
		    var level = Luwrain.player.getVolume();
	    if (level > 5)
		level -= 5; else
		    level = 0;
	    Luwrain.message("Громкость " + level);
	    Luwrain.player.setVolume(level);
	    return true;
	}
	case "+":
	{
	    	    if (event.modified && !event.withShiftOnly)
		return false;
		    var level = Luwrain.player.getVolume();
	    if (level < 95)
		level += 5; else
		    level = 100;
	    Luwrain.message("Громкость " + level);
		    Luwrain.player.setVolume(level);
	    return true;
	}
	default:
	return false;
    }
    }
    if (event.special != null)
        switch(event.special)
        {
	    case "escape":
	    Luwrain.sounds.playing();
	    Luwrain.player.stop();
	    return true;
	    default:
	    return false;
	}
    switch(event.ch)
    {
	case " ":
	Luwrain.player.pauseResume();
	return true;
	case "-":
	//FIXME:streaming
	if (!event.modified)
	    Luwrain.player.jump(-5000); else
		if (event.withControlOnly)
		    	    Luwrain.player.jump(-60000); else
		if (event.withAltOnly)
	{
	    //FIXME:previous track
	} else
		return false;
	return true;
		case "=":
	//FIXME:streaming
	if (!event.modified)
	    Luwrain.player.jump(5000); else
		if (event.withControlOnly)
		    Luwrain.player.jump(60000); else
			if (event.withAltOnly)
	{
	    //FIXME:next track
	} else
		return false;
	return true;
		case "_":
	{
	    if (event.modified && !event.withShiftOnly)
		return false;
		    var level = Luwrain.player.getVolume();
	    if (level > 5)
		Luwrain.player.setVolume(level - 5); else
		    Luwrain.player.setVolume(0);
	    return true;
	}
	case "+":
	{
	    	    if (event.modified && !event.withShiftOnly)
		return false;
		    var level = Luwrain.player.getVolume();
	    if (level < 95)
		Luwrain.player.setVolume(level + 5); else
		    Luwrain.player.setVolume(100);
	    return true;
	}
	default:
	return false;
    }
}

Luwrain.addHook("luwrain.app.player.areas.albums.input", function(event, album){
    return commonKeys(event);
});
Luwrain.addHook("luwrain.app.player.areas.playlist.input", function(event, track){
    return commonKeys(event);
});
Luwrain.addHook("luwrain.app.player.areas.control.input", function(event){
    return commonKeys(event);
});

Luwrain.addCommand("player-pause", function(){
    var streaming = false;
    var flags = Luwrain.player.flags;
    for(var i = 0;i < flags.length;i++)
	if (flags[i] === "streaming")
	    streaming = true;
    if (streaming)
	Luwrain.sounds.playing();
    Luwrain.player.pauseResume();
});

Luwrain.addCommand("player-stop", function(){
    if (Luwrain.player.state === "stopped")
	return;
    Luwrain.sounds.playing();
    Luwrain.player.stop();
});

Luwrain.addCommand("player-jump-forward", function(){
    Luwrain.player.jump(5000);
});

Luwrain.addCommand("player-jump-backward", function(){
    Luwrain.player.jump(-5000);
});

Luwrain.addCommand("player-volume-toggle", function(){
    var level = Luwrain.player.getVolume();
    if (level > 75)
	Luwrain.player.setVolume(75); else
	    Luwrain.player.setVolume(100);
});
