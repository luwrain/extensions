/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

   This file is part of LUWRAIN.

   LUWRAIN is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public
   License as published by the Free Software Foundation; either
   version 3 of the License, or (at your option) any later version.

   LUWRAIN is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.
*/

Luwrain.addCommand("cbrf-usd", ()=>{
    Luwrain.executeBkg(()=>{
	const now = Luwrain.now;
	const day = now.dayOfMonth < 10?"0" + now.dayOfMonth:"" + now.dayOfMonth;
	const month = now.month < 10?"0" + now.month:"" + now.month;
	const year = "" + now.year;
	const url = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + day + "/" + month + "/" + year;
	const res = Luwrain.urlGet(url);
    });
});
