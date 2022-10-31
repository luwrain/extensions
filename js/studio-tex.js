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

//FIXME: предлог "с" над

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

        if (!!lineUpper.match(/ --- $/)) {
	    area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 5) + "~" + lineBefore.substring(lineBefore.length - 4) + lineAfter;
	return;
    }


    if (lineUpper.endsWith(" ЖЕ ") ||
	lineUpper.endsWith(" БЫ ") ||
	lineUpper.endsWith(" ЛИ ")) {
	area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 4) + "~" + lineBefore.substring(lineBefore.length - 3) + lineAfter;
	return;
    }

    if (lineUpper.match(/[ ~](A|AN|AT|FROM|FOR|IN|OF|ON|OUR|THAT|THE|THIS|TO|WITH) $/) ||
	lineUpper.match(/[ ~](БЕЗ|В|ВЕСЬ|ВО|ВСЕМ|ВСЕХ|ВСЯ|ДЛЯ|ЕГО|ЕЕ|ЕЁ|ЗА|ИЗ|ИХ|К|НА|НЕ|НИ|О|ОБ|ОТ|ПО|ПРИ|ПО|ПРО|С|СО|ТАК|У|ЭТИХ|ЭТОТ) $/)) {
	area.lines[lineIndex] = lineBefore.substring(0, lineBefore.length - 1) + "~" + lineAfter;
	return;
    }
});
