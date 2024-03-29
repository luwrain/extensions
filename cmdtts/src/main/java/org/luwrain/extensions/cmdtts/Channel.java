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

package org.luwrain.extensions.cmdtts;

import java.util.*;
import java.util.concurrent.*;
import java.io.*;
import javax.sound.sampled.AudioFormat;

import org.luwrain.linux.ProcessGroup;
import org.luwrain.speech.*;
import org.luwrain.core.*;

final class Channel implements org.luwrain.speech.Channel
{
    static final String LOG_COMPONENT = Extension.LOG_COMPONENT;
    static private final int BACKGROUND_THREAD_DELAY = 50;

    private final FutureTask task;
    private final ProcessGroup pg = new ProcessGroup();
    private final LinkedBlockingQueue<Chunk> chunks = new LinkedBlockingQueue<Chunk>(1024);
    private final Current current = new Current();

    private final String command;
    private final int sampleRate;
    private final int sampleSize;
    private final int numChannels;
    private final boolean signed;
    private final boolean bigEndian;

    private long nextId = 1;

    Channel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	if (!params.containsKey("cmd") || params.get("cmd").isEmpty())
	    throw new Exception("Unable to load the command speech channel: no command (must be given with \'cmd\' parameter)");
	this.command = params.get("cmd");
	if (params.containsKey("rate") && !params.get("rate").isEmpty())
	{
	    final int value;
	    try {
		value = Integer.parseInt("rate");
	    }
	    catch(NumberFormatException e)
	    {
		throw new Exception("Illegal sample rate value: " + params.get("rate"));
	    }
	    this.sampleRate = value;
	} else
	    this.sampleRate = 16000;
	if (params.containsKey("bits") && !params.get("bits").isEmpty())
	{
	    final int value;
	    try {
		value = Integer.parseInt("bits");
	    }
	    catch(NumberFormatException e)
	    {
		throw new Exception("Illegal sample size value: " + params.get("bits"));
	    }
	    this.sampleSize = value;
	} else
	    this.sampleSize = 16;
	if (params.containsKey("channels") && !params.get("channels").isEmpty())
	{
	    final int value;
	    try {
		value = Integer.parseInt("channels");
	    }
	    catch(NumberFormatException e)
	    {
		throw new Exception("Illegal number of channels: " + params.get("channels"));
	    }
	    this.numChannels = value;
	} else
	    this.numChannels = 1;
	if (params.containsKey("signed") && !params.get("signed").isEmpty())
	    this.signed = params.get("signed").equals("true"); else
	    this.signed = false;
	if (params.containsKey("bigendian") && !params.get("bigendian").isEmpty())
	    this.bigEndian = params.get("bigendian").equals("true"); else
	    this.bigEndian = false;
	this.task = createTask();
	Executors.newSingleThreadExecutor().execute(task);
    }

    @Override public String getChannelName()
    {
	return "Command line speech channel (" + command + ")";
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
	if (cancelPrevious)
	    silence();
	final long id = nextId++;
	try {
	    chunks.put(new Chunk(id, listener, command, text));
	}
	catch(InterruptedException e)
	{
	    Thread.currentThread().interrupt();
	}
	return id;
    }

    @Override public long speakLetter(char letter, Listener listener,
				      int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	final long id = nextId++;
	try {
	    chunks.put(new Chunk(id, listener, command, "" + letter));
	}
	catch(InterruptedException e)
	{
	    Thread.currentThread().interrupt();
	}
	return id;
    }

        @Override public Result synth(String text, OutputStream stream, AudioFormat format, SyncParams params, Set<Flags> flags)
    {
	return new Result(Result.Type.NOT_IMPLEMENTED);
    }


    /*
    @Override public StreamedSpeaking createStreamedSpeaking(int pitch, int rate, AudioFormat format)
    {
		NullCheck.notNull(format, "format");
		return new StreamedSpeaking() {
		    @Override public boolean speak(String text, OutputStream stream)
		    {
	NullCheck.notNull(text, "text");
	NullCheck.notNull(stream, "stream");
	try {
	    final Process p = new ProcessBuilder("/bin/bash", "-c", toStreamCommand).start();
	    final Writer w = new BufferedWriter(new OutputStreamWriter(p.getOutputStream()));
	    w.write(text);
	    w.close();
	    final InputStream in = p.getInputStream();
	    final byte[] buf = new byte[2048];
	    int length;
	    while ( (length = in.read(buf)) >= 0 )
		stream.write(buf, 0, length);
	    stream.flush();
	    p.waitFor();
	}
	catch(InterruptedException e)
	{
	    Thread.currentThread().interrupt();
	}
	catch (IOException e)
	{
	    Log.error(LOG_COMPONENT, "unable to launch a speech synthesizer  of the channel \'" + channelName + "\':" + e.getClass().getName() + ":" + e.getMessage());
	    return false;
	}
	return true;
		    }
		    @Override public void close()
		    {
		    }
		};
    }
    */

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[]{
	    new AudioFormat(
			    sampleRate,
			    sampleSize,
			    numChannels,
			    signed,
			    bigEndian
			    )};
    }

    
    @Override public void silence()
    {
	current.clear();
	chunks.clear();
	pg.stop();
    }

    @Override public void close()
    {
	task.cancel(true);
    }

    private FutureTask createTask()
    {
	return new FutureTask<>(()->{
		while (!Thread.currentThread().interrupted())
		{
		    try { Thread.sleep(BACKGROUND_THREAD_DELAY); }
		    catch (InterruptedException e)
		    { Thread.currentThread().interrupt(); }
		    if (!pg.busy())
		    {
			//Notifying listener about finishing, if there is any chunks designating current task
			final Chunk c = current.get();
			if (c != null && c.listener != null)
			    c.listener.onFinished(c.id);
		    }
		    if (chunks.isEmpty())
			continue;
		    try {
			Chunk c = chunks.take();
			pg.run(c.cmd, c.text);
			current.set(c);
		    }
		    catch (InterruptedException e)
		    { Thread.currentThread().interrupt(); }
		}
	}, null);
    }
}
