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

public class FetchStringConstructor implements org.luwrain.app.fetch.StringConstructor
{
    public String appName()
    {
	return "Mail a stahování novinek";
    }

    public String noNewsGroupsData()
    {
	return "Žádné informace o diskusních skupinách!";
    }

    public String fetchingCompleted()
    {
	return "Načítání bylo dokončeno!";
    }

    public String newsGroupsError()
    {
	return "Při stahování  informací o diskusních skupinách se vyskytly chyby, přezkakuji stahování informací o diskusních skupinách";
    }

    public String noNewsGroups()
    {
	return "Žádné informace o diskusních skupinách, přezkakuji stahování informací o diskusních skupinách";
    }

    public String newsFetchingError(String groupName)
    {
	return "Při stahování informací diskusní skupiny \"" + groupName + "\", přezkakuji";
    }

    public String newsGroupFetched(String name, int fresh, int total)
    {
	return "Diskusní skupina " + name + " obsahuje " + fresh + " nových článků z " + total;
    }

    public String pressEnterToStart()
{
    return "Pro zahájení stahování infomrací o diskusních skupinách a mailech stiskněte Enter ";
	}

    public String processAlreadyRunning()
    {
	return "Stahování již probíhá";
    }

    public String processNotFinished()
    {
	return "Stahování ještě nebylo dokončeno";
    }

    public String readingMailFromAccount(String accountName)
    {
	return "Načítám mail z účtu \"" + accountName + "\"";
    }

    public String mailErrorWithAccount(String accountName)
    {
	return "Chyba při stahování mailu z účtu  \"" + accountName + "\", přezkakuji...";
    }

    public String connecting(String host)
    {
	return "Připojuji se k  " + host;
    }

    public String fetchedMailMessages(int count)
    {
	return "staženo zpráv: " + count;
    }

    public String noMailAccounts()
    {
	return "Žádné mailové účty, přezkakuji stahování mailů";
    }

    public String noMailStoring()
    {
	return ", Přezkakuji stahování E-mailů";
    }

    public String mailAccountsProblem()
    {
	return "Chyba při stahování seznamu E-mailových účtů, přezkakuji stahování E-mailů";
    }

    /*
    public String readingMailInFolder(String folder)
    {
	return "Otevírám složku \"" + folder + "\"";
    }

    public String readingMessage(int msgNum, int totalCount)
    {
	return "Načítám zprávu " + msgNum + "/" + totalCount;
    }

    public String noMail()
    {
	return "Žádný nový mail";
    }
*/
}
