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

public class SystemAppStringConstructor implements org.luwrain.app.system.SystemAppStringConstructor
{
    private Language lang;

    public SystemAppStringConstructor(Language lang)
    {
	this.lang = lang;
    }

    public String mainMenuTitle()
    {
	return "Main menu";
    }

    public String runActionTitle()
    {
	return "Proveď příkaz:";
    }

    public String runAction()
    {
	return "Command:";
    }


    public String actionTitle(String action)
    {
	return action != null?lang.getActionTitle(action):"";
    }

    public String currentDateTime()
    {
	Calendar c = new GregorianCalendar();
	String value = "";
	value += withZeroes(c.get(Calendar.HOUR_OF_DAY), 2);
	value += ":";
	value += withZeroes(c.get(Calendar.MINUTE), 2);
	value += ", ";
	value += dayOfWeek(c.get(Calendar.DAY_OF_WEEK));
	value += ",";
	value += month(c.get(Calendar.MONTH));
	value += " ";
	value += c.get(Calendar.DAY_OF_MONTH);
	return value;
    }

    public String mainMenuNoItemsAbove()
    {
	return "Počátek hlavního menu";
    }

    public String mainMenuNoItemsBelow()
    {
	return "Konec hlavního menu";
    }

    private String dayOfWeek(int index)
    {
	switch(index)
	{
	case 1:
	    return "Neděle";
	case 2:
	    return "Pondělí";
	case 3:
	    return "Úterý";
	case 4:
	    return "Středa";
	case 5:
	    return "Čtvrtek";
	case 6:
	    return "Pátek";
	case 7:
	    return "Sobota";
	}
	return null;
    }

    private String month(int index)
    {
	switch(index)
	{
	case 0:
	    return "Leden";
	case 1:
	    return "Únor";
	case 2:
	    return "Březen";
	case 3:
	    return "Duben";
	case 4:
	    return "Květen";
	case 5:
	    return "Červen";
	case 6:
	    return "Červenec";
	case 7:
	    return "Srpen";
	case 8:
	    return "Září";
	case 9:
	    return "Říjen";
	case 10:
	    return "Listopad";
	case 11:
	    return "Prosinec";
	}
	return null;
    }

    private String withZeroes(int value, int len)
    {
	String s = "";
	s += value;
	while(s.length() < len)
	    s = "0" + s;
	return s;
    }
}
