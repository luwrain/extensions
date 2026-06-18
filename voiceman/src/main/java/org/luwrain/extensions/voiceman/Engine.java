// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2026 Michael Pozhidaev <msp@luwrain.org>

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
