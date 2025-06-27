/*
   Copyright 2015 Mgr. Janusz Chmiel <chmiel@deep.cz>
   Copyright 2012-2014 Michael Pozhidaev <msp@altlinux.org>

   This file is part of the Luwrain.

   Luwrain is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public
   License as published by the Free Software Foundation; either
   version 3 of the License, or (at your option) any later version.

   Luwrain is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.
*/

package org.luwrain.langs.en;

import java.util.*;

class MailReaderStringConstructor implements org.luwrain.app.mail.StringConstructor
{
    public String foldersAreaName()
    {
	return "E-mailová konference seznam";
    }

    public String summaryAreaName()
    {
	return "Seznam správ";
    }

    public String messageAreaName()
    {
	return "Náhled správy";
    }

    @Override public String errorOpeningFolder()
    {
	return "V průběhu otevírání mailové složky se vyskytly chyby";
    }

    public String mailFoldersRoot()
    {
	return "Mailové skupiny";
    }

    public String readPrefix()
    {
	return "Přečíst";
    }

    public String markedPrefix()
    {
	return "Označený";
    }

    public String emptySummaryArea()
    {
	return "V seznamu nejsou žádná hlášení";
    }

    public String firstSummaryLine()
    {
	return "Prvý souhrnný řádek";
    }

    public String lastSummaryLine()
    {
	return "Poslední souhrnný seznam";
    }

    public String noMailStoring()
    {
	return "Chyba při připojování se k mailovému úložišti";
    }
}
