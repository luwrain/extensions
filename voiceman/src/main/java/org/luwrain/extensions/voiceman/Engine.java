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

package org.luwrain.extensions.voiceman;

import java.util.*;
import com.google.auto.service.*;
import org.apache.logging.log4j.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;

import static java.util.Objects.*;

@AutoService(org.luwrain.speech.Engine.class)
public final class Engine implements org.luwrain.speech.Engine
{
    static private final Logger log = LogManager.getLogger();

    @Override public String getExtObjName()
    {
	return "voiceman";
    }

    @Override public Set<Engine.Features>  getFeatures()
    {
	return EnumSet.of(Engine.Features.CAN_SYNTH_TO_SPEAKERS);
    }

    @Override public Channel newChannel(Map<String, String> params)
    {
	requireNonNull(params, "params");
	try {
	    return new Channel(params);
	}
	catch(Exception e)
	{
	    log.error("Unable to create the new VoiceMan channel:" + e.getMessage());
	    return null;
	}
		}
}
