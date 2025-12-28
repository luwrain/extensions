// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.extensions.plmp3;

import org.luwrain.base.*;

class Listener implements MediaResourcePlayer.Listener
{
    volatile long msec = -1;
    volatile boolean finished = false;
    volatile Exception exception = null;

    @Override public void onPlayerTime(MediaResourcePlayer.Instance instance, long msec)
    {
	this.msec = msec;
    }

    @Override public void onPlayerFinish(MediaResourcePlayer .Instance instance)
    {
	this.finished = true;
    }

    @Override public void onPlayerError(Exception e)
    {
	this.exception = e;
    }
}
