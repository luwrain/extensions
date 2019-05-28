
package org.luwrain.extensions.speechd;

import java.util.*;
import java.util.concurrent.*;
import java.io.*;
import javax.sound.sampled.AudioFormat;
import speechd.ssip.*;

import org.luwrain.linux.ProcessGroup;
import org.luwrain.speech.*;
import org.luwrain.core.*;

final class Channel implements org.luwrain.speech.Channel
{
    static final String LOG_COMPONENT = Extension.LOG_COMPONENT;

    final SSIPClient client;

    Channel(Map<String, String> params) throws Exception
    {
	NullCheck.notNull(params, "params");
	client = new SSIPClient("LUWRAIN", null, null);
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
	    client.say(SSIPPriority.TEXT, text);
	}
	catch(Exception e)
	{
	    Log.error(LOG_COMPONENT, "unable to speak a text:" + e.getClass().getName() + ":" + e.getMessage());
	}
	return -1;
    }

    @Override public long speakLetter(char letter, Listener listener,
				      int relPitch, int relRate, boolean cancelPrevious)
    {
	try {
	client.say(SSIPPriority.TEXT, "" + letter);
	}
	catch(Exception e)
	{
	    	    Log.error(LOG_COMPONENT, "unable to speak a text:" + e.getClass().getName() + ":" + e.getMessage());
	}
	return -1;
    }

    @Override public AudioFormat[] getSynthSupportedFormats()
    {
	return new AudioFormat[0];
    }

    @Override public void silence()
    {
    }

    @Override public void close()
    {
    }
}
