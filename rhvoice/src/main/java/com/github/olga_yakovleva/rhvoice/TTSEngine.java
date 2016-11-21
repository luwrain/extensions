/* Copyright (C) 2013, 2014  Olga Yakovleva <yakovleva.o.v@gmail.com> */

/* This program is free software: you can redistribute it and/or modify */
/* it under the terms of the GNU Lesser General Public License as published by */
/* the Free Software Foundation, either version 3 of the License, or */
/* (at your option) any later version. */

/* This program is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the */
/* GNU Lesser General Public License for more details. */

/* You should have received a copy of the GNU Lesser General Public License */
/* along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package com.github.olga_yakovleva.rhvoice;

import java.util.List;
import java.util.Arrays;

public final class TTSEngine
{
    private long data;

    private static native void onClassInit();
    private native void onInit(String data_path,String config_path,String[] resource_paths,Logger logger) throws RHVoiceException;
    private native void onShutdown();
    private native VoiceInfo[] doGetVoices();
    private native void doSpeak(String text,SynthesisParameters params,TTSClient client) throws RHVoiceException;

    static public void init()
    {
    	System.out.println("rhvoice:loading library");
    	String libname="RHVoice."+System.getProperty("sun.arch.data.model");
    	System.loadLibrary(libname);
    	System.out.println("rhvoice:jni dynamic library loaded "+libname);
        onClassInit();
    }

    public TTSEngine(String data_path,String config_path,String[] resource_paths,Logger logger) throws RHVoiceException
    {
        onInit(data_path,config_path,resource_paths,logger);
    }

    public TTSEngine() throws RHVoiceException
    {
        this("data","config",new String[]{"data\\languages\\English","data\\languages\\Russian"},null);
    }

    public void shutdown()
    {
        onShutdown();
    }

    public List<VoiceInfo> getVoices()
    {
        return Arrays.asList(doGetVoices());
    }

    public void speak(String text,SynthesisParameters params,TTSClient client) throws RHVoiceException
    {
        if(params.getVoiceProfile()==null)
            throw new RHVoiceException("Voice not set");
        doSpeak(text,params,client);
    }
}
