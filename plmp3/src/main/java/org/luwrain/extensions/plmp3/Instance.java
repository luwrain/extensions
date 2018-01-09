
package org.luwrain.extensions.plmp3;

import java.nio.file.*;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.*;
import java.util.*;
import java.util.concurrent.*;
import javax.sound.sampled.*;

import javazoom.jl.player.advanced.*;
import javazoom.jl.decoder.*;
import javazoom.jl.player.*;

import org.luwrain.base.*;
import org.luwrain.core.*;

class Instance implements org.luwrain.base.MediaResourcePlayer.Instance
{
    static private final String LOG_COMPONENT = "jlayer";

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final MediaResourcePlayer.Listener listener;
    private FutureTask task = null; 
    private boolean interrupting = false;
    private CustomDevice device = null;

    Instance(MediaResourcePlayer.Listener listener)
    {
	NullCheck.notNull(listener, "listener");
	this.listener = listener;
    }

    @Override public MediaResourcePlayer.Result play(URL url, long playFromMsec, Set<MediaResourcePlayer.Flags> flags)
    {
	NullCheck.notNull(url, "url");
	NullCheck.notNull(flags, "flags");
	interrupting = false;
	task = new FutureTask(()->{
		try {
		    AudioInputStream stream = null;
		    try {
			long currentFrame = 0;
			float currentPosition = 0;
			long lastNotifiedMsec = 0;
			final BufferedInputStream bufferedIn = new BufferedInputStream(url.openStream());
			stream = AudioSystem.getAudioInputStream(bufferedIn);
			final AudioFormat bitFormat = stream.getFormat();
			device = new CustomDevice(-10);
			if(device==null)
			{
			    Log.error(LOG_COMPONENT, "unable to create an audio device for playing");
			    listener.onPlayerError(new Exception("Unable to create an audio device for playing"));
			    return;
			}
			final Decoder decoder=new Decoder();
			device.open(decoder);
			final Bitstream bitstream = new Bitstream(stream);
			while(currentPosition < playFromMsec)
			{
			    final Header frame = bitstream.readFrame();
			    if (frame == null)
			    {
				Log.warning(LOG_COMPONENT, "unable to read new frame before starting position is reached");
				return;
			    }
			    ++currentFrame;
			    currentPosition = currentFrame * frame.ms_per_frame();
			    bitstream.closeFrame();
			}
			//starting real playing
			listener.onPlayerTime(Instance.this, new Float(currentPosition).longValue());
			while(true)
			{
			    //			    System.out.println("proba step");
			    if(interrupting || Thread.currentThread().isInterrupted())
				return;
			    final Header frame = bitstream.readFrame();
			    if(frame == null)
			    {
				Log.debug(LOG_COMPONENT, "unable to read new frame, exiting");
				return;
			    }
			    final SampleBuffer output = (SampleBuffer) decoder.decodeFrame(frame, bitstream);
			    synchronized (this) {
				device.write(output.getBuffer(), 0, output.getBufferLength());
			    }
			    ++currentFrame;
			    currentPosition = currentFrame * frame.ms_per_frame();
			    if (currentPosition > lastNotifiedMsec + 50)
			    {
				lastNotifiedMsec = new Float(currentPosition).longValue();
				listener.onPlayerTime(Instance.this, lastNotifiedMsec);
			    }
			    bitstream.closeFrame();
			} //playing
		    }
		    finally
		    {
			Log.debug(LOG_COMPONENT, "closing jlayer playing procedure (finally block)");
			if(device != null)
			    device.close();
			if(stream != null)
			    stream.close();
			listener.onPlayerFinish(Instance.this);
		    }
		}
		catch (Exception e)
		{
		    Log.error(LOG_COMPONENT, e.getClass().getName() + ":" + e.getMessage());
		    listener.onPlayerError(e);
		}
	    }, null);
	executor.execute(task);
	return new MediaResourcePlayer.Result();
    }

    @Override public void stop()
    {
	interrupting = true;
	task.cancel(true);
    }
}
