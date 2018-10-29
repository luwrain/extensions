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

package org.luwrain.extensions.emacspeak;

import java.util.*;
import java.io.*;
import javax.sound.sampled.AudioFormat;

import org.luwrain.speech.*;
import org.luwrain.core.*;

final class Emacspeak implements Channel2
{
    private long nextId = 1;
    private boolean def = false;
    private String name = "";
    private String command = "";
    private Process process;
    private OutputStream stream;
    private BufferedWriter writer;
    private int defPitch = 50;
    private int defRate = 50;

    Emacspeak(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	if (!params.containsKey("exec") || params.get("exec").isEmpty())
	    throw new Exception("No emacspeak server given (must be provided with \'exec\' parameter)");
	command = params.get("exec");
	if (!startProcess())
	    throw new Exception("Unable to start emacspeak server with the command \'" + command + "\'");
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

    @Override public String getChannelName()
    {
	return"Emacspeak speech server (" + command + ")";
    }

    @Override public long speak(String text, Listener listener, int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	try {
	    writer.write("q {" + text + "}\n");
	    writer.write("d\n");
	writer.flush();
	stream.flush();
	}
	catch(IOException e)
	{
	    e.printStackTrace();
	}
	return -1;
    }

    @Override public long speakLetter(char letter, Listener listener,
				      int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	try {
	    writer.write("l {" + letter + "}\n");
	writer.flush();
	stream.flush();
	}
	catch(IOException e)
	{
	    e.printStackTrace();
	}
	return -1;
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[0];
    }

    @Override public void silence()
    {
	try {
	    writer.write("s\n");
	writer.flush();
	stream.flush();
	}
	catch(IOException e)
	{
	    e.printStackTrace();
	}
    }

    @Override public void close()
    {
    }

    private boolean startProcess()
    {
	try {
	process = new ProcessBuilder(command).start();
//	    p.getOutputStream().close();
	stream = process.getOutputStream();
	process.getInputStream().close();

writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));

	return true;
	}
	catch(IOException e)
	{
	    Log.error("linux", "unable to start an emacspeak server " + command + ":" + e.getMessage());
	    e.printStackTrace();
	    return false;
	}
    }
}
