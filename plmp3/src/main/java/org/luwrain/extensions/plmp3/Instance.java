/*
   Copyright 2012-2022 Michael Pozhidaev <msp@luwrain.org>
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

import java.io.*;//BufferedInputStream;
//import java.io.InputStream;
import java.net.*;
//import java.util.*;
//import java.util.concurrent.*;
import javazoom.jl.decoder.*;

import org.luwrain.core.*;

final class Instance implements org.luwrain.core.MediaResourcePlayer.Instance
{
    static final String
	LOG_COMPONENT = "plmp3";

    private final Luwrain luwrain;
    private final MediaResourcePlayer.Listener listener;
    //    private FutureTask task = null;
    private Runnable task = null;
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
	if (params.playFromMsec < 0)
	    throw new IllegalArgumentException("params.playFromMsec (" + params.playFromMsec + ") may not be negative");
	if (params.volume < 0 || params.volume > 100)
	    throw new IllegalArgumentException("params.volume (" + params.volume + ") must be between 0 and 100 inclusively");
	this.finishing = false;
	this.task = ()->{
	    try {
		long currentFrame = 0;
		float currentPosition = 0;
		long lastNotifiedMsec = 0;
		try {
		    try (final InputStream is = new BufferedInputStream(url.openStream())){
			final Bitstream  bitstream;
			final Decoder  decoder;
			synchronized(Instance.this){
			    this.device = new CustomDevice(params.volume);
decoder=new Decoder();
			    this.device.open(decoder);
bitstream = new Bitstream(is);
			    while(currentPosition < params.playFromMsec)
			    {
				final Header frame = bitstream.readFrame();
				if (frame == null)
				    return;
				++currentFrame;
				currentPosition = currentFrame * frame.ms_per_frame();
				bitstream.closeFrame();
			    }
			}
			//Starting real playing
			listener.onPlayerTime(Instance.this, new Float(currentPosition).longValue());
			while(true)
			{
			    if(finishing || Thread.currentThread().isInterrupted())
				return;
			    final Header frame = bitstream.readFrame();
			    if(frame == null)
				return;
			    final SampleBuffer output = (SampleBuffer) decoder.decodeFrame(frame, bitstream);
			    synchronized (Instance.this) {
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
		}
		finally {
		    if(this.device != null)
			synchronized(Instance.this){
			    this.device.flush();
			    this.device.close();
			}
		    finishing = true;
		    listener.onPlayerFinish(Instance.this);
		}
	    }
	    catch (Throwable e)
	    {
		Log.error(LOG_COMPONENT, e.getClass().getName() + ":" + e.getMessage());
		e.printStackTrace();
		finishing = true;
		if (e instanceof Exception)
		    listener.onPlayerError((Exception)e); else
		    listener.onPlayerError(new Exception(e));
	    }
	};
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
	if (device != null)
	    synchronized(this) {
		this.device.close();
	    }
	finishing = true;
    }
}
