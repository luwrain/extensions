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

Luwrain.addHook("luwrain.notepad.properties.basic", function(arg){
    var res = [];
    res.push("Имя файла: " + arg.fileName);
    res.push("Кодировка: " + arg.charset);
    res.push("Количество строк: " + arg.lines.length);

    var charCount = 0;
    var nonSpaceCharCount = 0;
    for(var i = 0;i < arg.lines.length;i++)
    {
	var line = arg.lines[i];
	charCount += line.length;
	for(var j = 0;j < line.length;j++)
	    if (!java.lang.Character.isSpace(line[j]))
		nonSpaceCharCount++;
    }
    res.push("Количество символов: " + charCount);
    res.push("Количество непробельных символов: " + nonSpaceCharCount);
    return res;
});

Luwrain.addHook("luwrain.notepad.actions", function(){
    return [
	{name: "goto-line", title: "Перейти на строку по номеру", event: {special: "f5"}},
	{name: "punc-remove-spaces-before", title: "Удалить пробелы перед знаками препинания"},
	{name: "comments-remove", title: "Удалить знаки комментария в начале строк"},
    ];
});

Luwrain.addHook("luwrain.notepad.action", function(action, args){
    if (action != "goto-line")
	return false;
    //FIXME:
    return true;
});

Luwrain.addHook("luwrain.notepad.action", function(action, args){
    if (action != "punc-remove-spaces-before")
	return false;
    //FIXME:
    return true;
});

Luwrain.addHook("luwrain.notepad.action", function(action, args){
    if (action != "comments-remove")
	return false;
    //FIXME:
    return true;
});


//Making automatic indentation in programming mode
Luwrain.addHook("luwrain.notepad.mode.programming.split.post", function(args){
    //Doing nothing, if we are on the first line (what actually must never happen)
    if (args.hotPoint.y == 0)
	return;
    var index = args.hotPoint.y;
    var prevLine = args.lines[index - 1];
    var prefix = prevLine;
    args.lines[index] = prefix + args.lines[index];
    print("kaka " + args.hotPoint.x);
    args.hotPoint.x = args.hotPoint.x + prefix.length();
    print("after " + args.hotPoint.x);
});
    

