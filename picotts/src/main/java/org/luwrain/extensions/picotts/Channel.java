
package org.luwrain.extensions.picotts;

import java.util.*;
import java.io.*;
import java.nio.*;
import java.nio.file.*;
import javax.sound.sampled.*;

import org.luwrain.core.*;
import org.luwrain.speech.*;

final class Channel implements Channel2
{
    static final String LOG_COMPONENT = "picotts";


    @Override public org.luwrain.speech.Voice[] getVoices()
    {
	return new org.luwrain.speech.Voice[0];
    }

    @Override public String getChannelName()
    {
	return "FIXME";
    }


    @Override public long speak(String text,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	NullCheck.notNull(text, "text");
	runThread(text,listener);
	return -1;
    }

    @Override public long speakLetter(char letter,Listener listener,int relPitch,int relRate, boolean cancelPrevious)
    {
	runThread("" + letter, listener);
   	return -1;
    }

    private void runThread(String text, Listener listener)
    {
	NullCheck.notNull(text, "text");
	/*
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
	return new AudioFormat[]{SpeakingThread.createAudioFormat()};
    }

    @Override public void setVoice(String name)
    {
    }

    @Override public String getVoiceName()
    {
	return "FIXME";
    }

    @Override public void close()
    {
    }
}
