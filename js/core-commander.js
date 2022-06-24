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
    return {name: "gpg-encrypt", title: "Зашифровать", action: (selected, marked)=>{
	if (!selected)
	    return false;
	const passwd = Luwrain.popups.text("Расшифровка файла", "Введите пароль:", "");
	if (!passwd)
	    return true;
	const passwdFile = selected + ".passwd";
	Luwrain.writeTextFile(passwdFile, [passwd, Luwrain.escapeString("cmd", "123 \' 321")]);
	Luwrain.newJob("sys", [
	    "gpg",
	    "-c",
	    "--cipher-algo", "aes",
	    "--passphrase-fd", "0",
	    "--no-tty",
	    Luwrain.escapeString("cmd", selected),
	    "<", Luwrain.escapeString("cmd", passwdFile)],
		       null, (ok, exitCode)=>{
			   if (ok)
			       Luwrain.message("Зашифровано", Luwrain.constants.MESSAGE_TYPE_DONE); else
			       Luwrain.message("Произошла ошибка при шифровании файла", Luwrain.constants.MESSAGE_TYPE_ERROR);
		});
		return true;
	    }
    };
});
