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

Luwrain.addHook("luwrain.commander.panel.actions", ()=>{
    return {name: "gpg-decrypt", title: "Расшифровать", action: (selected, marked)=>{
	const passwd = Luwrain.popups.text("Расшифровка файла", "Введите пароль:", "");
	if (!passwd)
	    return true;
		Luwrain.newJob("sys", ["eject"], null, (ok, exitCode)=>{
		    Luwrain.message("privet " + exitCode);
		});
		return true;
	    }
    };
});
