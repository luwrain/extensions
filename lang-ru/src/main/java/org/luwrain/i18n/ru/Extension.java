/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>

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

import org.apache.logging.log4j.*;
import com.google.auto.service.*;

import org.luwrain.core.*;
import org.luwrain.i18n.*;

@AutoService(org.luwrain.core.Extension.class)
public final class Extension extends I18nExtensionBase
{
    static private final Logger log = LogManager.getLogger();

    static private final String LANG_NAME = "ru";
    static final String LOG_COMPONENT = LANG_NAME;
    static private final String RESOURCE_PATH = "org/luwrain/i18n/ru/constants.properties";

    public Extension()
    {
	super("ru");
    }

    @Override public void i18nExtension(Luwrain luwrain, I18nExtension ext)
    {
	try {
	    	init(getClass().getClassLoader(), luwrain);
	    loadProperties(RESOURCE_PATH, ext);
	    loadCommands(ext);
	    ext.addLang(LANG_NAME, new Lang(luwrain, readStaticStrings(), readChars()));
	}
	catch(java.io.IOException e)
	{
	    log.error("Unable to init the language", e);
	}
    }
}
