/*
   Copyright 2012-2018 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

package org.luwrain.extensions.voiceman;

import java.util.*;
import javax.sound.sampled.AudioFormat;

import java.net.*;
import java.io.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;

final class VoiceMan implements Channel2
{
    static private final String DEFAULT_NAME = "voiceman";
    static private final String DEFAULT_HOST = "localhost";
    static private final int DEFAULT_PORT = 5511;

    private Socket sock = null;
    private PrintStream output = null;
    private int defaultPitch = 50;
    private int defaultRate = 50;
    private String name = DEFAULT_NAME;
    private boolean def = true;

    VoiceMan(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	final String host;
	if (params.containsKey("host"))
	    host = params.get("host"); else
	    host = DEFAULT_HOST;
	if (host.isEmpty())
	    throw new Exception("Empty host name given");
	final int port;
	if (params.containsKey("port"))
	{
	    try {
		port = Integer.parseInt(params.get("port"));
	    }
	    catch(NumberFormatException e)
	    {
		throw new Exception("Illegal port number: " + params.get("port"));
	    }
	} else
	    port = DEFAULT_PORT;
	if (!connect(host, port))
	    throw new Exception("Unable to establish a connection to the VoiceMan server at " + host + ":" + port);
    }

    private boolean connect(String host, int port)
    {
	try {
	    sock = new Socket(host, port);
	    output = new PrintStream(sock.getOutputStream(), true, "UTF-8");
	    return true;
	}
	catch(IOException e)
	{
	    sock = null;
	    output = null;
	    Log.error("voiceman", "unable to connect to " + host + ":" + port + ":" + e.getMessage());
	    e.printStackTrace();
	    return false;
	}
    }

    @Override public long speak(String text, Listener listener,
				int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	sendPitch(defaultPitch + relPitch);
	sendRate(defaultRate + relRate);
	sendText(text);
	sendPitch(defaultPitch);
	sendRate(defaultRate);
	return -1;
    }

    @Override public long speakLetter(char letter, Listener listener,
				      int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	sendPitch(defaultPitch + relPitch);
	sendRate(defaultRate + relRate);
	sendLetter(letter);
	sendPitch(defaultPitch);
	sendRate(defaultRate);
	return -1;
    }




    private void sendPitch(int value)
    {
	if (value < 0)
	    output.println("P:0"); else
	    if (value > 100)
		output.println("P:100"); else
		output.println("P:" + value);
    }

    private void sendRate(int value)
    {
	if (value < 0)
	    output.println("R:0"); else
	    if (value > 100)
		output.println("R:100"); else
		output.println("R:" + value);
    }

    private void sendText(String text)
    {
	NullCheck.notNull(text, "text");
	output.println("T:" + text.replaceAll("\n", " "));
    }

    private void sendLetter(char letter)
    {
	String s = "L:";
	s += letter;
	output.println(s);
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[0];
    }

    @Override public void close()
    {
	if (output != null)
	    output.close();
	try {
	    if (sock != null)
		sock.close();
	}
	catch(IOException e)
	{
	    e.printStackTrace();
	}
	output = null;
	sock = null;
    }

    @Override public void silence()
    {
	if (output == null)
	    return;
	output.println("S:");
	output.flush();
    }

    @Override public void setVoice(String name)
    {
    }


    @Override public String getChannelName()
    {
	return name;
    }

    @Override public String getVoiceName()
    {
	return "";
    }

    @Override public Voice[] getVoices()
    {
	return new Voice[0];
    }
}
