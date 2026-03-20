// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2026 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.i18n.ru;

import java.io.*;

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
	    ext.addLang(LANG_NAME, new Lang(luwrain, readStaticStrings(), readChars()));
	    loadCommands(ext);
	    loadStrings(org.luwrain.app.calc.Strings.class, "calc.txt", ext);
	    loadStrings(org.luwrain.app.console.Strings.class, "console.txt", ext);
	    loadStrings(org.luwrain.app.cpanel.Strings.class, "cpanel.txt", ext);
	    loadStrings(org.luwrain.app.crash.Strings.class, "crash.txt", ext);
	    loadStrings(org.luwrain.shell.desktop.Strings.class, "desktop.txt", ext);
	    loadStrings(org.luwrain.app.jobs.Strings.class, "jobs.txt", ext);
	}
	catch(java.io.IOException e)
	{
	    log.error("Unable to init the language", e);
	}
    }

    private void loadStrings(Class c, String resName, I18nExtension ext) throws IOException
    {
	ext.addStrings("ru", c.getName(), new ResourceStringsObj(Extension.class.getClassLoader(), Extension.class, resName).create("ru", c));
    }
}
