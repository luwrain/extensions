// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>
// Copyright 2015-2016 Roman Volovodov <gr.rPman@gmail.com>

package org.luwrain.extensions.plmp3;

import com.google.auto.service.*;
import org.luwrain.core.*;

@AutoService(MediaResourcePlayer.class)
public final class Player implements MediaResourcePlayer
{
    @Override public Instance newMediaResourcePlayer(Luwrain luwrain, Listener listener)
    {
	return new org.luwrain.extensions.plmp3.Instance(luwrain, listener);
    }

    @Override public String getSupportedMimeType()
    {
	return ContentTypes.SOUND_MP3_DEFAULT;
    }

    @Override public String getExtObjName()
    {
	return "mp3";
    }
}
