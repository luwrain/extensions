/*
   Copyright 2012-2020 Michael Pozhidaev <msp@luwrain.org>
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

import java.util.*;
import java.io.*;
import java.nio.*;
import java.nio.file.*;
import javax.sound.sampled.*;

import com.github.olga_yakovleva.rhvoice.RHVoiceException;
import com.github.olga_yakovleva.rhvoice.SynthesisParameters;
import com.github.olga_yakovleva.rhvoice.TTSClient;
import com.github.olga_yakovleva.rhvoice.TTSEngine;
import com.github.olga_yakovleva.rhvoice.VoiceInfo;

import org.luwrain.core.*;
import org.luwrain.speech.*;

final class Channel implements org.luwrain.speech.Channel
{
    static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;
    static private final double UPPER_CASE_PITCH_MODIFIER = 3.0;
    static private final double RATE_MIN  = 0.5;
    static private final double RATE_MAX  = 2.0;

    private final TTSEngine tts;
    private final String voiceName;
    private SpeakingThread thread = null;

    Channel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	final Path dataPath = Paths.get("rhvoice", "data");
	final Path configPath = Paths.get("rhvoice", "config");
	final Path enPath = Paths.get("data", "languages", "English");
	final Path ruPath = Paths.get("data", "languages", "Russian");
	//TTSEngine.init();
	this.tts = new TTSEngine(dataPath.toString(), configPath.toString(), new String[]{
		enPath.toString(),
		ruPath.toString(),
	    }, (tag, level, message)->{});
	//this.tts.configure("use_pseudo_english", "false");
	if (params.containsKey("voice") && !params.get("voice").isEmpty())
	    this.voiceName = params.get("voice"); else
	    this.voiceName = suggestVoice();
	if (voiceName == null || voiceName.trim().isEmpty())
	    throw new Exception("Unable to get suitable voice name");
    }

    @Override public String getChannelName()
    {
	return "RHVoice";
    }

    private String suggestVoice()
    {
	String voiceRu = null;
	String voiceEn = null;
	final List<VoiceInfo> voices = tts.getVoices();
	for(VoiceInfo voice: voices)
	{
	    if(voiceRu == null && voice.getLanguage().getName().equals("Russian")) 
		voiceRu = voice.getName();
	    if(voiceEn == null && voice.getLanguage().getName().equals("English")) 
		voiceEn = voice.getName();
	}
	if(voiceRu == null && voiceEn == null)
	{
    	    Log.warning(LOG_COMPONENT, "no voices neither Russian nor English");
	    return "";
	}
	if(voiceRu == null)
	    return voiceEn;
	if(voiceEn == null)
	    return voiceRu;
	return voiceRu + "+" + voiceEn;
    }

    @Override public org.luwrain.speech.Voice[] getVoices()
    {
    	final org.luwrain.speech.Voice[] voices=new org.luwrain.speech.Voice[tts.getVoices().size()];
    	int i = 0;
    	for(VoiceInfo voice:tts.getVoices())
	    voices[i++]=new RHVoice(voice.getName());
    	return voices;
    }

    @Override public long speak(String text,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	NullCheck.notNull(text, "text");
	final SynthesisParameters p = new SynthesisParameters();
	p.setVoiceProfile(voiceName);
	p.setRate(convRate(relRate));
	p.setPitch(convPitch(relPitch));
   	p.setSSMLMode(false);
	runThread(text,listener, p);
	return -1;
    }

    @Override public long speakLetter(char letter,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	final SynthesisParameters p = new SynthesisParameters();
	p.setVoiceProfile(voiceName);
	p.setRate(convRate(relRate));
	p.setPitch(convPitch(relPitch) + (Character.isUpperCase(letter)?UPPER_CASE_PITCH_MODIFIER:0));
   	p.setSSMLMode(false);
	runThread("" + letter, listener, p);
   	return -1;
    }

    private void runThread(String text, Listener listener, SynthesisParameters params)
    {
	NullCheck.notNull(text, "text");
	NullCheck.notNull(params, "params");
	if (thread != null)
	    thread.interrupt();
	thread = new SpeakingThread(text, listener, this, params);
	new Thread(thread).start();
    }


    @Override public Result synth(String text, OutputStream stream, AudioFormat format, SyncParams params, Set<Flags> flags)
    {
	NullCheck.notNull(text, "text");
	NullCheck.notNull(stream, "stream");
	NullCheck.notNull(format, "format");
	NullCheck.notNull(params, "params");
	NullCheck.notNull(flags, "flags");
	if (text.trim().isEmpty())
	    return new Result();
	final SynthesisParameters p = new SynthesisParameters();
	p.setVoiceProfile(voiceName);
	p.setRate(convRate(params.getRate()));
	p.setPitch(convPitch(params.getPitch()));
   	p.setSSMLMode(false);
	try {
	    tts.speak(text, p, new TTSClient(){
		    @Override public boolean setSampleRate(int sampleRate)
		    {
			return true;
		    }
		    @Override public boolean playSpeech(short[] samples)
		    {
		    try {
			final ByteBuffer buffer=ByteBuffer.allocate(samples.length * 2);//FIXME:real frame size
			buffer.order(ByteOrder.LITTLE_ENDIAN);
			buffer.asShortBuffer().put(samples);
			final byte[] bytes = buffer.array();
			stream.write(bytes);
		    }
		    catch(IOException e)
		    {
			Log.error(LOG_COMPONENT, "unable to speak");
			return false;
		    }
		    return true;
		    }});
	    return new Result();
	} 
	catch(RHVoiceException e)
	{
	    Log.error(LOG_COMPONENT, "rhvoice error:" + e.getClass().getName() + ":" + e.getMessage());
	    return new Result(Result.Type.FAILED, e);
	}
    }
    
    @Override public void silence()
    {
	if (thread != null)
	    thread.interrupt();
	thread = null;
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[]{SpeakingThread.createAudioFormat()};
    }

    @Override public void setVoice(String name)
    {
    }

    @Override public String getVoiceName()
    {
	return voiceName;
    }

    @Override public void close()
    {
	silence();
	//FIXME:is anything else needed there?
    }

    TTSEngine getTtsEngine()
    {
	return tts;
    }

    static private double convRate(int value)
    {
	final double range = RATE_MAX - RATE_MIN;
    	return RATE_MIN + range - (double)(value + 50) * range / 100f;
    }

    static private double convPitch(int value)
    {
	if (value < -50)
	    return 0;
	if (value > 50)
	    return 2.0;
	if (value < 0)
	    return ((double)value + 50) / 100;
	return ((double)value / 50) * 1.5 + 0.5;
    }
}
