/*
   Copyright 2012-2024 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.i18n.ru;

import java.io.*;

import org.luwrain.core.*;
import org.luwrain.core.Luwrain.SpeakableTextType;
import org.luwrain.inlandes.*;

import static org.luwrain.inlandes.Token.*;
import static org.luwrain.script.Hooks.*;

final class SpeakableText
{
    static private final String
	LOG_COMPONENT = Lang.LOG_COMPONENT,
	HOOK_PROGRAMMING = "luwrain.i18n.ru.speakable.programming";

    private final HookContainer hookContainer;
    private final Inlandes inlandes = new Inlandes();

    SpeakableText(HookContainer hookContainer)
    {
	this.hookContainer = hookContainer;
	this.inlandes.loadStandardLibrary();
	loadRules();
    }

    String process(String text, SpeakableTextType type)
    {
	switch(type)
	{
	case NATURAL:
	    return processNatural(text);
	case PROGRAMMING:
	    return transformer(hookContainer, HOOK_PROGRAMMING, text).toString();
	default:
	    return text;
	}
    }

    private String processNatural(String text)
    {
	synchronized(inlandes) {
	    return concatText(inlandes.process(text));
	}
    }

    private void loadRules()
    {
	try {
	    try (final BufferedReader r = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("rules"), "UTF-8"))) {
		String line = r.readLine();
		final StringBuilder b = new StringBuilder();
		while (line != null)
		{
		    final String l = line.trim();
		    if (!l.isEmpty() && l.charAt(0) != '#')
			b.append(line).append(System.lineSeparator());
		    line = r.readLine();
		}
		inlandes.loadRules(new String(b));
	    }
	}
	catch(Throwable e)
	{
	    Log.error(LOG_COMPONENT, "unable to load Inlandes rules: " + e.getClass().getName() + ": " + e.getMessage());
	}
    }
}
