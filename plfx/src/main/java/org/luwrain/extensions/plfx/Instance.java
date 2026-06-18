// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.extensions.plfx;

import java.net.*;

import javafx.scene.media.*;

import org.luwrain.core.*;
import org.luwrain.graphical.*;

/**
 * Implementation of {@link MediaResourcePlayer.Instance} that uses
 * JavaFX {@link MediaPlayer} for playback of MP3 audio.
 * <p>
 * All interactions with JavaFX media classes are performed on the
 * JavaFX application thread via {@link FxThread}. Playback runs
 * asynchronously; the background task waits for the media to finish
 * naturally or to be stopped.
 */
final class Instance implements org.luwrain.core.MediaResourcePlayer.Instance
{
    static final String LOG_COMPONENT = "plfx";

    private final Luwrain luwrain;
    private final MediaResourcePlayer.Listener listener;
    private Runnable task = null;
    private volatile boolean finishing = false;
    private volatile MediaPlayer mediaPlayer = null;
    private final Object doneLock = new Object();
    private boolean done = false;
    private volatile Throwable playError = null;

    Instance(Luwrain luwrain, MediaResourcePlayer.Listener listener)
    {
	NullCheck.notNull(luwrain, "luwrain");
	NullCheck.notNull(listener, "listener");
	this.luwrain = luwrain;
	this.listener = listener;
    }

    @Override public MediaResourcePlayer.Result play(URL url, MediaResourcePlayer.Params params)
    {
	if (params.playFromMsec < 0)
	    throw new IllegalArgumentException("params.playFromMsec (" + params.playFromMsec + ") may not be negative");
	if (params.volume < 0 || params.volume > 100)
	    throw new IllegalArgumentException("params.volume (" + params.volume + ") must be between 0 and 100 inclusively");
	this.finishing = false;
	this.done = false;
	this.playError = null;
	this.task = () -> {
	    try {
		final long[] lastNotifiedMsec = {params.playFromMsec};
		// Initialize MediaPlayer on JavaFX thread
		FxThread.runSync(() -> {
		    try {
			final javafx.scene.media.Media media = new javafx.scene.media.Media(url.toExternalForm());
			Instance.this.mediaPlayer = new javafx.scene.media.MediaPlayer(media);
			Instance.this.mediaPlayer.setVolume(params.volume / 100.0);

			if (params.playFromMsec > 0)
			    Instance.this.mediaPlayer.setStartTime(javafx.util.Duration.millis(params.playFromMsec));

			// Notify the initial position once the player is ready
			Instance.this.mediaPlayer.setOnReady(() -> {
			    listener.onPlayerTime(Instance.this, params.playFromMsec);
			});

			// Track current time and notify the listener periodically
			Instance.this.mediaPlayer.currentTimeProperty().addListener((obs, oldVal, newVal) -> {
			    if (!finishing && newVal != null)
			    {
				final long msec = (long) newVal.toMillis();
				if (msec > lastNotifiedMsec[0] + 50)
				{
				    lastNotifiedMsec[0] = msec;
				    listener.onPlayerTime(Instance.this, msec);
				}
			    }
			});

			// Signal completion when playback reaches the end
			Instance.this.mediaPlayer.setOnEndOfMedia(() -> {
			    synchronized (doneLock)
			    {
				if (!finishing)
				{
				    done = true;
				    doneLock.notifyAll();
				}
			    }
			});

			// Signal error when playback fails
			Instance.this.mediaPlayer.setOnError(() -> {
			    playError = Instance.this.mediaPlayer.getError();
			    synchronized (doneLock)
			    {
				if (!finishing)
				{
				    done = true;
				    doneLock.notifyAll();
				}
			    }
			});

			Instance.this.mediaPlayer.play();
		    }
		    catch (Throwable e)
		    {
			playError = e;
			synchronized (doneLock)
			{
			    done = true;
			    doneLock.notifyAll();
			}
		    }
		});

		// Block until playback finishes naturally or is stopped
		synchronized (doneLock)
		{
		    while (!done && !finishing)
		    {
			try {
			    doneLock.wait();
			}
			catch (InterruptedException e)
			{
			    Thread.currentThread().interrupt();
			    break;
			}
		    }
		}
	    }
	    catch (Throwable e)
	    {
		Log.error(LOG_COMPONENT, e.getClass().getName() + ":" + e.getMessage());
		e.printStackTrace();
		finishing = true;
		if (e instanceof Exception)
		    listener.onPlayerError((Exception)e);
		else
		    listener.onPlayerError(new Exception(e));
		return;
	    }
	    finally
	    {
		// Dispose the player on JavaFX thread
		FxThread.runAsync(() -> {
		    if (Instance.this.mediaPlayer != null)
		    {
			Instance.this.mediaPlayer.stop();
			Instance.this.mediaPlayer.dispose();
			Instance.this.mediaPlayer = null;
		    }
		});
		finishing = true;
		if (playError != null)
		{
		    if (playError instanceof Exception)
			listener.onPlayerError((Exception)playError);
		    else
			listener.onPlayerError(new Exception(playError));
		}
		else
		    listener.onPlayerFinish(Instance.this);
	    }
	};
	luwrain.executeBkg(task);
	return new MediaResourcePlayer.Result();
    }

    @Override public void setVolume(int value)
    {
	if (value < 0 || value > 100)
	    throw new IllegalArgumentException("value (" + value + ") must be between 0 and 100 (inclusively)");
	FxThread.runAsync(() -> {
	    if (mediaPlayer != null)
		mediaPlayer.setVolume(value / 100.0);
	});
    }

    @Override public void stop()
    {
	if (finishing)
	    return;
	finishing = true;
	FxThread.runAsync(() -> {
	    if (mediaPlayer != null)
		mediaPlayer.stop();
	});
	synchronized (doneLock)
	{
	    doneLock.notifyAll();
	}
    }
}
