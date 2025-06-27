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

import java.lang.reflect.*;
import java.io.*;
import java.util.*;
import java.net.*;
import com.google.gson.*;
import com.google.gson.annotations.*;
import com.google.gson.reflect.*;

import org.luwrain.core.*;
import org.luwrain.i18n.*;
import org.luwrain.nlp.*;
import org.luwrain.nlp.ru.*;

import org.luwrain.nlp.ru.GramAttr.Gender;
import org.luwrain.nlp.ru.GramAttr.Number;
import org.luwrain.nlp.ru.GramAttr.Case;

public final class WordList
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;
        static private final String RESOURCE_PATH = "org/luwrain/i18n/ru/words";
        static final Type RU_WORD_LIST_TYPE = new TypeToken<List<RuWord>>(){}.getType();

    private final Gson gson = new Gson();
    private final Map<String, List<RuWord>> words = new HashMap();

    RuWord[] findWord(String lemma)
    {
	NullCheck.notEmpty(lemma, "lemma");
	final List<RuWord> res = words.get(lemma.toUpperCase());
	if (res == null)
	    return new RuWord[0];
	return res.toArray(new RuWord[res.size()]);
    }

        void loadFromResource()
    {
	final URL url = this.getClass().getClassLoader().getResource(RESOURCE_PATH);
	if (url == null)
	{
	    Log.error(LOG_COMPONENT, "No resource " + RESOURCE_PATH);
	    return;
	}
	try {
	    final BufferedReader r = new BufferedReader(new InputStreamReader(url.openStream()));
	try {
	    words.clear();
	    final List<RuWord> res = gson.fromJson(r, RU_WORD_LIST_TYPE);
	    if (res == null)
		return;
	    for(RuWord w: res)
	    {
		final String lemma = w.getLemma().toUpperCase();
		if (lemma.isEmpty())
		    continue;
		List<RuWord> l = this.words.get(lemma);
		if (l == null)
		{
		    l = new LinkedList();
		    this.words.put(lemma, l);
		}
		w.init();
		l.add(w);
	    }
	}
	finally {
	    r.close();
	}
	}
	catch(IOException e)
	{
	    Log.error(LOG_COMPONENT, "unable to read and parse the resource " + RESOURCE_PATH + ":" + e.getClass().getName() + ":" + e.getMessage());
	    return;
	}
    }
    }
