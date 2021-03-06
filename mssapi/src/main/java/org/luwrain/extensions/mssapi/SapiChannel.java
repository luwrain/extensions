/*
   Copyright 2012-2018 Michael Pozhidaev <michael.pozhidaev@gmail.com>
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

package org.luwrain.extensions.mssapi;

import java.io.*;
import java.util.*;
import javax.sound.sampled.AudioFormat;

import org.luwrain.core.*;
import org.luwrain.speech.*;

final class SapiChannel implements org.luwrain.speech.Channel
{
        static private final String LOG_COMPONENT = Extension.LOG_COMPONENT;
	static private final int UPPER_CASE_PITCH_MODIFIER=30;
    static private final int COPY_WAV_BUF_SIZE=1024;

    private final SAPIImpl impl = new SAPIImpl();
    private int curPitch = 100;
    private int curRate = 60;
    private final File tempFile;

    SapiChannel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	final int count = impl.searchVoiceByAttributes(params.containsKey("cond")?params.get("cond"):null);
	if(count == -1)
	    throw new Exception("unable to find a suitable voice due to unexpected error");
    	final String voiceId = impl.getNextVoiceIdFromList();
	final int res = impl.selectCurrentVoice();
	if(res != 0)
	    throw new Exception("unable to select the voice which was found");
	this.tempFile = File.createTempFile("sapi", ".tmp.wav");
    }

    @Override public long speak(String text,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	NullCheck.notNull(text, "text");
	//	if(relPitch!=0)
	impl.pitch(/*limit100(curPitch+relPitch)*/10);
	
	//	if(relRate!=0)
	    impl.rate(/*convRate(limit100(curRate+relRate))*/10);
	    //	impl.speak(text,SAPIImpl_constants.SPF_ASYNC|SAPIImpl_constants.SPF_IS_NOT_XML|(cancelPrevious?SAPIImpl_constants.SPF_PURGEBEFORESPEAK:0));
	    new Thread(()->{
		    	impl.speak(text,SAPIImpl_constants.SPF_IS_NOT_XML| SAPIImpl_constants.SPF_PURGEBEFORESPEAK);
			listener.onFinished(-1);
			
	    }).start();
	if(relPitch!=0)
	    impl.pitch(curPitch);
	if(relRate!=0)
	    impl.rate(convRate(curRate));
	return -1;
    }

    /*
    @Override public StreamedSpeaking createStreamedSpeaking(int pitch, int rate, AudioFormat format)
    {
	return new StreamedSpeaking(){
	    @Override public boolean speak(String text, OutputStream stream)
	    {
		NullCheck.notNull(text, "text");
		NullCheck.notNull(stream, "stream");
		impl.stream(tempFile.getPath(),chooseSAPIAudioFormatFlag(format));
		if(pitch!=0)
		    impl.pitch(limit100(curPitch+pitch));
		if(rate!=0)
		    impl.rate(convRate(limit100(curRate+rate)));
		impl.speak(text,SAPIImpl_constants.SPF_IS_NOT_XML);
		if(pitch!=0)
		    impl.pitch(curPitch);
		if(rate!=0)
		    impl.rate(convRate(curRate));
		impl.stream(null,SAPIImpl_constants.SPSF_Default);
		//Copying the whole file to the stream, except of 44 wave header
		try {
		    final FileInputStream is=new FileInputStream(tempFile.getPath());
		    final byte[] buf=new byte[COPY_WAV_BUF_SIZE];
		    while(true)
		    {
			final int len=is.read(buf);
			if(len == -1)
			    break;
			stream.write(buf,0,len);
		    }
		} catch(Exception e)
		{
		    Log.warning(LOG_COMPONENT, "unable to copy synthesized data:" + e.getMessage());
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

    @Override public long speakLetter(char letter,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
    	NullCheck.notNull(letter, "letter");
    	if(relPitch!=0)
    	    impl.pitch(limit100(curPitch+relPitch));
    	if(relRate!=0)
    	    impl.rate(convRate(limit100(curRate+relRate)));
    	impl.speak(SSML.upperCasePitchControl(""+letter,UPPER_CASE_PITCH_MODIFIER),SAPIImpl_constants.SPF_ASYNC|SAPIImpl_constants.SPF_IS_XML|(cancelPrevious?SAPIImpl_constants.SPF_PURGEBEFORESPEAK:0));
    	if(relPitch!=0)
    	    impl.pitch(curPitch);
    	if(relRate!=0)
    	    impl.rate(convRate(curRate));
    	return -1;
    }

    @Override public void silence()
    {
    	impl.speak("", SAPIImpl.SPF_PURGEBEFORESPEAK);
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return null;
    }

    @Override public Voice[] getVoices()
    {
	impl.searchVoiceByAttributes(null);
	final List<Voice> voices = new LinkedList(); 
	String id;
	while((id = impl.getNextVoiceIdFromList()) != null)
	    voices.add(new SAPIVoice(id,impl.getLastVoiceDescription(),false)); // FIXME: get male flag from SAPI if it possible
	return voices.toArray(new Voice[voices.size()]);
    }

    @Override public String getChannelName()
    {
	return "Microsoft Speech API";
    }

            @Override public Result synth(String text, OutputStream stream, AudioFormat format, SyncParams params, Set<Flags> flags)
    {
	return new Result(Result.Type.NOT_IMPLEMENTED);
    }


    /*
    @Override public void setDefaultPitch(int value)
    {
    	curPitch=limit100(value);
    	impl.pitch(curPitch);
    }

    @Override public void setDefaultRate(int value)
    {
    	curRate=limit100(value);
	impl.rate(convRate(curRate));
    }
    */

    @Override public void setVoice(String name)
    {
    }

    @Override public String getVoiceName()
    {
	return "default";
    }

    @Override public void close()
    {
    }

    private int limit100(int value)
    {
	if(value<0) value=0;
	if(value>100) value=100;
	return value;
    }

    private int chooseSAPIAudioFormatFlag(AudioFormat format)
    {
	int sapiaudio=SAPIImpl_constants.SPSF_Default;
	if(format.getChannels()==1)
	{ // mono
	    if(format.getSampleSizeInBits()==8)
	    {
		if(format.getFrameRate()<= 8000000) sapiaudio=SAPIImpl_constants.SPSF_8kHz8BitMono;else
		    if(format.getFrameRate()<=11000000) sapiaudio=SAPIImpl_constants.SPSF_11kHz8BitMono;else
			if(format.getFrameRate()<=12000000) sapiaudio=SAPIImpl_constants.SPSF_12kHz8BitMono;else
			    if(format.getFrameRate()<=16000000) sapiaudio=SAPIImpl_constants.SPSF_16kHz8BitMono;else
				if(format.getFrameRate()<=22000000) sapiaudio=SAPIImpl_constants.SPSF_22kHz8BitMono;else
				    if(format.getFrameRate()<=24000000) sapiaudio=SAPIImpl_constants.SPSF_24kHz8BitMono;else
					if(format.getFrameRate()<=32000000) sapiaudio=SAPIImpl_constants.SPSF_32kHz8BitMono;else
					    if(format.getFrameRate()<=44000000) sapiaudio=SAPIImpl_constants.SPSF_44kHz8BitMono;else
						if(format.getFrameRate()<=48000000) sapiaudio=SAPIImpl_constants.SPSF_48kHz8BitMono;else
						    Log.warning(LOG_COMPONENT, "Audioformat sample frame too big "+format.getFrameRate());
	    } else
		if(format.getSampleSizeInBits()==16)
		{
		    if(format.getFrameRate()<= 8000000) sapiaudio=SAPIImpl_constants.SPSF_8kHz16BitMono;else
			if(format.getFrameRate()<=11000000) sapiaudio=SAPIImpl_constants.SPSF_11kHz16BitMono;else
			    if(format.getFrameRate()<=12000000) sapiaudio=SAPIImpl_constants.SPSF_12kHz16BitMono;else
				if(format.getFrameRate()<=16000000) sapiaudio=SAPIImpl_constants.SPSF_16kHz16BitMono;else
				    if(format.getFrameRate()<=22000000) sapiaudio=SAPIImpl_constants.SPSF_22kHz16BitMono;else
					if(format.getFrameRate()<=24000000) sapiaudio=SAPIImpl_constants.SPSF_24kHz16BitMono;else
					    if(format.getFrameRate()<=32000000) sapiaudio=SAPIImpl_constants.SPSF_32kHz16BitMono;else
						if(format.getFrameRate()<=44000000) sapiaudio=SAPIImpl_constants.SPSF_44kHz16BitMono;else
						    if(format.getFrameRate()<=48000000) sapiaudio=SAPIImpl_constants.SPSF_48kHz16BitMono;else
							Log.warning(LOG_COMPONENT, "Audioformat sample frame too big "+format.getFrameRate());
		} else
		{
		    Log.warning(LOG_COMPONENT, "Audioformat sample size can be 8 or 16 bit, but specified "+format.getSampleSizeInBits());
		}
	} else
	{ // stereo
	    if(format.getSampleSizeInBits()==8)
	    {
		if(format.getFrameRate()<= 8000000) sapiaudio=SAPIImpl_constants.SPSF_8kHz8BitStereo;else
		    if(format.getFrameRate()<=11000000) sapiaudio=SAPIImpl_constants.SPSF_11kHz8BitStereo;else
			if(format.getFrameRate()<=12000000) sapiaudio=SAPIImpl_constants.SPSF_12kHz8BitStereo;else
			    if(format.getFrameRate()<=16000000) sapiaudio=SAPIImpl_constants.SPSF_16kHz8BitStereo;else
				if(format.getFrameRate()<=22000000) sapiaudio=SAPIImpl_constants.SPSF_22kHz8BitStereo;else
				    if(format.getFrameRate()<=24000000) sapiaudio=SAPIImpl_constants.SPSF_24kHz8BitStereo;else
					if(format.getFrameRate()<=32000000) sapiaudio=SAPIImpl_constants.SPSF_32kHz8BitStereo;else
					    if(format.getFrameRate()<=44000000) sapiaudio=SAPIImpl_constants.SPSF_44kHz8BitStereo;else
						if(format.getFrameRate()<=48000000) sapiaudio=SAPIImpl_constants.SPSF_48kHz8BitStereo;else
						    Log.warning(LOG_COMPONENT, "Audioformat sample frame too big "+format.getFrameRate());
	    } else
		if(format.getSampleSizeInBits()==16)
		{
		    if(format.getFrameRate()<= 8000000) sapiaudio=SAPIImpl_constants.SPSF_8kHz16BitStereo;else
			if(format.getFrameRate()<=11000000) sapiaudio=SAPIImpl_constants.SPSF_11kHz16BitStereo;else
			    if(format.getFrameRate()<=12000000) sapiaudio=SAPIImpl_constants.SPSF_12kHz16BitStereo;else
				if(format.getFrameRate()<=16000000) sapiaudio=SAPIImpl_constants.SPSF_16kHz16BitStereo;else
				    if(format.getFrameRate()<=22000000) sapiaudio=SAPIImpl_constants.SPSF_22kHz16BitStereo;else
					if(format.getFrameRate()<=24000000) sapiaudio=SAPIImpl_constants.SPSF_24kHz16BitStereo;else
					    if(format.getFrameRate()<=32000000) sapiaudio=SAPIImpl_constants.SPSF_32kHz16BitStereo;else
						if(format.getFrameRate()<=44000000) sapiaudio=SAPIImpl_constants.SPSF_44kHz16BitStereo;else
						    if(format.getFrameRate()<=48000000) sapiaudio=SAPIImpl_constants.SPSF_48kHz16BitStereo;else
							Log.warning(LOG_COMPONENT, "Audioformat sample frame too big "+format.getFrameRate());
		} else
		{
		    Log.warning(LOG_COMPONENT, "Audioformat sample size can be 8 or 16 bit, but specified "+format.getSampleSizeInBits());
		}
	}
	return sapiaudio;
    }

    /** convert rate from range 0..100 where 0 slowest, 100 fastest to sapi -10..+10 where -10 is fastest and +10 slowest */
    private int convRate(int rate100)
    {
    	return Math.round((10-rate100/5));
    }
}
