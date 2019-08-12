

//FIXME:ctrl+alt+end разбить длинные строки

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





