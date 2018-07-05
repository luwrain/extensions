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

class Channel extends ChannelBase
{
    static final String LOG_COMPONENT = "cmdtts";
    static private final int BACKGROUND_THREAD_DELAY = 50;

    private final Executor executor = Executors.newSingleThreadExecutor();
    private FutureTask task = null;
    private final ProcessGroup pg = new ProcessGroup();
    private final LinkedBlockingQueue<Chunk> chunks = new LinkedBlockingQueue<Chunk>(1024);
    private final Current current = new Current();

    private long nextId = 1;
    private String toSpeakersCommand = "";
    private String toStreamCommand = "";
    private int sampleRate = 16000;
    private int sampleSize = 16;
    private int numChannels = 1;
    private boolean signed = false;
    private boolean bigEndian = false;

    @Override public boolean initByRegistry(Registry registry, String path)
    {
	NullCheck.notNull(registry, "registry");
	NullCheck.notNull(path, "path");
	final Settings settings = Settings.create(registry, path);
	channelName = settings.getName("???");
	toSpeakersCommand = settings.getToSpeakersCommand("");
	toStreamCommand = settings.getToStreamCommand("");
	sampleRate = settings.getSampleRate(16000);
	sampleSize = settings.getSampleSize(16);
	numChannels = settings.getNumChannels(1);
	signed = settings.getSigned(true);
	bigEndian = settings.getBigEndian(false);
	defaultChannel = settings.getDefault(false);
	defaultRate = properRange(settings.getDefaultRate(50));
	defaultPitch = properRange(settings.getDefaultRate(50));
	task = createTask();
	executor.execute(task);
	return true;
    }

    @Override public boolean initByArgs(String[] args)
    {
	NullCheck.notNullItems(args, "args");
	if (args.length >= 1)
	    toSpeakersCommand = args[0];
	if (args.length >= 2)
	    channelName = args[1];
	if (args.length >= 3 && args[2].trim().toLowerCase().equals("default"))
	    defaultChannel = true; else
	    defaultChannel = false;
	if (channelName.isEmpty())
	channelName = "Command (" + toSpeakersCommand + ")";
	task = createTask();
	executor.execute(task);
	return true;
    }

    @Override public String getCurrentVoiceName()
    {
	return "";
    }

    @Override public void setCurrentVoice(String name)
    {
    }

    @Override public Voice[] getVoices()
    {
	return new Voice[0];
    }

    @Override public Set<Features>  getFeatures()
    {
	if (toSpeakersCommand != null && !toSpeakersCommand.isEmpty() &&
	    toStreamCommand != null && !toStreamCommand.isEmpty())
	    return EnumSet.of(Features.CAN_SYNTH_TO_STREAM, Features.CAN_SYNTH_TO_SPEAKERS, Features.CAN_NOTIFY_WHEN_FINISHED);
	if (toStreamCommand != null && !toStreamCommand.isEmpty())
	    return EnumSet.of(Features.CAN_SYNTH_TO_STREAM);
	    return EnumSet.of(Features.CAN_SYNTH_TO_SPEAKERS, Features.CAN_NOTIFY_WHEN_FINISHED);
    }

    @Override public long speak(String text, Listener listener,
				int relPitch, int relRate, boolean cancelPrevious)
    {
	if (cancelPrevious)
	    silence();
	final long id = nextId++;
	try {
	    chunks.put(new Chunk(id, listener, toSpeakersCommand, text));
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
	    chunks.put(new Chunk(id, listener, toSpeakersCommand, "" + letter));
	}
	catch(InterruptedException e)
	{
	    Thread.currentThread().interrupt();
	}
	return id;
    }

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
	return new FutureTask(()->{
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

    static private class Chunk
{
    final long id;
    final Listener listener;
    final String cmd;
    final String text;

    Chunk(long id, Listener listener, String cmd, String text)
    {
	NullCheck.notNull(cmd, "cmd");
	NullCheck.notNull(text, "text");
	this.id = id;
	this.listener = listener;
	this.cmd = cmd;
	this.text = text;
    }
}

static private class Current
{
    private Chunk chunk = null;

    synchronized void set(Chunk chunk)
    {
	if (chunk == null)
	    return;
	this.chunk = chunk;
    }

    synchronized Chunk get()
    {
	final Chunk res = chunk;
	chunk = null;
	return res;
    }

    synchronized void clear()
    {
	chunk = null;
    }
}
}
