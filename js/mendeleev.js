
var MSG_EMPTY_CELL = "Элемент отсутствует";
var MSG_MASS = "Атомная масса: ";
var MSG_LATIN = "латинское название: ";
var MSG_NUMBER = "Элемент ";
var MSG_GROUP = "Группа ";
var MSG_PERIOD = "Период ";
var MSG_ROW = "Ряд ";
var MSG_LANTANOIDS = "Лантаноиды";
var MSG_ACTINOIDS = "Актиноиды";
var MSG_OR = " или ";

var TABLE = [
    //First row
    [
	{num: 1, name: "Водород", id: "H", latin: "Hydrogenium", period: 1, row: 1, group: 1, mass: 1.00794},
	null,
	null,
	null,
	null,
	null,
	null,
	{num: 2, name: "Гелий", id: "He", latin: "Helium", period: 1, row: 1, group: 18, mass: 4.002602},
    ],

    //Second row
    [
	{num: 3, name: "Литий", id: "Li", latin: "Lithium", period: 2, row: 2, group: 1, mass: 6.941},
	{num: 4, name: "Бериллий", id: "Be", latin: "Beryllium", period: 2, row: 2, group: 2, mass: 9.012182},
	{num: 5, name: "Бор", id: "B", latin: "Borum", period: 2, row: 2, group: 13, mass: 10.811},
	{num: 6, name: "Углерод", id: "C", latin: "Carboneum", period: 2, row: 2, group: 14, mass: 12.0107},
	{num: 7, name: "Азот", id: "N", latin: "Nitrogenium", period: 2, row: 2, group: 15, mass: 14.0067},
	{num: 8, name: "Кислород", id: "O", latin: "Oxygenium", period: 2, row: 2, group: 16, mass: 15.9994},
	{num: 9, name: "Фтор", id: "F", latin: "Fluorum", period: 2, row: 2, group: 17, mass: 18.9984032},
	{num: 10, name: "Неон", id: "Ne", latin: "Neon", period: 2, row: 2, group: 18, mass: 20.1797},
    ],

    //Third row
    [
	{num: 11, name: "Натрий", id: "Na", latin: "Natrium", period: 3, row: 3, group: 1, mass: 22.98976928},
	{num: 12, name: "Магний", id: "Mg", latin: "Magnesium", period: 3, row: 3, group: 2, mass: 24.3050},
	{num: 13, name: "Алюминий", id: "Al", latin: "Aluminium", period: 3, row: 3, group: 13, mass: 26.9815386},
	{num: 14, name: "Кремний", id: "Si", latin: "Silicium", period: 3, row: 3, group: 14, mass: 28.0855},
	{num: 15, name: "Фосфор", id: "P", latin: "Phosphorus", period: 3, row: 3, group: 15, mass: 30.973762},
	{num: 16, name: "Сера", id: "S", latin: "Sulfur,Sulphur", period: 3, row: 3, group: 16, mass: 32.065},
	{num: 17, name: "Хлор", id: "Cl", latin: "Chlorum", period: 3, row: 3, group: 17, mass: 35.453},
	{num: 18, name: "Аргон", id: "Ar", latin: "Argon", period: 3, row: 3, group: 18, mass: 39.948},
    ],

    //Forth row
    [
	{num: 19, name: "Калий", id: "K", latin: "Kalium,Calium", period: 4, row: 4, group: 1, mass: 39.0983},
	{num: 20, name: "Кальций", id: "Ca", latin: "Calcium", period: 4, row: 4, group: 2, mass: 40.078},
	{num: 21, name: "Скандий", id: "Sc", latin: "Scandium", period: 4, row: 4, group: 3, mass: 44.955912},
	{num: 22, name: "Титан", id: "Ti", latin: "Titanium", period: 4, row: 4, group: 4, mass: 47.867},
	{num: 23, name: "Ванадий", id: "V", latin: "Vanadium", period: 4, row: 4, group: 5, mass: 50.9415},
	{num: 24, name: "Хром", id: "Cr", latin: "Chromium", period: 4, row: 4, group: 6, mass: 51.9961},
	{num: 25, name: "Марганец", id: "Mn", latin: "Manganum,Manganesium", period: 4, row: 4, group: 7, mass: 54.938045},
	{num: 26, name: "Железо", id: "Fe", latin: "Ferrum", period: 4, row: 4, group: 8, mass: 55.845},
	{num: 27, name: "Кобальт", id: "Co", latin: "Cobaltum", period: 4, row: 4, group: 9, mass: 58.933195},
	{num: 28, name: "Никель", id: "Ni", latin: "Niccolum", period: 4, row: 4, group: 10, mass: 58.6934},
    ],

    //Fifth row
    [
	{num: 29, name: "Медь", id: "Cu", latin: "Cuprum", period: 4, row: 5, group: 11, mass: 63.546},
	{num: 30, name: "Цинк", id: "Zn", latin: "Zincum", period: 4, row: 5, group: 12, mass: 65.409},
	{num: 31, name: "Галлий", id: "Ga", latin: "Gallium", period: 4, row: 5, group: 13, mass: 69.723},
	{num: 32, name: "Германий", id: "Ge", latin: "Germanium", period: 4, row: 5, group: 14, mass: 72.64},
	{num: 33, name: "Мышьяк", id: "As", latin: "Arsenicum", period: 4, row: 5, group: 15, mass: 74.92160},
	{num: 34, name: "Селен", id: "Se", latin: "Selenium", period: 4, row: 5, group: 16, mass: 78.96},
	{num: 35, name: "Бром", id: "Br", latin: "Bromum", period: 4, row: 5, group: 17, mass: 79.904},
	{num: 36, name: "Криптон", id: "Kr", latin: "Krypton,Crypton", period: 4, row: 5, group: 18, mass: 83.798},
    ],

    //Sixth row
    [
	{num: 37, name: "Рубидий", id: "Rb", latin: "Rubidium", period: 5, row: 6, group: 1, mass: 85.4678},
	{num: 38, name: "Стронций", id: "Sr", latin: "Strontium", period: 5, row: 6, group: 2, mass: 87.62},
	{num: 39, name: "Иттрий", id: "Y", latin: "Yttrium", period: 5, row: 6, group: 3, mass: 88.90585},
	{num: 40, name: "Цирконий", id: "Zr", latin: "Zirconium", period: 5, row: 6, group: 4, mass: 91.224},
	{num: 41, name: "Ниобий", id: "Nb", latin: "Niobium", period: 5, row: 6, group: 5, mass: 92.90638},
	{num: 42, name: "Молибден", id: "Mo", latin: "Molybdaenum", period: 5, row: 6, group: 6, mass: 95.94},
	{num: 43, name: "Технеций", id: "Tc", latin: "Technetium", period: 5, row: 6, group: 7, mass: 98.9063},
	{num: 44, name: "Рутений", id: "Ru", latin: "Ruthenium", period: 5, row: 6, group: 8, mass: 101.07},
	{num: 45, name: "Родий", id: "Rh", latin: "Rhodium", period: 5, row: 6, group: 9, mass: 102.90550},
	{num: 46, name: "Палладий", id: "Pd", latin: "Palladium", period: 5, row: 6, group: 10, mass: 106.42},
    ],

    //Seventh row
    [
	{num: 47, name: "Серебро", id: "Ag", latin: "Argentum", period: 5, row: 7, group: 11, mass: 107.8682},
	{num: 48, name: "Кадмий", id: "Cd", latin: "Cadmium", period: 5, row: 7, group: 12, mass: 112.411},
	{num: 49, name: "Индий", id: "In", latin: "Indium", period: 5, row: 7, group: 13, mass: 114.818},
	{num: 50, name: "Олово", id: "Sn", latin: "Stannum", period: 5, row: 7, group: 14, mass: 118.710},
	{num: 51, name: "Сурьма", id: "Sb", latin: "Stibium", period: 5, row: 7, group: 15, mass: 121.760},
	{num: 52, name: "Теллур", id: "Te", latin: "Tellurium", period: 5, row: 7, group: 16, mass: 127.60},
	{num: 53, name: "Иод", id: "I", latin: "Iodium,Jodium", period: 5, row: 7, group: 17, mass: 126.90447},
	{num: 54, name: "Ксенон", id: "Xe", latin: "Xenon", period: 5, row: 7, group: 18, mass: 131.293},
    ],

    //Eighth row
    [
	{num: 55, name: "Цезий", id: "Cs", latin: "Caesium", period: 6, row: 8, group: 1, mass: 132.9054519},
	{num: 56, name: "Барий", id: "Ba", latin: "Barium", period: 6, row: 8, group: 2, mass: 137.327},
	{num: 72, name: "Гафний", id: "Hf", latin: "Hafnium", period: 6, row: 8, group: 4, mass: 178.49},
	{num: 73, name: "Тантал", id: "Ta", latin: "Tantalum", period: 6, row: 8, group: 5, mass: 180.9479},
	{num: 74, name: "Вольфрам", id: "W", latin: "Wolframium", period: 6, row: 8, group: 6, mass: 183.84},
	{num: 75, name: "Рений", id: "Re", latin: "Rhenium", period: 6, row: 8, group: 7, mass: 186.207},
	{num: 76, name: "Осмий", id: "Os", latin: "Osmium", period: 6, row: 8, group: 8, mass: 190.23},
	{num: 77, name: "Иридий", id: "Ir", latin: "Iridium", period: 6, row: 8, group: 9, mass: 192.217},
	{num: 78, name: "Платина", id: "Pt", latin: "Platinum", period: 6, row: 8, group: 10, mass: 195.084},
    ],

    //Ninth row
    [
	{num: 79, name: "Золото", id: "Au", latin: "Aurum", period: 6, row: 9, group: 11, mass: 196.966569},
	{num: 80, name: "Ртуть", id: "Hg", latin: "Hydrargyrum", period: 6, row: 9, group: 12, mass: 200.59},
	{num: 81, name: "Таллий", id: "Tl", latin: "Thallium", period: 6, row: 9, group: 13, mass: 204.3833},
	{num: 82, name: "Свинец", id: "Pb", latin: "Plumbum", period: 6, row: 9, group: 14, mass: 207.2},
	{num: 83, name: "Висмут", id: "Bi", latin: "Bismuthum", period: 6, row: 9, group: 15, mass: 208.98040},
	{num: 84, name: "Полоний", id: "Po", latin: "Polonium", period: 6, row: 9, group: 16, mass: 208.9824},
	{num: 85, name: "Астат", id: "At", latin: "Astatum", period: 6, row: 9, group: 17, mass: 209.9871},
	{num: 86, name: "Радон", id: "Rn", latin: "Radon", period: 6, row: 9, group: 18, mass: 222.0176},
    ],

    //Tenth row
    [
	{num: 87, name: "Франций", id: "Fr", latin: "Francium", period: 7, row: 10, group: 1, mass: 223.0197},
	{num: 88, name: "Радий", id: "Ra", latin: "Radium", period: 7, row: 10, group: 2, mass: 226.0254},
	{num: 104, name: "Резерфордий", id: "Rf", latin: "Rutherfordium", period: 7, row: 10, group: 4, mass: 267},
	{num: 105, name: "Дубний", id: "Db", latin: "Dubnium", period: 7, row: 10, group: 5, mass: 268},
	{num: 106, name: "Сиборгий", id: "Sg", latin: "Seaborgium", period: 7, row: 10, group: 6, mass: 269},
	{num: 107, name: "Борий", id: "Bh", latin: "Bohrium", period: 7, row: 10, group: 7, mass: 270},
	{num: 108, name: "Хассий", id: "Hs", latin: "Hassium", period: 7, row: 10, group: 8, mass: 277},
	{num: 109, name: "Мейтнерий", id: "Mt", latin: "Meitnerium", period: 7, row: 10, group: 9, mass: 278},
	{num: 110, name: "Дармштадтий", id: "Ds", latin: "Darmstadtium", period: 7, row: 10, group: 10, mass: 281},
    ],
];

