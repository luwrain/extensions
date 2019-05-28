
package org.luwrain.extensions.speechd;

import java.util.*;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;
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
			Log.error(LOG_COMPONENT, "Unable to create the command line speech channel:" + e.getClass().getName() + ":" + e.getMessage());
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
