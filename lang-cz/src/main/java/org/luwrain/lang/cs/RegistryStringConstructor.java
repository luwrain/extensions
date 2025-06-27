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
-
package org.luwrain.langs.en;

import java.util.*;

public class RegistryStringConstructor implements org.luwrain.app.registry.StringConstructor
{
    public String dirsAreaName()
    {
	return "Adresářový strom";
    }

    public String valuesAreaName()
    {
	return "Seznam hodnot";
    }

    public String rootItemTitle()
    {
	return "Registr Luwrain";
    }

    public String introduceStringValue(String name, String value)
    {
	return "řetězec hodnota " + name + " rovná se " + value;
    }

    public String introduceIntegerValue(String name, String value)
    {
	return "Číselný parametr název" + name + " equals " + value;
    }

    public String introduceBooleanValue(String name, boolean value)
    {
	return "Řetězcový parametr  " + name + " rovná se  " + (value?"true":"false");
    }

    public String yes()
    {
	return "Ano";
    }

    public String no()
    {
	return "Ne";
    }

    public String newDirectoryTitle()
    {
	return "Nový adresář registru";
    }

    public String newDirectoryPrefix(String parentName)
    {
	return "Jméno podadresáře pro \"" + parentName + "\":";
    }

    public String directoryNameMayNotBeEmpty()
    {
	return Registr adresář nesmí být prázdný";
    }

    public String directoryInsertionRejected(String parentName, String dirName)
    {
	return "Vložení registru s adresářem s názvem \"" + dirName + "\" bylo odmítnuto";
    }

    public String newParameterTitle()
    {
    return "Nový parametr registru";
    }

    public String newParameterName()
    {
	return "Jméno nového parametru:";
    }

    public String 	newParameterType()
    {
	return "Typ nového parametru:";
    }

    public String parameterNameMayNotBeEmpty()
    {
	return "jméno parametru nesmí být prázdný";
    }

    public String invalidParameterType(String type)
    {
	return "\"" + type + "\" mení platným typem parametru";
    }

    public String parameterInsertionFailed()
    {
	return "Vložení nového parametru do registru selhalo";
    }

    public String savingOk()
    {
	return "Všechny změny byly uloženy úspěšně!";
    }

    public String savingFailed()
    {
	return "Některé ze změn nemohly být uloženy";
    }
}
