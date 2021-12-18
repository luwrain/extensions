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

Luwrain.log.debug("proba", "loading");
Luwrain.addHook("luwrain.studio.tex.insert.chars.post", (area)=>{
    if (area.chars != " " || area.hotPoint.y >= area.lines.length)
	return;
    const lineIndex = area.hotPoint.y;
    const x = area.hotPoint.x;
    const line = area.lines[lineIndex];
    const lineBefore = line.substring(0, x);
    const lineAfter = line.substring(x);
    const lineUpper = lineBefore.toUpperCase();
    if (!lineUpper.endsWith(" В "))
	return;
    area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 1) + "~" + lineAfter;
});
