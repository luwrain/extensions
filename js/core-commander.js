
Luwrain.addHook("luwrain.commander.panel.actions", ()=>{
    return {name: "gpg-encrypt", title: "Зашифровать", action: (selected, marked)=>{
	if (!selected)
	    return false;
	const passwd = Luwrain.popups.text("Шифрование файла", "Введите пароль:", "");
	if (!passwd)
	    return true;
	const passwdFile = selected + ".passwd";
	Luwrain.writeTextFile(passwdFile, [passwd]);
	Luwrain.newJob("sys", [
	    "gpg",
	    "-c",
	    "--cipher-algo", "aes",
	    "--passphrase-fd", "0",
	    "--no-tty",
	    Luwrain.escapeString("cmd", selected),
	    "<", Luwrain.escapeString("cmd", passwdFile),
	    ";", "rm", "-f", Luwrain.escapeString("cmd", passwdFile)],
		       null, (ok, exitCode)=>{
//			   Luwrain.deleteFile(passwdFile);
			   if (ok)
			       Luwrain.message("Зашифровано", Luwrain.constants.MESSAGE_TYPE_DONE); else
				   Luwrain.message("Произошла ошибка при шифровании файла", Luwrain.constants.MESSAGE_TYPE_ERROR);
		       });
	return true;
    }
	   };
});

Luwrain.addHook("luwrain.commander.panel.actions", ()=>{
    return {name: "gpg-decrypt", title: "Расшифровать", action: (selected, marked)=>{
	if (!selected)
	    return false;
	const passwd = Luwrain.popups.text("Расшифровка файла", "Введите пароль:", "");
	if (!passwd)
	    return true;
	const passwdFile = selected + ".passwd";
	Luwrain.writeTextFile(passwdFile, [passwd]);
	Luwrain.newJob("sys", [
	    "gpg",
	    "--decrypt-file",
	    "--passphrase-fd", "0",
	    "--no-tty",
	    Luwrain.escapeString("cmd", selected),
	    "<", Luwrain.escapeString("cmd", passwdFile),
	    ";", "rm", "-f", Luwrain.escapeString("cmd", passwdFile)],
		       null, (ok, exitCode)=>{
//			   			   Luwrain.deleteFile(passwdFile);
			   if (ok)
			       Luwrain.message("Расшифровано", Luwrain.constants.MESSAGE_TYPE_DONE); else
				   Luwrain.message("Произошла ошибка при расшифровании файла", Luwrain.constants.MESSAGE_TYPE_ERROR);
		       });
	return true;
    }
	   };
});
