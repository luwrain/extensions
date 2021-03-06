/*
   Copyright 2019-2020 Michael Pozhidaev <msp@luwrain.org>

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

Luwrain.addWorker("luwrain-clock-hourly", 5, 1, function(){
    var d = new java.util.Date();
    if (d.getSeconds() != 0 || d.getMinutes() != 0)
	return;
    Luwrain.sounds.generalTime();
    Luwrain.speak("" + d.getHours() + " часов");
});

//Startup announcement, runs once a year
Luwrain.addWorker("startup-announcement-worker", 5, 60 * 60 * 24 * 365, function(){
    var format = new java.text.SimpleDateFormat("EEEEE, dd MMMM, HH:mm");
    var text = format.format(new java.util.Date());
    Luwrain.message.announcement(text);
});


//The announcement after waking up, measures the time elapsed from the previous step
var prevStepTime = -1;
Luwrain.addWorker("waking-announcement-worker", 1, 1, function(){
    var d = new java.util.Date();
    if (prevStepTime < 0)
    {
	prevStepTime = d.getTime();
	return;
    }
    var c = d.getTime();
    if (c - prevStepTime > 10000)
    {
	var format = new java.text.SimpleDateFormat("EEEEE, dd MMMM, HH:mm");
	var text = format.format(new java.util.Date());
	Luwrain.message.announcement(text);
    }
    prevStepTime = c;
});
