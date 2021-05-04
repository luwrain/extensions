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

import java.io.*;
import javax.sound.sampled.*;
import javax.sound.sampled.AudioFormat.Encoding;

import org.luwrain.core.*;
import org.luwrain.speech.Channel.Listener;
import org.luwrain.util.*;

final class Player implements Runnable
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;
        static private final int AUDIO_LINE_BUFFER_SIZE=3200; // minimal req value is 3200 (1600 samples max give rhvoice and each one 2 byte size

    private final Listener listener;
    private final String text;
    private AudioFormat audioFormat;
    private SourceDataLine audioLine = null;
    boolean done = false;

    Player(String text,Listener listener, AudioFormat audioFormat)
    {
	NullCheck.notNull(text, "text");
	 	NullCheck.notNull(audioFormat, "audioFormat");
	this.listener = listener;
	this.text = text;
	this.audioFormat = audioFormat;
    }

    @Override public void run()
    {
	final Process p;
	final BufferedInputStream is;
			try {
 p = new ProcessBuilder("/bin/bash", "-c", "echo proba | freephone -h /usr/share/freespeech/lexicon -m | /usr/local/bin/mbrola /usr/share/mbrola/en1/en1 - -").start();
		p.getOutputStream().close();
		p.getErrorStream().close();
 is = new BufferedInputStream(p.getInputStream());
			}
			catch(IOException e)
			{
			    Log.error(LOG_COMPONENT, "unable to run the bintts player: " + e.getClass().getName() + ": " + e.getMessage());
			    e.printStackTrace();
			    return;
			}
		int len = 0;
				final byte[] buf = new byte[2048];

	try {
	    try {
		this.audioLine = createAudioLine(audioFormat);
		if (audioLine == null)
		    return;
		final byte[] trimBuf = new byte[2];
		trimBuf[0] = 0;
		trimBuf[1] = 0;
		while(trimBuf[0] == 0 && trimBuf[1] == 0)
		{
len = is.read(trimBuf);
if (len == 0)
    return;
		}
		    //		    if (audioLine.isRunning())
			audioLine.write(trimBuf, 0, len);
len = is.read(buf);
		while(len > 0)
		{
			audioLine.write(buf, 0, len);
					    if (!audioLine.isRunning())
			    return;
		    len = is.read(buf);
		}
		if (audioLine.isRunning())
			audioLine.drain();
		if(listener != null) 
		    listener.onFinished(-1);
    }
	finally {
		    audioLine.stop();
		    audioLine.close();
		    len = is.read(buf);
		    while (len > 0)
			len = is.read(buf);
		    is.close();
				done = true;
	    }
	    	}
	    catch(Throwable e)
	    {
		Log.error(LOG_COMPONENT, "unable to call bintts and speak the output: " + e.getClass().getName() + ": " + e.getMessage());
		e.printStackTrace();
		return;
	    }

    }

    void interrupt()
    {
	if (audioLine != null)
	    audioLine.stop();
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
