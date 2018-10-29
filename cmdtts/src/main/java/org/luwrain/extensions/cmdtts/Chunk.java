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
import org.luwrain.speech.Channel.Listener;

final class Chunk
{
    final long id;
    final Listener listener;
    final String cmd;
    final String text;

    Chunk(long id, Listener listener, String cmd, String text)
    {
	NullCheck.notNull(cmd, "cmd");
	NullCheck.notNull(text, "text");
	this.id = id;
	this.listener = listener;
	this.cmd = cmd;
	this.text = text;
    }
}
