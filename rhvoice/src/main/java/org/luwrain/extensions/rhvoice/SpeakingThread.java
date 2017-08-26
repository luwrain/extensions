/*
   Copyright 2012-2017 Michael Pozhidaev <michael.pozhidaev@gmail.com>
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

package org.luwrain.extensions.rhvoice;

import java.nio.*;
import javax.sound.sampled.*;
import javax.sound.sampled.AudioFormat.Encoding;


import com.github.olga_yakovleva.rhvoice.*;

import org.luwrain.core.*;
import org.luwrain.speech.Channel.Listener;

class SpeakingThread implements Runnable
{
    static private final String LOG_COMPONENT = Channel.LOG_COMPONENT;
    static private final int AUDIO_LINE_BUFFER_SIZE=3200; // minimal req value is 3200 (1600 samples max give rhvoice and each one 2 byte size
	static private final float FRAME_RATE = 24000f;

    private final Listener listener;
    private final String text;
    private final Channel channel;
    private boolean interrupt = false;

    SpeakingThread(String text,Listener listener, Channel channel)
    {
	NullCheck.notNull(text, "text");
	this.listener = listener;
	this.text = text;
	this.channel = channel;
    }

    @Override public void run()
    {
	synchronized(channel){
	final AudioFormat audioFormat = createAudioFormat();
	final SourceDataLine audioLine = createAudioLine(audioFormat);
	if (audioLine == null)
	    return;
	try {
	    try {
		channel.tts.speak(text, channel.params, (samples)->{
			try {
			    final ByteBuffer buffer=ByteBuffer.allocate(samples.length * audioFormat.getFrameSize());
			    buffer.order(ByteOrder.LITTLE_ENDIAN);
			    buffer.asShortBuffer().put(samples);
			    final byte[] bytes = buffer.array();
			    audioLine.write(bytes, 0, bytes.length);
			    if(interrupt)
			    {
audioLine.flush();
				return false;
			    }
			}
			catch(Exception e)
			{
			    Log.error("rhvoice", "unable to speak");
			    e.printStackTrace();
			    return false;
			}
			return true;
		    });
		if (!interrupt)
		    audioLine.drain();
		if(listener != null) 
		    listener.onFinished(-1);
	    } 
	    catch(RHVoiceException e)
	    {
		if(listener != null) 
		    listener.onFinished(-1);
		Log.error("rhvoice", "rhvoice error:" + e.getClass().getName() + ":" + e.getMessage());
		return;
	    }
	}
	finally {
	    audioLine.stop();
	    audioLine.close();
	}
	}
    }

    void interrupt()
    {
	interrupt = true;
    }

    static private AudioFormat createAudioFormat()
    {
	return new AudioFormat(Encoding.PCM_SIGNED, FRAME_RATE, 
			       Short.SIZE, 1, (1 * Short.SIZE / 8), FRAME_RATE, false);
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
