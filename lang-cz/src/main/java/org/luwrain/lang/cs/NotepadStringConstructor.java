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

public class NotepadStringConstructor implements org.luwrain.app.notepad.StringConstructor
{
    @Override public String appName()
    {
	return "Notepad";
    }

    @Override public String introduction()
    {
	return "Editing";
    }

    @Override public String newFileName()
    {
	return "New file.txt";
    }

    @Override public String errorOpeningFile()
    {
	return "Při čtení souboru se vyskytla chyba";
    }

    public String errorSavingFile()
    {
	return "Při ukládání souboru se vyskytla chyba";
    }

    @Override public String fileIsSaved()
    {
	return "Soubor je úspěšně uložen";
    }

    @Override public String savePopupName()
    {
	return "Uložit soubor";
    }

    @Override public String savePopupPrefix()
    {
	return "Zadejte jméno souboru pro uložení jako:";
    }

    @Override public String saveChangesPopupName()
    {
	return "Neuložené změny";
    }

    @Override public String saveChangesPopupQuestion()
    {
	return "Přejete si uložit změny?";
    }

    @Override public String noModificationsToSave()
    {
	return "Neexistují žádné neuložené změny";
    }
}
