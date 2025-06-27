/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.i18n.en;

import java.util.*;

import org.luwrain.core.*;
import org.luwrain.i18n.*;

final class Lang extends LangBase
{
    Lang(Luwrain luwrain, Map<String, String> staticStrings, Map<String, String> chars)
    {
	super("en", luwrain, staticStrings, chars);
    }

    @Override public String getNumberStr(int num, String entities)
    {
	NullCheck.notEmpty(entities, "entities");
	final StringBuilder b = new StringBuilder();
	b.append("" + num + " ");
	switch(entities)
	{
	case "items":
	    b.append(num == 1?"item":"items");
	    break;
	case "percents":
	    b.append(num == 1?"percent":"percents");
	    break;
	case "hours":
	    b.append(num == 1?"hour":"hours");
	    break;
	case "minutes":
	    b.append(num == 1?"minute":"minutes");
	    break;
	}
	return new String(b);
    }

    @Override public String pastTimeBrief(java.util.Date date)
    {
	NullCheck.notNull(date, "date");
	return new DateUtils().pastTimeBrief(date) + " ago";
	}

    @Override public String getSpeakableText(String text, Luwrain.SpeakableTextType type)
    {
	//FIXME:
	return text;
    }

    @Override public String hasSpecialNameOfChar(char ch)
    {
	final String value = super.hasSpecialNameOfChar(ch);
	if (value == null)
	    return null;
	if (value.endsWith("_sign"))
	    return value.substring(0, value.length() - 5);
	return value;
    }
}
