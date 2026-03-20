// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2026 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.i18n.ru;

import java.io.*;
import org.apache.logging.log4j.*;

import org.luwrain.core.*;
import org.luwrain.core.Luwrain.SpeakableTextType;
import org.luwrain.inlandes.*;

import static org.luwrain.inlandes.Token.*;
import static org.luwrain.script.Hooks.*;

final class SpeakableText
{
    static private final Logger log = LogManager.getLogger();

    static private final String
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
	    log.error("unable to load Inlandes rules", e);
	}
    }
}
