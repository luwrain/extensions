/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>

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

import java.util.*;
import java.io.*;
import java.nio.*;
import java.nio.file.*;
import javax.sound.sampled.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;

final class Channel implements org.luwrain.speech.Channel
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;

    Channel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
    }

    @Override public String getChannelName()
    {
	return "BinTTS";
    }

    @Override public org.luwrain.speech.Voice[] getVoices()
    {
	return new Voice[0];
    }

    @Override public long speak(String text,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	NullCheck.notNull(text, "text");
	/*
	final SynthesisParameters p = new SynthesisParameters();
	p.setVoiceProfile(voiceName);
	p.setRate(convRate(relRate));
	p.setPitch(convPitch(relPitch));
   	p.setSSMLMode(false);
	runThread(text,listener, p);
	*/
	return -1;
    }

    @Override public long speakLetter(char letter,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	/*
	final SynthesisParameters p = new SynthesisParameters();
	p.setVoiceProfile(voiceName);
	p.setRate(convRate(relRate));
	p.setPitch(convPitch(relPitch) + (Character.isUpperCase(letter)?UPPER_CASE_PITCH_MODIFIER:0));
   	p.setSSMLMode(false);
	runThread("" + letter, listener, p);
	*/
   	return -1;
    }

    private void runThread(String text, Listener listener)
    {
	/*
	NullCheck.notNull(text, "text");
	NullCheck.notNull(params, "params");
	if (thread != null)
	    thread.interrupt();
	thread = new SpeakingThread(text, listener, this, params);
	new Thread(thread).start();
	*/
    }

    @Override public void silence()
    {
	/*
	if (thread != null)
	    thread.interrupt();
	thread = null;
	*/
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return null;//new AudioFormat[]{SpeakingThread.createAudioFormat()};
    }

    @Override public void setVoice(String name)
    {
    }

    @Override public String getVoiceName()
    {
	return "";
    }

    @Override public void close()
    {
    }
}
