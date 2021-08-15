/*
   Copyright 2020 Deniz Sincar <dsincar29@gmail.com>
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

var UPPER_PLUS = java.lang.String.format('%c', 8314);
var UPPER_MINUS = java.lang.String.format('%c', 8315);
var UPPER_2 = java.lang.String.format('%c', 178);
var UPPER_3 = java.lang.String.format('%c', 179);
var LOWER_2 = java.lang.String.format('%c', 8322);
var LOWER_3 = java.lang.String.format('%c', 8323);
var LOWER_4 = java.lang.String.format('%c', 8324);

var TOP_LINE = [
    'OH' + UPPER_MINUS,
    'F' + UPPER_MINUS,
    'Cl' + UPPER_MINUS,
    'Br' + UPPER_MINUS,
    'I' + UPPER_MINUS,
    'S' + UPPER_2 + UPPER_MINUS,
    'NO' + LOWER_3 + UPPER_MINUS,
    'CO' + LOWER_3 + UPPER_2 + UPPER_MINUS,
    'SiO' + LOWER_3 + UPPER_2 + UPPER_MINUS,
    'SO' + LOWER_4 + UPPER_2 + UPPER_MINUS,
    'PO' + LOWER_4 + UPPER_3 + UPPER_MINUS,
    'SO' + LOWER_3 + UPPER_2 + UPPER_MINUS,
    'CH' + LOWER_3 + 'COO' + UPPER_MINUS
];

var TOP_NAMES = [
// везде где есть буква о, ставим после о твёрдый знак, так как он будет проговаривать эту о безударной как предлог: о ком, о чём
    'оъ аш минус',
    'фтор минус',
    'хлор минус',
    'бром минус',
    'йод минус',
    'эс два минус',
    'эн оъ три минус',
    'цэ оъ три два минус',
    'силициум ъо три два минус',
    'эс ъо четыре два минус',
    'пэ ъо четыре три минус',
    'эс оъ три два минус',
    'цэ аш три цэ оъ, оъ минус'
];

var LEFT_LINE = [
    'H' + UPPER_PLUS,
    'Na' + UPPER_PLUS,
    'K' + UPPER_PLUS,
    'NH' + LOWER_4 + UPPER_PLUS,
    'Mg' + UPPER_2 + UPPER_PLUS,
    'Ca' + UPPER_2 + UPPER_PLUS,
    'Sr' + UPPER_2 + UPPER_PLUS,
    'Ba' + UPPER_2 + UPPER_PLUS,
    'Sn' + UPPER_2 + UPPER_PLUS,
    'Pb' + UPPER_2 + UPPER_PLUS,
    'Al' + UPPER_3 + UPPER_PLUS,
    'Cr' + UPPER_3 + UPPER_PLUS,
    'Mn' + UPPER_2 + UPPER_PLUS,
    'Fe' + UPPER_2 + UPPER_PLUS,
    'Fe' + UPPER_3 + UPPER_PLUS,
    'Co' + UPPER_2 + UPPER_PLUS,
    'Ni' + UPPER_2 + UPPER_PLUS,
    'Cu' + UPPER_2 + UPPER_PLUS,
    'Zn' + UPPER_2 + UPPER_PLUS,
    'Cd' + UPPER_2 + UPPER_PLUS,
    'Hg' + UPPER_2 + UPPER_PLUS,
    'Hg' + LOWER_2 + UPPER_2 + UPPER_PLUS,
    'Ag' + UPPER_PLUS,
];

var LEFT_NAMES = [
    'аш плюс',
'натрий плюс',
'калий плюс',
'эн аш четыре плюс',
'магний два плюс',
'кальций два плюс',
'стронций два плюс',
'барий два плюс',
'станнум два плюс',
'плюмбум два плюс',
'алюминий три плюс',
'хром три плюс',
'марганец два плюс',
'феррум два плюс',
'феррум три плюс',
'кобальт три плюс',
'никель два плюс',
'купрум два плюс',
'цинк два плюс',
'кадмий два плюс',
'ртуть два плюс',
'ртуть два два плюс',
'аргентум плюс'
];

var TABLE = [
    ['Рль', 'Р', 'Р', 'Р', 'Р', 'М', 'Р', '-', 'Н', 'Р', 'Р', 'Р', 'Р'],
    ['Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р'],
    ['Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р'],
    ['Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р', 'Р'],
    ['Н', 'РК', 'Р', 'Р', 'Р', 'М', 'Р', 'Н', 'РК', 'Р', 'РК', 'М', 'Р'],
    ['М', 'НК', 'Р', 'Р', 'Р', 'М', 'Р', 'Н', 'РК', 'М', 'РК', 'М', 'Р'],
    ['М', 'НК', 'Р', 'Р', 'Р', 'Р', 'Р', 'Н', 'РК', 'РК', 'РК', '-', 'Р'],
    ['Р', 'РК', 'Р', 'Р', 'Р', 'Р', 'Р', 'Н', 'РК', 'НК', 'РК', 'М', 'Р'],
    ['Н', 'Р', 'Р', 'Р', 'М', 'РК', 'Р', 'Н', 'Н', 'Р', 'Н', '-', 'Р'],
    ['Н', 'Н', 'М', 'М', 'М', 'РК', 'Р', 'Н', 'Н', 'Н', 'Н', 'Н', 'Р'],
    ['Н', 'М', 'Р', 'Р', 'Р', 'Г', 'Р', 'Г', 'НК', 'Р', 'РК', '-', 'Р'],
    ['Н', 'Р', 'Р', 'Р', 'Р', 'Г', 'Р', 'Г', 'Н', 'Р', 'РК', '-', 'Р'],
    ['Н', 'Р', 'Р', 'Р', 'Р', 'Н', 'Р', 'Н', 'Н', 'Р', 'Н', 'Н', 'Р'],
    ['Н', 'М', 'Р', 'Р', 'Р', 'Н', 'Р', 'Н', 'Н', 'Р', 'Н', 'М', 'Р'],
    ['Н', 'Р', 'Р', 'Р', '-', '-', 'Р', 'Г', 'Н', 'Р', 'РК', '-', 'Р'],
    ['Н', 'М', 'Р', 'Р', 'Р', 'Н', 'Р', 'Н', 'Н', 'Р', 'Н', 'Н', 'Р'],
    ['Н', 'М', 'Р', 'Р', 'Р', 'РК', 'Р', 'Н', 'Н', 'Р', 'Н', 'Н', 'Р'],
    ['Н', 'М', 'Р', 'Р', '-', 'Н', 'Р', 'Г', 'Н', 'Р', 'Н', '-', 'Р'],
    ['Н', 'М', 'Р', 'Р', 'Р', 'РК', 'Р', 'Н', 'Н', 'Р', 'Н', 'М', 'Р'],
    ['Н', 'Р', 'Р', 'Р', 'Р', 'РК', 'Р', 'Н', 'Н', 'Р', 'Н', 'Н', 'Р'],
    ['Н', 'Р', 'Р', 'М', 'НК', 'НК', 'Р', 'Н', 'Н', 'Р', 'Н', '-', 'Р'],
    ['Н', 'Р', 'НК', 'НК', 'НК', 'РК', 'Р', 'Н', 'Н', 'М', 'Н', '-', 'М'],
    ['Н', 'Р', 'НК', 'НК', 'НК', 'НК', 'Р', 'Н', 'Н', 'М', 'Н', 'М', 'Р'],
];

function constructMessage(x, y)
{
// отказываемся от предлога и, ставим запятую. так лучше говорилка прочитает
// пусть катионы будут первыми, потом анионы.
//не удобно читать так: эн о три минус, и натрий плюс. лучше натрий плюс, эн о 3 минус
    var prefix = LEFT_NAMES[y] + ', ' + TOP_NAMES[x];
    var value = TABLE[y][x];
    switch(value)
    {
	case '-':
		return prefix + ' соединения не существует';
	case 'Р':
	return prefix + ' растворим';

		case 'М':
	return prefix + ' малорастворим';

			case 'Н':
	return prefix + ' не растворим';

				case 'РК':
	return prefix + ' не растворим в воде, но растворим в сильных неорганических кислотах';

					case 'НК':
	return prefix + ' не растворим ни в воде, ни в кислотах';

						case 'НГ':
	return prefix + ' полностью гидролизуется';
case 'Рль':
return prefix+ ' вода- растворитель'




	
	default:
	return value;
    }
}

function calcCellWidth()
{
    var res = 0;
    for(var i in TOP_LINE)
	if (TOP_LINE[i].length > res)
	    res = TOP_LINE[i].length;
    for(var i in LEFT_LINE)
	if (LEFT_LINE[i].length > res)
	    res = LEFT_LINE[i].length;
    return res;
}

function makeLine(firstItem, items, cellWidth)
{
    var res = firstItem;
    while(res.length < cellWidth)
	res += ' ';
        for(var i in items)
    {
	var n = items[i];
	while(n.length < cellWidth)
	    n += ' ';
	res += n;
    }
    return res;
}

function SolubilityApp(args)
{
    this.name = "Таблица растворимости";
    this.type = "simple-centered";
    this.cellWidth = calcCellWidth();
    this.lines = [makeLine("", TOP_LINE, this.cellWidth)];
    for(var i = 0;i < TABLE.length;i++)
	this.lines.push(makeLine(LEFT_LINE[i], TABLE[i], this.cellWidth));
    this.hotPointX = 0;
    this.hotPointY = 0;
    this.x = 0;
    this.y = 0;

    this.onSystemEvent = function(event)
    {
	switch(event.code)
	{
		    case 'help':
	    Luwrain.launchApp("reader", ['http://wiki.luwrain.org/wiki/index.php/%D0%A0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F_%D0%BF%D0%BE_%D1%85%D0%B8%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9_%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B5_%D1%80%D0%B0%D1%81%D1%82%D0%B2%D0%BE%D1%80%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8']);
	    return true;
	    default:
	    return false;
	}
    };

    
    this.onInputEvent = function(event)
    {
	if (event.special == null)
	    return false;
	switch(event.special)
	{
	    case "arrow_left":
	        case "alternative_arrow_left":
	    if (this.x == 0)
		return false;
	    this.x--;
	    break;
	    case "arrow_right":
	    	    case "alternative_arrow_right":
	    if (this.x + 1 >= TABLE[this.y].length)
		return false;
	    this.x++;
	    break;
	    case "arrow_up":
	    	    case "alternative_arrow_up":
	    if (this.y == 0)
		return false;
	    this.y--;
	    break;
	    case "arrow_down":
	    	    case "alternative_arrow_down":
	    if (this.y + 1 >= TABLE.length)
		return false;
	    this.y++;
	    break;
	    default:
	    return false;
	}
	this.updateHotPoint();
	if (event.special.startsWith("alternative_"))
	    switch(event.special)
	    {
		case "alternative_arrow_left":
		case "alternative_arrow_right":
		Luwrain.sounds.ok();
		Luwrain.speak('анион ' + TOP_NAMES[this.x]);
		return true;
				case "alternative_arrow_up":
		case "alternative_arrow_down":
		Luwrain.sounds.ok();
		Luwrain.speak('катион ' + LEFT_NAMES[this.y]);
		return true;
		default:
		return false;
	    }
	Luwrain.sounds.ok();
			Luwrain.speak(constructMessage(this.x, this.y));
	    return true;
    };

    this.updateHotPoint = function()
    {
	this.hotPointX = (this.x + 1) * this.cellWidth;
	this.hotPointY = this.y + 1;
    }
    this.updateHotPoint();
}

Luwrain.addApp("edu-chemistry-solubility",  SolubilityApp);
Luwrain.addCommand("edu-chemistry-solubility", function(){Luwrain.launchApp("edu-chemistry-solubility", []);});
