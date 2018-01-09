
package org.luwrain.extensions.plmp3;

import org.luwrain.base.*;
import org.luwrain.core.*;
import org.luwrain.core.extensions.*;

public class Extension extends EmptyExtension
{
    private final Player player = new Player();

    @Override public ExtensionObject[] getExtObjects(Luwrain luwrain)
    {
	NullCheck.notNull(luwrain, "luwrain");
		return new ExtensionObject[]{ player };
    }
}
