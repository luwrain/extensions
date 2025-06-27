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

import java.io.*;
import java.util.*;
import org.luwrain.core.Langs;
import org.luwrain.app.commander.DirItem;
import org.luwrain.app.commander.PanelArea;

class CommanderStringConstructor implements org.luwrain.app.commander.StringConstructor
{
    public String appName()
    {
	return "Zprávce souborù";
    }

    public String leftPanelName(String path)
    {
	return "Levý panel " + path;
    }

    public String rightPanelName(String path)
    {
	return "Pravý panel " + path;
    }

    public String tasksAreaName()
    {
	return "Seznam úloh";
    }

    public String noItemsAbove()
    {
	return "Na hoøe nejsou žádné položky";
    }

    public String noItemsBelow()
    {
	return "Dole nejsou žádné položky";
    }

    public String inaccessibleDirectoryContent()
    {
	return "Obsah adresáøe je nepøístupný";
    }

    public String rootDirectory()
    {
	return "Koøenový adresáø";
    }

    public String dirItemIntroduction(DirItem item, boolean brief)
    {
	if (item == null)
	    return "";
	String text = item.getFileName();
	if (text.isEmpty())
	    return Langs.staticValue(Langs.EMPTY_LINE);
	if (text.equals(PanelArea.PARENT_DIR))
	    return "Nadøazený adresáø";
	if (!brief)
	{
	    if (item.getType() == DirItem.DIRECTORY)
	    {
		if (item.isSelected())
		    text = "Zvolený adresáø" + text; else
		    text = " "Adresáø + text;
	    } else
		if (item.selected)
		    text = "Zvolený adresáø" + text;
	}
	return text;
    }

    public String done()
    {
	return "Hotovo";
    }

    public String failed()
    {
	return "Chyba";
    }

    public String copying(File[] files)
    {
	if (files == null)
	    return "";
	if (files.length == 1)
	    return "Kopíruji soubory" + files[0];
	return "Kopíruji " + files + " položka(s)";
    }

    public String copyPopupName()
    {
	return "Kopírovat";
    }

    public String copyPopupPrefix(File[] files)
    {
	if (files == null || files.length < 1)
	    return "";
	if (files.length == 1)
	    return "Kopíruji \"" + files[0].getName() + "\" to:";
	return "Kopíruji " + files.length + " položky do:";
    }

    public String movePopupName()
    {
	return "Pøesunout/pøejmenovat";
    }

    public String movePopupPrefix(File[] files)
    {
	if (files == null || files.length < 1)
	    return "";
	if (files.length == 1)
	    return "Pøesunout/pøejmenovat /remove \"" + files[0].getName() + "\" to:";
	return "Pøesunuji " + files.length + " items to:";
    }

    public String mkdirPopupName()
    {
	return "Vytvoøit nový adresáø";
    }

    public String mkdirPopupPrefix()
    {
	return "Jméno nového adresáøe";
    }

    public String delPopupName()
    {
	return "Vymazat";
    }

    public String delPopupPrefix(File[] files)
    {
	if (files == null || files.length < 1)
	    return "";
	if (files.length == 1)
	{
	    if (files[0].isDirectory())
		return "Jste si jist/á, že si pøejete vymazat adresáø \"" + files[0].getName() + "\"?";
	    return "Jste si jist/á, že si pøejete smazat soubor \"" + files[0].getName() + "\"?";
	}
	return "Jste si jist/á, že si pøejete smazat soubory" + files.length + " items?";
    }
}
