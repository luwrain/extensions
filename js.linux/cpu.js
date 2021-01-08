/*
   Copyright 2021 Michael Pozhidaev <msp@luwrain.org>

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

const LOG_COMPONENT = 'linux';
const Log = Luwrain.log;
const cpus = [];

const CPU_INFO_FILE = '/proc/cpuinfo';

const cpuInfoLines = Luwrain.readTextFile(CPU_INFO_FILE);
for(let i = 0;i < cpuInfoLines.length;i++) {
    const res = cpuInfoLines[i].match('^model name\\s*:\\s*(.*)$');
    if (res && res.length > 0)
    {
	const c = {id: cpus.length, modelName: res[1].trim()};
	Log.debug(LOG_COMPONENT, 'CPU #' + c.id + ': ' + c.modelName);
	cpus.push(c);
    }
}
