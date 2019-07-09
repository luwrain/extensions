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

Luwrain.addHook("luwrain.notepad.actions", function(){
    return [];
});

Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAlt || event.special != "arrow_right")
	return false;
    var lines = args.lines;
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (line == null || hotPoint.x >= line.length)
	return false;
    var deleted = line.substring(hotPoint.x);
    lines[hotPoint.y] = line.substring(0, hotPoint.x);
    Luwrain.sounds.deleted();
    if (deleted != line)
	Luwrain.speak("Удалена правая часть строки : " + deleted); else //FIXME:
	    Luwrain.speak("Строка очищена"); //FIXME:
    return true;
});
