/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.extensions.speechd;

import java.util.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;

public final class Extension extends EmptyExtension
{
    static final String LOG_COMPONENT = "speechd";

    @Override public ExtensionObject[] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	return new ExtensionObject[]{
	    new org.luwrain.speech.Engine(){
		@Override public String getExtObjName()
		{
		    return "speechd";
		}
		@Override public Channel newChannel(Map<String, String> params)
		{
		    NullCheck.notNull(params, "params");
		    try {
			return new org.luwrain.extensions.speechd.Channel(params);
		    }
		    catch(Exception e)
		    {
			Log.error(LOG_COMPONENT, "Unable to create the speech-dispatcher channel:" + e.getClass().getName() + ":" + e.getMessage());
			return null;
		    }
		}
		@Override public Set<Engine.Features>  getFeatures()
		{
		    return EnumSet.of(Engine.Features.CAN_SYNTH_TO_SPEAKERS, Engine.Features.CAN_NOTIFY_WHEN_FINISHED);
		}
	    },
	};
    }
}
