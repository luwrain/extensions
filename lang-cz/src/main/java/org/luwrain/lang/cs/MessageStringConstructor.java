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

public class MessageStringConstructor implements org.luwrain.app.message.StringConstructor
{
    @Override public String appName()
    {
	return "NOvá správa";
    }

    @Override public String noMailStoring()
    {
	return "Žádné připojení k mailovému úložišti";
    }

    @Override public String withoutSubject()
    {
	return "(Žádný předmět)";
    }

    @Override public String emptyRecipient()
    {
	return "Měli byste zadat adresu příjemce";
    }

    @Override public String errorSendingMessage()
    {
	return "V průběhu odesílání správy se vyskytla chyba";
    }
}
