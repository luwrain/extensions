
package org.luwrain.extensions.picotts;

import java.util.*;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;
import org.luwrain.speech.*;

public final class Extension extends EmptyExtension
{
    @Override public ExtensionObject [] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
	return new ExtensionObject[]{

	    new org.luwrain.speech.Factory2()
	    {
		@Override public String getExtObjName()
		{
		    return "picotts";
		}
		@Override public Channel2 newChannel(Map<String, Object> params)
		{
		    return new Channel();
		}
		    @Override public Set<Factory2.Features> getFeatures()
    {
	return EnumSet.of(Features.CAN_SYNTH_TO_SPEAKERS,Features.CAN_NOTIFY_WHEN_FINISHED); // 
    }
				@Override public org.luwrain.cpanel.Section newSettingsSection(org.luwrain.cpanel.Element el, String registryPath)
		{
		    return null;
		}
	    },

	};
    }
}
