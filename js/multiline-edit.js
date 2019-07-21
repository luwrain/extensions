

//FIXME:ctrl+alt+end разбить длинные строки 

Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    if (!event.withAltOnly || event.special != "end")
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

Luwrain.addHook("luwrain.edit.multiline.input", function(event, args){
    print("second");
    if (!event.withShiftOnly || event.special != "end")
	return false;
    Luwrain.sounds.ok();
    return true;
});

