
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

	    new org.luwrain.speech.Engine()
	    {
		@Override public String getExtObjName()
		{
		    return "picotts";
		}
		@Override public Channel newChannel(Map<String, String> params)
		{
		    return new Channel();
		}
		    @Override public Set<Engine.Features> getFeatures()
    {
	return EnumSet.of(Features.CAN_SYNTH_TO_SPEAKERS,Features.CAN_NOTIFY_WHEN_FINISHED); // 
    }
	    },

	};
    }
}
