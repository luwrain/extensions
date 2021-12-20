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

Luwrain.addHook("luwrain.studio.tex.insert.chars.post", (area)=>{
    if (area.chars != " " || area.hotPoint.y >= area.lines.length)
	return;
    const lineIndex = area.hotPoint.y;
    const x = area.hotPoint.x;
    const line = area.lines[lineIndex];
    const lineBefore = line.substring(0, x);
    const lineAfter = line.substring(x);
    const lineUpper = lineBefore.toUpperCase();

    if (!!lineUpper.match(/Т\. [ЕК]\. $/)) {
	area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 4) + "~" + lineBefore.substring(lineBefore.length - 3) + lineAfter;
	return;
    }

    if (lineUpper.endsWith(" ЖЕ ") ||
	lineUpper.endsWith(" БЫ ") ||
	lineUpper.endsWith(" ЛИ ")) {
	area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 4) + "~" + lineBefore.substring(lineBefore.length - 3) + lineAfter;
	return;
    }
    
    if (!lineUpper.match(/[ ~](A|AT|FOR|IN|OF|ON|THE|TO) $/) &&
	!lineUpper.endsWith(" БЕЗ ") &&
	!lineUpper.endsWith(" В ") &&
	!lineUpper.endsWith(" ДЛЯ ") &&
	!lineUpper.endsWith(" ИЗ ") &&
	!lineUpper.endsWith(" К ") &&
	!lineUpper.endsWith(" НА ") &&
	!lineUpper.endsWith(" НЕ ") &&
	!lineUpper.endsWith(" НИ ") &&
	!lineUpper.endsWith(" ПО ") &&
	!lineUpper.endsWith(" О ") &&
	!lineUpper.endsWith(" ПРИ ") &&
		!lineUpper.endsWith(" ПО ") &&
	!lineUpper.endsWith(" ПРО ") &&
	!lineUpper.endsWith(" С ") &&
	!lineUpper.endsWith(" ТАК ") &&
	!lineUpper.endsWith(" У "))
	return;
    area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 1) + "~" + lineAfter;
});
