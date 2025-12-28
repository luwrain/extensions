/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>
   Copyright 2025 Dmitriy Nikiforov
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

public class SAPIImpl
{
    static public final int
	SPF_DEFAULT = 0,
	SPF_ASYNC = 1,
	SPF_IS_XML = 8,
	SPF_IS_NOT_XML = 16,
	SPF_PURGEBEFORESPEAK = 2;

    //JNI functions with C++ implementation
    private native String getLastVoiceDescription();
    private native String getNextVoiceIdFromList();
    private native int selectCurrentVoice();
    private native int selectVoiceById(String id);
    private native int searchVoiceByAttributes(String cond);
    private native int speak(String text, int flags);
    private native int stream(String stream, int flags);
    private native int rate(int rate);
    private native int pitch(int pitch);
    private native int wait(int timeout);
    
    private int id;
    private static int idCounter = 0;
    private String selectedVoiceId = null;
    private boolean isSpeaking = false;

    static
    {
        System.loadLibrary("SAPIImpl");
        System.out.println("✓ SAPI библиотека загружена");
    }

    public SAPIImpl()
    {
        this.id = idCounter++;
    }

    public void speakText(String text)
    {
        stopSpeaking();
        int result = speak(text, SPF_ASYNC | SPF_IS_NOT_XML);
        if (result == 0)
            isSpeaking = true;
    }

    public void stopSpeaking()
    {
        if (isSpeaking)
	{
            speak("", SPF_PURGEBEFORESPEAK);
            isSpeaking = false;
        }
    }

    public void setRate(int rate)
    {
        rate(rate);
    }

    public void setPitch(int pitch)
    {
        pitch(pitch);
    }

    public String[] getAvailableVoices()
    {
        int count = searchVoiceByAttributes(null);
        if (count <= 0)
	    return new String[0];
        final String[] voices = new String[count];
        for (int i = 0; i < count; i++)
	{
            String id = getNextVoiceIdFromList();
            String desc = getLastVoiceDescription();
            voices[i] = desc + "|" + id;
        }
        return voices;
    }

    public boolean selectVoice(String voiceId)
    {
        if (selectVoiceById(voiceId) == 0)
	{
            selectedVoiceId = voiceId;
            return true;
        }
        return false;
    }

    public boolean selectFirstVoice()
    {
        int count = searchVoiceByAttributes(null);
        if (count > 0)
	{
            //Using the ID of the first voice
            String firstVoiceId = getNextVoiceIdFromList();
            //Choosing it
            if (selectVoiceById(firstVoiceId) == 0)
	    {
                selectedVoiceId = firstVoiceId;
                return true;
            }
        }
        return false;
    }

    public void waitUntilDone(int timeout)
    {
        wait(timeout);
    }
    
    public boolean setOutputToFile(String filename, int format)
    {
        return stream(filename, format) == 0;
    }

    public boolean setOutputToDefault()
    {
        return stream(null, 0) == 0;
    }

    public boolean isSpeaking()
    {
        return isSpeaking;
    }
}
