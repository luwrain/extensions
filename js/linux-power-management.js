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
    if (Luwrain.popups.confirmDefaultYes("Выключение компьютера", "Вы действительно хотите выключить компьютер?"))
    Linux.runAsync("if [ -e /cdrom/casper/filesystem.squashfs ]; then sudo poweroff --force; else sudo systemctl poweroff; fi");
});

Luwrain.addCommand("reboot", ()=>{
    if (Luwrain.popups.confirmDefaultYes("Перезагрузка", "Вы действительно хотите перезагрузить компьютер?"))
	Linux.runAsync("sudo systemctl reboot");
});

Luwrain.addCommand("suspend", ()=>{
    if (Luwrain.popups.confirmDefaultYes("Спящий режим", "Вы действительно хотите активировать спящий режим?"))
	Linux.runAsync("sudo systemctl suspend");
});

Luwrain.addCommand("battery", ()=>{
    Linux.runAsync("acpi", (line)=>{
	const m = line.trim().match(/^Battery .* ([0-9]+)%.*$/);
	if (!m) 
	    return;
	Luwrain.message("Заряд батареи " + m[1] + "%");
    });
});
