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

package org.luwrain.extensions.cmdtts;

import org.luwrain.core.*;
import org.luwrain.speech.Channel2.Listener;

final class Current
{
    private Chunk chunk = null;

    synchronized void set(Chunk chunk)
    {
	if (chunk == null)
	    return;
	this.chunk = chunk;
    }

    synchronized Chunk get()
    {
	final Chunk res = chunk;
	chunk = null;
	return res;
    }

    synchronized void clear()
    {
	chunk = null;
    }
}
