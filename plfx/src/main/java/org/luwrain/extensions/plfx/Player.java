// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2026 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.extensions.plfx;

import com.google.auto.service.*;

import org.luwrain.core.*;

/**
 * Media resource player implementation based on JavaFX Media support.
 * <p>
 * This player uses {@link javafx.scene.media.MediaPlayer} for playback,
 * which requires the JavaFX runtime to be initialized. It supports
 * MP3 audio streaming and local files.
 *
 * @see MediaResourcePlayer
 */
@AutoService(MediaResourcePlayer.class)
public final class Player implements MediaResourcePlayer
{
    @Override public Instance newMediaResourcePlayer(Luwrain luwrain, Listener listener)
    {
	return new org.luwrain.extensions.plfx.Instance(luwrain, listener);
    }

    @Override public String getSupportedMimeType()
    {
	return ContentTypes.SOUND_MP3_DEFAULT;
    }

    @Override public String getExtObjName()
    {
	return "fx";
    }
}
