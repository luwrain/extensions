/*
   Copyright 2019-2025 Michael Pozhidaev <msp@luwrain.org>

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

/*
 * Shift+Alt+Backspace: deleting previous word
 */
Luwrain.addHook("luwrain.text.input.single", (text, event)=>{
    if (event.special != "BACKSPACE" || event.withControl || !event.withAlt || !event.withShift)
	return false;
    const line = text.line;
    var pos = text.hotPoint;
    if (pos == 0)
	return false;
    if (pos > 0 && Luwrain.isLetter(line[pos]) && !Luwrain.isLetter(line[pos - 1]))
	return false; 
    pos = pos - 1;
    for(;pos >= 0;pos--) 
	if (!Luwrain.isLetter(line[pos]) && Luwrain.isLetter(line[pos + 1]))
	    break;
    if (pos < 0)
	pos = 0;
        	Luwrain.speak(line.substring(pos, text.hotPoint), Luwrain.constants.SOUND_DELETED);
    text.line = line.substring(0, pos) + line.substring(text.hotPoint, line.length)
    text.hotPoint = pos;
	return true;
});

/*
 * Ctrl+Alt+End: Deleting end of line
 */
Luwrain.addHook("luwrain.text.input.single", (text, event)=>{
     if (event.special != "END" || !event.withControl || !event.withAlt || event.withShift)
	return false;
    const line = text.line;
    const deleted = line.substring(text.hotPoint);
text.line = line.substring(0, text.hotPoint);
    Luwrain.speak(deleted, Luwrain.constants.SOUND_DELETED);
    return true;
});

//Alt+Home: Finds the first non-spacing character on the line
/*
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAltOnly || event.special != "home")
	return false;
    var lines = args.lines;
    if (lines.length == 0)
    {
	Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n().static.EmptyLine);
	return true;
    }
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (line.length == 0)
    {
	Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n().static.EmptyLine);
	return true;
    }
    for(var i = 0;i < line.length;i++)
	if (line[i] != ' ')
    {
	hotPoint.x = i;
	if (i > 0)
	    Luwrain.message('' + i + " пробелов от начала строки"); else //FIXME:
		Luwrain.message(Luwrain.i18n().static.BeginOfLine);
	return true;
    }
    hotPoint.x = line.length();
    Luwrain.message('' + line.length + " пробелов от начала строки");//FIXME:
    return true;
});
*/

//Alt+End: Finds the first spacing character on the line which doesn't have any non-spacing following characters
/*
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAltOnly || event.special != "end")
	return false;
    var lines = args.lines;
    if (lines.length == 0)
    {
	Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n().static.EmptyLine);
	return true;
    }
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (line.length == 0)
    {
	Luwrain.sounds.emptyLine();
	Luwrain.speak(Luwrain.i18n().static.EmptyLine);
	return true;
    }
    for(var i = line.length - 1;i >= 0;i--)
	if (line[i] != ' ')
    {
	hotPoint.x = i + 1;
	if (i + 1 < line.length)
	    Luwrain.message('' + line.length - i - 1 + " пробелов до конца строки"); else //FIXME:
		Luwrain.message(Luwrain.i18n().static.EndOfLine);
	return true;
    }
    hotPoint.x = 0;
    Luwrain.message('' + line.length + " пробелов до конца строки");//FIXME:
    return true;
});
*/

//Ctrl+Alt+Home: Cleaning the line beginning
/*
Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAlt || !event.withControl || event.withShift || event.special != "home")
	return false;
    var lines = args.lines;
    var hotPoint = args.hotPoint;
    var line = lines[hotPoint.y];
    if (hotPoint.x >= line.length)
	return false;
    var deleted = line.substring(0, hotPoint.x);
    lines[hotPoint.y] = line.substring(hotPoint.x);
    hotPoint.x = 0;
    Luwrain.sounds.deleted();
    Luwrain.speak(deleted);
    return true;
});
*/


//UpperCase: Ctrl+Alt+PageUp
/*
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
*/

//UpperCase: Ctrl+Alt+PageDown
/*
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
*/
