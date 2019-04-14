/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>
   Copyright 2015-2016 Roman Volovodov <gr.rPman@gmail.com>

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

package org.luwrain.extensions.plmp3;

import org.luwrain.base.*;
import org.luwrain.core.*;

final class Player implements MediaResourcePlayer
{
    private final Luwrain luwrain;

    Player(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	this.luwrain = luwrain;
    }

    @Override public Instance newMediaResourcePlayer(Listener listener)
    {
	NullCheck.notNull(listener, "listener");
	return new org.luwrain.extensions.plmp3.Instance(luwrain, listener);
    }

    @Override public String getSupportedMimeType()
    {
	return ContentTypes.SOUND_MP3_DEFAULT;
    }

    @Override public String getExtObjName()
    {
	return "mp3";
    }
}
