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

var MAX_LINE_LEN = 10;

Luwrain.addHook("luwrain.message.edit.insert.chars.post", function(args){
    if (args.chars != ' ')
	return;
    if (args.y != args.hotPoint.y || args.x > args.hotPoint.x)
	return;
    var lines = args.lines;
    var index = args.hotPoint.y;
    var line = lines[index];
    if (args.x >= line.length || args.hotPoint.x >= line.lenght)
	return;
    if (line.length <= MAX_LINE_LEN || args.x <= MAX_LINE_LEN)
	return;
    var pos = -1;
    for(var i = 0;i < args.x;i++)
	if (line[i] == ' ')
	pos = i;
        if (pos < 0)
	return;

    lines[index] = line.substring(0, pos);
    lines.insert(index + 1, line.substring(pos));
    args.hotPoint.x -= pos;
    args.hotPOint.y++;
});
