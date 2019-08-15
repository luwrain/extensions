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

var MAX_LINE_LEN = 60;

/*
 * Makes word wrapping on long lines during message editing. This hook
 * checks that the state of the edit control not modified by other hooks
 * and inserts new line with the rest of the line which exceeds
 * MAX_LINE_LEN.
 */
Luwrain.addHook("luwrain.message.edit.insert.chars.post", function(args){
    if (args.chars != ' ')
	return;
    if (args.y != args.hotPoint.y || args.x > args.hotPoint.x)
	return;
    var lines = args.lines;
    var index = args.hotPoint.y;
    var line = lines[index];
    if (args.x >= line.length || args.hotPoint.x > line.length)
	return;
    if (line.length <= MAX_LINE_LEN || args.x <= MAX_LINE_LEN)
	return;
    var pos = -1;
    //Looking for the latest space prior to MAX_LINE_LEN
    for(var i = 0;i < MAX_LINE_LEN;i++)
	if (line[i] == ' ')
	    pos = i;
    //Or the first space after MAX_LINE_LEN
    if (pos < 0)
	for(var i = MAX_LINE_LEN;i < args.x;i++)
	    if (line[i] == ' ')
    {
	pos = i;
	break;
    }
    if (pos < 0)
	return;
    //Cutting the current line on pos with  removing trailing spaces
    var line1 = line.substring(0, pos);
    var cutPos = pos - 1;
    while (cutPos >= 0 && line1[cutPos] == ' ')
	cutPos--;
    line1 = line1.substring(0, cutPos + 1);
    //Skipping all spaces on split point at the beginning of the next line
    cutPos = pos;
    while(cutPos < args.x && line[cutPos] == ' ')
	cutPos++;
    lines.insert(index + 1, line.substring(cutPos));
    args.hotPoint.x -= cutPos;
    args.hotPoint.y++;
    lines[index] = line1;
});
