/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.extensions.speechd;

import java.util.*;
import java.util.concurrent.*;
import java.io.*;
import javax.sound.sampled.AudioFormat;
import speechd.ssip.*;
import org.apache.logging.log4j.*;

import org.luwrain.speech.*;

public final class Channel implements org.luwrain.speech.Channel, SSIPEventHandler
{
    static private final Logger log = LogManager.getLogger();

    final SSIPClient client;
    private Listener listener = null;

    Channel(Map<String, String> params) throws Exception
    {
	client = new SSIPClient("LUWRAIN", null, null);
	if (client == null)
	    throw new Exception("Unable to create a speech dispatcher client");
	if (params.containsKey("output"))
	    client.setOutputModule(params.get("output"));
	if (params.containsKey("lang"))
	    client.setLanguage(params.get("lang"));
	if (params.containsKey("voice"))
	    client.setVoice(params.get("voice"));
	client.setNotification(true);
	client.setEventHandler(this);
    }

    @Override public void handleSSIPEvent (SSIPEvent event)
    {
	if (event == null || event.getType() == null)
	    return;
	if (this.listener == null)
	    return;
	switch(event.getType())
	{
	case END:
	    listener.onFinished(-1);
	    listener = null;
	    break;
	default:
	    return;
	}
    }

    @Override public String getChannelName()
    {
	return "Speech dispatcher";
    }

    @Override public String getVoiceName()
    {
	return "";
    }

    @Override public void setVoice(String name)
    {
    }

    @Override public Voice[] getVoices()
    {
	return new Voice[0];
    }

    @Override public long speak(String text, Listener listener,
				int relPitch, int relRate, boolean cancelPrevious)
    {
	try {
	    client.setPitch(relPitch * 2);
	    client.setRate(-1 * relRate * 2);
	    this.listener = listener;
	    client.say(SSIPPriority.TEXT, text);
	}
	catch(Exception e)
	{
	    log.error("Unable to speak a text", e);
	}
	return -1;
    }

    @Override public long speakLetter(char letter, Listener listener,
				      int relPitch, int relRate, boolean cancelPrevious)
    {
	try {
	    client.setPitch(relPitch * 2);
	    client.setRate(-1 * relRate * 2);
	    this.listener = listener;
	    client.sayChar(SSIPPriority.TEXT, letter);
	}
	catch(Exception e)
	{
	    log.error("Unable to speak a text", e);
	}
	return -1;
    }

    @Override public Result synth(String text, OutputStream stream, AudioFormat format, SyncParams params, Set<Flags> flags)
    {
	return new Result(Result.Type.NOT_IMPLEMENTED);
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[0];
    }

    @Override public void silence()
    {
	try {
	    this.listener = null;
	    client.stop();
	}
	catch(Exception e)
	{
	    log.error("Unable to stop speaking", e);
	}
    }

    @Override public void close()
    {
	try {
	    this .listener = null;
	    client.close();
	}
	catch(Exception e)
	{
	    log.error("NABLE to close the connection", e);
	}
    }
}
