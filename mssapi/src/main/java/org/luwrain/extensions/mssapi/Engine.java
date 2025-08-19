/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>
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

package org.luwrain.extensions.mssapi;

import java.util.*;
import com.google.auto.service.*;
import org.apache.logging.log4j.*;

import org.luwrain.speech.*;

@AutoService(org.luwrain.speech.Engine.class)
public final class Engine implements org.luwrain.speech.Engine
{
    static private final Logger log = LogManager.getLogger();

    @Override public String getExtObjName()
    {
	return "mssapi";
    }

    @Override public Set<Engine.Features> getFeatures()
    {
	return EnumSet.of(Engine.Features.CAN_SYNTH_TO_STREAM, Engine.Features.CAN_SYNTH_TO_SPEAKERS); // , Features.CAN_NOTIFY_WHEN_FINISHED 
    }

    @Override public Channel newChannel(Map<String, String> params)
    {
	try {
	    return new SapiChannel(params);
	}
	catch(Exception e)
	{
	    log.error("Unable to create a SAPI channel", e);
	    return null;
	}
    }
}
