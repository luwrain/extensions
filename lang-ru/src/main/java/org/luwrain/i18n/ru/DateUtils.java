/*
   Copyright 2012-2024 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.i18n.ru;

import java.util.*;
import org.luwrain.core.NullCheck;

class DateUtils
{
    private final Date now = new Date();

    String passedTimeFull(Date moment)
    {
	final long wasTime = moment.getTime();
	final long nowTime = now.getTime();
	final long passed = nowTime - wasTime;
	final long secondsTotal = passed / 1000;
	final long minutesTotal = secondsTotal / 60;
	final long seconds = secondsTotal - (minutesTotal * 60);
	final long hoursTotal = minutesTotal / 60;
	final long minutes = minutesTotal - (hoursTotal * 60);
	final long daysTotal = hoursTotal / 24;
	final long hours = hoursTotal - (daysTotal * 24);
	final long weeksTotal = daysTotal / 7;
	final long days = daysTotal - (weeksTotal * 7);
	String res = "" + seconds + "сек.";
	if (minutes > 0)
	    res = "" + minutes + "мин. " + res;
	if (hours > 0)
	    res = "" + hours + "ч " + res;
	if (daysTotal > 0)
	    res = "" + daysTotal + "д. " + res;
	return res;
    }

    String passedTimeBrief(Date moment)
    {
	final long wasTime = moment.getTime();
	final long nowTime = now.getTime();
	final long passed = nowTime - wasTime;
	final long secondsTotal = passed / 1000;
	final long minutesTotal = secondsTotal / 60;
	final long hoursTotal = minutesTotal / 60;
	final long daysTotal = hoursTotal / 24;
	final long weeksTotal = daysTotal / 7;
	if (weeksTotal > 0)
	    return weeksTotal + " " + Lang.afterNum((int)weeksTotal, "недель", "неделя", "недели");
	if (daysTotal > 0)
	    return daysTotal + " " + Lang.afterNum((int)daysTotal, "дней", "день", "дня");
	if (hoursTotal > 0)
	    return hoursTotal + " " + Lang.afterNum((int)hoursTotal, "часов", "час", "часа");
	if (minutesTotal > 0)
	    return minutesTotal + " " + Lang.afterNum((int)minutesTotal, "минут", "минута", "минуты");
	if (secondsTotal > 0)
	    return secondsTotal + " " + Lang.afterNum((int)secondsTotal, "секунд", "секунда", "секунды");
	return "меньше секунды";
    }

    static String dateTime(Date moment)
    {
	if (moment == null)
	    throw new NullPointerException("moment may not be null");
	final StringBuilder b = new StringBuilder();
	b.append(addZeroes(moment.getHours(), 2) + ":" + addZeroes(moment.getMinutes(), 2));
	b.append(", ");
	b.append(moment.getDate() + " " + month(moment.getMonth() + 1) + " " + (moment.getYear() + 1900) + "г.");
	return b.toString();
    }

    static String date(Date moment)
    {
	NullCheck.notNull(moment, "moment");
return moment.getDate() + " " + month(moment.getMonth() + 1) + " " + (moment.getYear() + 1900) + "г.";
    }


    static private String month(int m)
    {
	switch (m)
	{
	case 1:
	    return "января";
	case 2:
	    return "февраля";
	case 3:
	    return "марта";
	case 4:
	    return "апреля";
	case 5:
	    return "мая";
	case 6:
	    return "июня";
	case 7:
	    return "июля";
	case 8:
	    return "августа";
	case 9:
	    return "сентября";
	case 10:
	    return "октября";
	case 11:
	    return "ноября";
	case 12:
	    return "декабря";
	default:
	    return "";
	}
    }

    static private String  addZeroes(int num, int z)
    {
	String res = "" + num;
	while (res.length() < z)
	    res = "0" + res;
	return res;
    }
}
