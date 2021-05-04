/*
   Copyright 2012-2021 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.extensions.bintts;

import java.nio.*;
import javax.sound.sampled.*;
import javax.sound.sampled.AudioFormat.Encoding;

import org.luwrain.core.*;
import org.luwrain.speech.Channel.Listener;
import org.luwrain.util.*;

final class Player implements Runnable
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;
    static private final int AUDIO_LINE_BUFFER_SIZE=3200; // minimal req value is 3200 (1600 samples max give rhvoice and each one 2 byte size
	static private final float FRAME_RATE = 24000f;

    private final Listener listener;
    private final String text;
    private final Channel channel;
    private AudioFormat audioFormat;
    private SourceDataLine audioLine = null;
    private boolean interrupt = false;

    Player(String text,Listener listener, Channel channel, AudioFormat audioFormat)
    {
	NullCheck.notNull(text, "text");
	NullCheck.notNull(channel, "channel");
	NullCheck.notNull(audioFormat, "audioFormat");
	this.listener = listener;
	this.text = text;
	this.channel = channel;
	this.audioFormat = audioFormat;
    }

    @Override public void run()
    {
	try {
	final Process p = new ProcessBuilder("").start();
	    this.audioLine = createAudioLine(audioFormat);
	if (audioLine == null)
	    return;
	try {
	    //	    StreamUtils.copyAllBytes(null, audioLine);
			    if(interrupt)
			    {
				//audioLine.flush();
				//				return false;
			    }
	}
			catch(Exception e)
			{
			    Log.error(LOG_COMPONENT, "unable to speak");
			    //			    return false;
			}
		if (!interrupt)
		    audioLine.drain();
		if(listener != null) 
		    listener.onFinished(-1);
    /*
	finally {
	    synchronized(this) {
	    if (!interrupt)
	    audioLine.stop();
	    audioLine.close();
	    }
	}
	}
    */
	}
	catch(Throwable e)
	{
	    e.printStackTrace();
	}
}

    void interrupt()
    {
	synchronized(this) {
	    interrupt = true;
	if (audioLine != null)
	    audioLine.stop();
    }
}

    static private SourceDataLine createAudioLine(AudioFormat audioFormat)
    {
	NullCheck.notNull(audioFormat, "audioFormat");
	try {
	    final DataLine.Info info = new DataLine.Info(SourceDataLine.class, audioFormat);
	    final SourceDataLine audioLine = (SourceDataLine) AudioSystem.getLine(info);
	    audioLine.open(audioFormat,AUDIO_LINE_BUFFER_SIZE);
	    audioLine.start();
	    return audioLine;
	} 
	catch(Exception e)
	{
	    Log.error(LOG_COMPONENT, "unable to init audio line:" + e.getClass().getName() + ":" + e.getMessage());
	    return null;
	}
    }
}
