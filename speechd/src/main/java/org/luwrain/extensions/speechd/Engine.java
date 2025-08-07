/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>

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
import org.apache.logging.log4j.*;
import com.google.auto.service.*;

@AutoService(org.luwrain.speech.Engine.class)
public final class Engine implements org.luwrain.speech.Engine
{
    static private final Logger log = LogManager.getLogger();

    @Override public String getExtObjName()
    {
	return "speechd";
    }

    @Override public Channel newChannel(Map<String, String> params)
    {
	try {
	    return new org.luwrain.extensions.speechd.Channel(params);
	}
	catch(Exception e)
	{
	    log.error("Unable to create the speech-dispatcher channel", e);
	    return null;
	}
    }

    @Override public Set<Engine.Features>  getFeatures()
    {
	return EnumSet.of(Engine.Features.CAN_SYNTH_TO_SPEAKERS, Engine.Features.CAN_NOTIFY_WHEN_FINISHED);
    }
}
