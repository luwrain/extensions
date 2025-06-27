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

public class NewsReaderStringConstructor implements org.luwrain.app.news.StringConstructor
{
    public String appName()
    {
	return "Čtení diskusních skupin";
    }

    public String groupAreaName()
    {
	return "Seznam diskusních skupin";
    }

    public String summaryAreaName()
    {
	return "Seznam článků s novinkami";
    }

    public String viewAreaName()
    {
					return "Náhled článku s novinkou";
    }

    public     String errorReadingArticles()
    {
	return "Při stahování novinek došlo k chybě";
    }

    public String readPrefix()
    {
	return "Přečíst";
    }

    public String markedPrefix()
    {
	return "Označeno";
    }

    public String noSummaryItems()
    {
	return "Žádné články s novinkami";
    }

    public String noSummaryItemsAbove()
    {
	return "Počátek seznamů článků s novinkami";
    }

    public String noSummaryItemsBelow()
    {
	return "Konec seznamu článků novinek";
    }

    public String errorUpdatingArticleState()
    {
	return "Při ukládání článku došlo k chybě";
    }
}
