/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>
   Copyright 2015-2016 Roman Volovodov <gr.rPman@gmail.com>

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

package org.luwrain.extensions.plmp3;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.*;
import java.util.*;
import java.util.concurrent.*;
import javax.sound.sampled.*;

import javazoom.jl.player.advanced.*;
import javazoom.jl.decoder.*;
import javazoom.jl.player.*;

import org.luwrain.base.*;
import org.luwrain.core.*;

final class Instance implements org.luwrain.base.MediaResourcePlayer.Instance
{
    static final String LOG_COMPONENT = "jlayer";

    private final Luwrain luwrain;
    private final MediaResourcePlayer.Listener listener;
    private FutureTask task = null; 
    private boolean finishing = false;
    private CustomDevice device = null;

    Instance(Luwrain luwrain, MediaResourcePlayer.Listener listener)
    {
	NullCheck.notNull(luwrain, "luwrain");
	NullCheck.notNull(listener, "listener");
	this.luwrain = luwrain;
	this.listener = listener;
    }

    @Override public MediaResourcePlayer.Result play(URL url, MediaResourcePlayer.Params params)
    {
	NullCheck.notNull(url, "url");
	NullCheck.notNull(params, "params");
	NullCheck.notNull(params.flags, "params.flags");
	if (params.playFromMsec < 0)
	    throw new IllegalArgumentException("params.playFromMsec (" + params.playFromMsec + ") may not be negative");
	if (params.volume < 0 || params.volume > 100)
	    throw new IllegalArgumentException("params.volume (" + params.volume + ") must be between 0 and 100 inclusively");
	finishing = false;
	task = new FutureTask(()->{
		try {
		    AudioInputStream stream = null;
		    try {
			long currentFrame = 0;
			float currentPosition = 0;
			long lastNotifiedMsec = 0;
			final BufferedInputStream bufferedIn = new BufferedInputStream(url.openStream());
			stream = AudioSystem.getAudioInputStream(bufferedIn);
			final AudioFormat bitFormat = stream.getFormat();
			device = new CustomDevice(params.volume);
			if(device==null)
			{
			    Log.error(LOG_COMPONENT, "unable to create an audio device for playing");
			    listener.onPlayerError(new Exception("Unable to create an audio device for playing"));
			    return;
			}
			final Decoder decoder=new Decoder();
			device.open(decoder);
			final Bitstream bitstream = new Bitstream(stream);
			while(currentPosition < params.playFromMsec)
			{
			    final Header frame = bitstream.readFrame();
			    if (frame == null)
			    {
				Log.warning(LOG_COMPONENT, "unable to read new frame before starting position is reached");
				return;
			    }
			    ++currentFrame;
			    currentPosition = currentFrame * frame.ms_per_frame();
			    bitstream.closeFrame();
			}
			//starting real playing
			listener.onPlayerTime(Instance.this, new Float(currentPosition).longValue());
			while(true)
			{
			    if(finishing || Thread.currentThread().isInterrupted())
				return;
			    final Header frame = bitstream.readFrame();
			    if(frame == null)
			    {
				Log.debug(LOG_COMPONENT, "unable to read new frame, exiting");
				return;
			    }
			    final SampleBuffer output = (SampleBuffer) decoder.decodeFrame(frame, bitstream);
			    synchronized (this) {
				device.write(output.getBuffer(), 0, output.getBufferLength());
			    }
			    ++currentFrame;
			    currentPosition = currentFrame * frame.ms_per_frame();
			    if (currentPosition > lastNotifiedMsec + 50)
			    {
				lastNotifiedMsec = new Float(currentPosition).longValue();
				listener.onPlayerTime(Instance.this, lastNotifiedMsec);
			    }
			    bitstream.closeFrame();
			} //playing
		    }
		    finally
		    {
			if(device != null)
			    device.close();
			if(stream != null)
			    stream.close();
			finishing = true;
			listener.onPlayerFinish(Instance.this);
		    }
		}
		catch (Exception e)
		{
		    Log.error(LOG_COMPONENT, e.getClass().getName() + ":" + e.getMessage());
		    finishing = true;
		    listener.onPlayerError(e);
		}
	    }, null);
	luwrain.executeBkg(task);
	return new MediaResourcePlayer.Result();
    }

    @Override public void setVolume(int value)
    {
	if (value < 0 || value > 100)
	    throw new IllegalArgumentException("value (" + value + ") must be between 0 and 100 (inclusively)");
	if (device != null)
	    device.setVolume(value);
    }

    @Override public void stop()
    {
	if (finishing)
	    return;
	finishing = true;
	if (task != null)
	    task.cancel(true);
    }
}
