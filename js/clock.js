

Luwrain.addWorker("luwrain-clock-hourly", 5, 1, function(){
    var d = new java.util.Date();
    if (d.getSeconds() != 0 || d.getMinutes() != 0)
	return;
    Luwrain.sounds.generalTime();
    Luwrain.speak("" + d.getHours() + " часов");
});

