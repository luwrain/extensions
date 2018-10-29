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

import java.util.*;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;
import org.luwrain.cpanel.*;

public final class Extension extends EmptyExtension
{
    static final String LOG_COMPONENT = "cmdtts";

    @Override public ExtensionObject[] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	return new ExtensionObject[]{

	    new org.luwrain.speech.Engine(){
		@Override public String getExtObjName()
		{
		    return "cmdtts";
		}
		@Override public Channel2 newChannel(Map<String, String> params)
		{
		    NullCheck.notNull(params, "params");
		    return new org.luwrain.extensions.cmdtts.Channel();
		}
		@Override public Set<Factory2.Features>  getFeatures()
		{
		    return EnumSet.of(Features.CAN_SYNTH_TO_STREAM, Features.CAN_SYNTH_TO_SPEAKERS, Features.CAN_NOTIFY_WHEN_FINISHED);
		}
	    },
	};
    }
}
