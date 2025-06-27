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

import java.util.*;

import org.luwrain.core.*;
import org.luwrain.script.core.*;
import org.luwrain.i18n.*;
import org.luwrain.nlp.*;

final class Lang extends LangBase
{
    static final String LOG_COMPONENT = "ru";

    private final ScriptCore  scriptCore;
    private final SpeakableText speakableText;
    private final WordList wordsList = new WordList();

    Lang(Luwrain luwrain, Map<String, String> staticStrings, Map<String, String> chars)
    {
	super("ru", luwrain, staticStrings, chars);
	NullCheck.notNull(luwrain, "luwrain");
	this.scriptCore = new ScriptCore(luwrain);
	Log.debug(LOG_COMPONENT, "Loading Russian");
	for(ScriptFile s: luwrain.getScriptFilesList("ru"))
	    try {
		scriptCore.load(s);
	    }
	    catch(Throwable e)
	    {
		Log.error(LOG_COMPONENT, "unable to load " + s.toString() + ": " + e.getClass().getName() + ": " + e.getMessage());
	    }
	this.speakableText = new SpeakableText(scriptCore);
	this.wordsList.loadFromResource();
    }

    @Override public String pastTimeBrief(java.util.Date date)
    {
	return new DateUtils().passedTimeBrief(date) + " назад";
    }

    @Override public String getNumberStr(int count, String entities)
    {
	NullCheck.notNull(entities, "entities");
	switch(entities)
	{
	case "items":
return     "" + count + " " + afterNum(count, "элементов", "элемент", "элемента");
	case "percents":
return     "" + count + " " + afterNum(count, "процентов", "процент", "процента");
	case "hours":
return     "" + count + " " + afterNum(count, "часов", "час", "часа");
	case "minutes":
return     "" + count + " " + afterNum(count, "минут", "минута", "минуты");
	default:
	    return "#Неизвестный тип сущностей \'" + entities + "\'#";
	}
    }

    @Override public String getSpeakableText(String text, Luwrain.SpeakableTextType type)
    {
	NullCheck.notNull(text, "text");
	NullCheck.notNull(type, "type");
	return speakableText.process(text, type);
    }

    @Override public Word[] getWord(String word)
    {
	NullCheck.notEmpty(word, "word");
	return wordsList.findWord(word);
    }

    static String afterNum(int num,
			   String afterZero,
			   String afterOne,
			   String afterTwo)
    {
	if (num < 0)
	    throw new IllegalArgumentException("num may not be negative");
	if (num == 0 || num % 10 == 0)
	    return afterZero;
	if (num % 100 >= 11 && num % 100 <= 19)
	    return afterZero;
	if (num % 10 == 1)
	    return afterOne;
	if (num % 10 >= 2 && num % 10 <= 4)
	    return afterTwo;
	return afterZero;
    }

    private String bytesNum(long num)
    {
	if (num > 1024 * 1024 * 1024)
	{
	    final long g = num / (1024 * 1024 * 1024);
	    long rest = num - (g * 1024 * 1024 * 1024);
	    rest /= (102 * 1024 * 1024);
	    return g + "," + rest + "ГБ";
	}
	if (num > 1024 * 1024)
	{
	    final long m = num / (1024 * 1024);
	    long rest = num - (m * 1024 * 1024);
	    rest /= (102 * 1024);
	    return m + "," + rest + "МБ";
	}
	if (num > 1024)
	{
	    final long k = num / 1024;
	    long rest = num - (k * 1024);
	    rest /= 102;
	    return k + "," + rest + "КБ";
	}
	return "" + num + "Б";
    }
}
