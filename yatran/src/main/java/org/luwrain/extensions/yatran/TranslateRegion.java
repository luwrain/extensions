/*
   Copyright 2012-2017 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

package org.luwrain.extensions.yatran;

import org.luwrain.core.*;
import org.luwrain.util.*;

class TranslateRegion implements Command
{
    static private final String KEY_PATH = "/org/luwrain/extensions/yatran/key";

    @Override public String getName()
    {
	return "yatran-translate-region";
    }

    @Override public void onCommand(Luwrain luwrain)
    {
	final Registry registry = luwrain.getRegistry();
	final String key;
	if (registry.getTypeOf(KEY_PATH) == Registry.STRING)
	    key = registry.getString(KEY_PATH); else
	    key = "";
	if (key == null || key.trim().isEmpty())
	{
	    luwrain.message("Не задан ключ для доступа к функциям переводчика", Luwrain.MESSAGE_ERROR);//FIXME:
	    return;
	}
	final String text;
final String regionText = luwrain.getActiveAreaText(Luwrain.AreaTextType.REGION, true);
if (regionText == null)
text = luwrain.getActiveAreaText(Luwrain.AreaTextType.WORD, true); else
    text = regionText;
	if (text == null || text.trim().isEmpty())
	{
	    luwrain.message("Отсутствует текст для перевода", Luwrain.MessageType.ERROR);//FIXME:
	    return;
	}
	final Client client = new Client(key);
	final Runnable r = ()->{
		    try {
			final String res = client.translate(text);
			luwrain.message(res, Luwrain.MESSAGE_DONE);
		    }
		    catch (Exception e)
		    {
			luwrain.crash(e);
		    }
		};
	new Thread(r).start();
    }
}
