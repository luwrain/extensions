
package org.luwrain.extensions.plmp3;

import org.luwrain.base.*;
import org.luwrain.core.*;

class Player implements MediaResourcePlayer
{
    @Override public Instance newMediaResourcePlayer(Listener listener)
    {
	NullCheck.notNull(listener, "listener");
	return new org.luwrain.extensions.plmp3.Instance(listener);
    }

    @Override public String getSupportedMimeType()
    {
	return "mp3";//FIXME:
    }

    @Override public String getExtObjName()
    {
	return "mp3";
    }
}
