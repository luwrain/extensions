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

Luwrain.createPropertyHook("luwrain.player.track.index", "luwrain.prop.player.track.index");
Luwrain.addHook("luwrain.prop.player.track.index", function(propName, propValue){
    Luwrain.sounds.playing();
});

function isStreaming()
{
    var flags = Luwrain.player.flags;
    for(var i = 0;i < flags.length;i++)
	if (flags[i] === "streaming")
	    return true;
    return false;
}

Luwrain.addCommand("player-pause", function(){
    if (Luwrain.player.state === "stopped")
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    if (isStreaming())
	Luwrain.sounds.playing();
    Luwrain.player.pauseResume();
});

Luwrain.addCommand("player-stop", function(){
    if (Luwrain.player.state === "stopped")
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    Luwrain.sounds.playing();
    Luwrain.player.stop();
});

Luwrain.addCommand("player-next", function(){
    if (Luwrain.player.state === "stopped" || isStreaming())
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    if (!Luwrain.player.nextTrack())
	Luwrain.sounds.eventNotProcessed();
});

Luwrain.addCommand("player-prev", function(){
    if (Luwrain.player.state === "stopped" || isStreaming())
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    if (!Luwrain.player.prevTrack())
	Luwrain.sounds.eventNotProcessed();
});

Luwrain.addCommand("player-jump-forward", function(){
    if (Luwrain.player.state === "stopped" || isStreaming())
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    Luwrain.player.jump(5000);
});

Luwrain.addCommand("player-jump-backward", function(){
    if (Luwrain.player.state === "stopped" || isStreaming())
    {
	Luwrain.sounds.eventNotProcessed();
	return;
    }
    Luwrain.player.jump(-5000);
});

Luwrain.addCommand("player-volume-toggle", function(){
    var level = Luwrain.player.getVolume();
    if (level > 75)
	Luwrain.player.setVolume(75); else
	    Luwrain.player.setVolume(100);
});
