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

import org.luwrain.core.*;

interface Settings
{
	boolean getDefault(boolean defValue);
	String getName(String defValue);
	String getToSpeakersCommand(String defValue);
	String getToStreamCommand(String defValue);
	int getSampleRate(int defValue);
	int getSampleSize(int defValue);
	int getNumChannels(int defValue);
	boolean getSigned(boolean defValue);
	    boolean getBigEndian(boolean defValue);
	int getDefaultPitch(int defValue);
	int getDefaultRate(int defValue);

    static Settings create(Registry registry, String path)
    {
	NullCheck.notNull(registry, "registry");
	NullCheck.notNull(path, "path");
	return RegistryProxy.create(registry, path, Settings.class);
    }
}
