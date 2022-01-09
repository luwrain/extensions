/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

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

Luwrain.addCommand("poweroff", ()=>{
    Linux.runAsync("if [ -e /cdrom/casper/filesystem.squashfs ]; then sudo poweroff --force; else sudo systemctl poweroff; fi");
});

Luwrain.addCommand("reboot", ()=>{
    Linux.runAsync("sudo systemctl reboot");
});

Luwrain.addCommand("suspend", ()=>{
    Linux.runAsync("sudo systemctl suspend");
});

Luwrain.addCommand("battery", ()=>{
    Linux.runAsync("echo proba", (l)=>{
	const line = 'Battery 0: Discharging, 19%, 00:43:09 remaining';
	const m = line.trim().match(/^Battery .* ([0-9]+)%.*$/);
	if (!m) 
	    return;
	Luwrain.message(m[1] + "% заряд батареи");
    });
});
