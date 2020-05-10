/*
   Copyright 2019-2020 Michael Pozhidaev <msp@luwrain.org>

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

var hex = '([0-9xa-fA-F]+)';
var dec = '([0-9]+)';
var delim = ' +';
var word = '([0-9a-zA-Z_-]+)';
var pattern = java.util.regex.Pattern.compile(" *" + dec + delim + word + delim + hex + delim + dec + delim + dec + delim + dec + delim + word + delim + word + delim + word + delim + dec + ".*");

function readSmart(driver, device)
{
    var res = [];
    var r = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream("out")));
    var line = r.readLine();
    while(line != null)
    {
	var m = pattern.matcher(line);
	if (m.find())
	{
	    var item = {
		id: m.group(1),
		name: m.group(2),
		flags: m.group(3),
		value: m.group(4),
		worst: m.group(5),
		threshold: m.group(6),
		type: m.group(7),
		updated: m.group(8),
		whenFailed: m.group(9),
		raw: m.group(10)
	    };
	    res.push(item);
	}	
	line = r.readLine();
    }
    return res;
}
