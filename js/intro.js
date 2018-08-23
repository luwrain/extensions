
var frames = [

    //0
    [
	"Добро пожаловать в LUWRAIN!",
	"",
	"Вашему вниманию предлагается учебник и тренажёр для быстрого ознакомления с основными правилами работы в LUWRAIN."
    ],

    //1
    [
    "Основной элемент управления в нашей системе - список. В виде списка",
    "представлены файлы на вашем жёстком диске, содержимое рабочего стола,",
    "главного меню и прочие объекты.  Навигация по списку производится",
    "путём нажатия клавиш со стрелками вверх и вниз. При установке курсора",
    "на новый элемент списка, произносится его название.",
    "",
    "На следующем шаге мы предлагаем вам попробовать навигацию в списке из",
    "трёх элементов. Внимательно прослушайте их название и научитесь",
	"мысленно в них ориентироваться."
	]


];

function sayFrameText(index)
{
var text = "";
for(var i = 0;i < frames[index].length;i++)
text += (frames[index][i] + " ");
Luwrain.message(text);
}

function IntroApp()
{
    this.name = "Первые шаги в LUWRAIN, нажмите пробел для прослушивания текста";
    this.type = "simple-centered";
    this.index = 1;
    this.lines = frames[0];
    this.hotPointX = 0;
    this.hotPointY = 0;

    this.onInputEvent = function(event)
    {
	if (event == " ")
	{
sayFrameText(this.index);
	    return true;
	}
	return false;
    };
}


Luwrain.addApp("edu-intro-ru", IntroApp);
Luwrain.addCommand("edu-intro-ru", function(){Luwrain.launchApp("edu-intro-ru");});
