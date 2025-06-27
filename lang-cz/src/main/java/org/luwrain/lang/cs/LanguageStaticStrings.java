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

import org.luwrain.core.Langs;

public class LanguageStaticStrings implements org.luwrain.core.LanguageStaticStrings
{
    public String getString(int id)
    {
	switch (id)
	{
	case Langs.SPACE:
	    return "Mezera";
	case Langs.TAB:
	    return "Tab";
	case Langs.BEGIN_OF_LINE:
	    return "Začátek řádku";
	case Langs.END_OF_LINE:
	    return "Konec řádku";
	case Langs.EMPTY_LINE:
	    return "Prázdný řádek";
	case Langs.THE_FIRST_LINE:
	    return "Žádný text nad aktuálním řádkem";
	case Langs.THE_LAST_LINE:
	    return "Žádný text pod aktuálním řádkem";
	case Langs.AREA_BEGIN:
	    return "Začátek textu";
	case Langs.AREA_END:
	    return "Konec textu";
	case Langs.TREE_AREA_BEGIN:
	    return "Začátek stromu";
	case Langs.TREE_AREA_END:
	    return "Konec stromu";
	case Langs.BEGIN_OF_LIST:
	    return "Začátek seznamu";
	case Langs.END_OF_LIST:
	    return "Konec seznamu";
	case Langs.EMPTY_TREE:
	    return "Prázdný strom";
	case Langs.EMPTY_TREE_ITEM:
	    return "Prázdná položka stromu";
	case Langs.TREE_EXPANDED:
	    return "Rozbalen";
	case Langs.TREE_COLLAPSED:
	    return "Zbaleno";
	case Langs.TREE_LEVEL:
	    return "Úroveň";

	case Langs.NO_REQUESTED_ACTION:
	    return "Vložená akce je systému neznámá";
	case Langs.NO_ACTIVE_AREA:
	    return "Žádný aktivní objekt";
	case Langs.APPLICATION_INTERNAL_ERROR:
	    return "Vykonávaná operace byla přerušena z důvodu vnitřní chyby v aplikaci";
	case Langs.APPLICATION_CLOSE_ERROR_HAS_POPUP:
	    return "Před ukončením aplikace musíte uzavřít všechna vyskakovací okna";
	case Langs.INSUFFICIENT_MEMORY_FOR_APP_LAUNCH:
	    return "Pro spuštění aplikace není dostatek paměti";
	case Langs.UNEXPECTED_ERROR_AT_APP_LAUNCH:
	    return "Spuštění bylo přerušeno z důvodu vnitřní chyby v aplikaci";
	case Langs.START_WORK_FROM_MAIN_MENU:
	    return "Začněte pracovat z hlavního menu!";
	case Langs.NO_LAUNCHED_APPS:
	    return "Všechny programy jsou uzavřeny";
	case Langs.LIST_NO_ITEMS:
	    return "V seznamu nejsou žádné položky";
	case Langs.FONT_SIZE:
	    return "Velikost fontu:";
	case Langs.QUIT_CONFIRM_NAME:
	    return "Vypnutí Luwrarin";
	case Langs.QUIT_CONFIRM:
	    return "Jste si jistý že si přejete zkončit?";
	case Langs.OPEN_POPUP_NAME:
	    return "Otevřít soubor";
	case Langs.OPEN_POPUP_PREFIX:
	    return "Zadejte jméno souboru který si přejete otevřít:";
	case Langs.NO_TABLE_ROWS:
	    return "Žádné buňky v tabulce"; 
	case Langs.NO_TABLE_ROWS_ABOVE:
	    return "Výše nejsou žádné další buňky tabulky"; 
	case Langs.NO_TABLE_ROWS_BELOW:
	    return "Níže nejsou žádné buňky tabulky";
	case Langs.END_OF_TABLE_COL:
	    return "Konec sloupce";
	case Langs.MESSAGE:
	    return "Správa";
	case Langs.MESSAGE_TO:
	    return "Komu:";
	case Langs.MESSAGE_CC:
	    return "KK:";
	case Langs.MESSAGE_SUBJECT:
	    return "Předmět:";
	case Langs.MESSAGE_TEXT:
	    return "Níže zadejte text správy:";
	case Langs.MESSAGE_ATTACHMENT:
	    return "Příloha";
	case Langs.MESSAGE_ATTACHMENT_POPUP_TITLE:
	    return "Nová příloha";
	case Langs.MESSAGE_ATTACHMENT_POPUP_PREFIX:
	    return "Přiložený soubor:";
	case Langs.COPIED_LINES:
	    return "Řádky ke zkopírování";
	case Langs.CUT_LINES:
	    return "Vyjmuté řádky:";
	default:
	    return "#Unknown string identifier?#";
	}
    }
}
