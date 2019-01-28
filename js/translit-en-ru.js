
Luwrain.addHook("luwrain.speech.text.regular", function(text){
    var lowerText = text.toLowerCase();
    var res = "";
    var inEng = false;
    for(var i = 0;i < lowerText.length;i++)
    {
	var ch = lowerText[i];
	if (ch < 'a' || ch > 'z')
	{
	    if (ch >= 'а' && ch <= 'я')
	    inEng = false;
	    res += ch;
	    continue;
	}
	if (!inEng && !res.isEmpty())
	{
	    res += " английский язык ";
	}
	inEng = true;
	switch(ch)
	{
	    case 'a': ch2 = "а"; break;
case 'b': ch2 = "б"; break;
case 'c': ch2 = "ц"; break;
case 'd': ch2 = "д"; break;
case 'e': ch2 = "е"; break;
case 'f': ch2 = "ф"; break;
case 'g': ch2 = "г"; break;
case 'h': ch2 = "х"; break;
case 'i': ch2 = "и"; break;
case 'j': ch2 = "дж"; break;
case 'k': ch2 = "к"; break;
case 'l': ch2 = "л"; break;
case 'm': ch2 = "м"; break;
case 'n': ch2 = "н"; break;
case 'o': ch2 = "о"; break;
case 'p': ch2 = "п"; break;
case 'q': ch2 = "кв"; break;
case 'r': ch2 = "р"; break;
case 's': ch2 = "с"; break;
case 't': ch2 = "т"; break;
case 'u': ch2 = "у"; break;
case 'v': ch2 = "в"; break;
case 'w': ch2 = "в"; break;
case 'x': ch2 = "кс"; break;
case 'y': ch2 = "и"; break;
case 'z': ch2 = "з"; break;
	}
	res += ch2;
    }
    return res;
});

