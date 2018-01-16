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

package org.luwrain.extensions.voiceman;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;
import org.luwrain.speech.*;
import org.luwrain.cpanel.*;

public final class Extension extends EmptyExtension
{
    @Override public String init(Luwrain luwrain)
    {
	return null;
    }

    @Override public ExtensionObject[] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	return new ExtensionObject[]{

	    new org.luwrain.speech.Factory()
	    {
		@Override public String getExtObjName()
		{
		    return "voiceman";
		}
		@Override public Channel newChannel()
		{
		    return new VoiceMan();
		}
		@Override public org.luwrain.cpanel.Section newSettingsSection(org.luwrain.cpanel.Element el, String registryPath)
		{
		    NullCheck.notNull(el, "el");
		    NullCheck.notEmpty(registryPath, "registryPath");
		    final Settings settings = Settings.create(luwrain.getRegistry(), registryPath);
		    return new SimpleSection(el, settings.getName("VoiceMan channel"),
					     (controlPanel)->SettingsForm.create(controlPanel, registryPath)
					     );
		}
	    },

	};
    }
}
