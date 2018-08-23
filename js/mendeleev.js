

var TABLE = [
    //First row
    [
	{id: "H"}
    ]
];

function makeLine(index)
{
    var res = TABLE[index][0].id;
    return res;
}

function MendeleevApp()
{
    this.name = "Периодическая таблица химических элементов";
    this.type = "simple-centered";
    this.lines = [
	makeLine(0)

    ];
    this.hotPointX = 0;
    this.hotPointY = 0;

    this.onInputEvent = function(event)
    {
	Luwrain.message(this.lines[0]);
	return true;
    };

}

Luwrain.addApp("edu-mendeleev",  MendeleevApp);
Luwrain.addCommand("edu-mendeleev", function(){Luwrain.launchApp("edu-mendeleev");});
