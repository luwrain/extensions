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

//FIXME: Shift+end - wrap the words on the line

function replaceText(lines, region, func)
{
    if (region.fromX < 0 || region.fromY < 0 ||
	region.toX < 0 || region.toY < 0)
	return false;
    //print("region proba " + region.fromX + "," + region.fromY + "," + region.toX + "," + region.toY);
    if (region.fromY == region.toY)
    {
	var y = region.fromY;
	var line = lines[y];
	line = line.substring(0, region.fromX) + func(line.substring(region.fromX, region.toX)) + line.substring(region.toX);
	lines[y] = line;
	return true;
    }
    return false;
}

//alt+nd: Finds the first spacing character on the line which doesn't have any non-spacing characters after
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAltOnly || event.special != "end")
	return false;
    var lines = args.lines;
    if (lines.length == 0)
    {
	Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n.static.EmptyLine);
	return true;
    }
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (line.length == 0)
    {
		Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n.static.EmptyLine);
	return true;
    }
    for(var i = line.length - 1;i >= 0;i--)
	if (line[i] != ' ')
    {
	hotPoint.x = i + 1;
	Luwrain.sounds.ok();
	if (i + 1 < line.length)
	    Luwrain.speak('' + line.length - i - 1 + " пробелов до конца строки"); else //FIXME:
		Luwrain.speak(Luwrain.i18n.static.EndOfLine);
	return true;
    }
    hotPoint.x = 0;
    	Luwrain.sounds.ok();
	    Luwrain.speak('' + line.length + " пробелов до конца строки");//FIXME:
    return true;
    });


//Cleaning the line ending: Ctrl+Alt+End
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAlt || !event.withControl || event.withShift ||
	event.special != "end")
	return false;
    var lines = args.lines;
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (hotPoint.x >= line.length)
	return false;
    var deleted = line.substring(hotPoint.x);
    lines[hotPoint.y] = line.substring(0, hotPoint.x);
    Luwrain.sounds.deleted();
    if (deleted != line)
	Luwrain.speak("Удалена правая часть строки : " + deleted); else //FIXME:
	    Luwrain.speak("Строка очищена"); //FIXME:
    return true;
});

Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withShiftOnly || event.special != "end")
	return false;
    Luwrain.sounds.ok();
    return true;
});

//UpperCase: Ctrl+Alt+PageUp
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAlt || !event.withControl || event.withShift ||
	event.special != "page_up")
	return false;
    if (!replaceText(args.lines, args.region, function(text){
	return text.toUpperCase();
    }))
	Luwrain.sounds.error();
    return true;
});

//UpperCase: Ctrl+Alt+PageDown
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAlt || !event.withControl || event.withShift ||
	event.special != "page_down")
	return false;
    if (!replaceText(args.lines, args.region, function(text){
	return text.toLowerCase();
    }))
	Luwrain.sounds.error();
    return true;
});
