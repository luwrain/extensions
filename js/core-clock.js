
Luwrain.addWorker("luwrain-clock-hourly", 5, 1, ()=>{
    const now = Luwrain.now;
    if (now.sec > 0)
	return;
    var text ;
    switch(now.hour) {
    case 0: text = 'Полночь'; break;
    case 1: text = 'Час ночи'; break;
    case 2: text = 'Два часа ночи'; break;
    case 3: text = 'Три часа ночи'; break;
    case 4: text = 'Четыре часа ночи'; break;
    case 5: text = 'Пять часов утра'; break;
    case 6: text = 'Шесть часов утра'; break;
    case 7: text = 'Семь часов утра'; break;
    case 8: text = 'Восемь часов утра'; break;
    case 9: text = 'Девять часов утра'; break;
    case 10: text = 'Десять часов утра'; break;
    case 11: text = 'Одиннадцать часов утра'; break;
    case 12: text = 'Полдень'; break;
    case 13: text = 'Час дня'; break;
    case 14: text = 'Два часа дня'; break;
    case 15: text = 'Три часа дня'; break;
    case 16: text = 'Четыре часа дня'; break;
    case 17: text = 'Пять часов вечера'; break;
    case 18: text = 'Шесть часов вечера'; break;
    case 19: text = 'Семь часов вечера'; break;
    case 20: text = 'Восемь часов вечера'; break;
    case 21: text = 'Девять часов вечера'; break;
    case 22: text = 'Десять часов вечера'; break;
	    case 23: text = 'Одиннадцать часов вечера'; break;
    default:
	return;
    }
    Luwrain.speak(text);
});
