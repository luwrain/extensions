// 2000 mdm@techie.com
// Mat McGowan

package org.luwrain.extensions.plmp3;

import javax.sound.sampled.*;

import javazoom.jl.decoder.Decoder;
import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.*;

import org.luwrain.core.*;

/**
   This class gives the custom implementation of a device for JLayer. Its
   creation was caused by the inaccessible instance of {@code
   SourceDataLine} in the original class.
*/
class CustomDevice extends AudioDeviceBase implements AutoCloseable
{
static private final String LOG_COMPONENT = Instance.LOG_COMPONENT;

    SourceDataLine	source = null;
    private final int initialVolume;
    private AudioFormat		fmt = null;
    private byte[]			byteBuf = new byte[4096];

    CustomDevice(int initialVolume)
    {
	if (initialVolume < 0 || initialVolume > 100)
	    throw new IllegalArgumentException("initialVolume (" + initialVolume + ") must be between 0 and 100 (inclusively)");
	this.initialVolume = initialVolume;
    }

    void setVolume(int value)
    {
	if (source == null)
	    return;
	if (!org.luwrain.util.SoundUtils.setLineMasterGanePercent(source, value))
	    Log.error(LOG_COMPONENT, "unable to set volume (" + value + ")");
	    }

    @Override protected void openImpl() throws JavaLayerException
    {
    }

    @Override protected void closeImpl()
    {
	if (source!=null)
	{
	    source.close();
	}
    }

    @Override protected void writeImpl(short[] samples, int offs, int len) throws JavaLayerException
    {
	if (source==null)
	    createSource();
	byte[] b = toByteArray(samples, offs, len);
	source.write(b, 0, len*2);
    }

    @Override protected void flushImpl()
    {
	if (source!=null)
	{
	    source.drain();
	}
    }

    @Override public int getPosition()
    {
	int pos = 0;
	if (source!=null)
	{
	    pos = (int)(source.getMicrosecondPosition()/1000);
	}
	return pos;
    }

    private AudioFormat getAudioFormat()
    {
	if (fmt==null)
	{
	    Decoder decoder = getDecoder();
	    fmt = new AudioFormat(decoder.getOutputFrequency(),
				  16,
				  decoder.getOutputChannels(),
				  true,
				  false);
	}
	return fmt;
    }

    private DataLine.Info getSourceLineInfo()
    {
	AudioFormat fmt = getAudioFormat();
	DataLine.Info info = new DataLine.Info(SourceDataLine.class, fmt);
	return info;
    }

    private void createSource() throws JavaLayerException
    {
        Throwable t = null;
        try
        {
	    final Line line = createLine();
            if (line instanceof SourceDataLine)
            {
		source = (SourceDataLine)line;
		source.open(fmt);
		if (!org.luwrain.util.SoundUtils.setLineMasterGanePercent(source, initialVolume))
		    Log.error(LOG_COMPONENT, "unable to set initial volume (" + initialVolume + ")");
                source.start();
            }
	}
	catch (RuntimeException ex)
	{
	    t = ex;
	}
	catch (LinkageError ex)
	{
	    t = ex;
	}
	catch (LineUnavailableException ex)
	{
	    t = ex;
	}
	if (source==null)
	    throw new JavaLayerException("cannot obtain source audio line", t);
    }

    private Line createLine() throws LineUnavailableException {
        Line line = AudioSystem.getLine(getSourceLineInfo());
        return line;
    }

    private byte[] getByteArray(int length)
    {
	if (byteBuf.length < length)
	{
	    byteBuf = new byte[length+1024];
	}
	return byteBuf;
    }

    private byte[] toByteArray(short[] samples, int offs, int len)
    {
	byte[] b = getByteArray(len*2);
	int idx = 0;
	short s;
	while (len-- > 0)
	{
	    s = samples[offs++];
	    b[idx++] = (byte)s;
	    b[idx++] = (byte)(s>>>8);
	}
	return b;
    }
}
