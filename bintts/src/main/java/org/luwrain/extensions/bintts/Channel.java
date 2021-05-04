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

import java.util.*;
import java.io.*;
//import java.nio.*;
//import java.nio.file.*;
import javax.sound.sampled.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;
import org.luwrain.util.*;

final class Channel implements org.luwrain.speech.Channel
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;

    private Player player = null;
    private final AudioFormat audioFormat;

    Channel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	this.audioFormat = SoundUtils.createAudioFormat("signed,mono, 16bit,16000");
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
	if (player != null && !player.done)
	    player.interrupt();
	player = new Player(text, listener, audioFormat);
	new Thread(player).start();
	return -1;
    }

    @Override public long speakLetter(char letter,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
   	return -1;
    }

        @Override public Result synth(String text, OutputStream stream, AudioFormat format, SyncParams params, Set<Flags> flags)
    {
	return null;
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
	return new AudioFormat[]{this.audioFormat};
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
