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

var NAME = 'org.luwrain.core.shell.desktop.Strings';

Luwrain.addHook("luwrain.i18n.ru.strings", function(name, args){
    if (name != NAME)
	return null;
    return 'Вы действительно хотите удалить ' + args[0] + ' ' + Luwrain.i18n.langs.ru.exp.quantity({unit: 'элемент', count: args[0]}) + ' с рабочего стола?';
});
