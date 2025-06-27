/*
   Copyright 2012-2018 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

package org.luwrain.i18n.ro;

import java.util.*;

import org.luwrain.core.*;

class DateUtils
{
    private final Date now = new Date();

    String passedTimeFull(Date moment)
    {
	NullCheck.notNull(moment, "moment");
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
	String res = "" + seconds + "sec";
	if (minutes > 0)
	    res = "" + minutes + "min " + res;
	if (hours > 0)
	    res = "" + hours + "h " + res;
	if (daysTotal > 0)
	    res = "" + daysTotal + "d " + res;
	return res;
    }

    String pastTimeBrief(Date moment)
    {
	NullCheck.notNull(moment, "moment");
	final long wasTime = moment.getTime();
	final long nowTime = now.getTime();
	final long passed = nowTime - wasTime;
	final long secondsTotal = passed / 1000;
	final long minutesTotal = secondsTotal / 60;
	final long hoursTotal = minutesTotal / 60;
	final long daysTotal = hoursTotal / 24;
	final long weeksTotal = daysTotal / 7;
	if (weeksTotal > 0)
	    return weeksTotal + " " + (weeksTotal == 1?"week":"weeks");
	if (daysTotal > 0)
	    return daysTotal + " " + (daysTotal == 1?"day":"days");
	if (hoursTotal > 0)
	    return hoursTotal + " " + (hoursTotal == 1?"hour":"hours");
	if (minutesTotal > 0)
	    return minutesTotal + " " + (minutesTotal == 1?"minute":"minutes");
	if (secondsTotal > 0)
	    return secondsTotal + " " + (secondsTotal == 1?"second":"seconds");
	return "less than second";
    }

    static String dateTime(Date moment)
    {
	NullCheck.notNull(moment, "moment");
	final StringBuilder b = new StringBuilder();
	b.append(addZeroes(moment.getHours(), 2) + ":" + addZeroes(moment.getMinutes(), 2));
	b.append(", ");
	b.append(date(moment));
	return new String(b);
    }

    static String date(Date moment)
    {
	NullCheck.notNull(moment, "moment");
	return  month(moment.getMonth() + 1) + " " + moment.getDate() + ", " + (moment.getYear() + 1900) + "г.";
    }

    static private String month(int m)
    {
	switch (m)
	{
	case 1:
	    return "January";
	case 2:
	    return "February";
	case 3:
	    return "March";
	case 4:
	    return "April";
	case 5:
	    return "May";
	case 6:
	    return "June";
	case 7:
	    return "July";
	case 8:
	    return "August";
	case 9:
	    return "September";
	case 10:
	    return "October";
	case 11:
	    return "November";
	case 12:
	    return "December";
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