function makeLine(index)
{
    var res = "";
    if (TABLE[index][0] != null)
    {
	var id = TABLE[index][0].id;
	res = id;
	if (id.length < 2)
	    res += " ";
    } else
	res = "  ";
    for(var i = 1;i < TABLE[index].length;i++)
    {
	res += " ";
	if (TABLE[index][i] != null)
	{
	    var id = TABLE[index][i].id;
	    res += id;
	    if (id.length < 2)
		res += " ";
	} else
	    res += "  ";
    }
    return res;
}

function MendeleevApp()
{
    this.name = "Периодическая таблица химических элементов";
    this.type = "simple-centered";
    this.lines = [];
    for(var i = 0;i < TABLE.length;i++)
	this.lines.push(makeLine(i));
    this.lines.push("");
    this.lines.push(MSG_LANTANOIDS);
    this.lines.push("");//FIXME:
    this.lines.push("");
    this.lines.push(MSG_ACTINOIDS);
    this.lines.push("");//FIXME:
    this.lines.push("");
    this.lines.push("");
    this.lines.push("");
    this.hotPointX = 0;
    this.hotPointY = 0;
    this.x = 0;
    this.y = 0;
    this.onInputEvent = function(event)
    {
	switch(event)
	{
	    case " ":
	    if (TABLE[this.y][this.x] == null)
		return false;
	    {
		var id = TABLE[this.y][this.x].id;
		var spoken = "";
		if (id.length == 1)
		    spoken = id[0]; else
			spoken = id[0] + " " + id[1];
		Luwrain.message(spoken +", " +
				MSG_LATIN + TABLE[this.y][this.x].latin.replaceAll(",", MSG_OR));
	    }
	    return true;
	    case "1":
	    	    if (TABLE[this.y][this.x] == null)
			return false;
	    Luwrain.message(MSG_NUMBER + TABLE[this.y][this.x].num);
	    return true;

	    	    case "2":
	    	    if (TABLE[this.y][this.x] == null)
			return false;
	    Luwrain.message(MSG_GROUP + TABLE[this.y][this.x].group);
	    return true;

	    	    	    case "3":
	    	    if (TABLE[this.y][this.x] == null)
			return false;
	    Luwrain.message(MSG_PERIOD + TABLE[this.y][this.x].period);
	    return true;

	    	    	    	    case "4":
	    	    if (TABLE[this.y][this.x] == null)
			return false;
	    Luwrain.message(MSG_ROW + TABLE[this.y][this.x].row);
	    return true;

	    	    	    	    	    case "5":
	    	    if (TABLE[this.y][this.x] == null)
			return false;
	    Luwrain.message(MSG_MASS + TABLE[this.y][this.x].mass);
	    return true;




	    
	    case "ENTER":
	    if (TABLE[this.y][this.x] == null)
		return false;
	    //FIXME:wikipedia
	    return true;
	    case "ARROW_LEFT":
	    if (this.x == 0)
		return false;
	    this.x--;
	    break;
	    case "ARROW_RIGHT":
	    if (this.x + 1 >= TABLE[this.y].length)
		return false;
	    this.x++;
	    break;
	    case "ARROW_UP":
	    if (this.y == 0)
		return false;
	    this.y--;
	    break;
	    case "ARROW_DOWN":
	    if (this.y + 1 >= TABLE.length)
		return false;
	    this.y++;
	    break;
	    default:
	    return false;
	}
		    this.updateHotPoint();
	    if (TABLE[this.y][this.x] != null)
		Luwrain.message(TABLE[this.y][this.x].name); else
		    Luwrain.message(MSG_EMPTY_CELL);
	    return true;
    };

    this.updateHotPoint = function()
    {
	this.hotPointX = this.x * 3;
	this.hotPointY = this.y;
	if (TABLE[this.y][this.x] == null)
	{
	    this.lines[this.lines.length - 2] = "";
	    this.lines[this.lines.length - 1] = "";
	    return;
	}
	var item = TABLE[this.y][this.x];
	this.lines[this.lines.length - 2] = item.id + ", " + item.latin.replaceAll(",", MSG_OR);
	this.lines[this.lines.length - 1] = ("" + item.num + ", "+
	    MSG_GROUP + item.group + ", " +
	    MSG_PERIOD + item.period + ", " +
	    MSG_ROW + item.row + ", " +
					     MSG_MASS + item.mass).toLowerCase();
    }
}

Luwrain.addApp("edu-mendeleev",  MendeleevApp);
Luwrain.addCommand("edu-mendeleev", function(){Luwrain.launchApp("edu-mendeleev");});
