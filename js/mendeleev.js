
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

var MAIN_TABLE_OFFSET = 9

var TABLE = [[
    {num: 1, name: "Водород", id: "H", latin: "Hydrogenium", period: 1, row: 1, group: 1, mass: 1.00794},
    null,
    null,
    null,
    null,
    null,
    null,
    {num: 2, name: "Гелий", id: "He", latin: "Helium", period: 1, row: 1, group: 8, mass: 4.002602},
],[
    {num: 3, name: "Литий", id: "Li", latin: "Lithium", period: 2, row: 2, group: 1, mass: 6.941},
    {num: 4, name: "Бериллий", id: "Be", latin: "Beryllium", period: 2, row: 2, group: 2, mass: 9.012182},
    {num: 5, name: "Бор", id: "B", latin: "Borum", period: 2, row: 2, group: 3, mass: 10.811},
    {num: 6, name: "Углерод", id: "C", latin: "Carboneum", period: 2, row: 2, group: 4, mass: 12.0107},
    {num: 7, name: "Азот", id: "N", latin: "Nitrogenium", period: 2, row: 2, group: 5, mass: 14.0067},
    {num: 8, name: "Кислород", id: "O", latin: "Oxygenium", period: 2, row: 2, group: 6, mass: 15.9994},
    {num: 9, name: "Фтор", id: "F", latin: "Fluorum", period: 2, row: 2, group: 7, mass: 18.9984032},
    {num: 10, name: "Неон", id: "Ne", latin: "Neon", period: 2, row: 2, group: 8, mass: 20.1797},
],[
    {num: 11, name: "Натрий", id: "Na", latin: "Natrium", period: 3, row: 3, group: 1, mass: 22.98976928},
    {num: 12, name: "Магний", id: "Mg", latin: "Magnesium", period: 3, row: 3, group: 2, mass: 24.3050},
    {num: 13, name: "Алюминий", id: "Al", latin: "Aluminium", period: 3, row: 3, group: 3, mass: 26.9815386},
    {num: 14, name: "Кремний", id: "Si", latin: "Silicium", period: 3, row: 3, group: 4, mass: 28.0855},
    {num: 15, name: "Фосфор", id: "P", latin: "Phosphorus", period: 3, row: 3, group: 5, mass: 30.973762},
    {num: 16, name: "Сера", id: "S", latin: "Sulfur,Sulphur", period: 3, row: 3, group: 6, mass: 32.065},
    {num: 17, name: "Хлор", id: "Cl", latin: "Chlorum", period: 3, row: 3, group: 7, mass: 35.453},
    {num: 18, name: "Аргон", id: "Ar", latin: "Argon", period: 3, row: 3, group: 8, mass: 39.948},
],[
    {num: 19, name: "Калий", id: "K", latin: "Kalium,Calium", period: 4, row: 4, group: 1, mass: 39.0983},
    {num: 20, name: "Кальций", id: "Ca", latin: "Calcium", period: 4, row: 4, group: 2, mass: 40.078},
    {num: 21, name: "Скандий", id: "Sc", latin: "Scandium", period: 4, row: 4, group: -3, mass: 44.955912},
    {num: 22, name: "Титан", id: "Ti", latin: "Titanium", period: 4, row: 4, group: -4, mass: 47.867},
    {num: 23, name: "Ванадий", id: "V", latin: "Vanadium", period: 4, row: 4, group: -5, mass: 50.9415},
    {num: 24, name: "Хром", id: "Cr", latin: "Chromium", period: 4, row: 4, group: -6, mass: 51.9961},
    {num: 25, name: "Марганец", id: "Mn", latin: "Manganum,Manganesium", period: 4, row: 4, group: -7, mass: 54.938045},
    {num: 26, name: "Железо", id: "Fe", latin: "Ferrum", period: 4, row: 4, group: -8, mass: 55.845},
    {num: 27, name: "Кобальт", id: "Co", latin: "Cobaltum", period: 4, row: 4, group: -8, mass: 58.933195},
    {num: 28, name: "Никель", id: "Ni", latin: "Niccolum", period: 4, row: 4, group: -8, mass: 58.6934},
],[
    {num: 29, name: "Медь", id: "Cu", latin: "Cuprum", period: 4, row: 5, group: -1, mass: 63.546},
    {num: 30, name: "Цинк", id: "Zn", latin: "Zincum", period: 4, row: 5, group: -2, mass: 65.409},
    {num: 31, name: "Галлий", id: "Ga", latin: "Gallium", period: 4, row: 5, group: 3, mass: 69.723},
    {num: 32, name: "Германий", id: "Ge", latin: "Germanium", period: 4, row: 5, group: 4, mass: 72.64},
    {num: 33, name: "Мышьяк", id: "As", latin: "Arsenicum", period: 4, row: 5, group: 5, mass: 74.92160},
    {num: 34, name: "Селен", id: "Se", latin: "Selenium", period: 4, row: 5, group: 6, mass: 78.96},
    {num: 35, name: "Бром", id: "Br", latin: "Bromum", period: 4, row: 5, group: 7, mass: 79.904},
    {num: 36, name: "Криптон", id: "Kr", latin: "Krypton,Crypton", period: 4, row: 5, group: 8, mass: 83.798},
],[
    {num: 37, name: "Рубидий", id: "Rb", latin: "Rubidium", period: 5, row: 6, group: 1, mass: 85.4678},
    {num: 38, name: "Стронций", id: "Sr", latin: "Strontium", period: 5, row: 6, group: 2, mass: 87.62},
    {num: 39, name: "Иттрий", id: "Y", latin: "Yttrium", period: 5, row: 6, group: -3, mass: 88.90585},
    {num: 40, name: "Цирконий", id: "Zr", latin: "Zirconium", period: 5, row: 6, group: -4, mass: 91.224},
    {num: 41, name: "Ниобий", id: "Nb", latin: "Niobium", period: 5, row: 6, group: -5, mass: 92.90638},
    {num: 42, name: "Молибден", id: "Mo", latin: "Molybdaenum", period: 5, row: 6, group: -6, mass: 95.94},
    {num: 43, name: "Технеций", id: "Tc", latin: "Technetium", period: 5, row: 6, group: -7, mass: 98.9063},
    {num: 44, name: "Рутений", id: "Ru", latin: "Ruthenium", period: 5, row: 6, group: -8, mass: 101.07},
    {num: 45, name: "Родий", id: "Rh", latin: "Rhodium", period: 5, row: 6, group: -8, mass: 102.90550},
    {num: 46, name: "Палладий", id: "Pd", latin: "Palladium", period: 5, row: 6, group: -8, mass: 106.42},
],[
    {num: 47, name: "Серебро", id: "Ag", latin: "Argentum", period: 5, row: 7, group: -1, mass: 107.8682},
    {num: 48, name: "Кадмий", id: "Cd", latin: "Cadmium", period: 5, row: 7, group: -2, mass: 112.411},
    {num: 49, name: "Индий", id: "In", latin: "Indium", period: 5, row: 7, group: 3, mass: 114.818},
    {num: 50, name: "Олово", id: "Sn", latin: "Stannum", period: 5, row: 7, group: 4, mass: 118.710},
    {num: 51, name: "Сурьма", id: "Sb", latin: "Stibium", period: 5, row: 7, group: 5, mass: 121.760},
    {num: 52, name: "Теллур", id: "Te", latin: "Tellurium", period: 5, row: 7, group: 6, mass: 127.60},
    {num: 53, name: "Иод", id: "I", latin: "Iodium,Jodium", period: 5, row: 7, group: 7, mass: 126.90447},
    {num: 54, name: "Ксенон", id: "Xe", latin: "Xenon", period: 5, row: 7, group: 8, mass: 131.293},
],[
    {num: 55, name: "Цезий", id: "Cs", latin: "Caesium", period: 6, row: 8, group: 1, mass: 132.9054519},
    {num: 56, name: "Барий", id: "Ba", latin: "Barium", period: 6, row: 8, group: 2, mass: 137.327},
    null,
    {num: 72, name: "Гафний", id: "Hf", latin: "Hafnium", period: 6, row: 8, group: -4, mass: 178.49},
    {num: 73, name: "Тантал", id: "Ta", latin: "Tantalum", period: 6, row: 8, group: -5, mass: 180.9479},
    {num: 74, name: "Вольфрам", id: "W", latin: "Wolframium", period: 6, row: 8, group: -6, mass: 183.84},
    {num: 75, name: "Рений", id: "Re", latin: "Rhenium", period: 6, row: 8, group: -7, mass: 186.207},
    {num: 76, name: "Осмий", id: "Os", latin: "Osmium", period: 6, row: 8, group: -8, mass: 190.23},
    {num: 77, name: "Иридий", id: "Ir", latin: "Iridium", period: 6, row: 8, group: -8, mass: 192.217},
    {num: 78, name: "Платина", id: "Pt", latin: "Platinum", period: 6, row: 8, group: -8, mass: 195.084},
],[
    {num: 79, name: "Золото", id: "Au", latin: "Aurum", period: 6, row: 9, group: -1, mass: 196.966569},
    {num: 80, name: "Ртуть", id: "Hg", latin: "Hydrargyrum", period: 6, row: 9, group: -2, mass: 200.59},
    {num: 81, name: "Таллий", id: "Tl", latin: "Thallium", period: 6, row: 9, group: 3, mass: 204.3833},
    {num: 82, name: "Свинец", id: "Pb", latin: "Plumbum", period: 6, row: 9, group: 4, mass: 207.2},
    {num: 83, name: "Висмут", id: "Bi", latin: "Bismuthum", period: 6, row: 9, group: 5, mass: 208.98040},
    {num: 84, name: "Полоний", id: "Po", latin: "Polonium", period: 6, row: 9, group: 6, mass: 208.9824},
    {num: 85, name: "Астат", id: "At", latin: "Astatum", period: 6, row: 9, group: 7, mass: 209.9871},
    {num: 86, name: "Радон", id: "Rn", latin: "Radon", period: 6, row: 9, group: 8, mass: 222.0176},
],[
    {num: 87, name: "Франций", id: "Fr", latin: "Francium", period: 7, row: 10, group: 1, mass: 223.0197},
    {num: 88, name: "Радий", id: "Ra", latin: "Radium", period: 7, row: 10, group: 2, mass: 226.0254},
    null,
    {num: 104, name: "Резерфордий", id: "Rf", latin: "Rutherfordium", period: 7, row: 10, group: -4, mass: 267},
    {num: 105, name: "Дубний", id: "Db", latin: "Dubnium", period: 7, row: 10, group: -5, mass: 268},
    {num: 106, name: "Сиборгий", id: "Sg", latin: "Seaborgium", period: 7, row: 10, group: -6, mass: 269},
    {num: 107, name: "Борий", id: "Bh", latin: "Bohrium", period: 7, row: 10, group: -7, mass: 270},
    {num: 108, name: "Хассий", id: "Hs", latin: "Hassium", period: 7, row: 10, group: -8, mass: 277},
    {num: 109, name: "Мейтнерий", id: "Mt", latin: "Meitnerium", period: 7, row: 10, group: -8, mass: 278},
    {num: 110, name: "Дармштадтий", id: "Ds", latin: "Darmstadtium", period: 7, row: 10, group: -8, mass: 281},
],[
    {num: 57, name: "Лантан", id: "La", latin: "Lanthanum", period: 6, row: 0, group: 3, mass: 138.90547},
    {num: 58, name: "Церий", id: "Ce", latin: "Cerium", period: 6, row: 0, group: 3, mass: 140.116},
    {num: 59, name: "Празеодим", id: "Pr", latin: "Praseodymium", period: 6, row: 0, group: 3, mass: 140.90765},
    {num: 60, name: "Неодим", id: "Nd", latin: "Neodymium", period: 6, row: 0, group: 3, mass: 144.242},
    {num: 61, name: "Прометий", id: "Pm", latin: "Promethium", period: 6, row: 0, group: 3, mass: 146.9151},
    {num: 62, name: "Самарий", id: "Sm", latin: "Samarium", period: 6, row: 0, group: 3, mass: 150.36},
    {num: 63, name: "Европий", id: "Eu", latin: "Europium", period: 6, row: 0, group: 3, mass: 151.964},
    {num: 64, name: "Гадолиний", id: "Gd", latin: "Gadolinium", period: 6, row: 0, group: 3, mass: 157.25},
    {num: 65, name: "Тербий", id: "Tb", latin: "Terbium", period: 6, row: 0, group: 3, mass: 158.92535},
    {num: 66, name: "Диспрозий", id: "Dy", latin: "Dysprosium", period: 6, row: 0, group: 3, mass: 162.500},
    {num: 67, name: "Гольмий", id: "Ho", latin: "Holmium", period: 6, row: 0, group: 3, mass: 164.93032},
    {num: 68, name: "Эрбий", id: "Er", latin: "Erbium", period: 6, row: 0, group: 3, mass: 167.259},
    {num: 69, name: "Тулий", id: "Tm", latin: "Thulium", period: 6, row: 0, group: 3, mass: 168.93421},
    {num: 70, name: "Иттербий", id: "Yb", latin: "Ytterbium", period: 6, row: 0, group: 3, mass: 173.04},
    {num: 71, name: "Лютеций", id: "Lu", latin: "Lutetium", period: 6, row: 0, group: 3, mass: 174.967},
],[
    {num: 89, name: "Актиний", id: "Ac", latin: "Actinium", period: 7, row: 0, group: 3, mass: 227.0278},
    {num: 90, name: "Торий", id: "Th", latin: "Thorium", period: 7, row: 0, group: 3, mass: 232.03806},
    {num: 91, name: "Протактиний", id: "Pa", latin: "Protactinium", period: 7, row: 0, group: 3, mass: 231.03588},
    {num: 92, name: "Уран", id: "U", latin: "Uranium", period: 7, row: 0, group: 3, mass: 238.02891},
    {num: 93, name: "Нептуний", id: "Np", latin: "Neptunium", period: 7, row: 0, group: 3, mass: 237.0482},
    {num: 94, name: "Плутоний", id: "Pu", latin: "Plutonium", period: 7, row: 0, group: 3, mass: 244.0642},
    {num: 95, name: "Америций", id: "Am", latin: "Americium", period: 7, row: 0, group: 3, mass: 243.0614},
    {num: 96, name: "Кюрий", id: "Cm", latin: "Curium", period: 7, row: 0, group: 3, mass: 247.0703},
    {num: 97, name: "Берклий", id: "Bk", latin: "Berkelium", period: 7, row: 0, group: 3, mass: 247.0703},
    {num: 98, name: "Калифорний", id: "Cf", latin: "Californium", period: 7, row: 0, group: 3, mass: 251.0796},
    {num: 99, name: "Эйнштейний", id: "Es", latin: "Einsteinium", period: 7, row: 0, group: 3, mass: 252.0829},
    {num: 100, name: "Фермий", id: "Fm", latin: "Fermium", period: 7, row: 0, group: 3, mass: 257.0951},
    {num: 101, name: "Менделевий", id: "Md", latin: "Mendelevium,Mendeleevium", period: 7, row: 0, group: 3, mass: 258.0986},
    {num: 102, name: "Нобелий", id: "No", latin: "Nobelium", period: 7, row: 0, group: 3, mass: 259.1009},
    {num: 103, name: "Лоуренсий", id: "Lr", latin: "Lawrencium,Laurentium", period: 7, row: 0, group: 3, mass: 266},
]];

function makeLine(index)
{
    var res = "";
    if (index < 10)
	while (res.length < MAIN_TABLE_OFFSET)
	    res += " ";
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
    for(var i = 0;i < 10;i++)
	this.lines.push(makeLine(i));
    this.lines.push("");
    this.lines.push(MSG_LANTANOIDS);
    this.lines.push(makeLine(10));
    this.lines.push("");
    this.lines.push(MSG_ACTINOIDS);
    this.lines.push(makeLine(11));
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
	if (this.y < 10)
	    this.hotPointX += MAIN_TABLE_OFFSET;
	switch(this.y)
	{
	    case 10:
	    this.hotPointY = 12;
	    break;
	    case 11:
	    this.hotPointY = 15;
	    break;
	    default:
	    this.hotPointY = this.y;
	}
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
