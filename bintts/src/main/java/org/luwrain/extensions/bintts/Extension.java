/*
   Copyright 2012-2021 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.extensions.bintts;

import java.util.*;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;
import org.luwrain.speech.*;

public final class Extension extends EmptyExtension
{
    static final String LOG_COMPONENT = "bintts";

    @Override public ExtensionObject [] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	return new ExtensionObject[]{

	    new org.luwrain.speech.Engine()
	    {
		@Override public String getExtObjName() { return "bintts"; }
		@Override public Set<Engine.Features> getFeatures()
		{
		    return EnumSet.of(Engine.Features.CAN_SYNTH_TO_SPEAKERS, Engine.Features.CAN_NOTIFY_WHEN_FINISHED);
		}
		@Override public Channel newChannel(Map<String, String> params)
		{
		    NullCheck.notNull(params, "params");
		    try {
			return new Channel(params);
		    }
		    catch(Throwable e)
		    {
			Log.error(LOG_COMPONENT, "unable to create a bintts channel: " + e.getClass().getName() + ": " + e.getMessage());
			return null;
		    }
		}
	    },

	};
    }
}
