function KeyboardApp()
{
    this.name = "Тренажёр клавиатуры";
    this.type = "simple-centered";
    this.lines = ["",
		  "",
		  "Ё 1 2 3 4 5 6 7 8 9 0 - =",
		  " Й Ц У К Е Н Г Ш Щ З Х Ъ",
		  " Ф Ы В А П Р О Л Д Ж Э \\",
"   Я Ч С М И Т Ь Б Ю ."];
    this.hotPointX = 0;
    this.hotPointY = 0;



                this.onInputEvent = function(event)
    {
	if (event.length() == 1)
	    return this.highlightChar(event.toUpperCase()[0]);
	return true;
    };

    
    this.highlightChar = function(ch)
    {
	for(var i = 2;i < 6;i++)
	    for(var j = 0;j < this.lines[i].length();j++)
		if (this.lines[i][j] == ch)
	{
	    this.hotPointX = j;
	    this.hotPointY = i;
	    return true;
	}
	return false;
    };


}

Luwrain.addApp("edu-keyboard", KeyboardApp);
Luwrain.addCommand("edu-keyboard", function(){Luwrain.launchApp("edu-keyboard");});
